import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const timeline = [
  { year: '2015', title: 'Founding', desc: 'Amster Med Care was founded with a mission to bring quality healthcare closer to the residents of Omassery.' },
  { year: '2017', title: 'Expanding Services', desc: 'Introduced home delivery services and expanded our range to include specialized medications.' },
  { year: '2019', title: 'Community Trust', desc: 'Recognized as one of the most trusted pharmacies in the region with over 5,000 regular customers.' },
  { year: '2021', title: 'Healthcare Excellence', desc: 'Implemented state-of-the-art inventory management for accurate and fast medicine dispensing.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Launched our digital platform to make ordering medicines and booking lab tests easier than ever.' },
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Amster Med Care Omassery</title>
        <meta name="description" content="Discover the story of Amster Med Care, your trusted pharmacy in Omassery. Our mission is to provide affordable and authentic healthcare to the community." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-dark dark:to-dark-card overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary font-bold mb-6 tracking-widest uppercase text-xs">Caring for the Community</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
            Our Story, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary italic">Our Commitment</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Since our inception, Amster Med Care has been more than just a pharmacy. We are your neighbors, your friends, and your trusted partners in health. Located in the heart of Omassery, we serve with a smile.
          </motion.p>
        </div>
      </section>

      {/* Brand Identity */}
      <section className="py-20 px-4 bg-white dark:bg-dark">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-8 md:p-16 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Our <span className="text-primary">Identity</span></h2>
              <p className="text-slate-600 dark:text-gray-400 mb-10 leading-relaxed">
                The Amster Med Care logo represents our deep-rooted commitment to professional healthcare and community wellness. Our colors are carefully chosen to reflect our values.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { color: 'bg-[#0056B3]', name: 'Amster Blue', desc: 'Trust, Professionalism, and Medical Excellence.' },
                  { color: 'bg-[#00A352]', name: 'Healthy Green', desc: 'Growth, Vitality, and Natural Wellness.' },
                  { color: 'bg-[#E60000]', name: 'Caring Red', desc: 'Urgency, Support, and Lifesaving Care.' },
                  { color: 'bg-white', name: 'Purity White', desc: 'Hygiene, Safety, and Transparent Pricing.' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${c.color} border border-slate-200 dark:border-white/20 shadow-sm shrink-0`} />
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-sm">{c.name}</h4>
                      <p className="text-slate-500 dark:text-gray-500 text-[10px] leading-tight">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[50px] group-hover:blur-[80px] transition-all rounded-full" />
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white p-8 shadow-xl relative z-10 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-700">
                  <img src="/logo.png" alt="Amster Med Care Official Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-dark-card border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: 'Our Vision', desc: 'To be the first choice for every family in Kerala when it comes to health, wellness, and pharmaceutical care, maintaining 100% genuine products.' },
            { icon: Target, title: 'Our Mission', desc: 'To provide authentic medicines at fair prices, combined with expert advice and a compassionate approach to patient care, delivered directly to your doorstep.' },
            { icon: ShieldCheck, title: 'Our Values', desc: 'Authenticity, Compassion, Integrity, and Excellence. We believe that everyone deserves the highest standard of medical care without compromise.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-white dark:bg-dark border border-slate-200 dark:border-white/5 rounded-3xl p-8 text-center hover:border-primary/40 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <item.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 overflow-hidden bg-white dark:bg-dark">
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">The <span className="text-primary">Journey</span></h2>
            <p className="text-slate-500 dark:text-gray-500">Over a decade of serving the community of Kerala.</p>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 top-32 bottom-0 w-px bg-slate-200 dark:bg-white/10 hidden md:block" />
          
          <div className="space-y-12 relative">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}
              >
                <div className="flex-1">
                  <span className="text-primary font-black text-xl mb-2 block">{item.year}</span>
                  <h3 className="text-slate-900 dark:text-white font-bold text-2xl mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-dark border-4 border-primary shadow-lg z-10 flex items-center justify-center text-slate-900 dark:text-white text-[10px] font-bold hidden md:flex">
                  {i + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
