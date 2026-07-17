import { motion } from 'framer-motion';
import { experiences } from '../data/portfolioData';
import { FiCalendar, FiCheckCircle } from 'react-icons/fi';

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center  font-semibold text-[0.68rem] tracking-widest uppercase mb-2">
            Work history
          </p>
          <h2 className="section-title">My Experience</h2>
          <div className="section-divider" />
        </motion.div>

        {/* ── Desktop alternating timeline ── */}
        <div className="hidden sm:block relative mx-auto mt-12 pb-8">
          {/* Center spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`flex mb-10 relative ${isLeft ? 'justify-start pr-[calc(50%+2rem)]' : 'justify-end pl-[calc(50%+2rem)]'}`}
              >
                {/* Accent dot on the center spine */}
                <div className="absolute left-1/2 top-12 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-primary)] z-10" />

                {/* Card */}
                <div className="w-full p-5 t-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] transition-all duration-200 hover:border-[var(--accent)] hover:-translate-y-0.5 shadow-sm">
                  <div className="inline-block bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] py-0.5 px-2.5 rounded-md text-[0.68rem] font-bold tracking-wider mb-2 border border-[var(--border-light)]">
                    {exp.company}
                  </div>
                  <h3 className="text-[0.95rem] font-bold text-[var(--text-primary)] mb-1.5">{exp.role}</h3>
                  <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[0.76rem] mb-3">
                    <FiCalendar size={11} /> {exp.duration}
                  </div>
                  <ul className="list-none flex flex-col gap-2">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-[0.8rem] text-[var(--text-secondary)] leading-relaxed">
                        <FiCheckCircle size={12} className="text-[var(--text-accent)] shrink-0 mt-[3px]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile single column ── */}
        <div className="flex sm:hidden flex-col gap-5 relative max-w-[600px] mx-auto mt-10 pl-7">
          {/* Left spine */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-[var(--border)]" />
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute left-[-1.35rem] top-6 w-2.5 h-2.5 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-primary)] z-10" />
              <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200">
                <div className="inline-block bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] py-0.5 px-2.5 rounded-md text-[0.66rem] font-bold tracking-wider mb-2 border border-[var(--border-light)]">
                  {exp.company}
                </div>
                <h3 className="text-[0.9rem] font-bold text-[var(--text-primary)] mb-1">{exp.role}</h3>
                <p className="flex items-center gap-1.5 text-[var(--text-muted)] text-[0.73rem] mb-3">
                  <FiCalendar size={10} /> {exp.duration}
                </p>
                <ul className="list-none flex flex-col gap-2">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="flex gap-2 text-[0.78rem] text-[var(--text-secondary)] leading-relaxed">
                      <FiCheckCircle size={11} className="text-[var(--text-accent)] shrink-0 mt-[3px]" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
