import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const DISCIPLINES = [
  { n: "01", t: "Cloud-Native Engineering", d: "Containers, microservices, infrastructure-as-code, and the discipline to keep them boring.", route: "cloud-native" },
  { n: "02", t: "Enterprise Modernization", d: "Strangler-fig migrations, API layering, and the unglamorous work of getting off legacy without going dark.", route: "modernization" },
  { n: "03", t: "Platform Engineering", d: "Internal developer platforms that make 'the right thing' also 'the easy thing.'", route: "platform" },
  { n: "04", t: "Digital Experience", d: "Editorial-grade frontends with the performance budget enterprise sites usually fail.", route: "experience" },
  { n: "05", t: "Product Strategy & Design", d: "Senior product thinking embedded in engineering, not bolted on at kickoff.", route: "product-strategy" },
  { n: "06", t: "Service Design", d: "End-to-end design for products that touch operations, ops people, and physical artifacts.", route: "service-design" },
  { n: "07", t: "Agile Pods", d: "Senior-led, full-stack teams that ship in two-week sprints with the autonomy to actually do it.", route: "agile-pods" },
  { n: "08", t: "Technical Consulting", d: "Architecture reviews, due-diligence, and second opinions from the people who'd actually build it.", route: "consulting" },
];

const PRINCIPLES = [
  { t: "Production over prototype.", d: "We don't ship demos. Anything we deliver is meant to run for years." },
  { t: "Boring tech, on purpose.", d: "We pick the unsexy proven thing over the new shiny thing — and tell you when we're wrong." },
  { t: "Senior-led, end to end.", d: "Every pod has at least one principal engineer. No bench rotations." },
  { t: "AI woven in, not bolted on.", d: "Engineering with AI in the loop is now the baseline, not the differentiator." },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="40" y1={80 + i * 64} x2="600" y2={80 + i * 64} stroke="#CF4520" strokeWidth="1" opacity={0.4 - i * 0.04} />
        ))}
        <line x1="60" y1="60" x2="60" y2="600" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Expertise
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Eight disciplines.", "One standard:", "production-grade."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Every engagement is built around outcomes that move business metrics — not technology stacks. These are the disciplines we bring to the table.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Disciplines({ navigate }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">The disciplines</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Eight ways we <span className="italic">show up.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {DISCIPLINES.map((d, i) => (
            <motion.button
              key={i}
              onClick={() => navigate && d.route && navigate(d.route)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-8 lg:py-10 w-full text-left -mx-6 lg:-mx-10 px-6 lg:px-10 hover:bg-paper transition-colors"
            >
              <div className="col-span-2 lg:col-span-1 font-mono text-[11px] tracking-[0.2em] text-ink-muted pt-2">{d.n}</div>
              <div className="col-span-10 lg:col-span-4">
                <div className="font-display text-[clamp(24px,2.6vw,38px)] leading-[1.1] tracking-[-0.01em] font-light text-ink group-hover:text-coral group-hover:italic transition-all">
                  {d.t}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-6">
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{d.d}</p>
              </div>
              <div className="col-span-12 lg:col-span-1 lg:col-start-12 self-center justify-self-end">
                <ArrowUpRight size={24} className={`transition-all duration-500 ${d.route ? "text-ink group-hover:text-coral group-hover:rotate-45" : "text-ink-muted/40"}`} />
              </div>
            </motion.button>
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
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we work</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-ink">
            Four <span className="italic">non-negotiables</span> across every discipline.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-5">
              <div className="font-display text-[24px] lg:text-[28px] font-light text-ink mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <HiggsfieldPlaceholder
          kind="image"
          aspect="21/9"
          brief="Editorial wide shot of a craft workshop — drafting tables, monitors, pinned architecture diagrams on a corkboard. Late-evening warm light, sense of considered work. No faces."
          caption="The studio · Craft, considered"
        />
      </div>
    </section>
  );
}

export function ExpertiseHubContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <CraftShot />
      <Disciplines navigate={navigate} />
      <Principles />
    </PageShell>
  );
}

export default ExpertiseHubContent;
