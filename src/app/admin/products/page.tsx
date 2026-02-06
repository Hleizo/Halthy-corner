'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Package,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';
type Badge = 'new' | 'bestseller' | 'sale' | null;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  rating: number;
  review_count: number;
  short_description: string;
  long_description: string;
  features: string[];
  specs: Record<string, string>;
  stock_status: StockStatus;
  images: string[];
  badge: Badge;
  created_at: string;
}

const CATEGORIES = [
  { value: 'blood-pressure-monitors', label: 'Blood Pressure Monitors' },
  { value: 'pulse-oximeters', label: 'Pulse Oximeters' },
  { value: 'thermometers', label: 'Digital Thermometers' },
  { value: 'stethoscopes', label: 'Stethoscopes' },
  { value: 'nebulizers', label: 'Nebulizers' },
];

const EMPTY_PRODUCT = {
  name: '',
  category: 'blood-pressure-monitors',
  price: 0,
  original_price: null as number | null,
  short_description: '',
  long_description: '',
  features: [''],
  specs: {} as Record<string, string>,
  stock_status: 'in-stock' as StockStatus,
  images: ['/images/products/placeholder.jpg'],
  badge: null as Badge,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form state
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProducts(data ?? []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      showToast('error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openAddForm = () => {
    setForm(EMPTY_PRODUCT);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      original_price: product.original_price,
      short_description: product.short_description,
      long_description: product.long_description,
      features: product.features.length > 0 ? product.features : [''],
      specs: product.specs,
      stock_status: product.stock_status,
      images: product.images.length > 0 ? product.images : ['/images/products/placeholder.jpg'],
      badge: product.badge,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_PRODUCT);
  };

  const handleSave = async () => {
    // Validation
    if (!form.name.trim()) { showToast('error', 'Product name is required'); return; }
    if (form.price <= 0) { showToast('error', 'Price must be greater than 0'); return; }
    if (!form.short_description.trim()) { showToast('error', 'Short description is required'); return; }

    setSaving(true);
    try {
      const supabase = createClient();
      const cleanFeatures = form.features.filter((f) => f.trim() !== '');

      const productData = {
        name: form.name.trim(),
        category: form.category,
        price: form.price,
        original_price: form.original_price && form.original_price > 0 ? form.original_price : null,
        short_description: form.short_description.trim(),
        long_description: form.long_description.trim() || form.short_description.trim(),
        features: cleanFeatures,
        specs: form.specs,
        stock_status: form.stock_status,
        images: form.images.filter((img) => img.trim() !== ''),
        badge: form.badge,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);

        if (error) throw error;
        showToast('success', 'Product updated successfully');
      } else {
        // Insert
        const { error } = await supabase
          .from('products')
          .insert(productData);

        if (error) throw error;
        showToast('success', 'Product added successfully');
      }

      closeForm();
      fetchProducts();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('error', 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeleting(id);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast('success', 'Product deleted');
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('error', 'Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };

  // Feature helpers
  const addFeature = () => setForm((f) => ({ ...f, features: [...f.features, ''] }));
  const updateFeature = (index: number, value: string) =>
    setForm((f) => ({ ...f, features: f.features.map((feat, i) => (i === index ? value : feat)) }));
  const removeFeature = (index: number) =>
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== index) }));

  // Spec helpers
  const addSpec = () => {
    if (!specKey.trim()) return;
    setForm((f) => ({ ...f, specs: { ...f.specs, [specKey.trim()]: specValue.trim() } }));
    setSpecKey('');
    setSpecValue('');
  };
  const removeSpec = (key: string) =>
    setForm((f) => {
      const newSpecs = { ...f.specs };
      delete newSpecs[key];
      return { ...f, specs: newSpecs };
    });

  // Image helpers
  const addImage = () => setForm((f) => ({ ...f, images: [...f.images, ''] }));
  const updateImage = (index: number, value: string) =>
    setForm((f) => ({ ...f, images: f.images.map((img, i) => (i === index ? value : img)) }));
  const removeImage = (index: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));

  return (
    <div>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-neutral-400 mt-1">
            {products.length} product{products.length !== 1 ? 's' : ''} in your store
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm text-white font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-16">
          <RefreshCw className="w-6 h-6 text-neutral-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading products…</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-xl">
          <Package className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400 mb-4">No products yet</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm text-white font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider hidden sm:table-cell">Stock</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Badge</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ImageIcon className="w-5 h-5 text-neutral-600" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-xs text-neutral-500 line-clamp-1 max-w-[200px]">{product.short_description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-neutral-400 text-xs">
                        {CATEGORIES.find((c) => c.value === product.category)?.label ?? product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{formatPrice(product.price)}</p>
                        {product.original_price && (
                          <p className="text-xs text-neutral-500 line-through">{formatPrice(product.original_price)}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.stock_status === 'in-stock'
                            ? 'bg-green-500/10 text-green-400'
                            : product.stock_status === 'low-stock'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {product.stock_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {product.badge ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditForm(product)}
                          className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deleting === product.id}
                          className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <h3 className="font-semibold text-white text-lg">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={closeForm}
                className="p-1 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder="e.g. Blood Pressure Monitor"
                />
              </div>

              {/* Category + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">Stock Status</label>
                  <select
                    value={form.stock_status}
                    onChange={(e) => setForm({ ...form, stock_status: e.target.value as StockStatus })}
                    className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Price + Original Price + Badge */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Price (JOD) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price || ''}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Original Price <span className="text-neutral-600">(optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.original_price ?? ''}
                    onChange={(e) =>
                      setForm({ ...form, original_price: e.target.value ? parseFloat(e.target.value) : null })
                    }
                    className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">Badge</label>
                  <select
                    value={form.badge ?? ''}
                    onChange={(e) => setForm({ ...form, badge: (e.target.value || null) as Badge })}
                    className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">None</option>
                    <option value="new">New</option>
                    <option value="bestseller">Popular</option>
                    <option value="sale">Best Value</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Brief product description shown on cards…"
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Full Description
                </label>
                <textarea
                  value={form.long_description}
                  onChange={(e) => setForm({ ...form, long_description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Detailed product description shown on the product page…"
                />
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-neutral-300">Features</label>
                  <button
                    onClick={addFeature}
                    className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    + Add Feature
                  </button>
                </div>
                <div className="space-y-2">
                  {form.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder={`Feature ${i + 1}`}
                      />
                      {form.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(i)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1.5">Specifications</label>
                {/* Existing specs */}
                {Object.entries(form.specs).length > 0 && (
                  <div className="space-y-1 mb-3">
                    {Object.entries(form.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 bg-neutral-800 rounded-lg px-3 py-2">
                        <span className="text-xs font-medium text-neutral-300 min-w-[120px]">{key}</span>
                        <span className="text-xs text-neutral-400 flex-1">{value}</span>
                        <button
                          onClick={() => removeSpec(key)}
                          className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Add spec */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Spec name (e.g. Weight)"
                  />
                  <input
                    type="text"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Value (e.g. 340g)"
                    onKeyDown={(e) => e.key === 'Enter' && addSpec()}
                  />
                  <button
                    onClick={addSpec}
                    className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm text-white transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-neutral-300">Image URLs</label>
                  <button
                    onClick={addImage}
                    className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    + Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      <input
                        type="text"
                        value={img}
                        onChange={(e) => updateImage(i, e.target.value)}
                        className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="/images/products/your-image.jpg"
                      />
                      {form.images.length > 1 && (
                        <button
                          onClick={() => removeImage(i)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-neutral-800">
              <button
                onClick={closeForm}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm text-white font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving…' : editingId ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
