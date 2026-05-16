import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageCircle } from 'lucide-react';

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-32">
        <Outlet />
      </main>
      <Footer />

      {/* WhatsApp Floating Button (global) */}
      <a
        href="https://wa.me/919037507643"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp for medicine orders"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all duration-300 hover:bg-green-600 group"
      >
        <MessageCircle size={30} className="text-white" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg pointer-events-none">
          Order via WhatsApp
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45"></span>
        </span>
      </a>
    </div>
  );
}
