import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Plus } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

/* ─── Content sourced from src/pages/mverve-homepage-wireframe.jsx ─── */
const VALUE_PROPS = [
  { t: "AI-First Engineering", d: "Intelligence woven into every system we build — from DevOps to decision engines." },
  { t: "GreenOps Certified", d: "Carbon-aware computing and NetZero tech stacks. Sustainability isn't optional — it's engineered in." },
  { t: "Domain Deep", d: "Manufacturing, CleanTech, and Healthcare. We understand your world before writing a line of code." },
  { t: "Founders, Not Freshers", d: "Senior-led Agile Pods. Every project gets our best engineers — not a bench rotation." },
];

const SERVICES = [
  { tag: "Decision Engines", t: "Intelligent Decision Engines", d: "Custom AI models that predict, prescribe, and automate your hardest operational decisions.", m: "42% downtime reduction" },
  { tag: "GreenOps", t: "GreenOps Platform", d: "Carbon-aware engineering that cuts your cloud footprint and your costs at the same time.", m: "60% carbon · 35% cost saved" },
  { tag: "Modernization", t: "Legacy Modernization Suite", d: "Strangle the monolith. Migrate to cloud-native. Zero downtime, $2M+ in annual savings.", m: "$2M+ saved per engagement" },
  { tag: "Data", t: "Data Intelligence Studio", d: "Turn fragmented data into a unified intelligence layer your teams can actually use.", m: "10× faster time-to-insight" },
];

const INDUSTRIES = [
  { n: "01", k: "Manufacturing", h: "From shop floor to smart factory.", d: "We modernize PLEX ERP, deploy predictive maintenance AI, and engineer real-time production intelligence — turning legacy plants into data-driven operations.", route: "manufacturing" },
  { n: "02", k: "CleanTech", h: "Engineering the NetZero transition.", d: "Carbon credit platforms, energy grid optimization, and sustainability compliance automation. GreenOps engineers carbon out at the infrastructure level.", route: "cleantech" },
  { n: "03", k: "Healthcare", h: "Intelligent systems for better outcomes.", d: "HIPAA-compliant AI, clinical workflow automation, and patient engagement platforms built with the rigor healthcare demands.", route: "healthcare" },
];

const INSIGHTS = [
  { kicker: "Tech Radar Q1 2026", t: "What we tell clients to adopt, trial, assess and avoid this quarter.", read: "12 min read", route: "tech-radar" },
  { kicker: "Case study", t: "How a 15-year-old PLEX ERP became cloud-native in 18 weeks — with zero downtime.", read: "6 min read", route: "cloud-native" },
  { kicker: "Field notes", t: "GreenOps in practice: the seven design moves that cut our client's carbon by 62%.", read: "9 min read", route: "greenops" },
];

const METHODOLOGY = [
  { n: "01", t: "Discover", d: "Domain immersion. We learn your business before touching code." },
  { n: "02", t: "Architect", d: "Systems design with AI-first thinking and GreenOps by default." },
  { n: "03", t: "Engineer", d: "Senior-led Agile Pods ship production code in two-week sprints." },
  { n: "04", t: "Deploy", d: "Cloud-native CI/CD. Zero-downtime releases. Observability built in." },
  { n: "05", t: "Evolve", d: "Continuous optimization. Your system gets smarter every sprint." },
];

