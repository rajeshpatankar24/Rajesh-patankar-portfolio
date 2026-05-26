import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { FiDownload, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.to)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'var(--bg-primary)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          {/* <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-accent)', letterSpacing: '-0.02em' }}>RP</span> */}
          <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500 }}>Portfolio</span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <button key={link.to}
              className={`nav-link ${activeSection === link.to ? 'active' : ''}`}
              onClick={() => scrollTo(link.to)}
              style={{ background: 'none', border: 'none', fontFamily: 'Inter, sans-serif' }}>
              {link.label}
            </button>
          ))}

          {/* Theme toggle */}
          <button onClick={toggleTheme}
            title={isDark ? 'Light mode' : 'Dark mode'}
            style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text-accent)'; e.currentTarget.style.color = 'var(--text-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          <a href={personalInfo.resumeUrl} download className="btn-accent"
            style={{ padding: '0.48rem 1.1rem', fontSize: '0.82rem', textDecoration: 'none' }}>
            <FiDownload size={13} /> Resume
          </a>
        </div>

        {/* Mobile controls */}
        <div className="mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={toggleTheme}
            style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}
            aria-label="Toggle menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-primary)',
          borderTop: '1px solid var(--border)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {navLinks.map(link => (
            <button key={link.to}
              className={`nav-link ${activeSection === link.to ? 'active' : ''}`}
              onClick={() => scrollTo(link.to)}
              style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}>
              {link.label}
            </button>
          ))}
          <a href={personalInfo.resumeUrl} download className="btn-accent"
            style={{ textDecoration: 'none', justifyContent: 'center' }}>
            <FiDownload size={14} /> Download Resume
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
