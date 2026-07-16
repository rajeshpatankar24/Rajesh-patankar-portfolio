import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FiMapPin, 
  FiMail, 
  FiDownload, 
  FiAward, 
  FiCode, 
  FiBookOpen 
} from 'react-icons/fi';
import { personalInfo, skills, education } from '../data/portfolioData';

// Bento Card Wrapper with cursor tracking neon glow
function BentoCard({ children, colSpan = 'col-span-1', delay = 0 }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  // Correct top-level hook declarations to prevent Rules of Hooks errors
  const transX = useTransform(mouseX, (x) => x - 125);
  const transY = useTransform(mouseY, (y) => y - 125);
  const springX = useSpring(transX, { stiffness: 120, damping: 20 });
  const springY = useSpring(transY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bento-card ${colSpan}`}
      style={{
        position: 'relative',
        background: 'rgba(17, 17, 24, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '2rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Dynamic Cursor Spotlight backglow */}
      {hovered && (
        <motion.div
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
            left: springX,
            top: springY,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function BentoHighlights() {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative', background: '#0a0a0f', overflow: 'hidden' }}>
      
      {/* Tech background element */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
        opacity: 0.8,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <div className="section-divider" />
          <h2 className="section-title">Overview & Skills</h2>
          <p className="section-subtitle">Bio profile & technical capabilities arranged in a bento block</p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* Card 1: Bio Profile */}
          <BentoCard colSpan="col-span-2" delay={0.05}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa' }}>
                <FiMapPin size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Based in {personalInfo.location}
                </span>
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                About Me
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {personalInfo.bio}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a href={`mailto:${personalInfo.email}`} className="btn-accent" style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                Email Me <FiMail size={14} />
              </a>
              <a href={personalInfo.resumeUrl} download className="btn-outline" style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                Resume <FiDownload size={14} />
              </a>
            </div>
          </BentoCard>

          {/* Card 2: Key Achievement / Certification */}
          <BentoCard colSpan="col-span-1" delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fb7185', marginBottom: '0.8rem' }}>
                  <FiAward size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Certification
                  </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  TCS NQT 2025
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  Successfully qualified the National Qualifier Test (TCS NQT 2025) assessing advanced technical knowledge and programming aptitude.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251, 113, 133, 0.08)', border: '1px solid rgba(251, 113, 133, 0.2)', padding: '0.65rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                <div className="live-dot" style={{ backgroundColor: '#fb7185', boxShadow: '0 0 10px #fb7185' }} />
                <span style={{ fontSize: '0.78rem', color: '#fb7185', fontWeight: 700, textTransform: 'uppercase' }}>
                  Verified Qualifier
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Categorized Skills Matrix */}
          <BentoCard colSpan="col-span-3" delay={0.25}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa', marginBottom: '1.5rem' }}>
                <FiCode size={18} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Technical Capabilities
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', width: '100%' }}>
                {Object.entries(skills).map(([category, items]) => (
                  <div 
                    key={category} 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid rgba(255, 255, 255, 0.04)', 
                      borderRadius: '12px', 
                      padding: '1.2rem' 
                    }}
                  >
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', marginBottom: '0.85rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {category}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {items.map(skill => (
                        <div key={skill.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{skill.name}</span>
                            <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700 }}>{skill.level}%</span>
                          </div>
                          <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.0, ease: 'easeOut' }}
                              style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '2px' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

        </div>
      </div>

      <style>{`
        /* Bento CSS Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        .col-span-1 { grid-column: span 1; }
        .col-span-2 { grid-column: span 2; }
        .col-span-3 { grid-column: span 3; }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
          animation: bentoPulse 1.8s infinite;
        }

        @keyframes bentoPulse {
          0% { transform: scale(0.95); opacity: 1; }
          70% { transform: scale(1.4); opacity: 0.2; }
          100% { transform: scale(0.95); opacity: 0; }
        }

        @media (max-width: 992px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .col-span-2, .col-span-3 {
            grid-column: span 2;
          }
        }

        @media (max-width: 640px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .col-span-1, .col-span-2, .col-span-3 {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
}
