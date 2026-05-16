import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-white dark:bg-dark">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="glass-card p-12 md:p-20 relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10">
            <span className="badge-premium mb-8">Stay Connected</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Get the Latest <br />
              <span className="text-primary italic">Healthcare Updates</span>
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Join 5,000+ families in Omassery who trust Amster for health tips, exclusive offers, and community news.
            </p>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-green-500 font-black"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
                   <CheckCircle size={40} />
                </div>
                <p className="text-2xl">You're on the list!</p>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Check your inbox for a welcome gift.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-8 py-5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  <Send size={20} /> Subscribe
                </button>
              </form>
            )}
            
            <p className="mt-8 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
               No spam, only health. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
