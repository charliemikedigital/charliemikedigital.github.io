import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, type ReactElement } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Clock, Wrench, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';

type Step = {
  num: string;
  title: string;
  accent: string; // italicized tail word/phrase
  desc: string;
  detail: string;
  detailSub: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Free discovery',
    accent: 'call',
    desc: '30 minutes, no pitch. I learn your business, goals, and what you want the site to do.',
    detail: '~30 min',
    detailSub: 'Video call, zero pressure',
    icon: Clock,
  },
  {
    num: '02',
    title: 'I build your',
    accent: 'site',
    desc: 'Built from scratch in 72 hours. Real photos, copy for your industry and your customers.',
    detail: '48hrs avg',
    detailSub: 'From brief to preview link',
    icon: Wrench,
  },
  {
    num: '03',
    title: 'You review &',
    accent: 'approve',
    desc: "Full site before launch. Two rounds of revisions. We don't launch until you love it.",
    detail: '2 rounds',
    detailSub: 'Revisions included',
    icon: CheckCircle2,
  },
  {
    num: '04',
    title: 'We',
    accent: 'launch',
    desc: 'Goes live on your domain. Full access. Optional monthly maintenance available.',
    detail: 'Your domain',
    detailSub: 'You own it outright',
    icon: Zap,
  },
];

export function Process(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-10% 0px' });

  // Drives the progressive vertical-line fill as the user scrolls through the timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 40%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative px-5 py-24 md:px-8 md:py-32"
    >
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="drift absolute left-[10%] top-[25%] h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 60%)' }}
        />
        <div
          className="drift absolute right-[5%] bottom-[15%] h-[460px] w-[460px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)',
            animationDelay: '-9s',
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px]">
        {/* ============ Section heading ============ */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 18 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <div className="mb-5 inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#a67a20]" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#f5b84a]">
              How It Works
            </span>
          </div>
          <h2 className="font-semibold leading-[1.02] tracking-[-0.03em] text-[#efeae0] text-[clamp(2.25rem,5vw,3.75rem)]">
            From zero to{' '}
            <span className="serif-i gradient-warm">live</span> in 72 hours.
          </h2>
          <p className="mt-5 max-w-[560px] text-[1.02rem] leading-[1.65] text-[#c5beb1]">
            A four step process that moves as fast as you do. No endless discovery docs,
            no drip fed mockups. Just a built, reviewed, and launched site in three days.
          </p>
        </motion.div>

        {/* ============ Timeline ============ */}
        <div ref={timelineRef} className="relative">
          {/* Vertical rail: background + progressive fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0 hidden w-px md:block"
            style={{ left: 'calc(80px + 1.5rem)' }}
          >
            <div className="absolute inset-0 bg-white/5" />
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: 'top' }}
              className="absolute inset-0"
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(180deg, #ffd79a 0%, #f5b84a 40%, #ff6a5f 80%, #ff3b2e 100%)',
                  boxShadow: '0 0 14px rgba(245,184,74,0.55)',
                }}
              />
            </motion.div>
            {/* Additive glow */}
            <motion.div
              style={{ opacity: lineGlow }}
              className="absolute inset-0 blur-[2px]"
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    'linear-gradient(180deg, transparent, rgba(245,184,74,0.4) 50%, transparent)',
                }}
              />
            </motion.div>
          </div>

          {/* Steps */}
          <ol className="relative flex flex-col gap-14 md:gap-20">
            {STEPS.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} />
            ))}
          </ol>
        </div>

        {/* ============ 72-hour guarantee card ============ */}
        <GuaranteeCard />
      </div>
    </section>
  );
}

function StepRow({ step, index }: { step: Step; index: number }): ReactElement {
  const rowRef = useRef<HTMLLIElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-15% 0px -10% 0px' });
  const Icon = step.icon;

  return (
    <motion.li
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-[80px_1fr_auto] md:gap-10"
    >
      {/* Left: oversized number */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: index * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-start"
      >
        <span
          className="serif-i gradient-warm block leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)' }}
        >
          {step.num}
        </span>
      </motion.div>

      {/* Middle: title + description */}
      <div className="relative min-w-0 md:pt-2">
        {/* Timeline node dot (next to the rail, middle column) */}
        <div
          aria-hidden
          className="absolute -left-[calc(1.5rem+6px)] top-3 hidden h-3 w-3 md:block"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.05 + 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 rounded-full bg-[#ff3b2e]"
            style={{ boxShadow: '0 0 0 3px rgba(255,59,46,0.15), 0 0 18px rgba(255,59,46,0.6)' }}
          />
        </div>

        <div className="mb-3 inline-flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#f5b84a]" strokeWidth={2} />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#8a8376]">
            Step {step.num}
          </span>
        </div>
        <h3 className="font-semibold leading-[1.08] tracking-[-0.025em] text-[#efeae0] text-[clamp(1.5rem,2.8vw,2.1rem)]">
          {step.title}{' '}
          <span className="serif-i gradient-warm">{step.accent}</span>
        </h3>
        <p className="mt-3 max-w-[52ch] text-[1rem] leading-[1.65] text-[#c5beb1]">
          {step.desc}
        </p>
      </div>

      {/* Right: glass detail card */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.96 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3 }}
        className="glass-strong relative w-full overflow-hidden rounded-2xl p-5 md:w-[220px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-50 blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(245,184,74,0.35), transparent 70%)',
          }}
        />
        <div className="relative">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#8a8376]">
            Detail
          </span>
          <div className="serif-i gradient-warm mt-1.5 text-[1.9rem] leading-none">
            {step.detail}
          </div>
          <p className="mt-2 text-[0.78rem] leading-[1.45] text-[#c5beb1]">{step.detailSub}</p>
        </div>
      </motion.div>
    </motion.li>
  );
}

function GuaranteeCard(): ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-15% 0px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong glow-amber relative mt-20 overflow-hidden rounded-3xl p-7 md:mt-28 md:p-10"
      style={{ borderColor: 'rgba(245,184,74,0.35)' }}
    >
      {/* Glow washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)' }}
      />

      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
        {/* Shield */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5b84a]/20 to-[#ff3b2e]/20 ring-1 ring-[#f5b84a]/30 md:h-20 md:w-20">
          <ShieldCheck
            className="h-8 w-8 text-[#ffd79a] md:h-10 md:w-10"
            strokeWidth={1.7}
          />
        </div>

        <div className="flex-1">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-slow absolute inline-flex h-full w-full rounded-full bg-[#f5b84a] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f5b84a]" />
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[#ffd79a]">
              The Guarantee
            </span>
          </div>
          <h3 className="font-semibold leading-[1.08] tracking-[-0.025em] text-[#efeae0] text-[clamp(1.6rem,3vw,2.35rem)]">
            72 hour delivery{' '}
            <span className="serif-i gradient-warm">guarantee</span>.
          </h3>
          <p className="mt-3 max-w-[60ch] text-[1rem] leading-[1.65] text-[#c5beb1]">
            Your site goes live within 72 hours of our discovery call, or you get{' '}
            <em className="serif-i text-[#f5b84a]">$100 off</em>. No exceptions.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
