import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const PROBLEMS = [
  { h: "RPA that breaks every time the UI moves.", d: "Screen-scraping bots are brittle by design. The first system update kills the workflow — and the team that maintained it has moved on." },
  { h: "Workflows that automate the wrong step.", d: "Most automation programs target the easy 20% and leave the painful exceptions to humans, who now have less context than before." },
  { h: "Black-box agents nobody trusts in production.", d: "An agent that can't explain why it made a decision will sit in a sandbox forever. Auditability is the price of admission." },
];

const CAPABILITIES = [
  { tag: "Process Intelligence", t: "Map before you automate.", d: "Process mining on your event logs surfaces what actually happens — not what the SOP claims. We start every engagement here." },
  { tag: "ML + Rules", t: "Hybrid decision engines.", d: "Deterministic rules where the regulator demands them. ML where the variance is real. Both in one runtime, with one audit trail." },
  { tag: "Agentic Orchestration", t: "Long-running agents with guardrails.", d: "Multi-step workflows operating across your tools via MCP, with explicit handoff to humans on confidence thresholds." },
  { tag: "Exception Handling", t: "The 20% that runs your business.", d: "We design for the long tail of edge cases first. Happy paths are easy. Exceptions are where automation lives or dies." },
];

const PHASES = [
  { n: "01", t: "Map", d: "Process mining + interviews. Two weeks. We surface the actual flow, the exceptions, and the bottlenecks worth automating." },
  { n: "02", t: "Pilot", d: "One workflow, one team, six weeks. Production-grade infra from day one. Real users, real volume, real KPIs." },
  { n: "03", t: "Scale", d: "Templates, observability, and an internal platform team trained to add the next workflow without us." },
];

const STACK = [
  { h: "Process & data", l: ["Celonis", "Apache Airflow", "Temporal", "Kafka", "dbt"] },
  { h: "AI & ML", l: ["Claude Sonnet 4.6", "MCP", "LangGraph", "scikit-learn", "Vertex AI"] },
  { h: "Integration", l: ["Workato", "Zapier (lightweight)", "Custom REST/GraphQL", "Salesforce", "ServiceNow"] },
  { h: "Observability", l: ["LangSmith", "Datadog", "OpenTelemetry", "Sentry"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={80 + i * 30} y={80 + i * 30} width={480 - i * 60} height={480 - i * 60} stroke="#CF4520" strokeWidth="1" opacity={0.5 - i * 0.07} />
        ))}
        <path d="M60 60 L580 580" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Intelligent Automation
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Automation that thinks —", "and stops", "when it should."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7.5vw,124px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Process intelligence, ML, and agentic orchestration in one runtime — with the auditability, exception handling, and human-in-the-loop discipline that turns automation pilots into production systems.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Why most automation stalls</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {PROBLEMS.map((p, i) => (
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
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we build</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four pieces of a real automation <span className="italic">platform.</span>
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

