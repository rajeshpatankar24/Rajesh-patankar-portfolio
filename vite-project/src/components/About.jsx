import { motion } from 'framer-motion';
import { personalInfo, funFacts } from '../data/portfolioData';
import { FiMapPin, FiMail } from 'react-icons/fi';
import Logo from './Logo';

export default function About() {
  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-center text-[var(--text-accent)] font-semibold text-[0.82rem] tracking-widest uppercase mb-2">
            Get to know me
          </p>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative inline-block group about-profile-container">
              {/* Pulsing Backing Neon Radial Glow */}
              <div className="absolute -inset-5 rounded-[32px] [background:radial-gradient(circle,rgba(96,165,250,0.22)_0%,transparent_70%)] animate-[pulseGlow_4s_ease-in-out_infinite] pointer-events-none z-0" />

              {/* High-tech rotating solid double ring with glowing shadows */}
              <div className="absolute -inset-2 rounded-[32px] border-[1.5px] border-blue-400/45 shadow-[0_0_15px_rgba(96,165,250,0.35)] pointer-events-none z-0 animate-[rotateSlow_20s_linear_infinite] group-hover:animate-[rotateSlow_4s_linear_infinite] group-hover:border-blue-400 group-hover:shadow-[0_0_25px_rgba(96,165,250,0.5)] transition-all duration-500" />
              <div className="absolute -inset-3.5 rounded-[38px] border border-blue-400/25 shadow-[0_0_10px_rgba(96,165,250,0.2)] pointer-events-none z-0 animate-[rotateSlow_35s_linear_reverse_infinite] group-hover:animate-[rotateSlow_6s_linear_reverse_infinite] group-hover:border-blue-400/40 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] transition-all duration-500" />

              {/* Profile image container frame (Modern Squircle shape) */}
              <div className="w-[230px] h-[230px] rounded-[28px] bg-[#16161f]/65 backdrop-blur-md border-[3px] border-blue-400/35 overflow-hidden flex items-center justify-center relative z-10 shadow-[0_12px_36px_rgba(0,0,0,0.25),0_0_20px_rgba(96,165,250,0.15)] transition-all duration-500 group-hover:border-blue-400/65 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(96,165,250,0.3)] group-hover:-translate-y-1">
                <img
                  src="/rajesh_profile.jpg" alt="Rajesh Patankar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className="hidden flex-col items-center justify-center w-full h-full text-[var(--text-accent)]">
                  <Logo size={100} />
                </div>
              </div>

              {/* Exp badge - High Tech matching badge */}
              <div className="absolute -bottom-2 -right-4 bg-[#16161f]/90 backdrop-blur-sm border border-blue-400/40 shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_10px_rgba(96,165,250,0.15)] rounded-xl py-2 px-3.5 z-20 text-center">
                <p className="text-[1.1rem] font-extrabold text-[#60a5fa] text-center leading-none mb-0.5">1+</p>
                <p className="text-[0.58rem] text-[#cbd5e1] font-bold uppercase tracking-wider text-center">Year Exp.</p>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="otw-badge inline-flex mb-5">
              <span className="otw-dot" />
              Currently Open to Work
            </div>

            <h3 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold mb-4 leading-tight text-[var(--text-primary)]">
              Full-Stack Developer passionate about building real solutions
            </h3>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-[0.95rem]">
              {personalInfo.bio}
            </p>

            <div className="flex gap-6 flex-wrap mb-6">
              <span className="flex items-center gap-1.5 text-[var(--text-secondary)] text-[0.875rem]">
                <FiMapPin size={13} className="text-[var(--text-accent)]" /> {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-secondary)] text-[0.875rem]">
                <FiMail size={13} className="text-[var(--text-accent)]" /> {personalInfo.email}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {funFacts.map((fact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center gap-2 cursor-default transition-all duration-200 hover:border-[var(--accent)] hover:scale-[1.02]"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-[1.15rem]">{fact.emoji}</span>
                  <span className="text-[0.78rem] text-[var(--text-secondary)] leading-tight">{fact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
