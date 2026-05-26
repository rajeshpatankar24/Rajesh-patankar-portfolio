import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FiExternalLink, FiGithub, FiZap } from 'react-icons/fi';

const categories = ['All', ...new Set(projects.map(p => p.category))];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '12px',
        border: hovered ? '1px solid var(--accent)' : '1px solid var(--border)',
        background: 'var(--bg-card)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px var(--shadow)' : 'none',
        cursor: 'default', position: 'relative',
      }}
    >
      {project.featured && (
        <div style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 10,
          background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
          padding: '0.18rem 0.55rem', borderRadius: '6px',
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.04em',
          display: 'flex', alignItems: 'center', gap: '0.2rem',
          border: '1px solid var(--border-light)',
        }}>
          <FiZap size={9} /> Featured
        </div>
      )}

      {/* Image */}
      <div style={{ height: '188px', overflow: 'hidden', position: 'relative' }}>
        <img src={project.image} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          onError={e => { e.target.src = `https://placehold.co/600x200/16161f/8b5cf6?text=${encodeURIComponent(project.title)}`; }} />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(10,10,15,0.88)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '1.25rem', gap: '0.6rem',
              }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                💡 Problem Solved
              </p>
              <p style={{ color: '#ffffff', fontSize: '0.82rem', textAlign: 'center', lineHeight: 1.6 }}>
                {project.problem}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ padding: '1.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{project.title}</h3>
          <span style={{
            background: 'var(--bg-secondary)', color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '0.12rem 0.45rem', borderRadius: '5px',
            fontSize: '0.62rem', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '0.5rem',
          }}>
            {project.category}
          </span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', lineHeight: 1.65, marginBottom: '0.9rem' }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
          {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-accent"
            style={{ flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem', textDecoration: 'none' }}>
            <FiExternalLink size={12} /> Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline"
            style={{ flex: 1, justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem' }}>
            <FiGithub size={12} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            What I&apos;ve built
          </p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Hover over a card to see the problem it solves</p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.42rem 1rem', borderRadius: '7px',
                border: activeFilter === cat ? '1px solid var(--btn-primary-bg)' : '1px solid var(--border)',
                background: activeFilter === cat ? 'var(--btn-primary-bg)' : 'transparent',
                color: activeFilter === cat ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.8rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s ease',
              }}>
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.35rem' }}>
            {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
