import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Testimonials — 6-card auto-advancing carousel (3 visible desktop, 1 mobile),
 * plus a full-bleed editorial pull-quote on signal-red with noise overlay.
 * Pause on hover, AnimatePresence crossfade between pages, dot nav.
 */

type Review = {
  quote: string;
  name: string;
  business: string;
};

const REVIEWS: Review[] = [
  {
    quote:
      "I had zero web presence. Guy down the street was getting all the calls and I knew his work wasn't better than mine. First week the site went live I got two calls from Google. Haven't looked back.",
    name: 'Carlos Rivera',
    business: 'Rivera Plumbing & Drain',
  },
  {
    quote:
      'Thought it was going to be another sales pitch. He sent me a full demo before I spent anything. Answered every question same day, kept me posted the whole time, no surprises.',
    name: 'Mike T.',
    business: 'Lone Star Roofing Co.',
  },
  {
    quote:
      "I'm not a tech person. I just needed something that made me look legit and got the phone ringing. He walked me through everything, charged exactly what he quoted, and the site paid for itself inside 30 days.",
    name: 'James K.',
    business: 'Voltage Electric Co.',
  },
  {
    quote:
      'We were paying another company $200 a month just for hosting and they never updated anything. Matt built us a better site for a flat fee and now we actually own it. Should have switched years ago.',
    name: 'Danny Nguyen',
    business: 'PolarAir HVAC Services',
  },
  {
    quote:
      'I sent him some photos of our jobs and he turned it into a site that actually looks like a real company. Customers tell me all the time that we look way more professional than the competition now.',
    name: 'Marcus G.',
    business: 'Green Edge Lawn & Landscape',
  },
  {
    quote:
      'Our old site hadn’t been touched in four years. Matt rebuilt the whole thing with our full menu, hours, and a reservation form. We started getting online reservations the same week it launched.',
    name: 'Sofia Ramirez',
    business: 'Mesa Kitchen & Bar',
  },
];

