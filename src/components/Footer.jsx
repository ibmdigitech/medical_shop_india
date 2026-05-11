import { Link } from 'react-router-dom';
import { 
  Zap, Mail, Phone, MapPin, Globe, Share2, 
  MessageCircle, Video, Users, ExternalLink 
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
    { name: 'Wellness', path: '/wellness' },
    { name: 'Compare Medicines', path: '/compare' },
    { name: 'Upload Prescription', path: '/upload-prescription' },
  ],
  policies: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Return & Refund', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping' },
    { name: 'Payment Terms', path: '/payments' },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-dark pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Zap size={22} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-white tracking-tight">IBM</span>
                <span className="text-xs font-semibold text-primary-light tracking-widest uppercase">DigiTech</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Medical Shope India is your trusted partner for affordable, high-quality generic medicines and reliable lab tests across India and the UAE.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, Share2, MessageCircle, Video, Users].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-primary-light transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Our Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-primary-light transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/30 group-hover:bg-secondary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-primary-light" />
                </div>
                <p className="text-gray-400 text-sm">
                  123 Business Bay, Dubai, UAE <br />
                  Ahmedabad, Gujarat, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-primary-light" />
                </div>
                <p className="text-gray-400 text-sm">+91 78618 04725</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary-light" />
                </div>
                <p className="text-gray-400 text-sm">info@ibmdigitech.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Policies & Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.policies.map((link) => (
              <Link key={link.name} to={link.path} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-gray-600 text-xs text-center md:text-right">
            © {new Date().getFullYear()} Medical Shope India (IBM DigiTech). All Rights Reserved. <br className="md:hidden" />
            <span className="hidden md:inline mx-2">|</span> 
            Crafted for UAE & GCC Markets.
          </p>
        </div>
      </div>
    </footer>
  );
}
