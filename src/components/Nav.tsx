import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Mail } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20));

  // Lock body scroll while the mobile menu is open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 md:px-8 py-3 md:py-3.5',
          'transition-[background,border] duration-500',
          scrolled || open
            ? 'bg-[#08070a]/85 backdrop-blur-2xl border-b border-white/5'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <a
          href="#top"
          aria-label="Charlie Mike Digital. Home"
          className="relative z-[2]"
          onClick={() => setOpen(false)}
        >
          <LogoWordmark compact />
        </a>

        {/* Desktop links */}
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

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Desktop CTA */}
          <a
            href="#booking"
            className="btn-sweep hidden md:inline-flex group relative items-center gap-2 rounded-full bg-[#ff3b2e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(255,59,46,0.55)] hover:shadow-[0_14px_40px_-8px_rgba(255,59,46,0.8)] transition-all duration-300"
          >
            <span className="relative z-[1] flex items-center gap-2">
              Book a Call
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          {/* Mobile compact CTA — pinned in the nav so it stays visible while scrolling */}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="btn-sweep md:hidden group relative inline-flex h-11 items-center gap-1.5 rounded-full bg-[#ff3b2e] px-3.5 text-[0.78rem] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(255,59,46,0.55)] active:scale-[0.97] transition-transform whitespace-nowrap"
          >
            <span className="relative z-[1] flex items-center gap-1.5">
              Book a Call
              <ArrowRight size={12} strokeWidth={2.6} />
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'md:hidden relative z-[2] inline-flex h-11 w-11 items-center justify-center rounded-full',
              'border border-white/10 bg-white/[0.04] text-[#efeae0]',
              'hover:border-[#f5b84a]/40 hover:bg-[#f5b84a]/[0.08] transition-colors'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <X size={20} strokeWidth={2.4} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <Menu size={20} strokeWidth={2.4} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ============== MOBILE MENU OVERLAY ============== */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              key="backdrop"
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-[#08070a]/70 backdrop-blur-[2px] cursor-default"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-[60px] inset-x-3 z-40 origin-top rounded-2xl border border-white/10 bg-[#0d0c10]/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden"
            >
              {/* Decorative gradient orbs inside the drawer */}
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60">
                <div
                  className="absolute -top-20 -right-10 h-60 w-60 rounded-full blur-3xl opacity-40"
                  style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 65%)' }}
                />
                <div
                  className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full blur-3xl opacity-30"
                  style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 65%)' }}
                />
              </div>

              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                }}
                className="flex flex-col px-2 py-3"
              >
                {LINKS.map((l) => (
                  <motion.li
                    key={l.href}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-4 text-[1.08rem] font-medium text-[#efeae0] hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors"
                    >
                      <span>{l.label}</span>
                      <ArrowRight
                        size={16}
                        strokeWidth={2.2}
                        className="text-[#54504a] transition-all group-hover:text-[#f5b84a]"
                      />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="px-4 pb-5 pt-2">
                <div className="hr-glow my-2" />

                <a
                  href="#booking"
                  onClick={() => setOpen(false)}
                  className="btn-sweep mt-4 group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#ff3b2e] px-5 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_16px_40px_-10px_rgba(255,59,46,0.55)]"
                >
                  <span className="relative z-[1]">Book a free 30-min call</span>
                  <ArrowRight size={16} strokeWidth={2.5} className="relative z-[1]" />
                </a>

                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2.5 group inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[0.88rem] font-medium text-[#c5beb1] hover:text-[#efeae0] border border-white/10 hover:border-[#f5b84a]/35 transition-colors"
                >
                  <Mail size={14} strokeWidth={2.2} />
                  Send a message
                </a>

                <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[#54504a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3fd687] pulse-slow" />
                  Veteran owned
                  <span className="text-[#3a3540]">·</span>
                  Houston, TX
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
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
