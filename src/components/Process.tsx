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
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Free discovery',
    accent: 'call',
    desc: '30 minutes, no pitch. I learn your business and what you want the site to do.',
    detail: '~30 min',
    icon: Clock,
  },
  {
    num: '02',
    title: 'I build your',
    accent: 'site',
    desc: 'Built from scratch in 72 hours. Real photos, copy for your industry.',
    detail: '48hrs avg',
    icon: Wrench,
  },
  {
    num: '03',
    title: 'You review &',
    accent: 'approve',
    desc: "Full site before launch. Two rounds of revisions until you love it.",
    detail: '2 rounds',
    icon: CheckCircle2,
  },
  {
    num: '04',
    title: 'We',
    accent: 'launch',
    desc: 'Goes live on your domain. Full access. Optional monthly maintenance available.',
    detail: 'Your domain',
    icon: Zap,
  },
];

export function Process(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-10% 0px' });

  // Drives the progressive horizontal-line fill as the user scrolls past the track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 30%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
          className="mb-14 max-w-3xl md:mb-20"
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

        {/* ============ Horizontal track ============ */}
        <div ref={trackRef} className="relative">
          {/* Connector line — visible md+, scales from left to right with scroll */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 hidden md:block"
            style={{ top: 'calc(2.25rem + 18px)' }}
          >
            <div className="relative mx-[12.5%] h-px bg-white/8">
              <motion.div
                style={{ scaleX: lineScale, transformOrigin: 'left' }}
                className="absolute inset-0"
              >
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #ffd79a 0%, #f5b84a 40%, #ff6a5f 80%, #ff3b2e 100%)',
                    boxShadow: '0 0 14px rgba(245,184,74,0.55)',
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Step cards in a row (4 col on md+, stacked on mobile) */}
          <ol className="relative grid grid-cols-1 gap-7 md:grid-cols-4 md:gap-5 lg:gap-7">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} total={STEPS.length} />
            ))}
          </ol>
        </div>

        {/* ============ 72-hour guarantee card ============ */}
        <GuaranteeCard />
      </div>
    </section>
  );
}

function StepCard({ step, index, total }: { step: Step; index: number; total: number }): ReactElement {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -10% 0px' });
  const Icon = step.icon;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: Math.min(index * 0.1, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col items-start"
    >
      {/* Big italic step number + node dot lined up with the connector */}
      <div className="relative mb-4 flex w-full items-center justify-between">
        <span
          className="serif-i gradient-warm leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.6rem)' }}
        >
          {step.num}
        </span>
        {/* The node dot — sits on the connector line on desktop */}
        <motion.span
          aria-hidden
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block h-3 w-3 rounded-full bg-[#ff3b2e]"
          style={{
            boxShadow: '0 0 0 4px rgba(255,59,46,0.18), 0 0 20px rgba(255,59,46,0.55)',
          }}
        />
      </div>

      {/* Icon + step label */}
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] ring-1 ring-white/10">
          <Icon className="h-3.5 w-3.5 text-[#f5b84a]" strokeWidth={2} />
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[#8a8376]">
          Step {step.num}
        </span>
      </div>

      {/* Title + accent */}
      <h3 className="font-semibold leading-[1.1] tracking-[-0.022em] text-[#efeae0] text-[clamp(1.2rem,1.6vw,1.4rem)]">
        {step.title}{' '}
        <span className="serif-i gradient-warm">{step.accent}</span>
      </h3>

      {/* Description */}
      <p className="mt-2.5 text-[0.92rem] leading-[1.55] text-[#c5beb1]">
        {step.desc}
      </p>

      {/* Detail chip at bottom */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
        <span className="h-1 w-1 rounded-full bg-[#f5b84a]" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#ffd79a]">
          {step.detail}
        </span>
      </div>

      {/* Mobile-only mini-rule between cards */}
      {index < total - 1 && (
        <div
          aria-hidden
          className="md:hidden mt-7 h-px w-full bg-gradient-to-r from-transparent via-[#54504a] to-transparent"
        />
      )}
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
      className="glass-strong glow-amber relative mt-16 overflow-hidden rounded-3xl p-7 md:mt-20 md:p-10"
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
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5b84a]/20 to-[#ff3b2e]/20 ring-1 ring-[#f5b84a]/30 md:h-20 md:w-20">
          <ShieldCheck className="h-8 w-8 text-[#ffd79a] md:h-10 md:w-10" strokeWidth={1.7} />
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
