import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const TRUTHS = [
  { h: "Big-bang rewrites are the most expensive way to fail.", d: "The 18-month freeze, the parallel-run nightmare, the cutover weekend that turns into a quarter. We've watched this movie. It rarely ends well." },
  { h: "Legacy is a liability, not just an inconvenience.", d: "Every month on a 15-year-old stack is another month of compounding security exposure, talent attrition, and integration debt." },
  { h: "Modernization is a product problem, not an engineering one.", d: "If you can't articulate what business outcome the new system enables, you're refactoring — not modernizing." },
];

const APPROACH = [
  { tag: "Strangler-Fig", t: "Two services at a time.", d: "We extract microservices behind an API layer, two at a time, with zero production downtime through the cutover. You ship value every two weeks." },
  { tag: "API Layering", t: "Anti-corruption boundaries.", d: "A clean API contract sits between the legacy core and everything new. Old and new evolve independently — and old can finally be retired." },
  { tag: "Data First", t: "Get the schema right.", d: "Most modernization programs die in the data layer. We design the target schema and migration path before we touch a single endpoint." },
  { tag: "Re-Platform", t: "Lift, then shift, then improve.", d: "Where re-architecting isn't justified, we lift to a managed cloud equivalent first — buying years of runway with weeks of work." },
];

