import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const STORIES = [
  {
    tag: "Manufacturing · PLEX modernization",
    t: "A 15-year-old PLEX monolith, cloud-native in 18 weeks.",
    d: "A $200M automotive parts manufacturer was paying for an ERP nobody on the team wanted to touch. We strangled it — extracting microservices behind an API layer, two services at a time, with zero production downtime through the entire cutover.",
    m: [
      { v: "$2.4M", l: "Annual savings" },
      { v: "0 min", l: "Cutover downtime" },
      { v: "18 wks", l: "Full migration" },
    ],
    route: "cloud-native",
  },
  {
    tag: "Insurance · Custom LLM",
    t: "A custom LLM that underwrites in 90 seconds.",
    d: "A specialty insurer was losing deals to faster competitors because their underwriting cycle averaged five days. We built a domain-tuned LLM that reads submission packets, retrieves relevant policy precedents, and drafts a recommendation an underwriter can accept, edit, or reject in under two minutes.",
    m: [
      { v: "90s", l: "Median draft latency" },
      { v: "76%", l: "Submissions auto-drafted" },
      { v: "0", l: "Auto-approvals (ever)" },
    ],
    route: "ai-lab",
  },
  {
    tag: "Manufacturing · Predictive maintenance",
    t: "ML that prevents 42% of unplanned downtime across 200+ machines.",
    d: "Real-time sensor data, anomaly detection, and a 72-hour failure-prediction window — feeding directly into the existing PLEX maintenance scheduler. Maintenance went from reactive to predictive without changing the team's workflow.",
    m: [
      { v: "42%", l: "Downtime reduction" },
      { v: "72hr", l: "Prediction lead time" },
      { v: "$1.8M", l: "Prevented losses / yr" },
    ],
    route: "manufacturing",
  },
  {
    tag: "CleanTech · Carbon attribution",
    t: "A carbon attribution MVP that became the company's flagship enterprise feature.",
    d: "An EV-charging operator needed to give enterprise customers per-session, per-vehicle, per-region carbon receipts the way mobile carriers give call detail records. We shipped the MVP in ten weeks. It became the company's flagship enterprise SKU within a quarter.",
    m: [
      { v: "10 weeks", l: "MVP to production" },
      { v: "5", l: "Design partners" },
      { v: "$420K", l: "ARR pre-launch" },
    ],
    route: "greenops",
  },
  {
    tag: "Manufacturing · Supply chain AI",
    t: "AI-powered supply chain visibility across 40+ suppliers.",
    d: "A consumer goods manufacturer with 40+ tier-1 and tier-2 suppliers had no real-time visibility into shipments, inventory positions, or upstream disruptions. We built a unified data layer and an ML forecasting layer on top.",
    m: [
      { v: "30%", l: "Forecast accuracy ↑" },
      { v: "22%", l: "Inventory cost ↓" },
      { v: "40+", l: "Suppliers connected" },
    ],
    route: "manufacturing",
  },
  {
    tag: "Enterprise modernization · SAP",
    t: "A 22-year-old SAP estate, strangled in 14 months.",
    d: "A $1.2B specialty chemicals manufacturer's predecessors had quoted a $14M, three-year S/4 migration. We delivered a strangler-fig modernization in 14 months — order management out first, then pricing, invoicing, and revenue recognition.",
    m: [
      { v: "$9.4M", l: "Saved vs original quote" },
      { v: "0", l: "Cutover-night incidents" },
      { v: "14 mo", l: "Full strangulation" },
    ],
    route: "modernization",
  },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        {[0, 80, 160, 240, 320, 400, 480].map((y, i) => (
          <line key={i} x1="80" y1={y + 80} x2={560 - i * 30} y2={y + 80} stroke="#CF4520" strokeWidth={i === 0 ? 14 : 1} strokeLinecap="round" opacity={i === 0 ? 1 : 0.4 - i * 0.04} />
        ))}
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Success Stories
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Selected work.", "Real numbers.", "Specific systems."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            The work that hits production. Engagements where the metric moved, the auditor signed off, and the team kept the system running long after we left.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Stories({ navigate }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="border-t border-ink/15">
          {STORIES.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => navigate && navigate(s.route)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-12 lg:py-16 w-full text-left -mx-6 lg:-mx-10 px-6 lg:px-10 hover:bg-paper transition-colors"
            >
              <div className="col-span-12 lg:col-span-3 font-mono text-[11px] tracking-[0.2em] uppercase text-coral self-start pt-2">{s.tag}</div>
              <div className="col-span-12 lg:col-span-5">
                <div className="font-display text-[clamp(26px,2.8vw,42px)] leading-[1.1] tracking-[-0.01em] font-light text-ink group-hover:text-coral group-hover:italic transition-all mb-4">
                  {s.t}
                </div>
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{s.d}</p>
              </div>
              <div className="col-span-12 lg:col-span-3 grid grid-cols-3 gap-3">
                {s.m.map((m, j) => (
                  <div key={j} className="border-t border-ink/30 pt-3">
                    <div className="font-display italic text-lg text-coral leading-tight">{m.v}</div>
                    <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted mt-1">{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="col-span-12 lg:col-span-1 self-center justify-self-end">
                <ArrowUpRight size={24} className="text-ink group-hover:text-coral group-hover:rotate-45 transition-all duration-500" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedStoryShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <HiggsfieldPlaceholder
          kind="animation"
          aspect="21/9"
          brief="Triptych slow cross-fade — factory line, server-rack aisle, clinical exam room — each held two seconds. Coral accents on each. Editorial, atmospheric, no people."
          caption="Selected work · Six engagements"
        />
      </div>
    </section>
  );
}

export function SuccessStoriesContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <FeaturedStoryShot />
      <Stories navigate={navigate} />
    </PageShell>
  );
}

export default SuccessStoriesContent;
