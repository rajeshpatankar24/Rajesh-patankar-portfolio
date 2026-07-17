import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { icon: <FiGithub size={18} />, href: personalInfo.github, label: 'GitHub' },
    { icon: <FiLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <FiMail size={18} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] py-10">
      <div className="container">
        {/* Top row */}
        <div className="flex flex-wrap justify-between items-center gap-6 mb-6">
          {/* Logo */}
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Logo size={28} />
            <span className="text-[0.85rem] font-semibold tracking-wider uppercase opacity-80">
              Portfolio
            </span>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                className="w-[38px] h-[38px] rounded-[10px] bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] no-underline transition-all duration-200 hover:border-[var(--text-accent)] hover:text-[var(--text-accent)] hover:bg-[var(--bg-secondary)]"
              >
                {l.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[var(--border)] mb-5" />

        {/* Bottom row */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <p className="text-[var(--text-muted)] text-[0.8rem]">
            © {year} Rajesh Patankar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
