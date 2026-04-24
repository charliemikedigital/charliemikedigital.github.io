import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Clock, MapPin, Send, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type FormFields = {
  name: string;
  email: string;
  phone: string;
  need: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const NEED_OPTIONS = [
  { value: '', label: 'Select an option…' },
  { value: 'starter', label: 'New Website, Starter $499' },
  { value: 'standard', label: 'New Website, Standard $799' },
  { value: 'premium', label: 'New Website, Premium $1299' },
  { value: 'maintenance', label: 'Monthly Maintenance Plan' },
  { value: 'addons', label: 'Add Ons to Existing Site' },
  { value: 'not-sure', label: "Not Sure, Let's Talk" },
];

const DETAILS = [
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Same day, usually within a few hours',
    href: null as string | null,
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'Nationwide. Everything is done remotely.',
    href: null,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const [form, setForm] = useState<FormFields>({
    name: '',
    email: '',
    phone: '',
    need: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

  function validate(values: FormFields): FormErrors {
    const e: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      e.name = 'Please enter your name (2+ characters).';
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(values.email.trim())) {
      e.email = 'Please enter a valid email address.';
    }
    if (values.phone.trim()) {
      const digits = values.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        e.phone = 'Phone must be 10–11 digits.';
      }
    }
    return e;
  }

  function onChange<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched[key]) {
      setErrors(validate(next));
    }
  }

  function onBlur(key: keyof FormFields) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const eMap = validate(form);
    setErrors(eMap);
    setTouched({ name: true, email: true, phone: true, need: true, message: true });
    if (Object.keys(eMap).length > 0) {
      e.preventDefault();
    }
    // If no errors, Formspree handles submission natively.
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      {/* Background orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute top-[10%] left-[5%] h-[420px] w-[420px] rounded-full opacity-30 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #ff3b2e 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-[5%] right-[5%] h-[360px] w-[360px] rounded-full opacity-25 blur-3xl drift"
          style={{ background: 'radial-gradient(circle, #f5b84a 0%, transparent 60%)', animationDelay: '-10s' }}
        />
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* ============ Left: details ============ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b2e] pulse-slow" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-[#c5beb1]">
                Contact
              </span>
            </div>

            <h2 className="font-semibold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-[#efeae0]">
              Let's <em className="serif-i gradient-signal">talk</em>.
            </h2>

            <p className="mt-5 max-w-[460px] text-[1.02rem] text-[#c5beb1]" style={{ lineHeight: 1.7 }}>
              Fill out the form and I'll get back to you same day. No sales pitch, just a straight answer on what I
              can build for you and what it'll cost.
            </p>

            <div className="hr-glow mt-8 mb-8 opacity-60" />

            {/* Detail rows */}
            <motion.ul
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
              }}
              className="flex flex-col gap-4"
            >
              {DETAILS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl glass-strong border-[#f5b84a]/20 text-[#f5b84a]">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-[#a67a20]">
                        {label}
                      </div>
                      <div className="mt-0.5 text-[0.98rem] text-[#efeae0]">{value}</div>
                    </div>
                  </>
                );

                return (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.55 } },
                    }}
                  >
                    {href ? (
                      <a
                        href={href}
                        className="group flex items-start gap-4 rounded-xl p-2 -m-2 hover:bg-white/[0.03] transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* ============ Right: form ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass-strong rounded-2xl p-6 md:p-8 border border-[#f5b84a]/15"
          >
            <div>
              <h3 className="font-semibold text-[1.5rem] md:text-[1.75rem] tracking-tight text-[#efeae0]">
                Request a <em className="serif-i gradient-warm">free</em> quote
              </h3>
              <p className="mt-1.5 text-[0.9rem] text-[#c5beb1]">
                Zero pressure. Most quotes come back same day.
              </p>
            </div>

            <form
              action="https://formspree.io/f/YOUR_ID"
              method="POST"
              onSubmit={onSubmit}
              noValidate
              className="mt-7 flex flex-col gap-5"
            >
              <Field
                label="Name"
                required
                error={errors.name}
              >
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  onBlur={() => onBlur('name')}
                  className={inputCls(!!errors.name)}
                />
              </Field>

              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@business.com"
                  value={form.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  onBlur={() => onBlur('email')}
                  className={inputCls(!!errors.email)}
                />
              </Field>

              <Field label="Phone" error={errors.phone} hint="Optional">
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="(281) 555-0000"
                  value={form.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                  onBlur={() => onBlur('phone')}
                  className={inputCls(!!errors.phone)}
                />
              </Field>

              <Field label="What Do You Need?">
                <div className="relative">
                  <select
                    name="need"
                    value={form.need}
                    onChange={(e) => onChange('need', e.target.value)}
                    className={cn(inputCls(false), 'appearance-none pr-10 cursor-pointer')}
                  >
                    {NEED_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value} className="bg-[#141318] text-[#efeae0]">
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ArrowRight
                    size={14}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[#8a8376]"
                  />
                </div>
              </Field>

              <Field label="Tell Me About Your Business">
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Industry, location, what you're currently using (or not), what you need the site to do…"
                  value={form.message}
                  onChange={(e) => onChange('message', e.target.value)}
                  className={cn(inputCls(false), 'resize-y min-h-[120px]')}
                />
              </Field>

              <button
                type="submit"
                className="btn-sweep group mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#ff3b2e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-10px_rgba(255,59,46,0.55)] hover:shadow-[0_22px_54px_-8px_rgba(255,59,46,0.85)] transition-all"
              >
                <span className="relative z-[1]">Send Message</span>
                <Send size={14} strokeWidth={2.4} className="relative z-[1] transition-transform group-hover:translate-x-0.5" />
              </button>

              <p className="text-[0.72rem] text-[#8a8376] text-center">
                By submitting you agree to be contacted about your project. No spam. Ever.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================= helpers ==== */

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-lg bg-[#0d0c10] border text-[0.95rem] text-[#efeae0] placeholder:text-[#54504a] px-4 py-3 transition-colors',
    'outline-none',
    hasError
      ? 'border-[#ff3b2e]/60 focus:border-[#ff3b2e] focus:ring-2 focus:ring-[#ff3b2e]/25'
      : 'border-[#2a2730] focus:border-[#f5b84a]/60 focus:ring-2 focus:ring-[#f5b84a]/25'
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[#a67a20]">
          {label}
          {required && <span className="text-[#ff3b2e] ml-1">*</span>}
        </span>
        {hint && (
          <span className="text-[0.62rem] text-[#54504a] tracking-wide">{hint}</span>
        )}
      </span>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-[0.72rem] text-[#ff6a5f]"
        >
          {error}
        </motion.span>
      )}
    </label>
  );
}