const STACK = [
  { h: "Migration", l: ["Strangler-fig pattern", "Anti-corruption layer", "CDC pipelines", "Dual-write windows"] },
  { h: "Runtime targets", l: ["Kubernetes", "Lambda · Cloud Run", "ECS · Fargate", "App Service"] },
  { h: "Data", l: ["Postgres", "Aurora", "DynamoDB", "Snowflake", "Kafka"] },
  { h: "Observability", l: ["Datadog", "OpenTelemetry", "Honeycomb", "Sentry"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M40 320 C 200 80, 440 80, 600 320" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <path d="M40 360 C 200 140, 440 140, 600 360" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <path d="M40 400 C 200 200, 440 200, 600 400" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Enterprise Modernization
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Strangle the legacy.", "Don't rewrite it.", "Ship every two weeks."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7.2vw,124px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Strangler-fig migrations, anti-corruption API layers, and the unglamorous discipline to get off legacy without going dark. Eighteen-month rewrites are not an option you should accept.
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Three truths we lead with</div>
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

function Approach() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we approach it</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four moves we make <span className="italic">on every engagement.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {APPROACH.map((c, i) => (
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

function StranglerDiagram() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The pattern, drawn</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              How a strangler-fig <span className="italic">actually moves.</span>
            </h2>
          </div>
        </div>

        <figure className="relative bg-paper border border-ink/15 p-8 lg:p-14">
          <svg viewBox="0 0 1200 420" className="w-full h-auto" role="img" aria-label="Strangler-fig migration diagram">
            {/* Time axis */}
            <line x1="40" y1="380" x2="1160" y2="380" stroke="#0E1116" strokeWidth="1" opacity="0.3" />
            {["Month 0", "Month 4", "Month 8", "Month 12", "Month 14"].map((t, i) => (
              <g key={i}>
                <line x1={80 + i * 260} y1="375" x2={80 + i * 260} y2="385" stroke="#0E1116" strokeWidth="1" opacity="0.5" />
                <text x={80 + i * 260} y="405" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#0E1116" opacity="0.55" textAnchor="middle">{t.toUpperCase()}</text>
              </g>
            ))}

            {/* Legacy monolith — shrinks left to right */}
            <rect x="80" y="60" width="1040" height="80" fill="#0E1116" opacity="0.85" />
            <text x="100" y="108" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="2" fill="#F5F1EB" opacity="0.95">LEGACY CORE · MONOLITHIC SAP</text>
            {/* Shrinking overlay */}
            <rect x="340" y="60" width="780" height="80" fill="#F1EAE0" opacity="0.92" />
            <rect x="600" y="60" width="520" height="80" fill="#F1EAE0" opacity="0.96" />
            <rect x="860" y="60" width="260" height="80" fill="#F1EAE0" />
            <line x1="860" y1="60" x2="860" y2="140" stroke="#CF4520" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <text x="970" y="110" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" opacity="0.55" textAnchor="middle">retired</text>

            {/* API anti-corruption layer */}
            <rect x="80" y="170" width="1040" height="36" fill="none" stroke="#CF4520" strokeWidth="1.5" />
            <text x="600" y="194" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="3" fill="#CF4520" textAnchor="middle">API · ANTI-CORRUPTION LAYER</text>

            {/* Extracted services */}
            {[
              { x: 120, label: "Order Mgmt", at: 4 },
              { x: 380, label: "Pricing", at: 6 },
              { x: 640, label: "Invoicing", at: 9 },
              { x: 900, label: "Revenue", at: 12 },
            ].map((s, i) => (
              <g key={i}>
                <line x1={s.x + 80} y1="206" x2={s.x + 80} y2="240" stroke="#CF4520" strokeWidth="1" opacity="0.55" />
                <rect x={s.x} y="240" width="160" height="80" fill="#CF4520" opacity={0.85 - i * 0.06} />
                <text x={s.x + 80} y="278" fontFamily="serif" fontSize="18" fontStyle="italic" fill="#F5F1EB" textAnchor="middle">{s.label}</text>
                <text x={s.x + 80} y="302" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#F5F1EB" opacity="0.8" textAnchor="middle">SHIPPED · M{s.at}</text>
              </g>
            ))}

            {/* Legend */}
            <g transform="translate(80, 360)">
              <rect x="0" y="-10" width="14" height="14" fill="#0E1116" opacity="0.7" />
              <text x="22" y="1" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5" fill="#0E1116" opacity="0.7">LEGACY</text>
              <rect x="120" y="-10" width="14" height="14" fill="#CF4520" opacity="0.85" />
              <text x="142" y="1" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5" fill="#0E1116" opacity="0.7">EXTRACTED SERVICE</text>
              <rect x="320" y="-10" width="14" height="14" fill="none" stroke="#CF4520" strokeWidth="1.5" />
              <text x="342" y="1" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.5" fill="#0E1116" opacity="0.7">API LAYER</text>
            </g>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 01 · Strangler-fig migration · 14-month cadence
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Case study</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,72px)] leading-[1] tracking-[-0.02em] font-light text-cream">
            A 22-year-old SAP estate, <span className="italic">strangled in 14 months.</span>
          </h2>
          <div className="mt-10">
            <HiggsfieldPlaceholder
              kind="image"
              aspect="4/5"
              brief="Cinematic interior of a specialty-chemicals plant control room — banks of green CRT-style legacy terminals on the left, modern dashboards on the right, sodium lamp wash, no people."
              caption="Case study · Specialty chemicals · 2024"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-6 text-[16px] lg:text-[18px] leading-relaxed text-cream/75">
          <p>A $1.2B specialty chemicals manufacturer was running their entire order-to-cash on a heavily customized SAP ECC instance. Our predecessors had quoted a $14M, three-year S/4 migration. We did it differently.</p>
          <p>Fourteen months of fortnightly cutovers. Order management out first, then pricing, then invoicing, then revenue recognition. Each service shipped behind a feature flag with a rollback path. The legacy core was retired piece by piece — no big bang, no nine-figure invoice.</p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-cream/20">
            {[
              { v: "$9.4M", l: "Saved vs original quote" },
              { v: "0", l: "Cutover-night incidents" },
              { v: "14 mo", l: "Full strangulation" },
            ].map((m, i) => (
              <div key={i}>
                <div className="font-display text-3xl lg:text-5xl font-light text-coral leading-tight">{m.v}</div>
                <div className="text-[12px] text-cream/50 mt-2 font-mono tracking-wider uppercase">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Tools of the trade</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STACK.map((c, i) => (
            <div key={i} className="border-t border-ink pt-6">
              <div className="font-display text-2xl text-ink mb-5 italic">{c.h}</div>
              <ul className="space-y-2">
                {c.l.map((it, j) => (
                  <li key={j} className="text-[14px] text-ink-soft">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ModernizationContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Truths />
      <StranglerDiagram />
      <Approach />
      <CaseStudy />
      <Stack />
    </PageShell>
  );
}

export default ModernizationContent;
