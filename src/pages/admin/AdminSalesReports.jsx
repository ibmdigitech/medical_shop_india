import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';

const salesData = [
  { name: 'Mon', revenue: 4000, orders: 240, profit: 1200 },
  { name: 'Tue', revenue: 3000, orders: 139, profit: 800 },
  { name: 'Wed', revenue: 5000, orders: 380, profit: 1500 },
  { name: 'Thu', revenue: 4500, orders: 290, profit: 1350 },
  { name: 'Fri', revenue: 6000, orders: 480, profit: 1800 },
  { name: 'Sat', revenue: 8000, orders: 620, profit: 2400 },
  { name: 'Sun', revenue: 7500, orders: 590, profit: 2250 },
];

export default function AdminSalesReports() {
  const [dateRange, setDateRange] = useState('7days');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Sales Reports</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Detailed analytics and financial performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl transition-all flex items-center gap-2">
            <Download size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-dark px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10">
          <Calendar size={18} className="text-slate-400" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent border-none outline-none font-bold text-slate-700 dark:text-white"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-2 text-slate-700 dark:text-gray-300 font-bold hover:text-primary transition-colors">
          <Filter size={18} /> Advanced Filters
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">₹ 38,000</p>
          <p className="text-sm text-emerald-500 font-bold mt-2">+12.5% from last period</p>
        </div>
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Orders</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">2,739</p>
          <p className="text-sm text-emerald-500 font-bold mt-2">+8.2% from last period</p>
        </div>
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Avg. Order Value</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">₹ 1,245</p>
          <p className="text-sm text-rose-500 font-bold mt-2">-2.1% from last period</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 dark:text-white mb-6">Revenue & Profit Trend</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue2)" />
                <Area type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={3} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 dark:text-white mb-6">Orders Volume</h3>
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
        </div>
      </div>
    </div>
  );
}
