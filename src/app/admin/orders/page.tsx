'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Search,
  RefreshCw,
  ChevronDown,
  Eye,
  X,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils';
import type { OrderStatus } from '@/lib/supabase/types';

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

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: CheckCircle2 },
  processing: { label: 'Processing', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle },
};

const ALL_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      let query = supabase
        .from('orders')
        .select('*, order_items(id, product_id, product_name, quantity, price_jod)')
        .order('created_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      setOrders((data ?? []) as unknown as Order[]);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.customer_name.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.id.toLowerCase().includes(q)
    );
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => ['confirmed', 'processing'].includes(o.status)).length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    revenue: orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total_jod, 0),
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage customer orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <p className="text-xs text-yellow-500 uppercase tracking-wider">Pending</p>
          <p className="text-2xl font-bold text-white mt-1">{stats.pending}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <p className="text-xs text-purple-500 uppercase tracking-wider">In Progress</p>
          <p className="text-2xl font-bold text-white mt-1">{stats.processing}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <p className="text-xs text-green-500 uppercase tracking-wider">Revenue</p>
          <p className="text-2xl font-bold text-white mt-1">{formatPrice(stats.revenue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by name, phone, or order ID…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
            className="appearance-none pl-3 pr-10 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="text-center py-16">
          <RefreshCw className="w-6 h-6 text-neutral-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-neutral-500">Loading orders…</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-xl">
          <Package className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <p className="text-neutral-400">No orders found</p>
        </div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Order</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider hidden md:table-cell">City</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Total</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredOrders.map((order) => {
                  const statusConf = STATUS_CONFIG[order.status];
                  const StatusIcon = statusConf.icon;
                  return (
                    <tr key={order.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-neutral-400">
                          {order.id.substring(0, 8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-white">{order.customer_name}</p>
                          <p className="text-xs text-neutral-500">{order.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-neutral-400">{order.city}</td>
                      <td className="px-4 py-3 font-medium text-white">{formatPrice(order.total_jod)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConf.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-neutral-400 text-xs">
                        {new Date(order.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                              disabled={updatingId === order.id}
                              className="appearance-none pl-2 pr-6 py-1.5 bg-neutral-800 border border-neutral-700 rounded text-xs text-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer disabled:opacity-50"
                            >
                              {ALL_STATUSES.map((s) => (
                                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <h3 className="font-semibold text-white">
                Order #{selectedOrder.id.substring(0, 8).toUpperCase()}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Customer */}
              <div>
                <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Customer</h4>
                <p className="text-white">{selectedOrder.customer_name}</p>
                <p className="text-sm text-neutral-400">{selectedOrder.phone}</p>
                {selectedOrder.email && (
                  <p className="text-sm text-neutral-400">{selectedOrder.email}</p>
                )}
              </div>
              {/* Address */}
              <div>
                <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Delivery Address</h4>
                <p className="text-white">{selectedOrder.address}</p>
                <p className="text-sm text-neutral-400">{selectedOrder.city}, Jordan</p>
              </div>
              {/* Items */}
              <div>
                <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.order_items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-neutral-800 rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium text-white">{item.product_name}</p>
                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-white">{formatPrice(item.price_jod * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Total */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
                <span className="font-medium text-neutral-400">Total</span>
                <span className="text-lg font-bold text-white">{formatPrice(selectedOrder.total_jod)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
