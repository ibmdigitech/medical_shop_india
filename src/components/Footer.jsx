import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import logo from '../assets/logo.png';

const footerLinks = {
  about: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Franchise', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'Store Locator', path: '/stores' },
  ],
  services: [
    { name: 'Order Medicines', path: '/medicines' },
    { name: 'Lab Tests', path: '/lab-tests' },
    { name: 'Wellness', path: '/wellness' },
    { name: 'Compare Medicines', path: '/compare-medicines' },
    { name: 'Upload Prescription', path: '/upload-prescription' },
  ],
  policies: [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Return & Refund', path: '#' },
    { name: 'Shipping Policy', path: '#' },
    { name: 'Payment Terms', path: '#' },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 pt-20 pb-10 border-t border-slate-100 dark:border-slate-800" itemScope itemType="https://schema.org/Pharmacy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner - Free Delivery */}
        <div className="bg-gradient-to-r from-primary via-primary-dark to-secondary rounded-2xl p-6 mb-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-16 -mr-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -mb-12 -ml-12" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-2">🚚 FREE Home Delivery on All Orders!</h3>
              <p className="text-white/90 font-medium">Order medicines online and get them delivered to your doorstep across Kerala - Same day delivery if ordered before 6 PM</p>
            </div>
            <Link
              to="/medicines"
              className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
            >
              Order Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand Column */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img src={logo} alt="Amster Med Care Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">AMSTER</span>
                <span className="text-sm font-bold text-primary tracking-wider uppercase">MED CARE</span>
              </div>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Amster Med Care is your trusted pharmacy in Omassery, Kerala. We deliver quality medicines, wellness products & healthcare essentials with free home delivery.
            </p>
            <div className="flex items-center gap-3">
              <a href="tel:+919037507643" className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
                <Phone size={16} />
                Call: +91 90375 07643
              </a>
              <a href="https://wa.me/919037507643" className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold font-heading mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-primary-light transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold font-heading mb-5 text-lg">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-500 dark:text-slate-400 hover:text-secondary transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-secondary-light transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-bold font-heading mb-5 text-lg">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm" itemProp="address">
                    Shop No. 13, Opposite Federal Bank,<br />
                    Near Metro Park, Omassery, Kerala 673582
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <a href="tel:+919037507643" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm font-medium" itemProp="telephone">
                    +91 90375 07643
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <a href="mailto:info@amstermedcare.com" className="text-gray-600 dark:text-gray-400 hover:text-primary text-sm" itemProp="email">
                  info@amstermedcare.com
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
              <h4 className="font-bold font-heading text-slate-900 text-sm mb-2">Working Hours</h4>
              <p className="text-slate-600 text-xs font-medium">Mon - Sun: 8:00 AM - 10:00 PM</p>
              <p className="text-primary text-xs font-bold mt-1">✓ 24/7 WhatsApp Support</p>
            </div>
          </div>
        </div>

        {/* Delivery Cities */}
        <div className="py-8 border-t border-b border-slate-100 dark:border-slate-800 mb-8">
          <h4 className="text-center font-heading text-slate-500 dark:text-slate-400 text-sm font-semibold mb-4">We Deliver To</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['Omassery', 'Kozhikode', 'Malappuram', 'Kannur', 'Wayanad', 'Thrissur', 'Palakkad', 'Ernakulam', 'Kottayam', 'All Kerala'].map(city => (
              <span key={city} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors cursor-default">
                {city}
              </span>
            ))}
          </div>
        </div>

        {/* Policies & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.policies.map((link) => (
              <Link key={link.name} to={link.path} className="text-slate-500 dark:text-slate-400 hover:text-primary text-xs transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              © {new Date().getFullYear()} Amster Med Care. All Rights Reserved.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">
              Trusted pharmacy serving Omassery & all across Kerala with free home delivery.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
