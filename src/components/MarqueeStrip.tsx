import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactElement } from 'react';

/**
 * Full-bleed scrolling proof quote strip.
 *  - Infinite marquee loop via `.marquee-track` CSS keyframe
 *  - Content rendered twice for seamless wrap
 *  - Left/right fade mask
 *  - Subtle vertical parallax on the text as the user scrolls past
 */

const PHRASES: { neutral: string; accent: string; tail?: string }[] = [
  { neutral: 'Two calls from Google', accent: 'my first week' },
  { neutral: 'Paid for itself', accent: 'in 30 days' },
  { neutral: 'Looks more professional', accent: 'than the competition' },
];

function Ornament(): ReactElement {
  return (
    <svg
      aria-hidden
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="mx-8 shrink-0 opacity-90"
      fill="none"
    >
      <circle cx="14" cy="14" r="3" fill="#a67a20" />
      <circle cx="14" cy="14" r="7.5" stroke="#a67a20" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}

function Row(): ReactElement {
  return (
    <div className="flex shrink-0 items-center pr-8" aria-hidden={false}>
      {PHRASES.map((p, i) => (
        <div key={i} className="flex shrink-0 items-center">
          <span
            className="serif-i whitespace-nowrap leading-none text-[#54504a]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            <span>&ldquo;{p.neutral}&nbsp;</span>
            <span className="gradient-warm">{p.accent}</span>
            <span>&rdquo;</span>
          </span>
          <Ornament />
        </div>
      ))}
    </div>
  );
}

export function MarqueeStrip(): ReactElement {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.5]);

  return (
    <section
      ref={ref}
      aria-label="Client proof"
      className="relative w-full overflow-hidden border-y border-white/5 py-24 md:py-32"
    >
      {/* Ambient warm glow behind the strip */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(245,184,74,0.08), transparent 70%)',
        }}
      />

      <motion.div
        style={{
          y: driftY,
          opacity,
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        }}
        className="relative w-full overflow-hidden"
      >
        <div
          className="marquee-track flex w-max items-center will-change-transform"
          aria-hidden={false}
        >
          <Row />
          <Row />
        </div>
      </motion.div>

      {/* Top/bottom soft divider glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(245,184,74,0.28), transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,59,46,0.25), transparent)',
        }}
      />
    </section>
  );
}
