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
      style={{
        padding: '1rem', borderRadius: '10px',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        transition: 'all 0.2s ease', cursor: 'default',
      }}
      whileHover={{ y: -2, borderColor: 'var(--accent)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '7px',
          background: 'var(--bg-secondary)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <img src={skill.icon} alt={skill.name} width={20} height={20}
            style={{ objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{skill.name}</span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 600,
              padding: '0.15rem 0.45rem', borderRadius: '5px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}>
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
      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.3rem' }}>{skill.level}%</p>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <section id="skills" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            What I work with
          </p>
          <h2 className="section-title">Tech Stack</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Categorized skills with proficiency levels</p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '7px',
                border: activeTab === cat ? '1px solid var(--btn-primary-bg)' : '1px solid var(--border)',
                background: activeTab === cat ? 'var(--btn-primary-bg)' : 'transparent',
                color: activeTab === cat ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.83rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s ease',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.9rem' }}>
            {skills[activeTab].map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All icons strip */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            All technologies
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {Object.values(skills).flat().map((skill, i) => (
              <div key={`${skill.name}-${i}`} title={skill.name}
                style={{
                  width: '40px', height: '40px', borderRadius: '8px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease', cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <img src={skill.icon} alt={skill.name} width={22} height={22}
                  style={{ objectFit: 'contain' }}
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
