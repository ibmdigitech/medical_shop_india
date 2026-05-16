import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Briefcase, ChevronRight, X, Send, 
  User, Mail, Phone, FileText, Heart, Shield, 
  Sparkles, Award, Zap, Users, CheckCircle2
} from 'lucide-react';
import CTASection from '../components/CTASection';
import { jobs } from '../data/jobs';

const benefits = [
  { icon: Heart, title: 'Health First', desc: 'Comprehensive medical coverage for you and your family members.' },
  { icon: Clock, title: 'Life Balance', desc: 'Generous leave policy and flexible timing for better work-life harmony.' },
  { icon: Award, title: 'Growth Path', desc: 'Structured learning, professional certifications, and clear promotions.' },
  { icon: Sparkles, title: 'Innovation', desc: 'Work with the latest pharmaceutical technology and AI systems.' },
  { icon: Users, title: 'Great Culture', desc: 'Join a diverse team that values collaboration, integrity, and care.' },
  { icon: Zap, title: 'Impact', desc: 'Make a real difference in the healthcare journey of thousands.' },
];

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setSubmitted(true); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative bg-white dark:bg-dark-card border border-slate-100 dark:border-white/10 rounded-[48px] p-12 w-full max-w-xl shadow-2xl overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-primary transition-all"><X size={24} /></button>
        
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-8 animate-bounce">
               <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic">Application Sent!</h3>
            <p className="text-slate-500 dark:text-gray-400 text-lg">We've received your application for <span className="text-primary font-bold">{job.title}</span>. Our HR team will contact you soon.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
               <span className="text-primary font-black text-[10px] uppercase tracking-widest block mb-2">Joining the Team</span>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 italic">{job.title}</h3>
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{job.location} • {job.type}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input required placeholder="Enter name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input required type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input required placeholder="+91" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Why should we hire you?</label>
                <textarea placeholder="Tell us about your experience..." rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[32px] text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary transition-all resize-none" />
              </div>
              
              <button type="submit" className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                <Send size={20} /> Submit Application
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <>
      <Helmet>
        <title>Careers | Amster Med Care - Join Kerala's Leading Pharmacy Network</title>
        <meta name="description" content="Explore exciting career opportunities in healthcare and pharmacy. Join the Amster Med Care family and build your future in Omassery." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-48 pb-32 bg-slate-900 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-light text-[10px] font-black tracking-widest uppercase mb-8">
               <Briefcase size={12} /> Work with Amster
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-8xl font-black text-white leading-tight mb-8"
          >
            Build Your <br />
            <span className="text-primary italic">Healthcare Career</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Join a passionate team dedicated to redefining the pharmacy experience. Your journey to excellence starts here.
          </motion.p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">The Amster <span className="text-primary italic">Advantage</span></h2>
             <p className="text-slate-500 dark:text-gray-400 text-lg max-w-xl mx-auto">We provide a supportive environment where your growth is our priority.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[48px] hover:border-primary/30 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-dark border border-slate-100 dark:border-white/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                   <b.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic">{b.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-32 px-4 bg-slate-50 dark:bg-dark-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
             <div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white italic">Open Roles</h2>
                <p className="text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Explore {jobs.length} current opportunities</p>
             </div>
             <div className="hidden md:flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> Hiring Regularly</span>
                <span>•</span>
                <span className="flex items-center gap-2"><Shield size={14} className="text-secondary" /> Expert Training</span>
             </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job, i) => (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] p-8 md:p-12 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase tracking-widest">{job.department}</span>
                      <span className="px-4 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 text-[10px] font-black uppercase tracking-widest">{job.type}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-bold">
                      <span className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {job.location}</span>
                      <span className="flex items-center gap-2"><Users size={16} className="text-primary" /> High Growth Team</span>
                    </div>
                    <p className="text-slate-500 dark:text-gray-400 text-lg mt-6 leading-relaxed max-w-2xl">{job.description}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="shrink-0 inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-xl"
                  >
                    Apply Now <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>
      
      <div className="pb-24">
        <CTASection />
      </div>
    </>
  );
}
