import { FiHeart, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { icon: <FiGithub size={18} />, href: personalInfo.github, label: 'GitHub' },
    { icon: <FiLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <FiMail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  const navLinks = [
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Experience', to: 'experience' },
    { label: 'Contact', to: 'contact' },
  ];

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 0',
    }}>
      <div className="container">
        {/* Top row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          {/* Logo */}
          <div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              {/* <span className="accent-text">RP</span> */}
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, marginLeft: '0.4rem' }}>Portfolio</span>
            </span>
          </div>

          {/* Nav links */}
          {/* <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {navLinks.map(link => (
              <button
                key={link.to}
                onClick={() => document.getElementById(link.to)?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.2s',
                  padding: 0,
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link.label}
              </button>
            ))}
          </nav> */}

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--text-accent)';
                  e.currentTarget.style.color = 'var(--text-accent)';
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'var(--bg-card)';
                }}
              >
                {l.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '1.25rem' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {year} Rajesh Patankar. All rights reserved.
          </p>
          {/* <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <FiHeart size={13} color="var(--text-accent)" fill="var(--text-accent)" /> in React + Vite
          </p> */}
        </div>
      </div>
    </footer>
  );
}
