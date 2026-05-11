import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const contactInfo = [
  { icon: MapPin, label: 'Office Address', value: 'Business Bay, Dubai, UAE', sub: 'Office 2204, Aspect Tower' },
  { icon: Phone, label: 'Phone / WhatsApp', value: '+971 50 123 4567', sub: 'Mon–Sat, 9am–7pm GST' },
  { icon: Mail, label: 'Email Us', value: 'info@ibmdigitech.com', sub: 'We reply within 24 hours' },
  { icon: Clock, label: 'Business Hours', value: 'Mon–Sat: 9am – 7pm', sub: 'GST (Gulf Standard Time)' },
];

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - IBM DigiTech UAE</title>
        <meta name="description" content="Get in touch with IBM DigiTech. Contact us for IT solutions, consultations, or partnerships. Office in Business Bay, Dubai." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase">Get In Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's Start a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Conversation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
            Ready to transform your business? Our experts are here to help. Reach out for a free consultation.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left - Info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 bg-dark-card border border-white/10 rounded-2xl hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-primary-light" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                  <p className="text-gray-500 text-xs">{item.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* WhatsApp */}
            <motion.a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-3 p-5 bg-green-500/10 border border-green-500/30 rounded-2xl hover:bg-green-500/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Chat on WhatsApp</p>
                <p className="text-gray-400 text-xs">Instant response during business hours</p>
              </div>
            </motion.a>

            {/* Map embed */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
              className="rounded-2xl overflow-hidden border border-white/10 h-52">
              <iframe
                title="IBM DigiTech Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.2!2d55.2647!3d25.1865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDExJzExLjQiTiA1NcKwMTUnNTMuMCJF!5e0!3m2!1sen!2sae!4v1700000000000"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen loading="lazy"
              />
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-dark-card border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-2">Send Us a Message</h2>
            <p className="text-gray-400 text-sm mb-6">Fill in the form and we'll get back to you within 24 hours.</p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp">
        <MessageCircle size={26} className="text-white" />
      </a>
    </>
  );
}
