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
        <title>Medicines - Amster Med Care</title>
        <meta name="description" content="Shop generic and branded medicines online. High-quality healthcare products with fast delivery in UAE and India." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white mb-4">
            Shop <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Healthcare</span>
          </motion.h1>
          
          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by medicine name, brand or molecule..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-xl"
            />
          </div>
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
                      <div className="h-56 relative overflow-hidden bg-white/5">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-4 left-4 px-2.5 py-1 bg-secondary text-white text-[10px] font-bold rounded-lg shadow-lg">
                          {p.discount}
                        </span>
                        {p.type === 'Generic' && (
                          <span className="absolute top-4 right-4 px-2.5 py-1 bg-green-500/80 backdrop-blur text-white text-[10px] font-bold rounded-lg shadow-lg flex items-center gap-1">
                            <Zap size={10} fill="currentColor" /> GENERIC
                          </span>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-primary-light text-[10px] uppercase font-bold tracking-widest">{p.brand}</p>
                          <Info size={14} className="text-gray-500 cursor-help" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-4 group-hover:text-primary-light transition-colors line-clamp-2 leading-tight">
                          {p.title}
                        </h3>
                        
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-black text-2xl">₹ {p.price}</span>
                              <span className="text-gray-500 text-sm line-through">MRP ₹ {p.mrp}</span>
                            </div>
                            <p className="text-green-400 text-[10px] font-bold mt-1">Inclusive of all taxes</p>
                          </div>
                          <button 
                            onClick={() => addToCart({ ...p, name: p.title })}
                            className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 text-sm active:scale-95"
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
