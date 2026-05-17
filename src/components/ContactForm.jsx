import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiBaseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Is the backend running?');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="text-gray-400 text-sm">Our team will get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="mt-2 text-primary-light text-sm hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required
            className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary transition-all shadow-sm" />
        </div>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required
            className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary transition-all shadow-sm" />
        </div>
      </div>
      <div className="relative">
        <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number (e.g. +91 90000 00000)" required
          className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary transition-all shadow-sm" />
      </div>
      <div className="relative">
        <select 
          name="service" 
          value={form.service} 
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-400 text-sm focus:outline-none focus:border-primary transition-all shadow-sm appearance-none"
        >
          <option value="" className="bg-white dark:bg-dark text-slate-900 dark:text-white">Select Inquiry Type</option>
          {[
            'Prescription Verification',
            'Medicine Availability',
            'Lab Test Booking',
            'Home Delivery Support',
            'Franchise Opportunity',
            'General Health Advice',
            'Career Inquiry',
            'Other Feedback'
          ].map(s => (
            <option key={s} value={s} className="bg-white dark:bg-dark text-slate-900 dark:text-white">{s}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
           <Send size={14} className="rotate-90" />
        </div>
      </div>
      <div className="relative">
        <MessageSquare size={16} className="absolute left-3 top-3.5 text-slate-400" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="How can our pharmacists help you today?" required rows={4}
          className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 text-sm focus:outline-none focus:border-primary transition-all resize-none shadow-sm" />
      </div>
      <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
        <Send size={16} /> Send Inquiry Now
      </button>
    </motion.form>
  );
}
