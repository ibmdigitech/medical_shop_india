import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, 
  Download, Upload, CheckCircle2, XCircle
} from 'lucide-react';

const products = [
  { id: 'PRD001', name: 'Paracetamol 500mg', category: 'Medicine', stock: 1250, price: 45, status: 'In Stock' },
  { id: 'PRD002', name: 'Vitamin C Complex', category: 'Supplement', stock: 430, price: 120, status: 'In Stock' },
  { id: 'PRD003', name: 'Digital Thermometer', category: 'Equipment', stock: 15, price: 450, status: 'Low Stock' },
  { id: 'PRD004', name: 'Cough Syrup 100ml', category: 'Medicine', stock: 0, price: 85, status: 'Out of Stock' },
  { id: 'PRD005', name: 'N95 Face Masks (Pack of 5)', category: 'Safety', stock: 850, price: 250, status: 'In Stock' },
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Products Management</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Manage your pharmacy inventory and catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2">
            <Download size={18} /> Export
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 relative w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by product name, SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="flex-1 sm:flex-none px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-white font-bold">
            <option value="all">All Categories</option>
            <option value="medicine">Medicines</option>
            <option value="supplement">Supplements</option>
            <option value="equipment">Equipment</option>
          </select>
          <button className="p-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-gray-400 hover:text-primary transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">ID</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Product Name</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Category</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Price</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Stock</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-sm font-bold text-slate-600 dark:text-gray-400">{product.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900 dark:text-white">{product.name}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-gray-400">{product.category}</td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">₹{product.price}</td>
                  <td className="p-4 font-bold text-slate-700 dark:text-gray-300">{product.stock}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      product.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                      'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {product.status === 'In Stock' && <CheckCircle2 size={12} />}
                      {product.status === 'Low Stock' && <AlertTriangle size={12} />}
                      {product.status === 'Out of Stock' && <XCircle size={12} />}
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                        <Trash2 size={16} />
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
        <div className="p-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to 5 of 50 entries</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">Prev</button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/20">1</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">2</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors font-bold">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