const PER_PAGE_DESKTOP = 3;
const AUTO_MS = 6000;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ['-8%', '18%']);
  const headerInView = useInView(sectionRef, { once: true, margin: '-10% 0px -10% 0px' });

  /* ---------- Carousel state ---------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const perPage = isMobile ? 1 : PER_PAGE_DESKTOP;
  const pageCount = Math.max(1, Math.ceil(REVIEWS.length / perPage));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  // Clamp page if perPage changes
  useEffect(() => {
    if (page > pageCount - 1) setPage(0);
  }, [pageCount, page]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, pageCount]);

  const pageReviews = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
    >
      {/* Parallax background orb */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="absolute top-10 -right-40 h-[520px] w-[520px] rounded-full opacity-[0.22] blur-3xl pointer-events-none -z-10"
      >
        <div
          className="h-full w-full drift"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)' }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full opacity-[0.18] blur-3xl pointer-events-none -z-10"
      >
        <div
          className="h-full w-full drift"
          style={{
            background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)',
            animationDelay: '-7s',
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1200px]">
        {/* ========== Header ========== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 max-w-[720px]"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b84a]" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#c5beb1]">
              What clients say
            </span>
          </div>
          <h2 className="font-semibold text-[clamp(2.25rem,5.2vw,4rem)] leading-[1] tracking-[-0.035em] text-[#efeae0]">
            Results in{' '}
            <em className="serif-i gradient-warm not-italic">
              <span className="italic">their words</span>
            </em>
            .
          </h2>
        </motion.div>
      </div>

      {/* ========== FULL-BLEED EDITORIAL PULL-QUOTE ========== */}
      <PullQuote />

      <div className="relative mx-auto max-w-[1200px] mt-24 md:mt-32">
        {/* ========== Carousel ========== */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative"
        >
          <div className="relative min-h-[340px] md:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${page}-${perPage}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  'grid gap-5 md:gap-6',
                  isMobile ? 'grid-cols-1' : 'grid-cols-3'
                )}
              >
                {pageReviews.map((r, i) => (
                  <ReviewCard key={`${page}-${i}-${r.name}`} review={r} delay={i * 0.08} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: pageCount }).map((_, i) => {
              const active = i === page;
              return (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to review page ${i + 1}`}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'group relative h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    active
                      ? 'w-10 bg-[#f5b84a]'
                      : 'w-2 bg-[#3a3540] hover:bg-[#54504a]'
                  )}
                >
                  {active && (
                    <motion.span
                      key={`progress-${page}-${paused}`}
                      className="absolute inset-y-0 left-0 rounded-full bg-[#ff3b2e]/70"
                      initial={{ width: '0%' }}
                      animate={{ width: paused ? '0%' : '100%' }}
                      transition={{
                        duration: paused ? 0 : AUTO_MS / 1000,
                        ease: 'linear',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pause indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[0.62rem] uppercase tracking-[0.25em] font-mono text-[#54504a]">
            <span
              className={cn(
                'inline-block h-1.5 w-1.5 rounded-full',
                paused ? 'bg-[#f5b84a]' : 'bg-[#3fd687]'
              )}
            />
            {paused ? 'Paused on hover' : 'Auto advancing'}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */
/* Review card                                                           */
/* -------------------------------------------------------------------- */
function ReviewCard({ review, delay = 0 }: { review: Review; delay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-warm relative rounded-2xl p-6 md:p-7 h-full flex flex-col"
    >
      {/* Stars */}
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            strokeWidth={1.4}
            className="text-[#f5b84a]"
            fill="#f5b84a"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="mt-5 serif-i text-[1.12rem] md:text-[1.18rem] leading-[1.5] text-[#efeae0]">
        <span aria-hidden className="text-[#f5b84a]/60">&ldquo;</span>
        {review.quote}
        <span aria-hidden className="text-[#f5b84a]/60">&rdquo;</span>
      </blockquote>

      {/* Attribution */}
      <div className="mt-auto pt-6">
        <div className="hr-glow mb-4" />
        <div className="flex items-baseline justify-between gap-3">
          <cite className="not-italic text-[0.92rem] font-semibold text-[#efeae0]">
            {review.name}
          </cite>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[#a67a20]">
            {review.business}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------- */
/* Full-bleed editorial pull-quote                                       */
/* -------------------------------------------------------------------- */
function PullQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <div
      ref={ref}
      className="relative w-screen left-1/2 right-1/2 -mx-[50vw] mt-16 md:mt-20 overflow-hidden noise"
      style={{
        background:
          'linear-gradient(115deg, #c01f16 0%, #ff3b2e 45%, #ff6a5f 100%)',
      }}
    >
      {/* Floating huge ghost quotation mark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 0.16, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-10 md:-top-16 left-4 md:left-12 serif-i text-[16rem] md:text-[26rem] leading-none text-white/20 select-none"
      >
        &ldquo;
      </motion.div>

      {/* Decorative ornament dashes */}
      <div aria-hidden className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/70">
          A word from a client
        </span>
        <span className="h-px w-10 bg-white/40" />
      </div>

      <motion.div
        style={{ y: quoteY }}
        className="relative mx-auto max-w-[1200px] px-5 md:px-8 py-24 md:py-36"
      >
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="serif-i text-white leading-[0.98] tracking-[-0.025em] text-[clamp(2.75rem,8vw,7.5rem)]"
        >
          Paid for itself inside 30 days.
        </motion.blockquote>

        <motion.figcaption
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-white/60" />
          <span className="text-[0.88rem] md:text-[0.95rem] text-white/90">
            <span className="font-semibold">James K.</span>
            <span className="mx-2 text-white/50">·</span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-white/75">
              Voltage Electric Co.
            </span>
          </span>
        </motion.figcaption>

        {/* Corner ornaments */}
        <div aria-hidden className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center gap-3">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-white/70 tabular">
            Review · 03 / 06
          </span>
        </div>
      </motion.div>
    </div>
  );
}
