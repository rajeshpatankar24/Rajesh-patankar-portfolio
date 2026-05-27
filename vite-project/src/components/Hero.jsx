import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiDownload } from 'react-icons/fi';
import { personalInfo, roles } from '../data/portfolioData';


function useTypewriter(words, speed = 80, pause = 2200) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) { const t = setTimeout(() => setWaiting(false), pause); return () => clearTimeout(t); }
    const current = words[wordIdx % words.length];
    if (!deleting && charIdx <= current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
        if (charIdx === current.length) { setWaiting(true); setDeleting(true); }
      }, speed);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); }
  }, [charIdx, deleting, waiting, wordIdx, words, speed, pause]);
  return displayed;
}

export default function Hero() {
  const typedText = useTypewriter(roles);
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }),
  };

  return (
    <section id="hero" className="hero-section" style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      position: 'relative', 
      overflow: 'hidden',
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none', 
        opacity: 0.25,
      }} />


      <div className="container hero-container" style={{
        position: 'relative', zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: '8rem 1.5rem 4rem',
      }}>
        <div style={{
          maxWidth: '720px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
            style={{ 
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', 
              fontWeight: 800, 
              letterSpacing: '-0.03em', 
              lineHeight: 1.05, 
              marginBottom: '0.9rem', 
              color: '#ffffff',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
            }}>
            {personalInfo.name}
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
            className="hero-role"
            style={{ marginBottom: '1.25rem', minHeight: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.45rem)', fontWeight: 600, color: '#cbd5e1', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              I&apos;m a{' '}
              <span style={{
                color: '#60a5fa', fontWeight: 700,
                borderRight: '2.5px solid #60a5fa',
                paddingRight: '3px',
                animation: 'typewriterCursor 0.8s step-end infinite',
              }}>
                {typedText}
              </span>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
            style={{ 
              fontSize: '1.05rem', 
              color: '#cbd5e1', 
              maxWidth: '560px', 
              marginBottom: '2.25rem', 
              lineHeight: 1.8,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)'
            }}>
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.75}
            className="hero-btns"
            style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2.25rem', justifyContent: 'center' }}>
            <button className="btn-cyan"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ 
                fontSize: '0.9rem', 
                padding: '0.8rem 1.75rem',
                backgroundColor: '#60a5fa',
                color: '#0a0a0f',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
              View My Work <FiArrowRight size={15} />
            </button>
            <a href={personalInfo.resumeUrl} download className="btn-outline-white"
              style={{ 
                fontSize: '0.9rem', 
                padding: '0.8rem 1.75rem', 
                border: '1.5px solid #ffffff', 
                color: '#ffffff',
                background: 'transparent',
                borderRadius: '8px',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
              <FiDownload size={15} /> Download Resume
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.9}
            className="hero-tech"
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'].map(t => (
              <span key={t} className="tech-badge" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff' }}>{t}</span>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontSize: '0.68rem', color: '#cbd5e1', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
        <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
          <FiArrowDown size={17} color="#60a5fa" />
        </div>
      </motion.div>

      <style>{`
        .hero-section {
          background-image: linear-gradient(rgba(10, 10, 15, 0.55), rgba(10, 10, 15, 0.55)), linear-gradient(to bottom, transparent 80%, var(--bg-primary) 100%), url("/pexels-steve-29708304.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .btn-cyan:hover {
          background-color: #3b82f6 !important;
          transform: translateY(-2px);
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
        }
        
        .btn-outline-white:hover {
          background-color: #ffffff !important;
          color: #0a0a0f !important;
          transform: translateY(-2px);
        }

        @keyframes typewriterCursor {
          0%, 50% { border-color: #60a5fa; }
          51%, 100% { border-color: transparent; }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: auto !important;
          }
          .hero-container {
            padding: 6.5rem 1.5rem 3rem !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
