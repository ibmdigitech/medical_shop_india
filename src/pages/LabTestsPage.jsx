import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Activity, FlaskConical, Microscope, Clock, 
  ShieldCheck, MapPin, ArrowRight, Zap, 
  Award, Heart, Microscope as MicroscopeIcon,
  Search, ChevronRight, CheckCircle2
} from 'lucide-react';
import { labTests } from '../data/labTests';
import CTASection from '../components/CTASection';

export default function LabTestsPage() {
  return (
    <>
      <Helmet>
        <title>Premium Lab Tests & Diagnostics | Amster Med Care - Free Home Collection</title>
        <meta name="description" content="Book affordable, high-quality lab tests online. Get free home sample collection across Kerala. NABL certified labs with 24-hour report delivery." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-4 pb-12 bg-white dark:bg-dark overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black tracking-widest uppercase mb-8">
                  <MicroscopeIcon size={14} /> Diagnostic Excellence
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4"
              >
                Health Checkups <br />
                <span className="text-primary italic">At Your Door</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-slate-500 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl"
              >
                Experience world-class diagnostic services with free home sample collection. Accurate results from NABL-certified laboratories.
              </motion.p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: Clock, title: 'Results in 24h', desc: 'Fast turnaround' },
                  { icon: ShieldCheck, title: 'NABL Certified', desc: 'Verified labs' },
                  { icon: Activity, title: 'Modern Tech', desc: 'Accurate reports' },
                  { icon: MapPin, title: 'Home Collection', desc: 'Free at home' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                       <h4 className="text-slate-900 dark:text-white font-black text-sm">{item.title}</h4>
                       <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href={`https://wa.me/919037507643?text=${encodeURIComponent('Hi! I am interested in booking a Lab Test for home collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="px-8 py-3 bg-primary text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 inline-flex w-max"
              >
                 Book Collection <ArrowRight size={18} />
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-[32px] overflow-hidden border-[6px] border-white dark:border-white/5 shadow-2xl h-[350px] lg:h-[420px]">
                 <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop" alt="Lab Test" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                 <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                          <Activity size={24} />
                       </div>
                       <h3 className="text-white font-black text-xl">NABL Certified Reports</h3>
                    </div>
                    <p className="text-slate-300 text-sm">Trusted by healthcare professionals for over a decade in Kerala.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tests Grid Section */}
      <section className="py-32 px-4 bg-slate-50 dark:bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <span className="text-primary font-black text-xs tracking-widest uppercase mb-4 block">Popular Packages</span>
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                Comprehensive <span className="text-primary italic">Health Screenings</span>
             </h2>
             <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {labTests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] p-10 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  <FlaskConical size={28} />
                </div>
                
                <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-4 group-hover:text-primary transition-colors">{test.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-8 leading-relaxed line-clamp-2">{test.description}</p>

                <div className="space-y-4 mb-10 flex-1">
                  {test.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-slate-50 dark:border-white/5">
                   <div className="flex items-center justify-between mb-8">
                      <div>
                         <span className="text-primary font-black text-3xl tracking-tighter">₹{test.price}</span>
                         <div className="text-slate-400 text-xs line-through">₹{test.mrp}</div>
                      </div>
                      <span className="px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full shadow-lg">
                        -{test.discount}
                      </span>
                   </div>

                   <a 
                     href={`https://wa.me/919037507643?text=${encodeURIComponent(`Hi! I'd like to book the "${test.title}" lab test (₹${test.price}). Please confirm availability and home collection timing.`)}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-2"
                   >
                      Book Now <ChevronRight size={18} />
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { icon: Award, title: 'Gold Standard', desc: 'Every report is verified by senior pathologists.' },
                 { icon: Zap, title: 'Real-time Updates', desc: 'Track your sample status and download reports online.' },
                 { icon: Heart, title: 'Patient First', desc: 'Gentle collection process by expert phlebotomists.' }
               ].map((item, i) => (
                 <div key={i} className="text-center p-12 bg-slate-50 dark:bg-dark-card/50 rounded-[48px] border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 group">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                       <item.icon size={36} />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-4 italic">{item.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <CTASection />
    </>
  );
}
