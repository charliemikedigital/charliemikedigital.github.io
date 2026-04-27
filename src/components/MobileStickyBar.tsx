import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';

/**
 * Mobile-only sticky action bar that lives at the bottom of the viewport.
 * Two split buttons: Call Now (tel:) + Text Us (sms:). Hidden on md+ where
 * the desktop nav already has the contact CTAs.
 *
 * Reveals after the user has scrolled past the hero so it doesn't compete
 * with the hero's primary "Get a free quote" CTA on first paint.
 */
export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 600));

  return (
    <motion.div
      aria-label="Quick contact"
      initial={{ y: 80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden fixed bottom-3 inset-x-3 z-40 flex gap-2 rounded-full p-1.5 bg-[#0d0c10]/85 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <a
        href="tel:+18325342485"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ff3b2e] py-3 text-[0.88rem] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(255,59,46,0.55)] active:scale-[0.97] transition-transform"
      >
        <Phone size={15} strokeWidth={2.5} />
        Call Now
      </a>
      <a
        href="sms:+18325342485"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-3 text-[0.88rem] font-semibold text-[#efeae0] hover:border-[#f5b84a]/40 active:scale-[0.97] transition-[transform,border-color]"
      >
        <MessageSquare size={15} strokeWidth={2.4} />
        Text Us
      </a>
    </motion.div>
  );
}
