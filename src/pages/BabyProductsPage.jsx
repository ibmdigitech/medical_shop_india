import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShoppingCart, SlidersHorizontal, Baby
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CTASection from '../components/CTASection';

const babyCategories = ['All', 'Baby Food', 'Diapers', 'Baby Lotion', 'Feeding Bottles', 'Baby Vitamins', 'Toys & Care'];

const babyProducts = [
  {
    id: 'b1',
    title: 'Premium Newborn Diapers (Pack of 72)',
    brand: 'SoftCare',
    category: 'Diapers',
    price: 850,
    mrp: 999,
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop',
    description: 'Ultra-soft, highly absorbent diapers designed for sensitive newborn skin.',
  },
  {
    id: 'b2',
    title: 'Organic Baby Massage Oil',
    brand: 'NatureBaby',
    category: 'Baby Lotion',
    price: 320,
    mrp: 400,
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1584284566270-e483e5830eb9?w=800&auto=format&fit=crop',
    description: '100% natural blend of sweet almond and olive oil for daily baby massage.',
  },
  {
    id: 'b3',
    title: 'Anti-Colic Feeding Bottle 260ml',
    brand: 'SafeFeed',
    category: 'Feeding Bottles',
    price: 499,
    mrp: 650,
    discount: '23%',
    image: 'https://images.unsplash.com/photo-1610488059089-136b8e84a274?w=800&auto=format&fit=crop',
    description: 'BPA-free bottle with advanced anti-colic valve system for comfortable feeding.',
  },
  {
    id: 'b4',
    title: 'Multivitamin Drops for Infants',
    brand: 'HealthKids',
    category: 'Baby Vitamins',
    price: 250,
    mrp: 280,
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1518141544062-0941913f0c3d?w=800&auto=format&fit=crop',
    description: 'Essential daily vitamins A, C, and D for healthy infant growth and immunity.',
  }
];

export default function BabyProductsPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return babyProducts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Baby Care & Products | Amster Med Care</title>
        <meta name="description" content="Shop premium and safe baby care products, diapers, food, and essentials." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 bg-white dark:bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[120px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-500 text-xs font-black tracking-widest uppercase mb-6">
                <Baby size={14} /> Safe & Gentle
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Premium Baby <br />
              <span className="text-rose-500 italic">Care Essentials</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Trusted, pediatrician-approved products for your little one's health, hygiene, and happiness.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 relative w-full">
              <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search diapers, lotions, baby food..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-none rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-rose-50/30 dark:bg-dark-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg mb-6 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-rose-500" /> Categories
                  </h3>
                  <div className="space-y-3">
                    {babyCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                          activeCategory === cat 
                            ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20' 
                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-rose-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Listing */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filtered.map((p, i) => (
                  <motion.div 
                    key={p.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:border-rose-500/30 transition-all flex flex-col md:flex-row group"
                  >
                     <div className="w-full md:w-48 h-64 md:h-auto relative bg-slate-50 shrink-0">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                     </div>
                     
                     <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <p className="text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{p.brand}</p>
                         <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3 line-clamp-2">{p.title}</h3>
                         <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="text-rose-500 font-black text-2xl tracking-tighter">₹{p.price}</span>
                             <span className="text-slate-400 text-sm line-through">₹{p.mrp}</span>
                           </div>
                         </div>
                         <button 
                           onClick={() => addToCart({ ...p, name: p.title })}
                           className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
                         >
                           <ShoppingCart size={20} />
                         </button>
                       </div>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
