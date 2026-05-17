import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IndianRupee, ShoppingCart, Users, Package, 
  TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle2, XCircle, Download 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const salesData = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 139 },
  { name: 'Wed', revenue: 5000, orders: 380 },
  { name: 'Thu', revenue: 4500, orders: 290 },
  { name: 'Fri', revenue: 6000, orders: 480 },
  { name: 'Sat', revenue: 8000, orders: 620 },
  { name: 'Sun', revenue: 7500, orders: 590 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {trendValue}
      </div>
    </div>
    <div>
      <h3 className="text-slate-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-3xl font-black text-slate-900 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Create a mock CSV file for download
      const csvContent = "Date,Revenue,Orders\n2026-05-10,4000,240\n2026-05-11,3000,139\n2026-05-12,5000,380";
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'AmsterMedCare_Dashboard_Report.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setIsExportModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 rounded-xl font-bold text-sm text-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="₹ 1,24,500" 
          icon={IndianRupee} 
          trend="up" 
          trendValue="+14.5%" 
          color="bg-gradient-to-br from-emerald-400 to-primary"
        />
        <StatCard 
          title="Total Orders" 
          value="842" 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="+8.2%" 
          color="bg-gradient-to-br from-blue-400 to-blue-600"
        />
        <StatCard 
          title="Total Customers" 
          value="4,210" 
          icon={Users} 
          trend="up" 
          trendValue="+12.1%" 
          color="bg-gradient-to-br from-purple-400 to-purple-600"
        />
        <StatCard 
          title="Low Stock Items" 
          value="24" 
          icon={AlertTriangle} 
          trend="down" 
          trendValue="-2.4%" 
          color="bg-gradient-to-br from-rose-400 to-rose-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Revenue Analytics</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Orders Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Orders Volume</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Recent Orders</h3>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent dark:hover:border-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-gray-300">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Order #ORD-{9000 + i}</h4>
                    <p className="text-xs text-slate-500">2 mins ago • 3 items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 dark:text-white">₹ 1,240</p>
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-[10px] font-black rounded uppercase tracking-wider mt-1">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Low Stock Alerts</h3>
            <button className="text-primary font-bold text-sm hover:underline">Manage Inventory</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Paracetamol 500mg', stock: 12, status: 'critical' },
              { name: 'Vitamin C Tablets', stock: 45, status: 'warning' },
              { name: 'Dolo 650', stock: 8, status: 'critical' },
              { name: 'Cough Syrup', stock: 24, status: 'warning' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent dark:hover:border-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'critical' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                  }`}>
                    <Package size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-slate-500">Supplier: Apollo Pharma</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 dark:text-white">{item.stock} left</p>
                  <p className={`text-[10px] font-black uppercase tracking-wider mt-1 ${
                    item.status === 'critical' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {item.status === 'critical' ? 'Reorder Now' : 'Low Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Report Modal */}
      <AnimatePresence>
        {isExportModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExportModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-dark-card rounded-[32px] p-8 shadow-2xl z-50 border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Export Dashboard Data</h3>
                <button onClick={() => setIsExportModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Date Range</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white">
                    <option>Today</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Format</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900 dark:text-white">
                    <option>PDF Document (.pdf)</option>
                    <option>Excel Spreadsheet (.xlsx)</option>
                    <option>CSV File (.csv)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-gray-300">Included Modules</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-bold">
                      <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary" /> Revenue
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-bold">
                      <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary" /> Orders
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-bold">
                      <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary" /> Stock Alerts
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 font-bold">
                      <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary" /> Customers
                    </label>
                  </div>
                </div>
                <button 
                  onClick={handleExport} 
                  disabled={isExporting}
                  className="w-full py-4 mt-4 bg-primary hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  {isExporting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Clock size={20} />
                    </motion.div>
                  ) : (
                    <Download size={20} />
                  )}
                  {isExporting ? 'Generating Report...' : 'Generate Export'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
