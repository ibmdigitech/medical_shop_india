import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = LucideIcons[service.icon] || LucideIcons.Code2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group bg-dark-card border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className="text-white" />
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-light transition-colors">{service.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>

      <ul className="space-y-1 mb-5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
            {f}
          </li>
        ))}
      </ul>

      <Link
        to="/services"
        className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent hover:gap-3 transition-all duration-200`}
      >
        Learn More <LucideIcons.ArrowRight size={14} className={`text-current`} />
      </Link>
    </motion.div>
  );
}
