import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      className={`relative flex items-center w-[72px] h-10 p-1 rounded-full transition-colors duration-500 shadow-inner ${
        isDark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-200 border border-slate-300'
      }`}
      aria-label="Toggle Dark Mode"
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <Moon size={14} className={`transition-opacity ${isDark ? 'text-white opacity-100' : 'opacity-0'}`} />
        <Sun size={14} className={`transition-opacity ${!isDark ? 'text-amber-500 opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Sliding Knob */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`w-8 h-8 flex items-center justify-center rounded-full shadow-md z-10 ${
          isDark ? 'bg-slate-900 ml-auto' : 'bg-white mr-auto'
        }`}
      >
        {isDark ? (
          <Moon size={16} className="text-white" />
        ) : (
          <Sun size={16} className="text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
