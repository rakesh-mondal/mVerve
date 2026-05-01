import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  { n: "01", k: "Manufacturing", h: "From shop floor to smart factory.", d: "We modernize PLEX ERP, deploy predictive maintenance AI, and engineer real-time production intelligence — turning legacy plants into data-driven operations." },
  { n: "02", k: "CleanTech", h: "Engineering the NetZero transition.", d: "Carbon credit platforms, energy grid optimization, and sustainability compliance automation. GreenOps engineers carbon out at the infrastructure level." },
  { n: "03", k: "Healthcare", h: "Intelligent systems for better outcomes.", d: "HIPAA-compliant AI, clinical workflow automation, and patient engagement platforms built with the rigor healthcare demands." },
  { n: "04", k: "Retail & FinTech", h: "Mid-market velocity, enterprise depth.", d: "Headless commerce, fraud intelligence, and AI-driven personalization for businesses competing against the giants." },
];

const INSIGHTS = [
  { kicker: "Tech Radar Q1 2026", t: "What we tell clients to adopt, trial, assess and avoid this quarter.", read: "12 min read" },
  { kicker: "Case study", t: "How a 15-year-old PLEX ERP became cloud-native in 18 weeks — with zero downtime.", read: "6 min read" },
  { kicker: "Field notes", t: "GreenOps in practice: the seven design moves that cut our client's carbon by 62%.", read: "9 min read" },
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

/* Mega-nav structure — links route to real prototype pages */
const NAV_GROUPS = [
  {
    label: "AI & Innovation Lab",
    route: "ai-lab",
    feat: { t: "The mVerve Innovation Lab", d: "Where AI meets industrial intelligence — custom LLMs, agentic workflows, sustainable AI.", route: "ai-lab" },
    items: [
      { label: "AI Lab Hub", route: "ai-lab" },
      { label: "Generative AI Solutions", route: "genai" },
      { label: "Intelligent Automation", route: "ai-lab" },
      { label: "Sustainable AI (GreenOps)", route: "ai-lab" },
    ],
  },
  {
    label: "Expertise",
    route: "expertise",
    feat: { t: "Engineering Excellence", d: "Eight disciplines. One standard: production-grade outcomes that move business metrics.", route: "expertise" },
    items: [
      { label: "Expertise Hub", route: "expertise" },
      { label: "Cloud-Native Engineering", route: "cloud-native" },
      { label: "Enterprise Modernization", route: "expertise" },
      { label: "Platform Engineering", route: "expertise" },
    ],
  },
  {
    label: "Industries",
    route: "manufacturing",
    feat: { t: "Domain-First Engineering", d: "We learn your world before writing a line of code. Deep expertise across five verticals.", route: "manufacturing" },
    items: [
      { label: "Manufacturing & Industry 4.0", route: "manufacturing" },
      { label: "CleanTech & Sustainability", route: "manufacturing" },
      { label: "Healthcare & Life Sciences", route: "manufacturing" },
    ],
  },
  {
    label: "Insights",
    route: "tech-radar",
    feat: { t: "Thought Leadership", d: "Our opinionated take on the technologies shaping industrial AI. Updated quarterly.", route: "tech-radar" },
    items: [
      { label: "The Tech Radar", route: "tech-radar" },
      { label: "Success Stories", route: "tech-radar" },
      { label: "White Papers", route: "tech-radar" },
    ],
  },
];

/* ═══════════════════════════════════════════
   Lenis smooth scroll hook (exposes instance on window.__lenis)
   ═══════════════════════════════════════════ */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); window.__lenis = null; };
  }, []);
}

/* ═══════════════════════════════════════════
   Top Bar — with mega-menu dropdowns + mobile drawer
   ═══════════════════════════════════════════ */
