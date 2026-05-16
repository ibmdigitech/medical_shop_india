import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Activity, FlaskConical, Microscope, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { labTests } from '../data/labTests';
import CTASection from '../components/CTASection';

export default function LabTestsPage() {
  return (
    <>
      <Helmet>
        <title>Lab Tests - Amster Med Care</title>
        <meta name="description" content="Book affordable lab tests online. Free home sample collection. NABL certified labs." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-6 leading-tight"
            >
              Book <span className="text-primary">Lab Tests</span> <br />
              at Home
            </motion.h1>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Experience hassle-free diagnostic services with free home sample collection. Get accurate results from NABL-certified laboratories.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Clock, text: 'Results in 24h' },
                { icon: ShieldCheck, text: 'NABL Certified' },
                { icon: Microscope, text: 'Modern Tech' },
                { icon: MapPin, text: 'Home Collection' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700">
                  <item.icon size={18} className="text-primary" />
                  <span className="text-sm font-semibold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative bg-white border border-slate-100 rounded-3xl p-8 overflow-hidden shadow-xl">
                <Activity className="absolute -top-10 -right-10 w-40 h-40 text-primary/5 rotate-12" />
                <Microscope className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">Book Now & Save</h3>
                <p className="text-slate-500 mb-6 italic">"Trusted by 10 Lakh+ customers for accurate diagnostic reports."</p>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95">
                  Schedule Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-slate-900 mb-4">Popular <span className="text-primary">Health Packages</span></h2>
            <p className="text-slate-500">Comprehensive screenings for a healthier you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {labTests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-slate-100 rounded-3xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <FlaskConical size={24} />
                </div>
                <h3 className="text-slate-900 font-bold text-xl mb-2">{test.title}</h3>
                <p className="text-slate-400 text-xs mb-6 line-clamp-2">{test.description}</p>

                <ul className="space-y-2 mb-8 flex-1">
                  {test.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-black text-2xl">₹ {test.price}</span>
                    <span className="text-slate-400 text-xs line-through">MRP ₹ {test.mrp}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg border border-green-100">
                    {test.discount}
                  </span>
                </div>

                <button className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-primary hover:border-primary hover:text-white transition-all active:scale-95">
                  Book Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
