import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { FiArrowDown, FiArrowRight, FiDownload } from 'react-icons/fi';
import { personalInfo, roles } from '../data/portfolioData';

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 8 + 6,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          width: p.size, height: p.size,
          left: `${p.left}%`, top: `${p.top}%`,
          animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
        }} />
      ))}
    </div>
  );
}

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

function HeroCharacter() {
  const [lottieError, setLottieError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{
        width: '340px', height: '340px', borderRadius: '50%',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {!lottieError ? (
          <Player
            src="https://assets5.lottiefiles.com/packages/lf20_fcfjwiyb.json"
            autoplay loop
            style={{ width: '300px', height: '300px' }}
            onEvent={(e) => { if (e === 'error') setLottieError(true); }}
          />
        ) : (
          <div style={{ fontSize: '7rem', animation: 'float 3s ease-in-out infinite' }}>🧑‍💻</div>
        )}
      </div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
        style={{
          position: 'absolute', top: '8%', right: '-8px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px 10px 10px 3px',
          padding: '0.5rem 0.85rem',
          fontSize: '0.75rem', fontWeight: 600,
          color: 'var(--text-accent)',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px var(--shadow)',
        }}
      >
        💡 Currently building...
      </motion.div>

      {/* Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '8%', left: '-8px',
          background: 'var(--bg-card)',
          border: '1px solid var(--text-status)',
          borderRadius: '10px',
          padding: '0.45rem 0.85rem',
          fontSize: '0.73rem', fontWeight: 600,
          color: 'var(--text-status)',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          boxShadow: '0 4px 16px var(--shadow)',
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-status)', animation: 'pulseDot 1.5s infinite' }} />
        Open to work
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const typedText = useTypewriter(roles);
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }),
  };

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg-primary)',
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none', opacity: 0.6,
      }} />
      <Particles />

      <div className="container" style={{
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '3rem', alignItems: 'center',
        padding: '7rem 1.5rem 4rem',
      }}>
        {/* LEFT */}
        <div>
          {/* <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} style={{ marginBottom: '1.25rem' }}>
            <span className="otw-badge"><span className="otw-dot" /> Available for opportunities</span>
          </motion.div> */}

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            style={{ color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.9rem', color: 'var(--text-primary)' }}>
            {personalInfo.name}
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
            style={{ marginBottom: '1.25rem', minHeight: '2rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontWeight: 600, color: 'var(--text-secondary)' }}>
              I&apos;m a{' '}
              <span style={{
                color: 'var(--text-accent)', fontWeight: 700,
                borderRight: '2.5px solid var(--text-accent)',
                paddingRight: '3px',
                animation: 'typewriterCursor 0.8s step-end infinite',
              }}>
                {typedText}
              </span>
            </span>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
            style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '2rem', lineHeight: 1.75 }}>
            {personalInfo.tagline}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.75}
            style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button className="btn-accent"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: '0.9rem', padding: '0.8rem 1.75rem' }}>
              View My Work <FiArrowRight size={15} />
            </button>
            <a href={personalInfo.resumeUrl} download className="btn-outline"
              style={{ fontSize: '0.9rem', padding: '0.8rem 1.75rem' }}>
              <FiDownload size={15} /> Download Resume
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.9}
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'].map(t => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HeroCharacter />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer',
        }}
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ animation: 'scrollBounce 1.5s ease-in-out infinite' }}>
          <FiArrowDown size={17} color="var(--text-accent)" />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #hero .container { grid-template-columns: 1fr !important; text-align: center; }
          #hero .container > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
