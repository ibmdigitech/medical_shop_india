import { Link } from 'react-router-dom';
import { 
  Zap, Mail, Phone, MapPin, Globe, Share2, 
  MessageCircle, Video, Users, ExternalLink,
  ShieldCheck, ArrowRight, Send
} from 'lucide-react';

const footerLinks = {
  about: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Blog', path: '/blog' },
    { name: 'Store Locator', path: '/stores' },
  ],
  services: [
    { name: 'Order Medicines', path: '/medicines' },
    { name: 'Lab Tests', path: '/lab-tests' },
    { name: 'Ayurvedic', path: '/ayurvedic-products' },
    { name: 'Compare Medicines', path: '/compare-medicines' },
    { name: 'Upload Prescription', path: '/upload-prescription' },
  ],
  policies: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Return & Refund', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Admin Portal', path: '/admin/login' },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-32 pb-12 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 rounded-3xl overflow-hidden bg-white flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500 p-1">
                <img src="/logo.png" alt="Amster Med Care" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-3xl font-black text-white tracking-tighter">AMSTER</span>
                <span className="text-xs font-black text-primary tracking-[0.3em] uppercase">Med Care</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Your premier healthcare partner in Omassery. Delivering trust, health, and happiness to every home in Kerala.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
               <Link to="/about" className="text-xs font-black text-white hover:text-primary transition-all uppercase tracking-widest">About Us</Link>
               <span className="text-white/20">•</span>
               <Link to="/contact" className="text-xs font-black text-white hover:text-primary transition-all uppercase tracking-widest">Contact</Link>
               <span className="text-white/20">•</span>
               <Link to="/stores" className="text-xs font-black text-white hover:text-primary transition-all uppercase tracking-widest">Locations</Link>
            </div>
            <div className="flex items-center gap-4">
              {[Globe, MessageCircle, Send, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-black text-xs tracking-[0.3em] uppercase mb-10">Quick Access</h4>
            <ul className="space-y-5">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-all text-sm font-bold flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary group-hover:scale-150 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs tracking-[0.3em] uppercase mb-10">Our Services</h4>
            <ul className="space-y-5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-all text-sm font-bold flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover:bg-secondary group-hover:scale-150 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-black text-xs tracking-[0.3em] uppercase mb-10">Get In Touch</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                  <MapPin size={20} />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Opposite Federal Bank,<br />Omassery, Kerala 673582
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 text-secondary">
                  <Phone size={20} />
                </div>
                <a href="tel:+919037507643" className="text-slate-200 hover:text-primary font-black transition-all">
                  +91 90375 07643
                </a>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                 <p className="text-white font-black text-xs uppercase tracking-widest mb-2">Support Hours</p>
                 <p className="text-slate-400 text-xs">Mon - Sun: 8:00 AM - 10:00 PM</p>
                 <div className="mt-4 flex items-center gap-2 text-primary-light text-xs font-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    24/7 WhatsApp Open
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} AMSTER MED CARE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            {footerLinks.policies.map((link) => (
              <Link key={link.name} to={link.path} className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
