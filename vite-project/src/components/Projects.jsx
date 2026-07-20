import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { projects } from "../data/portfolioData";
import {
  FiExternalLink,
  FiGithub,
  FiZap,
  FiX,
  FiArrowRight,
  FiCheck,
  FiCpu,
} from "react-icons/fi";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

function ProjectCard({ project, index, onViewDetails }) {
  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      onClick={() => onViewDetails(project)}
      className="w-full aspect-[4/5] min-h-[280px] rounded-2xl overflow-hidden border border-[var(--border)] relative cursor-pointer group shadow-lg sm:aspect-[16/9] sm:min-h-[360px]"
    >
      {/* Full-bleed Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        onError={(e) => {
          e.target.src = `https://placehold.co/400x520/16161f/8b5cf6?text=${encodeURIComponent(project.title)}`;
        }}
      />

      {/* Bottom Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 bg-[var(--accent)] text-white py-1 px-2.5 rounded-lg text-[0.65rem] font-bold tracking-wider flex items-center gap-1 border border-white/10 shadow-md">
          <FiZap size={10} /> Featured
        </div>
      )}

      {/* Content overlay at the bottom left */}
      <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
        <span className="text-[0.88rem] font-mono font-bold block mb-1 text-[var(--accent)] tracking-widest">
          {cardNumber}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight group-hover:text-[var(--accent)] transition-colors duration-300">
          {project.title}
        </h3>
        <span className="inline-block bg-white/10 border border-white/10 text-white/80 py-0.5 px-2 rounded-md text-[0.62rem] font-semibold tracking-wider uppercase">
          {project.category}
        </span>
      </div>
    </div>
  );
}

// Case Study Modal Component
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-[#050508]/88 backdrop-blur-md z-[1000] flex items-start justify-center pt-6 pb-6 px-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[750px] w-full max-h-[calc(100vh-4rem)] min-h-0 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col min-h-0 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[100] w-9 h-9 rounded-full bg-[#0a0a0f]/60 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200 backdrop-blur-[4px] hover:rotate-90 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)]"
        >
          <FiX size={18} />
        </button>

        <div className="h-[220px] relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://placehold.co/600x200/16161f/8b5cf6?text=${encodeURIComponent(project.title)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-black/40" />
          <div className="absolute bottom-5 left-6 right-6">
            <span className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] py-1 px-2.5 rounded-md text-[0.7rem] font-bold uppercase tracking-wider inline-block mb-2 shadow-sm">
              {project.category}
            </span>
            <h2 className="text-[1.75rem] font-extrabold text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="flex-1 min-h-0 p-8 overflow-y-auto flex flex-col gap-6 text-[var(--text-secondary)]">
          <div>
            <h4 className="text-[var(--text-primary)] font-bold text-[0.95rem] mb-2 flex items-center gap-1.5">
              🎯 Overview
            </h4>
            <p className="text-[0.9rem] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <h5 className="text-[var(--text-primary)] font-bold text-[0.88rem] mb-1.5 flex items-center gap-1.5">
                💡 The Problem
              </h5>
              <p className="text-[0.85rem] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <h5 className="text-[var(--text-primary)] font-bold text-[0.88rem] mb-1.5 flex items-center gap-1.5">
                <FiCpu size={14} className="text-[var(--text-accent)]" /> Key
                Challenges
              </h5>
              <p className="text-[0.85rem] leading-relaxed">
                {project.challenges}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-bold text-[0.95rem] mb-3">
              ⚡ Core Features Implemented
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <FiCheck size={14} className="text-[#10b981] mt-1 shrink-0" />
                  <span className="text-[0.85rem] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-bold text-[0.95rem] mb-2.5">
              🛠️ Technologies & Tools Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="tech-badge py-1 px-3.5 text-[0.75rem] rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 px-8 border-t border-[var(--border)] bg-[var(--bg-secondary)] flex gap-4 justify-end">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-6 py-2.5 text-[0.85rem] rounded-lg inline-flex items-center gap-2"
          >
            <FiGithub size={14} /> View Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent px-6 py-2.5 text-[0.85rem] rounded-lg inline-flex items-center gap-2"
          >
            <FiExternalLink size={14} /> Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Single card driven by its own scroll-derived y/opacity/scale
