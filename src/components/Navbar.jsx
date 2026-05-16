import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Menu, X, Search, User, 
  MapPin, ChevronDown, Upload, Phone,
  Sun, Moon, Globe, Zap, ArrowRight, Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Medicines', path: '/medicines' },
  { name: 'Compare Medicines', path: '/compare-medicines' },
  { name: 'Lab Tests', path: '/lab-tests' },
  { name: 'Ayurvedic', path: '/ayurvedic-products' },
  { name: 'Store Locator', path: '/stores' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-2xl shadow-xl py-3 border-b border-slate-100 dark:border-white/5' 
          : 'bg-white/95 dark:bg-dark/95 backdrop-blur-md py-4 border-b border-slate-50 dark:border-white/5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo Section - Left Aligned */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Home">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 border border-slate-100 p-0.5">
              <img src={logo} alt="Amster Med Care Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">AMSTER</span>
              <span className="text-[8px] sm:text-[9px] font-black text-primary tracking-[0.3em] uppercase mt-0.5">Med Care</span>
            </div>
          </Link>

          {/* Deliver to Section - Refined */}
          <div className="hidden xl:flex items-center gap-3 text-slate-500 px-4 h-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary/50 transition-all cursor-pointer group shrink-0">
            <div className="text-primary">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Deliver to</p>
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-900 dark:text-white leading-none">Omassery, Kerala</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Desktop Nav - Perfectly Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 h-12 rounded-2xl border border-slate-200/50 dark:border-white/5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 h-full flex items-center rounded-xl text-[13px] font-black tracking-tight transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-primary shadow-lg shadow-primary/20'
                        : 'text-slate-600 dark:text-gray-400 hover:text-primary'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Action Section - Uniform Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-500 hover:text-primary transition-all active:scale-90"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <Link 
              to="/cart" 
              className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-600 dark:text-gray-300 hover:text-primary transition-all active:scale-90"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-dark shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            <button 
              onClick={toggle}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-500 hover:text-primary transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl active:scale-90 transition-all border border-slate-200 dark:border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-dark-card border-b border-slate-100 dark:border-white/5 px-4 py-6 shadow-2xl"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" />
                <input 
                  type="search"
                  autoFocus
                  placeholder="Search medicines, wellness products, surgicals..." 
                  className="w-full pl-16 pr-8 py-5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-3xl text-lg font-bold focus:outline-none focus:border-primary transition-all shadow-inner"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] lg:hidden flex justify-end"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div 
              className="relative w-80 h-full bg-white dark:bg-dark shadow-2xl flex flex-col pt-32 px-6"
            >
              <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                <button 
                  onClick={toggle}
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10"
                >
                  {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <button onClick={() => setMobileOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-6 py-4 rounded-2xl text-lg font-black tracking-tight transition-all ${
                        isActive
                          ? 'text-primary bg-primary/10 shadow-sm'
                          : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              
              <div className="mt-12 space-y-4">
                <Link
                  to="/upload-prescription"
                  className="w-full py-5 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                  <Upload size={20} /> Upload Prescription
                </Link>
                <Link
                  to="/medicines"
                  className="w-full py-5 bg-accent-dark text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-accent/20"
                >
                  <ShoppingCart size={20} /> Browse Medicines
                </Link>
              </div>

              <div className="mt-auto pb-12">
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Support</p>
                  <a href="tel:+919037507643" className="flex items-center justify-center gap-3 text-slate-900 dark:text-white font-black mb-3 text-lg">
                    <Phone size={20} className="text-primary" /> +91 90375 07643
                  </a>
                  <p className="text-xs text-slate-400 text-center font-bold italic">Available 24/7 for you.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
