import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";

const QUADRANTS = ["Languages & Frameworks", "Platforms", "Tools", "AI & Data"];
const RINGS = ["Adopt", "Trial", "Assess", "Hold"];

const BLIPS = [
  { n: "React",            ring: "Adopt",  q: "Languages & Frameworks", note: "Default UI framework for client work." },
  { n: "TypeScript",       ring: "Adopt",  q: "Languages & Frameworks", note: "Mandatory for any non-trivial codebase." },
  { n: "Python 3.12",      ring: "Adopt",  q: "Languages & Frameworks", note: "Standard for data, ML, automation." },
  { n: "Go",               ring: "Adopt",  q: "Languages & Frameworks", note: "Where throughput matters more than ergonomics." },
  { n: "Rust",             ring: "Trial",  q: "Languages & Frameworks", note: "Wasm modules and edge runtimes." },
  { n: "Tailwind CSS v4",  ring: "Adopt",  q: "Languages & Frameworks", note: "Lower CSS surface area, faster iteration." },
  { n: "jQuery",           ring: "Hold",   q: "Languages & Frameworks", note: "Legacy only. Replace on next refactor." },

  { n: "AWS",              ring: "Adopt",  q: "Platforms", note: "Default cloud for most engagements." },
  { n: "Kubernetes",       ring: "Adopt",  q: "Platforms", note: "Reach for it only when it's truly justified." },
  { n: "Snowflake",        ring: "Adopt",  q: "Platforms", note: "Warehouse-of-record for analytics." },
  { n: "Cloudflare Workers", ring: "Trial",q: "Platforms", note: "Edge logic + low-latency APIs." },
  { n: "Plex (Rockwell)",  ring: "Trial",  q: "Platforms", note: "Wrap with APIs, don't extend the monolith." },
  { n: "Monolithic ERP",   ring: "Hold",   q: "Platforms", note: "Strangle-pattern out of these systems." },

  { n: "Cursor",           ring: "Adopt",  q: "Tools", note: "Default editor for AI-assisted engineering." },
  { n: "Lenis",            ring: "Adopt",  q: "Tools", note: "Smooth scroll on every editorial site we ship." },
  { n: "Datadog",          ring: "Adopt",  q: "Tools", note: "Observability across services and infra." },
  { n: "Linear",           ring: "Adopt",  q: "Tools", note: "Project tracking that doesn't slow teams down." },
  { n: "Storybook",        ring: "Trial",  q: "Tools", note: "Component-driven design systems." },
  { n: "Jira (legacy)",    ring: "Hold",   q: "Tools", note: "Migrate teams to Linear when you can." },

  { n: "Llama 3 / 4",      ring: "Trial",  q: "AI & Data", note: "Self-hosted reasoning where data must stay private." },
  { n: "Claude Sonnet 4.6",ring: "Adopt",  q: "AI & Data", note: "Default model for production agents." },
  { n: "MCP (Model Context Protocol)", ring: "Trial", q: "AI & Data", note: "Tool integration standard worth committing to." },
  { n: "LangChain",        ring: "Trial",  q: "AI & Data", note: "Prototyping; rewrite for production." },
  { n: "Edge AI",          ring: "Assess", q: "AI & Data", note: "Promising for industrial vision workloads." },
  { n: "Digital Twins",    ring: "Assess", q: "AI & Data", note: "Use carefully — most pilots stay pilots." },
  { n: "Agentic Workflows",ring: "Trial",  q: "AI & Data", note: "Productionizing for ops automation." },
];

