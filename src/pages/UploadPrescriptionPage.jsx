import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, CheckCircle2, ShieldCheck, 
  AlertCircle, ArrowLeft, Send, Sparkles,
  Zap, ArrowRight, Shield, Heart, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ patient_name: '', mobile: '', notes: '' });

  const handleFileChange = (e) => {
    if (e.target.files[0]) { 
      setFile(e.target.files[0]); 
      setStep(2); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    // Simulation of upload
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-40 pb-24 bg-white dark:bg-dark overflow-hidden relative">
      <Helmet>
        <title>Upload Prescription | Amster Med Care Premium Service</title>
        <meta name="description" content="Securely upload your prescription. Our certified pharmacists will review and prepare your order for express delivery." />
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
             <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black tracking-widest uppercase mb-6">
                <Shield size={12} /> Secure & HIPAA Compliant
             </span>
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
           >
             Order with <span className="text-primary italic">Prescription</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-slate-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
           >
             Our certified pharmacists will review your prescription and process your order for home delivery within 60 minutes.
           </motion.p>
        </div>

        {/* Progress Bar - Premium Style */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 dark:bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-primary"
               animate={{ width: `${((step - 1) / 2) * 100}%` }}
               transition={{ duration: 0.5 }}
             />
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs z-10 transition-all duration-500 ${
                    step >= s ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-110' : 'bg-white dark:bg-dark-card text-slate-300 border-4 border-slate-100 dark:border-white/5'
                  }`}
                >
                  {step > s ? <CheckCircle2 size={20} /> : s}
                </motion.div>
                <span className={`text-[9px] font-black uppercase tracking-widest mt-3 ${step >= s ? 'text-primary' : 'text-slate-400'}`}>
                   {s === 1 ? 'Upload' : s === 2 ? 'Details' : 'Success'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-dark-card border border-slate-100 dark:border-white/5 rounded-[48px] p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern inside card */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-200 -mt-200" />

            <div className="relative z-10">
              {step === 1 && (
                <div className="text-center space-y-10">
                  <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mx-auto text-primary animate-pulse">
                    <Upload size={48} />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white italic">Drop Your Prescription</h2>
                    <p className="text-slate-500 dark:text-gray-400 max-w-sm mx-auto">Click below to browse or drag your file here. Supports PDF, JPG, and PNG.</p>
                  </div>

                  <label className="block cursor-pointer group">
                    <div className="relative border-4 border-dashed border-slate-100 dark:border-white/5 rounded-[40px] p-16 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                      <div className="flex flex-col items-center gap-6">
                         <div className="w-16 h-16 rounded-2xl bg-white dark:bg-dark shadow-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                            <FileText size={32} />
                         </div>
                         <span className="text-slate-900 dark:text-white font-black text-lg">Browse Files</span>
                         <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Max File Size: 10MB</span>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                    </div>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                     {[
                       { icon: ShieldCheck, title: 'Safe & Secure', desc: 'Encrypted transmission' },
                       { icon: Sparkles, title: 'AI Verification', desc: 'Fast processing' }
                     ].map((marker, i) => (
                       <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10 text-left">
                          <marker.icon className="text-primary shrink-0" size={24} />
                          <div>
                             <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">{marker.title}</h4>
                             <p className="text-slate-500 text-[10px] mt-1">{marker.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                   <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-black text-slate-900 dark:text-white italic">Confirm Details</h2>
                      <button onClick={() => { setFile(null); setStep(1); }} className="text-primary font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
                         <ArrowLeft size={14} /> Change File
                      </button>
                   </div>

                   <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/10 flex items-center gap-4">
                      <div className="w-14 h-14 bg-white dark:bg-dark-card rounded-2xl flex items-center justify-center text-primary shadow-lg">
                         <FileText size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-slate-900 dark:text-white font-black truncate">{file?.name}</p>
                         <p className="text-primary text-[10px] font-black uppercase tracking-widest">Selected for upload</p>
                      </div>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Patient Full Name</label>
                           <input 
                             required 
                             name="patient_name" 
                             value={formData.patient_name} 
                             onChange={handleChange} 
                             className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary" 
                             placeholder="Enter name"
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                           <input 
                             required 
                             name="mobile" 
                             value={formData.mobile} 
                             onChange={handleChange} 
                             className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary" 
                             placeholder="+91"
                           />
                        </div>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Special Instructions (Optional)</label>
                         <textarea 
                           name="notes" 
                           value={formData.notes} 
                           onChange={handleChange} 
                           rows={4}
                           className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[32px] px-6 py-4 text-slate-900 dark:text-white font-black focus:outline-none focus:border-primary resize-none" 
                           placeholder="Any specific brands or timing preferences?"
                         />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-5 bg-primary text-white font-black text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                      >
                         Secure Upload <ArrowRight size={22} />
                      </button>
                   </form>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-10 space-y-12">
                   <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                      <div className="w-32 h-32 bg-primary text-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10 group-hover:rotate-12 transition-transform">
                         <CheckCircle2 size={64} />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h2 className="text-4xl font-black text-slate-900 dark:text-white italic">Prescription Received!</h2>
                      <p className="text-slate-500 dark:text-gray-400 text-lg max-w-md mx-auto">Our pharmacist will call you within <b className="text-primary">15 minutes</b> to confirm the medicines and final quote.</p>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                      <Link to="/" className="px-10 py-5 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-black text-sm rounded-2xl border border-slate-100 dark:border-white/10 hover:bg-slate-100 transition-all uppercase tracking-widest">
                         Back to Home
                      </Link>
                      <Link to="/medicines" className="px-10 py-5 bg-primary text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest">
                         Shop Medicines
                      </Link>
                   </div>

                   <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { icon: Heart, text: 'Expert Care' },
                        { icon: Zap, text: 'Fast Review' },
                        { icon: Shield, text: 'Safe Handling' }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                           <item.icon size={24} className="text-primary/50" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.text}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-12 text-center text-slate-400 text-xs font-black uppercase tracking-widest">
           Your data is protected under HIPAA and GDPR guidelines.
        </p>
      </div>
    </div>
  );
}
