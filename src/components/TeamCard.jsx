import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-dark-card border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="relative inline-block mb-4">
        <div className="w-20 h-20 rounded-2xl bg-dark-border overflow-hidden mx-auto ring-2 ring-white/10 group-hover:ring-primary/40 transition-all">
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <h3 className="text-white font-bold text-base mb-0.5">{member.name}</h3>
      <p className="text-primary-light text-xs font-semibold mb-2">{member.role}</p>
      <p className="text-gray-500 text-xs leading-relaxed mb-4">{member.bio}</p>
      <a href={member.linkedin} className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-light transition-colors">
        <ExternalLink size={14} /> Connect
      </a>
    </motion.div>
  );
}
