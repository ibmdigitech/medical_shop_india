import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, SlidersHorizontal, Leaf
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CTASection from '../components/CTASection';

const ayurvedicCategories = ['All', 'Herbal Medicines', 'Organic Supplements', 'Ayurvedic Oils', 'Natural Skincare', 'Wellness Teas', 'Immunity Products'];

const ayurvedicProducts = [
  {
    id: 'ay1',
    title: 'Ashwagandha Extract 500mg',
    brand: 'NaturesVeda',
    category: 'Organic Supplements',
    price: 350,
    mrp: 450,
    discount: '22%',
    image: 'https://images.unsplash.com/photo-1611078589886-f1ac1702fdb6?w=800&auto=format&fit=crop',
    description: 'Pure stress relief and vitality support supplement made from organic Ashwagandha roots.',
  },
  {
    id: 'ay2',
    title: 'Bhringraj Hair Growth Oil',
    brand: 'KamaAyurveda',
    category: 'Ayurvedic Oils',
    price: 650,
    mrp: 750,
    discount: '13%',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop',
    description: 'Intensive hair treatment to prevent hair loss and promote lush hair growth.',
  },
  {
    id: 'ay3',
    title: 'Tulsi Green Tea (25 Bags)',
    brand: 'OrganicIndia',
    category: 'Wellness Teas',
    price: 180,
    mrp: 200,
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220c4c7?w=800&auto=format&fit=crop',
    description: 'Stress-relieving and refreshing herbal tea with immunity-boosting properties.',
  },
  {
    id: 'ay4',
    title: 'Chyawanprash Immunity Booster',
    brand: 'Dabur',
    category: 'Immunity Products',
    price: 320,
    mrp: 380,
    discount: '15%',
    image: 'https://images.unsplash.com/photo-1596541223130-5d56a74aeced?w=800&auto=format&fit=crop',
    description: 'Traditional Ayurvedic formulation to boost immunity and overall strength.',
  }
];

export default function AyurvedicPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return ayurvedicProducts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Ayurvedic & Natural Wellness | Amster Med Care</title>
        <meta name="description" content="Shop authentic Ayurvedic medicines, herbal supplements, and natural wellness products." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 bg-white dark:bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 font-black tracking-widest uppercase mb-6 text-xs">
                <Leaf size={14} /> 100% Natural & Authentic
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Traditional <br />
              <span className="text-emerald-500 italic">Ayurvedic Wellness</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Experience the power of ancient Indian healing with our premium range of organic herbal products.
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
                placeholder="Search herbal supplements, oils, brands..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-none rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-emerald-50/30 dark:bg-dark-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg mb-6 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-emerald-600" /> Categories
                  </h3>
                  <div className="space-y-3">
                    {ayurvedicCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                          activeCategory === cat 
                            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-emerald-500'
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
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:border-emerald-500/30 transition-all flex flex-col md:flex-row group"
                  >
                     <div className="w-full md:w-48 h-64 md:h-auto relative bg-slate-50 shrink-0">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                     </div>
                     
                     <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{p.brand}</p>
                         <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3 line-clamp-2">{p.title}</h3>
                         <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="text-emerald-600 font-black text-2xl tracking-tighter">₹{p.price}</span>
                             <span className="text-slate-400 text-sm line-through">₹{p.mrp}</span>
                           </div>
                         </div>
                         <button 
                           onClick={() => addToCart({ ...p, name: p.title })}
                           className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
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
