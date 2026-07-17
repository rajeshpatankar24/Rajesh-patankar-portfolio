import { motion } from 'framer-motion';
import { education, achievements } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-center  font-semibold text-[0.68rem] tracking-widest uppercase mb-2">
            Academic background
          </p>
          <h2 className="section-title">Education & Achievements</h2>
          <div className="section-divider" />
          <p className="section-subtitle">The foundation that supports my technical practice</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-5  mx-auto mt-10">
          {education.map((edu, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)] rounded-xl p-5 bg-[var(--bg-card)] border border-[var(--border)] relative overflow-hidden transition-all duration-200"
              whileHover={{ y: -3, borderColor: 'var(--accent)' }}
            >
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-[var(--accent)] rounded-l-xl" />
              <div className="ml-3">
                <div className="text-[1.8rem] mb-2.5">{edu.icon}</div>
                <h3 className="text-[0.95rem] font-bold text-[var(--text-primary)] mb-1.5 leading-snug">{edu.degree}</h3>
                <p className="text-[var(--text-accent)] text-[0.83rem] font-semibold mb-3">{edu.institution}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)] py-0.5 px-2.5 rounded-md text-[0.72rem] font-medium">
                    📅 {edu.year}
                  </span>
                  <span className="bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)] py-0.5 px-2.5 rounded-md text-[0.72rem] font-medium">
                    ✓ {edu.grade}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {achievements.map((ach, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (education.length + i) * 0.1 }}
              className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)] rounded-xl p-5 bg-[var(--bg-card)] border border-[var(--accent)] relative overflow-hidden transition-all duration-200"
              whileHover={{ y: -3 }}
            >
              <div className="text-[1.8rem] mb-2.5">🏆</div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5">{ach.title}</h3>
              <p className="text-[var(--text-secondary)] text-[0.83rem] leading-relaxed mb-3">{ach.description}</p>
              <span className="inline-flex items-center gap-1 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] py-1 px-3 rounded-md text-[0.73rem] font-bold border border-[var(--border-light)]">
                {ach.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

    </section>

  );
}
