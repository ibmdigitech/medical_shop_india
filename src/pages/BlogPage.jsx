import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, ArrowRight, Search, Calendar, Tag, ChevronRight, Share2 } from 'lucide-react';
import NewsletterSection from '../components/NewsletterSection';

const posts = [
  {
    id: 1, slug: 'generic-vs-branded-medicines',
    title: 'Generic vs. Branded Medicines: Everything You Need to Know',
    category: 'Education', author: 'Dr. Sarah Ahmed', date: 'May 8, 2025', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    excerpt: 'Understand why generic medicines are just as effective as branded ones and how they can save you significantly on healthcare costs.',
  },
  {
    id: 2, slug: 'diabetes-management-tips',
    title: '10 Essential Tips for Managing Diabetes Effectively',
    category: 'Wellness', author: 'Dr. John Doe', date: 'Apr 22, 2025', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80',
    excerpt: 'Managing diabetes doesn\'t have to be overwhelming. Follow these simple lifestyle changes and medication tips for a healthier life.',
  },
  {
    id: 3, slug: 'importance-of-regular-health-checkups',
    title: 'Why Regular Health Checkups are Crucial for All Ages',
    category: 'Health', author: 'Dr. Emily White', date: 'Apr 10, 2025', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    excerpt: 'Preventive healthcare starts with regular screenings. Learn which lab tests you should take annually based on your age group.',
  },
  {
    id: 4, slug: 'summer-skincare-routine',
    title: 'Dermatologist-Approved Summer Skincare Routine',
    category: 'Wellness', author: 'Dr. Lisa Ray', date: 'Mar 15, 2025', readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    excerpt: 'Protect your skin from the intense Kerala sun with these professional skincare tips and recommended products.',
  }
];

const categories = ['All', 'Education', 'Wellness', 'Health', 'Nutrition', 'Safety'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <Helmet>
        <title>Health Hub & Blog | Amster Med Care - Expert Healthcare Insights</title>
        <meta name="description" content="Read our latest health articles, medicine guides, and wellness tips. Expert advice from Amster Med Care pharmacists and doctors." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-48 pb-32 bg-slate-900 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-light text-xs font-black tracking-widest uppercase mb-8">
                <Tag size={14} /> The Health Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-black text-white leading-tight mb-8"
            >
              Wellness Insights & <br />
              <span className="text-primary italic">Expert Guides</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 text-xl leading-relaxed mb-12"
            >
              Stay informed with the latest in healthcare, nutrition, and medicine. Curated by our expert medical team.
            </motion.p>

            {/* Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }} 
              className="relative w-full max-w-xl mx-auto"
            >
              <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search health topics, articles..."
                className="w-full pl-16 pr-6 py-5 bg-white/10 border border-white/10 rounded-3xl text-white font-bold placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter - Floating Style */}
      <div className="py-8 px-4 sticky top-24 z-30 bg-white/90 dark:bg-dark/90 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-24 px-4 bg-slate-50/50 dark:bg-dark-card/10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode='popLayout'>
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
                <Search size={64} className="mx-auto text-slate-200 mb-6" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">No articles found</h3>
                <p className="text-slate-500">Try adjusting your search or filters.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filtered.map((post, i) => (
                  <motion.article 
                    key={post.id} 
                    layout
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: (i % 6) * 0.1 }}
                    className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] overflow-hidden group hover:border-primary/40 hover:shadow-2xl transition-all duration-500 flex flex-col"
                  >
                    <div className="h-64 relative overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl text-primary text-[10px] font-black uppercase tracking-widest shadow-xl">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute bottom-6 right-6">
                         <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all shadow-xl">
                            <Share2 size={16} />
                         </button>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <div className="flex items-center gap-2">
                           <Calendar size={12} className="text-primary" /> {post.date}
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-2">
                           <Clock size={12} className="text-primary" /> {post.readTime}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto pt-8 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-primary font-black">
                               {post.author[4]}
                            </div>
                            <span className="text-xs font-black text-slate-900 dark:text-white">{post.author}</span>
                         </div>
                         
                         <Link to={`/blog/${post.slug}`} className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group/btn">
                           Read More <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                         </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Newsletter */}
      <div className="pb-24">
        <NewsletterSection />
      </div>
    </>
  );
}
