import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Amster Med Care Omassery</title>
        <meta name="description" content="Contact Amster Med Care pharmacy in Omassery, Kerala. Reach out for medicine inquiries, home delivery, or health advice." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary-light text-xs font-semibold mb-6 tracking-widest uppercase">Contact Us</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
            How can we <br />
            <span className="text-primary italic">help you?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
            Have a question about a medicine or need help with home delivery? Our pharmacists are here to assist you.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left - Info */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="p-8 bg-dark-card border border-white/10 rounded-3xl hover:border-primary/30 transition-all">
              <h3 className="text-white font-bold text-2xl mb-6">Omassery Main Store</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-gray-400">
                  <MapPin size={24} className="text-primary shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Our Location</p>
                    <p className="text-sm leading-relaxed">Shop No. 13, Opposite Federal Bank, Near Metro Park, Omassery, Kerala 673582</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-400">
                  <Phone size={24} className="text-secondary shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Call or WhatsApp</p>
                    <p className="text-sm">+91 90375 07643</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-400">
                  <Mail size={24} className="text-accent shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Email Us</p>
                    <p className="text-sm">info@amstermedcare.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-gray-400">
                  <Clock size={24} className="text-primary-light shrink-0" />
                  <div>
                    <p className="text-white font-semibold">Working Hours</p>
                    <p className="text-sm">Mon–Sun: 08:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp */}
            <motion.a href="https://wa.me/919037507643" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-4 p-6 bg-green-500/10 border border-green-500/30 rounded-3xl hover:bg-green-500/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <MessageCircle size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-bold">Chat on WhatsApp</p>
                <p className="text-gray-400 text-xs">Fastest way to get in touch</p>
              </div>
            </motion.a>
          </div>

          {/* Right - Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-dark-card border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-4">Send a <span className="text-primary">Message</span></h2>
              <p className="text-gray-400 mb-8">Have a specific requirement? Fill out the form below and we'll get back to you shortly.</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map embed (Omassery) */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden border border-white/10 h-[450px] relative shadow-2xl">
          <iframe
            title="Amster Med Care Omassery Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.0!2d75.955!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIxJzAwLjAiTiA3NcKwNTcnMTguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) brightness(1.2)' }}
            allowFullScreen loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
