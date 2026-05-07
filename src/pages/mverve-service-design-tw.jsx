import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import workshopImage from "../assets/service-design-workshop.png";

const TRUTHS = [
  { h: "Software is only ever half the service.", d: "The other half is the call centre, the warehouse, the field engineer, the regulatory filing. If your design stops at the screen, you've designed half a thing." },
  { h: "Operations are a UX surface.", d: "Every Slack handover, every spreadsheet workaround, every call to support is part of the experience the customer eventually feels." },
  { h: "Service blueprints turn invisible work visible.", d: "Half of what your operations team does isn't in any system. We map it, redesign it, and instrument it before we touch a screen." },
];

const CAPABILITIES = [
  { tag: "Service Blueprint", t: "End-to-end visibility.", d: "Customer journey, frontstage UI, backstage operations, and supporting systems — on one diagram. The thing every product strategy needed and didn't have." },
  { tag: "Operational Design", t: "Designing the people-shaped parts.", d: "Scripts, decision aids, escalation paths, and tooling for the humans who make the service work. They're users too." },
  { tag: "Cross-Channel UX", t: "App, email, IVR, paper.", d: "Designing the journey across every channel a customer actually uses — including the channels nobody on the design team likes thinking about." },
  { tag: "Measurement", t: "Service metrics that aren't NPS.", d: "Time-to-resolution, escalation rate, hand-off count, customer effort score. The numbers that actually predict churn." },
];

const PRINCIPLES = [
  { n: "01", t: "Map the whole service.", d: "Frontstage and backstage. Software and human. Visible and invisible. If we missed a layer, we missed the problem." },
  { n: "02", t: "Operations are users.", d: "We design the call-centre script with the same care as the customer-facing button. They're both part of the service." },
  { n: "03", t: "Measure what predicts churn.", d: "NPS is lagging and noisy. Hand-off count and effort score are leading and clean." },
  { n: "04", t: "Pilot small, instrument early.", d: "Service redesigns fail in production, not in workshops. Pilot one journey, instrument it, learn before you scale." },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <line x1="80" y1="120" x2="560" y2="120" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <line x1="80" y1="240" x2="560" y2="240" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="360" x2="560" y2="360" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="480" x2="560" y2="480" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
        <line x1="160" y1="80" x2="160" y2="540" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
        <line x1="320" y1="80" x2="320" y2="540" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
        <line x1="480" y1="80" x2="480" y2="540" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Service Design
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["End-to-end design", "for products that touch", "ops, people, and the floor."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(36px,6.5vw,110px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Service blueprints, operational design, and cross-channel UX for industrial products where the experience is half software, half people, and a quarter physical artifacts.
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Three things we lead with</div>
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
              Four ways we design <span className="italic">the whole service.</span>
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
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Operating principles</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            Four <span className="italic">non-negotiables.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-5">
              <div className="font-mono text-[10px] tracking-[0.2em] text-coral mb-3">{p.n}</div>
              <div className="font-display text-[24px] lg:text-[28px] font-light text-ink mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blueprint() {
  const lanes = [
    { label: "CUSTOMER JOURNEY", color: "#CF4520", steps: ["Discover", "Sign-up", "Onboard", "Use", "Resolve issue", "Renew"] },
    { label: "FRONTSTAGE · UI", color: "#0E1116", steps: ["Marketing site", "Signup form", "First-run flow", "Product UI", "Help centre", "Renewal email"] },
    { label: "BACKSTAGE · OPS", color: "#0E1116", steps: ["Lead routing", "KYC review", "Provisioning", "Support team", "Escalation desk", "CSM outreach"] },
    { label: "SUPPORT SYSTEMS", color: "#0E1116", steps: ["CRM", "Identity", "Billing", "Telemetry", "Knowledge base", "Forecasting"] },
  ];

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-paper">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The artifact</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              The service blueprint, <span className="italic">flattened.</span>
            </h2>
            <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft mt-6 max-w-[60ch]">
              Four lanes. One journey. Every customer step traced to the frontstage UI, the backstage ops, and the systems behind them — so the invisible work stops being invisible.
            </p>
          </div>
        </div>

        <figure className="relative bg-cream border border-ink/15 p-6 lg:p-10 overflow-x-auto">
          <svg viewBox="0 0 1280 480" className="w-full min-w-[900px] h-auto" role="img" aria-label="Service blueprint">
            {/* Lanes */}
            {lanes.map((lane, li) => {
              const y = 70 + li * 100;
              return (
                <g key={li}>
                  <line x1="220" y1={y} x2="1240" y2={y} stroke="#0E1116" strokeWidth="1" opacity="0.18" />
                  <text x="20" y={y + 4} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2.4" fill={lane.color} opacity={li === 0 ? 1 : 0.6}>
                    {lane.label}
                  </text>
                  {lane.steps.map((s, si) => {
                    const x = 260 + si * 162;
                    const active = li === 0;
                    return (
                      <g key={si}>
                        <rect
                          x={x - 60}
                          y={y - 18}
                          width="140"
                          height="36"
                          fill={active ? "#CF4520" : "none"}
                          stroke={active ? "none" : "#0E1116"}
                          strokeOpacity="0.25"
                          strokeWidth="1"
                        />
                        <text
                          x={x + 10}
                          y={y + 4}
                          fontFamily={active ? "serif" : "ui-monospace, monospace"}
                          fontStyle={active ? "italic" : "normal"}
                          fontSize={active ? "16" : "12"}
                          fill={active ? "#F5F1EB" : "#0E1116"}
                          opacity={active ? 1 : 0.72}
                          textAnchor="middle"
                        >
                          {s}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Vertical connectors per step */}
            {[0, 1, 2, 3, 4, 5].map((si) => (
              <line
                key={si}
                x1={270 + si * 162}
                y1="78"
                x2={270 + si * 162}
                y2="362"
                stroke="#CF4520"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.45"
              />
            ))}

            {/* Line of visibility */}
            <line x1="220" y1="220" x2="1240" y2="220" stroke="#CF4520" strokeWidth="1" strokeDasharray="6 4" />
            <text x="220" y="212" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#CF4520">
              ─── LINE OF VISIBILITY
            </text>

            {/* Line of internal interaction */}
            <line x1="220" y1="320" x2="1240" y2="320" stroke="#0E1116" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
            <text x="220" y="312" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#0E1116" opacity="0.55">
              ─── LINE OF INTERNAL INTERACTION
            </text>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 02 · Service blueprint · Generic SaaS journey
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Workshop() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10 items-end">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">In the room</div>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            We map the whole service <span className="italic">in the room</span> — not in slides afterwards.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <EditorialFigure caption="Workshop · Service blueprint · 2026">
            <img
              src={workshopImage}
              alt="Wall of hand-drawn service blueprint sticky notes in coral and ink, hands holding a marker mid-mark"
              className="w-full block"
              style={{ aspectRatio: "4/5", objectFit: "cover" }}
            />
          </EditorialFigure>
        </div>
      </div>
    </section>
  );
}

export function ServiceDesignContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Truths />
      <Blueprint />
      <Capabilities />
      <Workshop />
      <Principles />
    </PageShell>
  );
}

export default ServiceDesignContent;
