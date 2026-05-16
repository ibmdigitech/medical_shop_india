import { useState } from 'react';
import { 
  Search, Filter, Eye, Download, CheckCircle2, 
  Clock, Truck, XCircle, MoreVertical 
} from 'lucide-react';

const orders = [
  { id: 'ORD-9024', customer: 'Rahul K', date: '2026-05-16', total: 1250, status: 'Processing', payment: 'Paid' },
  { id: 'ORD-9023', customer: 'Aisha M', date: '2026-05-16', total: 450, status: 'Pending', payment: 'COD' },
  { id: 'ORD-9022', customer: 'John D', date: '2026-05-15', total: 3200, status: 'Delivered', payment: 'Paid' },
  { id: 'ORD-9021', customer: 'Sneha P', date: '2026-05-15', total: 890, status: 'Cancelled', payment: 'Refunded' },
  { id: 'ORD-9020', customer: 'Vishnu R', date: '2026-05-14', total: 2100, status: 'Out for Delivery', payment: 'Paid' },
];

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'Processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
      case 'Cancelled': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle2 size={12} />;
      case 'Processing': return <Clock size={12} />;
      case 'Pending': return <Clock size={12} />;
      case 'Out for Delivery': return <Truck size={12} />;
      case 'Cancelled': return <XCircle size={12} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Orders Management</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Track, process and manage customer orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Customer Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Order ID</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Total</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Payment</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-black text-primary">{order.id}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{order.customer}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">{order.date}</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">₹{order.total}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold ${order.payment === 'Paid' ? 'text-emerald-500' : 'text-slate-500'}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
