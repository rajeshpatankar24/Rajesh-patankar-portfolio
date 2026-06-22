import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const chapters = [
  {
    id: 1, act: 'Chapter 1', title: 'The Beginning',
    bubble: "It all started with a question — what if I could build anything with just a browser?",
    emoji: '💭', side: 'left',
  },
  {
    id: 2, act: 'Chapter 2', title: 'Hitting the Books',
    bubble: "Enrolled in MCA at RGPV, Bhopal. Spent nights reading docs, building small projects, breaking things.",
    emoji: '📚', side: 'right',
  },
  {
    id: 3, act: 'Chapter 3', title: 'First Line of Code',
    bubble: "Then came React. Then Node. Then MongoDB. The MERN stack clicked — and I never looked back.",
    emoji: '💻', side: 'left',
  },
  {
    id: 4, act: 'Chapter 4', title: 'Building Real Things',
    bubble: "2 internships. Real clients. Real deadlines. Built a Tender Management App used in production.",
    emoji: '🏗️', side: 'right',
  },
  {
    id: 5, act: 'Chapter 5', title: 'Recognition',
    bubble: "2025. Cleared TCS NQT. Proof that consistent work beats shortcuts every single time.",
    emoji: '🏆', side: 'left',
  },
  {
    id: 6, act: 'Chapter 6', title: "What's Next?",
    bubble: "The next chapter is unwritten. I'm looking for a team to build something great together. Is that you?",
    emoji: '🚀', side: 'right',
  },
];

function ChapterCard({ chapter, index }) {
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

  const renderCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="timeline-card-wrapper"
    >
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '14px', padding: '1.4rem 1.6rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        position: 'relative',
      }}
        className="timeline-card"
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--text-accent)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(96, 165, 250, 0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-accent)', textTransform: 'uppercase', background: 'var(--bg-secondary)', padding: '0.15rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
            {chapter.act}
          </span>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {chapter.title}
          </h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, fontStyle: 'italic' }}>
          &ldquo;{chapter.bubble}&rdquo;
        </p>
      </div>
    </motion.div>
  );

  return (
    <div ref={ref} className="chapter-row" style={{ position: 'relative', marginBottom: '2rem' }}>
      {/* Central timeline aesthetic dot */}
      <div className="timeline-dot" style={{
        position: 'absolute', left: '50%', top: '24px', transform: 'translate(-50%, -50%)',
        width: '10px', height: '10px', borderRadius: '50%',
        background: 'var(--accent)', border: '2px solid var(--bg-primary)',
        boxShadow: '0 0 8px rgba(96, 165, 250, 0.4)',
        zIndex: 10,
      }} />

      {/* Grid container with 2 columns */}
      <div className="timeline-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '4.5rem', width: '100%',
      }}>
        {/* Left Side */}
        <div style={{ textAlign: 'right' }}>
          {isLeft && renderCard()}
        </div>

        {/* Right Side */}
        <div style={{ textAlign: 'left' }}>
          {!isLeft && renderCard()}
        </div>
      </div>
    </div>
  );
}

export default function StoryJourney() {
  return (
    <section id="story" style={{ background: 'var(--bg-secondary)', padding: '5rem 0 3rem' }}>
      <div className="container" style={{ maxWidth: '850px' }}>

        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
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

        {/* Timeline wrapper containing vertical line */}
        <div style={{ position: 'relative', padding: '1rem 0' }} className="timeline-wrapper">
          {/* Central Vertical Line */}
          <div className="timeline-line" style={{
            position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '2px', background: 'var(--border)', zIndex: 1,
          }} />

          {/* Chapters */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '1.4rem 2.2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
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
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-dot {
            left: 20px !important;
            transform: translate(-50%, -50%) !important;
          }
          .timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            padding-left: 3rem !important;
          }
          .timeline-grid > div {
            text-align: left !important;
          }
          .timeline-grid > div:empty {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