const RING_HINT = {
  Adopt: "We've used these in production. Default choice.",
  Trial: "Worth a real bet on a contained project.",
  Assess: "Watching closely. Build a spike, not a foundation.",
  Hold: "Avoid for new work. Migrate where reasonable.",
};

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          The mVerve Tech Radar · Q1 2026
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["What we tell", "clients to adopt,", "trial, assess —", "and avoid."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7vw,118px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            The Tech Radar is mVerve's opinion on the technologies, methods, and decisions shaping industrial AI. Updated quarterly, written by the engineers actually shipping the work.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Legend() {
  return (
    <section className="px-6 lg:px-10 py-12 border-y border-rule bg-paper">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {RINGS.map((r) => (
          <div key={r}>
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                r === "Adopt" ? "bg-coral" :
                r === "Trial" ? "bg-ink" :
                r === "Assess" ? "bg-ink-muted" : "bg-rule border border-ink-muted"
              }`} />
              <span className="font-display text-2xl text-ink">{r}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-muted">{RING_HINT[r]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RadarPlot() {
  const RADII = { Adopt: 70, Trial: 130, Assess: 190, Hold: 240 };
  const QUAD_ANGLES = {
    "Languages & Frameworks": { from: 180, to: 270 },
    "Platforms": { from: 270, to: 360 },
    "Tools": { from: 0, to: 90 },
    "AI & Data": { from: 90, to: 180 },
  };
  const COLOR = { Adopt: "#CF4520", Trial: "#0E1116", Assess: "#0E1116", Hold: "#94A3B8" };
  const cx = 320, cy = 320;

  // distribute blips by quadrant + ring with deterministic angular jitter
  const placements = BLIPS.map((b, i) => {
    const range = QUAD_ANGLES[b.q];
    const blipsInSlot = BLIPS.filter((x) => x.q === b.q && x.ring === b.ring);
    const idx = blipsInSlot.indexOf(b);
    const span = range.to - range.from;
    const step = span / (blipsInSlot.length + 1);
    const angle = range.from + step * (idx + 1);
    const r = RADII[b.ring] - 12;
    const rad = (angle * Math.PI) / 180;
    return { ...b, x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
  });

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The radar, visualised</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Twenty-six blips. <span className="italic">One picture.</span>
            </h2>
          </div>
        </div>

        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12">
          <svg viewBox="0 0 640 640" className="w-full h-auto max-w-[820px] mx-auto block" role="img" aria-label="Tech Radar plot">
            {/* Rings */}
            {Object.entries(RADII).map(([ring, r]) => (
              <g key={ring}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0E1116" strokeWidth="1" opacity={ring === "Adopt" ? 0.4 : 0.18} />
                <text x={cx + r - 4} y={cy + 4} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.55" textAnchor="end">
                  {ring.toUpperCase()}
                </text>
              </g>
            ))}
            {/* Quadrant lines */}
            <line x1={cx - 260} y1={cy} x2={cx + 260} y2={cy} stroke="#0E1116" strokeWidth="1" opacity="0.2" />
            <line x1={cx} y1={cy - 260} x2={cx} y2={cy + 260} stroke="#0E1116" strokeWidth="1" opacity="0.2" />
            {/* Quadrant labels */}
            <text x={cx - 250} y={cy - 250} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#CF4520">LANGUAGES & FRAMEWORKS</text>
            <text x={cx + 250} y={cy - 250} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#CF4520" textAnchor="end">PLATFORMS</text>
            <text x={cx + 250} y={cy + 260} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#CF4520" textAnchor="end">TOOLS</text>
            <text x={cx - 250} y={cy + 260} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#CF4520">AI & DATA</text>

            {/* Blips */}
            {placements.map((b, i) => (
              <g key={b.n}>
                <circle cx={b.x} cy={b.y} r="6" fill={COLOR[b.ring]} opacity={b.ring === "Hold" ? 0.5 : 1} />
                <text x={b.x + 9} y={b.y + 4} fontFamily="ui-monospace, monospace" fontSize="9" fill="#0E1116" opacity="0.85">{b.n}</text>
              </g>
            ))}
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6 text-center">
            Fig. 03 · mVerve Tech Radar · Q1 2026
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function RadarTable() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...RINGS];

  const grouped = useMemo(() => {
    const out = {};
    QUADRANTS.forEach((q) => {
      out[q] = BLIPS.filter((b) => b.q === q && (filter === "All" || b.ring === filter));
    });
    return out;
  }, [filter]);

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] font-light text-ink max-w-[18ch]">
            Twenty-six entries across four <span className="italic">quadrants</span>.
          </h2>
          <div className="flex items-center gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-[13px] font-mono tracking-[0.1em] uppercase border transition-colors ${
                  filter === f ? "bg-ink text-cream border-ink" : "bg-cream text-ink-soft border-ink/20 hover:border-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/15">
          {QUADRANTS.map((q) => (
            <div key={q} className="bg-cream p-6 lg:p-10">
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-ink/15">
                <div className="font-display text-[clamp(22px,2.4vw,32px)] font-light text-ink">{q}</div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">{grouped[q].length} {grouped[q].length === 1 ? "entry" : "entries"}</div>
              </div>
              {grouped[q].length === 0 ? (
                <p className="text-[14px] text-ink-muted py-8">No entries match the current filter.</p>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {grouped[q].map((b) => (
                    <motion.li
                      key={b.n}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="py-5 grid grid-cols-12 gap-3 group"
                    >
                      <div className="col-span-1 pt-1">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                          b.ring === "Adopt" ? "bg-coral" :
                          b.ring === "Trial" ? "bg-ink" :
                          b.ring === "Assess" ? "bg-ink-muted" : "bg-rule border border-ink-muted"
                        }`} />
                      </div>
                      <div className="col-span-11">
                        <div className="flex items-baseline justify-between gap-4 mb-1">
                          <div className="font-display text-[20px] lg:text-[22px] text-ink leading-tight">{b.n}</div>
                          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted shrink-0">{b.ring}</div>
                        </div>
                        <p className="text-[14px] leading-relaxed text-ink-soft">{b.note}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">From the editors</div>
          <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            Three shifts driving this <span className="italic">edition.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-12">
          {[
            { n: "01", t: "Agentic workflows are graduating to production.", d: "We're seeing real traction with MCP and Claude Sonnet for ops automation. The bar is no longer 'can it work', it's 'can it stay reliable for six months without a babysitter.' Trial — not Adopt yet — but the gap is closing fast." },
            { n: "02", t: "GreenOps moves from nice-to-have to procurement requirement.", d: "Carbon-aware scheduling and embodied-emission accounting are showing up in enterprise RFPs. Teams that can quantify the carbon impact of their cloud workloads will win bids the others can't even bid on." },
            { n: "03", t: "Edge AI is closer than the discourse suggests.", d: "For industrial vision and predictive maintenance, edge inference on commodity hardware is finally cheap enough and accurate enough. Still Assess for most teams — the tooling is rough — but worth a serious spike if vision is on your roadmap." },
          ].map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="border-t border-ink pt-6">
              <div className="font-mono text-[10px] tracking-[0.2em] text-coral mb-3">{row.n}</div>
              <div className="font-display text-[clamp(22px,2.4vw,32px)] leading-tight font-light text-ink mb-3">{row.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{row.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechRadarContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Legend />
      <RadarPlot />
      <RadarTable />
      <Editorial />
    </PageShell>
  );
}

export default TechRadarContent;
