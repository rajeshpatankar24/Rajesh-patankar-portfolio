import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolioData';
import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            What they say
          </p>
          <h2 className="section-title">Testimonials</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Kind words from my internship supervisors</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '780px', margin: '0 auto' }}>
          {testimonials.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ borderRadius: '12px', padding: '1.65rem', background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all 0.2s ease', position: 'relative' }}
              whileHover={{ y: -3, borderColor: 'var(--accent)' }}
            >
              {/* Large quote mark */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1.25rem',
                fontSize: '4rem', lineHeight: 1,
                color: 'var(--border)', fontFamily: 'Georgia, serif', pointerEvents: 'none',
              }}>&ldquo;</div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.9rem' }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <FiStar key={j} size={13} fill="var(--text-accent)" color="var(--text-accent)" />
                ))}
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.4rem', position: 'relative' }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'var(--btn-primary-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 700, color: 'var(--btn-primary-text)', flexShrink: 0,
                  border: '1px solid var(--border-light)',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1.75rem' }}>
          * Placeholders — update in{' '}
          <code style={{ color: 'var(--text-accent)', background: 'var(--bg-card)', padding: '0.1rem 0.35rem', borderRadius: '4px', fontSize: '0.72rem' }}>
            portfolioData.js
          </code>{' '}
          after getting real quotes from LinkedIn.
        </motion.p>
      </div>
    </section>
  );
}
