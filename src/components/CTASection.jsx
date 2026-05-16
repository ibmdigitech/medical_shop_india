import { motion } from 'framer-motion';
import { Smartphone, Apple, Play, CheckCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-br from-primary via-secondary to-primary-dark rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-primary/20">
          
          {/* Animated backgrounds */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Healthcare at Your <br className="hidden md:block" />
                  <span className="text-accent-light">Finger-tips</span>
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto lg:mx-0">
                  Download the Medical Shope app today and get exclusive app-only offers. Save up to 85% on your first medicine order.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
              >
                <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                  <CheckCircle size={18} className="text-accent-light" /> Authentic Medicines
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                  <CheckCircle size={18} className="text-accent-light" /> Fast Home Delivery
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                  <CheckCircle size={18} className="text-accent-light" /> 24/7 Expert Support
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-dark font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl">
                  <Apple size={24} /> 
                  <div className="text-left leading-none">
                    <p className="text-[10px] uppercase opacity-60">Download on</p>
                    <p className="text-lg">App Store</p>
                  </div>
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-dark text-white font-bold rounded-2xl flex items-center justify-center gap-3 border border-white/10 hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl">
                  <Play size={24} className="fill-current" /> 
                  <div className="text-left leading-none">
                    <p className="text-[10px] uppercase opacity-60">Get it on</p>
                    <p className="text-lg">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:flex-1 relative"
            >
              <div className="relative w-64 md:w-80 mx-auto">
                {/* Mock Phone Frame */}
                <div className="bg-dark p-3 rounded-[3rem] border-[8px] border-white/10 shadow-2xl relative z-10">
                  <div className="bg-dark-card aspect-[9/19] rounded-[2.5rem] overflow-hidden relative">
                    {/* App UI Mockup */}
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full bg-primary/20" />
                        <div className="w-12 h-4 rounded-full bg-white/10" />
                      </div>
                      <div className="h-24 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-20 rounded-xl bg-white/5" />
                        <div className="h-20 rounded-xl bg-white/5" />
                      </div>
                      <div className="h-4 w-2/3 bg-white/10 rounded" />
                      <div className="h-3 w-1/2 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-light/20 rounded-full blur-[80px] -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
