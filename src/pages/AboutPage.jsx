import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Award, Heart, Users, MapPin, CheckCircle2, Zap, ArrowRight, Clock } from 'lucide-react';
import logo from '../assets/logo.png';
import CTASection from '../components/CTASection';

const timeline = [
  { year: '2015', title: 'The Beginning', desc: 'Amster Med Care was born in Omassery with a simple goal: making quality healthcare accessible.' },
  { year: '2018', title: 'Community Trust', desc: 'Expanded to serve 10,000+ families with a dedicated fleet for home delivery.' },
  { year: '2021', title: 'Digital Era', desc: 'Launched our online platform to provide a seamless healthcare experience.' },
  { year: '2024', title: 'Excellence Award', desc: 'Recognized as the most trusted pharmacy chain in the region for our quality commitment.' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Our Story | Amster Med Care - Trusted Pharmacy in Kerala</title>
        <meta name="description" content="Learn about Amster Med Care's journey, our mission for genuine healthcare, and our commitment to serving the community of Omassery and beyond." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-12 pb-32 bg-white dark:bg-dark overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-green-50 dark:bg-primary/10 border border-green-100 dark:border-primary/20 rounded-full text-primary text-xs font-black tracking-widest uppercase mb-8">
                <Heart size={14} className="fill-primary" /> Since 2015
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8"
            >
              Caring for Your <br />
              <span className="text-primary italic">Health & Future</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 dark:text-gray-400 text-xl md:text-2xl leading-relaxed mb-12"
            >
              Amster Med Care is more than a pharmacy; we are your partners in wellness. Based in Omassery, we've dedicated a decade to providing authentic medicines with heart.
            </motion.p>
          </div>

          {/* Featured Image Grid */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12"
          >
             <div className="md:col-span-8 h-[400px] md:h-[600px] rounded-[40px] md:rounded-[60px] overflow-hidden border-8 border-white dark:border-white/5 shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&auto=format&fit=crop" alt="Pharmacy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12">
                   <h3 className="text-white font-black text-3xl mb-2 italic">Excellence in Service</h3>
                   <p className="text-white/80">Our primary store in Omassery, serving the community 24/7.</p>
                </div>
             </div>
             <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <div className="rounded-[40px] md:rounded-[50px] overflow-hidden border-8 border-white dark:border-white/5 shadow-2xl relative group">
                   <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop" alt="Medicines" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-[40px] md:rounded-[50px] overflow-hidden border-8 border-white dark:border-white/5 shadow-2xl relative group bg-primary flex flex-col items-center justify-center text-center p-8">
                   <Award size={64} className="text-white mb-4 animate-bounce" />
                   <h4 className="text-white font-black text-2xl uppercase tracking-tighter">10+ Years</h4>
                   <p className="text-white/80 font-bold text-sm tracking-widest">OF TRUSTED CARE</p>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 px-4 bg-slate-50 dark:bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Eye, title: 'Our Vision', desc: 'To be the most trusted healthcare partner in every household across Kerala through quality and care.', color: 'bg-blue-500' },
              { icon: Target, title: 'Our Mission', desc: 'Providing 100% genuine medicines at the best prices with the convenience of superfast home delivery.', color: 'bg-primary' },
              { icon: ShieldCheck, title: 'Our Values', desc: 'Authenticity, Integrity, and Compassion are at the heart of everything we do for our patients.', color: 'bg-secondary' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-card p-12 rounded-[48px] border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-4 italic">{item.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Identity */}
      <section className="py-32 px-4 bg-white dark:bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
               <span className="text-primary font-black text-xs tracking-widest uppercase mb-4 block">The Brand</span>
               <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                 Our Visual <br />
                 <span className="text-primary italic">Identity</span>
               </h2>
               <p className="text-slate-500 dark:text-gray-400 text-xl leading-relaxed mb-12">
                 The Amster logo is a symbol of professional medical excellence. Each color represents our core philosophy of healing and trust.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { color: 'bg-primary', title: 'Healing Green', desc: 'Growth, Health, and Recovery.' },
                    { color: 'bg-blue-600', title: 'Medical Blue', desc: 'Trust, Wisdom, and Stability.' },
                    { color: 'bg-accent', title: 'Support Red', desc: 'Passion, Urgency, and Care.' },
                    { color: 'bg-slate-900', title: 'Solid Black', desc: 'Strength and Reliability.' }
                  ].map((color, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className={`w-14 h-14 rounded-2xl ${color.color} shadow-lg group-hover:scale-110 transition-transform`} />
                       <div>
                          <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">{color.title}</h4>
                          <p className="text-slate-500 text-xs">{color.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 relative">
               <div className="relative w-full max-w-md mx-auto aspect-square bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center p-16 shadow-2xl border-8 border-white dark:border-white/5">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                  <img src={logo} alt="Amster Logo" className="w-full h-full object-contain relative z-10 animate-float" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { value: '4k+', label: 'Happy Families', icon: Users },
              { value: '24/7', label: 'Support Open', icon: Clock },
              { value: '100%', label: 'Genuine Products', icon: CheckCircle2 },
              { value: '5km', label: 'Free Delivery Radius', icon: MapPin },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary mx-auto mb-6">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-2 italic">{stat.value}</h3>
                <p className="text-slate-400 font-black text-[10px] tracking-widest uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 italic">The Journey</h2>
             <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
          </div>

          <div className="relative">
             <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-slate-100 dark:bg-white/5 rounded-full" />
             
             <div className="space-y-24 relative">
                {timeline.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1 text-center md:text-left">
                       <span className="text-primary font-black text-2xl mb-2 block tracking-widest italic">{step.year}</span>
                       <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{step.title}</h4>
                       <p className="text-slate-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                    
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-dark border-4 border-primary z-10 shadow-xl shrink-0" />
                    
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
