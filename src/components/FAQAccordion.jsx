import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`bg-dark-card border rounded-xl overflow-hidden transition-colors duration-300 ${
            openId === faq.id ? 'border-primary/40' : 'border-white/10'
          }`}
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <span className={`font-semibold text-sm transition-colors duration-200 ${openId === faq.id ? 'text-primary-light' : 'text-white'}`}>
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openId === faq.id ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`shrink-0 ml-4 ${openId === faq.id ? 'text-primary' : 'text-gray-500'}`}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="text-gray-400 text-sm leading-relaxed px-6 pb-4">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
