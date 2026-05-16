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
    <section className="py-16 px-4 bg-slate-50 border-y border-slate-100">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-semibold mb-4 tracking-wider uppercase">Newsletter</span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 mb-2">Stay Healthy & Updated</h2>
          <p className="text-slate-500 text-sm mb-6">Get the latest health tips, exclusive pharmacy offers, and Omassery community news straight to your inbox.</p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400 font-semibold"><CheckCircle size={20} /> You're subscribed!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                required
              />
              <button type="submit" className="px-5 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
                <Send size={16} /> Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
