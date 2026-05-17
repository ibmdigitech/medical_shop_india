import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated Authentication - In production, connect this to your JWT/REST API
    setTimeout(() => {
      if (email === 'admin@amstermedcare.com' && password === 'admin123') {
        // Save dummy token
        localStorage.setItem('adminToken', 'simulated_jwt_token_123');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. For demo use: admin@amstermedcare.com / admin123');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-dark-card rounded-[40px] shadow-2xl border border-slate-100 dark:border-white/5 relative z-10 overflow-hidden"
      >
        <div className="p-10 text-center border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <img src={logo} alt="Amster Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Admin Access</h1>
          <p className="text-slate-500 dark:text-gray-400 font-bold text-sm">Enterprise Management System</p>
        </div>

        <div className="p-10">
          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl text-sm font-bold flex items-center gap-3">
              <ShieldCheck size={18} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@amstermedcare.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-bold transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-bold transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? 'Authenticating...' : 'Secure Login'} 
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
