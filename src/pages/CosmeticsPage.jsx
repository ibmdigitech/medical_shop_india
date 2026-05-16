import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShoppingCart, SlidersHorizontal, Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';

const beautyCategories = ['All', 'Face Care', 'Hair Care', 'Makeup', 'Perfumes', 'Organic Beauty', 'Skin Treatments'];

const beautyProducts = [
  {
    id: 'c1',
    title: 'Vitamin C Serum 20%',
    brand: 'GlowSkin',
    category: 'Skin Treatments',
    price: 1299,
    mrp: 1599,
    discount: '18%',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop',
    description: 'Brightening serum for radiant skin with Hyaluronic acid and Vitamin E.',
  },
  {
    id: 'c2',
    title: 'Organic Argan Hair Oil',
    brand: 'NaturaLuxe',
    category: 'Hair Care',
    price: 850,
    mrp: 999,
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop',
    description: 'Pure cold-pressed Moroccan argan oil for frizz-free, shiny hair.',
  },
  {
    id: 'c3',
    title: 'Matte Liquid Lipstick',
    brand: 'ColorGlam',
    category: 'Makeup',
    price: 650,
    mrp: 800,
    discount: '18%',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop',
    description: 'Long-lasting, smudge-proof liquid lipstick in everyday nude shades.',
  },
  {
    id: 'c4',
    title: 'Hydrating Night Cream',
    brand: 'DermaCare',
    category: 'Face Care',
    price: 1450,
    mrp: 1800,
    discount: '19%',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop',
    description: 'Intense overnight hydration mask with peptides and ceramides.',
  }
];

export default function CosmeticsPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return beautyProducts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Premium Cosmetics & Beauty | Amster Med Care</title>
        <meta name="description" content="Shop premium skincare, haircare, and organic beauty products." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 bg-white dark:bg-dark overflow-hidden">
        <Breadcrumbs currentPage="Premium Beauty & Skincare" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 font-black tracking-widest uppercase mb-6 text-xs">
                <Sparkles size={14} /> Dermatologically Tested
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Premium Beauty & <br />
              <span className="text-amber-500 italic">Skincare Center</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Discover clinical-grade skincare, organic beauty essentials, and premium cosmetics curated for your skin type.
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
                placeholder="Search serums, moisturizers, brands..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-none rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-amber-50/30 dark:bg-dark-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg mb-6 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-amber-500" /> Categories
                  </h3>
                  <div className="space-y-3">
                    {beautyCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                          activeCategory === cat 
                            ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' 
                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-amber-500'
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
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:border-amber-500/30 transition-all flex flex-col md:flex-row group"
                  >
                     <div className="w-full md:w-48 h-64 md:h-auto relative bg-slate-50 shrink-0">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                     </div>
                     
                     <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{p.brand}</p>
                         <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3 line-clamp-2">{p.title}</h3>
                         <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="text-amber-500 font-black text-2xl tracking-tighter">₹{p.price}</span>
                             <span className="text-slate-400 text-sm line-through">₹{p.mrp}</span>
                           </div>
                         </div>
                         <button 
                           onClick={() => addToCart({ ...p, name: p.title })}
                           className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
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
