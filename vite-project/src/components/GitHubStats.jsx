import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { FiStar, FiGitCommit, FiGitPullRequest, FiGitBranch, FiAward } from 'react-icons/fi';

function MockGitHubStats() {
  const stats = [
    { label: 'Total Stars', value: '18', icon: <FiStar color="#f59e0b" /> },
    { label: 'Total Commits', value: '384', icon: <FiGitCommit color="#10b981" /> },
    { label: 'Pull Requests', value: '45', icon: <FiGitPullRequest color="#8b5cf6" /> },
    { label: 'Repositories', value: '12', icon: <FiGitBranch color="#3b82f6" /> },
  ];

  return (
    <div style={{ padding: '1.5rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'transparent' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <FiAward style={{ color: 'var(--accent)' }} />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Performance Summary</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            style={{
              padding: '0.75rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {stat.icon} {stat.label}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 850, color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MockTopLanguages() {
  const languages = [
    { name: 'JavaScript', percent: 48, color: '#f7df1e' },
    { name: 'React.js', percent: 28, color: '#61dafb' },
    { name: 'Node.js', percent: 14, color: '#339933' },
    { name: 'CSS / Tailwind', percent: 10, color: '#38bdf8' },
  ];

  return (
    <div style={{ padding: '1.5rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.9rem', background: 'transparent' }}>
      {languages.map((lang, idx) => (
        <div key={lang.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: lang.color, display: 'inline-block' }} />
              {lang.name}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>{lang.percent}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '99px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${lang.percent}%` }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
              style={{ height: '100%', background: lang.color, borderRadius: '99px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GitHubStats() {
  const u = personalInfo.githubUsername;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [statsError, setStatsError] = useState(false);
  const [langsError, setLangsError] = useState(false);

  const titleColor = isDark ? 'ffffff' : '2563eb';
  const iconColor = isDark ? 'ffffff' : '2563eb';
  const textColor = isDark ? 'ffffff' : '3f3f46';
  const fireColor = isDark ? 'ffffff' : '2563eb';
  const ringColor = isDark ? 'ffffff' : '2563eb';
  const labelColor = isDark ? 'ffffff' : '71717a';
  const valueColor = isDark ? 'ffffff' : '000000';
  const borderColor = isDark ? '27272a' : 'e4e4e7';
  const bgColor = isDark ? '16161f' : 'ffffff';

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=dark&bg_color=${bgColor}&title_color=${titleColor}&icon_color=${iconColor}&text_color=${textColor}&border_color=${borderColor}&hide_border=true&count_private=true`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=dark&bg_color=${bgColor}&title_color=${titleColor}&text_color=${textColor}&border_color=${borderColor}&hide_border=true`;
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=dark&background=${bgColor}&ring=${ringColor}&fire=${fireColor}&currStreakLabel=${labelColor}&sideLabels=${labelColor}&currStreakNum=${valueColor}&sideNums=${valueColor}&dates=${labelColor}&border=${borderColor}&hide_border=true`;

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -3, borderColor: 'var(--accent)', boxShadow: '0 8px 30px var(--shadow)' }}
          >
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>GitHub Stats</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '160px', flexGrow: 1 }}>
              {statsError ? (
                <MockGitHubStats />
              ) : (
                <img src={statsUrl} alt="GitHub Stats"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                  onError={() => setStatsError(true)}
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -3, borderColor: 'var(--accent)', boxShadow: '0 8px 30px var(--shadow)' }}
          >
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Top Languages</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '160px', flexGrow: 1 }}>
              {langsError ? (
                <MockTopLanguages />
              ) : (
                <img src={langsUrl} alt="Top Languages"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                  onError={() => setLangsError(true)}
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -3, borderColor: 'var(--accent)', boxShadow: '0 8px 30px var(--shadow)' }}
          >
            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Contribution Streak</span>
            </div>
            <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
              <img src={streakUrl} alt="GitHub Streak"
                style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex' }}>
            View GitHub Profile →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