function Methodology() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Map. Pilot. Scale.</div>
        <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-cream max-w-[18ch] mb-16">
          Three phases. <span className="italic text-cream/70">Roughly twelve weeks to first production workflow.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/10">
          {PHASES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-ink p-8 lg:p-10 min-h-[260px] flex flex-col justify-between">
              <div className="font-mono text-[11px] tracking-[0.2em] text-coral">{p.n}</div>
              <div>
                <div className="font-display text-3xl lg:text-4xl font-light text-cream mb-3">{p.t}</div>
                <p className="text-[14px] leading-relaxed text-cream/65">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Case study</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,72px)] leading-[1] tracking-[-0.02em] font-light text-ink">
            Quality inspection at <span className="italic">line speed.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-6 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
          <p>A specialty packaging plant was rejecting 4% of finished goods because of cosmetic defects caught only at the end of the line. We built a vision pipeline that flags each unit at three checkpoints, escalates anomalies to the line lead, and writes the verdict back to PLEX before the next station handoff.</p>
          <p>The line never stops. The lead never has to leave the floor. And the rejects that do get through have a photo, a timestamp, and a model confidence score attached.</p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-ink/20">
            {[
              { v: "73%", l: "Defect detection lift" },
              { v: "1.2s", l: "Per-unit decision latency" },
              { v: "$640K", l: "Annual rework avoided" },
            ].map((m, i) => (
              <div key={i}>
                <div className="font-display italic text-2xl lg:text-3xl text-coral leading-tight">{m.v}</div>
                <div className="text-[12px] text-ink-muted mt-2 font-mono tracking-wider uppercase">{m.l}</div>
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
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">The stack we reach for</div>
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

function FlowDiagram() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The decision flow</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Where automation should — and <span className="italic">shouldn't</span> — decide.
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12 overflow-x-auto">
          <svg viewBox="0 0 1280 380" className="w-full min-w-[900px] h-auto" role="img" aria-label="Automation decision flow">
            {/* Step 1 */}
            <g transform="translate(40, 130)">
              <rect width="220" height="120" fill="none" stroke="#0E1116" strokeWidth="1" />
              <text x="110" y="30" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#0E1116" textAnchor="middle" opacity="0.7">EVENT</text>
              <text x="110" y="68" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#0E1116" textAnchor="middle">Incoming</text>
              <text x="110" y="92" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#0E1116" textAnchor="middle">work item</text>
            </g>
            <line x1="260" y1="190" x2="320" y2="190" stroke="#0E1116" strokeWidth="1" />
            <polygon points="320,185 330,190 320,195" fill="#0E1116" />

            {/* Step 2 — process intel */}
            <g transform="translate(330, 130)">
              <rect width="240" height="120" fill="none" stroke="#0E1116" strokeWidth="1" />
              <text x="120" y="30" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#0E1116" textAnchor="middle" opacity="0.7">PROCESS INTEL</text>
              <text x="120" y="68" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#0E1116" textAnchor="middle">Classify</text>
              <text x="120" y="92" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#0E1116" textAnchor="middle">+ enrich</text>
            </g>
            <line x1="570" y1="190" x2="630" y2="190" stroke="#0E1116" strokeWidth="1" />
            <polygon points="630,185 640,190 630,195" fill="#0E1116" />

            {/* Decision diamond */}
            <g transform="translate(640, 130)">
              <polygon points="120,0 240,60 120,120 0,60" fill="#CF4520" />
              <text x="120" y="55" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">CONFIDENCE</text>
              <text x="120" y="78" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#F5F1EB" textAnchor="middle">≥ threshold?</text>
            </g>

            {/* Branches */}
            <line x1="900" y1="160" x2="980" y2="80" stroke="#0E1116" strokeWidth="1" />
            <polygon points="978,75 988,82 982,90" fill="#0E1116" />
            <text x="930" y="115" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.7">YES</text>

            <line x1="900" y1="220" x2="980" y2="300" stroke="#0E1116" strokeWidth="1" />
            <polygon points="978,300 988,295 982,308" fill="#0E1116" />
            <text x="930" y="265" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.7">NO</text>

            {/* Auto-action */}
            <g transform="translate(990, 30)">
              <rect width="240" height="80" fill="#0E1116" />
              <text x="120" y="30" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">AUTO-EXECUTE</text>
              <text x="120" y="58" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#F5F1EB" textAnchor="middle">Logged · audited</text>
            </g>
            {/* Human handoff */}
            <g transform="translate(990, 270)">
              <rect width="240" height="80" fill="none" stroke="#CF4520" strokeWidth="1.5" />
              <text x="120" y="30" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#CF4520" textAnchor="middle">HUMAN-IN-LOOP</text>
              <text x="120" y="58" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" textAnchor="middle">Escalate · learn</text>
            </g>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 05 · Automation decision flow with confidence-based escalation
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Floor() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <HiggsfieldPlaceholder
          kind="image"
          aspect="21/9"
          brief="Quality-inspection station on a packaging line — overhead vision camera, conveyor belts, units passing through. Coral-tinted highlights on machinery, ink shadows."
          caption="Inspection · Specialty packaging plant"
        />
      </div>
    </section>
  );
}

export function AutomationContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Floor />
      <Problems />
      <Capabilities />
      <FlowDiagram />
      <Methodology />
      <CaseStudy />
      <Stack />
    </PageShell>
  );
}

export default AutomationContent;
