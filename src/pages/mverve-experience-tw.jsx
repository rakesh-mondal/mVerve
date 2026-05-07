import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import showreelVideo from "../assets/experience-showreel.mp4";

const TRUTHS = [
  { h: "Enterprise frontends are usually slow, ugly, and accessible to nobody.", d: "Most B2B and industrial UIs are stuck in a 2014 Bootstrap era. Editorial-grade craft is treated as 'nice to have.' We disagree." },
  { h: "Performance is a brand decision.", d: "If your dashboard takes 4 seconds to load, the user concludes your engineering is slow. Whether or not that's true." },
  { h: "Accessibility is not optional.", d: "WCAG 2.2 compliance is now table stakes — and the easiest way to lose a public-sector deal is to fail an audit." },
];

const CAPABILITIES = [
  { tag: "Editorial UI", t: "Frontends with craft.", d: "Type systems, motion, and visual rhythm at the level of a flagship publication. Not a bootstrap template with a logo." },
  { tag: "Design Systems", t: "Tokens to ship-ready components.", d: "Figma libraries → token pipelines → React components → Storybook. One source of truth that designers and engineers actually share." },
  { tag: "Performance Budgets", t: "Lighthouse 95+, every release.", d: "Performance is a CI gate, not an afterthought. Bundle budgets, route-level CWV alerts, and real-user monitoring on day one." },
  { tag: "Accessibility", t: "WCAG 2.2 AA, default.", d: "Automated axe checks, manual screen-reader audits, and keyboard-only QA. Compliance is a side effect of doing the work right." },
];

const STACK = [
  { h: "Frontend", l: ["React", "Next.js", "Astro (content)", "TanStack", "Tailwind v4"] },
  { h: "Design system", l: ["Figma", "Style Dictionary", "Storybook", "Chromatic"] },
  { h: "Motion & quality", l: ["Framer Motion", "GSAP · Lenis", "axe · pa11y", "Playwright"] },
  { h: "Observability", l: ["Vercel Analytics", "Sentry · LogRocket", "RUM (Datadog)"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <line x1="80" y1="100" x2="560" y2="100" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <line x1="80" y1="200" x2="400" y2="200" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="280" x2="520" y2="280" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="360" x2="320" y2="360" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <line x1="80" y1="440" x2="480" y2="440" stroke="#CF4520" strokeWidth="1" opacity="0.3" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Digital Experience
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Editorial-grade frontends.", "Performance budgets", "enterprise sites usually fail."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(36px,6.8vw,114px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Type systems, motion, performance, and accessibility — engineered to the level of a flagship publication. The craft your engineering deserves and the speed your users will actually feel.
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Three things we hold</div>
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

function Capabilities() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we deliver</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four ways we make a frontend <span className="italic">unmistakable.</span>
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

function TypeSpec() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-paper">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The type system</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Hierarchy as <span className="italic">a contract.</span>
            </h2>
          </div>
        </div>
        <figure className="bg-cream border border-ink/15 p-8 lg:p-12">
          <div className="space-y-8">
            {[
              { size: "clamp(48px,7vw,120px)", weight: 300, label: "DISPLAY · 120 / 1.0", text: "Editorial display.", italic: true, coral: true },
              { size: "clamp(34px,4.5vw,68px)", weight: 300, label: "HEADLINE · 68 / 1.05", text: "Section headline." },
              { size: "clamp(22px,2.4vw,32px)", weight: 300, label: "PULL · 32 / 1.15", text: "Pull quote, italic accent.", italic: true },
              { size: "20px", weight: 400, label: "BODY · 18 / 1.6", text: "Body copy. The thing readers actually finish." },
              { size: "11px", weight: 500, label: "MONO · 11 / TRACKED", text: "TAG · LABEL · CAPTION", mono: true },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-baseline border-t border-ink/15 pt-4">
                <div className="col-span-3 font-mono text-[10px] tracking-[0.2em] uppercase text-coral">{row.label}</div>
                <div
                  className="col-span-9 text-ink"
                  style={{
                    fontSize: row.size,
                    fontWeight: row.weight,
                    fontFamily: row.mono ? "ui-monospace, monospace" : '"Playfair Display", serif',
                    fontStyle: row.italic ? "italic" : "normal",
                    color: row.coral ? "#CF4520" : undefined,
                    letterSpacing: row.mono ? "0.2em" : undefined,
                    textTransform: row.mono ? "uppercase" : undefined,
                    lineHeight: 1.1,
                  }}
                >
                  {row.text}
                </div>
              </div>
            ))}
          </div>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-10">
            Fig. 13 · Type specimen · The five voices
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Showreel() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="Recent work · Editorial frontends">
          <video
            src={showreelVideo}
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

export function ExperienceContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Showreel />
      <Truths />
      <Capabilities />
      <TypeSpec />
      <Stack />
    </PageShell>
  );
}

export default ExperienceContent;
