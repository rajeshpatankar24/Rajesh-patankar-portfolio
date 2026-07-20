import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full min-h-[100svh] md:min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center pt-28 pb-16 md:pt-40 relative overflow-hidden"
    >
      {/* Giant Background Parallax Text */}
      <div className="absolute top-[39%] md:top-[15%] left-1/2 -translate-x-1/2 text-[16vw] md:text-[16vw] font-black text-[var(--border)] dark:text-white/[0.16] opacity-90 select-none pointer-events-none tracking-widest leading-none font-mono whitespace-nowrap">
        PORTFOLIO
      </div>

      <div className="container max-w-[1100px] px-6 relative z-10 flex flex-col items-center gap-8">
        {/* Real HTML designed "DEVELOPER" title text with gradient and glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-2 flex flex-col items-center"
        >
          <p className="text-[var(--text-accent)] font-semibold tracking-widest uppercase mb-4 text-[0.68rem] flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[var(--text-accent)] inline-block"></span>
            Hi, I'm Rajesh Patankar
            <span className="w-8 h-[2px] bg-[var(--text-accent)] inline-block"></span>
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-accent)] drop-shadow-sm uppercase select-none font-mono ">
            DEVELOPER
          </h1>
          <div className="h-[2px] w-24 bg-[var(--accent)] my-4 rounded-full" />
          <p className="text-[var(--text-secondary)] text-sm md:text-base font-medium max-w-[650px] leading-relaxed">
            Crafting high-performance, responsive full-stack applications with
            the MERN stack, clean architecture, and modern UX design.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
