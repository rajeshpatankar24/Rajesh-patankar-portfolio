import { motion } from 'framer-motion';
import { personalInfo, funFacts } from '../data/portfolioData';
import { FiMapPin, FiMail } from 'react-icons/fi';

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Get to know me
          </p>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem', alignItems: 'center', marginTop: '3rem',
        }}>
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Spinning border ring */}
              <div style={{
                position: 'absolute', inset: '-3px', borderRadius: '50%',
                border: '2px solid var(--accent)',
                animation: 'rotateSlow 12s linear infinite',
                borderStyle: 'dashed',
              }} />
              <div style={{
                width: '230px', height: '230px', borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '3px solid var(--bg-secondary)',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 1,
              }}>
                <img
                  src="/rajesh_profile.jpg" alt="Rajesh Patankar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <span style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-accent)' }}>RP</span>
                  {/* <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Drop photo in /public</span> */}
                </div>
              </div>
              {/* Exp badge */}
              <div style={{
                position: 'absolute', bottom: '8px', right: '-18px',
                background: 'var(--btn-primary-bg)',
                borderRadius: '10px', padding: '0.45rem 0.7rem', zIndex: 2,
                border: '1px solid var(--border-light)',
              }}>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--btn-primary-text)', textAlign: 'center', lineHeight: 1 }}>1+</p>
                <p style={{ fontSize: '0.58rem', color: 'var(--btn-primary-text)', opacity: 0.85, textAlign: 'center' }}>Year Exp.</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="otw-badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
              <span className="otw-dot" />
              Currently Open to Work
            </div>

            <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3, color: 'var(--text-primary)' }}>
              Full-Stack Developer passionate about building real solutions
            </h3>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {personalInfo.bio}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <FiMapPin size={13} color="var(--text-accent)" /> {personalInfo.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <FiMail size={13} color="var(--text-accent)" /> {personalInfo.email}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              {funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    padding: '0.7rem 0.85rem',
                    borderRadius: '8px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    cursor: 'default',
                    transition: 'border-color 0.2s',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={e => { if (e.target) e.target.style && (e.target.style.borderColor = 'var(--accent)'); }}
                >
                  <span style={{ fontSize: '1.15rem' }}>{fact.emoji}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>{fact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
