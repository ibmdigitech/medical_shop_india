import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, ShoppingCart, Zap, 
  ChevronDown, ArrowRight, ShieldCheck, Clock,
  Tag, Info, Upload, SlidersHorizontal
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import CTASection from '../components/CTASection';

const categories = ['All', 'Medicines', 'Wellness', 'Devices', 'Ayurvedic', 'Baby'];

export default function MedicinesPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Medicines & Healthcare | Amster Med Care Premium Online Pharmacy</title>
        <meta name="description" content="Shop premium quality medicines and healthcare products online. Free home delivery across Kerala. Guaranteed authentic products." />
      </Helmet>

      {/* Modern Header Section */}
      <section className="relative pt-12 pb-24 px-4 bg-white dark:bg-dark overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black tracking-widest uppercase mb-6">
                <ShieldCheck size={14} /> Genuine Medicines Only
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight"
            >
              Order Your <br />
              <span className="text-primary italic">Healthcare Essentials</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Get high-quality medicines delivered to your doorstep. Free delivery on orders above ₹499 in Omassery.
            </motion.p>
          </div>

          {/* Premium Search & Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-4 shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 relative w-full">
              <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by medicine name, brand, or disease..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-none rounded-2xl text-slate-900 dark:text-white font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            
            <div className="w-px h-10 bg-slate-100 dark:bg-white/10 hidden md:block" />
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Search <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-slate-50/50 dark:bg-dark-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sophisticated Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* Category Filter */}
                <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg mb-6 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-primary" /> Categories
                  </h3>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full group flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                          activeCategory === cat 
                            ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {cat}
                        <ChevronDown size={14} className={`${activeCategory === cat ? 'rotate-0' : '-rotate-90 opacity-0 group-hover:opacity-100'} transition-all`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prescription Box */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -mr-12 -mt-12" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                      <Upload size={24} />
                    </div>
                    <h4 className="text-white font-black text-xl mb-3">Upload Prescription</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">Can't find your medicine? Just upload your prescription and we'll handle it.</p>
                    <Link to="/upload-prescription" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-black text-xs rounded-xl hover:bg-primary hover:text-white transition-all uppercase tracking-widest">
                      Upload Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </aside>

            {/* Product Listing */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Explore Products</h2>
                  <p className="text-slate-400 text-sm font-bold">Showing {filtered.length} curated essentials</p>
                </div>
                
                <div className="flex items-center gap-3 bg-white dark:bg-dark-card p-2 rounded-2xl border border-slate-100 dark:border-white/5">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest px-3">Sort by</span>
                  <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-slate-50 dark:bg-white/5 border-none rounded-xl text-xs font-black text-slate-900 dark:text-white py-2 px-4 focus:outline-none"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="py-32 text-center bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px]"
                >
                  <Search size={64} className="mx-auto text-slate-200 mb-6" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-slate-400">Try adjusting your search or filters.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
                  <AnimatePresence mode='popLayout'>
                    {filtered.map((p, i) => (
                      <motion.div 
                        key={p.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: (i % 8) * 0.05 }}
                        className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 group flex flex-col md:flex-row"
                      >
                         <div className="w-full md:w-48 h-64 md:h-auto relative overflow-hidden bg-slate-50 shrink-0">
                           <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute top-4 left-4 flex flex-col gap-2">
                             <span className="px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                             {p.type === 'Generic' && (
                               <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest">
                                 Generic
                               </span>
                             )}
                           </div>
                         </div>
                         
                         <div className="p-8 flex-1 flex flex-col justify-between">
                           <div>
                             <div className="flex items-center justify-between mb-3">
                               <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{p.brand}</p>
                               <div className="flex items-center gap-1 text-amber-400">
                                 <Star size={14} fill="currentColor" />
                                 <span className="text-slate-900 dark:text-white font-black text-xs">{p.rating}</span>
                               </div>
                             </div>
                             <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                               {p.title}
                             </h3>
                             <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{p.description}</p>
                           </div>
                           
                           <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                             <div>
                               <div className="flex items-center gap-3 mb-1">
                                 <span className="text-primary font-black text-3xl tracking-tighter">₹{p.price}</span>
                                 <span className="text-slate-400 text-sm line-through">₹{p.mrp}</span>
                               </div>
                               <p className="text-green-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                                 <ShieldCheck size={10} /> Trusted Product
                               </p>
                             </div>
                             
                             <button 
                               onClick={() => addToCart({ ...p, name: p.title })}
                               className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center hover:scale-110 active:scale-90 transition-all group-hover:rotate-6"
                             >
                               <ShoppingCart size={24} className="fill-white" />
                             </button>
                           </div>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
