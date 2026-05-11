import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import { projects, projectCategories } from '../data/projects';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Portfolio - IBM DigiTech UAE</title>
        <meta name="description" content="Explore IBM DigiTech's portfolio of successful projects across Web, Mobile, HRMS, ERP, Cloud, and AI for UAE clients." />
      </Helmet>

      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-secondary/15 border border-secondary/30 rounded-full text-secondary-light text-xs font-semibold mb-6 tracking-widest uppercase">Our Work</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white mb-4">
            Projects That <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Define Excellence</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            250+ successful projects delivered for UAE enterprises across diverse industries and technology domains.
          </motion.p>
        </div>
      </section>

      <section className="py-8 px-4 sticky top-20 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {projectCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === cat ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
