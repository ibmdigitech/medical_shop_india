import { Helmet } from 'react-helmet-async';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const industries = [
  'Real Estate', 'Banking & Finance', 'Healthcare', 'Retail & E-Commerce',
  'Manufacturing', 'Government', 'Hospitality', 'Education', 'Logistics', 'Energy',
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>IT Services - IBM DigiTech UAE</title>
        <meta name="description" content="Explore IBM DigiTech's full range of IT services including Web Development, Mobile Apps, HRMS, ERP, AI, Cloud, and Cyber Security for UAE businesses." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase">
            Our Services
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-4">
            Enterprise IT <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Solutions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive digital services engineered to accelerate your business growth across every technology domain.
          </motion.p>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 px-4 bg-dark-card">
        <div className="max-w-5xl mx-auto text-center">
          <Layers size={32} className="text-primary-light mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Industries We Serve</h2>
          <p className="text-gray-400 mb-10">Deep domain expertise across UAE's most dynamic sectors.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <motion.span
                key={ind}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-2 bg-dark border border-white/10 rounded-full text-gray-300 text-sm hover:border-primary/40 hover:text-white hover:bg-primary/10 transition-all duration-300 cursor-default"
              >
                {ind}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Delivery Process</span></h2>
            <p className="text-gray-400">A proven, agile approach that ensures quality at every stage.</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />
            {['Discovery & Planning', 'UI/UX Design', 'Development & Testing', 'Deployment & Launch', 'Support & Maintenance'].map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 md:pl-20 relative">
                <div className="hidden md:flex absolute left-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center text-white font-bold text-xl shrink-0">{i + 1}</div>
                <div className="flex md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center text-white font-bold shrink-0">{i + 1}</div>
                <div className="bg-dark-card border border-white/10 rounded-xl p-5 flex-1 hover:border-primary/30 transition-all">
                  <h3 className="text-white font-semibold mb-1">{step}</h3>
                  <p className="text-gray-400 text-sm">We ensure quality, collaboration, and clear communication throughout each phase of this stage.</p>
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
