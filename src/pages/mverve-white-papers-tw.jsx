import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder, EditorialFigure } from "../components/Visuals";
import whitepaperCoverFlatlay from "../assets/whitepaper-open-spread.png";
import whitepaperOpenSpread from "../assets/whitepaper-open-spread-2.png";
import whitepaperLibraryShelf from "../assets/whitepaper-library-shelf.png";

const PAPERS = [
  {
    n: "01",
    tag: "AI · Production",
    t: "Beyond the Demo: A Pragmatic Framework for Production-Grade GenAI",
    d: "A working playbook for taking GenAI from impressive proof-of-concept to a system the operations team will pick up at 2am. Eval design, observability, cost discipline, and the human-in-the-loop patterns that survive contact with real users.",
    meta: "32 pages · Q1 2026",
  },
  {
    n: "02",
    tag: "Modernization",
    t: "The Strangler-Fig Playbook: Modernizing Legacy ERPs Without Going Dark",
    d: "How to migrate a 15-year-old monolith into modern services without an 18-month freeze. Service decomposition strategy, anti-corruption layers, dual-write windows, and the cutover patterns we've used on PLEX, SAP, and Oracle estates.",
    meta: "28 pages · Q1 2026",
  },
  {
    n: "03",
    tag: "GreenOps",
    t: "Carbon-Aware Compute: An Engineering Guide for Enterprise GreenOps",
    d: "Right-sizing, carbon-aware scheduling, embodied-emission accounting, and the reporting methodology a Big Four auditor will accept. Worked examples from cloud, data, and inference workloads.",
    meta: "24 pages · Q4 2025",
  },
  {
    n: "04",
    tag: "Industrial AI",
    t: "From Shop Floor Sensors to Predictive Maintenance: A Reference Architecture",
    d: "A reference architecture for going from PLC, OPC-UA, and MQTT data to predictive maintenance models that integrate with PLEX or comparable ERPs. Includes the data-quality and labeling realities most vendors omit.",
    meta: "36 pages · Q4 2025",
  },
  {
    n: "05",
    tag: "Platform · DX",
    t: "Internal Developer Platforms as Products: A Measurement-Driven Approach",
    d: "How to design, ship, and measure an internal developer platform that engineers actually adopt — without mandates. Includes the DX KPI framework we use across enterprise engagements.",
    meta: "20 pages · Q3 2025",
  },
  {
    n: "06",
    tag: "Healthcare",
    t: "Clinical AI Without the Liability: Eval Patterns for Regulated Care Workflows",
    d: "Reference eval suites, hallucination guardrails, audit trails, and human-in-the-loop patterns for clinical AI that has to survive FDA, HIPAA, and the morning huddle.",
    meta: "30 pages · Q3 2025",
  },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <line x1="80" y1="120" x2="560" y2="120" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        {[180, 240, 300, 360, 420, 480].map((y, i) => (
          <line key={i} x1="80" y1={y} x2={560 - i * 40} y2={y} stroke="#CF4520" strokeWidth="1" opacity={0.5 - i * 0.06} />
        ))}
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          White Papers
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Practical writing", "from the engineers", "shipping the work."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7.2vw,124px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Field-tested playbooks, reference architectures, and opinionated frameworks. Written by the principals on the keyboard — not a marketing team that's never seen production.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Papers() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="border-t border-ink/15">
          {PAPERS.map((p, i) => (
            <motion.a
              key={i}
              href="mailto:hello@mverve.tech?subject=White%20paper%20request"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-10 lg:py-12 -mx-6 lg:-mx-10 px-6 lg:px-10 hover:bg-paper transition-colors"
            >
              <div className="col-span-2 lg:col-span-1 font-mono text-[11px] tracking-[0.2em] text-ink-muted pt-2">{p.n}</div>
              <div className="col-span-10 lg:col-span-3 font-mono text-[11px] tracking-[0.2em] uppercase text-coral pt-2">{p.tag}</div>
              <div className="col-span-12 lg:col-span-6">
                <div className="font-display text-[clamp(22px,2.4vw,32px)] leading-[1.15] tracking-[-0.01em] font-light text-ink group-hover:text-coral group-hover:italic transition-all mb-3">
                  {p.t}
                </div>
                <p className="text-[15px] leading-relaxed text-ink-soft mb-3">{p.d}</p>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted">{p.meta}</div>
              </div>
              <div className="col-span-12 lg:col-span-2 self-center justify-self-end flex items-center gap-2 text-[13px] font-medium text-ink">
                Request <ArrowUpRight size={20} className="group-hover:text-coral group-hover:rotate-45 transition-all duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-[15px] text-ink-soft">
            Research request, working draft, or specific question?{" "}
            <a href="mailto:hello@mverve.tech" className="font-display italic text-ink link-reveal">hello@mverve.tech</a>
          </p>
        </div>
      </div>
    </section>
  );
}

function CoverSpread() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-paper">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The shelf</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Editorial-grade <span className="italic">field reports.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditorialFigure caption="No. 01 · GenAI in production">
            <img
              src={whitepaperCoverFlatlay}
              alt="White paper cover flat-lay — Beyond the Demo"
              className="w-full block"
              style={{ aspectRatio: "3/4", objectFit: "cover" }}
            />
          </EditorialFigure>
          <EditorialFigure caption="No. 02 · Strangler-fig playbook">
            <img
              src={whitepaperOpenSpread}
              alt="Open spread of a printed white paper"
              className="w-full block"
              style={{ aspectRatio: "3/4", objectFit: "cover" }}
            />
          </EditorialFigure>
          <EditorialFigure caption="The library · Q1 2026">
            <img
              src={whitepaperLibraryShelf}
              alt="Library shelf with printed white paper reports"
              className="w-full block"
              style={{ aspectRatio: "3/4", objectFit: "cover" }}
            />
          </EditorialFigure>
        </div>
      </div>
    </section>
  );
}

export function WhitePapersContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <CoverSpread />
      <Papers />
    </PageShell>
  );
}

export default WhitePapersContent;
