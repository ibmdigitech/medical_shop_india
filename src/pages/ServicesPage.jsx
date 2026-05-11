import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, FlaskConical, Truck, ShieldCheck, Clock } from 'lucide-react';

const pharmaServices = [
  {
    icon: ShoppingBag,
    title: 'Genuine Medicines',
    desc: '100% authentic medicines sourced directly from authorized distributors.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: FlaskConical,
    title: 'Lab Test Booking',
    desc: 'Partnered with NABL certified labs for accurate and reliable health checkups.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    desc: 'Fast and reliable medicine delivery to your doorstep in Omassery.',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: ShieldCheck,
    title: 'Generic Substitutes',
    desc: 'Affordable high-quality generic medicines to help you save on medical bills.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Heart,
    title: 'Wellness Products',
    desc: 'Wide range of personal care, baby care, and nutritional supplements.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: Clock,
    title: '24/7 Consultation',
    desc: 'Expert pharmacists available to answer your medication queries.',
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services - Amster Med Care Omassery</title>
        <meta name="description" content="Comprehensive healthcare services at Amster Med Care. From genuine medicines and lab tests to fast home delivery in Omassery, Kerala." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase tracking-tight">Our Services</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
            Comprehensive <br />
            <span className="text-primary italic">Healthcare Solutions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From essential prescriptions to professional health screenings, we provide everything you need to keep your family healthy and happy.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pharmaServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-card border border-white/5 rounded-3xl p-8 hover:border-primary/40 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon size={28} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-2xl mb-4">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-4 bg-dark-card overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Why Choose <br /><span className="text-primary italic">Amster Med Care?</span></h2>
              <div className="space-y-6">
                {[
                  { title: 'Quality Assurance', desc: 'Every medicine goes through strict quality checks before reaching you.' },
                  { title: 'Expert Guidance', desc: 'Our qualified pharmacists are always ready to assist you with your prescriptions.' },
                  { title: 'Community Focused', desc: 'We take pride in serving the Omassery community with care and dedication.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
               <div className="relative bg-dark border border-white/10 rounded-[40px] p-12 overflow-hidden flex flex-col items-center text-center">
                  <ShieldCheck size={80} className="text-primary mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white mb-4 italic">Certified Healthcare Partner</h3>
                  <p className="text-gray-500 text-sm">Amster Med Care is a fully licensed and NABL-affiliated pharmacy serving Kerala since 2015.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
