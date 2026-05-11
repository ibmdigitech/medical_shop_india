import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight, Zap, Info, ShieldCheck } from 'lucide-react';
import { medicineComparison } from '../data/medicineComparison';
import CTASection from '../components/CTASection';

export default function CompareMedicinesPage() {
  return (
    <>
      <Helmet>
        <title>Compare Medicine Prices - Amster Med Care</title>
        <meta name="description" content="Compare branded vs generic medicine prices. Save up to 85% on your monthly healthcare bills." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Compare & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Save Big</span>
          </motion.h1>
          <p className="text-gray-400 text-lg mb-10">
            Find high-quality generic substitutes for your branded medicines and reduce your monthly medical expenses by up to 85%.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Enter your branded medicine name..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/15 rounded-2xl text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-2">Real Price <span className="text-primary">Comparisons</span></h2>
            <p className="text-gray-500">See how much you can save with WHO-GMP certified generics.</p>
          </div>

          <div className="space-y-6">
            {medicineComparison.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-dark-card border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8 hover:border-primary/30 transition-all"
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Molecule:</span>
                    <span className="text-xs font-semibold text-primary-light">{item.molecule}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Branded */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Branded Medicine</p>
                      <h4 className="text-white font-bold text-lg mb-2">{item.brandedName}</h4>
                      <p className="text-2xl font-black text-white/50 line-through">? {item.brandedPrice}</p>
                    </div>

                    {/* Generic */}
                    <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                         <Zap size={60} />
                      </div>
                      <p className="text-[10px] font-bold text-primary-light uppercase mb-1">Generic Substitute</p>
                      <h4 className="text-white font-bold text-lg mb-2">{item.genericName}</h4>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-black text-white">? {item.genericPrice}</p>
                        <div className="text-right">
                          <span className="text-green-400 font-bold text-sm">{item.savingPercentage}% OFF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-48 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ShieldCheck size={14} className="text-green-500" />
                    <span>WHO-GMP Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Info size={14} className="text-blue-500" />
                    <span>Same Composition</span>
                  </div>
                  <button className="mt-2 w-full py-3 bg-white text-dark font-bold rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95 text-sm">
                    Select Generic
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
