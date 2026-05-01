import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";

const SOLUTIONS = [
  { tag: "PLEX EXPERTISE", t: "PLEX ERP Modernization", d: "Cloud migration via the strangler-fig pattern. Modern API layers. Custom extensions. Microservices extraction. Zero-downtime cutover." },
  { tag: "AI / ML", t: "Predictive Maintenance & Quality AI", d: "Real-time sensor data → anomaly detection → failure prediction → automated scheduling. Custom ML models trained on your production data." },
  { tag: "DATA", t: "Production Intelligence Platform", d: "Unified data layer connecting PLEX, MES, SCADA, and IoT sensors. Real-time dashboards for OEE, throughput, quality, and supply chain visibility." },
  { tag: "GREENOPS", t: "Sustainable Manufacturing", d: "Carbon-aware production scheduling. Energy optimization. Automated ESG compliance reporting on top of your operational data." },
];

const METRICS = [
  { v: "42%", l: "Average unplanned downtime reduction" },
  { v: "$2M+", l: "Annual infrastructure savings per engagement" },
  { v: "99.95%", l: "Uptime maintained during PLEX migrations" },
  { v: "72hr", l: "Failure prediction lead time" },
];

const CASES = [
  { tag: "PLEX modernization", t: "PLEX-to-Cloud migration for a $200M automotive parts manufacturer", m: ["$2.4M annual savings", "0 min downtime", "18 weeks"] },
  { tag: "Predictive maintenance", t: "ML pipeline for 200+ industrial production machines", m: ["42% downtime ↓", "72-hour prediction", "$1.8M prevented losses/yr"] },
  { tag: "Supply chain intelligence", t: "AI-powered visibility for a consumer goods manufacturer", m: ["30% forecast accuracy ↑", "22% inventory cost ↓", "40+ suppliers connected"] },
];

const STACK = [
  { h: "ERP & industrial", l: ["Plex by Rockwell", "SAP integration", "SCADA / OPC-UA", "MQTT · IoT Hub", "Ignition (Inductive)"] },
  { h: "AI & data", l: ["PyTorch", "TensorFlow", "AWS SageMaker", "Snowflake", "Databricks", "Kafka", "Grafana"] },
  { h: "Cloud & DevOps", l: ["AWS · Azure", "Kubernetes", "Terraform", "GitHub Actions", "Datadog"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[480px] h-[480px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <rect x="60" y="60" width="520" height="520" stroke="#CF4520" strokeWidth="1" opacity="0.25" />
        <rect x="140" y="140" width="360" height="360" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <path d="M60 60 L580 580" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Manufacturing & Industry 4.0
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["From shop floor", "to smart factory —", "without rewriting", "everything."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7.2vw,124px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Your production lines generate millions of data points every shift. Most go unanalyzed. We engineer the AI systems that turn that data into predictive intelligence — reducing downtime, optimizing throughput, and modernizing the ERP infrastructure that holds it all together.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Challenge() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The reality</div>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            The mid-market manufacturing <span className="italic">dilemma.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-6 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
          <p>You're running a $50M–$500M operation on a 15-year-old ERP nobody wants to touch. PLEX holds your production data, supply-chain logic, and compliance records — but it was architected for a pre-cloud, pre-AI world.</p>
          <p>Your supply chain is a black box. Quality control still relies on statistical sampling instead of computer vision. Maintenance is reactive — fixing machines after they break, at $47K per hour of unplanned downtime.</p>
          <p>The big consulting firms want $5M and 18 months for a "digital transformation roadmap." You don't need more strategy. You need an engineering partner.</p>
          <p className="font-display text-[clamp(22px,2.6vw,34px)] italic leading-tight text-ink not-prose pt-4">
            Deep PLEX expertise, production-grade AI, and a team that has actually been on a factory floor.
          </p>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we engineer</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four interconnected capabilities <span className="italic">for the smart factory.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15">
          {SOLUTIONS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-cream p-8 lg:p-12 group hover:bg-paper transition-colors">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">{s.tag}</div>
              <div className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.1] font-light text-ink mb-4 group-hover:italic transition-all">{s.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-12">Numbers from the floor</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {METRICS.map((m, i) => (
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

function Cases() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Selected work</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Three engagements. <span className="italic">Three problems we solved.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {CASES.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-10">
              <div className="col-span-12 lg:col-span-2 font-mono text-[11px] tracking-[0.2em] uppercase text-coral">{c.tag}</div>
              <div className="col-span-12 lg:col-span-5">
                <div className="font-display text-[clamp(22px,2.4vw,32px)] leading-tight font-light text-ink">{c.t}</div>
              </div>
              <div className="col-span-12 lg:col-span-5 grid grid-cols-3 gap-4">
                {c.m.map((m, j) => (
                  <div key={j} className="border-t border-ink/30 pt-3">
                    <div className="font-display italic text-lg lg:text-xl text-coral leading-tight">{m}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Tech stack</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STACK.map((c, i) => (
            <div key={i} className="border-t border-ink pt-6">
              <div className="font-display text-2xl text-ink mb-5 italic">{c.h}</div>
              <ul className="space-y-2">
                {c.l.map((it, j) => (
                  <li key={j} className="text-[15px] text-ink-soft">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManufacturingContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Challenge />
      <Solutions />
      <Metrics />
      <Cases />
      <Stack />
    </PageShell>
  );
}

export default ManufacturingContent;
