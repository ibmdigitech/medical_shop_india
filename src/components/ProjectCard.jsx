import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group bg-dark-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />
        {/* Category Badge */}
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-primary/80 backdrop-blur text-white text-xs font-semibold rounded-lg">
          {project.category}
        </span>
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-primary/20 flex items-center justify-center"
        >
          <a
            href={project.link}
            className="flex items-center gap-2 bg-white text-dark font-semibold text-sm px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors"
          >
            View Project <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary-light transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
