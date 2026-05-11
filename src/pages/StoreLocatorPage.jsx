import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import CTASection from '../components/CTASection';

const stores = [
  {
    id: 1,
    name: 'Medical Shope - Dubai Healthcare City',
    address: 'Building 64, Al Razi, Dubai Healthcare City, Dubai, UAE',
    phone: '+971 4 123 4567',
    hours: '08:00 AM - 10:00 PM',
    distance: '2.5 km'
  },
  {
    id: 2,
    name: 'Medical Shope - Ahmedabad HQ',
    address: 'Shop No. 4, Ground Floor, Corporate House, Ahmedabad, Gujarat, India',
    phone: '+91 79 4913 7600',
    hours: '09:00 AM - 09:00 PM',
    distance: '5.2 km'
  },
  {
    id: 3,
    name: 'Medical Shope - Jaipur Branch',
    address: 'C-Scheme, Near Statue Circle, Jaipur, Rajasthan, India',
    phone: '+91 141 234 5678',
    hours: '10:00 AM - 08:00 PM',
    distance: '12 km'
  }
];

export default function StoreLocatorPage() {
  return (
    <>
      <Helmet>
        <title>Store Locator - Medical Shope India</title>
        <meta name="description" content="Find the nearest Medical Shope India pharmacy. Over 100+ authentic generic medical stores." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Find a <span className="text-primary">Medical Store</span> Near You
          </motion.h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Enter your city or pin-code..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
      </section>

      {/* Stores List */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            {stores.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-card border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-primary/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-primary" />
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{store.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 max-w-md">{store.address}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Phone size={14} className="text-secondary" /> {store.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock size={14} className="text-accent" /> {store.hours}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs font-bold text-primary-light bg-primary/10 px-3 py-1 rounded-full">{store.distance} away</span>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-dark font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-xl">
                    <Navigation size={18} /> Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map Placeholder (Glassmorphism Style) */}
          <div className="lg:w-96 shrink-0 h-[500px] bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-primary/5 opacity-50" />
             <div className="relative text-center p-8">
                <MapPin size={48} className="mx-auto text-primary mb-4 opacity-50 animate-bounce" />
                <p className="text-gray-500 font-semibold italic text-sm">Interactive Map Loading...</p>
                <p className="text-gray-600 text-xs mt-2">Showing 100+ stores across India & UAE</p>
             </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
