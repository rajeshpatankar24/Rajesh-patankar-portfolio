import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function GitHubStats() {
  const u = personalInfo.githubUsername;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Construct color queries matching our color schemes:
  // Dark mode: ONLY use white color (#ffffff) for text
  // Light mode: Black/gray text with blue accents
  const titleColor = isDark ? 'ffffff' : '2563eb';
  const iconColor = isDark ? 'ffffff' : '2563eb';
  const textColor = isDark ? 'ffffff' : '3f3f46';
  const fireColor = isDark ? 'ffffff' : '2563eb';
  const ringColor = isDark ? 'ffffff' : '2563eb';
  const labelColor = isDark ? 'ffffff' : '71717a';
  const valueColor = isDark ? 'ffffff' : '000000';
  const borderColor = isDark ? '27272a' : 'e4e4e7';
  const bgColor = isDark ? '16161f' : 'ffffff';

  const cards = [
    { title: 'GitHub Stats', src: `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=dark&bg_color=${bgColor}&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&border_color=${borderColor}&hide_border=false&count_private=true`, alt: 'GitHub Stats' },
    { title: 'Top Languages', src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=dark&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&border_color=${borderColor}`, alt: 'Top Languages' },
    { title: 'Contribution Streak', src: `https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=dark&background=${bgColor}&ring=${ringColor}&fire=${fireColor}&currStreakLabel=${labelColor}&sideLabels=${labelColor}&currStreakNum=${valueColor}&sideNums=${valueColor}&dates=${labelColor}&border=${borderColor}`, alt: 'GitHub Streak' },
  ];

  return (
    <section id="github" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Open source activity
          </p>
          <h2 className="section-title">GitHub Stats</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Coding consistently — every commit counts</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.1rem', maxWidth: '940px', margin: '0 auto' }}>
          {cards.map((card, i) => (
            <motion.div key={card.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
              onHoverStart={e => { }}
              whileHover={{ y: -3, borderColor: 'var(--accent)' }}
            >
              <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{card.title}</span>
              </div>
              <div style={{ padding: '0.9rem', display: 'flex', justifyContent: 'center' }}>
                <img src={card.src} alt={card.alt}
                  style={{ width: '100%', maxWidth: '100%', height: 'auto', borderRadius: '6px' }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.parentElement.innerHTML = `<div style="padding:1.5rem;text-align:center;color:#71717a;font-size:0.78rem"><div style="font-size:1.8rem;margin-bottom:0.4rem">📊</div>Update your GitHub username in portfolioData.js</div>`;
                  }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex' }}>
            View GitHub Profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
