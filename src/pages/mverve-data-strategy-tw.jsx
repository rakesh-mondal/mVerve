import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const PROBLEMS = [
  { h: "Pipelines that nobody owns.", d: "Twelve teams, sixty pipelines, one DAG that fails on a Tuesday — and four hours of triage to find out who built it three years ago." },
  { h: "Quality measured at the dashboard.", d: "By the time bad data hits a leadership review, it's been compounding upstream for weeks. Quality has to be enforced where data is produced, not where it's consumed." },
  { h: "Governance bolted on after the fact.", d: "Lineage, access, and PII handling retrofitted into a warehouse already in production is the most expensive way to build them." },
];

const CAPABILITIES = [
  { tag: "Data Platform", t: "Warehouse-of-record, done right.", d: "Snowflake, BigQuery, or Databricks — designed for the analytics workload you actually have, not the one a vendor's reference architecture assumes." },
  { tag: "Data Contracts", t: "Schemas owned by producers.", d: "Producer teams sign contracts on the data they emit. Breaking changes require explicit negotiation. The downstream stops being everyone's surprise problem." },
  { tag: "Quality & Observability", t: "Tests where the data is born.", d: "Great Expectations, dbt tests, and Soda checks running at ingest — not as a downstream firefighting layer." },
  { tag: "Governance", t: "Lineage, access, and policy as code.", d: "Open lineage, RBAC tied to identity, and policy enforcement that the security team can audit without a meeting." },
];

const PRINCIPLES = [
  { n: "01", t: "Treat data like a product.", d: "Every dataset has an owner, a contract, an SLA, and a roadmap. If it doesn't, it shouldn't be in the warehouse." },
  { n: "02", t: "Quality at the source.", d: "Producer teams are accountable for the schemas and values they emit. Downstream firefighting is a symptom, not a strategy." },
  { n: "03", t: "Governance from day one.", d: "Lineage, access policy, and PII tagging engineered in — not retrofitted under regulatory pressure." },
  { n: "04", t: "Boring tech, on purpose.", d: "Postgres, Snowflake, dbt, Airflow. The cleverness is reserved for the parts that earn it." },
];

const STACK = [
  { h: "Warehouse & lake", l: ["Snowflake", "BigQuery", "Databricks", "Postgres", "S3 / GCS"] },
  { h: "Modelling & orchestration", l: ["dbt Core / Cloud", "Apache Airflow", "Dagster", "Prefect"] },
  { h: "Quality & contracts", l: ["Great Expectations", "Soda", "Monte Carlo", "Data Contracts (open spec)"] },
  { h: "Governance", l: ["OpenLineage", "Unity Catalog", "Atlan", "Collibra"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        {[...Array(10)].map((_, i) => (
          <line key={i} x1="40" y1={80 + i * 50} x2="600" y2={80 + i * 50} stroke="#CF4520" strokeWidth="1" opacity={0.5 - i * 0.04} />
        ))}
        <line x1="60" y1="60" x2="60" y2="600" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Data Strategy & Engineering
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Without trustworthy data,", "AI is just", "confident guessing."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7vw,118px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            The unglamorous, foundational work that makes every AI ambition above it actually viable in production. Data platforms, contracts, quality, and governance — designed from day one, not retrofitted.
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Why data programs stall</div>
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
              Four pillars of <span className="italic">production data.</span>
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
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we approach it</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-cream">
            Four convictions <span className="italic text-cream/70">we ship by.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-cream/30 pt-5">
              <div className="font-mono text-[10px] tracking-[0.2em] text-coral mb-3">{p.n}</div>
              <div className="font-display text-[24px] lg:text-[28px] font-light text-cream mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-cream/70">{p.d}</p>
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

function Lineage() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Contract & lineage</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Producers sign. <span className="italic">Consumers depend.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12 overflow-x-auto">
          <svg viewBox="0 0 1280 380" className="w-full min-w-[900px] h-auto" role="img" aria-label="Data lineage diagram">
            {/* Producers */}
            {["Service A", "Service B", "Service C"].map((s, i) => (
              <g key={i}>
                <rect x="40" y={50 + i * 90} width="200" height="60" fill="#0E1116" />
                <text x="140" y={86 + i * 90} fontFamily="serif" fontStyle="italic" fontSize="20" fill="#F5F1EB" textAnchor="middle">{s}</text>
                <line x1="240" y1={80 + i * 90} x2="380" y2="190" stroke="#0E1116" strokeWidth="1" opacity="0.55" />
              </g>
            ))}

            {/* Contract layer */}
            <rect x="380" y="140" width="240" height="100" fill="none" stroke="#CF4520" strokeWidth="1.5" />
            <text x="500" y="170" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#CF4520" textAnchor="middle">DATA CONTRACTS</text>
            <text x="500" y="200" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" textAnchor="middle">Schema · SLA</text>
            <text x="500" y="224" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" textAnchor="middle">Owner · Tests</text>

            <line x1="620" y1="190" x2="700" y2="190" stroke="#0E1116" strokeWidth="1" />

            {/* Warehouse */}
            <rect x="700" y="140" width="200" height="100" fill="#CF4520" />
            <text x="800" y="170" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">WAREHOUSE</text>
            <text x="800" y="208" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#F5F1EB" textAnchor="middle">Snowflake</text>

            {/* Consumers */}
            {["Analytics", "ML / AI", "Reporting"].map((s, i) => (
              <g key={i}>
                <line x1="900" y1="190" x2="1040" y2={80 + i * 90} stroke="#0E1116" strokeWidth="1" opacity="0.55" />
                <rect x="1040" y={50 + i * 90} width="200" height="60" fill="none" stroke="#0E1116" strokeWidth="1" />
                <text x="1140" y={86 + i * 90} fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" textAnchor="middle">{s}</text>
              </g>
            ))}

            {/* Quality + lineage rail */}
            <rect x="40" y="320" width="1200" height="40" fill="none" stroke="#CF4520" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="640" y="346" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="3" fill="#CF4520" textAnchor="middle">QUALITY TESTS · LINEAGE · ACCESS POLICY · OBSERVABILITY</text>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 10 · Data contracts · Lineage flow
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function DataStrategyContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Problems />
      <Capabilities />
      <Lineage />
      <Principles />
      <Stack />
    </PageShell>
  );
}

export default DataStrategyContent;
