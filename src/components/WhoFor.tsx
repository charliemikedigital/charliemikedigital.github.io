import { motion, useInView } from 'framer-motion';
import { useRef, type ReactElement } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Wrench,
  HardHat,
  Zap,
  Sprout,
  UtensilsCrossed,
  Car,
  Scissors,
  Dumbbell,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type Industry = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const SMALL_CELLS: Industry[] = [
  {
    icon: HardHat,
    title: 'Roofers & Contractors',
    desc: 'Insurance claims band, photo-forward portfolios, storm-damage intake.',
  },
  {
    icon: Zap,
    title: 'Electricians',
    desc: '24/7 emergency, licensed-bonded-insured trust row, fast call-now.',
  },
  {
    icon: Sprout,
    title: 'Landscapers',
    desc: 'Gallery-heavy, seasonal service grid, online estimates.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    desc: 'Editorial menu tabs, OpenTable reservations, hours at a glance.',
  },
  {
    icon: Car,
    title: 'Auto Shops',
    desc: 'Build trust: certifications, team photos, online booking.',
  },
  {
    icon: Scissors,
    title: 'Salons & Clinics',
    desc: 'Appointment booking, service menus, staff bios.',
  },
  {
    icon: Dumbbell,
    title: 'Gyms & Trainers',
    desc: 'Class schedules, intro-offer CTAs, membership signups.',
  },
];

const FEATURED_META: string[] = [
  'Average build: 48hrs',
  'Emergency pill, call tracking, quote form',
  'Typical package: Standard ($799)',
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function WhoFor(): ReactElement {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <section
      id="who-for"
      className="relative px-5 py-24 md:px-8 md:py-32"
    >
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="drift absolute -left-40 top-40 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)' }}
        />
        <div
          className="drift absolute -right-40 bottom-20 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #ff3b2e 0%, transparent 60%)',
            animationDelay: '-8s',
          }}
        />
      </div>

      <div className="mx-auto max-w-[1200px]">
        {/* ============ Section heading ============ */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-3xl md:mb-20"
        >
          <div className="mb-5 inline-flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#a67a20]" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#f5b84a]">
              Who This Is For
            </span>
          </div>
          <h2 className="font-semibold leading-[1.02] tracking-[-0.03em] text-[#efeae0] text-[clamp(2.25rem,5vw,3.75rem)]">
            Built for{' '}
            <span className="serif-i gradient-warm">businesses</span> like yours.
          </h2>
          <p className="mt-5 max-w-[560px] text-[1.02rem] leading-[1.65] text-[#c5beb1]">
            Trades, service businesses, restaurants &mdash; anywhere a clean, fast, conversion-shaped
            site beats a template. Every build is tuned to the patterns that actually move the needle
            in your industry.
          </p>
        </motion.div>

        {/* ============ Bento grid ============ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:grid-rows-2"
        >
          {/* ===== Featured cell: 2x2 ===== */}
          <FeaturedCell />

          {/* ===== Small cells ===== */}
          {SMALL_CELLS.map((c) => (
            <SmallCell key={c.title} industry={c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCell(): ReactElement {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="card-warm relative col-span-1 row-span-1 overflow-hidden rounded-2xl p-7 transition-colors duration-500 hover:border-[#f5b84a]/30 md:col-span-2 md:row-span-2 md:p-9 lg:col-span-2 lg:row-span-2"
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(245,184,74,0.35), transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,59,46,0.22), transparent 70%)' }}
      />

      <div className="relative flex h-full flex-col">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#f5b84a]/25 bg-[#f5b84a]/[0.05] px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-slow absolute inline-flex h-full w-full rounded-full bg-[#f5b84a] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#f5b84a]" />
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#ffd79a]">
            Most-requested build
          </span>
        </div>

        {/* Oversized icon */}
        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3b2e]/20 to-[#f5b84a]/20 ring-1 ring-white/10 md:h-20 md:w-20">
          <Wrench className="h-9 w-9 text-[#ffd79a] md:h-11 md:w-11" strokeWidth={1.6} />
        </div>

        {/* Headline */}
        <h3 className="font-semibold leading-[1.05] tracking-[-0.025em] text-[#efeae0] text-[clamp(1.7rem,2.6vw,2.35rem)]">
          Plumbers, HVAC &{' '}
          <span className="serif-i gradient-warm">Trades</span>
        </h3>

        <p className="mt-5 max-w-[46ch] text-[1rem] leading-[1.65] text-[#c5beb1]">
          Emergency-call sites with 24/7 CTAs, instant quote forms, and service-area SEO.{' '}
          <em className="serif-i text-[#f5b84a]">Six calls from Google week one</em> isn&rsquo;t rare &mdash; it&rsquo;s the point.
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Meta footer */}
        <ul className="mt-8 space-y-2 border-t border-white/5 pt-6">
          {FEATURED_META.map((m) => (
            <li key={m} className="flex items-start gap-3 text-[0.82rem] text-[#c5beb1]">
              <span aria-hidden className="mt-[0.55em] font-mono text-[#a67a20]">
                &mdash;
              </span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function SmallCell({ industry }: { industry: Industry }): ReactElement {
  const Icon = industry.icon;
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={cn(
        'glass group relative flex flex-col overflow-hidden rounded-2xl p-6',
        'transition-colors duration-500 hover:border-[#f5b84a]/30'
      )}
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(245,184,74,0.3), transparent 70%)' }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-all duration-500 group-hover:bg-[#f5b84a]/10 group-hover:ring-[#f5b84a]/30">
            <Icon
              className="h-5 w-5 text-[#ffd79a] transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.7}
            />
          </div>
          <ArrowRight
            className="h-4 w-4 -translate-x-1 text-[#54504a] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[#f5b84a] group-hover:opacity-100"
            strokeWidth={2}
          />
        </div>

        <h4 className="text-[1.02rem] font-semibold leading-[1.25] tracking-[-0.01em] text-[#efeae0]">
          {industry.title}
        </h4>
        <p className="mt-2 text-[0.86rem] leading-[1.55] text-[#8a8376]">{industry.desc}</p>
      </div>
    </motion.article>
  );
}
