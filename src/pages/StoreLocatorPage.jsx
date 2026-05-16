import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Search, Navigation, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import CTASection from '../components/CTASection';

const stores = [
  {
    id: 1,
    name: 'Amster Med Care - Omassery HQ',
    address: 'Shop No. 13, Opposite Federal Bank, Near Metro Park, Omassery, Kerala 673582',
    phone: '+91 90375 07643',
    hours: '08:00 AM - 10:00 PM',
    distance: 'Flagship Store',
    rating: 4.9
  }
];

export default function StoreLocatorPage() {
  return (
    <>
      <Helmet>
        <title>Store Locator | Amster Med Care - Find a Pharmacy Near You</title>
        <meta name="description" content="Locate the nearest Amster Med Care pharmacy. Visit our flagship store in Omassery or order online for express delivery across Kerala." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-48 pb-32 bg-white dark:bg-dark overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black tracking-widest uppercase mb-8">
                 <MapPin size={12} /> Find Your Store
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8"
            >
              Our Presence In <br />
              <span className="text-primary italic">Kerala</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 dark:text-gray-400 text-xl md:text-2xl leading-relaxed mb-12"
            >
              Visit our state-of-the-art pharmacy in Omassery or locate our distribution hubs for lightning-fast home delivery.
            </motion.p>

            {/* Premium Search */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="relative w-full max-w-xl mx-auto"
            >
              <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                placeholder="Enter city, area or pincode..."
                className="w-full pl-16 pr-6 py-5 bg-white dark:bg-dark-card border border-slate-100 dark:border-white/10 rounded-3xl text-slate-900 dark:text-white font-bold placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stores List & Map Section */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Store Cards */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-black text-slate-900 dark:text-white italic uppercase tracking-wider">Nearby Stores</h2>
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stores.length} Location Found</span>
              </div>

              {stores.map((store, i) => (
                <motion.div 
                  key={store.id}
                  initial={{ opacity: 0, x: -30 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[48px] p-10 hover:border-primary/40 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase tracking-widest">{store.distance}</span>
                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-lg">
                           <Star size={14} className="fill-amber-500" /> {store.rating}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors italic">{store.name}</h3>
                      <p className="text-slate-500 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-md">{store.address}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary border border-slate-100 dark:border-white/10">
                              <Phone size={18} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Store</p>
                              <p className="text-slate-900 dark:text-white font-black text-sm">{store.phone}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-primary border border-slate-100 dark:border-white/10">
                              <Clock size={18} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Hours</p>
                              <p className="text-slate-900 dark:text-white font-black text-sm">{store.hours}</p>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col gap-4">
                      <a 
                        href="https://maps.google.com/?q=Omassery+Kerala" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-xl"
                      >
                        <Navigation size={20} /> Get Directions
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 rounded-[60px] overflow-hidden border-[12px] border-white dark:border-white/10 shadow-2xl h-[600px] relative group">
                <iframe
                  title="Amster Med Care Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7!2d75.955!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6736c7f4f5e6b%3A0x0!2sOmassery!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  className="grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-10 left-10 right-10">
                   <div className="p-6 bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                            <Zap size={24} />
                         </div>
                         <div>
                            <h4 className="text-slate-900 font-black text-lg">Express Delivery</h4>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active in Omassery</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 px-4 bg-white dark:bg-dark">
         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3">
               <Shield size={32} className="text-primary" />
               <span className="font-black uppercase tracking-widest text-slate-900 dark:text-white">Licensed Pharmacy</span>
            </div>
            <div className="flex items-center gap-3">
               <Star size={32} className="text-primary" />
               <span className="font-black uppercase tracking-widest text-slate-900 dark:text-white">Top Rated Store</span>
            </div>
            <div className="flex items-center gap-3">
               <Award size={32} className="text-primary" />
               <span className="font-black uppercase tracking-widest text-slate-900 dark:text-white">Excellence Award 2024</span>
            </div>
         </div>
      </section>

      <CTASection />
    </>
  );
}
