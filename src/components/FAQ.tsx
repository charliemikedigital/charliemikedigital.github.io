import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type Faq = { q: string; a: React.ReactNode };

const FAQS: Faq[] = [
  {
    q: "Do I actually own the site when it's done?",
    a: (
      <>
        Yes. The code, the design, the domain. All of it is yours. I host it for you on my infrastructure at no
        extra cost, but if you ever want to leave, I hand you every file and you can host it anywhere. No lock in,
        no proprietary platform, no monthly ransom. You're never stuck with me.
      </>
    ),
  },
  {
    q: 'How do you build a website in 72 hours?',
    a: (
      <>
        I've built enough sites for enough industries that I know exactly what works. I'm not starting from zero
        every time. I have a proven process and I stick to it. The 30-minute discovery call gives me everything I
        need, and I get to work immediately after. No committees, no approval chains, no waiting around.
      </>
    ),
  },
  {
    q: 'What if I already have a domain?',
    a: (
      <>
        We use it. I'll point your existing domain to the new site. If you don't have one, I'll help you pick one
        out and get it set up. Either way it's included.
      </>
    ),
  },
  {
    q: "What if I'm not happy with the design?",
    a: (
      <>
        Every package includes two rounds of revisions. You see the full site before anything goes live. I don't
        launch until you're completely happy with it. Most clients love the first version, but if something needs
        to change, we change it.
      </>
    ),
  },
  {
    q: 'What happens if I need edits later?',
    a: (
      <>
        If you're on a care plan, edits are included depending on your tier. If you're not on a plan, I do one off
        edits at an hourly rate. Or since you own the site, you can edit it yourself or hire anyone else. You're
        never stuck with me.
      </>
    ),
  },
  {
    q: 'Do you do SEO?',
    a: (
      <>
        Every site includes basic SEO setup: page titles, meta descriptions, mobile optimization, fast load times,
        proper heading structure. That alone is more than most small business sites have. Full ongoing SEO
        campaigns are a different service, but the foundation is built in from day one.
      </>
    ),
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      {/* Background parallax orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-[10%] -left-32 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-[10%] -right-24 h-[320px] w-[320px] rounded-full opacity-30 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 60%)', animationDelay: '-9s' }}
        />
      </div>

      <div className="relative mx-auto max-w-[900px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b84a] pulse-slow" />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[#c5beb1]">FAQ</span>
          </div>
          <h2 className="font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-[#efeae0]">
            Questions I get <em className="serif-i gradient-warm">all the time</em>.
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.ul
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="flex flex-col gap-3.5"
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.li
                key={faq.q}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={cn(
                  'group rounded-xl border transition-colors',
                  isOpen
                    ? 'glass-strong border-[#f5b84a]/35'
                    : 'glass border-[#2a2730] hover:border-[#3a3540]'
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-5 md:px-7 py-5 md:py-6 text-left"
                >
                  <span className="flex items-start gap-4">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-[#a67a20] mt-1.5 tabular">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.02rem] md:text-[1.12rem] font-semibold leading-snug tracking-[-0.012em] text-[#efeae0]">
                      {faq.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      'shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                      isOpen
                        ? 'border-[#f5b84a]/50 bg-[#f5b84a]/10 text-[#f5b84a]'
                        : 'border-[#2a2730] text-[#c5beb1] group-hover:border-[#3a3540] group-hover:text-[#efeae0]'
                    )}
                  >
                    <ChevronDown size={16} strokeWidth={2.25} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.35, ease: 'easeOut' },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-7 pb-6 md:pb-7 pl-[calc(1.25rem+2.75rem)] md:pl-[calc(1.75rem+2.75rem)]">
                        <div className="hr-glow mb-5 opacity-60" />
                        <p
                          className="text-[0.92rem] text-[#c5beb1]"
                          style={{ lineHeight: 1.75 }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Still curious footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 text-center text-[0.82rem] text-[#8a8376]"
        >
          Still have a question?{' '}
          <a
            href="#contact"
            className="text-[#f5b84a] hover:text-[#ffd79a] underline underline-offset-4 decoration-[#f5b84a]/30 hover:decoration-[#ffd79a] transition"
          >
            Just ask directly
          </a>
          .
        </motion.div>
      </div>
    </section>
  );
}