function TopBar({ navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    };
  }, [mobileOpen]);

  const go = (route) => {
    setOpenGroup(null);
    setMobileOpen(false);
    if (navigate) navigate(route);
  };

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || openGroup ? "bg-cream/95 backdrop-blur-md border-b border-rule" : "bg-cream/0"
      }`}
      onMouseLeave={handleLeave}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[72px]">
        <button onClick={() => go("")} className="flex items-baseline gap-2 group cursor-pointer">
          <span className="font-display text-2xl lg:text-[28px] font-medium tracking-tight text-ink">
            m<span className="italic font-light">Verve</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-coral group-hover:scale-150 transition-transform" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_GROUPS.map((g) => (
            <button
              key={g.label}
              onMouseEnter={() => handleEnter(g.label)}
              onClick={() => go(g.feat.route)}
              className={`px-3 py-2 text-[13px] font-medium transition-colors ${
                openGroup === g.label ? "text-coral" : "text-ink-soft hover:text-ink"
              }`}
            >
              {g.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="ml-2 px-3 py-2 text-[13px] font-medium text-ink-soft hover:text-ink"
          >
            Careers
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("contact")}
            className="hidden sm:inline-flex group items-center gap-2 text-[13px] font-medium text-ink border-b border-ink pb-0.5 hover:text-coral hover:border-coral transition-colors"
          >
            Let's innovate
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            type="button"
            className="xl:hidden relative w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-1.5 text-ink z-[110]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      <AnimatePresence>
        {openGroup && (
          <motion.div
            key={openGroup}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => handleEnter(openGroup)}
            className="hidden xl:block absolute left-0 right-0 top-full bg-cream border-b border-rule"
          >
            <div className="max-w-[1440px] mx-auto px-10 py-12 grid grid-cols-12 gap-10">
              {/* Featured tile */}
              <button
                onClick={() => go(NAV_GROUPS.find((g) => g.label === openGroup).feat.route)}
                className="col-span-5 text-left group"
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-4">Featured</div>
                <div className="font-display text-[40px] leading-[1.05] tracking-[-0.02em] font-light text-ink mb-4 group-hover:text-coral transition-colors">
                  {NAV_GROUPS.find((g) => g.label === openGroup).feat.t}
                </div>
                <p className="text-[15px] leading-relaxed text-ink-soft max-w-md">
                  {NAV_GROUPS.find((g) => g.label === openGroup).feat.d}
                </p>
                <span className="inline-flex items-center gap-2 mt-5 text-[13px] font-medium text-ink link-reveal">
                  Explore <ArrowUpRight size={14} />
                </span>
              </button>

              {/* Item list */}
              <div className="col-span-6 col-start-7 grid grid-cols-1 gap-px bg-rule self-start">
                {NAV_GROUPS.find((g) => g.label === openGroup).items.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => go(it.route)}
                    className="group bg-cream py-4 px-4 flex items-center justify-between hover:bg-paper text-left transition-colors"
                  >
                    <span className="font-display text-xl text-ink group-hover:italic group-hover:text-coral transition-all">
                      {it.label}
                    </span>
                    <ArrowUpRight size={18} className="text-ink-muted group-hover:text-coral group-hover:rotate-45 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer — fixed overlay above everything; scrollable internally */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, zIndex: 100 }}
            className="xl:hidden bg-cream overflow-y-auto overscroll-contain"
          >
            <div className="px-6 py-8 pb-32 flex flex-col gap-2">
              {NAV_GROUPS.map((g) => (
                <div key={g.label} className="border-b border-rule py-4">
                  <button
                    type="button"
                    onClick={() => go(g.feat.route)}
                    className="w-full text-left font-display text-[30px] leading-tight font-light text-ink"
                  >
                    {g.label}
                  </button>
                  <div className="mt-3 flex flex-col">
                    {g.items.map((it, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => go(it.route)}
                        className="text-left text-[15px] text-ink-soft hover:text-coral py-2 pl-1"
                      >
                        — {it.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => go("contact")}
                className="border-b border-rule py-5 text-left font-display text-[30px] font-light text-ink"
              >
                Careers
              </button>
              <button
                type="button"
                onClick={() => go("contact")}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-ink text-cream py-4 px-6 text-[14px] font-medium tracking-wide"
              >
                Let's innovate <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════════════════════════
   Hero
   ═══════════════════════════════════════════ */
function Hero({ navigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      {/* Decorative coral arc */}
      <motion.svg
        style={{ y }}
        className="absolute -right-40 -top-20 w-[520px] h-[520px] lg:w-[680px] lg:h-[680px] opacity-90 pointer-events-none"
        viewBox="0 0 640 640"
        fill="none"
      >
        <circle cx="320" cy="320" r="319" stroke="#CF4520" strokeWidth="1.2" />
        <circle cx="320" cy="320" r="240" stroke="#CF4520" strokeWidth="1" opacity="0.35" />
        <circle cx="320" cy="320" r="160" stroke="#0E1116" strokeWidth="1" opacity="0.15" />
        <path d="M40 320 A 280 280 0 0 1 320 40" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>

      <motion.div style={{ opacity }} className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center"
        >
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          AI-Native Engineering Partner
        </motion.div>

        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["We engineer", "intelligent systems", "for the industrial", "future."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft"
          >
            Where manufacturing meets intelligence. mVerve builds AI-powered platforms, modernizes legacy infrastructure, and deploys carbon-aware technology — so mid-market enterprises can compete like the giants.
          </motion.p>
        </div>

        <div className="mt-12 lg:mt-16 flex items-end justify-between gap-6">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
            Bengaluru · Maryland · Est. 2024
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted hidden md:flex items-center gap-2"
          >
            <span className="w-px h-10 bg-ink-muted/40 inline-block" />
            Scroll
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Marquee
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   Featured insights (3 editorial cards)
   ═══════════════════════════════════════════ */
function Insights() {
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
            <a href="#" className="inline-flex items-center gap-2 mt-6 text-[13px] font-medium link-reveal">
              All insights <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {INSIGHTS.map((card, i) => (
            <motion.a
              key={i} href="#"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep mb-6">
                {/* abstract editorial cover */}
                <div
                  className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{
                    background: i === 0
                      ? "radial-gradient(120% 80% at 20% 100%, #CF4520 0%, #E8E4DA 60%)"
                      : i === 1
                      ? "linear-gradient(135deg, #0E1116 0%, #2A2D33 60%, #CF4520 130%)"
                      : "conic-gradient(from 200deg at 70% 30%, #E8E4DA, #CF4520, #0E1116, #E8E4DA)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/90 mix-blend-difference">
                    {card.kicker}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/90 mix-blend-difference flex items-center gap-2">
                    <ArrowUpRight size={14} className="group-hover:rotate-12 transition-transform" />
                    Read
                  </div>
                </div>
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">{card.kicker} · {card.read}</div>
              <h3 className="font-display text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.01em] text-ink font-light group-hover:text-coral transition-colors">
                {card.t}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Pinned services (GSAP scrubbed)
   ═══════════════════════════════════════════ */
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
        onUpdate: (self) => {
          const i = Math.min(total - 1, Math.floor(self.progress * total));
          setActive(i);
        },
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
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-coral mb-8">{SERVICES[active].tag}</div>
                  <h3 className="font-display text-[clamp(36px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-cream">
                    {SERVICES[active].t}
                  </h3>
                  <p className="text-[18px] lg:text-[20px] leading-relaxed text-cream/70 mt-8 max-w-lg">
                    {SERVICES[active].d}
                  </p>
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

/* ═══════════════════════════════════════════
   Industries — large numbered list
   ═══════════════════════════════════════════ */
function Industries() {
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
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group relative grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-8 lg:py-12 cursor-pointer transition-colors"
            >
              <div className="col-span-2 lg:col-span-1 font-mono text-[11px] tracking-[0.2em] text-ink-muted pt-2">{row.n}</div>
              <div className="col-span-10 lg:col-span-3">
                <div className="font-display text-[clamp(28px,3.4vw,52px)] leading-[1] tracking-[-0.01em] font-light text-ink group-hover:text-coral transition-colors">
                  {row.k}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-6">
                <div className="font-display italic text-[clamp(20px,2vw,28px)] leading-snug text-ink-soft mb-3">{row.h}</div>
                <p className="text-[15px] leading-relaxed text-ink-muted max-w-xl">{row.d}</p>
              </div>
              <div className="col-span-12 lg:col-span-1 lg:col-start-12 self-center justify-self-end">
                <ArrowUpRight size={28} className="text-ink group-hover:text-coral group-hover:rotate-45 transition-all duration-500" />
              </div>

              {/* subtle hover bg accent */}
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

/* ═══════════════════════════════════════════
   Metrics band
   ═══════════════════════════════════════════ */
function MetricsBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section ref={ref} className="bg-cream-deep border-y border-rule py-20 lg:py-28 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-12">Trusted by industry leaders · the numbers</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-ink pt-6"
            >
              <div className="font-display text-[clamp(48px,6vw,96px)] leading-[0.9] tracking-[-0.04em] font-light text-ink">
                {m.v}
              </div>
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

/* ═══════════════════════════════════════════
   Methodology — editorial 5-step
   ═══════════════════════════════════════════ */
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-cream p-8 lg:p-10 min-h-[280px] flex flex-col justify-between group hover:bg-paper transition-colors"
            >
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

/* ═══════════════════════════════════════════
   Value Props strip
   ═══════════════════════════════════════════ */
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-t border-ink pt-5"
            >
              <div className="font-display text-[24px] lg:text-[28px] font-light text-ink mb-3">{v.t}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Closing CTA
   ═══════════════════════════════════════════ */
function ClosingCTA() {
  return (
    <section id="contact" className="bg-ink text-cream py-32 lg:py-48 px-6 lg:px-10 relative overflow-hidden">
      {/* big coral accent shape */}
      <div className="absolute -bottom-32 -right-32 w-[640px] h-[640px] rounded-full bg-coral/30 blur-3xl pointer-events-none" />
      <div className="max-w-[1440px] mx-auto relative">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Let's innovate together</div>
        <h2 className="font-display text-[clamp(48px,9vw,160px)] leading-[0.95] tracking-[-0.03em] font-light text-cream max-w-[12ch]">
          Ready to engineer your <span className="italic text-coral">industrial future?</span>
        </h2>
        <div className="grid grid-cols-12 gap-6 mt-16 lg:mt-24">
          <p className="col-span-12 lg:col-span-5 text-[18px] leading-relaxed text-cream/70">
            No pitch decks. No bench rotations. Just an honest conversation with senior engineers who already understand your domain — and what production-grade actually means.
          </p>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-start gap-6">
            <a href="mailto:hello@mverve.tech" className="group inline-flex items-center gap-3 font-display italic text-3xl lg:text-4xl text-cream border-b border-cream/40 pb-2 hover:text-coral hover:border-coral transition-colors">
              hello@mverve.tech
              <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50">
              Or schedule a 30-min call →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Footer
   ═══════════════════════════════════════════ */
function Footer() {
  const cols = [
    { h: "Expertise", l: ["Cloud-Native Engineering", "Enterprise Modernization", "Platform Engineering", "Digital Experience", "Agile Pods"] },
    { h: "Industries", l: ["Manufacturing & Industry 4.0", "CleanTech & Sustainability", "Healthcare & Life Sciences", "Retail & Consumer", "FinTech & Insurance"] },
    { h: "Insights", l: ["Tech Radar", "Success Stories", "White Papers", "Blog"] },
    { h: "Company", l: ["About mVerve", "Careers", "Contact", "Privacy"] },
  ];
  return (
    <footer className="bg-cream border-t border-ink/20 px-6 lg:px-10 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 lg:col-span-4">
            <div className="font-display text-5xl font-light text-ink mb-6">m<span className="italic">Verve</span><span className="text-coral">.</span></div>
            <p className="text-[14px] leading-relaxed text-ink-soft max-w-sm mb-8">
              AI-Native engineering for the industrial future. Bridging heavy industry and cognitive intelligence.
            </p>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">Bengaluru · Maryland</div>
          </div>
          {cols.map((c, i) => (
            <div key={i} className="col-span-6 lg:col-span-2">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-5">{c.h}</div>
              <ul className="space-y-3">
                {c.l.map((it, j) => (
                  <li key={j}><a href="#" className="text-[14px] text-ink-soft hover:text-ink link-reveal">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-ink/20 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
          <div>© 2026 mVerve Technologies</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">LinkedIn</a>
            <a href="#" className="hover:text-ink">GitHub</a>
            <a href="#" className="hover:text-ink">Newsletter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   Page export
   ═══════════════════════════════════════════ */
export function HomepageContent({ navigate }) {
  useLenis();
  return (
    <div className="bg-cream text-ink grain">
      <TopBar navigate={navigate} />
      <Hero navigate={navigate} />
      <Marquee />
      <Insights navigate={navigate} />
      <PinnedServices />
      <Industries navigate={navigate} />
      <MetricsBand />
      <ValueProps />
      <Methodology />
      <ClosingCTA navigate={navigate} />
      <Footer navigate={navigate} />
    </div>
  );
}

export default HomepageContent;
