import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Zap, ShoppingCart, Search, MapPin, Upload } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Medicines', path: '/medicines' },
  { name: 'Compare Medicines', path: '/compare-medicines' },
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
    <nav className="relative" itemScope itemType="https://schema.org/Pharmacy">
      {/* Top Bar - Delivery & Offers */}
      <div className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white text-xs font-bold py-2 text-center uppercase tracking-wider">
        <span className="hidden sm:inline">🏠 FREE Home Delivery </span>
        <span className="hidden md:inline mx-2">|</span>
        <span className="text-accent-light animate-pulse">🔥 FLAT 25% OFF on All Medicines - Use Code: MED25</span>
        <span className="hidden sm:inline mx-2">|</span>
        <span className="hidden sm:inline">📦 Order Before 6PM & Get Same Day Delivery</span>
      </div>
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-app-bg/95 backdrop-blur-xl border-b border-app-border shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ top: scrolled ? '0' : '38px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="Home">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src="/logo.png" alt="Amster Med Care Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-app-text tracking-tight">AMSTER</span>
                <span className="text-xs font-bold text-primary tracking-wider uppercase">MED CARE</span>
              </div>
            </Link>

            {/* Location Selector */}
            <div className="hidden xl:flex items-center gap-2 text-gray-500 dark:text-gray-300 text-xs px-3 py-1.5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg hover:border-primary transition-all cursor-pointer">
              <MapPin size={14} className="text-primary" />
              <span className="whitespace-nowrap">Deliver to: <b className="text-app-text">Omassery, Kerala</b></span>
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
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md relative group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="search"
                placeholder="Search medicines, wellness products..." 
                aria-label="Search medicines"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-sm text-app-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Icons & CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                aria-label="Open search"
              >
                <Search size={22} />
              </button>
              
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors group" aria-label="Shopping cart">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-lg transition-colors" />
                <ShoppingCart size={22} className="relative" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white" aria-label={`Cart contains ${cartCount} items`}>
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/upload-prescription"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Upload prescription"
              >
                <Upload size={16} /> <span className="hidden xl:inline">Upload Rx</span>
              </Link>

              {/* Main CTA - Order Now */}
              <Link
                to="/medicines"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-accent/50 hover:scale-105 active:scale-95 transition-all duration-300"
                aria-label="Order medicines now"
              >
                🚚 Order Now
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-all"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
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
              className="md:hidden bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-4 py-3"
            >
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="search"
                  autoFocus
                  placeholder="Search medicines, products..." 
                  aria-label="Search medicines mobile"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-sm text-app-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-dark-card border-l border-gray-200 dark:border-dark-border flex flex-col pt-24 px-6">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/5'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              
              {/* Mobile Promo Banner */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                <p className="text-sm font-bold text-primary mb-2">🎯 Special Offer</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">FLAT 25% OFF on all medicines. Order now & get free home delivery.</p>
                <Link
                  to="/medicines"
                  className="block w-full text-center py-2.5 bg-accent text-white font-bold rounded-lg text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Shop Now
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/upload-prescription"
                  className="flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <Upload size={18} /> Upload Prescription
                </Link>
                <Link
                  to="/contact"
                  className="block text-center py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white font-semibold rounded-xl shadow-lg shadow-secondary/20"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
