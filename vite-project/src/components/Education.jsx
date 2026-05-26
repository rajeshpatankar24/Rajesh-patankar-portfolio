import { motion } from 'framer-motion';
import { education, achievements } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Academic background
          </p>
          <h2 className="section-title">Education & Achievements</h2>
          <div className="section-divider" />
          <p className="section-subtitle">The foundation that supports my technical practice</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem', maxWidth: '880px', margin: '0 auto' }}>
          {education.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                borderRadius: '10px', padding: '1.4rem',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease',
              }}
              whileHover={{ y: -3, borderColor: 'var(--accent)' }}
            >
              {/* Left accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'var(--accent)', borderRadius: '10px 0 0 10px' }} />
              <div style={{ marginLeft: '0.6rem' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.65rem' }}>{edu.icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: 1.3 }}>{edu.degree}</h3>
                <p style={{ color: 'var(--text-accent)', fontSize: '0.83rem', fontWeight: 600, marginBottom: '0.55rem' }}>{edu.institution}</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.18rem 0.55rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 500 }}>
                    📅 {edu.year}
                  </span>
                  <span style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.18rem 0.55rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 500 }}>
                    ✓ {edu.grade}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {achievements.map((ach, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (education.length + i) * 0.1 }}
              style={{
                borderRadius: '10px', padding: '1.4rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--accent)',
                position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease',
              }}
              whileHover={{ y: -3 }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.65rem' }}>🏆</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{ach.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.65, marginBottom: '0.7rem' }}>{ach.description}</p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
                padding: '0.28rem 0.7rem', borderRadius: '6px',
                fontSize: '0.73rem', fontWeight: 700,
                border: '1px solid var(--border-light)',
              }}>
                {ach.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
