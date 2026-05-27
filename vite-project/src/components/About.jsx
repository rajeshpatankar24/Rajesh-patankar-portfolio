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
            <div style={{ position: 'relative', display: 'inline-block' }} className="about-profile-container">
              {/* Pulsing Backing Neon Radial Glow */}
              <div style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '32px',
                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, transparent 70%)',
                animation: 'pulseGlow 4s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 0,
              }} />

              {/* High-tech rotating solid double ring with glowing shadows */}
              <div 
                className="about-profile-ring-1"
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '32px',
                  border: '1.5px solid rgba(96, 165, 250, 0.45)',
                  boxShadow: '0 0 15px rgba(96, 165, 250, 0.35)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }} 
              />
              <div 
                className="about-profile-ring-2"
                style={{
                  position: 'absolute',
                  inset: '-14px',
                  borderRadius: '38px',
                  border: '1px solid rgba(96, 165, 250, 0.25)',
                  boxShadow: '0 0 10px rgba(96, 165, 250, 0.2)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }} 
              />

              {/* Profile image container frame (Modern Squircle shape) */}
              <div style={{
                width: '230px', height: '230px', 
                borderRadius: '28px',
                background: 'rgba(22, 22, 31, 0.65)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '3px solid rgba(96, 165, 250, 0.35)',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', 
                zIndex: 1,
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25), 0 0 20px rgba(96, 165, 250, 0.15)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="about-profile-frame"
              >
                <img
                  src="/rajesh_profile.jpg" alt="Rajesh Patankar"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="about-profile-img"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#60a5fa' }}>RP</span>
                </div>
              </div>

              {/* Exp badge - High Tech matching badge */}
              <div style={{
                position: 'absolute', bottom: '-8px', right: '-18px',
                background: 'rgba(22, 22, 31, 0.9)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(96, 165, 250, 0.4)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 0 0 10px rgba(96, 165, 250, 0.15)',
                borderRadius: '12px', 
                padding: '0.5rem 0.8rem', 
                zIndex: 2,
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60a5fa', textAlign: 'center', lineHeight: 1, marginBottom: '0.1rem' }}>1+</p>
                <p style={{ fontSize: '0.58rem', color: '#cbd5e1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Year Exp.</p>
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
      <style>{`
        .about-profile-ring-1 {
          animation: rotateSlow 20s linear infinite;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .about-profile-ring-2 {
          animation: rotateSlow 35s linear reverse infinite;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        .about-profile-container:hover .about-profile-ring-1 {
          animation-duration: 4s !important;
          border-color: rgba(96, 165, 250, 0.7) !important;
          box-shadow: 0 0 25px rgba(96, 165, 250, 0.5) !important;
        }
        .about-profile-container:hover .about-profile-ring-2 {
          animation-duration: 6s !important;
          border-color: rgba(96, 165, 250, 0.4) !important;
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.3) !important;
        }

        .about-profile-frame:hover {
          border-color: rgba(96, 165, 250, 0.65) !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(96, 165, 250, 0.3) !important;
          transform: translateY(-4px);
        }
        .about-profile-frame:hover .about-profile-img {
          transform: scale(1.06) !important;
        }
      `}</style>
    </section>
  );
}
