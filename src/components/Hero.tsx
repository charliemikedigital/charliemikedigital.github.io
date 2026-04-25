import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';

/**
 * Maximalist hero with:
 *  - Animated multi-layer gradient orbs (parallax on scroll)
 *  - Character-by-character "CHARLIE MIKE" mono label reveal
 *  - Word-by-word italic serif headline entrance
 *  - 3D-tilting featured-work preview card that follows the cursor
 *  - Scroll-parallax layer separation
 *  - Live-status pulse dot
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax values
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor-follow tilt on the preview card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onCardLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
    >
      {/* =========== Background: parallax gradient orbs =========== */}
      <motion.div
        style={{ y: orbY }}
        className="absolute inset-0 pointer-events-none -z-10"
      >
        <div className="absolute top-[8%] -right-40 h-[560px] w-[560px] rounded-full opacity-70 blur-3xl drift"
             style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)' }} />
        <div className="absolute top-[28%] -left-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl drift"
             style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 60%)', animationDelay: '-6s' }} />
        <div className="absolute bottom-[10%] right-[28%] h-[320px] w-[320px] rounded-full opacity-40 blur-3xl drift"
             style={{ background: 'radial-gradient(circle, #7ad0ff 0%, transparent 55%)', animationDelay: '-12s' }} />
      </motion.div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,184,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,74,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }}
      />

      <motion.div style={{ opacity: fadeOut }} className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* =========== Left: headline stack =========== */}
          <motion.div style={{ y: textY }} className="relative">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-7"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#3fd687] opacity-75 pulse-slow" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fd687]" />
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#c5beb1]">
                Booking April build slots
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#f5b84a] font-semibold">
                Veteran owned
              </span>
            </motion.div>

            {/* Headline — word-stagger reveal */}
            <h1 className="font-semibold text-[clamp(3rem,7vw,5.75rem)] leading-[0.98] tracking-[-0.035em] text-[#efeae0]">
              <Word delay={0.35}>Your competitors</Word>{' '}
              <Word delay={0.45} className="serif-i gradient-warm">have a website.</Word>
              <br />
              <Word delay={0.6}>Now</Word>{' '}
              <Word delay={0.75} className="serif-i gradient-signal">you will too.</Word>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-7 max-w-[520px] text-[1.05rem] leading-[1.65] text-[#c5beb1]"
            >
              You're great at your trade but you've never had{' '}
              <em className="serif-i text-[#f5b84a]">someone in your corner</em> when it comes to technology. I fix that.
              Built from scratch for your industry, delivered in three days, and{' '}
              <em className="serif-i text-[#f5b84a]">yours outright</em>. No lock in. No recurring fees to exist online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#booking"
                className="btn-sweep group inline-flex items-center gap-2.5 rounded-full bg-[#ff3b2e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-10px_rgba(255,59,46,0.55)] hover:shadow-[0_22px_54px_-8px_rgba(255,59,46,0.8)] transition-all"
              >
                <span className="relative z-[1]">Book a free 30-min call</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="relative z-[1] transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-[#efeae0] glass hover:bg-white/[0.06] transition"
              >
                See recent work
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="transition-transform group-hover:translate-y-0.5">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

          </motion.div>

          {/* =========== Right: featured work 3D-tilt card =========== */}
          <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <a
              href="sites/restaurant-mesa.html"
              target="_blank"
              rel="noopener"
              className="block relative"
              aria-label="View Mesa Kitchen & Bar live demo"
            >
              <motion.div
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
                className="relative glass-strong rounded-2xl p-3 will-change-transform"
              >
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 rounded-md bg-black/30 px-3 py-1 text-[0.65rem] text-[#8a8376] font-mono">
                    mesakitchenbar.com
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f5b84a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <img
                  src="sites/thumbnails/restaurant-mesa.jpg"
                  alt="Mesa Kitchen & Bar, editorial restaurant site"
                  className="block w-full h-auto rounded-lg"
                  loading="eager"
                  width={1200}
                  height={750}
                />

                {/* Overlaid live badge */}
                <div className="absolute -top-3 -left-3 flex items-center gap-2 rounded-full bg-[#08070a] border border-[#f5b84a]/40 px-3 py-1.5 shadow-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fd687] pulse-slow" />
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-[#f5b84a]">
                    Featured Build
                  </span>
                </div>

                {/* Corner tag */}
                <div className="absolute -bottom-3 -right-3 rounded-full bg-[#ff3b2e] px-3.5 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg">
                  Restaurant · Mesa
                </div>
              </motion.div>

              {/* Testimonial under the Mesa featured card */}
              <motion.figure
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.35 }}
                className="mt-5 md:mt-6 pl-4 border-l border-[#3a3540] max-w-[92%]"
              >
                <blockquote className="serif-i text-[0.88rem] md:text-[0.95rem] leading-[1.5] text-[#c5beb1]">
                  <span aria-hidden className="text-[#f5b84a] mr-1">&ldquo;</span>
                  Online reservations went from zero to 15+ a week within the first month.
                  <span aria-hidden className="text-[#f5b84a] ml-0.5">&rdquo;</span>
                </blockquote>
              </motion.figure>
            </a>

            {/* Floating stat chip */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute -right-4 md:-right-6 top-1/2 hidden md:flex flex-col items-end gap-1 glass-strong rounded-xl px-4 py-3 text-right"
            >
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#8a8376]">Delivered</span>
              <span className="font-serif italic text-2xl gradient-warm">52 hours</span>
              <span className="text-[0.62rem] text-[#c5beb1]">from kickoff to live</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 flex items-center justify-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-[#8a8376] font-mono"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#54504a]" />
          <span>Scroll</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#54504a]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Word({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className={cn('inline-block', className)}
      >
        {children}
      </motion.span>
    </span>
  );
}
