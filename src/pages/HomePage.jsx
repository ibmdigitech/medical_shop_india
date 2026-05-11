import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Globe, Smartphone, Brain, Cloud, Shield, 
  BarChart3, CheckCircle, Zap, Users, Award, Code2, 
  Upload, Search, ShoppingCart, Activity, Pill, FlaskConical, Stethoscope 
} from 'lucide-react';
import CountUp from 'react-countup';
import { Helmet } from 'react-helmet-async';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { stats } from '../data/stats';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faqs';
import ServiceCard from '../components/ServiceCard'; // Reusing as CategoryCard
import TestimonialCard from '../components/TestimonialCard';
import FAQAccordion from '../components/FAQAccordion';
import CTASection from '../components/CTASection';
import NewsletterSection from '../components/NewsletterSection';
import { useCart } from '../context/CartContext';

const typingWords = ['Generic Medicines', 'Lab Tests', 'Health Devices', 'Wellness Products', 'Personal Care', 'Baby Care'];

const floatingIcons = [
  { icon: Pill, x: '10%', y: '20%', delay: 0 },
  { icon: Activity, x: '85%', y: '15%', delay: 0.5 },
  { icon: FlaskConical, x: '5%', y: '70%', delay: 1 },
  { icon: Stethoscope, x: '90%', y: '65%', delay: 1.5 },
  { icon: HeartPulse, x: '15%', y: '85%', delay: 2 },
  { icon: ShieldCheck, x: '80%', y: '85%', delay: 2.5 },
];

function HeartPulse(props) { return <Activity {...props} />; } // Fallback
function ShieldCheck(props) { return <Shield {...props} />; } // Fallback

const clients = [
  'Cipla', 'Abbott', 'Sun Pharma', 'Lupin',
  'GSK', 'Pfizer', 'Dabur', 'Himalaya',
];

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="py-16 px-4 bg-dark-card border-y border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: stat.id * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light mb-1">
              {isInView ? <span>{stat.value}</span> : '0'}{stat.suffix}
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[index];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % typingWords.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-accent to-secondary-light">
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

export default function HomePage() {
  const { addToCart } = useCart();
  return (
    <>
      <Helmet>
        <title>Amster Med Care - Premium Pharmacy & Generic Medicines</title>
        <meta name="description" content="Buy affordable generic medicines online from Amster Med Care. Trusted pharmacy with up to 85% savings on medicines and lab tests." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        {floatingIcons.map(({ icon: Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center text-primary-light"
            style={{ left: x, top: y }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay, ease: 'easeInOut' }}
          >
            <Icon size={20} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase">
              💊 Save Up to 85% on Medicines
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-4"
          >
            Your Trusted{' '}
            <span className="block mt-1">
              <TypingText />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Delivering high-quality generic and branded medicines, lab tests, and wellness products across India and UAE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/upload-prescription" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2">
              <Upload size={18} /> Upload Prescription
            </Link>
            <Link to="/medicines" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
              <Search size={16} /> Search Medicines
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Moving Offers Marquee */}
      <div className="bg-primary py-4 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-12 px-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">Order via WhatsApp: +91 90375 07643</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap className="text-white" size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">Free Home Delivery in Omassery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="text-white" size={20} />
                </div>
                <span className="text-white font-bold tracking-tight">100% Genuine Medicines</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />

      {/* Choose Smart, Choose Generic (Medkart USP) */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark to-dark-card overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Choose Smart, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Choose Generic!</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Wondering how generic medicines are better₹ They contain the same active ingredients, are WHO-GMP certified, and save you up to 85% compared to expensive branded medicines.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Zap, title: 'Same Effectiveness', desc: 'Identical active ingredients and therapeutic effects.' },
                  { icon: Shield, title: 'NABL Quality Checked', desc: 'Tested under strict standards for safety and purity.' },
                  { icon: Award, title: 'Doctor Recommended', desc: 'Trusted by healthcare professionals globally.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative bg-dark-card border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden group">
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-xs font-bold uppercase mb-1">Branded Medicine</p>
                      <h4 className="text-white font-bold text-lg">Branded X</h4>
                    </div>
                    <span className="text-red-400 font-bold text-xl line-through opacity-50">₹ 185</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">VS</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between scale-110 shadow-xl shadow-primary/20">
                    <div>
                      <p className="text-primary-light text-xs font-bold uppercase mb-1">Generic Alternative</p>
                      <h4 className="text-white font-bold text-lg">Generic Y</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-black text-2xl">₹ 34</span>
                      <p className="text-primary-light text-[10px] font-bold">82% SAVINGS</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Browse by Category (Medkart Style) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-4">
              Browse by <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Health Categories</span>
            </motion.h2>
            <p className="text-gray-400 max-w-xl mx-auto">Find exactly what you need with our organized healthcare sections.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-dark-card border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {/* Category Icon */}
                  <div className="text-white font-bold">{cat.title[0]}</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{cat.description}</p>
                <Link to={`/category/${cat.slug}`} className="text-primary-light text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Shop Now <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prescription Banner (Medkart Style) */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Order with Prescription</h2>
            <p className="text-gray-300 max-w-md">Upload your doctor's prescription and our pharmacists will handle the rest. Doorstep delivery within 24 hours.</p>
          </div>
          <Link to="/upload-prescription" className="px-10 py-4 bg-white text-dark font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl">
            Upload Now
          </Link>
        </div>
      </section>

      {/* Top Trending Products (Medkart Style) */}
      <section className="py-20 px-4 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Top <span className="text-primary">Trending Products</span></h2>
            <Link to="/medicines" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-dark-card border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all group shadow-lg">
                <div className="h-48 relative overflow-hidden bg-white/5">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded">{p.discount}</span>
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">{p.brand}</p>
                  <h3 className="text-white font-bold text-sm mb-3 group-hover:text-primary transition-colors line-clamp-1">{p.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">₹ {p.price}</span>
                      <span className="text-gray-500 text-xs line-through">MRP ₹ {p.mrp}</span>
                    </div>
                    <button 
                      onClick={() => addToCart({ ...p, name: p.title })}
                      className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg transition-all flex items-center justify-center active:scale-95 shadow-inner"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary-light text-xs font-semibold mb-4 tracking-wider uppercase">Why Choose MedKart</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Authentic Medicines. <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Substantial Savings.</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Affordable Generic', desc: 'Save up to 85% on your monthly medicine bills with quality generic alternatives.' },
              { icon: Shield, title: 'Quality Checked', desc: 'Every medicine is NABL lab tested under strict international standards.' },
              { icon: Users, title: 'Doctor\'s Trust', desc: 'Recommended by leading healthcare professionals across India and UAE.' },
              { icon: FlaskConical, title: '100% Authentic', desc: 'Directly sourced from WHO-GMP certified manufacturers only.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-dark border border-white/10 rounded-2xl hover:border-primary/30 transition-all duration-300">
                <item.icon size={28} className="text-primary-light mb-3" />
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-semibold mb-4 tracking-wider uppercase">Happy Customers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">What People <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Are Saying</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => <TestimonialCard key={t.id} testimonial={t} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
      <NewsletterSection />
    </>
  );
}
