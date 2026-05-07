import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import bengaluruStudio from "../assets/careers-bengaluru-studio.png";
import marylandOffice from "../assets/careers-maryland-office.png";

const ROLES = [
  { team: "AI & Innovation Lab", title: "Senior AI Engineer", location: "Bengaluru / Remote", type: "Full-time" },
  { team: "Cloud & Platform", title: "Staff Platform Engineer", location: "Maryland / Remote", type: "Full-time" },
  { team: "Design", title: "Lead Product Designer", location: "Remote", type: "Full-time" },
  { team: "Engineering", title: "Senior Full-Stack Engineer", location: "Bengaluru", type: "Full-time" },
  { team: "GreenOps", title: "Sustainability Engineer", location: "Remote", type: "Contract → FT" },
  { team: "Talent", title: "Engineering Manager — Industrial AI", location: "Bengaluru", type: "Full-time" },
];

const VALUES = [
  { t: "Founders, not freshers.", d: "Senior-led pods. Every project gets our most experienced engineers — not a bench rotation." },
  { t: "Opinionated by default.", d: "We tell clients what to adopt, trial, assess, and avoid. We expect the same of you." },
  { t: "Production over prototype.", d: "We don't ship demos. Every line of code we deliver is meant for the long haul." },
  { t: "Sustainability is engineering.", d: "GreenOps isn't a checkbox. It's how we architect, deploy, and operate." },
];

function CareersHero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M40 320 A 280 280 0 0 1 600 320" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <circle cx="320" cy="320" r="240" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Careers at mVerve
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Build the systems", "industry actually", "runs on."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            We're a small senior team building AI-native systems for manufacturing, healthcare, and clean energy. No empty Jira tickets. No fake urgency. Just hard, meaningful engineering.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-12">How we work</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {VALUES.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-6">
              <div className="font-display text-[clamp(28px,3vw,42px)] leading-[1.1] tracking-[-0.01em] font-light text-ink mb-4">
                {v.t}
              </div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenRoles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Open roles</div>
            <h2 className="font-display text-[clamp(40px,5.5vw,84px)] leading-[1] tracking-[-0.02em] text-ink font-light">
              Six teams, <span className="italic">six ways</span> to ship.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Don't see your role? We always make room for senior engineers who think for themselves. Email <a href="mailto:careers@mverve.tech" className="text-ink link-reveal">careers@mverve.tech</a>.
            </p>
          </div>
        </div>

        <div className="border-t border-ink/15">
          {ROLES.map((r, i) => (
            <motion.a
              key={i}
              href="mailto:careers@mverve.tech"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-8 lg:py-10 transition-colors hover:bg-paper -mx-6 lg:-mx-10 px-6 lg:px-10"
            >
              <div className="col-span-12 lg:col-span-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">{r.team}</div>
              <div className="col-span-12 lg:col-span-5">
                <div className="font-display text-[clamp(22px,2.4vw,34px)] leading-[1.15] tracking-[-0.01em] font-light text-ink group-hover:text-coral transition-colors">
                  {r.title}
                </div>
              </div>
              <div className="col-span-6 lg:col-span-2 font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted">{r.location}</div>
              <div className="col-span-6 lg:col-span-2 font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted">{r.type}</div>
              <div className="col-span-12 lg:col-span-1 self-center justify-self-end">
                <ArrowUpRight size={24} className="text-ink group-hover:text-coral group-hover:rotate-45 transition-all duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioLife() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-paper">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Studios</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Two studios. <span className="italic">One team.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EditorialFigure caption="Bengaluru · Studio">
            <img
              src={bengaluruStudio}
              alt="Bengaluru engineering studio — exposed-brick walls, oak tables with monitors, two engineers in mid-distance, warm afternoon light through tall windows"
              className="w-full block"
              style={{ aspectRatio: "4/5", objectFit: "cover" }}
            />
          </EditorialFigure>
          <EditorialFigure caption="Maryland · Studio">
            <img
              src={marylandOffice}
              alt="Maryland office — minimal architecture, large autumn-lit windows, single engineer at a whiteboard mid-thought back to camera, brushed concrete floor"
              className="w-full block"
              style={{ aspectRatio: "4/5", objectFit: "cover" }}
            />
          </EditorialFigure>
        </div>
      </div>
    </section>
  );
}

export function CareersContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <CareersHero />
      <Values />
      <StudioLife />
      <OpenRoles />
    </PageShell>
  );
}

export default CareersContent;
