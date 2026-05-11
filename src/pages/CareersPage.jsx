import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ChevronRight, X, Send, User, Mail, Phone, FileText } from 'lucide-react';
import CTASection from '../components/CTASection';
import { jobs } from '../data/jobs';

const benefits = [
  { emoji: '🏥', title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and your family.' },
  { emoji: '🏖️', title: '30 Days Annual Leave', desc: 'Generous leave policy to rest, recharge, and explore.' },
  { emoji: '📈', title: 'Career Growth', desc: 'Structured learning paths, certifications, and promotions.' },
  { emoji: '🎯', title: 'Performance Bonus', desc: 'Competitive bonuses tied to your achievements.' },
  { emoji: '🌍', title: 'Remote Flexibility', desc: 'Hybrid work options available for eligible roles.' },
  { emoji: '🎓', title: 'Learning Budget', desc: 'Annual budget for courses, conferences, and certifications.' },
];

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-dark-card border border-white/15 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-white font-bold text-lg mb-2">Application Submitted!</h3>
            <p className="text-gray-400 text-sm">We'll review your application and get back to you within 3-5 business days.</p>
          </div>
        ) : (
          <>
            <h3 className="text-white font-bold text-lg mb-1">Apply for: {job.title}</h3>
            <p className="text-gray-400 text-sm mb-6">{job.location} · {job.type}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User size={15} className="absolute left-3 top-3.5 text-gray-500" />
                <input required placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50" />
              </div>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-3.5 text-gray-500" />
                <input required type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50" />
              </div>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-3.5 text-gray-500" />
                <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50" />
              </div>
              <textarea placeholder="Why are you a great fit for this role?" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 resize-none" />
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                <Send size={15} /> Submit Application
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      <Helmet>
        <title>Careers - Amster Med Care UAE</title>
        <meta name="description" content="Join Amster Med Care — UAE's leading IT company. Explore exciting career opportunities in tech, cloud, AI, and more." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase">Careers</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white mb-4">
            Build the Future <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">With Us</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join a team of passionate technologists shaping the digital landscape of the UAE. We're always looking for exceptional talent.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-dark-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Why Work at Amster Med Care?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-dark border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-all">
                <span className="text-2xl mb-3 block">{b.emoji}</span>
                <h3 className="text-white font-semibold mb-1">{b.title}</h3>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Open <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Positions</span></h2>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-dark-card border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-primary-light text-xs font-semibold">{job.department}</span>
                      <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-md text-gray-400 text-xs">{job.type}</span>
                    </div>
                    <h3 className="text-white font-bold text-lg group-hover:text-primary-light transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-gray-500 text-sm">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={13} /> {job.type}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.requirements.map(r => (
                        <span key={r} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-500">{r}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setSelectedJob(job)}
                    className="shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all text-sm whitespace-nowrap">
                    Apply Now <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      <CTASection />
    </>
  );
}
