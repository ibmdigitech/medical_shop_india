import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ currentPage }) {
  const location = useLocation();

  return (
    <div className="w-full py-4 px-4 bg-transparent absolute top-0 left-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} className="opacity-50" />
        <span className="text-slate-900 dark:text-white">{currentPage}</span>
      </div>
    </div>
  );
}
