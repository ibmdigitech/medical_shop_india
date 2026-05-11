import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, Search } from 'lucide-react';
import NewsletterSection from '../components/NewsletterSection';

const posts = [
  {
    id: 1, slug: 'generic-vs-branded-medicines',
    title: 'Generic vs. Branded Medicines: Everything You Need to Know',
    category: 'Education', author: 'Dr. Sarah Ahmed', date: 'May 8, 2025', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    excerpt: 'Understand why generic medicines are just as effective as branded ones and how they can save you significantly on healthcare costs.',
  },
  {
    id: 2, slug: 'diabetes-management-tips',
    title: '10 Essential Tips for Managing Diabetes Effectively',
    category: 'Wellness', author: 'Dr. John Doe', date: 'Apr 22, 2025', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80',
    excerpt: 'Managing diabetes doesn\'t have to be overwhelming. Follow these simple lifestyle changes and medication tips for a healthier life.',
  },
  {
    id: 3, slug: 'importance-of-regular-health-checkups',
    title: 'Why Regular Health Checkups are Crucial for All Ages',
    category: 'Health', author: 'Dr. Emily White', date: 'Apr 10, 2025', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
    excerpt: 'Preventive healthcare starts with regular screenings. Learn which lab tests you should take annually based on your age group.',
  },
];

const categories = ['All', 'Education', 'Wellness', 'Health', 'Nutrition', 'Safety'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Health Blog - Amster Med Care Omassery</title>
        <meta name="description" content="Expert health advice, medicine guides, and wellness tips from Amster Med Care. Stay informed and live a healthier life." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase">Health Hub</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-white mb-4">
            Wellness Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Health Guides</span>
          </motion.h1>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative mt-6 max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search health topics..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-all" />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="py-6 px-4 sticky top-20 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-16">No articles found. Try a different search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-dark-card border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <div className="h-44 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-primary-light text-xs font-semibold">{post.category}</span>
                    </div>
                    <h2 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-primary-light transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><User size={11} /> {post.author}</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-primary-light hover:gap-2 transition-all font-semibold">
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
