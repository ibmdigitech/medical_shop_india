import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingCart, Info, ArrowRight, Pill, Activity, FlaskConical, Zap } from 'lucide-react';
import { products } from '../data/products';
import CTASection from '../components/CTASection';
import { useCart } from '../context/CartContext';

export default function MedicinesPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Medicines', 'Wellness', 'Devices', 'Ayurvedic', 'Baby'];

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Buy Medicines Online with Free Home Delivery | Amster Med Care - Kerala</title>
        <meta name="description" content="Shop medicines online with free home delivery across Kerala. Get FLAT 25% OFF using code MED25. 24-48 hour delivery. Genuine medicines, affordable prices." />
        <meta name="keywords" content="buy medicines online, online pharmacy Kerala, generic medicines, free delivery, discount medicines, branded drugs, healthcare products" />
      </Helmet>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-accent to-red-600 text-white py-3 text-center font-bold text-sm">
        🔥 FLAT 25% OFF on All Medicines - Use Code: <span className="bg-white/20 px-2 py-0.5 rounded ml-1">MED25</span> | 🚚 Free Home Delivery
      </div>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-dark dark:to-dark-card overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-bold mb-4 tracking-wider">
              🛒 ORDER NOW & GET FREE DELIVERY
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            Buy <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Medicines Online</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            Get FLAT 25% OFF + FREE home delivery on all medicines. Order before 6 PM for same-day delivery in Omassery, Kerala.
          </motion.p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by medicine name, brand, or active ingredient..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-lg"
            />
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500"
          >
            <span>✓ Genuine Medicines Only</span>
            <span className="hidden sm:inline">|</span>
            <span>✓ Certified Pharmacists</span>
            <span className="hidden sm:inline">|</span>
            <span>✓ Same Day Delivery</span>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 space-y-8">
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Filter size={18} className="text-primary" /> Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${
                        activeCategory === cat 
                          ? 'bg-primary text-white font-bold shadow-lg shadow-primary/30' 
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 rounded-2xl p-5">
                <h4 className="text-white font-bold text-sm mb-2">Prescription Medicine?</h4>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">Simply upload your prescription and we will find the best substitutes for you.</p>
                <button className="w-full py-2 bg-white text-dark font-bold text-xs rounded-lg hover:bg-primary hover:text-white transition-all">
                  Upload Now
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-400 text-sm">Showing <span className="text-white font-bold">{filtered.length}</span> results</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  Sort by: <span className="text-white font-semibold cursor-pointer flex items-center gap-1">Popularity <ChevronDown size={12} /></span>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-dark-card border border-white/5 rounded-3xl">
                  <p className="text-gray-500">No products found for "{search}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((p, i) => (
                    <motion.div 
                      key={p.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i % 6) * 0.05 }}
                      className="bg-dark-card border border-white/10 rounded-3xl overflow-hidden hover:border-primary/40 transition-all group flex flex-col"
                    >
                       <div className="h-56 relative overflow-hidden bg-white">
                         <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         {/* Discount Badge */}
                         <span className="absolute top-4 left-4 px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-lg shadow-lg">
                           {p.discount} OFF
                         </span>
                         {p.type === 'Generic' && (
                           <span className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
                             <Zap size={12} fill="currentColor" /> GENERIC
                           </span>
                         )}
                       </div>
                       <div className="p-5 flex-1 flex flex-col bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border">
                         <div className="flex items-center justify-between mb-2">
                           <p className="text-primary text-[10px] uppercase font-bold tracking-wider">{p.brand}</p>
                           {p.type === 'Generic' && (
                             <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                               Budget Friendly
                             </span>
                           )}
                         </div>
                         <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                           {p.title}
                         </h3>
                         
                         <div className="mt-auto flex items-end justify-between">
                           <div className="flex flex-col">
                             <div className="flex items-center gap-2">
                               <span className="text-accent font-black text-2xl">₹ {p.price}</span>
                               <span className="text-gray-400 text-sm line-through">MRP ₹ {p.mrp}</span>
                             </div>
                             <p className="text-green-600 dark:text-green-400 text-[10px] font-bold mt-1">✓ Inclusive of all taxes</p>
                           </div>
                           <button 
                             onClick={() => addToCart({ ...p, name: p.title })}
                             className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 text-sm active:scale-95"
                           >
                             <ShoppingCart size={16} /> Add
                           </button>
                         </div>
                       </div>
                    </motion.div>
                  ))}
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

function ChevronDown(props) { return <ArrowRight {...props} style={{ transform: 'rotate(90deg)' }} />; }
