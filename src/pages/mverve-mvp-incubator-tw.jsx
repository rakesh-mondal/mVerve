import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import podImg from "../assets/mvp-incubator-pod.png";

const FAILS = [
  { h: "MVPs that aren't minimum or viable.", d: "Most 'MVPs' are either six-month engineering projects in disguise or throwaway prototypes nobody can ship. Neither tells you anything." },
  { h: "Validation theater.", d: "A demo that wows the board doesn't validate the bet. Real users with real money on the line do." },
  { h: "The hand-off cliff.", d: "Outside teams build the MVP, then disappear. Your team inherits a codebase they didn't design, on infrastructure they don't run." },
];

const PHASES = [
  { n: "01", t: "Shape", d: "Two weeks. We pin down the riskiest assumption — technical, market, or operational — and design the smallest experiment that can falsify it." },
  { n: "02", t: "Build", d: "Four to six weeks. A senior pod ships a production-grade slice on infrastructure your team can run. No throwaway demos." },
  { n: "03", t: "Test", d: "Two to four weeks with real users, real volume, real KPIs. Iterate weekly with the people who'll own it after we leave." },
  { n: "04", t: "Hand-off", d: "One week. Runbooks, eval suites, observability, and on-call rotations transferred to your team. We stay on retainer for the first month if you want." },
];

const PRINCIPLES = [
  { t: "Production from week one.", d: "Same infra, same CI, same observability you'll run at scale. No throwaway sandboxes that need to be rebuilt later." },
  { t: "One bet at a time.", d: "Every MVP exists to test one assumption. If we can't articulate it in a sentence, we don't start." },
  { t: "Senior-led, end to end.", d: "Principals on the keyboard. Not a junior team with a part-time architect on Slack." },
  { t: "Built to be inherited.", d: "Boring tech, clear naming, real docs. Your team should feel at home in the codebase by week three." },
];

const SAMPLES = [
  { tag: "Industrial AI", t: "A vision-model MVP that proved $1.8M of avoided defects in eight weeks.", m: ["8 weeks", "1 line", "73% accuracy"] },
  { tag: "Insurance", t: "An LLM underwriter MVP that won the renewal bid and unlocked Series B.", m: ["6 weeks", "1 product line", "76% draft rate"] },
  { tag: "CleanTech", t: "A carbon-attribution MVP that became the company's flagship enterprise feature.", m: ["10 weeks", "5 design partners", "$420K ARR pre-launch"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <circle cx="320" cy="320" r="280" stroke="#CF4520" strokeWidth="1" opacity="0.25" />
        <circle cx="320" cy="320" r="200" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <circle cx="320" cy="320" r="120" stroke="#CF4520" strokeWidth="1" opacity="0.6" />
        <circle cx="320" cy="320" r="40" fill="#CF4520" opacity="0.9" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          The MVP Incubator
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Eight weeks.", "One MVP.", "Production from day one."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            For founders, CTOs, and innovation leads who need to test the riskiest bet in the company — fast, with senior engineers, on infrastructure built to outlive the experiment.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Fails() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Why most MVPs fail</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {FAILS.map((p, i) => (
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

function Methodology() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">From idea to handed-off product</div>
        <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-cream max-w-[18ch] mb-16">
          Four phases. <span className="italic text-cream/70">Eight to twelve weeks, give or take.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-cream/10">
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

function Principles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we run it</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four <span className="italic">non-negotiables.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-6">
              <div className="font-display text-[clamp(24px,2.6vw,34px)] leading-tight font-light text-ink mb-3">{p.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Samples() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Selected MVPs</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Three bets. <span className="italic">Three answers.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {SAMPLES.map((c, i) => (
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

function Gantt() {
  const phases = [
    { n: "Shape", w: 2, color: "#0E1116" },
    { n: "Build", w: 5, color: "#CF4520" },
    { n: "Test", w: 3, color: "#0E1116" },
    { n: "Hand-off", w: 1, color: "#0E1116" },
  ];
  const totalWeeks = phases.reduce((s, p) => s + p.w, 0);
  const W = 1180, H = 280, padX = 60, padY = 60;
  const barH = 36;
  const stepX = (W - padX * 2) / totalWeeks;
  let cursor = 0;

  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Eleven-week cadence</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              From bet to <span className="italic">handed-off product.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="MVP Gantt timeline">
            {/* Week ticks */}
            {Array.from({ length: totalWeeks + 1 }).map((_, i) => (
              <g key={i}>
                <line x1={padX + i * stepX} y1={padY - 8} x2={padX + i * stepX} y2={H - padY + 8} stroke="#0E1116" strokeWidth="1" opacity="0.12" />
                <text x={padX + i * stepX} y={H - padY + 30} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.55" textAnchor="middle">W{i}</text>
              </g>
            ))}
            {/* Phase bars */}
            {phases.map((p, i) => {
              const x = padX + cursor * stepX;
              const width = p.w * stepX - 6;
              const y = padY + 30;
              cursor += p.w;
              const isPilot = p.color === "#CF4520";
              return (
                <g key={i}>
                  <rect x={x + 3} y={y} width={width} height={barH} fill={p.color} opacity={isPilot ? 1 : 0.85} />
                  <text x={x + width / 2 + 3} y={y + 24} fontFamily="serif" fontStyle="italic" fontSize="20" fill="#F5F1EB" textAnchor="middle">{p.n}</text>
                  <text x={x + width / 2 + 3} y={y + barH + 22} fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#0E1116" opacity="0.6" textAnchor="middle">{p.w} {p.w === 1 ? "week" : "weeks"}</text>
                </g>
              );
            })}
            {/* Production-from-week-one rail */}
            <line x1={padX} y1={padY + 130} x2={W - padX} y2={padY + 130} stroke="#CF4520" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x={W / 2} y={padY + 122} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="3" fill="#CF4520" textAnchor="middle">PRODUCTION INFRA · WEEK ONE → HAND-OFF</text>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 09 · MVP Incubator timeline · Eleven-week build cadence
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function StudioShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="The Incubator · Active build">
          <img
            src={podImg}
            alt="Three engineers at a long table with multiple screens, wall of sticky notes behind, late-evening warm light, backs to camera"
            className="w-full block"
            style={{ aspectRatio: "21/9", objectFit: "cover" }}
          />
        </EditorialFigure>
      </div>
    </section>
  );
}

export function MVPIncubatorContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <StudioShot />
      <Fails />
      <Gantt />
      <Methodology />
      <Principles />
      <Samples />
    </PageShell>
  );
}

export default MVPIncubatorContent;
