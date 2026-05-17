import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coins, ShoppingCart, Users, Package, 
  TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle2, XCircle, Download 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { getTaxProfile } from '../../services/taxProfiles';

const salesData = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 139 },
  { name: 'Wed', revenue: 5000, orders: 380 },
  { name: 'Thu', revenue: 4500, orders: 290 },
  { name: 'Fri', revenue: 6000, orders: 480 },
  { name: 'Sat', revenue: 8000, orders: 620 },
  { name: 'Sun', revenue: 7500, orders: 590 },
];

const categoryRevenue = [
  { name: 'OTC Medicines', value: 42000, color: '#059669' },
  { name: 'Prescription', value: 31500, color: '#0891B2' },
  { name: 'Wellness', value: 21000, color: '#3B82F6' },
  { name: 'Devices', value: 14500, color: '#F59E0B' },
];

const deliveryData = [
  { name: 'Week 1', onTime: 92, delayed: 8 },
  { name: 'Week 2', onTime: 94, delayed: 6 },
  { name: 'Week 3', onTime: 89, delayed: 11 },
  { name: 'Week 4', onTime: 96, delayed: 4 },
];

const dashboardKpis = [
  { metric: 'Total Revenue', value: '124500', trend: '+14.5%', owner: 'Sales' },
  { metric: 'Total Orders', value: '842', trend: '+8.2%', owner: 'Orders' },
  { metric: 'Total Customers', value: '4210', trend: '+12.1%', owner: 'CRM' },
  { metric: 'Inventory Value', value: '892000', trend: '+6.8%', owner: 'Inventory' },
  { metric: 'Pending Deliveries', value: '31', trend: '-3.1%', owner: 'Delivery' },
  { metric: 'Prescription Requests', value: '18', trend: '+4.9%', owner: 'Pharmacy' },
  { metric: 'Low Stock Items', value: '24', trend: '-2.4%', owner: 'Inventory' },
];

const recentOrders = [
  { id: 'ORD-9001', customer: 'Aisha Mohammed', items: 3, amount: 1240, status: 'Pending', payment: 'COD' },
  { id: 'ORD-9002', customer: 'Rahul Krishnan', items: 2, amount: 860, status: 'Processing', payment: 'Paid' },
  { id: 'ORD-9003', customer: 'Sneha Patel', items: 5, amount: 2150, status: 'RX Review', payment: 'Paid' },
  { id: 'ORD-9004', customer: 'John Doe', items: 1, amount: 295, status: 'Delivered', payment: 'Paid' },
];

const lowStockItems = [
  { name: 'Paracetamol 500mg', sku: 'PRD-PARA-500', stock: 12, reorderLevel: 75, supplier: 'Gulf Drug LLC', status: 'Critical' },
  { name: 'Vitamin C Tablets', sku: 'PRD-VITC-1000', stock: 45, reorderLevel: 90, supplier: 'Aster Distribution', status: 'Warning' },
  { name: 'Dolo 650', sku: 'PRD-DOLO-650', stock: 8, reorderLevel: 80, supplier: 'Modern Pharmaceutical LLC', status: 'Critical' },
  { name: 'Cough Syrup', sku: 'PRD-COUGH-100', stock: 24, reorderLevel: 60, supplier: 'Gulf Drug LLC', status: 'Warning' },
];

