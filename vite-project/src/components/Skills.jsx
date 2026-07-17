import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolioData';

const categories = Object.keys(skills);

function SkillCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] transition-all duration-200 cursor-default hover:border-[var(--accent)] hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[34px] h-[34px] rounded-[7px] bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center shrink-0">
          <img src={skill.icon} alt={skill.name} width={20} height={20}
            className="object-contain"
            onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[0.88rem] text-[var(--text-primary)]">{skill.name}</span>
            <span className="text-[0.65rem] font-bold py-0.5 px-2 rounded-[5px] bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]">
              {skill.label}
            </span>
          </div>
        </div>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: index * 0.06 + 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="text-[0.68rem] text-[var(--text-muted)] text-right mt-1">{skill.level}%</p>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="skills" className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-center text-[var(--text-accent)] font-semibold text-[0.82rem] tracking-widest uppercase mb-2">
            What I work with
          </p>
          <h2 className="section-title">Tech Stack</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Categorized skills with proficiency levels</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`py-2 px-4.5 rounded-lg border font-semibold text-[0.83rem] cursor-pointer font-sans transition-all duration-200 ${
                activeTab === cat
                  ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                  : 'border-[var(--border)] bg-transparent text-[var(--text-secondary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5"
          >
            {skills[activeTab].map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All icons strip */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-muted)] text-[0.75rem] mb-4.5 tracking-wider uppercase">
            All technologies
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.values(skills).flat().map((skill, i) => (
              <div key={`${skill.name}-${i}`} title={skill.name}
                className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center transition-all duration-200 cursor-default hover:border-[var(--accent)] hover:-translate-y-0.75"
              >
                <img src={skill.icon} alt={skill.name} width={22} height={22}
                  className="object-contain"
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
