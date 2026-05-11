import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          <User size={16} className="absolute left-3 top-3.5 text-gray-500" />
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required
            className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-all" />
        </div>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-3.5 text-gray-500" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required
            className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-all" />
        </div>
      </div>
      <div className="relative">
        <Phone size={16} className="absolute left-3 top-3.5 text-gray-500" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number (e.g. +971 50 000 0000)"
          className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-all" />
      </div>
      <select name="service" value={form.service} onChange={handleChange}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm focus:outline-none focus:border-primary/50 transition-all">
        <option value="">Select a Service</option>
        {['Web Development','Mobile App Development','HRMS Solutions','ERP Systems','Cloud Services','AI Solutions','Cyber Security','IT Consultancy','Digital Marketing'].map(s => (
          <option key={s} value={s} className="bg-dark">{s}</option>
        ))}
      </select>
      <div className="relative">
        <MessageSquare size={16} className="absolute left-3 top-3.5 text-gray-500" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project..." required rows={4}
          className="w-full pl-9 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none" />
      </div>
      <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
        <Send size={16} /> Send Message
      </button>
    </motion.form>
  );
}
