import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import standupImg from "../assets/agile-pods-standup.png";

const TRUTHS = [
  { h: "Most 'agile' is just waterfall in two-week increments.", d: "Stand-ups, sprint reviews, and a retro every fortnight do not make a team agile. The autonomy to actually decide what to ship does." },
  { h: "Junior teams + a part-time architect on Slack is not a pod.", d: "Real agile pods are senior all the way through. The discipline to write good code at speed comes from experience, not from process." },
  { h: "Bench rotations break trust faster than missed deadlines.", d: "The same five people from kickoff to handoff. Anyone who's lived through a 'team substitution' mid-project knows why." },
];

const SHAPE = [
  { tag: "Pod Composition", t: "Five to seven people, fully cross-functional.", d: "Principal engineer, senior full-stack, senior frontend, designer, product partner, and an embedded ops lead when it warrants. No bench, no backups." },
  { tag: "Cadence", t: "Fortnightly delivery rhythm.", d: "Two-week sprints with end-of-sprint demos to your stakeholders. Friday retros that change something the next Monday." },
  { tag: "Autonomy", t: "Decisions made inside the pod.", d: "Architecture, scope trade-offs, and tooling choices live with the people doing the work. Approval theater is where speed dies." },
  { tag: "Embedded", t: "We sit with your team.", d: "Slack, standups, planning, OKR reviews — the same instruments your team already uses. Not a separate vendor sandbox." },
];

const PRINCIPLES = [
  { t: "Senior, end to end.", d: "Every pod has at least one principal. No 'we'll get them on Tuesday' staffing." },
  { t: "Same five people.", d: "The team that starts ships. No mid-engagement rotations." },
  { t: "Decisions inside the pod.", d: "If the architecture decision needs five external approvals, it'll take five times as long. We resist that." },
  { t: "Production from sprint one.", d: "Real infra, real CI, real observability. No throwaway sandboxes." },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <circle cx="320" cy="320" r="200" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <circle
            key={i}
            cx={320 + Math.cos((deg * Math.PI) / 180) * 200}
            cy={320 + Math.sin((deg * Math.PI) / 180) * 200}
            r="40"
            stroke="#CF4520"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        <circle cx="320" cy="320" r="40" fill="#CF4520" opacity="0.9" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Agile Pods
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Senior-led pods.", "Fortnightly delivery.", "Autonomy to actually do it."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7vw,118px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Five to seven seniors, full-stack and embedded, shipping in two-week sprints with the autonomy to make architecture decisions inside the pod. The same people from kickoff to handoff.
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">What we don't do</div>
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

function Shape() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we shape a pod</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four pieces of <span className="italic">a real pod.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {SHAPE.map((c, i) => (
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
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Operating principles</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-cream">
            Four <span className="italic text-cream/70">non-negotiables.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-cream/30 pt-5">
              <div className="font-display text-[24px] lg:text-[28px] font-light text-cream mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-cream/70">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PodMap() {
  const roles = [
    { t: "Principal Engineer", k: "PRINCIPAL" },
    { t: "Senior Full-stack", k: "ENGINEER" },
    { t: "Senior Frontend", k: "ENGINEER" },
    { t: "Designer", k: "DESIGN" },
    { t: "Product partner", k: "PRODUCT" },
    { t: "Embedded ops lead", k: "OPS" },
  ];
  const cx = 320, cy = 320, r = 180;
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Pod composition</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Six seniors. <span className="italic">One team.</span>
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12">
          <svg viewBox="0 0 640 640" className="w-full max-w-[700px] mx-auto block h-auto" role="img" aria-label="Pod composition">
            {/* Centre — the work */}
            <circle cx={cx} cy={cy} r="70" fill="#CF4520" />
            <text x={cx} y={cy - 4} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">THE WORK</text>
            <text x={cx} y={cy + 24} fontFamily="serif" fontStyle="italic" fontSize="22" fill="#F5F1EB" textAnchor="middle">shipped fortnightly</text>

            {/* Roles around */}
            {roles.map((role, i) => {
              const angle = (i / roles.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(angle) * r;
              const y = cy + Math.sin(angle) * r;
              return (
                <g key={i}>
                  <line x1={cx + Math.cos(angle) * 75} y1={cy + Math.sin(angle) * 75} x2={x - Math.cos(angle) * 50} y2={y - Math.sin(angle) * 50} stroke="#0E1116" strokeWidth="1" opacity="0.5" />
                  <circle cx={x} cy={y} r="50" fill="none" stroke="#0E1116" strokeWidth="1" />
                  <text x={x} y={y - 6} fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="2" fill="#CF4520" textAnchor="middle">{role.k}</text>
                  <text x={x} y={y + 16} fontFamily="serif" fontStyle="italic" fontSize="14" fill="#0E1116" textAnchor="middle">{role.t}</text>
                </g>
              );
            })}
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6 text-center">
            Fig. 12 · Pod composition · Same six seniors, kickoff to handoff
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function StandupShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="Standup · The pod, mid-sprint">
          <img
            src={standupImg}
            alt="Engineers gathered around a single screen at a tall standup desk, exposed-brick wall behind, late afternoon light"
            className="w-full block"
            style={{ aspectRatio: "21/9", objectFit: "cover" }}
          />
        </EditorialFigure>
      </div>
    </section>
  );
}

export function AgilePodsContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <StandupShot />
      <Truths />
      <PodMap />
      <Shape />
      <Principles />
    </PageShell>
  );
}

export default AgilePodsContent;
