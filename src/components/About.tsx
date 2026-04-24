import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

const BADGES = [
  'U.S. Army Veteran',
  'PMP Certified',
  '12x Salesforce Certified',
  'Serving Nationwide',
  'SAFe Scrum Master',
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8 bg-[#0d0c10] border-y border-[#2a2730] overflow-hidden"
    >
      {/* Parallax background orbs */}
      <motion.div
        style={{ y: orbY }}
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10"
      >
        <div
          className="absolute top-[10%] right-[5%] h-[460px] w-[460px] rounded-full opacity-30 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-[5%] left-[3%] h-[360px] w-[360px] rounded-full opacity-25 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)', animationDelay: '-7s' }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-16 items-start">
          {/* ============ Left: portrait card ============ */}
          <motion.div
            ref={portraitRef}
            style={{ y: portraitY }}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto lg:mx-0 w-full max-w-[420px]"
          >
            <div
              className="relative glass-strong rounded-2xl overflow-hidden glow-amber"
              style={{ aspectRatio: '4 / 5' }}
            >
              {/* Animated drifting gradient backdrop */}
              <motion.div
                aria-hidden
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(245,184,74,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,59,46,0.3), transparent 60%)',
                    'radial-gradient(circle at 80% 30%, rgba(245,184,74,0.3), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,59,46,0.35), transparent 60%)',
                    'radial-gradient(circle at 50% 50%, rgba(245,184,74,0.4), transparent 60%), radial-gradient(circle at 15% 15%, rgba(255,59,46,0.28), transparent 55%)',
                    'radial-gradient(circle at 20% 20%, rgba(245,184,74,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,59,46,0.3), transparent 60%)',
                  ],
                }}
                transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
              />

              {/* Subtle grid overlay */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(245,184,74,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,74,0.4) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
                }}
              />

              {/* Centered monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-warm"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    fontSize: '8rem',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    textShadow: '0 8px 40px rgba(245,184,74,0.25)',
                  }}
                >
                  MB
                </motion.span>
              </div>

              {/* Top-left tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#08070a]/70 border border-[#f5b84a]/30 px-3 py-1.5 backdrop-blur">
                <ShieldCheck size={11} className="text-[#f5b84a]" strokeWidth={2.4} />
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.25em] text-[#f5b84a]">
                  Veteran Owned
                </span>
              </div>

              {/* Bottom-right tag */}
              <div className="absolute bottom-4 right-4 rounded-full bg-[#ff3b2e] px-3 py-1.5 shadow-lg">
                <span className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.25em] text-white">
                  Est. 2024
                </span>
              </div>

              {/* Corner accents */}
              <svg
                aria-hidden
                className="absolute top-0 left-0 h-8 w-8 text-[#f5b84a]/50"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M2 10 V2 H10" strokeLinecap="round" />
              </svg>
              <svg
                aria-hidden
                className="absolute bottom-0 right-0 h-8 w-8 text-[#f5b84a]/50"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M22 30 H30 V22" strokeLinecap="round" />
              </svg>
            </div>

            {/* Floating info chip */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -left-4 md:-left-8 bottom-12 hidden md:flex flex-col glass-strong rounded-xl px-4 py-3"
            >
              <span className="font-mono text-[0.54rem] uppercase tracking-[0.25em] text-[#8a8376]">
                Experience
              </span>
              <span className="font-serif italic text-[1.5rem] gradient-warm leading-tight">
                ~10 yrs
              </span>
              <span className="text-[0.62rem] text-[#c5beb1]">federal delivery</span>
            </motion.div>
          </motion.div>

          {/* ============ Right: text content ============ */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5b84a] pulse-slow" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[#c5beb1]">
                About
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-semibold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-[#efeae0]"
            >
              Matt Butler
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-2 serif-i text-[1.15rem] md:text-[1.3rem] gradient-warm"
            >
              Founder · Charlie Mike Digital
            </motion.p>

            <div className="hr-glow mt-7 mb-7 opacity-60" />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[1.02rem] text-[#c5beb1]"
              style={{ lineHeight: 1.72 }}
            >
              I'm a U.S. Army veteran. When I say I'll deliver in 72 hours, I{' '}
              <em className="serif-i text-[#f5b84a] not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                mean it
              </em>
              . I didn't learn to miss deadlines in the Army. I've spent nearly a decade delivering complex technical
              projects for the Air Force, the VA, and the Department of Labor. I know what execution looks like and I
              bring that same standard to every site I build.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-5 text-[1.02rem] text-[#c5beb1]"
              style={{ lineHeight: 1.72 }}
            >
              I started Charlie Mike Digital because too many good local businesses are invisible online. Plumbers,
              roofers, electricians — people who do great work, charge fair prices, and show up when they say they
              will, but they're losing jobs every day to competitors with a better website. That's a problem I can
              fix fast.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-5 text-[1.02rem] text-[#c5beb1]"
              style={{ lineHeight: 1.72 }}
            >
              "
              <em className="serif-i text-[#f5b84a]" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                Charlie Mike
              </em>
              " is military radio for "
              <em className="serif-i text-[#f5b84a]" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>
                Continue Mission.
              </em>
              " No excuses. No delays. You get the keys and we move on.
            </motion.p>

            {/* Badges */}
            <motion.ul
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } },
              }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {BADGES.map((badge) => (
                <motion.li
                  key={badge}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.96 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
                  }}
                  className="glass rounded-full px-3.5 py-1.5 text-[0.72rem] text-[#c5beb1] hover:border-[#f5b84a]/40 hover:text-[#efeae0] transition-colors"
                >
                  {badge}
                </motion.li>
              ))}
            </motion.ul>

            {/* Signature block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10"
            >
              <div
                aria-hidden
                className="h-px w-full mb-6"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #54504a 0 6px, transparent 6px 12px)',
                }}
              />

              {/* SVG cursive signature */}
              <svg
                viewBox="0 0 340 80"
                className="h-16 md:h-[72px] w-auto max-w-[320px]"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Matt Butler signature"
              >
                <motion.path
                  d="M6 54 C 12 32 20 18 26 34 C 30 46 34 56 40 42 C 44 32 50 18 56 32 C 60 42 64 54 70 44 C 74 36 78 28 82 46 C 84 56 88 62 94 50 M 100 30 C 104 24 108 24 110 34 C 112 46 114 56 118 50 C 122 46 124 40 126 46 M 136 18 C 136 30 134 46 136 54 C 138 60 142 56 146 48 M 154 30 C 158 24 164 26 164 38 C 164 50 160 56 156 52 C 152 48 152 40 158 38 M 176 14 C 176 28 174 46 176 56 C 178 62 182 58 186 48 C 190 38 192 28 198 34 C 202 38 202 48 206 52 C 210 56 214 48 216 40 M 228 30 C 224 36 224 52 230 54 C 238 58 240 44 240 36 C 240 28 236 24 234 32 M 254 14 C 252 28 250 46 254 56 C 258 62 262 54 264 46 M 274 36 C 272 44 272 54 278 54 C 286 54 288 40 286 34 C 284 28 280 28 278 36 M 298 34 C 294 40 294 54 300 54 C 308 54 308 40 304 36 C 300 32 296 34 294 40 M 318 20 C 320 30 320 50 322 56 C 324 62 328 58 332 50"
                  fill="none"
                  stroke="#f5b84a"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(245,184,74,0.35))' }}
                />
              </svg>

              <div className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-[#8a8376]">
                Founder · Houston, TX
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
