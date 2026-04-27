import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Pricing — three build tiers + monthly care plans + add-ons grid.
 * Featured tier elevated, amber glow, shimmer-sweep CTA. Scroll-triggered
 * staggered entrance. Add-on tiles use compact mono-priced cards.
 */

type Tier = {
  name: string;
  label: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
  priceNote?: string;
};

const TIERS: Tier[] = [
  {
    name: 'Starter',
    label: 'Get Online',
    price: '$499',
    period: 'one time',
    blurb: 'Single page site, live in 72 hours.',
    features: [
      'Single page landing site',
      'Mobile responsive',
      'Contact form',
      'Google Maps embed',
      'Basic SEO setup',
      'Free hosting setup',
      '2 rounds of revisions',
      'Delivered in 72 hours',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Standard',
    label: 'Built to Convert',
    price: '$799',
    period: 'one time',
    blurb: 'The phone ringing package most clients pick.',
    features: [
      'Everything in Starter',
      'Online booking embed',
      'Google Business setup',
      'Animated stat counters',
      'Live Google Reviews widget',
      'Industry specific features',
      'Photo sourcing & optimization',
      'Full SEO meta setup',
    ],
    cta: 'Book Standard',
    featured: true,
  },
  {
    name: 'Premium',
    label: 'Full Package',
    price: '$1,299',
    period: 'one time',
    blurb: 'Copy, logo, AI chat. The whole kit.',
    features: [
      'Everything in Standard',
      'AI chat assistant',
      'Full page copywriting',
      'Logo design',
      'Email capture integration',
      'Custom contact page',
      'Priority 24hr turnaround',
    ],
    cta: 'Go Premium',
    priceNote: 'Includes $850+ in add ons',
  },
];

type CarePlan = {
  price: string;
  label: string;
  title: string;
  recommended?: boolean;
  features: string[];
};

const CARE_PLANS: CarePlan[] = [
  {
    price: '$75',
    label: 'Basic',
    title: 'Maintenance',
    features: [
      'Hosting management',
      'Uptime monitoring',
      'Security updates',
      'Monthly health check',
    ],
  },
  {
    price: '$149',
    label: 'Growth',
    title: 'Maintenance + Edits',
    recommended: true,
    features: [
      'Everything in Basic',
      'Up to 2hrs monthly edits',
      'Google review monitoring',
      'Priority response',
    ],
  },
  {
    price: '$249',
    label: 'Premium',
    title: 'Full Care',
    features: [
      'Everything in Growth',
      'Quarterly design refresh',
      'New page builds',
      'Same day support',
    ],
  },
];

type AddOn = {
  name: string;
  price: string;
  description: string;
  note?: string;
};

const ADDONS: AddOn[] = [
  { name: 'Online Booking', price: '+$100', description: 'Live scheduling, clients pick a time, you get notified.' },
  { name: 'AI Chat Assistant', price: '+$300', description: 'Smart widget trained on your business, answers 24/7. (API subscription ~$10/mo)' },
  { name: 'Google Business Setup', price: '+$150', description: 'Full profile created & optimized for local search.' },
  { name: 'Logo Design', price: '+$200', description: 'Professional design, multiple concepts, all file formats.' },
  { name: 'Full Copywriting', price: '+$200', description: 'Every word on the site written for you.' },
  {
    name: 'Google Reviews Widget',
    price: '+$100',
    description: 'Your real Google reviews displayed directly on your site. Social proof that builds trust instantly.',
    note: 'Included free in Standard & Premium',
  },
  { name: 'Live Weather Widget', price: '+$75', description: 'Local weather on your site (HVAC/outdoor).' },
  { name: 'Animated Counters', price: '+$75', description: 'Stats that count up on scroll.' },
  { name: 'Social Feed Embed', price: '+$100', description: 'Latest posts displayed live (feed subscription ~$10/mo).' },
  { name: 'Email List Signup', price: '+$150', description: 'Capture integrated with marketing platform.' },
  { name: 'SMS Text Button', price: '+$75', description: 'One tap text on mobile.' },
  { name: '5 Additional Pages', price: '+$150', description: 'Service area pages, team, FAQ, gallery.' },
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ['-10%', '20%']);
  const headerInView = useInView(sectionRef, { once: true, margin: '-10% 0px -10% 0px' });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
    >
      {/* Background orbs */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="absolute top-20 right-[-180px] h-[520px] w-[520px] rounded-full opacity-[0.22] blur-3xl pointer-events-none -z-10"
      >
        <div
          className="h-full w-full drift"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)' }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute bottom-10 left-[-160px] h-[440px] w-[440px] rounded-full opacity-[0.18] blur-3xl pointer-events-none -z-10"
      >
        <div
          className="h-full w-full drift"
          style={{
            background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)',
            animationDelay: '-9s',
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* =========== Header =========== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 max-w-[780px]"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b2e]" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#c5beb1]">
              Pricing
            </span>
          </div>
          <h2 className="font-semibold text-[clamp(2.25rem,5.2vw,4rem)] leading-[1] tracking-[-0.035em] text-[#efeae0]">
            Simple,{' '}
            <em className="serif-i gradient-warm not-italic">
              <span className="italic">honest</span>
            </em>{' '}
            pricing.
          </h2>
          <p className="mt-6 text-[1.02rem] leading-[1.65] text-[#c5beb1]">
            One time build fee. You own it forever. Optional monthly plans keep everything running smooth.
          </p>
        </motion.div>

        {/* =========== Tier cards =========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:items-center">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* =========== Monthly care =========== */}
        <div className="mt-24 md:mt-32">
          <CareHeader />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {CARE_PLANS.map((plan, i) => (
              <CareCard key={plan.label} plan={plan} index={i} />
            ))}
          </div>
        </div>

        {/* =========== Add-ons =========== */}
        <div className="mt-24 md:mt-32">
          <AddOnsHeader />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
            {ADDONS.map((a, i) => (
              <AddOnCard key={a.name} addon={a} index={i} />
            ))}
          </div>

          <p className="mt-8 max-w-[640px] text-[0.82rem] leading-[1.6] text-[#8a8376]">
            All prices are one time add ons to a build. Outside service fees (AI chat API, social feed provider)
            are billed separately by the provider.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/* Tier Card                                                             */
/* -------------------------------------------------------------------- */
function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });

  // Cursor 3D tilt (subtle, only on featured)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 160, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 160, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tier.featured) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.95,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('relative', tier.featured && 'md:-mt-6 md:mb-6')}
    >
      {/* Most popular flag */}
      {tier.featured && (
        <div className="absolute left-1/2 -top-4 -translate-x-1/2 z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5b84a] px-3.5 py-1.5 shadow-[0_10px_30px_-8px_rgba(245,184,74,0.55)]">
            <Sparkles size={12} strokeWidth={2.2} className="text-[#08070a]" />
            <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.25em] text-[#08070a]">
              Most Popular
            </span>
          </div>
        </div>
      )}

      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={
          tier.featured ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1200 } : undefined
        }
        className={cn(
          'relative rounded-2xl p-7 md:p-8 h-full flex flex-col will-change-transform',
          tier.featured
            ? 'glow-amber bg-gradient-to-b from-[#1f1c22] to-[#141318] border border-[#f5b84a]/40'
            : 'card-warm'
        )}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#8a8376]">
              {tier.name}
            </span>
            {tier.featured && (
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.25em] text-[#f5b84a]">
                Recommended
              </span>
            )}
          </div>
          <h3 className="mt-2 serif-i text-[2rem] md:text-[2.3rem] leading-[1.02] tracking-[-0.012em] text-[#efeae0]">
            {tier.label}
          </h3>
          <p className="mt-2 text-[0.92rem] text-[#c5beb1] leading-[1.55]">{tier.blurb}</p>
        </div>

        {/* Price */}
        <div className="mt-7 flex items-baseline gap-2">
          <span
            className={cn(
              'font-semibold text-[3rem] md:text-[3.4rem] leading-none tracking-[-0.03em] tabular',
              tier.featured ? 'gradient-warm' : 'text-[#efeae0]'
            )}
          >
            {tier.price}
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#8a8376]">
            {tier.period}
          </span>
        </div>

        {tier.priceNote && (
          <div className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[#f5b84a] flex items-center gap-1.5">
            <Sparkles size={11} strokeWidth={2.2} />
            {tier.priceNote}
          </div>
        )}

        <div className="hr-glow my-7" />

        {/* Features */}
        <ul className="flex-1 space-y-3">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span
                className={cn(
                  'mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full',
                  tier.featured
                    ? 'bg-[#f5b84a]/15 text-[#f5b84a]'
                    : 'bg-[#f5b84a]/10 text-[#f5b84a]'
                )}
              >
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="text-[0.92rem] leading-[1.5] text-[#efeae0]">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          {tier.featured ? (
            <a
              href="#booking"
              className="btn-sweep group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#ff3b2e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-10px_rgba(255,59,46,0.55)] hover:shadow-[0_22px_54px_-8px_rgba(255,59,46,0.8)] transition-all"
            >
              <span className="relative z-[1]">{tier.cta}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-[1] transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          ) : (
            <a
              href="#booking"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-[#efeae0] glass hover:bg-white/[0.06] transition"
            >
              {tier.cta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/* Care plans                                                            */
/* -------------------------------------------------------------------- */
function CareHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[680px]"
    >
      <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7ad0ff]" />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#c5beb1]">
          Monthly Care
        </span>
      </div>
      <h3 className="font-semibold text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.05] tracking-[-0.028em] text-[#efeae0]">
        Optional plans to keep it{' '}
        <em className="serif-i gradient-warm not-italic">
          <span className="italic">running smooth</span>
        </em>
        .
      </h3>
      <p className="mt-4 text-[0.98rem] leading-[1.6] text-[#c5beb1]">
        Cancel any time. Your site stays yours whether you're on a plan or not.
      </p>
    </motion.div>
  );
}

function CareCard({ plan, index }: { plan: CarePlan; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative rounded-2xl p-6 md:p-7 h-full flex flex-col',
        plan.recommended
          ? 'bg-gradient-to-b from-[#1d1b22] to-[#141318] border border-[#7ad0ff]/30'
          : 'card-warm'
      )}
    >
      {plan.recommended && (
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#7ad0ff] px-2.5 py-1 font-mono text-[0.54rem] font-bold uppercase tracking-[0.25em] text-[#08070a]">
          Recommended
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[#8a8376]">
          {plan.label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-semibold text-[1.9rem] leading-none tracking-[-0.02em] text-[#efeae0] tabular">
            {plan.price}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#8a8376]">/mo</span>
        </div>
      </div>
      <h4 className="mt-3 serif-i text-[1.55rem] leading-[1.05] tracking-[-0.012em] text-[#efeae0]">
        {plan.title}
      </h4>

      <div className="hr-glow my-5" />

      <ul className="space-y-2.5 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-[3px] inline-flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-[#f5b84a]/10 text-[#f5b84a]">
              <Check size={10} strokeWidth={3} />
            </span>
            <span className="text-[0.87rem] leading-[1.5] text-[#efeae0]">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */
/* Add-ons                                                               */
/* -------------------------------------------------------------------- */
function AddOnsHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[680px]"
    >
      <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f5b84a]" />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#c5beb1]">
          Add Ons
        </span>
      </div>
      <h3 className="font-semibold text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.05] tracking-[-0.028em] text-[#efeae0]">
        Mix &amp; match extras to{' '}
        <em className="serif-i gradient-warm not-italic">
          <span className="italic">level it up</span>
        </em>
        .
      </h3>
    </motion.div>
  );
}

function AddOnCard({ addon, index }: { addon: AddOn; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });

  // Cursor-tracking spotlight — drives a radial gradient that follows the mouse
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}% ${mouseY}%, rgba(245, 184, 74, 0.14), transparent 65%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -3 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-xl card-warm p-4 md:p-5 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-[#f5b84a]/35 hover:shadow-[0_18px_42px_-18px_rgba(245,184,74,0.28)]"
    >
      {/* Cursor-tracking amber spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlight }}
      />

      {/* Top-edge gradient highlight that animates in */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#f5b84a]/55 to-transparent scale-x-0 origin-center transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <h4 className="text-[0.95rem] font-semibold text-[#efeae0] leading-[1.25] transition-colors duration-300 group-hover:text-white">
          {addon.name}
        </h4>
        <div className="shrink-0 flex flex-col items-end gap-0.5">
          <span className="font-mono text-[0.85rem] font-semibold text-[#f5b84a] tabular transition-colors duration-300 group-hover:text-[#ffd79a]">
            {addon.price}
          </span>
        </div>
      </div>
      <p className="relative mt-2 text-[0.78rem] leading-[1.5] text-[#8a8376] transition-colors duration-300 group-hover:text-[#c5beb1]">
        {addon.description}
      </p>
      {addon.note && (
        <div className="relative mt-2.5 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#f5b84a]">
          <Sparkles size={10} strokeWidth={2.2} className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          {addon.note}
        </div>
      )}
    </motion.div>
  );
}
