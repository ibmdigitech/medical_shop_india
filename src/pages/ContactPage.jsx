import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Amster Med Care - Your Trusted Pharmacy Partner</title>
        <meta name="description" content="Reach out to Amster Med Care for medicine orders, health advice, and prescription uploads. Available 24/7 on WhatsApp for the community of Omassery." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-12 pb-32 bg-white dark:bg-dark overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-black tracking-widest uppercase mb-8">
                <Send size={14} /> Always Here for You
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8"
            >
              Let's Talk About <br />
              <span className="text-primary italic">Your Health</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 dark:text-gray-400 text-xl md:text-2xl leading-relaxed mb-12"
            >
              Have questions about your prescription or need health advice? Our licensed pharmacists are just a message away.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-dark-card/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-8">
             {[
               { icon: MapPin, title: 'Main Pharmacy', detail: 'Opposite Federal Bank, Omassery, Kerala 673582', color: 'bg-primary' },
               { icon: Phone, title: 'Call Center', detail: '+91 90375 07643', color: 'bg-secondary' },
               { icon: Mail, title: 'Email Support', detail: 'care@amstermed.com', color: 'bg-accent' },
               { icon: Clock, title: 'Working Hours', detail: 'Mon - Sun: 8:00 AM - 10:00 PM', color: 'bg-slate-900' }
             ].map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-center gap-6 p-8 bg-white dark:bg-dark-card rounded-[32px] border border-slate-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:border-primary/30 transition-all duration-500 group"
               >
                 <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                   <item.icon size={28} />
                 </div>
                 <div>
                    <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-slate-900 dark:text-white font-black text-xl leading-tight">{item.detail}</p>
                 </div>
               </motion.div>
             ))}

             {/* WhatsApp CTA */}
             <motion.a 
               href="https://wa.me/919037507643"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="block p-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-[40px] text-white shadow-2xl relative overflow-hidden group"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                      <MessageCircle size={32} className="fill-white" />
                   </div>
                   <h3 className="text-3xl font-black mb-2 italic">Quick WhatsApp Order</h3>
                   <p className="text-white/80 mb-8 font-bold">Simply send your prescription photo to order.</p>
                   <div className="px-8 py-4 bg-white text-[#128C7E] font-black rounded-2xl flex items-center gap-2 group-hover:gap-4 transition-all">
                      Chat Now <ArrowRight size={20} />
                   </div>
                </div>
             </motion.a>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-7">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white dark:bg-dark-card rounded-[48px] p-12 md:p-16 border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden h-full"
             >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-250 -mt-250" />
                
                <div className="relative z-10">
                   <div className="mb-12">
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Send us a <span className="text-primary italic">Message</span></h2>
                      <p className="text-slate-500 dark:text-gray-400 font-medium">Fill out the form below and our health experts will get back to you within 2 hours.</p>
                   </div>
                   
                   <ContactForm />

                   <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                         <ShieldCheck className="text-primary" size={24} />
                         <span className="text-xs font-black text-slate-500 uppercase tracking-widest">End-to-End Encrypted</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                         <Zap className="text-secondary" size={24} />
                         <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Fast Support Response</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-4 bg-white dark:bg-dark">
         <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-slate-50 dark:border-white/5 h-[600px] group">
               <iframe
                 title="Amster Med Care Omassery Location"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15651.0!2d75.955!3d11.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDIxJzAwLjAiTiA3NcKwNTcnMTguMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                 width="100%" height="100%" style={{ border: 0 }}
                 allowFullScreen loading="lazy"
                 className="grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute bottom-12 left-12 right-12 md:right-auto md:w-96 p-8 bg-white/90 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Visit our Store</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">Experience our premium healthcare services in person. Licensed pharmacists available on floor.</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
                  >
                    Get Directions <ArrowRight size={14} />
                  </a>
               </div>
            </div>
         </div>
      </section>
    </>
  );
}
