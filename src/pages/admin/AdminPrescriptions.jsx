import { useState } from 'react';
import { 
  Search, Filter, CheckCircle2, AlertTriangle, 
  XCircle, Eye, FileImage, Download 
} from 'lucide-react';

const prescriptions = [
  { id: 'RX-5021', customer: 'Rahul Krishnan', date: '2026-05-17 09:15 AM', items: 3, status: 'Pending Review', urgency: 'High' },
  { id: 'RX-5020', customer: 'Aisha Mohammed', date: '2026-05-16 02:45 PM', items: 1, status: 'Approved', urgency: 'Normal' },
  { id: 'RX-5019', customer: 'Sneha Patel', date: '2026-05-16 11:20 AM', items: 5, status: 'Rejected', urgency: 'Normal' },
  { id: 'RX-5018', customer: 'Vishnu R', date: '2026-05-15 04:30 PM', items: 2, status: 'Processed', urgency: 'Normal' },
  { id: 'RX-5017', customer: 'John Doe', date: '2026-05-15 10:05 AM', items: 4, status: 'Approved', urgency: 'High' },
];

export default function AdminPrescriptions() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Prescriptions</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Review and manage uploaded medical prescriptions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2">
            <Download size={18} /> Export List
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by RX ID or Customer Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold">
            <option value="all">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="processed">Processed</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">RX ID</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date Submitted</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Urgency</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Items</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-black text-primary">
                    <div className="flex items-center gap-2">
                      <FileImage size={16} className="text-slate-400" /> {rx.id}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{rx.customer}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">{rx.date}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      rx.urgency === 'High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                    }`}>
                      {rx.urgency}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700 dark:text-gray-300">{rx.items} items</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      rx.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      rx.status === 'Processed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      rx.status === 'Rejected' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                    }`}>
                      {rx.status === 'Approved' && <CheckCircle2 size={12} />}
                      {rx.status === 'Processed' && <CheckCircle2 size={12} />}
                      {rx.status === 'Rejected' && <XCircle size={12} />}
                      {rx.status === 'Pending Review' && <AlertTriangle size={12} />}
                      {rx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1">
                        <Eye size={14} /> Review
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
