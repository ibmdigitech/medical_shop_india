import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowRight, ShieldCheck, ChevronRight, 
  Search, Upload, Pill, Heart, Baby, 
  Stethoscope, ShieldAlert, Activity, Sparkles,
  FlaskConical, Globe, Phone, MapPin, ShoppingCart, 
  MessageCircle, Star, Clock, Shield, Users, Award,
  Truck, ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import heroImage from '../assets/hero_v4.png';
import CTASection from '../components/CTASection';
import NewsletterSection from '../components/NewsletterSection';

// Swiper imports for moving product section
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const categories = [
  { id: 1, title: 'Medicines', icon: Pill, color: 'from-emerald-400 to-emerald-600', description: 'Wide range of genuine prescription and OTC medicines.', slug: 'medicines' },
  { id: 2, title: 'Wellness', icon: Heart, color: 'from-pink-400 to-pink-600', description: 'Vitamins, supplements, and health boosters for a better life.', slug: 'wellness' },
  { id: 3, title: 'Personal Care', icon: Sparkles, color: 'from-purple-400 to-purple-600', description: 'Premium skin, hair, and body care products.', slug: 'personal-care' },
  { id: 4, title: 'Baby Care', icon: Baby, color: 'from-blue-400 to-blue-600', description: 'Gentle and safe products for your little ones.', slug: 'baby-care' },
  { id: 5, title: 'Ayurvedic', icon: Activity, color: 'from-orange-400 to-orange-600', description: 'Traditional herbal and natural remedies.', slug: 'ayurvedic' },
  { id: 6, title: 'Surgicals', icon: Stethoscope, color: 'from-slate-700 to-slate-900', description: 'Medical equipment and healthcare tools.', slug: 'surgicals' },
  { id: 7, title: 'Health Food', icon: Zap, color: 'from-yellow-400 to-yellow-600', description: 'Organic and nutritious food for specialized diets.', slug: 'health-food' },
  { id: 8, title: 'Lab Tests', icon: FlaskConical, color: 'from-cyan-400 to-cyan-600', description: 'Book home collection for diagnostic tests.', slug: 'lab-tests' },
];

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 rounded-[32px] bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none relative"
    >
      <div className="flex gap-1 text-amber-400 mb-6">
        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
      </div>
      <p className="text-slate-700 dark:text-gray-300 text-lg italic leading-relaxed mb-8">"{testimonial.text}"</p>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-lg">
          {testimonial.name[0]}
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-black">{testimonial.name}</h4>
          <p className="text-slate-500 text-sm">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <>
      <Helmet>
        <title>Amster Med Care - Reliable And Trusted Care | Free Home Delivery Kerala</title>
        <meta name="description" content="Order medicines online with Amster Med Care. Reliable and trusted care with FREE home delivery across Omassery and Kerala. Get genuine medicines at best prices." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-dark overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 pt-20 pb-28">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-primary text-xs font-black mb-8 tracking-wider uppercase">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
                  Trusted Pharmacy in Omassery
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight"
              >
                Reliable And <br />
                <span className="text-primary italic">Trusted Care</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-slate-500 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0"
              >
                Just dial to Amster for your Med and Care. We provide genuine medicines, surgicals, baby care, and cosmetics with <span className="text-blue-600 font-bold">Free Home Delivery</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Link to="/medicines" className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-3xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 flex items-center justify-center gap-3 group uppercase tracking-widest text-xs">
                  <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" /> Shop Medicines
                </Link>
                <Link to="/upload-prescription" className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-black rounded-3xl hover:border-primary transition-all duration-500 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-slate-200/50 dark:shadow-none">
                  <Upload size={18} /> Upload Rx
                </Link>
              </motion.div>
            </div>

            {/* Right Image Content - Optimized Size */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden shadow-xl border-[6px] border-white dark:border-white/5 h-[280px] lg:h-[360px]">
                <img 
                  src={heroImage} 
                  alt="Amster Med Care Hero" 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Express Delivery Badge */}
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-white flex items-center gap-4 animate-bounce-slow">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Truck size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery</p>
                      <p className="text-sm font-black text-slate-900 uppercase">100% Express</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee Banner - Restored */}
        <div className="absolute bottom-0 left-0 w-full bg-primary py-4 overflow-hidden border-t border-white/10">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {[1, 2, 3, 4].map((set) => (
              <div key={set} className="flex items-center gap-12 sm:gap-24 px-12 shrink-0">
                <span className="flex items-center gap-4 text-white font-black text-xs sm:text-sm tracking-[0.2em] uppercase">
                   FREE HOME DELIVERY IN OMASSERY
                </span>
                <span className="text-white/30 font-black">•</span>
                <span className="flex items-center gap-4 text-white font-black text-xs sm:text-sm tracking-[0.2em] uppercase">
                   RELIABLE & TRUSTED CARE
                </span>
                <span className="text-white/30 font-black">•</span>
                <span className="flex items-center gap-4 text-white font-black text-xs sm:text-sm tracking-[0.2em] uppercase">
                   ORDER VIA WHATSAPP: +91 90375 07643
                </span>
                <span className="text-white/30 font-black">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-dark border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { value: '10 Lakh+', label: 'HAPPY CUSTOMERS', color: 'text-primary' },
              { value: '35000+', label: 'PIN CODES COVERED', color: 'text-secondary' },
              { value: '75 Lakh+', label: 'ORDERS DELIVERED', color: 'text-blue-600' },
              { value: '100+', label: 'AUTHENTIC STORES', color: 'text-slate-900 dark:text-white' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className={`text-5xl md:text-7xl font-black mb-3 ${stat.color} tracking-tighter`}>{stat.value}</h3>
                <p className="text-slate-400 font-black text-[10px] tracking-[0.3em] uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-slate-50 dark:bg-dark-card/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-primary font-black text-xs tracking-widest uppercase mb-4 block">Our Pharmacy</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                Browse by <span className="text-primary italic">Health Categories</span>
              </h2>
              <p className="text-slate-500 dark:text-gray-400 text-lg">Find exactly what you need with our organized healthcare sections.</p>
            </div>
            <Link to="/medicines" className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-slate-900 dark:text-white hover:border-primary transition-all flex items-center gap-2 group">
              View All Categories <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-[24px] bg-gradient-to-br ${cat.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg text-white`}>
                   <cat.icon size={28} />
                </div>
                <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-3">{cat.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-8 leading-relaxed line-clamp-2">{cat.description}</p>
                <Link to={`/category/${cat.slug}`} className="text-primary font-black text-xs flex items-center gap-2 group-hover:gap-3 transition-all tracking-widest uppercase">
                  Explore <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Top <span className="text-primary">Trending Products</span>
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">High-quality medicines and healthcare products curated just for you.</p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-20"
          >
            {products.slice(0, 12).map((p, i) => (
              <SwiperSlide key={p.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                  className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/10 group flex flex-col h-full"
                >
                  <div className="h-56 relative overflow-hidden bg-slate-50">
                    <motion.img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    {/* Gradient Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">-{p.discount}</span>
                    {p.type === 'Generic' && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest">
                         Generic
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">{p.brand}</p>
                      <div className="flex items-center text-amber-400 gap-1">
                        <Star size={12} fill="currentColor" />
                        <span className="text-slate-900 dark:text-white font-black text-xs">{p.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-black text-lg mb-4 group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-1">{p.title}</h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-white/5">
                      <div className="flex flex-col">
                        <span className="text-primary font-black text-xl tracking-tighter">₹ {p.price}</span>
                        <span className="text-slate-400 text-xs line-through">MRP ₹ {p.mrp}</span>
                      </div>
                      <motion.button
                        onClick={() => addToCart({ ...p, name: p.title })}
                        whileHover={{ scale: 1.15, rotate: 8, backgroundColor: '#059669' }}
                        whileTap={{ scale: 0.88 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20"
                      >
                        <ShoppingCart size={20} className="fill-white" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-primary font-black text-xs tracking-widest uppercase mb-4 block">The Amster Edge</span>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
                Premium Care. <br />
                <span className="text-primary italic">Substantial Savings.</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-12">
                We combine modern technology with traditional care to provide you with the best pharmacy experience in Kerala.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Zap, title: 'Superfast Delivery', desc: 'Emergency meds delivered within 60 mins in Omassery.' },
                  { icon: ShieldCheck, title: 'Certified Genuine', desc: '100% authentic products sourced directly.' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px]">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-light mb-6">
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-white font-black text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative rounded-[60px] overflow-hidden border-[10px] border-white/5 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop" alt="Quality Care" className="w-full h-[600px] object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                 <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/10">
                    <Award size={48} className="text-primary-light mb-6" />
                    <h3 className="text-white font-black text-2xl mb-2 italic">NABL Certified Partner</h3>
                    <p className="text-slate-300 text-sm">Working with the best labs and manufacturers to ensure your safety and health.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Our <span className="text-primary italic">Community</span> Says
            </h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((t, i) => <TestimonialCard key={t.id} testimonial={t} index={i} />)}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <CTASection />
    </>
  );
}
