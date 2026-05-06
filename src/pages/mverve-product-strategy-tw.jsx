import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const TRUTHS = [
  { h: "Product strategy that lives in slides is dead strategy.", d: "If the team building the thing can't articulate the bet in one sentence, the strategy didn't survive contact with engineering." },
  { h: "Roadmaps without sequencing are wish lists.", d: "Saying 'these are our priorities' is not a strategy. Sequencing them — and saying out loud what you're not doing — is." },
  { h: "Discovery is engineering's job too.", d: "Senior engineers in the room during discovery cuts six-week features down to six-day ones. The biggest product wins start there." },
];

const CAPABILITIES = [
  { tag: "Strategy", t: "Bets, not backlogs.", d: "We help product leaders frame the two or three asymmetric bets the company is actually making — and the metrics that say whether they're working." },
  { tag: "Discovery", t: "Continuous, not phased.", d: "Weekly user conversations, opportunity-solution mapping, and senior-engineer presence from week one. Discovery never stops." },
  { tag: "Roadmapping", t: "Sequenced, not stacked.", d: "Quarterly themes with explicit non-goals. Capacity reality. Hand-off rituals to engineering that don't lose the why." },
  { tag: "Outcome Metrics", t: "Movement, not delivery.", d: "Metrics tied to user behaviour and revenue, not story points. Reviewed monthly. Killed when they stop earning the slot." },
];

const PRINCIPLES = [
  { t: "Strategy survives engineering.", d: "If the team can't repeat the bet in plain language, it isn't a strategy yet." },
  { t: "Discovery is continuous.", d: "Weekly user conversations beat quarterly research projects. Always." },
  { t: "Sequencing is the strategy.", d: "What you do third matters more than what you do first." },
  { t: "Outcomes over output.", d: "Story points are vanity. Behaviour change is signal." },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M40 320 L320 80 L600 320" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <path d="M40 320 L320 200 L600 320" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <path d="M40 320 L320 320 L600 320" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Product Strategy & Design
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Senior product thinking,", "embedded in engineering —", "not bolted on at kickoff."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(36px,6.5vw,108px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Strategy that survives the codebase, discovery that runs continuously, and outcome metrics that tell you whether the bets are paying off. We sit with engineering, not above it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Truths() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Three things we hold</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {TRUTHS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-cream-deep p-8 lg:p-10">
              <div className="font-display text-[clamp(22px,2.4vw,32px)] leading-tight font-light text-ink mb-4 italic">{p.h}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we do</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four moves that <span className="italic">change the math.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {CAPABILITIES.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-10">
              <div className="col-span-12 lg:col-span-2 font-mono text-[11px] tracking-[0.2em] uppercase text-coral">{c.tag}</div>
              <div className="col-span-12 lg:col-span-3">
                <div className="font-display text-[clamp(24px,2.4vw,32px)] leading-tight font-light text-ink">{c.t}</div>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{c.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Operating principles</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-cream">
            Four rules <span className="italic text-cream/70">we don't break.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-cream/30 pt-5">
              <div className="font-display text-[24px] lg:text-[28px] font-light text-cream mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-cream/70">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OppTree() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Opportunity-solution tree</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Outcome → Opportunity → <span className="italic">Bet.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12 overflow-x-auto">
          <svg viewBox="0 0 1280 440" className="w-full min-w-[900px] h-auto" role="img" aria-label="Opportunity tree">
            {/* Outcome */}
            <rect x="500" y="20" width="280" height="70" fill="#CF4520" />
            <text x="640" y="48" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">DESIRED OUTCOME</text>
            <text x="640" y="74" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#F5F1EB" textAnchor="middle">Activated trial users +20%</text>

            {/* Opportunities */}
            {[
              { x: 100, t: "Time to first value too long" },
              { x: 500, t: "Setup is opaque" },
              { x: 900, t: "First-run failure mode" },
            ].map((o, i) => (
              <g key={i}>
                <line x1="640" y1="90" x2={o.x + 140} y2="160" stroke="#0E1116" strokeWidth="1" opacity="0.5" />
                <rect x={o.x} y="160" width="280" height="70" fill="none" stroke="#0E1116" strokeWidth="1" />
                <text x={o.x + 140} y="186" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" textAnchor="middle" opacity="0.6">OPPORTUNITY</text>
                <text x={o.x + 140} y="212" fontFamily="serif" fontStyle="italic" fontSize="17" fill="#0E1116" textAnchor="middle">{o.t}</text>
              </g>
            ))}

            {/* Bets */}
            {[
              { x: 60, t: "Guided onboarding" },
              { x: 240, t: "Pre-filled defaults" },
              { x: 460, t: "In-product checklist" },
              { x: 640, t: "Templates gallery" },
              { x: 860, t: "Recovery flow" },
              { x: 1040, t: "Retry on failure" },
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y="320" width="180" height="70" fill="#0E1116" />
                <text x={b.x + 90} y="346" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.75">BET</text>
                <text x={b.x + 90} y="372" fontFamily="serif" fontStyle="italic" fontSize="15" fill="#F5F1EB" textAnchor="middle">{b.t}</text>
              </g>
            ))}

            {/* Connectors opportunity → bets */}
            {[
              { ox: 240, bx: [150, 330] },
              { ox: 640, bx: [550, 730] },
              { ox: 1040, bx: [950, 1130] },
            ].map((row, i) =>
              row.bx.map((x, j) => (
                <line key={`${i}-${j}`} x1={row.ox} y1="230" x2={x} y2="320" stroke="#0E1116" strokeWidth="1" opacity="0.3" />
              ))
            )}
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 14 · Opportunity-solution tree · The shape strategy takes
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function ProductStrategyContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Truths />
      <Capabilities />
      <OppTree />
      <Principles />
    </PageShell>
  );
}

export default ProductStrategyContent;
