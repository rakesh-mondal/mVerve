import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const ENGAGEMENTS = [
  { tag: "Architecture Review", t: "Cold-eyes on a system you can no longer see.", d: "A two- to three-week deep read on a critical service or platform. Risks, debt, scaling cliffs, and the next three changes worth making — written for engineers, signed by principals." },
  { tag: "Tech Due Diligence", t: "Pre-investment or pre-acquisition.", d: "What works, what's load-bearing, what's brittle, and what the integration cost actually looks like. Honest answers in two weeks, not three months." },
  { tag: "Second Opinions", t: "Before you sign the SOW.", d: "An independent read on a vendor proposal, an internal architecture choice, or a major cloud commitment. From engineers who'd be on the hook to actually build it." },
  { tag: "Fractional CTO / Principal", t: "Senior depth, on retainer.", d: "Recurring engagement for founders or non-technical leaders who need a principal-grade voice in the room — without hiring one full-time before the company can carry it." },
];

const PRINCIPLES = [
  { t: "We'd build it ourselves.", d: "Every recommendation we make is one we'd implement if you handed us the keyboard. No advice we wouldn't take." },
  { t: "Written for engineers.", d: "Reports your team will actually read and act on. No 50-page slide decks designed to justify the invoice." },
  { t: "Concrete, not consultant-speak.", d: "Specific files, specific decisions, specific numbers. 'Consider modernizing your data layer' is not a recommendation." },
  { t: "Independent of vendor incentives.", d: "We don't resell, partner-tier, or take referral fees. Our recommendation is just our recommendation." },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M320 60 L580 320 L320 580 L60 320 Z" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
        <path d="M320 140 L500 320 L320 500 L140 320 Z" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <path d="M320 60 L320 580" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Technical Consulting
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Architecture reviews,", "due diligence,", "and second opinions —", "from people who'd build it."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(36px,6.2vw,108px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            For founders, boards, investors, and engineering leaders who need a senior, independent technical read — written for engineers, signed by principals, with no hidden vendor incentive.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Engagements() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Four shapes of engagement</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              When to call us <span className="italic">in.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15">
          {ENGAGEMENTS.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-cream p-8 lg:p-12 group hover:bg-paper transition-colors flex flex-col min-h-[260px]">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">{c.tag}</div>
              <div className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.1] font-light text-ink mb-4 group-hover:italic transition-all">{c.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we work</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            Four <span className="italic">non-negotiables.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-5">
              <div className="font-display text-[24px] lg:text-[28px] font-light text-ink mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-paper">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10 items-end">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Who you'll work with</div>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            Principal-grade engineers. <span className="italic">In the room.</span>
          </h2>
          <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft mt-6 max-w-[55ch]">
            Every consulting engagement is led by a principal who has shipped systems like yours. Reports are written for engineers, signed by principals, and free of vendor incentive.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <HiggsfieldPlaceholder
            kind="image"
            aspect="4/5"
            brief="Editorial environmental portrait — senior engineer at a desk with two monitors showing architecture diagrams, hands on a notebook, side-light from a window. Reading thoughtful, not posed. Half-face visible."
            caption="Principal engineer · in advisory mode"
          />
        </div>
      </div>
    </section>
  );
}

export function ConsultingContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Engagements />
      <Portrait />
      <Principles />
    </PageShell>
  );
}

export default ConsultingContent;
