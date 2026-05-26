import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { FiExternalLink, FiGithub, FiZap, FiX, FiArrowRight, FiCheck, FiCpu } from 'react-icons/fi';

const categories = ['All', ...new Set(projects.map(p => p.category))];

function ProjectCard({ project, index, onViewDetails }) {
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
        borderRadius: '16px',
        border: hovered ? '1px solid var(--accent)' : '1px solid var(--border)',
        background: 'var(--bg-card)',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px var(--shadow)' : '0 4px 20px rgba(0,0,0,0.03)',
        cursor: 'default',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {project.featured && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px', zIndex: 10,
          background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
          padding: '0.25rem 0.65rem', borderRadius: '8px',
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em',
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          border: '1px solid var(--border-light)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <FiZap size={10} /> Featured
        </div>
      )}

      {/* Image Container */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img src={project.image} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          onError={e => { e.target.src = `https://placehold.co/600x200/16161f/8b5cf6?text=${encodeURIComponent(project.title)}`; }} />

        {/* Hover overlay for Problem statement */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(10,10,15,0.92)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem', gap: '0.75rem',
                backdropFilter: 'blur(4px)',
              }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                💡 Problem Solved
              </p>
              <p style={{ color: '#ffffff', fontSize: '0.82rem', textAlign: 'center', lineHeight: 1.6, padding: '0 0.5rem' }}>
                {project.problem}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {project.title}
          </h3>
          <span style={{
            background: 'var(--bg-secondary)', color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            padding: '0.15rem 0.5rem', borderRadius: '6px',
            fontSize: '0.65rem', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '0.5rem',
          }}>
            {project.category}
          </span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.2rem', flexGrow: 1 }}>
          {project.description}
        </p>

        {/* Tech Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>

        {/* Quick Links & View Case Study Button */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: 'auto' }}>
          <button
            onClick={() => onViewDetails(project)}
            className="btn-accent"
            style={{
              flex: 1, justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.8rem',
              borderRadius: '8px', cursor: 'pointer', outline: 'none', border: 'none',
            }}
          >
            Case Study <FiArrowRight size={12} style={{ transition: 'transform 0.2s', transform: hovered ? 'translateX(3px)' : 'none' }} />
          </button>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline"
              title="GitHub Repository"
              style={{
                width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'
              }}>
              <FiGithub size={15} />
            </a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-outline"
              title="Live Demo"
              style={{
                width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px'
              }}>
              <FiExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Case Study Modal Component
function ProjectModal({ project, onClose }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5, 5, 8, 0.88)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '750px', width: '100%',
          maxHeight: '85vh',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '20px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 100,
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(10, 10, 15, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(90deg)'; e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.background = 'rgba(10, 10, 15, 0.6)'; e.currentTarget.style.color = '#ffffff'; }}
        >
          <FiX size={18} />
        </button>

        {/* Modal Image Header */}
        <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
          <img src={project.image} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.src = `https://placehold.co/600x200/16161f/8b5cf6?text=${encodeURIComponent(project.title)}`; }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, var(--bg-card) 5%, rgba(10,10,15,0.4) 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
            <span style={{
              background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)',
              padding: '0.2rem 0.6rem', borderRadius: '6px',
              fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              display: 'inline-block', marginBottom: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>
              {project.category}
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)', lineHeight: 1.2 }}>
              {project.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)' }}>
          
          {/* Section: Overview */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              🎯 Overview
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{project.longDescription}</p>
          </div>

          {/* Grid for Problem & Challenges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            <div style={{ padding: '1.1rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                💡 The Problem
              </h5>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.55 }}>{project.problem}</p>
            </div>
            
            <div style={{ padding: '1.1rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FiCpu size={14} style={{ color: 'var(--text-accent)' }} /> Key Challenges
              </h5>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.55 }}>{project.challenges}</p>
            </div>
          </div>

          {/* Section: Features */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              ⚡ Core Features Implemented
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {project.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <FiCheck size={14} style={{ color: '#10b981', marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Tech Stack */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem' }}>
              🛠️ Technologies & Tools Used
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.tech.map(t => (
                <span key={t} className="tech-badge" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem', borderRadius: '8px' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          display: 'flex', gap: '1rem',
          justifyContent: 'flex-end',
        }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '8px' }}>
            <FiGithub size={14} /> View Code
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-accent"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '8px' }}>
            <FiExternalLink size={14} /> Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ textAlign: 'center', color: 'var(--text-accent)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            What I&apos;ve built
          </p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />
          <p className="section-subtitle">Hover over a card to see the problem it solves, or view the case study for details.</p>
        </motion.div>

        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              style={{
                padding: '0.45rem 1.2rem', borderRadius: '8px',
                border: activeFilter === cat ? '1px solid var(--btn-primary-bg)' : '1px solid var(--border)',
                background: activeFilter === cat ? 'var(--btn-primary-bg)' : 'transparent',
                color: activeFilter === cat ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.8rem',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeFilter === cat ? '0 4px 12px var(--shadow)' : 'none',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.75rem' }}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onViewDetails={setSelectedProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Case Study Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
