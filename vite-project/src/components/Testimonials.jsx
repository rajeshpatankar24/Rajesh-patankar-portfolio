import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolioData';
import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const testimonialsList = testimonials || [];

  return (
    <section id="testimonials" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-center text-[var(--text-accent)] font-semibold text-[0.82rem] tracking-widest uppercase mb-2">
            What they say
          </p>
          <h2 className="section-title">Testimonials</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Kind words from my internship supervisors</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[780px] mx-auto">
          {testimonialsList.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-xl p-6.5 bg-[var(--bg-card)] border border-[var(--border)] transition-all duration-200 relative hover:border-[var(--accent)] hover:-translate-y-0.75"
              whileHover={{ y: -3, borderColor: 'var(--accent)' }}
            >
              {/* Large quote mark */}
              <div className="absolute top-4 right-5 text-[4rem] leading-none text-[var(--border)] font-[Georgia,serif] pointer-events-none select-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 mb-3.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <FiStar key={j} size={13} fill="var(--text-accent)" color="var(--text-accent)" />
                ))}
              </div>

              <p className="text-[var(--text-secondary)] text-[0.88rem] leading-relaxed italic mb-5.5 relative">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--btn-primary-bg)] flex items-center justify-center text-[0.72rem] font-bold text-[var(--btn-primary-text)] shrink-0 border border-[var(--border-light)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-[0.88rem] text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-[0.73rem] text-[var(--text-muted)]">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center text-[var(--text-muted)] text-[0.75rem] mt-7"
        >
          * Placeholders — update in{' '}
          <code className="text-[var(--text-accent)] bg-[var(--bg-card)] py-0.5 px-1.5 rounded text-[0.72rem]">
            portfolioData.js
          </code>{' '}
          after getting real quotes from LinkedIn.
        </motion.p>
      </div>
    </section>
  );
}