const METRICS = [
  { v: "42%", l: "Average downtime reduction across manufacturing clients" },
  { v: "60%", l: "Cloud carbon footprint reduction via GreenOps" },
  { v: "$2M+", l: "Annual infrastructure savings per engagement" },
  { v: "99.95%", l: "Uptime maintained during legacy migrations" },
];

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg style={{ y }} className="absolute -right-40 -top-20 w-[520px] h-[520px] lg:w-[680px] lg:h-[680px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <circle cx="320" cy="320" r="319" stroke="#CF4520" strokeWidth="1.2" />
        <circle cx="320" cy="320" r="240" stroke="#CF4520" strokeWidth="1" opacity="0.35" />
        <circle cx="320" cy="320" r="160" stroke="#0E1116" strokeWidth="1" opacity="0.15" />
        <path d="M40 320 A 280 280 0 0 1 320 40" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>

      <motion.div style={{ opacity }} className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          AI-Native Engineering Partner
        </motion.div>

        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["We engineer", "intelligent systems", "for the industrial", "future."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Where manufacturing meets intelligence. mVerve builds AI-powered platforms, modernizes legacy infrastructure, and deploys carbon-aware technology — so mid-market enterprises can compete like the giants.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-16 flex items-end justify-between gap-6">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">Bengaluru · Maryland · Est. 2024</div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted hidden md:flex items-center gap-2">
            <span className="w-px h-10 bg-ink-muted/40 inline-block" />
            Scroll
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  const items = ["Generative AI", "Industrial AI", "GreenOps", "Cloud-Native", "Platform Engineering", "Edge Intelligence", "Digital Twins", "MLOps", "Data Mesh"];
  return (
    <section className="border-y border-rule bg-paper py-6 overflow-hidden">
      <div className="flex gap-12 marquee-track w-max">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-display italic text-3xl lg:text-4xl text-ink whitespace-nowrap">{it}</span>
            <Plus size={18} className="text-coral" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Featured insights ─── */
function Insights({ navigate }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section ref={ref} className="py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-24">
          <div className="col-span-12 lg:col-span-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Featured insights</div>
            <h2 className="font-display text-[clamp(40px,5.5vw,84px)] leading-[1] tracking-[-0.02em] text-ink font-light">
              Opinionated thinking, <span className="italic">never neutral.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              The mVerve point of view on the technologies, methods, and decisions shaping industrial AI. Updated quarterly, written by the engineers shipping the work.
            </p>
            <button onClick={() => navigate && navigate("tech-radar")} className="inline-flex items-center gap-2 mt-6 text-[13px] font-medium link-reveal">
              All insights <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {INSIGHTS.map((card, i) => (
            <motion.button key={i} type="button" onClick={() => navigate && navigate(card.route)} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} className="group block text-left w-full">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep mb-6">
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105" style={{
                  background: i === 0 ? "radial-gradient(120% 80% at 20% 100%, #CF4520 0%, #E8E4DA 60%)" :
                              i === 1 ? "linear-gradient(135deg, #0E1116 0%, #2A2D33 60%, #CF4520 130%)" :
                              "conic-gradient(from 200deg at 70% 30%, #E8E4DA, #CF4520, #0E1116, #E8E4DA)",
                }} />
                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/90 mix-blend-difference">{card.kicker}</div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/90 mix-blend-difference flex items-center gap-2">
                    <ArrowUpRight size={14} className="group-hover:rotate-12 transition-transform" />
                    Read
                  </div>
                </div>
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">{card.kicker} · {card.read}</div>
              <h3 className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.01em] text-ink font-light group-hover:text-coral transition-colors lg:min-h-[6rem]">
                {card.t}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pinned services (GSAP scrubbed) ─── */
function PinnedServices() {
  const wrap = useRef(null);
  const stage = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!wrap.current) return;
    const ctx = gsap.context(() => {
      const total = SERVICES.length;
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: () => `+=${total * 80}%`,
        pin: stage.current,
        scrub: 0.4,
        onUpdate: (self) => setActive(Math.min(total - 1, Math.floor(self.progress * total))),
      });
      return () => st.kill();
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="bg-ink text-cream relative">
      <div ref={stage} className="min-h-screen flex flex-col justify-center px-6 lg:px-10 py-20">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="col-span-12 lg:col-span-5">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we engineer</div>
              <h2 className="font-display text-[clamp(36px,4.5vw,72px)] leading-[1] tracking-[-0.02em] font-light text-cream">
                Eight productized offerings. <span className="italic text-cream/70">Each built around a business outcome,</span> not a technology stack.
              </h2>
              <div className="mt-12 flex items-center gap-3">
                {SERVICES.map((_, i) => (
                  <div key={i} className={`h-px transition-all duration-500 ${active === i ? "w-12 bg-coral" : "w-6 bg-cream/20"}`} />
                ))}
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/40 mt-4">
                {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7 min-h-[420px] relative">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-coral mb-8">{SERVICES[active].tag}</div>
                  <h3 className="font-display text-[clamp(36px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-cream">{SERVICES[active].t}</h3>
                  <p className="text-[18px] lg:text-[20px] leading-relaxed text-cream/70 mt-8 max-w-lg">{SERVICES[active].d}</p>
                  <div className="mt-10 inline-flex items-baseline gap-3 border-b border-coral pb-2">
                    <span className="font-display italic text-3xl text-coral">{SERVICES[active].m}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Industries list ─── */
function Industries({ navigate }) {
  const [hover, setHover] = useState(null);
  return (
    <section className="bg-cream py-20 lg:py-28 px-6 lg:px-10 relative">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Industries we transform</div>
            <h2 className="font-display text-[clamp(40px,5.5vw,84px)] leading-[1] tracking-[-0.02em] text-ink font-light">
              We learn your <span className="italic">world</span> before we write a line of code.
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {INDUSTRIES.map((row, i) => (
            <div key={i} role="link" tabIndex={0} onClick={() => navigate && navigate(row.route)} onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && navigate) { e.preventDefault(); navigate(row.route); } }} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="group relative grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-8 lg:py-12 cursor-pointer transition-colors">
              <div className="col-span-2 lg:col-span-1 font-mono text-[11px] tracking-[0.2em] text-ink-muted pt-2">{row.n}</div>
              <div className="col-span-10 lg:col-span-3">
                <div className="font-display text-[clamp(28px,3.4vw,52px)] leading-[1] tracking-[-0.01em] font-light text-ink group-hover:text-coral transition-colors">{row.k}</div>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-6">
                <div className="font-display italic text-[clamp(20px,2vw,28px)] leading-snug text-ink-soft mb-3">{row.h}</div>
                <p className="text-[15px] leading-relaxed text-ink-muted max-w-xl">{row.d}</p>
              </div>
              <div className="col-span-12 lg:col-span-1 lg:col-start-12 self-center justify-self-end">
                <ArrowUpRight size={28} className="text-ink group-hover:text-coral group-hover:rotate-45 transition-all duration-500" />
              </div>
              <div className={`absolute inset-x-0 -inset-y-px pointer-events-none transition-opacity duration-500 ${hover === i ? "opacity-100" : "opacity-0"}`}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl bg-coral/15" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics ─── */
function MetricsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section ref={ref} className="bg-cream-deep border-y border-rule py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-12">Trusted by industry leaders · the numbers</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {METRICS.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} className="border-t border-ink pt-6">
              <div className="font-display text-[clamp(48px,6vw,96px)] leading-[0.9] tracking-[-0.04em] font-light text-ink">{m.v}</div>
              <div className="text-[13px] leading-relaxed text-ink-muted mt-4 max-w-[220px]">{m.l}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 pt-10 border-t border-ink/15">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-6">Selected clients</div>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 opacity-70">
            {["Manufacturing Co.", "Energy Corp.", "HealthTech Inc.", "Retail Group", "FinServ Partners", "CleanTech Ltd."].map((n, i) => (
              <span key={i} className="font-display text-xl lg:text-2xl text-ink italic font-light">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Methodology ─── */
function Methodology() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section ref={ref} className="py-20 lg:py-28 px-6 lg:px-10 bg-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16 lg:mb-20">
          <div className="col-span-12 lg:col-span-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">How we engineer</div>
            <h2 className="font-display text-[clamp(40px,5.5vw,84px)] leading-[1] tracking-[-0.02em] text-ink font-light">
              Five phases. <span className="italic">One relentless focus —</span> production-grade outcomes.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-ink/10">
          {METHODOLOGY.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-cream p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-paper transition-colors">
              <div className="font-mono text-[11px] tracking-[0.2em] text-coral">{s.n}</div>
              <div>
                <div className="font-display text-3xl lg:text-4xl font-light text-ink mb-3 group-hover:italic transition-all">{s.t}</div>
                <p className="text-[14px] leading-relaxed text-ink-muted">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Value props ─── */
function ValueProps() {
  return (
    <section className="px-6 lg:px-10 pt-20 lg:pt-28 pb-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What makes us different</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
            Four <span className="italic">non-negotiables</span> baked into every engagement.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {VALUE_PROPS.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-5">
              <div className="font-display text-[24px] lg:text-[28px] font-light text-ink mb-3">{v.t}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page export ─── */
function Showcase() {
  return (
    <section className="px-6 lg:px-10 pb-12 lg:pb-16">
      <div className="max-w-[1440px] mx-auto">
        <HiggsfieldPlaceholder
          kind="animation"
          aspect="21/9"
          brief="Cinematic loop — slow push-in across a working factory floor at dusk: amber sodium lamps, polished concrete, a single robotic arm lit in coral. Atmospheric, editorial, no people."
          caption="Hero · Industrial Future"
        />
      </div>
    </section>
  );
}

export function HomepageContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Showcase />
      <Marquee />
      <Insights navigate={navigate} />
      <PinnedServices />
      <Industries navigate={navigate} />
      <MetricsBand />
      <ValueProps />
      <Methodology />
    </PageShell>
  );
}

export default HomepageContent;
