import { motion } from 'framer-motion';
import { experiences } from '../data/portfolioData';
import { FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Work history
          </p>
          <h2 className="section-title">My Experience</h2>
          <div className="section-divider" />
          <p className="section-subtitle">{experiences.length} internships that shaped my engineering mindset</p>
        </motion.div>

        {/* Desktop alternating timeline */}
        <div className="timeline-desktop" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', paddingBottom: '2rem' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', background: 'var(--border)', transform: 'translateX(-50%)',
          }} />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ display: 'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', marginBottom: '2.5rem', position: 'relative' }}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '50%', top: '1.6rem',
                  transform: 'translateX(-50%)',
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: 'var(--accent)', border: '2px solid var(--bg-primary)', zIndex: 1,
                }} />

                {/* Card */}
                <div style={{
                  width: 'calc(50% - 2.5rem)',
                  padding: '1.35rem', borderRadius: '10px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    display: 'inline-block', background: 'var(--btn-primary-bg)',
                    color: 'var(--btn-primary-text)', padding: '0.18rem 0.6rem',
                    borderRadius: '5px', fontSize: '0.68rem', fontWeight: 700,
                    letterSpacing: '0.04em', marginBottom: '0.55rem',
                    border: '1px solid var(--border-light)',
                  }}>
                    {exp.company}
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{exp.role}</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                      <FiCalendar size={11} /> {exp.duration}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.76rem' }}>
                      <FiMapPin size={11} /> {exp.location}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {exp.points.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        <FiCheckCircle size={12} style={{ color: 'var(--text-accent)', flexShrink: 0, marginTop: '2px' }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile single column */}
        <div className="timeline-mobile" style={{ display: 'none', flexDirection: 'column', gap: '1rem', position: 'relative', maxWidth: '600px', margin: '0 auto', paddingLeft: '1.75rem' }}>
          <div style={{ position: 'absolute', left: '0.5rem', top: 0, bottom: 0, width: '1px', background: 'var(--border)' }} />
          {experiences.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', left: '-1.42rem', top: '1.1rem', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg-primary)' }} />
              <div style={{ padding: '1.1rem', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'inline-block', background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)', padding: '0.15rem 0.55rem', borderRadius: '5px', fontSize: '0.66rem', fontWeight: 700, marginBottom: '0.45rem', border: '1px solid var(--border-light)' }}>{exp.company}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{exp.role}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.73rem', marginBottom: '0.7rem' }}>{exp.duration} · {exp.location}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <FiCheckCircle size={11} style={{ color: 'var(--text-accent)', flexShrink: 0, marginTop: '2px' }} /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .timeline-desktop { display: none !important; }
          .timeline-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
