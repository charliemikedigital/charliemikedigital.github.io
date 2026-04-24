import { motion, useInView } from 'framer-motion';
import { useRef, type ReactElement } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Phone,
  UtensilsCrossed,
  Building2,
  Calendar,
  MessageSquareText,
  Wrench,
  ArrowRight,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const SERVICES: Service[] = [
  {
    icon: Phone,
    title: 'Trades & Home Services',
    desc: 'Plumbers, roofers, HVAC, electricians, landscapers. Designed to generate calls and quote requests.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants & Hospitality',
    desc: 'Full menus, online reservations, hours and location. Everything a diner needs before they walk in.',
  },
  {
    icon: Building2,
    title: 'Local Service Businesses',
    desc: 'Any local business that needs a professional web presence fast: salons, auto shops, gyms, clinics.',
  },
  {
    icon: Calendar,
    title: 'Online Booking Integration',
    desc: 'Online booking embedded directly in your site so customers can schedule 24/7 without calling.',
  },
  {
    icon: MessageSquareText,
    title: 'AI Chat Assistants',
    desc: 'A smart chat widget trained on your business info. Answers questions and captures leads around the clock.',
  },
  {
    icon: Wrench,
    title: 'Ongoing Maintenance',
    desc: 'Monthly care plans so your site stays fast, updated, and working without you lifting a finger.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Services(): ReactElement {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: '-10% 0px' });

  return (
    <section id="services" className="relative px-5 py-24 md:px-8 md:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="drift absolute -right-40 top-20 h-[460px] w-[460px] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 60%)' }}
        />
        <div
          className="drift absolute -left-40 bottom-20 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)',
            animationDelay: '-10s',
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
              What I Build
            </span>
          </div>
          <h2 className="font-semibold leading-[1.02] tracking-[-0.03em] text-[#efeae0] text-[clamp(2.25rem,5vw,3.75rem)]">
            Websites that{' '}
            <span className="serif-i gradient-warm">work as hard</span> as you do.
          </h2>
          <p className="mt-5 max-w-[560px] text-[1.02rem] leading-[1.65] text-[#c5beb1]">
            Every site is built from scratch for your industry, your customers, and your goals.
            Nothing recycled.
          </p>
        </motion.div>

        {/* ============ 3x2 grid ============ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }): ReactElement {
  const Icon = service.icon;
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="card-warm group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-colors duration-500 hover:border-[#f5b84a]/40 md:p-8"
    >
      {/* Corner wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(245,184,74,0.3), transparent 70%)' }}
      />
      {/* Subtle scan line on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(245,184,74,0.55), transparent)',
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Icon + arrow row */}
        <div className="mb-6 flex items-center justify-between">
          <motion.div
            whileHover={{ rotate: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-all duration-500 group-hover:bg-[#f5b84a]/10 group-hover:ring-[#f5b84a]/40"
          >
            <Icon
              className="h-[22px] w-[22px] text-[#ffd79a] transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
              strokeWidth={1.7}
            />
          </motion.div>
          <ArrowRight
            className="h-4 w-4 -translate-x-1 text-[#54504a] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:text-[#f5b84a] group-hover:opacity-100"
            strokeWidth={2}
          />
        </div>

        <h3 className="text-[1.12rem] font-semibold leading-[1.25] tracking-[-0.012em] text-[#efeae0]">
          {service.title}
        </h3>
        <p
          className="mt-2.5 text-[0.92rem] leading-[1.6] text-[#c5beb1]"
          dangerouslySetInnerHTML={{ __html: service.desc }}
        />
      </div>
    </motion.article>
  );
}
