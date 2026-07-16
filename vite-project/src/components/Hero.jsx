import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FiArrowDown, FiArrowRight, FiDownload } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);
  
  const targetScale = useRef(140); // Start high for entrance water bloom/settling animation
  const currentScale = useRef(140);
  
  // Track scroll position to trigger water ripples on scroll
  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);
  
  // Track mouse coordinates for dynamic backlight/spotlight glow & mouse ripple interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    // Set initial mouse position to center of viewport
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    let lastY = window.scrollY;
    let lastX = window.scrollX;
    
    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentX = window.scrollX;
      
      const deltaY = Math.abs(currentY - lastY);
      const deltaX = Math.abs(currentX - lastX);
      const totalDelta = deltaY + deltaX;
      
      if (totalDelta > 0.5) {
        // Boost turbulence scale based on scroll speed
        targetScale.current = Math.min(65, targetScale.current + totalDelta * 0.75);
      }
      
      lastY = currentY;
      lastX = currentX;
    };
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Calculate mouse velocity for additional localized ripple disturbance
      const mouseSpeed = Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0);
      if (mouseSpeed > 1) {
        targetScale.current = Math.min(65, targetScale.current + mouseSpeed * 0.2);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mouseX, mouseY]);

  // RequestAnimationFrame loop for high-performance ref-based SVG property updates (60fps)
  useEffect(() => {
    let time = 0;
    let frameId;
    
    const animate = () => {
      time += 0.015; // speed of the liquid flow
      
      // Decays target scale back to a gentle idle scale (2.5)
      // On mount, targetScale starts at 140, creating a gorgeous liquid settling/entrance effect.
      // After settling, it responds to scroll speed and decays back to 2.5
      targetScale.current += (2.5 - targetScale.current) * 0.045;
      
      // Linear interpolation (LERP) for smooth transition of the scale value
      currentScale.current += (targetScale.current - currentScale.current) * 0.08;
      
      // Calculate wave cycles for baseFrequency to simulate water current
      const baseFreqX = 0.011 + Math.sin(time * 0.6) * 0.002;
      const baseFreqY = 0.035 + Math.cos(time * 1.0) * 0.004;
      
      if (displacementRef.current) {
        displacementRef.current.setAttribute('scale', currentScale.current.toFixed(2));
      }
      
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute('baseFrequency', `${baseFreqX.toFixed(5)} ${baseFreqY.toFixed(5)}`);
      }
      
      frameId = requestAnimationFrame(animate);
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const nameContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: -160, 
      rotate: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 11,
      }
    }
  };

  return (
    <section id="hero" className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: '#08080c',
    }}>
      {/* Dynamic Cursor Spotlight Effect */}
      <motion.div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%)',
        top: '-300px',
        left: '-300px',
        x: springX,
        y: springY,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Tech Grid Backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        opacity: 0.8,
        zIndex: 0,
      }} />

      {/* Fluid Radial Ambient Lights */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, transparent 80%)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(244, 63, 94, 0.03) 0%, transparent 80%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
        zIndex: 0,
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        padding: '8rem 1rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Intro Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          Creative Full-Stack Engineer
        </motion.p>

        {/* Liquid Displaced Giant Typography Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            filter: 'url(#water-filter)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            overflow: 'visible',
            pointerEvents: 'none',
            userSelect: 'none',
            marginBottom: '2rem',
          }}
        >
          {/* Row 1: Rajesh Patankar (Staggered Drop-in Letters) */}
          <motion.h1
            variants={nameContainerVariants}
            initial="hidden"
            animate="visible"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 8.5rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#ffffff',
              lineHeight: '0.9',
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.35em',
              letterSpacing: '-0.03em',
              // textShadow: `
              //   1px 1px 0px #1e293b,
              //   2px 2px 0px #1e293b,
              //   3px 3px 0px #1e293b,
              //   4px 4px 0px #1e293b,
              //   5px 5px 0px #1e293b,
              //   6px 6px 0px #151e2e,
              //   7px 7px 0px #0f1624,
              //   8px 8px 12px rgba(0, 0, 0, 0.85),
              //   8px 8px 1px rgba(0, 0, 0, 0.6),
              //   0px 0px 25px rgba(96, 165, 250, 0.22)
              // `,
              
            }}
          >
            {personalInfo.name.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Row 2: Outline Dev Text */}
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 6.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: '0.95',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.35)',
            marginTop: '0.25rem',
          }}>
            MERN ARCHITECT
          </h2>
        </motion.div>

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '650px',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          {personalInfo.tagline} Crafting beautiful interfaces & robust, high-performance web applications.
        </motion.p>

        {/* Action Buttons */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-accent"
            style={{
              padding: '0.85rem 2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
            }}
          >
            Explore Projects <FiArrowRight size={16} />
          </button>
          <a
            href={personalInfo.resumeUrl}
            download
            className="btn-outline"
            style={{
              padding: '0.85rem 2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem',
            }}
          >
            <FiDownload size={16} /> Download Resume
          </a>
        </motion.div> */}

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          style={{
            display: 'flex',
            gap: '0.65rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '600px',
          }}
        >
          {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'].map((tech) => (
            <span
              key={tech}
              className="tech-badge"
              style={{
                fontSize: '0.75rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Floating Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          zIndex: 3,
        }}
      >
        <span style={{
          fontSize: '0.68rem',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>
          Scroll
        </span>
        <div style={{ animation: 'scrollBounce 1.8s ease-in-out infinite' }}>
          <FiArrowDown size={18} color="rgba(255, 255, 255, 0.6)" />
        </div>
      </motion.div>

      {/* SVG Liquid Displacement Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="water-filter">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.011 0.038"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="140"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <style>{`
        /* Extra custom micro-animations for Hero badges */
        .tech-badge:hover {
          background: rgba(96, 165, 250, 0.15) !important;
          border-color: rgba(96, 165, 250, 0.3) !important;
          color: #60a5fa !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}