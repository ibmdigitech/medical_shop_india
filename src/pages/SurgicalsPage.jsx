import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Search, ShoppingCart, SlidersHorizontal, Stethoscope
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import CTASection from '../components/CTASection';
import Breadcrumbs from '../components/Breadcrumbs';

const surgicalCategories = ['All', 'Surgical Instruments', 'Gloves & Masks', 'Diagnostic Devices', 'Hospital Furniture', 'First Aid Supplies', 'Medical Consumables'];

const surgicalProducts = [
  {
    id: 's1',
    title: 'Digital Blood Pressure Monitor',
    brand: 'Omron',
    category: 'Diagnostic Devices',
    price: 2100,
    mrp: 2500,
    discount: '16%',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop',
    description: 'Accurate and automatic upper arm blood pressure monitor with digital display.',
  },
  {
    id: 's2',
    title: 'Sterile Surgical Gloves (Box of 100)',
    brand: 'NitrilePro',
    category: 'Gloves & Masks',
    price: 450,
    mrp: 600,
    discount: '25%',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&auto=format&fit=crop',
    description: 'Powder-free, latex-free nitrile examination gloves for medical professionals.',
  },
  {
    id: 's3',
    title: 'Professional Stethoscope',
    brand: 'Littmann',
    category: 'Diagnostic Devices',
    price: 8500,
    mrp: 9500,
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800&auto=format&fit=crop',
    description: 'High acoustic sensitivity stethoscope for general physical assessment.',
  },
  {
    id: 's4',
    title: 'First Aid Trauma Kit',
    brand: 'MedKit',
    category: 'First Aid Supplies',
    price: 1200,
    mrp: 1500,
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&auto=format&fit=crop',
    description: 'Comprehensive emergency first aid kit suitable for clinics and hospitals.',
  }
];

export default function SurgicalsPage() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return surgicalProducts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Surgicals & Medical Equipment | Amster Med Care</title>
        <meta name="description" content="Professional surgical instruments, hospital supplies, and diagnostic devices." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 bg-white dark:bg-dark overflow-hidden">
        <Breadcrumbs currentPage="Surgicals & Medical Equipment" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-600 font-black tracking-widest uppercase mb-6 text-xs">
                <Stethoscope size={14} /> Medical Grade Quality
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Surgicals & <br />
              <span className="text-blue-600 italic">Hospital Supplies</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Professional medical devices, surgical instruments, and clinical supplies trusted by healthcare providers.
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
                placeholder="Search equipment, devices, supplies..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-white/5 border-none rounded-2xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 bg-blue-50/30 dark:bg-dark-card/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[32px] p-8 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-black text-lg mb-6 flex items-center gap-3">
                    <SlidersHorizontal size={20} className="text-blue-600" /> Categories
                  </h3>
                  <div className="space-y-3">
                    {surgicalCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                          activeCategory === cat 
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                            : 'bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-blue-600'
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
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden hover:shadow-2xl hover:border-blue-600/30 transition-all flex flex-col md:flex-row group"
                  >
                     <div className="w-full md:w-48 h-64 md:h-auto relative bg-slate-50 shrink-0">
                       <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                     </div>
                     
                     <div className="p-8 flex-1 flex flex-col justify-between">
                       <div>
                         <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{p.brand}</p>
                         <h3 className="text-slate-900 dark:text-white font-black text-xl mb-3 line-clamp-2">{p.title}</h3>
                         <p className="text-slate-400 text-sm mb-6 line-clamp-2">{p.description}</p>
                       </div>
                       
                       <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="text-blue-600 font-black text-2xl tracking-tighter">₹{p.price}</span>
                             <span className="text-slate-400 text-sm line-through">₹{p.mrp}</span>
                           </div>
                         </div>
                         <button 
                           onClick={() => addToCart({ ...p, name: p.title })}
                           className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
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
