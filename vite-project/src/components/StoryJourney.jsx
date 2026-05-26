import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const chapters = [
  {
    id: 1, act: 'Chapter 1', title: 'The Beginning',
    bubble: "It all started with a question — what if I could build anything with just a browser?",
    emoji: '💭', lottie: 'https://assets2.lottiefiles.com/packages/lf20_qqq2s8se.json',
    fallbackEmoji: '🚶', side: 'left',
  },
  {
    id: 2, act: 'Chapter 2', title: 'Hitting the Books',
    bubble: "Enrolled in MCA at RGPV, Bhopal. Spent nights reading docs, building small projects, breaking things.",
    emoji: '📚', lottie: 'https://assets5.lottiefiles.com/packages/lf20_v1yudlcd.json',
    fallbackEmoji: '🎓', side: 'right',
  },
  {
    id: 3, act: 'Chapter 3', title: 'First Line of Code',
    bubble: "Then came React. Then Node. Then MongoDB. The MERN stack clicked — and I never looked back.",
    emoji: '💻', lottie: 'https://assets5.lottiefiles.com/packages/lf20_fcfjwiyb.json',
    fallbackEmoji: '🧑‍💻', side: 'left',
  },
  {
    id: 4, act: 'Chapter 4', title: 'Building Real Things',
    bubble: "3 internships. Real clients. Real deadlines. Built a Tender Management App used in production.",
    emoji: '🏗️', lottie: 'https://assets3.lottiefiles.com/packages/lf20_jvfelqms.json',
    fallbackEmoji: '⚙️', side: 'right',
  },
  {
    id: 5, act: 'Chapter 5', title: 'Recognition',
    bubble: "2025. Cleared TCS NQT. Proof that consistent work beats shortcuts every single time.",
    emoji: '🏆', lottie: 'https://assets4.lottiefiles.com/packages/lf20_ya5ZKFL.json',
    fallbackEmoji: '🏅', side: 'left',
  },
  {
    id: 6, act: 'Chapter 6', title: "What's Next?",
    bubble: "The next chapter is unwritten. I'm looking for a team to build something great together. Is that you?",
    emoji: '🚀', lottie: 'https://assets9.lottiefiles.com/packages/lf20_vf08px5j.json',
    fallbackEmoji: '🌟', side: 'right',
  },
];

function ChapterCard({ chapter, index }) {
  const [lottieError, setLottieError] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = chapter.side === 'left';

  return (
    <div ref={ref} className="chapter-row"
      style={{ display: 'flex', flexDirection: isLeft ? 'row' : 'row-reverse', alignItems: 'center', gap: '2rem', marginBottom: '1rem', position: 'relative' }}>

      {/* Animation box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.1 }}
        style={{
          width: '190px', height: '190px', flexShrink: 0,
          borderRadius: '16px',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {!lottieError ? (
          <Player src={chapter.lottie} autoplay loop
            style={{ width: '170px', height: '170px' }}
            onEvent={(e) => { if (e === 'error') setLottieError(true); }}
          />
        ) : (
          <div style={{ fontSize: '4.5rem', animation: 'float 2.5s ease-in-out infinite' }}>
            {chapter.fallbackEmoji}
          </div>
        )}
        <div style={{
          position: 'absolute', top: '7px', left: '8px',
          fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em',
          color: 'var(--text-accent)', textTransform: 'uppercase',
          background: 'var(--bg-secondary)', padding: '0.18rem 0.45rem',
          borderRadius: '5px', border: '1px solid var(--border)',
        }}>
          {chapter.act}
        </div>
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.2 }}
        style={{ flex: 1, position: 'relative' }}
      >
        {/* Tail */}
        <div style={{
          position: 'absolute', top: '26px',
          [isLeft ? 'left' : 'right']: '-10px',
          width: 0, height: 0,
          borderTop: '9px solid transparent',
          borderBottom: '9px solid transparent',
          [isLeft ? 'borderRight' : 'borderLeft']: '10px solid var(--border)',
        }} />

        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '14px', padding: '1.4rem 1.6rem',
          transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.3rem' }}>{chapter.emoji}</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-accent)', letterSpacing: '-0.01em' }}>
              {chapter.title}
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, fontStyle: 'italic' }}>
            &ldquo;{chapter.bubble}&rdquo;
          </p>
          <div style={{ marginTop: '0.9rem', height: '1px', background: 'var(--border)' }} />
        </div>
      </motion.div>
    </div>
  );
}

export default function StoryJourney() {
  return (
    <section id="story" style={{ background: 'var(--bg-secondary)', padding: '5rem 0 3rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            color: 'var(--text-accent)', padding: '0.32rem 0.9rem',
            borderRadius: '999px', fontSize: '0.76rem', fontWeight: 700,
            letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            🎬 An animated story
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.55rem', color: 'var(--text-primary)' }}>
            The Story So Far
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem', maxWidth: '460px', margin: '0 auto' }}>
            Six chapters. One developer. A journey from curiosity to craft.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '1.1rem' }}>
            {chapters.map((_, i) => (
              <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>
        </motion.div>

        {/* Chapters */}
        <div>
          {chapters.map((chapter, index) => (
            <div key={chapter.id}>
              <ChapterCard chapter={chapter} index={index} />
              {index < chapters.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
                  <div style={{ width: '1px', height: '40px', background: 'var(--border)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '1.4rem 2.2rem',
          }}>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              The best chapters are still ahead. 📖
            </p>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
              Let&apos;s write the next one — together.
            </p>
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .chapter-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
