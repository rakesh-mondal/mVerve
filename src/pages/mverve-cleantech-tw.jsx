import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import fieldVideo from "../assets/cleantech-field.mp4";

const CHALLENGES = [
  { h: "Hardware companies running on software built for SaaS.", d: "Battery, solar, EV-charging, and microgrid operators are being asked to behave like software companies — by investors, regulators, and customers — without the platforms to do it." },
  { h: "Telemetry firehoses with no narrative.", d: "Every asset reports thousands of points per minute. Most of it sits in time-series databases nobody queries, generating storage cost and compliance exposure." },
  { h: "Carbon attribution that the auditor will accept.", d: "CSRD, SEC climate, and customer Scope-3 demands now require provable per-product, per-shipment, per-megawatt-hour emissions accounting. Most companies aren't ready." },
];

const SOLUTIONS = [
  { tag: "Asset Intelligence", t: "Predictive ops for distributed fleets.", d: "Unified telemetry across solar farms, battery sites, charging stations, or microgrids. Anomaly detection, performance benchmarking, and dispatch optimization in one platform." },
  { tag: "Grid-Aware Compute", t: "Run loads when the grid is clean.", d: "Carbon-aware scheduling for compute, charging, and storage operations. Lower emissions and lower bills, by design." },
  { tag: "ESG & Carbon Accounting", t: "Auditable, line-by-line.", d: "Per-asset, per-product carbon ledgers — with the lineage, methodology, and documentation a Big Four auditor will actually accept." },
  { tag: "Customer Platforms", t: "Editorial-grade UX for hardware brands.", d: "Owner apps, installer portals, and partner dashboards that move the brand the same way the hardware does." },
];

const METRICS = [
  { v: "60%", l: "Median cloud carbon reduction post-engagement" },
  { v: "42%", l: "Median cloud spend reduction alongside it" },
  { v: "24hr", l: "Carbon-impact reporting cadence we deliver" },
  { v: "3.2×", l: "Asset alert signal-to-noise improvement" },
];

const STACK = [
  { h: "Telemetry & data", l: ["Kafka · MQTT", "TimescaleDB", "InfluxDB", "Snowflake", "OPC-UA bridges"] },
  { h: "AI & ML", l: ["PyTorch", "Prophet · Darts", "AWS SageMaker", "Edge inference"] },
  { h: "Carbon & ESG", l: ["GHG Protocol", "OpenLineage", "Persefoni-class ledgers", "Custom attribution"] },
  { h: "Cloud & DevOps", l: ["AWS · Azure", "Kubernetes", "Terraform", "Datadog"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M40 480 Q 320 60 600 480" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <path d="M40 520 Q 320 140 600 520" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <path d="M40 560 Q 320 220 600 560" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          CleanTech & Sustainability
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["The energy transition", "is a software", "engineering problem."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7.2vw,124px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Asset intelligence platforms, carbon-aware compute, ESG accounting, and editorial-grade customer experiences for battery, solar, EV-charging, microgrid, and energy-services companies.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Challenges() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">The reality</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {CHALLENGES.map((p, i) => (
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

function Solutions() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we engineer</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four interconnected capabilities <span className="italic">for cleantech operators.</span>
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

function Stack() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Tech stack</div>
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

function FieldShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="Asset fleet · Utility-scale solar + storage">
          <video
            src={fieldVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full block"
            style={{ aspectRatio: "21/9", objectFit: "cover" }}
          />
        </EditorialFigure>
      </div>
    </section>
  );
}

function GridMix() {
  // Simulated 24h energy mix: solar / wind / battery / grid
  const hours = Array.from({ length: 24 }, (_, h) => h);
  const W = 1180, H = 260, padX = 50, padY = 30;
  const stepX = (W - padX * 2) / 23;
  const yMax = 100;
  const yOf = (v) => padY + ((yMax - v) / yMax) * (H - padY * 2);

  // Stack values per hour (approximate, dawn → noon → dusk)
  const solar = hours.map((h) => Math.max(0, Math.sin(((h - 6) / 12) * Math.PI) * 60));
  const wind = hours.map((h) => 15 + Math.sin(h / 3) * 10);
  const battery = hours.map((h) => (h < 6 || h > 19 ? 25 : 5));
  const grid = hours.map((h, i) => Math.max(0, 100 - solar[i] - wind[i] - battery[i]));

  const stack = (acc) => acc.map((v, i) => `${padX + i * stepX},${yOf(v)}`).join(" ");
  const accumulate = (...arrs) => arrs.reduce((acc, arr) => acc.map((v, i) => v + arr[i]), Array(24).fill(0));

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Energy mix · 24-hour</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              How a clean grid <span className="italic">actually balances.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12">
          <svg viewBox={`0 0 ${W} ${H + 50}`} className="w-full h-auto" role="img" aria-label="24-hour energy mix">
            {/* Stacked area */}
            <polygon
              points={`${padX},${yOf(0)} ${stack(grid)} ${W - padX},${yOf(0)}`}
              fill="#94A3B8" opacity="0.55"
            />
            <polygon
              points={`${padX},${yOf(0)} ${stack(accumulate(grid, battery))} ${W - padX},${yOf(0)}`}
              fill="#0E1116" opacity="0.7"
            />
            <polygon
              points={`${padX},${yOf(0)} ${stack(accumulate(grid, battery, wind))} ${W - padX},${yOf(0)}`}
              fill="#0E1116"
            />
            <polygon
              points={`${padX},${yOf(0)} ${stack(accumulate(grid, battery, wind, solar))} ${W - padX},${yOf(0)}`}
              fill="#CF4520"
            />
            {/* Hour ticks */}
            {[0, 6, 12, 18, 23].map((h) => (
              <text key={h} x={padX + h * stepX} y={H + 20} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.55" textAnchor="middle">{String(h).padStart(2, "0")}:00</text>
            ))}
            {/* Legend */}
            <g transform="translate(50, 20)">
              {[
                { c: "#CF4520", l: "SOLAR" },
                { c: "#0E1116", l: "WIND" },
                { c: "#0E1116", l: "BATTERY", op: 0.7 },
                { c: "#94A3B8", l: "GRID", op: 0.55 },
              ].map((l, i) => (
                <g key={i} transform={`translate(${i * 130}, 0)`}>
                  <rect x="0" y="0" width="14" height="14" fill={l.c} opacity={l.op || 1} />
                  <text x="22" y="11" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.7">{l.l}</text>
                </g>
              ))}
            </g>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 15 · 24-hour energy mix · Sample microgrid
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function CleanTechContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <FieldShot />
      <Challenges />
      <Solutions />
      <GridMix />
      <Metrics />
      <Stack />
    </PageShell>
  );
}

export default CleanTechContent;
