import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-dark-card border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" className="text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full bg-dark-border"
        />
        <div>
          <p className="text-white text-sm font-semibold">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.role} · {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}
