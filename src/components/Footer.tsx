import { motion, useInView } from 'framer-motion';
import { useRef, type ComponentType, type SVGProps } from 'react';
import { Mail } from 'lucide-react';
import { LogoWordmark } from './Logo';

const ICON_LINKS: Array<{ label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { label: 'Email', href: 'mailto:matt@charliemikedigital.com', icon: Mail },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <footer
      ref={ref}
      className="relative border-t border-[#2a2730] bg-[#0d0c10] py-12 px-5 md:px-8 text-center overflow-hidden"
    >
      {/* Ambient orb */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 h-[360px] w-[560px] rounded-full opacity-25 blur-3xl drift"
          style={{ background: 'radial-gradient(ellipse, #f5b84a 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-[900px] flex flex-col items-center gap-6">
        {/* Top gradient divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-[60px] origin-center"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(245,184,74,0.7), transparent)',
          }}
        />

        {/* Veteran-owned pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#3fd687] opacity-75 pulse-slow" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fd687]" />
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#c5beb1]">
            Veteran Owned · Houston, TX
          </span>
        </motion.div>

        {/* Logo wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="scale-110 md:scale-125 my-2"
        >
          <LogoWordmark />
        </motion.div>

        {/* Icon row */}
        <motion.ul
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
          }}
          className="flex items-center gap-3"
        >
          {ICON_LINKS.map(({ label, href, icon: Icon }) => (
            <motion.li
              key={label}
              variants={{
                hidden: { opacity: 0, y: 8, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
              }}
            >
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="group flex h-10 w-10 items-center justify-center rounded-full glass border-[#2a2730] hover:border-[#f5b84a]/50 hover:bg-white/[0.05] transition-colors"
              >
                <Icon
                  size={15}
                  strokeWidth={2}
                  className="text-[#c5beb1] group-hover:text-[#f5b84a] transition-colors"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-2 text-[0.85rem] text-[#c5beb1]"
        >
          © 2025 Charlie Mike Digital LLC ·{' '}
          <em
            className="gradient-warm"
            style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Continue Mission
          </em>
        </motion.p>

        {/* Domain */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-mono text-[0.72rem] text-[#8a8376] tracking-wide"
        >
          charliemikedigital.com
        </motion.div>

        {/* Legal links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center gap-3 text-[0.72rem] text-[#8a8376]"
        >
          <a
            href="#"
            className="hover:text-[#efeae0] transition-colors"
          >
            Privacy
          </a>
          <span className="h-1 w-1 rounded-full bg-[#54504a]" aria-hidden />
          <a
            href="#"
            className="hover:text-[#efeae0] transition-colors"
          >
            Terms
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
