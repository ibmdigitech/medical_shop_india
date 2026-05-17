import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, CheckCircle2, AlertTriangle, 
  XCircle, ArrowRightLeft, FileText, Download 
} from 'lucide-react';

const auditLogs = [
  { id: 'AUD-1045', product: 'Paracetamol 500mg', type: 'Stock In', quantity: '+500', user: 'Admin User', date: '2026-05-17 10:30 AM', status: 'Completed' },
  { id: 'AUD-1044', product: 'Vitamin C Complex', type: 'Adjustment', quantity: '-12', user: 'System', date: '2026-05-16 11:45 PM', status: 'Completed' },
  { id: 'AUD-1043', product: 'Digital Thermometer', type: 'Stock Out', quantity: '-5', user: 'Order #9024', date: '2026-05-16 02:15 PM', status: 'Completed' },
  { id: 'AUD-1042', product: 'Cough Syrup 100ml', type: 'Discrepancy', quantity: '-2', user: 'Manual Audit', date: '2026-05-15 09:00 AM', status: 'Pending Review' },
  { id: 'AUD-1041', product: 'N95 Face Masks', type: 'Stock In', quantity: '+1000', user: 'Admin User', date: '2026-05-14 04:30 PM', status: 'Completed' },
];

export default function AdminStockAudit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Stock Audit</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Track inventory movements and discrepancies.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2">
            <Download size={18} /> Export Log
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
          >
            <FileText size={18} /> New Audit
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center">
            <ArrowRightLeft size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Total Movements</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">1,245</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Stock Added</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">8,430</p>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Discrepancies</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">12</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Product..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold">
            <option value="all">All Types</option>
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
            <option value="adjustment">Adjustment</option>
            <option value="discrepancy">Discrepancy</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Audit ID</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Product</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Type</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Quantity</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date / User</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-black text-primary">{log.id}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{log.product}</td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">
                      {log.type}
                    </span>
                  </td>
                  <td className={`p-4 font-black ${log.quantity.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {log.quantity}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-900 dark:text-white font-bold">{log.date}</p>
                    <p className="text-xs text-slate-500">{log.user}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      log.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {log.status === 'Completed' ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Audit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl z-50 border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Create New Audit</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Product</label>
                  <input type="text" placeholder="Select product..." className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Audit Type</label>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white">
                      <option>Stock In</option>
                      <option>Stock Out</option>
                      <option>Adjustment</option>
                      <option>Discrepancy</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Quantity</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Notes (Optional)</label>
                  <textarea rows="3" className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white" />
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-full py-4 mt-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  <CheckCircle2 size={20} /> Submit Audit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

