import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import datacenterImg from "../assets/greenops-datacenter.png";

const FORCES = [
  { h: "Compute is now an emissions line.", d: "Scope-3 reporting frameworks (CSRD, SEC climate rules, GHG Protocol) increasingly demand cloud and data-center carbon disclosure. The audit is coming." },
  { h: "Right-sizing pays for itself in a quarter.", d: "Most enterprise workloads run at 12–18% utilization. Carbon-aware scheduling and right-sizing typically cut both spend and emissions by 35–60%." },
  { h: "Procurement is starting to ask.", d: "Enterprise RFPs increasingly require carbon impact statements per workload. Teams that can answer win bids the others can't bid on." },
];

const CAPABILITIES = [
  { tag: "Carbon-Aware Scheduling", t: "Run workloads when the grid is clean.", d: "Time-shift batch jobs and inference to low-carbon-intensity windows using regional grid data. Same SLA, lower emissions." },
  { tag: "Right-Sizing", t: "Stop paying for idle.", d: "Continuous profiling for compute, memory, and storage. We typically claw back 30–50% in the first eight weeks." },
  { tag: "Embodied Emissions", t: "Account for the hardware, not just the runtime.", d: "Track embodied emissions across cloud regions and on-prem fleets. Map them to product, team, and feature." },
  { tag: "ESG Reporting", t: "Auditable, line-by-line.", d: "Per-workload carbon attribution with full lineage — the kind a Big Four auditor will actually accept." },
];

const PRINCIPLES = [
  { n: "01", t: "Measure before you optimize.", d: "Baseline emissions per workload, per region, per team. Without numbers, every claim is marketing." },
  { n: "02", t: "Optimize where the carbon lives.", d: "60% of cloud emissions come from 10% of workloads. We hunt those first, not the easy wins." },
  { n: "03", t: "Make it cheaper, too.", d: "GreenOps that doesn't reduce the cloud bill won't survive a CFO meeting. Both numbers move together or it doesn't ship." },
  { n: "04", t: "Report like a regulator will read it.", d: "Methodology, scope boundaries, and assumptions documented from day one — not retrofitted at audit time." },
];

const METRICS = [
  { v: "60%", l: "Median cloud carbon reduction in first six months" },
  { v: "42%", l: "Median cloud spend reduction alongside it" },
  { v: "24hr", l: "Carbon-impact reporting cadence we deliver" },
  { v: "100%", l: "Workloads with attributed emissions post-engagement" },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[520px] h-[520px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        {[...Array(7)].map((_, i) => (
          <path key={i} d={`M40 ${320 + i * 30} Q 320 ${280 - i * 20} 600 ${320 + i * 30}`} stroke="#CF4520" strokeWidth="1" opacity={0.5 - i * 0.06} />
        ))}
        <path d="M40 320 Q 320 80 600 320" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Sustainable AI · GreenOps
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Compute is the new", "emissions line.", "Engineer it like one."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7vw,118px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Carbon-aware scheduling, embodied-emission accounting, and right-sized infrastructure — engineered as part of the build, not audited at the end. Lower emissions and lower bills, by design.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Forces() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Why now</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {FORCES.map((p, i) => (
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
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we engineer</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four pillars of <span className="italic">GreenOps.</span>
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

function Metrics() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-12">What clients see</div>
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

function Principles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Operating principles</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            Four convictions <span className="italic">we ship by.</span>
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

function CarbonChart() {
  // 24-hour carbon intensity sample (gCO2/kWh) — California ISO style
  const intensity = [380, 360, 320, 290, 260, 240, 220, 210, 200, 190, 175, 170, 175, 195, 240, 290, 360, 420, 460, 470, 460, 440, 420, 400];
  const max = 480, min = 150;
  const W = 1180, H = 280, padX = 40, padY = 40;
  const stepX = (W - padX * 2) / 23;
  const yOf = (v) => padY + ((max - v) / (max - min)) * (H - padY * 2);
  const path = intensity.map((v, i) => `${i === 0 ? "M" : "L"} ${padX + i * stepX} ${yOf(v)}`).join(" ");
  // shaded "clean" window (where intensity < 230)
  const cleanStart = intensity.findIndex((v) => v < 230);
  const cleanEnd = intensity.findIndex((v, i) => i > cleanStart && v >= 230);

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Carbon-aware scheduling</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Run when the grid <span className="italic">is clean.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12 overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H + 80}`} className="w-full min-w-[800px] h-auto" role="img" aria-label="24-hour carbon intensity chart">
            {/* Clean window shading */}
            <rect x={padX + cleanStart * stepX} y={padY} width={(cleanEnd - cleanStart) * stepX} height={H - padY * 2} fill="#CF4520" opacity="0.08" />
            <text x={padX + cleanStart * stepX + 8} y={padY + 18} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#CF4520">CLEAN WINDOW · BATCH JOBS RUN HERE</text>

            {/* Y-axis label */}
            <text x="20" y={padY + 12} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.55" transform={`rotate(-90 20 ${padY + 12})`}>gCO₂/kWh</text>

            {/* Line */}
            <path d={path} fill="none" stroke="#0E1116" strokeWidth="2" />

            {/* Workload bars below — only in clean window */}
            {[8, 10, 12].map((h, i) => (
              <rect key={i} x={padX + h * stepX - 14} y={H - padY + 14} width="28" height="22" fill="#CF4520" />
            ))}

            {/* X-axis hours */}
            {[0, 6, 12, 18, 23].map((h, i) => (
              <text key={i} x={padX + h * stepX} y={H - 8} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.55" textAnchor="middle">
                {String(h).padStart(2, "0")}:00
              </text>
            ))}
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 06 · 24-hour grid carbon intensity · Workloads scheduled into the clean window
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function DataCenter() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="Hyperscale · Carbon-aware scheduling">
          <img
            src={datacenterImg}
            alt="Long aisle of a hyperscale data centre, server racks vanishing to perspective with a coral exit-sign glow at the far end"
            className="w-full block"
            style={{ aspectRatio: "21/9", objectFit: "cover" }}
          />
        </EditorialFigure>
      </div>
    </section>
  );
}

export function GreenOpsContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <DataCenter />
      <Forces />
      <CarbonChart />
      <Capabilities />
      <Metrics />
      <Principles />
    </PageShell>
  );
}

export default GreenOpsContent;
