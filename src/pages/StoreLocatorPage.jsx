import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Search, Navigation } from 'lucide-react';
import CTASection from '../components/CTASection';

const stores = [
  {
    id: 1,
    name: 'Amster Med Care - Omassery HQ',
    address: 'Shop No. 13, Opposite Federal Bank, Near Metro Park, Omassery, Kerala 673582',
    phone: '+91 90375 07643',
    hours: '08:00 AM - 10:00 PM',
    distance: 'Main Store'
  }
];

export default function StoreLocatorPage() {
  return (
    <>
      <Helmet>
        <title>Store Locator - Amster Med Care</title>
        <meta name="description" content="Find the nearest Amster Med Care pharmacy in Omassery, Kerala. Free home delivery across Kerala." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-4"
          >
            Find a <span className="text-primary">Medical Store</span> Near You
          </motion.h1>
          <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">Serving Omassery and all of Kerala with free home delivery.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text" placeholder="Enter your city or pin-code..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stores List */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            {stores.map((store, i) => (
              <motion.div key={store.id}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-primary/30 hover:shadow-md transition-all group shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-primary" />
                    <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-primary transition-colors">{store.name}</h3>
                  </div>
                  <p className="text-slate-500 text-sm mb-4 max-w-md">{store.address}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500"><Phone size={14} className="text-secondary" /> {store.phone}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500"><Clock size={14} className="text-primary" /> {store.hours}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{store.distance}</span>
                  <a href="https://maps.google.com/?q=Omassery+Kerala" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all shadow-md">
                    <Navigation size={18} /> Directions
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:w-96 shrink-0 h-[400px] bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-lg">
            <iframe
              title="Amster Med Care Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.7!2d75.955!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6736c7f4f5e6b%3A0x0!2sOmassery!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
