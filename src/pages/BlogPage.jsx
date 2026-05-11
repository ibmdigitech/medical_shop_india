import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, Tag, ArrowRight, Search } from 'lucide-react';
import NewsletterSection from '../components/NewsletterSection';

const posts = [
  {
    id: 1, slug: 'uae-digital-transformation-2024',
    title: 'UAE Digital Transformation: What Enterprises Need to Know in 2025',
    category: 'Digital Transformation', author: 'Khalid Al Mansoori', date: 'May 8, 2025', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    excerpt: 'The UAE government\'s Vision 2031 is accelerating digital transformation across all sectors. Here\'s how enterprises can stay ahead and capitalize on emerging opportunities.',
  },
  {
    id: 2, slug: 'hrms-uae-compliance-guide',
    title: 'Complete Guide to UAE-Compliant HRMS in 2025',
    category: 'HRMS', author: 'Fatima Al Hashimi', date: 'Apr 22, 2025', readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    excerpt: 'With the UAE\'s updated labor laws, having a compliant HRMS is no longer optional. This guide covers everything you need to know about WPS, leave management, and more.',
  },
  {
    id: 3, slug: 'cloud-migration-best-practices',
    title: 'Cloud Migration Best Practices for UAE Businesses',
    category: 'Cloud', author: 'Ravi Sharma', date: 'Apr 10, 2025', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    excerpt: 'Migrating to the cloud promises significant cost savings and scalability — but without the right strategy, it can be risky. Learn proven approaches to a smooth migration.',
  },
  {
    id: 4, slug: 'ai-business-uae',
    title: 'How AI is Reshaping Business Operations Across the UAE',
    category: 'AI', author: 'James Wilson', date: 'Mar 28, 2025', readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    excerpt: 'From predictive analytics to intelligent automation, AI is no longer a luxury — it\'s a competitive necessity for UAE enterprises in every industry.',
  },
  {
    id: 5, slug: 'mobile-app-trends-2025',
    title: 'Top Mobile App Development Trends to Watch in 2025',
    category: 'Mobile', author: 'Ravi Sharma', date: 'Mar 15, 2025', readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    excerpt: 'Super-apps, AR integration, and AI-powered UX are redefining what mobile apps can do. Discover the trends that will dominate app development this year.',
  },
  {
    id: 6, slug: 'cyber-security-uae-sme',
    title: 'Cyber Security Essentials for UAE SMEs',
    category: 'Security', author: 'Khalid Al Mansoori', date: 'Mar 5, 2025', readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
    excerpt: 'SMEs are increasingly targeted by cybercriminals. This guide covers the essential security measures every UAE small and medium business should implement immediately.',
  },
];

const categories = ['All', 'Digital Transformation', 'HRMS', 'Cloud', 'AI', 'Mobile', 'Security'];

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
        <title>Blog - Amster Med Care UAE</title>
        <meta name="description" content="Stay informed with Amster Med Care's blog — expert insights on IT trends, UAE digital transformation, cloud, AI, HRMS, and more." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-semibold mb-6 tracking-widest uppercase">Knowledge Hub</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-white mb-4">
            IT Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Industry News</span>
          </motion.h1>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative mt-6 max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-all" />
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="py-6 px-4 sticky top-20 z-30 bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}>
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
