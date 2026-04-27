import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Work — portfolio grid with live-demo case studies.
 * Maximalist motion: scroll parallax orbs, staggered entrance, cursor-tracking
 * 3D tilt on every card, hover overlay with "Visit Live Site" pill.
 */

type CaseStudy = {
  slug: string;
  business: string;
  industry: string;
  eyebrow: string;
  description: string;
  featured?: boolean;
};

const CASES: CaseStudy[] = [
  {
    slug: 'restaurant-mesa',
    business: 'Mesa Kitchen & Bar',
    industry: 'Restaurant',
    eyebrow: 'Restaurant · Featured',
    description:
      "Editorial magazine layout with oversized italic serif headlines, chalkboard specials, printed menu leader dots, and a live 'Available Tonight' reservation pill.",
    featured: true,
  },
  {
    slug: 'plumber-landing',
    business: 'Rivera Plumbing & Drain',
    industry: 'Plumbing',
    eyebrow: 'Plumbing',
    description:
      'Navy + brass editorial layout. Rotated 24/7 emergency stamp, live calls answered ticker, circular licensed bonded insured crest, Houston service area map with pulsing markers.',
  },
  {
    slug: 'hvac-polarair',
    business: 'PolarAir HVAC Services',
    industry: 'HVAC',
    eyebrow: 'HVAC',
    description:
      'Animated SVG thermometer pulling live Houston temp from a weather API, summer/winter toggle that restyles the whole site in real time, dual Cool/Heat CTAs.',
  },
  {
    slug: 'landscaper-greenedge',
    business: 'Green Edge Lawn & Landscape',
    industry: 'Landscaping',
    eyebrow: 'Landscaping',
    description:
      'Hand drawn botanical SVGs, Polaroid style gallery with handwritten captions, real photography throughout.',
  },
  {
    slug: 'roofer-lonestar',
    business: 'Lone Star Roofing Co.',
    industry: 'Roofing',
    eyebrow: 'Roofing',
    description:
      "Circular trade crest using SVG textPath, Texas star motifs, dark metal 'Since 1998' plaque with live 28+ years count, fractal noise worn paper overlays.",
  },
  {
    slug: 'electrician-voltage',
    business: 'Voltage Electric Co.',
    industry: 'Electrical',
    eyebrow: 'Electrical',
    description:
      'Full background flickering lightning SVG with power surge keyframes, animated voltage gauge with settling needle, circuit board pattern, monospace readouts throughout.',
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Background orb parallax
  const orbOneY = useTransform(scrollYProgress, [0, 1], ['-10%', '30%']);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], ['10%', '-25%']);

  const headlineInView = useInView(sectionRef, { once: true, margin: '-10% 0px -10% 0px' });

  const featured = CASES[0];
  const rest = CASES.slice(1);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
    >
      {/* Parallax gradient orbs */}
      <motion.div
        aria-hidden
        style={{ y: orbOneY }}
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-[0.28] blur-3xl pointer-events-none -z-10"
      >
        <div
          className="h-full w-full drift"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)' }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: orbTwoY }}
        className="absolute -bottom-32 -right-24 h-[460px] w-[460px] rounded-full opacity-[0.22] blur-3xl pointer-events-none -z-10"
      >
        <div
          className="h-full w-full drift"
          style={{
            background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)',
            animationDelay: '-8s',
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* =========== Header =========== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b84a]" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#c5beb1]">
              Portfolio
            </span>
          </div>
          <h2 className="font-semibold text-[clamp(2.25rem,5.2vw,4rem)] leading-[1] tracking-[-0.035em] text-[#efeae0] max-w-[18ch]">
            Six industries. Six{' '}
            <em className="serif-i gradient-warm not-italic">
              <span className="italic">completely different</span>
            </em>{' '}
            builds.
          </h2>
          <p className="mt-6 max-w-[540px] text-[1.02rem] leading-[1.65] text-[#c5beb1]">
            Each one built from scratch for that specific business type. No recycled templates.
          </p>
        </motion.div>

        {/* =========== Grid =========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Featured card — spans 2 cols on md+, 2 rows on lg */}
          <CaseCard
            key={featured.slug}
            data={featured}
            index={0}
            className="md:col-span-2 lg:row-span-2"
          />
          {rest.map((c, i) => (
            <CaseCard key={c.slug} data={c} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/* Case Card — cursor-tracking 3D tilt, hover overlay, staggered entry  */
/* -------------------------------------------------------------------- */
function CaseCard({
  data,
  index,
  className,
}: {
  data: CaseStudy;
  index: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-12% 0px -12% 0px' });

  // Cursor-follow tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 160,
    damping: 18,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 160,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const isFeatured = Boolean(data.featured);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: Math.min(index * 0.08, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('group relative', className)}
    >
      <a
        href={`/sites/${data.slug}`}
        target="_blank"
        rel="noopener"
        aria-label={`View ${data.business} live demo`}
        className="block relative focus-visible:outline-none"
      >
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
          className={cn(
            'relative card-warm rounded-2xl overflow-hidden will-change-transform transition-[box-shadow,border-color] duration-500',
            'hover:border-[#3a3540]',
            isFeatured && 'glow-amber'
          )}
        >
          {/* ---- Image ---- */}
          <div
            className={cn(
              'relative overflow-hidden',
              isFeatured ? 'aspect-[16/9] lg:aspect-[4/3]' : 'aspect-[16/10]'
            )}
          >
            <img
              src={`/sites/thumbnails/${data.slug}.jpg`}
              alt={`${data.business} live site screenshot`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              loading="lazy"
              width={1200}
              height={750}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* "Visit Live Site" pill — appears on hover */}
            <div className="absolute inset-0 flex items-end justify-start p-5 md:p-6">
              <motion.div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] shadow-lg',
                  'translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isFeatured
                    ? 'bg-[#f5b84a] text-[#08070a]'
                    : 'bg-[#ff3b2e] text-white'
                )}
              >
                Visit Live Site
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>

            {/* Eyebrow badge, top-left */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-[#f5b84a]">
                {isFeatured && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f5b84a] pulse-slow" />
                )}
                {data.eyebrow}
              </span>
            </div>

            {/* Featured corner stamp */}
            {isFeatured && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff3b2e] px-3 py-1 font-mono text-[0.55rem] font-bold uppercase tracking-[0.25em] text-white shadow-lg">
                  Featured Build
                </span>
              </div>
            )}
          </div>

          {/* ---- Meta block ---- */}
          <div className="relative p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-[#8a8376]">
                  {data.industry}
                </span>
                <h3
                  className={cn(
                    'mt-1.5 serif-i text-[#efeae0] leading-[1.05] tracking-[-0.012em]',
                    isFeatured ? 'text-[2rem] md:text-[2.4rem]' : 'text-[1.5rem] md:text-[1.7rem]'
                  )}
                >
                  {data.business}
                </h3>
              </div>
              <ArrowUpRight
                className="mt-1 shrink-0 text-[#8a8376] group-hover:text-[#f5b84a] transition-colors duration-400"
                size={isFeatured ? 24 : 20}
                strokeWidth={1.8}
              />
            </div>

            <p
              className={cn(
                'mt-3 text-[#c5beb1] leading-[1.55]',
                isFeatured
                  ? 'text-[0.98rem] max-w-[58ch]'
                  : 'text-[0.88rem] line-clamp-2'
              )}
            >
              {data.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#f5b84a]">
                View live
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-[#54504a]">
                {data.slug}
              </span>
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}
