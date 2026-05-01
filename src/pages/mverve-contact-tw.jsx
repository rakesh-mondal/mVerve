import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { PageShell } from "../components/SiteLayout";

const PROJECT_TYPES = [
  "AI & Innovation Lab",
  "Cloud / Modernization",
  "GreenOps",
  "Data Intelligence",
  "Other",
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nProject type: ${form.project}\n\n${form.message}`
    );
    window.location.href = `mailto:hello@mverve.tech?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-8">
      <Field label="Name" required value={form.name} onChange={set("name")} />
      <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
      <Field label="Company" value={form.company} onChange={set("company")} />
      <div>
        <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">
          Project type
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setForm((f) => ({ ...f, project: p }))}
              className={`px-4 py-2 text-[14px] border transition-colors ${
                form.project === p
                  ? "bg-ink text-cream border-ink"
                  : "bg-cream text-ink border-ink/30 hover:border-ink"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <Field label="Tell us about your project" textarea required value={form.message} onChange={set("message")} />
      <div className="pt-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 bg-ink text-cream px-8 py-5 text-[15px] font-medium tracking-wide hover:bg-coral transition-colors"
        >
          {sent ? "Sent — thank you" : "Start the conversation"}
          <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}

function Field({ label, type = "text", required, textarea, value, onChange }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">
        {label}{required && <span className="text-coral ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea
          required={required}
          value={value}
          onChange={onChange}
          rows={5}
          className="w-full bg-transparent border-b border-ink/40 focus:border-coral outline-none py-3 text-[18px] font-display font-light text-ink placeholder:text-ink-muted/50 transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-ink/40 focus:border-coral outline-none py-3 text-[20px] font-display font-light text-ink placeholder:text-ink-muted/50 transition-colors"
        />
      )}
    </label>
  );
}

function ContactHero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 overflow-hidden">
      <div className="absolute -left-32 top-32 w-[420px] h-[420px] rounded-full bg-coral/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Let's innovate together
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Tell us what", "you're trying to", "build."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(48px,8vw,140px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-12 lg:mt-16 max-w-2xl text-[17px] lg:text-[19px] leading-relaxed text-ink-soft">
          No pitch decks. No bench rotations. Just an honest conversation with senior engineers who already understand your domain — and what production-grade actually means.
        </motion.p>
      </div>
    </section>
  );
}

function ContactBody() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        {/* Form */}
        <div className="col-span-12 lg:col-span-7">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-8">Project enquiry</div>
          <ContactForm />
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-4 lg:col-start-9 space-y-12 lg:pl-8 lg:border-l lg:border-ink/15">
          <Block icon={<Mail size={18} />} title="Direct">
            <a href="mailto:hello@mverve.tech" className="font-display text-2xl text-ink italic link-reveal">
              hello@mverve.tech
            </a>
            <p className="text-[14px] text-ink-muted mt-2">For RFPs, partnerships, and complex briefs.</p>
          </Block>
          <Block icon={<MapPin size={18} />} title="Studios">
            <div className="font-display text-xl text-ink leading-tight">Bengaluru, India</div>
            <div className="font-display text-xl text-ink leading-tight mt-1">Maryland, USA</div>
            <p className="text-[14px] text-ink-muted mt-3">Two timezones. One team. Always-on coverage.</p>
          </Block>
          <Block icon={<Clock size={18} />} title="Response time">
            <div className="font-display text-xl text-ink leading-tight">Within one business day.</div>
            <p className="text-[14px] text-ink-muted mt-3">A senior engineer reads every enquiry — not a sales bot.</p>
          </Block>
        </aside>
      </div>
    </section>
  );
}

function Block({ icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full border border-ink/30 flex items-center justify-center text-ink">{icon}</div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">{title}</div>
      </div>
      {children}
    </div>
  );
}

export function ContactContent({ navigate }) {
  return (
    <PageShell navigate={navigate} includeClosingCTA={false}>
      <ContactHero />
      <ContactBody />
    </PageShell>
  );
}

export default ContactContent;
