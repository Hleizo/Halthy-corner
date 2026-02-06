'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowRight,
  RefreshCw,
  BarChart3,
  MapPin,
  Star,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import type { OrderStatus } from '@/lib/supabase/types';

// ─── Types ───────────────────────────────────────────────────
interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price_jod: number;
}

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  total_jod: number;
  status: OrderStatus;
  created_at: string;
  order_items: OrderItem[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_status: string;
  rating: number;
  review_count: number;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-500', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-blue-400', bg: 'bg-blue-500', icon: CheckCircle2 },
  processing: { label: 'Processing', color: 'text-purple-400', bg: 'bg-purple-500', icon: Package },
  shipped: { label: 'Shipped', color: 'text-cyan-400', bg: 'bg-cyan-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-green-400', bg: 'bg-green-500', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500', icon: XCircle },
};

// ─── Mini Bar Chart Component (pure CSS, no library) ────────
function BarChart({ data, maxValue }: { data: { label: string; value: number; color: string }[]; maxValue: number }) {
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((bar, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-neutral-400 font-medium">{bar.value}</span>
          <div className="w-full rounded-t-md relative" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className={`w-full rounded-t-md transition-all duration-700 ${bar.color}`}
              style={{ height: `${maxValue > 0 ? (bar.value / maxValue) * 120 : 0}px`, minHeight: bar.value > 0 ? '4px' : '0px' }}
            />
          </div>
          <span className="text-[10px] text-neutral-500 text-center leading-tight">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Donut Chart Component (pure SVG) ───────────────────────
function DonutChart({ segments, total, label }: { segments: { value: number; color: string; label: string }[]; total: number; label: string }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
        {segments.map((seg, i) => {
          const pct = total > 0 ? seg.value / total : 0;
          const dashLength = pct * circumference;
          const dashOffset = -cumulativeOffset;
          cumulativeOffset += dashLength;
          return (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="20"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
              transform="rotate(-90 80 80)"
              className="transition-all duration-700"
            />
          );
        })}
        <text x="80" y="74" textAnchor="middle" className="fill-white text-2xl font-bold" style={{ fontSize: '24px' }}>
          {total}
        </text>
        <text x="80" y="95" textAnchor="middle" className="fill-neutral-400" style={{ fontSize: '11px' }}>
          {label}
        </text>
      </svg>
    </div>
  );
}

// ─── Progress Bar ───────────────────────────────────────────
function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-neutral-300">{label}</span>
        <span className="text-sm font-medium text-white">{value}</span>
      </div>
      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────
export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*, order_items(id, product_id, product_name, quantity, price_jod)').order('created_at', { ascending: false }),
        supabase.from('products').select('id, name, category, price, stock_status, rating, review_count'),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (productsRes.error) throw productsRes.error;

      setOrders((ordersRes.data ?? []) as unknown as Order[]);
      setProducts((productsRes.data ?? []) as Product[]);
    } catch (err) {
      console.error('Dashboard fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── Computed Analytics ─────────────────────────────────
  const totalRevenue = orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total_jod, 0);
  const deliveredRevenue = orders.filter((o) => o.status === 'delivered').reduce((s, o) => s + o.total_jod, 0);
  const totalOrders = orders.length;
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / (totalOrders - cancelledOrders || 1) : 0;
  const uniqueCustomers = new Set(orders.map((o) => o.phone)).size;

  // Status breakdown
  const statusCounts: Record<OrderStatus, number> = {
    pending: 0, confirmed: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0,
  };
  orders.forEach((o) => { statusCounts[o.status]++; });

  // Orders by day (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const ordersByDay = last7Days.map((day) => {
    const dayStr = day.toISOString().slice(0, 10);
    const count = orders.filter((o) => o.created_at.slice(0, 10) === dayStr).length;
    return {
      label: day.toLocaleDateString('en-GB', { weekday: 'short' }),
      value: count,
      color: 'bg-primary-500',
    };
  });
  const maxDayOrders = Math.max(...ordersByDay.map((d) => d.value), 1);

  // Revenue by day (last 7 days)
  const revenueByDay = last7Days.map((day) => {
    const dayStr = day.toISOString().slice(0, 10);
    const rev = orders
      .filter((o) => o.created_at.slice(0, 10) === dayStr && o.status !== 'cancelled')
      .reduce((s, o) => s + o.total_jod, 0);
    return {
      label: day.toLocaleDateString('en-GB', { weekday: 'short' }),
      value: Math.round(rev),
      color: 'bg-green-500',
    };
  });
  const maxDayRevenue = Math.max(...revenueByDay.map((d) => d.value), 1);

  // Top selling products
  const productSales: Record<string, { name: string; qty: number; revenue: number }> = {};
  orders
    .filter((o) => o.status !== 'cancelled')
    .forEach((o) => {
      o.order_items.forEach((item) => {
        if (!productSales[item.product_id]) {
          productSales[item.product_id] = { name: item.product_name, qty: 0, revenue: 0 };
        }
        productSales[item.product_id].qty += item.quantity;
        productSales[item.product_id].revenue += item.price_jod * item.quantity;
      });
    });
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const maxProductRevenue = topProducts.length > 0 ? topProducts[0].revenue : 1;

  // Orders by city
  const cityCounts: Record<string, number> = {};
  orders.forEach((o) => { cityCounts[o.city] = (cityCounts[o.city] || 0) + 1; });
  const topCities = Object.entries(cityCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);
  const maxCityOrders = topCities.length > 0 ? topCities[0][1] : 1;

  // Recent orders (last 5)
  const recentOrders = orders.slice(0, 5);

  // Fulfillment rate
  const completedOrders = statusCounts.delivered;
  const fulfillmentRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
  const cancellationRate = totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;

  // Stock alerts
  const lowStockProducts = products.filter((p) => p.stock_status === 'low-stock' || p.stock_status === 'out-of-stock');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-neutral-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Overview of your store performance
          </p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* ─── KPI Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white">{formatPrice(totalRevenue)}</p>
          <p className="text-xs text-neutral-500 mt-1">Total Revenue</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-400" />
            </div>
            <span className="text-xs text-neutral-500">{statusCounts.pending} pending</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalOrders}</p>
          <p className="text-xs text-neutral-500 mt-1">Total Orders</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            {avgOrderValue > 0 ? <TrendingUp className="w-4 h-4 text-purple-400" /> : <TrendingDown className="w-4 h-4 text-neutral-600" />}
          </div>
          <p className="text-2xl font-bold text-white">{formatPrice(avgOrderValue)}</p>
          <p className="text-xs text-neutral-500 mt-1">Avg. Order Value</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{uniqueCustomers}</p>
          <p className="text-xs text-neutral-500 mt-1">Unique Customers</p>
        </div>
      </div>

      {/* ─── Charts Row ───────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Orders Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white">Orders (Last 7 Days)</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Daily order count</p>
            </div>
            <ShoppingBag className="w-5 h-5 text-neutral-600" />
          </div>
          <BarChart data={ordersByDay} maxValue={maxDayOrders} />
        </div>

        {/* Revenue Chart */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white">Revenue (Last 7 Days)</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Daily revenue in JOD</p>
            </div>
            <DollarSign className="w-5 h-5 text-neutral-600" />
          </div>
          <BarChart data={revenueByDay} maxValue={maxDayRevenue} />
        </div>
      </div>

      {/* ─── Middle Row: Donut + Status + Fulfillment ────── */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Order Status Donut */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Order Status</h3>
          <DonutChart
            total={totalOrders}
            label="orders"
            segments={[
              { value: statusCounts.pending, color: '#eab308', label: 'Pending' },
              { value: statusCounts.confirmed, color: '#3b82f6', label: 'Confirmed' },
              { value: statusCounts.processing, color: '#a855f7', label: 'Processing' },
              { value: statusCounts.shipped, color: '#06b6d4', label: 'Shipped' },
              { value: statusCounts.delivered, color: '#22c55e', label: 'Delivered' },
              { value: statusCounts.cancelled, color: '#ef4444', label: 'Cancelled' },
            ]}
          />
          <div className="grid grid-cols-2 gap-2 mt-4">
            {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((status) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${STATUS_CONFIG[status].bg}`} />
                <span className="text-xs text-neutral-400">{STATUS_CONFIG[status].label}</span>
                <span className="text-xs font-medium text-white ml-auto">{statusCounts[status]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fulfillment Metrics */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="font-semibold text-white mb-6">Performance</h3>
          <div className="space-y-6">
            {/* Fulfillment Rate */}
            <div className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="#22c55e"
                    strokeWidth="10"
                    strokeDasharray={`${fulfillmentRate * 2.64} ${264 - fulfillmentRate * 2.64}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{fulfillmentRate}%</span>
                </div>
              </div>
              <p className="text-sm text-neutral-400">Fulfillment Rate</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Delivered</span>
                <span className="text-sm font-medium text-green-400">{completedOrders} orders</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Confirmed Revenue</span>
                <span className="text-sm font-medium text-green-400">{formatPrice(deliveredRevenue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Cancellation Rate</span>
                <span className={`text-sm font-medium ${cancellationRate > 20 ? 'text-red-400' : 'text-neutral-300'}`}>
                  {cancellationRate}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">Pending Action</span>
                <span className={`text-sm font-medium ${statusCounts.pending > 0 ? 'text-yellow-400' : 'text-neutral-500'}`}>
                  {statusCounts.pending} orders
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <h3 className="font-semibold text-white">Top Cities</h3>
          </div>
          {topCities.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-8">No data yet</p>
          ) : (
            <div className="space-y-4">
              {topCities.map(([city, count], i) => (
                <ProgressBar
                  key={city}
                  label={`${i + 1}. ${city}`}
                  value={count}
                  max={maxCityOrders}
                  color={i === 0 ? 'bg-primary-500' : i === 1 ? 'bg-primary-400' : 'bg-primary-300'}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom Row: Top Products + Recent Orders ────── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Top Selling Products */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-neutral-500" />
              <h3 className="font-semibold text-white">Top Products</h3>
            </div>
            <Link href="/admin/products" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {topProducts.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-8">No sales data yet</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-xs font-bold text-neutral-400">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-xs text-neutral-500">{product.qty} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{formatPrice(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <h3 className="font-semibold text-white">Recent Orders</h3>
            </div>
            <Link href="/admin/orders" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const statusConf = STATUS_CONFIG[order.status];
                return (
                  <div key={order.id} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${statusConf.bg}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{order.customer_name}</p>
                      <p className="text-xs text-neutral-500">
                        {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{formatPrice(order.total_jod)}</p>
                      <p className={`text-xs ${statusConf.color}`}>{statusConf.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom Row: Product Inventory + Quick Stats ─── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Product Inventory Overview */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-neutral-500" />
              <h3 className="font-semibold text-white">Product Inventory</h3>
            </div>
            <Link href="/admin/products" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {products.length === 0 ? (
            <p className="text-sm text-neutral-500 text-center py-8">No products yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left pb-2 text-xs font-medium text-neutral-500 uppercase">Product</th>
                    <th className="text-left pb-2 text-xs font-medium text-neutral-500 uppercase">Category</th>
                    <th className="text-left pb-2 text-xs font-medium text-neutral-500 uppercase">Price</th>
                    <th className="text-left pb-2 text-xs font-medium text-neutral-500 uppercase">Stock</th>
                    <th className="text-left pb-2 text-xs font-medium text-neutral-500 uppercase">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2.5 font-medium text-white">{product.name}</td>
                      <td className="py-2.5 text-neutral-400 text-xs capitalize">{product.category.replace(/-/g, ' ')}</td>
                      <td className="py-2.5 text-white">{formatPrice(product.price)}</td>
                      <td className="py-2.5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.stock_status === 'in-stock' ? 'bg-green-500/10 text-green-400'
                          : product.stock_status === 'low-stock' ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                        }`}>
                          {product.stock_status}
                        </span>
                      </td>
                      <td className="py-2.5 text-neutral-400">
                        <span className="text-yellow-400">★</span> {product.rating} <span className="text-neutral-600">({product.review_count})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Alerts & Quick Info */}
        <div className="space-y-6">
          {/* Stock Alerts */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">⚠️ Alerts</h3>
            {lowStockProducts.length === 0 && statusCounts.pending === 0 ? (
              <div className="text-center py-4">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-neutral-400">All good! No alerts.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {statusCounts.pending > 0 && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                    <Clock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">{statusCounts.pending} pending order{statusCounts.pending !== 1 ? 's' : ''}</p>
                      <p className="text-xs text-neutral-500">Need confirmation</p>
                    </div>
                  </div>
                )}
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-start gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <Package className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-400">{p.name}</p>
                      <p className="text-xs text-neutral-500">{p.stock_status === 'out-of-stock' ? 'Out of stock' : 'Low stock'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-3 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-300">Manage Orders</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-300">Manage Products</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between p-3 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-300">View Store</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
