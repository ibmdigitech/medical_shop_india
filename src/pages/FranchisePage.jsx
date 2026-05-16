import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Building2, Users, TrendingUp, ShieldCheck, 
  ArrowRight, Phone, Mail, MapPin, CheckCircle2,
  Zap, Award, Globe, Rocket, MessageCircle
} from 'lucide-react';

const benefits = [
  {
    title: "Proven Business Model",
    desc: "Join a brand with a successful track record and established trust in the healthcare sector.",
    icon: Building2,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Supply Chain Support",
    desc: "Direct access to our robust supply network with competitive pricing and genuine medicine guarantee.",
    icon: Zap,
    color: "from-primary to-primary-dark"
  },
  {
    title: "Marketing & Branding",
    desc: "Benefit from our professional marketing campaigns, social media presence, and brand recognition.",
    icon: Rocket,
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Training & Operations",
    desc: "Comprehensive training for your staff and ongoing operational support for smooth management.",
    icon: Users,
    color: "from-amber-500 to-amber-600"
  }
];

const steps = [
  { title: "Application", desc: "Submit your inquiry form with location details." },
  { title: "Verification", desc: "Our team will visit and verify the proposed location." },
  { title: "Agreement", desc: "Complete the legal formalities and franchise agreement." },
  { title: "Setup", desc: "Store design, inventory stocking, and staff training." },
  { title: "Launch", desc: "Grand opening with marketing support from Amster." }
];

export default function FranchisePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    investment: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Franchise Inquiry:', formData);
    alert('Thank you for your interest! Our team will contact you soon.');
  };

  return (
    <>
      <Helmet>
        <title>Franchise Opportunity | Amster Med Care - Partner with Us</title>
        <meta name="description" content="Start your own pharmacy business with Amster Med Care. Join our growing network of trusted healthcare providers in Kerala. Low investment, high returns." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative pt-12 pb-32 bg-slate-900 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-3/5 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary-light text-xs font-black tracking-widest uppercase mb-8">
                  <Globe size={14} /> Growing Across Kerala
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-8"
              >
                Grow with the <br />
                <span className="text-primary italic">Most Trusted Name</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed"
              >
                Partner with Amster Med Care and start your journey as a healthcare entrepreneur. Low investment, high returns, and complete operational support.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6"
              >
                <a href="#inquiry-form" className="px-10 py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                   Apply Now <ArrowRight size={22} />
                </a>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-light">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call for Inquiry</p>
                    <p className="text-lg font-black">+91 90375 07643</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:w-2/5 relative"
            >
              <div className="relative rounded-[60px] overflow-hidden border-[12px] border-white/5 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&auto=format" alt="Franchise Opportunity" className="w-full h-auto object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                 <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                          <Award size={24} />
                       </div>
                       <h3 className="text-white font-black text-xl">Award Winning Brand</h3>
                    </div>
                    <p className="text-slate-300 text-sm">Join the network that won 'Best Emerging Pharmacy' award in 2024.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-primary font-black text-xs tracking-widest uppercase mb-4 block">The Amster Advantage</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Why Partner <span className="text-primary italic">With Us?</span>
            </h2>
            <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[40px] hover:bg-white dark:hover:bg-dark-card/80 hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-[24px] bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-slate-900 dark:text-white font-black text-2xl mb-4">{benefit.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Process */}
      <section className="py-32 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <img src="https://www.transparenttextures.com/patterns/asfalt-light.png" alt="pattern" className="w-full h-full object-repeat" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
               <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
                 Simple Path to <br />
                 <span className="text-primary italic">Ownership</span>
               </h2>
               <p className="text-slate-400 text-xl mb-12 max-w-lg">We've streamlined the process to help you launch your business in as little as 45 days.</p>
               
               <div className="space-y-12">
                 {steps.map((step, i) => (
                   <div key={i} className="flex gap-8 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary font-black text-2xl shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        {i + 1}
                     </div>
                     <div>
                       <h4 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                       <p className="text-slate-400">{step.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="lg:w-1/2 w-full" id="inquiry-form">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="bg-white dark:bg-dark-card rounded-[40px] p-10 md:p-16 shadow-2xl relative"
               >
                 <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Franchise Inquiry</h3>
                    <p className="text-slate-500">Fill the form below and we'll get back to you.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                          <input 
                            required
                            type="tel" 
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                            placeholder="+91 00000 00000"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                       <input 
                         required
                         type="email" 
                         className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                         placeholder="john@example.com"
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                       />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Target Location</label>
                          <input 
                            required
                            type="text" 
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                            placeholder="e.g. Kozhikode"
                            value={formData.location}
                            onChange={e => setFormData({...formData, location: e.target.value})}
                          />
                       </div>
                       <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Investment Range</label>
                          <select 
                            required
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-primary text-slate-900 dark:text-white font-bold"
                            value={formData.investment}
                            onChange={e => setFormData({...formData, investment: e.target.value})}
                          >
                             <option value="">Select Range</option>
                             <option value="10-15L">₹10 Lakh - ₹15 Lakh</option>
                             <option value="15-25L">₹15 Lakh - ₹25 Lakh</option>
                             <option value="25L+">₹25 Lakh +</option>
                          </select>
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Additional Message</label>
                       <textarea 
                         rows={4}
                         className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl focus:outline-none focus:border-primary text-slate-900 dark:text-white font-bold resize-none"
                         placeholder="Tell us about your background..."
                         value={formData.message}
                         onChange={e => setFormData({...formData, message: e.target.value})}
                       />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                       Submit Inquiry <ArrowRight size={22} />
                    </button>
                 </form>

                 <div className="mt-10 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl text-center">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                       <ShieldCheck size={14} className="text-primary" /> Data is secured & confidential
                    </p>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-32 px-4 bg-white dark:bg-dark">
         <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8">Still Have Questions?</h2>
            <p className="text-slate-500 text-xl mb-12">Our partnership experts are available 24/7 to guide you through the process.</p>
            <div className="flex flex-wrap justify-center gap-8">
               <div className="flex items-center gap-4 text-left p-6 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-slate-100 dark:border-white/10">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                     <Phone size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Direct Call</p>
                     <p className="text-2xl font-black text-slate-900 dark:text-white">+91 90375 07643</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-left p-6 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-slate-100 dark:border-white/10">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-white shadow-xl shadow-secondary/20">
                     <Mail size={28} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Send Email</p>
                     <p className="text-2xl font-black text-slate-900 dark:text-white">franchise@amster.com</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </>
  );
}
