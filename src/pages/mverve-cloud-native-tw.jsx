import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const OUTCOMES = [
  { v: "$2M+", l: "Annual infrastructure savings per engagement" },
  { v: "60%", l: "Cloud carbon footprint reduction via GreenOps" },
  { v: "10×", l: "Deploy frequency on the platforms we ship" },
  { v: "99.95%", l: "Uptime maintained during legacy migrations" },
];

const DIFFERENTIATORS = [
  { t: "We default to boring.", d: "Postgres before NoSQL. Monoliths before microservices. The cleverness is reserved for the parts that earn it." },
  { t: "Strangle, don't rewrite.", d: "Strangler-fig migrations let you ship value every two weeks instead of telling the board to wait eighteen months." },
  { t: "Platform-first.", d: "Internal developer platforms turn 'every team reinvents the wheel' into 'every team ships on Tuesday.'" },
  { t: "GreenOps by default.", d: "Carbon-aware scheduling, embodied-emission reporting, and right-sized resources are part of the build, not an audit at the end." },
];

const STACK = [
  { h: "Compute & runtime", l: ["AWS · Azure · GCP", "Kubernetes (EKS · AKS · GKE)", "Lambda · Cloud Run", "Cloudflare Workers"] },
  { h: "Data", l: ["Postgres", "Snowflake", "Kafka", "Redis", "DynamoDB", "Elasticsearch"] },
  { h: "Observability", l: ["Datadog · Grafana", "OpenTelemetry", "Sentry", "Honeycomb"] },
  { h: "Delivery", l: ["GitHub Actions", "Terraform", "ArgoCD", "Renovate", "Buildkite"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M40 320 L320 80 L600 320 L320 560 Z" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
        <path d="M120 320 L320 160 L520 320 L320 480 Z" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <path d="M40 320 L320 80" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Cloud-Native Engineering
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Cloud-native,", "the way it was", "supposed to be."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Containers, microservices, and infrastructure-as-code are easy to talk about and hard to ship. We do the hard part: production-grade platforms that stay boring in the best way.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-12">What clients see</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {OUTCOMES.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t border-cream/30 pt-6">
              <div className="font-display text-[clamp(48px,6vw,96px)] leading-[0.9] tracking-[-0.04em] font-light text-cream">{m.v}</div>
              <div className="text-[13px] leading-relaxed text-cream/60 mt-4 max-w-[220px]">{m.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we approach it</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four convictions <span className="italic">we ship by.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {DIFFERENTIATORS.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-6">
              <div className="font-display text-[clamp(24px,2.6vw,34px)] leading-tight font-light text-ink mb-3">{d.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{d.d}</p>
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
            A 15-year-old PLEX monolith, <span className="italic">cloud-native in 18 weeks.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-6 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
          <p>A $200M automotive parts manufacturer was paying for an ERP nobody on the team wanted to touch. We didn't rewrite it. We strangled it — extracting microservices behind an API layer, two services at a time, with zero production downtime through the entire cutover.</p>
          <p>The team got a platform they actually wanted to deploy on. The CFO got $2.4M a year back. The CTO got their Saturday nights back.</p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-ink/20">
            {[
              { v: "$2.4M", l: "Annual savings" },
              { v: "0 min", l: "Cutover downtime" },
              { v: "18 wks", l: "Full migration" },
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">The default stack</div>
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

function ArchitectureStack() {
  const layers = [
    { t: "PRODUCT TEAMS", n: "Apps · APIs · Frontends", color: "#0E1116" },
    { t: "PLATFORM", n: "IDP · Templates · Golden paths", color: "#CF4520" },
    { t: "RUNTIME", n: "Kubernetes · Lambda · Cloud Run", color: "#0E1116" },
    { t: "DATA", n: "Postgres · Snowflake · Kafka", color: "#0E1116" },
    { t: "CLOUD", n: "AWS · GCP · Azure", color: "#0E1116" },
  ];
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The reference stack</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Five layers. <span className="italic">One contract each.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12">
          <svg viewBox="0 0 1280 380" className="w-full h-auto" role="img" aria-label="Cloud-native architecture stack">
            {layers.map((l, i) => {
              const y = 30 + i * 64;
              const isPlatform = l.color === "#CF4520";
              return (
                <g key={i}>
                  <rect x="60" y={y} width="1160" height="48" fill={isPlatform ? "#CF4520" : "none"} stroke={isPlatform ? "none" : "#0E1116"} strokeWidth="1" />
                  <text x="80" y={y + 30} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill={isPlatform ? "#F5F1EB" : "#0E1116"} opacity={isPlatform ? 0.85 : 0.7}>
                    {l.t}
                  </text>
                  <text x="640" y={y + 32} fontFamily="serif" fontStyle="italic" fontSize="20" fill={isPlatform ? "#F5F1EB" : "#0E1116"} textAnchor="middle">
                    {l.n}
                  </text>
                  {i < layers.length - 1 && (
                    <text x="1200" y={y + 32} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.4" textAnchor="end">↓ contract</text>
                  )}
                </g>
              );
            })}
            <text x="640" y="370" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="3" fill="#CF4520" textAnchor="middle">EACH LAYER OWNED · EACH CONTRACT VERSIONED</text>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 08 · Cloud-native reference architecture
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function ControlRoom() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <HiggsfieldPlaceholder
          kind="image"
          aspect="21/9"
          brief="Editorial wide shot of an SRE control room — wall-mounted observability dashboards glowing, dim ambient light, single engineer's silhouette mid-foreground (no face). Coral accent on a single alarm tile."
          caption="Operations · Production observability"
        />
      </div>
    </section>
  );
}

export function CloudNativeContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <ControlRoom />
      <Outcomes />
      <ArchitectureStack />
      <Differentiators />
      <CaseStudy />
      <Stack />
    </PageShell>
  );
}

export default CloudNativeContent;
