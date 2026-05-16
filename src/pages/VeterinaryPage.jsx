import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, ShoppingCart, 
  ChevronDown, ArrowRight, ShieldCheck, 
  Upload, SlidersHorizontal, HeartPulse
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';

const petCategories = ['All', 'Dog Care', 'Cat Care', 'Bird Care', 'Livestock Care', 'Pet Nutrition', 'Veterinary Medicines'];

const vetProducts = [
  {
    id: 'v1',
    title: 'Advanced Joint Supplement for Dogs',
    brand: 'PetCare Pro',
    category: 'Pet Nutrition',
    price: 899,
    mrp: 1200,
    discount: '25%',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop',
    description: 'Premium joint care supplement formulated for large breed dogs to maintain mobility.',
    type: 'Supplement'
  },
  {
    id: 'v2',
    title: 'Flea & Tick Treatment for Cats',
    brand: 'FelineGuard',
    category: 'Cat Care',
    price: 450,
    mrp: 550,
    discount: '18%',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop',
    description: 'Fast-acting topical flea and tick prevention for cats over 8 weeks old.',
    type: 'Medicine'
  },
  {
    id: 'v3',
    title: 'Livestock Vitamin Complex',
    brand: 'AgriHealth',
    category: 'Livestock Care',
    price: 1250,
    mrp: 1500,
    discount: '16%',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&auto=format&fit=crop',
    description: 'Essential multi-vitamin liquid for healthy livestock growth and immunity.',
    type: 'Supplement'
  },
  {
    id: 'v4',
    title: 'Premium Puppy Food',
    brand: 'NutriPet',
    category: 'Pet Nutrition',
    price: 1899,
    mrp: 2200,
    discount: '13%',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop',
    description: 'Complete and balanced nutrition for growing puppies of all breeds.',
    type: 'Food'
  }
];

export default function VeterinaryPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  const filtered = useMemo(() => {
    return vetProducts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Veterinary & Pet Care | Amster Med Care</title>
        <meta name="description" content="Shop premium veterinary medicines, pet nutrition, and livestock healthcare products." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 bg-white dark:bg-dark overflow-hidden">
        <Breadcrumbs currentPage="Veterinary & Animal Healthcare" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-black tracking-widest uppercase mb-6">
                <HeartPulse size={14} /> Premium Pet Care
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Veterinary & <br />
              <span className="text-secondary italic">Animal Healthcare</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Quality medicines, nutrition, and wellness products for your beloved pets and livestock.
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
                placeholder="Search pet medicines, brands, or categories..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-none rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-slate-50/50 dark:bg-dark-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg mb-6 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-secondary" /> Categories
                  </h3>
                  <div className="space-y-3">
                    {petCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                          activeCategory === cat 
                            ? 'bg-secondary text-white shadow-xl shadow-secondary/20' 
                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-secondary'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
                   <div className="relative z-10">
                     <h4 className="text-white font-black text-xl mb-3">Consult a Vet</h4>
                     <p className="text-slate-400 text-sm mb-6">Need expert advice for your pet? Book a consultation with our veterinary experts.</p>
                     <button className="px-6 py-3 bg-white text-slate-900 font-black text-xs rounded-xl hover:bg-secondary hover:text-white transition-all uppercase tracking-widest">
                       Book Now
                     </button>
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
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:border-secondary/30 transition-all flex flex-col md:flex-row group"
                  >
                     <div className="w-full md:w-48 h-64 md:h-auto relative bg-slate-50 shrink-0">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                     </div>
                     
                     <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <p className="text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-2">{p.brand}</p>
                         <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3 line-clamp-2">{p.title}</h3>
                         <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="text-secondary font-black text-2xl tracking-tighter">₹{p.price}</span>
                             <span className="text-slate-400 text-sm line-through">₹{p.mrp}</span>
                           </div>
                         </div>
                         <button 
                           onClick={() => addToCart({ ...p, name: p.title })}
                           className="w-12 h-12 bg-secondary text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
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
