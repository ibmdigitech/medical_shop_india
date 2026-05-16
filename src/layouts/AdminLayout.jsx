import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  BarChart3, FileCheck, Pill, Truck, Tag, 
  Settings, LogOut, Menu, X, Bell, Search 
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/logo.png';

const sidebarLinks = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
  { path: '/admin/sales-reports', icon: BarChart3, label: 'Sales Reports' },
  { path: '/admin/stock-audit', icon: FileCheck, label: 'Stock Audit' },
  { path: '/admin/prescriptions', icon: Pill, label: 'Prescriptions' },
  { path: '/admin/delivery', icon: Truck, label: 'Delivery' },
  { path: '/admin/offers', icon: Tag, label: 'Offers & Coupons' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-white/10 flex flex-col z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 dark:text-white leading-none">Admin Panel</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Amster ERP</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white'
                }`
              }
            >
              <link.icon size={20} className="shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 rounded-xl"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 w-64 md:w-96 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <ThemeToggle />
            <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-dark-card rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Admin User</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black shadow-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
