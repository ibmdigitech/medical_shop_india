import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function UploadPrescriptionPage() {
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({ patient_name: '', mobile: '', notes: '' });

  const handleFileChange = (e) => {
    if (e.target.files[0]) { setFile(e.target.files[0]); setStep(2); }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    
    const data = new FormData();
    data.append('prescription', file);
    data.append('patient_name', formData.patient_name);
    data.append('mobile', formData.mobile);
    data.append('notes', formData.notes);

    try {
      const response = await fetch('http://localhost:5000/api/upload-prescription', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setStep(3); 
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Network error. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Helmet>
        <title>Upload Prescription | Amster Med Care</title>
        <meta name="description" content="Upload your prescription at Amster Med Care, Omassery. Our pharmacists review it and deliver medicines to your doorstep." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold font-heading text-slate-900">Upload Prescription</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          {[1, 2, 3].map((s) => (
            <div key={s}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                step >= s ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-white text-slate-400 border border-slate-200 shadow-sm'
              }`}
            >
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
          ))}
        </div>

        <motion.div
          key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          {step === 1 && (
            <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                <Upload size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-heading text-slate-900">Upload your prescription</h2>
                <p className="text-slate-500">Our pharmacists will review it and add the medicines to your cart.</p>
              </div>
              <label className="block">
                <div className="mt-4 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-10 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                  <FileText size={32} className="text-slate-400 group-hover:text-primary transition-colors mb-4" />
                  <span className="text-slate-600 font-medium">Click to browse or drag and drop</span>
                  <span className="text-slate-400 text-xs mt-2">Supports JPG, PNG, PDF (Max 5MB)</span>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                </div>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl text-left border border-slate-100">
                  <ShieldCheck className="text-green-500 shrink-0" size={18} />
                  <div>
                    <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider">Privacy Guaranteed</h4>
                    <p className="text-slate-500 text-[10px] mt-1">Your data is encrypted and handled only by certified pharmacists.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl text-left border border-slate-100">
                  <AlertCircle className="text-amber-400 shrink-0" size={18} />
                  <div>
                    <h4 className="text-slate-900 text-xs font-bold uppercase tracking-wider">Valid Prescription</h4>
                    <p className="text-slate-500 text-[10px] mt-1">Ensure the prescription includes doctor details, patient name, and date.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-8">
                <FileText className="text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-medium truncate">{file?.name}</p>
                  <p className="text-primary text-xs">Ready to submit</p>
                </div>
                <button type="button" onClick={() => { setFile(null); setStep(1); }} className="text-slate-400 hover:text-slate-700 text-xs underline">Change</button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 ml-1 font-medium">Patient Name</label>
                  <input name="patient_name" value={formData.patient_name} onChange={handleChange} required type="text" placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 ml-1 font-medium">Mobile Number</label>
                  <input name="mobile" value={formData.mobile} onChange={handleChange} required type="tel" placeholder="e.g. +91 98765 43210" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 ml-1 font-medium">Additional Notes (Optional)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any specific requirements or instructions..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 h-32" />
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300">
                Submit Prescription
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-heading text-slate-900">Successfully Uploaded!</h2>
                <p className="text-slate-500 max-w-sm mx-auto">Our pharmacist will call you within 15 minutes to confirm the medicines and final price.</p>
              </div>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="px-8 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all">Back to Home</Link>
                <Link to="/medicines" className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">Continue Shopping</Link>
              </div>
            </div>
          )}
        </motion.div>

        <p className="mt-8 text-center text-slate-400 text-xs">
          By uploading, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> regarding prescription handling.
        </p>
      </div>
    </div>
  );
}
