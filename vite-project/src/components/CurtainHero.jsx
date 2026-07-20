import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Hero from "./Hero";

/**
 * CurtainHero
 * -----------
 * Wraps your existing <Hero /> (imported unmodified from ./Hero) in a
 * scroll-driven "venetian blind" transition. Each blade is a clipped window
 * onto a full copy of <Hero />, offset so the blades reassemble it
 * pixel-for-pixel at rest — no visible seams, your design untouched. The
 * instant scrolling starts, cut lines appear and the blades flick upward
 * from a bottom hinge (spring-driven snap), staggered per blade, uncovering
 * IntroPoster underneath from the bottom of the screen up.
 *
 * Usage — replace wherever you currently render <Hero />:
 *   <CurtainHero />
 *   <ProjectsSection />
 *   ...rest of your page
 *
 * Note: <Hero /> is rendered BLADE_COUNT times (once per slice), so its
 * `id="hero"` attribute will be duplicated in the DOM. If anything (e.g. a
 * nav link to "#hero") depends on that id being unique, either drop the id
 * from Hero.jsx or point that link at the outer <section> this file renders
 * instead.
 *
 * Requires: npm install framer-motion
 */

const BLADE_COUNT = 7;

export default function CurtainHero() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (prefersReducedMotion) {
    // Simple crossfade fallback — no scroll-scrubbed motion
    return (
      <>
        <div className="relative h-screen w-full overflow-hidden">
          <Hero />
        </div>
        <IntroPoster />
      </>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative isolate"
      style={{ height: "230vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 0 — the section revealed underneath */}
        <div className="absolute inset-0 z-0">
          <IntroPoster progress={scrollYProgress} />
        </div>

        {/* Layer 1 — the curtain blades, each a windowed slice of the real Hero */}
        <div className="absolute inset-0 z-10 flex">
          {Array.from({ length: BLADE_COUNT }).map((_, i) => (
            <Blade
              key={i}
              index={i}
              total={BLADE_COUNT}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Blade({ index, total, progress }) {
  // stagger each blade's retract window across the scroll timeline
  const start = 0.12 + index * 0.045;
  const flick = start + 0.06; // the quick "snap" moment right as motion begins
  const end = start + 0.5;

  // hinged at the bottom: sits flush at 0% until `start`, then snaps up fast
  // (slight overshoot past its own trajectory) before settling into the exit
  const rawY = useTransform(
    progress,
    [0, start, flick, end],
    ["0%", "0%", "-22%", "-100%"],
  );
  const rawRotate = useTransform(
    progress,
    [0, start, flick, end],
    [0, 0, -9, 0],
  );

  // spring wrap gives the flick its snap instead of a linear slide
  const y = useSpring(rawY, { stiffness: 260, damping: 24, mass: 0.5 });
  const rotateX = useSpring(rawRotate, {
    stiffness: 260,
    damping: 20,
    mass: 0.5,
  });

  // the seam between blades is invisible at rest — it only appears the
  // instant scrolling starts, so the hero reads as one flat surface on load
  const seamOpacity = useTransform(progress, [0, 0.015], [0, 1]);
  const shadowOpacity = useTransform(progress, [start, end], [0.22, 0]);

  // shift, as a % of the slice's own (full-hero-width) box, so this blade's
  // window lands exactly on its portion of the real hero — assembled across
  // all blades this reconstructs the hero pixel-for-pixel at rest
  const sliceShift = `${(index / total) * 100}%`;

  return (
    <div
      className="relative h-full overflow-hidden bg-[var(--bg-primary)]"
      style={{ width: `${100 / total}%`, perspective: "900px" }}
    >
      <motion.div
        style={{ y, rotateX, transformOrigin: "bottom center" }}
        className="relative h-full w-full"
      >
        {/* full-width copy of your Hero, pulled left so only this blade's
            slice shows through the clipped window above */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${sliceShift})`,
          }}
        >
          <Hero />
          <IntroPoster />
        </div>

        {/* seam / cut line — hidden until scroll begins */}
        <motion.div
          style={{ opacity: seamOpacity }}
          className="absolute inset-y-0 right-0 w-px bg-[var(--border)]"
        />

        {/* leading edge shadow for a bit of physical depth as it lifts */}
        <motion.div
          style={{ opacity: shadowOpacity }}
          className="absolute inset-x-0 bottom-0 h-24"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * The section revealed once the curtain lifts — swap the placeholder
 * poster block for your own image, or replace this whole function with
 * your actual next section's component.
 *
 * `progress` is the same scrollYProgress driving the blades. The text and
 * poster fade/rise in on a stagger timed to the tail of the curtain window
 * (roughly the last third of the scroll), so this section feels like it's
 * arriving rather than having been sitting there the whole time.
 */
function IntroPoster({ progress }) {
  const fallback = useMotionValue(1); // pinned past the end of every range below → fully settled
  const p = progress ?? fallback;

  const textOpacity = useTransform(p, [0.0, 0.15], [1, 1]);
  const textY = useTransform(p, [0.0, 0.15], [0, 0]);

  const imgOpacity = useTransform(p, [0.0, 0.2], [1, 1]);
  const imgY = useTransform(p, [0.0, 0.2], [0, 0]);
  const imgScale = useTransform(p, [0.0, 0.2], [1, 1]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-4 px-6 py-12 md:flex-row md:px-20 md:py-0 bg-[var(--bg-primary)]">
      <style>{posterPhotoStyle}</style>
      <motion.div
        className="max-w-md"
        style={{ opacity: textOpacity, y: textY }}
      >
        <p className="mb-4 font-mono text-xs tracking-widest text-[var(--text-accent)]">
          ABOUT
        </p>
        <h2 className="mb-6 font-mono text-3xl font-black leading-tight text-[var(--text-primary)]">
          I build products end to end, from schema to pixel.
        </h2>
        <p className="font-mono text-base leading-relaxed text-[var(--text-secondary)]">
          Three years shipping full-stack apps with the MERN stack — obsessed
          with clean architecture, fast interfaces, and the small UX details
          most people skip.
        </p>
      </motion.div>

      <motion.div
        className="relative aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-4xl border border-[var(--border)] md:w-[40%]"
        style={{ opacity: imgOpacity, y: imgY, scale: imgScale }}
      >
        <span className="pointer-events-none absolute right-4 bottom-13 z-20 rounded-2xl px-4 py-2 text-white text-sm italic tracking-[0.01em] shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm -rotate-2 font-[cursive]">
          Rajesh Patankar
        </span>
        {/* Swap the src below for your real photo. Kept grayscale for a
            minimalist, print-poster feel — drop the filter/hover rule in
            the <style> block beneath if you'd rather show it in full color. */}
        <img
          src="/rajesh_profile.png"
          alt="Portrait of Rajesh Patankar"
          className="poster-photo h-full w-full object-cover rounded-3xl"
        />
      </motion.div>
    </div>
  );
}

/* Minimalist duotone treatment for the poster photo — grayscale at rest,
   settles to full color on hover. Delete this block if you'd rather keep
   it in color everywhere. */
const posterPhotoStyle = `
  // .poster-photo {
  //   // filter: grayscale(1) contrast(1.05);
  //   transition: filter 0.4s ease;
  // }
  .poster-photo:hover {
    filter: grayscale(0);
  }
`;
