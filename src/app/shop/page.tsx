'use client';

import React, { useState, useMemo, Suspense, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SlidersHorizontal, Grid, List, X, ChevronDown, Search, Package, Star, Sparkles, RefreshCw } from 'lucide-react';
import { products as mockProducts, categories } from '@/data';
import { Product, Category } from '@/types';
import { Breadcrumbs, ProductCard, Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A to Z' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse URL params
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('q') || '';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const ratingParam = searchParams.get('rating');
  const inStockParam = searchParams.get('inStock');
  const sortParam = searchParams.get('sort');

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    categoryParam ? categoryParam.split(',').filter(Boolean) as Category[] : []
  );
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam ? Number(minPriceParam) : 0,
    maxPriceParam ? Number(maxPriceParam) : 250,
  ]);
  const [inStockOnly, setInStockOnly] = useState(inStockParam === 'true');
  const [minRating, setMinRating] = useState(ratingParam ? Number(ratingParam) : 0);
  const [sortBy, setSortBy] = useState(sortParam || 'featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products from Supabase (with fallback to mock data)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: Product[] = data.map((row: any) => ({
            id: row.id,
            name: row.name,
            category: row.category as Category,
            price: row.price,
            originalPrice: row.original_price ?? undefined,
            rating: row.rating,
            reviewCount: row.review_count,
            shortDescription: row.short_description,
            longDescription: row.long_description,
            features: row.features,
            specs: row.specs,
            stockStatus: row.stock_status,
            images: row.images,
            badge: row.badge ?? undefined,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.warn('Failed to fetch from Supabase, using mock data:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync filters to URL
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','));
    }
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString());
    }
    if (priceRange[1] < 250) {
      params.set('maxPrice', priceRange[1].toString());
    }
    if (minRating > 0) {
      params.set('rating', minRating.toString());
    }
    if (inStockOnly) {
      params.set('inStock', 'true');
    }
    if (sortBy !== 'featured') {
      params.set('sort', sortBy);
    }

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [selectedCategories, searchQuery, priceRange, minRating, inStockOnly, sortBy, pathname, router]);

  // Debounced URL update
  useEffect(() => {
    const timeout = setTimeout(updateURL, 300);
    return () => clearTimeout(timeout);
  }, [updateURL]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by stock status
    if (inStockOnly) {
      result = result.filter((p) => p.stockStatus !== 'out-of-stock');
    }

    // Filter by rating
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, inStockOnly, minRating, sortBy]);

  const toggleCategory = (categoryId: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setPriceRange([0, 250]);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    searchQuery.trim() !== '' ||
    priceRange[0] > 0 ||
    priceRange[1] < 250 ||
    inStockOnly ||
    minRating > 0;

  const activeFilterCount = [
    selectedCategories.length > 0,
    priceRange[0] > 0 || priceRange[1] < 250,
    inStockOnly,
    minRating > 0,
  ].filter(Boolean).length;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-neutral-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-neutral-600 group-hover:text-neutral-800 transition-colors">
                {category.name}
              </span>
              <span className="text-sm text-neutral-400 ml-auto">
                ({category.productCount})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-neutral-800 mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Min"
            />
            <span className="text-neutral-400">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="250"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-primary-500"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold text-neutral-800 mb-3">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
          />
          <span className="text-neutral-600">In stock only</span>
        </label>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-neutral-800 mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                className="w-4 h-4 border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="flex items-center gap-1 text-neutral-600 group-hover:text-neutral-800 transition-colors">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-3.5 h-3.5',
                      i < rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-neutral-300'
                    )}
                  />
                ))}
                <span className="ml-1">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumbs items={[{ label: 'Shop' }]} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">
                {searchQuery
                  ? `Search: "${searchQuery}"`
                  : selectedCategories.length === 1
                  ? categories.find((c) => c.id === selectedCategories[0])?.name
                  : 'All Products'}
              </h1>
              <p className="text-neutral-600 mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="ml-2 text-primary-500 hover:text-primary-600 underline text-sm"
                  >
                    Clear all filters
                  </button>
                )}
              </p>
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-800">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-neutral-100">
              {/* Mobile filter button */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
                onClick={() => setIsMobileFilterOpen(true)}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              {/* Active filters */}
              <div className="hidden lg:flex items-center gap-2 flex-wrap">
                {selectedCategories.map((categoryId) => {
                  const category = categories.find((c) => c.id === categoryId);
                  return (
                    <span
                      key={categoryId}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                    >
                      {category?.name}
                      <button
                        onClick={() => toggleCategory(categoryId)}
                        className="hover:text-primary-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500 bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>

                {/* View mode */}
                <div className="hidden md:flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'grid'
                        ? 'bg-primary-500 text-white'
                        : 'text-neutral-400 hover:text-neutral-600'
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 transition-colors',
                      viewMode === 'list'
                        ? 'bg-primary-500 text-white'
                        : 'text-neutral-400 hover:text-neutral-600'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  No products found
                </h3>
                <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                  {searchQuery
                    ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or filters.`
                    : 'No products match your current filters. Try adjusting or clearing them to see more results.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Reset Search
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'grid gap-6',
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                ))}
              </div>
            )}

            {/* Coming Soon Note */}
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-success-50 rounded-2xl border border-primary-100 p-6 lg:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-primary-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    More Medical Devices Coming Soon
                  </h3>
                  <p className="text-neutral-600">
                    We are continuously expanding our range of certified medical devices. 
                    Our team is working to bring you additional diagnostic and monitoring equipment to support your health journey.
                  </p>
                </div>
                <Button asChild variant="outline" className="flex-shrink-0">
                  <a href="/contact">Request a Device</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300',
          isMobileFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={() => setIsMobileFilterOpen(false)}
      />
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 lg:hidden transition-transform duration-300 overflow-y-auto',
          isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-800">Filters</h2>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <FilterSidebar />
        </div>
      </div>
    </div>
  );
}

function ShopLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-6">
          <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
          <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse mt-4" />
          <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse mt-2" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 h-96 animate-pulse" />
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-neutral-100 p-4">
                  <div className="aspect-square bg-neutral-200 rounded-xl animate-pulse mb-4" />
                  <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoadingSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
