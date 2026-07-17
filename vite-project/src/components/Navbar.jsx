import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { personalInfo } from '../data/portfolioData'
import Logo from './Logo'
import { FiSun, FiMoon, FiDownload, FiMenu, FiX } from 'react-icons/fi'

export default function ScrollHideHeader() {
  const { scrollY } = useScroll()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [

    { label: 'Projects', to: 'projects' },
    { label: 'Experience', to: 'experience' },
    { label: 'Education', to: 'education' },
    { label: 'Contact', to: 'contact' },
  ]

  useMotionValueEvent(scrollY, "change", (current) => {
    // Scroll Hide Logic (hide header when scrolling down, show when scrolling up)
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    // Scrolled state for transparent vs glass styling
    if (current > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  // Track active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const link of navLinks) {
        const el = document.getElementById(link.to)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.to)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <div id="example" className="h-auto overflow-visible">
      <motion.header
        animate={{
          y: hidden ? -90 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 h-20 z-[1000] flex items-center transition-all duration-300 ${scrolled
          ? 'bg-[var(--glass-bg)] border-b border-[var(--border)] shadow-[0_10px_30px_-10px_var(--shadow)] backdrop-blur-md'
          : 'bg-transparent border-b-transparent shadow-none backdrop-blur-none'
          }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center ">
            <button
              onClick={() => scrollTo('hero')}
              className="bg-transparent border-none cursor-pointer flex items-center gap-2.5 p-4 outline-none"
            >
              <Logo size={36} />

            </button>
          </div>

          {/* Desktop Nav Links & Controls */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.to}
                className={`nav-link bg-transparent border-none font-sans py-1 cursor-pointer ${activeSection === link.to ? 'active' : ''
                  }`}
                onClick={() => scrollTo(link.to)}
              >
                {link.label}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-light)] cursor-pointer flex items-center justify-center text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--text-primary)] outline-none"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Download Resume Button */}
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn-accent px-5 py-2 text-[0.85rem] no-underline inline-flex items-center gap-2"
            >
              <FiDownload size={14} /> Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-[34px] h-[34px] rounded-[7px] bg-[var(--bg-card)] border border-[var(--border-light)] cursor-pointer flex items-center justify-center text-[var(--text-secondary)] outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-transparent border-none cursor-pointer text-[var(--text-primary)] flex items-center p-1 outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border)] shadow-[0_10px_30px_var(--shadow)] p-6 flex flex-col gap-4 z-[999]"
            >
              {navLinks.map((link) => (
                <button
                  key={link.to}
                  className={`nav-link bg-transparent border-none text-left text-base font-sans py-2 cursor-pointer ${activeSection === link.to ? 'active' : ''
                    }`}
                  onClick={() => scrollTo(link.to)}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-4 mt-2">
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="btn-accent no-underline inline-flex items-center justify-center gap-2 flex-1 py-3"
                >
                  <FiDownload size={14} /> Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  )
}