const reportRows = [
  { module: 'Revenue', detail: 'Gross sales today', value: '18,420', risk: 'Healthy', action: 'Track peak-hour conversion' },
  { module: 'Orders', detail: 'Awaiting pharmacist or dispatch action', value: '47', risk: 'Medium', action: 'Clear pending queue before 6 PM' },
  { module: 'Inventory', detail: 'SKUs below reorder point', value: '24', risk: 'High', action: 'Raise supplier purchase order' },
  { module: 'Prescriptions', detail: 'RX files pending review', value: '18', risk: 'High', action: 'Assign licensed pharmacist' },
  { module: 'Delivery', detail: 'Delayed delivery jobs', value: '2', risk: 'Medium', action: 'Re-route nearest riders' },
  { module: 'Tax', detail: 'VAT/GST invoice audit status', value: '97%', risk: 'Low', action: 'Export tax ledger weekly' },
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
  const navigate = useNavigate();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('AED');
  const [revenueText, setRevenueText] = useState('AED 124,500');

  useEffect(() => {
    const profile = getTaxProfile(localStorage.getItem('erpTaxRegion') || 'United Arab Emirates');
    const savedCurrency = localStorage.getItem('erpCurrency') || profile.currency;
    setCurrencySymbol(savedCurrency);
    setRevenueText(`${savedCurrency} 124,500`);
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const generatedAt = new Date().toISOString();
      const taxRegion = localStorage.getItem('erpTaxRegion') || 'United Arab Emirates';
      const vatRate = localStorage.getItem('erpVatRate') || '5';
      const taxRegistrationNumber = localStorage.getItem('erpTaxRegistrationNumber') || '100348572900003';
      const storeName = localStorage.getItem('erpStoreName') || 'Amster Med Care';
      const sections = [
        ['AMSTER MED CARE ERP DASHBOARD REPORT'],
        ['Generated At', generatedAt],
        ['Store', storeName],
        ['Currency', currencySymbol],
        ['Tax Region', taxRegion],
        ['Tax Rate', `${vatRate}%`],
        ['Tax Registration', taxRegistrationNumber],
        [],
        ['KPI SUMMARY'],
        ['Metric', 'Value', 'Trend', 'Owner'],
        ...dashboardKpis.map((item) => [item.metric, item.value, item.trend, item.owner]),
        [],
        ['DAILY SALES ANALYTICS'],
        ['Day', 'Revenue', 'Orders'],
        ...salesData.map((item) => [item.name, item.revenue, item.orders]),
        [],
        ['CATEGORY REVENUE'],
        ['Category', 'Revenue'],
        ...categoryRevenue.map((item) => [item.name, item.value]),
        [],
        ['DELIVERY PERFORMANCE'],
        ['Week', 'On Time %', 'Delayed %'],
        ...deliveryData.map((item) => [item.name, item.onTime, item.delayed]),
        [],
        ['RECENT ORDERS'],
        ['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'Payment'],
        ...recentOrders.map((order) => [order.id, order.customer, order.items, order.amount, order.status, order.payment]),
        [],
        ['LOW STOCK ALERTS'],
        ['Product', 'SKU', 'Current Stock', 'Reorder Level', 'Supplier', 'Status'],
        ...lowStockItems.map((item) => [item.name, item.sku, item.stock, item.reorderLevel, item.supplier, item.status]),
        [],
        ['MANAGEMENT ACTION REPORT'],
        ['Module', 'Detail', 'Value', 'Risk', 'Recommended Action'],
        ...reportRows.map((row) => [row.module, row.detail, row.value, row.risk, row.action]),
      ];
      const csvContent = sections
        .map((row) => row.map((cell = '') => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AmsterMedCare_ERP_Dashboard_Full_Report_${generatedAt.slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setIsExportModalOpen(false);
    }, 2000);
  };

  const quickActions = [
    {
      label: 'Add Product',
      onClick: () => navigate('/admin/products', { state: { openAddProduct: true } }),
    },
    {
      label: 'Create Order',
      onClick: () => navigate('/admin/orders'),
    },
    {
      label: 'Upload Stock',
      onClick: () => navigate('/admin/stock-audit', { state: { openNewAudit: true } }),
    },
    {
      label: 'Generate Report',
      onClick: () => setIsExportModalOpen(true),
    },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={revenueText} 
          icon={Coins} 
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
          title="Inventory Value"
          value={`${currencySymbol} 892K`}
          icon={Package}
          trend="up"
          trendValue="+6.8%"
          color="bg-gradient-to-br from-cyan-400 to-secondary"
        />
        <StatCard 
          title="Pending Deliveries"
          value="31"
          icon={Clock}
          trend="down"
          trendValue="-3.1%"
          color="bg-gradient-to-br from-amber-400 to-orange-500"
        />
        <StatCard 
          title="RX Requests"
          value="18"
          icon={CheckCircle2}
          trend="up"
          trendValue="+4.9%"
          color="bg-gradient-to-br from-teal-400 to-emerald-600"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm"
        >
          <h3 className="font-black text-lg text-slate-900 dark:text-white mb-6">Category Revenue</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryRevenue} innerRadius={58} outerRadius={92} paddingAngle={4} dataKey="value">
                  {categoryRevenue.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categoryRevenue.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm"
        >
          <h3 className="font-black text-lg text-slate-900 dark:text-white mb-6">Delivery Performance</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="onTime" stroke="#059669" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="delayed" stroke="#E11D48" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-gradient-to-br from-slate-900 to-cyan-950 p-6 rounded-3xl border border-white/10 shadow-sm text-white"
        >
          <h3 className="font-black text-lg mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="px-4 py-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl text-sm font-black transition-all text-left"
              >
                {action.label}
              </button>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/10">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-200 mb-1">DHA Readiness</p>
            <p className="text-2xl font-black">97%</p>
            <p className="text-xs text-slate-300 mt-1">Audit logs, RX approvals, and country tax records are current.</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Recent Orders</h3>
            <button onClick={() => navigate('/admin/orders')} className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent dark:hover:border-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-gray-300">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{order.id}</h4>
                    <p className="text-xs text-slate-500">2 mins ago • 3 items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 dark:text-white">{currencySymbol} {order.amount}</p>
                  <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-[10px] font-black rounded uppercase tracking-wider mt-1">
                    {order.status}
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
            <button onClick={() => navigate('/admin/products')} className="text-primary font-bold text-sm hover:underline">Manage Inventory</button>
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.sku} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent dark:hover:border-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.status === 'Critical' ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                  }`}>
                    <Package size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-xs text-slate-500">Supplier: {item.supplier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 dark:text-white">{item.stock} left</p>
                  <p className={`text-[10px] font-black uppercase tracking-wider mt-1 ${
                    item.status === 'Critical' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {item.status === 'Critical' ? 'Reorder Now' : 'Low Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Full Dashboard Report Details</h3>
            <p className="text-sm text-slate-500 font-bold">Operational risks, values, and recommended next actions.</p>
          </div>
          <button onClick={() => setIsExportModalOpen(true)} className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-black text-sm transition-all">
            Download Full Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Module</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Detail</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Value</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Risk</th>
                <th className="p-4 text-xs font-black text-slate-500 uppercase tracking-widest">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {reportRows.map((row) => (
                <tr key={row.module} className="hover:bg-slate-50/70 dark:hover:bg-white/5">
                  <td className="p-4 font-black text-slate-900 dark:text-white">{row.module}</td>
                  <td className="p-4 text-sm font-bold text-slate-600 dark:text-gray-300">{row.detail}</td>
                  <td className="p-4 font-black text-primary">{row.value}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                      row.risk === 'High'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                        : row.risk === 'Medium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-600 dark:text-gray-300">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
