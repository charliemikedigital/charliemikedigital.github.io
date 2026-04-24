import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { LogoWordmark } from './Logo';
import { cn } from '@/lib/cn';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20));

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-8 py-3 md:py-3.5',
        'transition-[background,border] duration-500',
        scrolled
          ? 'bg-[#08070a]/80 backdrop-blur-2xl border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <a href="#top" aria-label="Charlie Mike Digital — home" className="relative z-10">
        <LogoWordmark compact />
      </a>

      <ul className="hidden md:flex items-center gap-1">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="relative px-3.5 py-2 text-sm font-medium text-[#8a8376] hover:text-[#efeae0] transition-colors rounded-md group"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-x-3 bottom-1 h-px bg-gradient-to-r from-transparent via-[#f5b84a]/60 to-transparent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <a
          href="tel:2815550847"
          className="hidden lg:inline-flex font-mono text-xs tracking-wider text-[#8a8376] hover:text-[#f5b84a] transition"
        >
          (281) 555-0847
        </a>
        <a
          href="#booking"
          className="btn-sweep group relative inline-flex items-center gap-2 rounded-full bg-[#ff3b2e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,59,46,0.55)] hover:shadow-[0_14px_40px_-8px_rgba(255,59,46,0.8)] transition-all duration-300"
        >
          <span className="relative z-[1] flex items-center gap-2">
            Book a Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </motion.nav>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#ff3b2e] via-[#f5b84a] to-[#ff6a5f]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