function ScrollCard({ project, index, total, scrollYProgress, onViewDetails }) {
  const cardNumber = String(index + 1).padStart(2, "0");

  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Each card occupies 1/total of the scroll range
  // For n cards, we divide [0, 1] into n equal slots
  const slot = 1 / total;
  const start = index * slot;
  const end = (index + 1) * slot;
  const mid = (start + end) / 2;

  // First card: already visible at scroll=0, only exits left
  // Last card: enters from right, never exits (stays visible)
  // Middle cards: enter from right, exit to left with fade

  const xValues = isFirst
    ? ["0%", "0%", "0%"] // stays, no entrance
    : ["100%", "0%", "0%"]; // enters from right

  const scaleValues = isLast
    ? [1, 1, 1] // no exit scale
    : [1, 1, 0.94]; // slight shrink on exit

  const opacityValues = isFirst
    ? [1, 1, 0] // visible from start, fades on exit
    : isLast
      ? [0, 1, 1] // enters, stays visible
      : [0, 1, 0]; // normal enter/exit

  const x = useTransform(scrollYProgress, [start, mid, end], xValues);
  const scale = useTransform(scrollYProgress, [start, mid, end], scaleValues);
  const opacity = useTransform(
    scrollYProgress,
    [start, mid, end],
    opacityValues,
  );

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer will-change-transform"
      style={{ x, scale, opacity }}
      onClick={() => onViewDetails(project)}
    >
      {/* Full-bleed image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-center"
        onError={(e) => {
          e.target.src = `https://placehold.co/400x520/16161f/8b5cf6?text=${encodeURIComponent(project.title)}`;
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 bg-[var(--accent)] text-white py-1 px-2.5 rounded-lg text-[0.65rem] font-bold tracking-wider flex items-center gap-1 border border-white/10 shadow-md">
          <FiZap size={10} /> Featured
        </div>
      )}

      {/* Bottom-left text */}
      <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
        <span className="text-[0.88rem] font-mono font-bold block mb-1 text-[var(--accent)] tracking-widest">
          {cardNumber}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2 tracking-tight">
          {project.title}
        </h3>
        <span className="inline-block bg-white/10 border border-white/10 text-white/80 py-0.5 px-2 rounded-md text-[0.62rem] font-semibold tracking-wider uppercase">
          {project.category}
        </span>
      </div>

      {/* Card number top-left */}
      <div className="absolute bottom-6 right-6 z-10">
        <span className="text-white/40 font-mono text-[0.72rem]">
          {cardNumber} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  const total = filtered.length;

  const sectionRef = useRef(null);

  // Outer section is the scroll track — 100vh per card
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Active index for dots
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * total), total - 1);
      setActiveIdx(idx < 0 ? 0 : idx);
    });
  }, [scrollYProgress, total]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section bg-[var(--bg-primary)] relative"
      style={{
        height: `${total * 100}vh`,
        minHeight: `${total * 100}vh`,
      }}
    >
      {/* Sticky full-screen panel */}
      <div className="sticky top-0 h-screen w-full overflow-visible sm:overflow-hidden flex flex-col">
        {/* Header */}
        <div className="w-full flex flex-col items-center text-center pt-20 pb-6 px-6 shrink-0">
          <p className=" font-semibold text-[0.68rem] tracking-widest uppercase mb-2">
            What I&apos;ve built
          </p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />

          {/* Filter buttons */}
          {/* <div className="flex justify-center gap-2 flex-wrap mt-5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setActiveIdx(0); }}
                className={`py-1.5 px-4 rounded-lg border font-semibold text-[0.8rem] cursor-pointer transition-all duration-300 font-sans ${
                  activeFilter === cat
                    ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md'
                    : 'border-[var(--border)] bg-transparent text-[var(--text-secondary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>

        {/* Card stage — fills remaining height, cards absolutely stacked */}
        <div className="flex-1 flex items-center justify-center px-6 relative overflow-visible">
          <div className="relative w-full max-w-[700px] h-full min-h-[60vh] max-h-[85vh] sm:max-h-[800px]">
            {filtered.map((project, i) => (
              <ScrollCard
                key={project.id}
                project={project}
                index={i}
                total={total}
                scrollYProgress={scrollYProgress}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex gap-2 justify-center py-6 shrink-0">
          {filtered.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 32 : 10,
                backgroundColor:
                  i === activeIdx ? "var(--accent)" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
