import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, ShoppingCart, Search, MapPin, Upload } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Medicines', path: '/medicines' },
  { name: 'Lab Tests', path: '/lab-tests' },
  { name: 'Wellness', path: '/wellness' },
  { name: 'Store Locator', path: '/stores' },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Zap size={22} className="text-white" />
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-xl font-bold text-white tracking-tight">IBM</span>
                <span className="text-xs font-semibold text-primary-light tracking-widest uppercase">DigiTech</span>
              </div>
            </Link>

            {/* Location Selector (Medkart Reference) */}
            <div className="hidden xl:flex items-center gap-2 text-gray-400 text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 transition-all cursor-pointer">
              <MapPin size={14} className="text-primary" />
              <span className="whitespace-nowrap">Deliver to: <b className="text-white">Dubai, UAE</b></span>
              <ChevronDown size={12} />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-primary-light bg-primary/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Search Bar (Medkart Reference) */}
            <div className="hidden md:flex flex-1 max-w-md relative group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search medicines or wellness products..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Icons & CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                <Search size={22} />
              </button>
              
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-400 hover:text-primary transition-colors group">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-lg transition-colors" />
                <ShoppingCart size={22} className="relative" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-dark animate-in fade-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/upload-prescription"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Upload size={16} /> <span className="hidden xl:inline">Upload</span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-all"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="md:hidden bg-dark-card border-b border-white/10 px-4 py-3"
            >
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-dark-card border-l border-white/10 flex flex-col pt-24 px-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-primary-light bg-primary/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <Link
                  to="/upload-prescription"
                  className="flex items-center justify-center gap-2 py-3 bg-white/10 border border-white/10 text-white font-semibold rounded-xl"
                >
                  <Upload size={18} /> Upload Prescription
                </Link>
                <Link
                  to="/contact"
                  className="block text-center py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/20"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
