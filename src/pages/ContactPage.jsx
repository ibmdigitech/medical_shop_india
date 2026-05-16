import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Amster Med Care Pharmacy | Omassery, Kerala | Free Delivery</title>
        <meta name="description" content="Contact Amster Med Care pharmacy in Omassery, Kerala for medicine orders, home delivery queries, prescription upload & health advice. Call +91 90375 07643 or WhatsApp." />
        <meta name="keywords" content="pharmacy contact Omassery, medical shop phone number, medicine delivery Kerala, pharmacy WhatsApp, healthcare consultation" />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-xs font-bold mb-6 tracking-wider">
            📞 Get In Touch
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-6 leading-tight">
            Order Medicines or<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Ask a Pharmacist</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-500 text-lg max-w-2xl mx-auto">
            Need help finding a medicine? Have questions about dosage or side effects? Our licensed pharmacists are available 8 AM - 10 PM daily.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left - Info + Delivery Promo */}
          <div className="lg:col-span-2 space-y-6">
            {/* Store Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-primary transition-all shadow-lg">
              <h3 className="text-slate-900 font-bold font-heading text-2xl mb-6 flex items-center gap-2">
                <MapPin size={24} className="text-primary" />
                Omassery Main Store
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4 text-slate-600">
                  <MapPin size={20} className="text-primary mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Our Location</p>
                    <p className="text-sm leading-relaxed">Shop No. 13, Opposite Federal Bank, Near Metro Park, Omassery, Kerala 673582</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-slate-600">
                  <Phone size={20} className="text-secondary mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Call / WhatsApp</p>
                    <a href="tel:+919037507643" className="text-sm hover:text-primary">+91 90375 07643</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-slate-600">
                  <Mail size={20} className="text-accent mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Email Us</p>
                    <a href="mailto:info@amstermedcare.com" className="text-sm hover:text-primary">info@amstermedcare.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-slate-600">
                  <Clock size={20} className="text-primary-light mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Working Hours</p>
                    <p className="text-sm">Mon–Sun: 8:00 AM – 10:00 PM</p>
                    <p className="text-xs text-gray-500 mt-1">✓ 24/7 WhatsApp Support</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a href="https://wa.me/919037507643" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <MessageCircle size={28} />
              </div>
              <div>
                <p className="font-bold text-lg">Order via WhatsApp</p>
                <p className="text-white/90 text-sm">Send your prescription or medicine list</p>
              </div>
            </motion.a>

            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl"
            >
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                🚚 Fast Delivery Guarantee
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Same-day delivery for orders before 6 PM (Omassery)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Free delivery on all orders above ₹499
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  Pan-Kerala delivery in 24-48 hours
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black font-heading text-slate-900 mb-2">Send a <span className="text-primary">Message</span></h2>
              <p className="text-slate-500 mb-8">Have a specific requirement? Fill out the form below and we'll get back to you shortly.</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map embed (Omassery) */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto rounded-[40px] overflow-hidden border border-slate-100 h-[450px] relative shadow-xl">
          <iframe
            title="Amster Med Care Omassery Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.0!2d75.955!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIxJzAwLjAiTiA3NcKwNTcnMTguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%" height="100%" style={{ border: 0 }}
            allowFullScreen loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
