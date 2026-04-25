import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Clock, ShieldCheck, Check } from 'lucide-react';

const PROOF_POINTS = [
  { icon: Clock, label: '30 minutes' },
  { icon: ShieldCheck, label: 'No pitch' },
  { icon: Check, label: 'Quote on the spot' },
];

export function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.body.appendChild(s);
    return () => {
      try {
        document.body.removeChild(s);
      } catch {
        /* no-op */
      }
    };
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-5 md:px-8 bg-[#0d0c10] overflow-hidden"
    >
      {/* Parallax background orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] h-[360px] w-[360px] rounded-full opacity-25 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 60%)', animationDelay: '-8s' }}
        />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,184,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,184,74,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-[900px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#3fd687] opacity-75 pulse-slow" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fd687]" />
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[#c5beb1]">
              Book a Call
            </span>
          </div>

          <h2 className="font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-[#efeae0]">
            Schedule your <em className="serif-i gradient-warm">free</em> consultation.
          </h2>

          <p className="mt-5 max-w-[620px] mx-auto text-[1.02rem] text-[#c5beb1]" style={{ lineHeight: 1.65 }}>
            30 minutes. No pitch. I'll look at your current online presence, tell you exactly what I'd build, and give
            you a quote on the spot.
          </p>

          {/* Proof chips */}
          <motion.ul
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
            }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {PROOF_POINTS.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 8, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
                }}
                className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5"
              >
                <Icon size={12} className="text-[#f5b84a]" strokeWidth={2.2} />
                <span className="text-[0.75rem] text-[#c5beb1]">{label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Calendly container */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-strong rounded-2xl p-2 md:p-3 border border-[#f5b84a]/15 shadow-[0_30px_80px_-30px_rgba(245,184,74,0.35)]"
        >
          {/* Browser-chrome style top bar */}
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1 rounded-md bg-black/30 px-3 py-1 text-[0.65rem] text-[#8a8376] font-mono truncate flex items-center gap-1.5">
              <span aria-hidden className="text-[#f5b84a]">&#x1F512;</span>
              Book a time
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.25em] text-[#f5b84a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3fd687] pulse-slow" />
              Live
            </span>
          </div>

          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget rounded-xl overflow-hidden bg-[#0d0c10]"
            data-url="https://calendly.com/matt-charliemikedigital/30min?hide_gdpr_banner=1&primary_color=ff3b2e"
            style={{ minWidth: 320, height: 700 }}
          />
        </motion.div>

        {/* Fallback / alt CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-center text-[0.82rem] text-[#8a8376]"
        >
          Prefer to type?{' '}
          <a
            href="#contact"
            className="text-[#f5b84a] hover:text-[#ffd79a] underline underline-offset-4 decoration-[#f5b84a]/30 hover:decoration-[#ffd79a] transition"
          >
            Send a message instead
          </a>
          .
        </motion.div>
      </div>
    </section>
  );
}
