import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Charlie Mike Digital monogram — CM set inside a military-style chevron
 * with subtle "target" ring. Designed to read equally as:
 *  - a monogram (CM, tied to "Continue Mission")
 *  - a compass/target mark (veteran/trade precision)
 */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <linearGradient id="cm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd79a" />
          <stop offset="50%" stopColor="#f5b84a" />
          <stop offset="100%" stopColor="#ff6a5f" />
        </linearGradient>
        <linearGradient id="cm-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1a20" />
          <stop offset="100%" stopColor="#0d0c10" />
        </linearGradient>
      </defs>

      {/* Background square with warm ink gradient */}
      <rect x="1" y="1" width="62" height="62" rx="14" fill="url(#cm-dark)" stroke="url(#cm-grad)" strokeWidth="1.25" />

      {/* Outer chevron strokes (military-style rank) */}
      <path
        d="M10 22 L32 10 L54 22"
        stroke="url(#cm-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M14 28 L32 18 L50 28"
        stroke="url(#cm-grad)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />

      {/* C letterform */}
      <path
        d="M30 38 C 26 38 22 42 22 46 C 22 50 26 54 30 54"
        stroke="#efeae0"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* M letterform */}
      <path
        d="M34 54 L34 38 L38 46 L42 38 L42 54"
        stroke="#efeae0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Target dot — signal red */}
      <circle cx="32" cy="14" r="1.5" fill="#ff3b2e" />
    </motion.svg>
  );
}

export function LogoWordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMark size={compact ? 34 : 42} />
      <div className="flex flex-col leading-tight">
        <span
          className="text-[1.02rem] font-semibold tracking-tight text-[#efeae0]"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '1.2rem', letterSpacing: '-0.01em' }}
        >
          Charlie <span className="gradient-warm">Mike</span>
        </span>
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-[#8a8376]">
          Digital
        </span>
      </div>
    </div>
  );
}
