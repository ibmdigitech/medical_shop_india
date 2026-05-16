import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { stats } from '../data/stats';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';
import CTASection from '../components/CTASection';
import NewsletterSection from '../components/NewsletterSection';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const TYPING_LIST = ['Generic Medicines', 'Lab Tests', 'Health Devices', 'Wellness Products', 'Personal Care', 'Baby Care'];

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <section ref={ref} className="py-16 px-4 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: stat.id * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-black text-primary mb-1">
              {isInView ? <span>{stat.value}</span> : <span>0</span>}{stat.suffix}
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { addToCart } = useCart();
  
  const FLOATING_CONFIG = [
    { iconName: 'Pill', x: '10%', y: '20%', delay: 0 },
    { iconName: 'Activity', x: '85%', y: '15%', delay: 0.5 },
    { iconName: 'FlaskConical', x: '5%', y: '70%', delay: 1 },
    { iconName: 'Stethoscope', x: '90%', y: '65%', delay: 1.5 },
  ];

  return (
    <>
      <Helmet>
        <title>Amster Med Care - Reliable & Trusted Care | Pharmacy Omassery</title>
        <meta name="description" content="Amster Med Care Pharmacy in Omassery, Kerala. Reliable and trusted healthcare with free home delivery. Medicines, Baby Products, Cosmetics, and Surgicals." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 pt-28 pb-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-left mt-8 lg:mt-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted Pharmacy in Omassery
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-slate-900 leading-[1.15] mb-5">
              Reliable And <br />
              <span className="text-primary italic font-serif">Trusted Care</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-md leading-relaxed">
              Just dial to Amster for your Med and Care. We provide genuine medicines, surgicals, baby care, and cosmetics with <span className="font-bold text-secondary">Free Home Delivery</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/medicines" className="px-8 py-4 bg-primary text-white font-bold text-base rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                <LucideIcons.ShoppingBag size={20} />
                Shop Medicines
              </Link>
              <Link to="/upload-prescription" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold text-base rounded-2xl hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-3">
                <LucideIcons.Upload size={20} />
                Upload Prescription
              </Link>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">U{i}</div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-bold">+4k</div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Trusted by <span className="text-slate-900 font-bold">4,000+ customers</span> in Kerala</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-white p-3 rounded-[2.5rem] shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000&auto=format&fit=crop" 
                alt="Pharmacist Care" 
                className="rounded-[2rem] w-full h-[380px] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-3 animate-float scale-90 origin-bottom-left">
                <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <LucideIcons.Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Express Delivery</p>
                  <p className="text-base font-black text-slate-900">Under 60 Mins</p>
                </div>
              </div>
              <div className="absolute top-8 -right-6 bg-white p-4 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-3 animate-float scale-90 origin-top-right" style={{ animationDelay: '3s' }}>
                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <LucideIcons.Heart size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Health First</p>
                  <p className="text-base font-black text-slate-900">100% Genuine</p>
                </div>
              </div>
            </div>
            {/* Logo Watermark */}
            <img src={logo} alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 opacity-5 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Marquee */}
      <div className="bg-primary py-4 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-12 px-6">
              <div className="flex items-center gap-3">
                <LucideIcons.MessageCircle className="text-white" size={24} />
                <span className="text-white font-black text-lg uppercase tracking-wider">Order via WhatsApp: +91 90375 07643</span>
              </div>
              <div className="flex items-center gap-3">
                <LucideIcons.Zap className="text-white" size={24} />
                <span className="text-white font-black text-lg uppercase tracking-wider">Free Home Delivery in Omassery</span>
              </div>
              <div className="flex items-center gap-3">
                <LucideIcons.ShieldCheck className="text-white" size={24} />
                <span className="text-white font-black text-lg uppercase tracking-wider">Reliable & Trusted Care</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <StatsSection />

      {/* Services Grid (Category List) */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-4">Our <span className="text-primary">Services</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Everything you need for your health and well-being, all in one place.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => {
              const Icon = LucideIcons[cat.icon] || LucideIcons.Package;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black font-heading text-slate-900 mb-3">{cat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{cat.description}</p>
                  <Link to={`/category/${cat.slug}`} className="text-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore Now <LucideIcons.ArrowRight size={18} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-16">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-accent-light text-sm font-bold mb-6">EXCLUSIVE OFFER</span>
              <h2 className="text-4xl md:text-6xl font-black font-heading text-white mb-6 leading-tight">
                FLAT <span className="text-accent">25% OFF</span> <br />
                on your First Order
              </h2>
              <p className="text-slate-400 text-xl mb-10 max-w-xl">
                Get the best quality medicines at the best prices. Use coupon code <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-lg border border-white/20">AMSTER25</span> at checkout.
              </p>
              <Link to="/medicines" className="inline-flex px-10 py-5 bg-white text-slate-900 font-black text-lg rounded-2xl hover:bg-slate-100 transition-all shadow-xl shadow-white/10">
                Claim Offer Now
              </Link>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="aspect-square bg-white/5 border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center">
                <LucideIcons.Clock size={64} className="text-secondary mb-6 animate-pulse" />
                <h3 className="text-3xl font-black text-white mb-2">Offer Ends Soon</h3>
                <p className="text-slate-500">Don't miss out on these incredible savings for your family's health.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-4">Patient <span className="text-primary">Stories</span></h2>
            <p className="text-slate-500 text-lg">See why thousands of families trust Amster Med Care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 2).map((t, i) => <TestimonialCard key={t.id} testimonial={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* AEO / SEO FAQ Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
            <p className="text-slate-500 text-lg">Everything you need to know about our pharmacy and delivery services in Omassery.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: 'Does Amster Med Care provide free home delivery for medicines in Kerala?', a: 'Yes, we provide 100% FREE home delivery for all medicine orders within Omassery and nearby regions. For other parts of Kerala, standard delivery charges may apply based on distance.' },
              { q: 'How can I get 25% OFF on my medicine purchase?', a: 'You can avail a flat 25% discount on all your medicine purchases by applying the promo code MED25 during checkout on our online platform or by visiting our store in Omassery.' },
              { q: 'Is it safe to buy medicines online from Amster Med Care?', a: 'Absolutely. We are a certified, licensed pharmacy in Kerala. Every order is verified by a registered pharmacist before dispatch, ensuring you only receive 100% genuine medications.' },
              { q: 'Can I order medicines via WhatsApp?', a: 'Yes! For your convenience, you can send your prescription or medicine list directly to our WhatsApp number +91 90375 07643. Our team will process your order and arrange immediate delivery.' }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-bold font-heading text-slate-900 mb-2 flex items-start gap-3">
                  <LucideIcons.HelpCircle className="text-primary shrink-0 mt-1" size={20} />
                  {faq.q}
                </h3>
                <p className="text-slate-600 pl-8 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <NewsletterSection />
    </>
  );
}
