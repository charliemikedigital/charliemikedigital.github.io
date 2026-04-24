import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

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
              className="relative glass-strong rounded-2xl overflow-hidden glow-amber border border-[#f5b84a]/25"
              style={{ aspectRatio: '4 / 5' }}
            >
              {/* Headshot photo */}
              <img
                src="/matt-headshot.jpg"
                alt="Matthew Butler, founder of Charlie Mike Digital"
                width={400}
                height={400}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
              />

              {/* Soft ink gradient at the bottom for text legibility on tags */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(8,7,10,0.15) 45%, rgba(8,7,10,0.7) 100%)',
                }}
              />

              {/* Top-left veteran tag */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#08070a]/70 border border-[#f5b84a]/30 px-3 py-1.5 backdrop-blur">
                <ShieldCheck size={11} className="text-[#f5b84a]" strokeWidth={2.4} />
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.25em] text-[#f5b84a]">
                  Veteran Owned
                </span>
              </div>

              {/* Bottom-right est tag */}
              <div className="absolute bottom-4 right-4 rounded-full bg-[#ff3b2e] px-3 py-1.5 shadow-lg">
                <span className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.25em] text-white">
                  Est. 2024
                </span>
              </div>

              {/* Corner accents */}
              <svg
                aria-hidden
                className="absolute top-0 left-0 h-8 w-8 text-[#f5b84a]/55"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M2 10 V2 H10" strokeLinecap="round" />
              </svg>
              <svg
                aria-hidden
                className="absolute bottom-0 right-0 h-8 w-8 text-[#f5b84a]/55"
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
              roofers, electricians. People who do great work, charge fair prices, and show up when they say they
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

            {/* Signature block */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <div
                aria-hidden
                className="h-px w-full mb-6"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, #54504a 0 6px, transparent 6px 12px)',
                }}
              />

              {/* Signature — Mrs Saint Delafield is a formal signature script */}
              <motion.div
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 8, filter: 'blur(4px)' }
                }
                transition={{ duration: 1.4, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-warm select-none"
                style={{
                  fontFamily: "'Mrs Saint Delafield', 'Brush Script MT', cursive",
                  fontSize: 'clamp(3.2rem, 6.4vw, 5rem)',
                  letterSpacing: '-0.01em',
                  filter: 'drop-shadow(0 4px 16px rgba(245,184,74,0.25))',
                  /* Script fonts have huge ascenders/descenders — give them room */
                  lineHeight: '1.35',
                  paddingTop: '0.25em',
                  paddingBottom: '0.25em',
                  overflow: 'visible',
                }}
                aria-label="Matthew Butler signature"
              >
                Matthew Butler
              </motion.div>

              <div className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-[#8a8376]">
                Founder · Houston, TX
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
