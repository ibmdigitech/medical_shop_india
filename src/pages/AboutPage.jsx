import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import TeamCard from '../components/TeamCard';
import CTASection from '../components/CTASection';
import { team } from '../data/team';
import { Target, Eye, Rocket } from 'lucide-react';

const timeline = [
  { year: '2016', title: 'Company Founded', desc: 'IBM DigiTech established in Dubai with a vision to transform UAE businesses through technology.' },
  { year: '2018', title: 'First Major ERP', desc: 'Delivered our first enterprise ERP to a 500-employee manufacturing company in Abu Dhabi.' },
  { year: '2020', title: 'AI & Cloud Expansion', desc: 'Launched dedicated AI and Cloud practices to meet growing enterprise demand.' },
  { year: '2022', title: 'HRMS Excellence', desc: 'Released our award-winning UAE-compliant HRMS platform serving 10,000+ employees.' },
  { year: '2024', title: '250+ Projects', desc: 'Crossed the milestone of 250 successful project deliveries across the GCC region.' },
];

const techStack = [
  'React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'React Native',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'PostgreSQL',
  'MongoDB', 'Redis', 'TensorFlow', 'OpenAI', 'Figma', 'TypeScript',
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - IBM DigiTech UAE</title>
        <meta name="description" content="Learn about IBM DigiTech, UAE's premier IT solutions company. Discover our story, mission, vision, and the expert team behind our success." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 bg-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-semibold mb-6 tracking-widest uppercase">About Us</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white mb-4">
            Powering UAE's <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Digital Future</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            Since 2016, IBM DigiTech has been at the forefront of digital transformation, helping UAE enterprises build smarter, faster, and more resilient technology solutions.
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-dark-card">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: 'Our Vision', color: 'from-primary to-cyan-500', desc: 'To be the most trusted technology partner for enterprises across the UAE and GCC, recognized for innovation, reliability, and transformative impact.' },
            { icon: Target, title: 'Our Mission', color: 'from-secondary to-pink-500', desc: 'To deliver exceptional IT solutions that solve real business challenges — combining cutting-edge technology with deep industry expertise.' },
            { icon: Rocket, title: 'Our Values', color: 'from-accent to-blue-500', desc: 'Integrity, Excellence, Innovation, and Customer-First. We build long-term partnerships built on trust, transparency, and measurable results.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-dark border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-all">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                <item.icon size={26} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Journey</span></h2>
            <p className="text-gray-400">8 years of innovation, growth, and client success.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />
            {timeline.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-center gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-dark-card border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-all">
                    <span className="text-primary-light text-xs font-bold tracking-widest">{item.year}</span>
                    <h3 className="text-white font-semibold mt-1 mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center shrink-0 z-10 font-bold text-white text-xs">
                  {i + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-dark-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Technology Stack</h2>
          <p className="text-gray-400 text-sm mb-8">We work with the world's best tools and frameworks.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span key={tech} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="px-4 py-2 bg-dark border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:border-primary/40 hover:text-white hover:bg-primary/10 transition-all duration-200 cursor-default">
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Meet the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light">Leadership Team</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
