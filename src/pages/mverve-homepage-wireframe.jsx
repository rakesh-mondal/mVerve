import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, Leaf, Factory, Users, ChevronDown, Menu, X, ArrowRight,
  Zap, Cloud, Database, Shield, BarChart3, Code2, Layers, Globe,
  Mail, Phone, Linkedin, MapPin, Clock, CheckCircle2, ExternalLink,
  Search, ChevronRight, Monitor, Cpu, Sparkles, Target, Hexagon,
  ArrowUpRight, Bot, Workflow, LineChart, ServerCog, Gauge, Rocket
} from "lucide-react";

/* ═══════════════════════════════════════════
   TOKENS
   ═══════════════════════════════════════════ */
const T = {
  dark: "#0A0A0F", darkAlt: "#0F172A", darkCard: "#16161F", darkSurface: "#1A1A2E",
  light: "#F8F9FA", lightBg: "#F1F5F9", white: "#FFFFFF",
  border: "#E2E8F0", borderDark: "rgba(255,255,255,0.08)", borderHover: "rgba(255,255,255,0.16)",
  text: "#0F172A", textSec: "#64748B", textMuted: "#94A3B8",
  onDark: "#F8FAFC", onDarkSec: "#94A3B8", onDarkMuted: "#64748B",
  blue: "#2563EB", blueHover: "#1D4ED8", blueGlow: "rgba(37,99,235,0.15)",
  green: "#10B981", amber: "#F59E0B", rose: "#F43F5E", purple: "#8B5CF6", cyan: "#06B6D4",
};

const ease = [0.25, 0.1, 0.25, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const staggerFast = { visible: { transition: { staggerChildren: 0.06 } } };

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */
function useReveal(amt = 0.15) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: amt });
  return [ref, visible];
}

function useWindowSize() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ═══════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════ */
function Placeholder({ label, h = 200, dark = false, radius = 8 }) {
  const bg = dark
    ? "repeating-linear-gradient(45deg,#1A1A2E,#1A1A2E 10px,#16161F 10px,#16161F 20px)"
    : "repeating-linear-gradient(45deg,#E2E8F0,#E2E8F0 10px,#F1F5F9 10px,#F1F5F9 20px)";
  return (
    <div style={{ height: h, background: bg, borderRadius: radius, display: "flex", alignItems: "center", justifyContent: "center", border: `1px dashed ${dark ? "rgba(255,255,255,0.1)" : "#CBD5E1"}`, overflow: "hidden" }}>
      <span style={{ fontFamily: "monospace", fontSize: 11, color: dark ? "#475569" : "#94A3B8", background: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)", padding: "6px 14px", borderRadius: 4, textAlign: "center", maxWidth: "85%", lineHeight: 1.5 }}>
        {label}
      </span>
    </div>
  );
}

function Badge({ children, color = T.blue }) {
  return (
    <span style={{ fontFamily: "monospace", fontSize: 10, padding: "3px 10px", borderRadius: 4, background: `${color}15`, color, fontWeight: 600, letterSpacing: 0.5 }}>
      {children}
    </span>
  );
}

function Btn({ children, primary = true, color = T.blue, pill = false, small = false, ghost = false, onClick }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer",
    fontWeight: 600, transition: "all 0.2s", textDecoration: "none",
    borderRadius: pill ? 999 : 8,
    fontSize: small ? 14 : 16,
    padding: small ? "8px 18px" : pill ? "14px 32px" : "13px 26px",
  };
  if (ghost) return (
    <button {...{ onClick }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: "transparent", border: `1px solid ${hov ? T.border : T.border}`, color: hov ? T.text : T.textSec }}>
      {children}
    </button>
  );
  if (!primary) return (
    <button {...{ onClick }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${hov ? T.borderHover : T.borderDark}`, color: T.onDark }}>
      {children}
    </button>
  );
  return (
    <button {...{ onClick }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? T.blueHover : color, color: "#fff", boxShadow: hov ? `0 4px 20px ${T.blueGlow}` : "none" }}>
      {children}
    </button>
  );
}

function Counter({ value, suffix = "", prefix = "", label, color = T.blue }) {
  const [count, setCount] = useState(0);
  const [ref, vis] = useReveal();
  const num = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  const decimals = value.toString().includes(".") ? value.toString().split(".")[1]?.replace(/[^0-9]/g, "").length || 0 : 0;

  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const dur = 2200, steps = 70, inc = num / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= num) { setCount(num); clearInterval(t); }
      else setCount(decimals > 0 ? Math.round(start * 100) / 100 : Math.floor(start));
    }, dur / steps);
    return () => clearInterval(t);
  }, [vis, num, decimals]);

  return (
    <motion.div ref={ref} variants={fadeUp} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "system-ui" }}>
        {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: T.onDarkSec, marginTop: 8, lineHeight: 1.5, maxWidth: 180, margin: "8px auto 0" }}>{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MEGA MENU
   ═══════════════════════════════════════════ */
const megaData = {
  "AI & Innovation Lab": {
    feat: { title: "The mVerve Innovation Lab", sub: "Where AI meets industrial intelligence. Our R&D engine for custom LLMs, agentic workflows, and sustainable AI.", cta: "Explore the Lab" },
    cols: [
      { head: "Capabilities", links: ["Generative AI Solutions", "Intelligent Automation", "Sustainable AI (GreenOps)", "Data Strategy & Engineering", "The MVP Incubator"] },
      { head: "Featured", links: ["Tech Radar Q1 2026", "AI Maturity Assessment", "Innovation Sprint Program"] },
    ],
  },
  Expertise: {
    feat: { title: "Engineering Excellence", sub: "Eight disciplines. One standard: production-grade outcomes that move business metrics.", cta: "See All Expertise" },
    cols: [
      { head: "Digital & Cloud", links: ["Cloud-Native Engineering", "Enterprise Modernization", "Platform Engineering"] },
      { head: "Experience & Design", links: ["Digital Experience", "Product Strategy & Design", "Service Design"] },
      { head: "Strategic Talent", links: ["Agile Pods", "Technical Consulting"] },
    ],
  },
  Industries: {
    feat: { title: "Domain-First Engineering", sub: "We understand your world before writing a line of code. Deep domain expertise across five verticals.", cta: "Browse Industries" },
    cols: [
      { head: "Verticals", links: ["Manufacturing & Industry 4.0", "CleanTech & Sustainability", "Healthcare & Life Sciences", "Retail & Consumer", "FinTech & Insurance"] },
    ],
  },
  Insights: {
    feat: { title: "Thought Leadership", sub: "Our opinionated take on the technologies shaping industrial AI. Research, case studies, and the Tech Radar.", cta: "Explore Insights" },
    cols: [
      { head: "Content", links: ["The Tech Radar", "Success Stories", "White Papers", "Blog & Articles"] },
    ],
  },
};

function MegaPanel({ item, onClose }) {
  const d = megaData[item];
  if (!d) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
      onMouseLeave={onClose}
      style={{ position: "absolute", top: "100%", left: 0, right: 0, background: T.dark, borderBottom: `1px solid ${T.borderDark}`, zIndex: 200 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 36 }}>
        <div style={{ background: "rgba(37,99,235,0.05)", borderRadius: 8, padding: 22, border: "1px solid rgba(37,99,235,0.1)" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{d.feat.title}</div>
          <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.6, marginBottom: 14 }}>{d.feat.sub}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.blue, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            {d.feat.cta} <ArrowRight size={12} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${d.cols.length}, 1fr)`, gap: 28 }}>
          {d.cols.map((c, ci) => (
            <div key={ci}>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: T.blue, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>{c.head}</div>
              {c.links.map((l, li) => (
                <div key={li} style={{ padding: "7px 10px", borderRadius: 5, cursor: "pointer", fontSize: 13.5, color: T.onDarkSec, transition: "all 0.12s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.onDarkSec; }}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(null);
  const [mob, setMob] = useState(false);
  const w = useWindowSize();
  const mobile = w < 900;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(10,10,15,0.96)" : "rgba(10,10,15,0.75)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? T.borderDark : "transparent"}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, background: T.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: "system-ui" }}>m</span>
          </div>
          <span style={{ fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", fontFamily: "system-ui" }}>
            m<span style={{ color: T.blue }}>Verve</span>
          </span>
        </div>

        {/* Desktop links */}
        {!mobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {Object.keys(megaData).map(item => (
              <div key={item} onMouseEnter={() => setMega(item)}>
                <button style={{ background: mega === item ? "rgba(255,255,255,0.06)" : "transparent", border: "none", color: mega === item ? "#fff" : T.onDarkSec, padding: "8px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 3, transition: "all 0.15s" }}>
                  {item} <ChevronDown size={11} style={{ opacity: 0.5 }} />
                </button>
              </div>
            ))}
            <button style={{ background: "none", border: "none", color: T.onDarkSec, padding: "8px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Careers</button>
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!mobile && <Btn small>Let's Innovate <ArrowRight size={13} /></Btn>}
          {mobile && (
            <button onClick={() => setMob(!mob)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}>
              {mob ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>{mega && !mobile && <MegaPanel item={mega} onClose={() => setMega(null)} />}</AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mob && mobile && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: T.dark, borderTop: `1px solid ${T.borderDark}`, overflow: "hidden" }}>
            <div style={{ padding: 20 }}>
              {[...Object.keys(megaData), "Careers"].map(item => (
                <div key={item} style={{ padding: "12px 0", borderBottom: `1px solid ${T.borderDark}`, color: T.onDarkSec, fontSize: 15 }}>{item}</div>
              ))}
              <div style={{ marginTop: 16 }}><Btn small>Let's Innovate <ArrowRight size={13} /></Btn></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════ */
function Hero({ navigate }) {
  const [ref, vis] = useReveal(0.05);
  const w = useWindowSize();
  const mobile = w < 768;
  return (
    <section ref={ref} style={{ background: T.dark, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 64 }}>
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "64px 64px", mask: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)", WebkitMask: "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)" }} />
      {/* Glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 45% at 50% 35%, rgba(37,99,235,0.07) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 35% at 70% 80%, rgba(16,185,129,0.04) 0%, transparent 60%)" }} />

      <motion.div initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
        style={{ position: "relative", zIndex: 1, textAlign: "center", padding: mobile ? "0 20px" : "0 24px", maxWidth: 820 }}>
        <motion.div variants={fadeUp} style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, letterSpacing: 3, marginBottom: 24, fontWeight: 600 }}>
          AI-NATIVE ENGINEERING PARTNER
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontSize: mobile ? 34 : "clamp(40px, 5vw, 58px)", fontWeight: 700, color: "#fff", lineHeight: 1.06, letterSpacing: "-0.045em", marginBottom: 22, fontFamily: "system-ui" }}>
          We Engineer Intelligent Systems{mobile ? " " : <br />}
          <span style={{ background: "linear-gradient(135deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            for the Industrial Future
          </span>
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: mobile ? 15 : 17, color: T.onDarkSec, lineHeight: 1.7, maxWidth: 620, margin: "0 auto 36px" }}>
          Where manufacturing meets intelligence. mVerve builds AI-powered platforms, modernizes legacy infrastructure, and deploys carbon-aware technology — so mid-market enterprises can compete like the giants.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => navigate && navigate("contact")}>Let's Innovate Together <ArrowRight size={15} /></Btn>
          <Btn primary={false} onClick={() => navigate && navigate("ai-lab")}>Explore the AI Lab</Btn>
        </motion.div>
        <motion.div variants={fadeUp} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ marginTop: 56, opacity: 0.3 }}>
          <ChevronDown size={26} color="#fff" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2: VALUE PROPS
   ═══════════════════════════════════════════ */
function ValueProps() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w < 768 ? 1 : w < 1024 ? 2 : 4;
  const data = [
    { icon: <Brain size={22} />, title: "AI-First Engineering", desc: "Intelligence woven into every system we build — from DevOps to decision engines.", c: T.blue },
    { icon: <Leaf size={22} />, title: "GreenOps Certified", desc: "Carbon-aware computing and NetZero tech stacks. Sustainability isn't optional — it's engineered in.", c: T.green },
    { icon: <Factory size={22} />, title: "Domain Deep", desc: "Manufacturing, CleanTech, and Healthcare. We understand your world before writing a line of code.", c: T.amber },
    { icon: <Users size={22} />, title: "Founders, Not Freshers", desc: "Senior-led Agile Pods. Every project gets our best engineers — not a bench rotation.", c: T.purple },
  ];
  return (
    <section style={{ background: T.white, padding: "80px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
        {data.map((d, i) => (
          <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }} whileTap={cols === 1 ? { scale: 0.98 } : undefined}
            style={{ padding: 24, minHeight: cols === 1 ? 160 : "auto", borderRadius: 10, border: `1px solid ${T.border}`, background: T.white, cursor: "default", transition: "box-shadow 0.25s" }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${d.c}10`, display: "flex", alignItems: "center", justifyContent: "center", color: d.c, marginBottom: 16 }}>
              {d.icon}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 6, fontFamily: "system-ui" }}>{d.title}</div>
            <div style={{ fontSize: 13.5, color: T.textSec, lineHeight: 1.65 }}>{d.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3: METRICS + LOGOS
   ═══════════════════════════════════════════ */
function Metrics() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w < 768 ? 2 : 4;
  return (
    <section style={{ background: T.darkAlt, padding: "72px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, marginBottom: 40 }}>
          <Counter value="42" suffix="%" label="Average downtime reduction across manufacturing clients" color={T.blue} />
          <Counter value="60" suffix="%" label="Cloud carbon footprint reduction via GreenOps" color={T.green} />
          <Counter prefix="$" value="2" suffix="M+" label="Annual infrastructure savings per engagement" color={T.amber} />
          <Counter value="99.95" suffix="%" label="Uptime maintained during legacy migrations" color={T.blue} />
        </motion.div>
        {/* Logo strip */}
        <motion.div variants={fadeUp} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: T.onDarkMuted, letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>TRUSTED BY INDUSTRY LEADERS</div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {["Manufacturing Co.", "Energy Corp.", "HealthTech Inc.", "Retail Group", "FinServ Partners", "CleanTech Ltd."].map((n, i) => (
              <motion.div key={i} whileHover={{ opacity: 1 }}
                style={{ width: 110, height: 40, background: "rgba(255,255,255,0.03)", borderRadius: 6, border: `1px dashed rgba(255,255,255,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontFamily: "monospace", color: "#475569", opacity: 0.7, transition: "opacity 0.2s", cursor: "default" }}>
                [{n}]
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4: WHAT WE ENGINEER
   ═══════════════════════════════════════════ */
function Services() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w < 768 ? 1 : 2;
  const data = [
    { icon: <Brain size={20} />, t: "Intelligent Decision Engines", d: "Custom AI models that predict, prescribe, and automate your hardest operational decisions. 42% downtime reduction.", m: "42% downtime ↓", c: T.blue, link: "/expertise/intelligent-decision-engines" },
    { icon: <Leaf size={20} />, t: "GreenOps Platform", d: "Carbon-aware engineering that cuts your cloud footprint AND costs. 60% carbon reduction + 35% cost savings.", m: "60% carbon ↓", c: T.green, link: "/expertise/greenops-platform" },
    { icon: <Cloud size={20} />, t: "Legacy Modernization Suite", d: "Strangle your monolith. Migrate to cloud-native. Zero downtime. $2M+ annual savings.", m: "$2M+ saved", c: T.blue, link: "/expertise/legacy-modernization" },
    { icon: <Database size={20} />, t: "Data Intelligence Studio", d: "Turn fragmented data into a unified intelligence layer. 10× faster time-to-insight.", m: "10× faster", c: T.purple, link: "/expertise/data-intelligence-studio" },
  ];
  return (
    <section style={{ background: T.white, padding: "88px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: "-0.03em", fontFamily: "system-ui", marginBottom: 6 }}>What We Engineer</h2>
          <p style={{ fontSize: 15, color: T.textSec, lineHeight: 1.6 }}>Eight productized offerings. Each one built around a business outcome — not a technology stack.</p>
        </motion.div>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
          {data.map((s, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -3, boxShadow: `0 8px 28px ${T.blueGlow}` }} whileTap={cols === 1 ? { scale: 0.98 } : undefined}
              style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 24, minHeight: cols === 1 ? 200 : "auto", cursor: "pointer", transition: "box-shadow 0.25s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: `${s.c}0D`, display: "flex", alignItems: "center", justifyContent: "center", color: s.c }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: "system-ui" }}>{s.t}</div>
              </div>
              <div style={{ fontSize: 13.5, color: T.textSec, lineHeight: 1.65, marginBottom: 14 }}>{s.d}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: s.c, fontWeight: 600 }}>{s.m}</span>
                <ArrowUpRight size={15} color={T.textMuted} />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} style={{ marginTop: 24, textAlign: "center" }}>
          <Btn ghost small>See All 8 Offerings <ArrowRight size={13} /></Btn>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5: INDUSTRY CAROUSEL
   ═══════════════════════════════════════════ */
function Industries({ navigate }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const mobile = w < 768;
  const tabs = [
    { label: "Manufacturing", icon: <Factory size={16} />, color: T.amber, headline: "From Shop Floor to Smart Factory", body: "We modernize PLEX ERP systems, deploy predictive maintenance AI, and engineer real-time production intelligence — turning legacy plants into data-driven operations. Our manufacturing clients see 42% less unplanned downtime and $2M+ annual savings.", img: "[Industry: Smart factory floor — robotic arms, sensor arrays, ambient blue-amber lighting, abstract editorial]", cta: "Explore Manufacturing Solutions" },
    { label: "CleanTech", icon: <Leaf size={16} />, color: T.green, headline: "Engineering the NetZero Transition", body: "Carbon credit platforms, energy grid optimization, sustainability compliance automation. Our GreenOps methodology doesn't just offset — it engineers carbon out of your tech stack at the infrastructure level.", img: "[Industry: Renewable energy field — wind turbines, solar arrays, data overlay, green tint]", cta: "Explore CleanTech Solutions" },
    { label: "Healthcare", icon: <Shield size={16} />, color: T.rose, headline: "Intelligent Systems for Better Outcomes", body: "HIPAA-compliant AI, clinical workflow automation, and patient engagement platforms built with the compliance rigor healthcare demands and the user experience patients deserve.", img: "[Industry: Modern hospital corridor — clean, digital displays, warm lighting, rose accent]", cta: "Explore Healthcare Solutions" },
  ];

  // Sync scroll position when tab changes (mobile carousel)
  useEffect(() => {
    if (!mobile || !scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollTo({ left: active * el.offsetWidth, behavior: "smooth" });
  }, [active, mobile]);

  // Sync active index when user swipes (scroll end)
  const handleScroll = useCallback(() => {
    if (!mobile || !scrollRef.current) return;
    const el = scrollRef.current;
    const index = Math.round(el.scrollLeft / el.offsetWidth);
    setActive(Math.min(index, tabs.length - 1));
  }, [mobile, tabs.length]);

  // Auto-advance (desktop only, so mobile swipe isn't overridden)
  useEffect(() => {
    if (mobile) return;
    const t = setInterval(() => setActive(p => (p + 1) % tabs.length), 8000);
    return () => clearInterval(t);
  }, [mobile, tabs.length]);

  return (
    <section style={{ background: T.dark, padding: "88px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", fontFamily: "system-ui" }}>Industries We Transform</h2>
        </motion.div>

        {/* Tabs — touch-friendly on mobile */}
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 6, marginBottom: 36, flexWrap: "wrap", alignItems: "center" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ minHeight: 44, padding: "10px 20px", borderRadius: 8, border: "none", background: active === i ? "rgba(255,255,255,0.08)" : "transparent", color: active === i ? "#fff" : T.onDarkSec, fontSize: 14, fontWeight: active === i ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", borderBottom: active === i ? `2px solid ${tabs[i].color}` : "2px solid transparent" }}>
              {tab.icon} {tab.label}
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            {tabs.map((_, i) => (
              <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Go to slide ${i + 1}`}
                style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? tabs[active].color : "rgba(255,255,255,0.1)", transition: "all 0.3s", cursor: "pointer", border: "none", padding: 0 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Content: desktop = single panel, mobile = swipeable carousel */}
        {mobile ? (
          <motion.div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              overflowX: "auto", overflowY: "hidden", display: "flex", gap: 0,
              scrollSnapType: "x mandatory", scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch", margin: "0 -24px", padding: "0 24px",
            }}
          >
            {tabs.map((tab, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 100%", minWidth: "100%", scrollSnapAlign: "start", scrollSnapStop: "always",
                  display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "center", paddingRight: 24,
                }}
              >
                <div>
                  <Badge color={tab.color}>{tab.label.toUpperCase()}</Badge>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "16px 0 14px", fontFamily: "system-ui" }}>
                    {tab.headline}
                  </h3>
                  <p style={{ fontSize: 15, color: T.onDarkSec, lineHeight: 1.7, marginBottom: 28 }}>
                    {tab.body}
                  </p>
                  <Btn color={tab.color} onClick={() => navigate && navigate("manufacturing")}>
                    {tab.cta} <ArrowRight size={14} />
                  </Btn>
                </div>
                <Placeholder label={tab.img} h={220} dark />
              </div>
            ))}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div>
                <Badge color={tabs[active].color}>{tabs[active].label.toUpperCase()}</Badge>
                <h3 style={{ fontSize: 26, fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "16px 0 14px", fontFamily: "system-ui" }}>
                  {tabs[active].headline}
                </h3>
                <p style={{ fontSize: 15, color: T.onDarkSec, lineHeight: 1.7, marginBottom: 28 }}>
                  {tabs[active].body}
                </p>
                <Btn color={tabs[active].color} onClick={() => navigate && navigate("manufacturing")}>
                  {tabs[active].cta} <ArrowRight size={14} />
                </Btn>
              </div>
              <Placeholder label={tabs[active].img} h={300} dark />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6: CASE STUDIES
   ═══════════════════════════════════════════ */
function CaseStudies() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const mobile = w < 768;
  const cols = mobile ? 1 : w < 1024 ? 2 : 3;
  const cases = [
    { tag: "MANUFACTURING × AI", tc: T.green, title: "PLEX-to-Cloud Migration Saves $2.4M Annually", desc: "Migrated a 15-year-old PLEX ERP monolith to cloud-native microservices using the strangler-fig pattern. Zero production downtime during cutover.", metrics: [{ v: "$2.4M", l: "Annual savings" }, { v: "0 min", l: "Downtime" }, { v: "18 wks", l: "Migration" }], img: "[Case: PLEX dashboard — before/after cloud architecture diagram]" },
    { tag: "CLEANTECH × GREENOPS", tc: T.green, title: "62% Carbon Footprint Reduction via GreenOps", desc: "Deployed GreenOps methodology for a CleanTech SaaS platform. Reduced cloud carbon footprint by 62% while cutting infrastructure costs by 38%.", metrics: [{ v: "62%", l: "Carbon cut" }, { v: "38%", l: "Cost saved" }], img: "[Case: Carbon dashboard — green gradient, emission charts]" },
    { tag: "HEALTHCARE × AI", tc: T.rose, title: "Predictive Triage Cuts ER Wait Times by 31%", desc: "Built an ML-powered triage system that reduced ER wait times by 31% and improved clinical resource allocation accuracy by 47%.", metrics: [{ v: "31%", l: "Faster triage" }, { v: "47%", l: "Better allocation" }], img: "[Case: Clinical UI — patient queue, priority scoring]" },
  ];

  const cardContent = (c, i) => (
    <>
      <Placeholder label={c.img} h={i === 0 ? 160 : 130} />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <Badge color={c.tc}>{c.tag}</Badge>
        </div>
        <h3 style={{ fontSize: i === 0 ? 17 : 15, fontWeight: 700, color: T.text, lineHeight: 1.35, marginBottom: 8, fontFamily: "system-ui" }}>{c.title}</h3>
        <p style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6, marginBottom: 14 }}>{c.desc}</p>
        <div style={{ display: "flex", gap: 20 }}>
          {c.metrics.map((m, j) => (
            <div key={j}>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.tc, fontFamily: "system-ui" }}>{m.v}</div>
              <div style={{ fontSize: 10, color: T.textMuted, fontFamily: "monospace" }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <section style={{ background: T.white, padding: "88px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: "-0.03em", fontFamily: "system-ui", marginBottom: 6 }}>Proof, Not Promises</h2>
          <p style={{ fontSize: 15, color: T.textSec }}>Real outcomes from real engagements. Here's what happens when AI meets industry.</p>
        </motion.div>

        {mobile ? (
          <motion.div
            variants={stagger}
            style={{
              overflowX: "auto", overflowY: "hidden", display: "flex", gap: 16,
              scrollSnapType: "x mandatory", scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch", margin: "0 -24px", padding: "0 24px 8px",
            }}
          >
            {cases.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  flex: "0 0 85%", minWidth: "85%", scrollSnapAlign: "start", scrollSnapStop: "always",
                  background: T.white, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden",
                  cursor: "pointer", transition: "box-shadow 0.25s", minHeight: 44,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {cardContent(c, i)}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}>
            {cases.map((c, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.08)` }}
                style={{ background: T.white, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden", cursor: "pointer", transition: "box-shadow 0.25s" }}>
                {cardContent(c, i)}
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div variants={fadeUp} style={{ marginTop: 28, textAlign: "center" }}>
          <Btn ghost small>View All Success Stories <ArrowRight size={13} /></Btn>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7: TECH RADAR TEASER
   ═══════════════════════════════════════════ */
function TechRadar({ navigate }) {
  const [ref, vis] = useReveal();
  const [hovBlip, setHovBlip] = useState(null);
  const w = useWindowSize();
  const mobile = w < 768;

  const blips = [
    { x: 28, y: 20, c: T.green, n: "React", ring: "Adopt", q: "Lang" },
    { x: 72, y: 18, c: T.green, n: "AWS", ring: "Adopt", q: "Platform" },
    { x: 42, y: 35, c: T.green, n: "Python", ring: "Adopt", q: "Lang" },
    { x: 82, y: 42, c: T.green, n: "Kubernetes", ring: "Adopt", q: "Platform" },
    { x: 18, y: 58, c: T.blue, n: "Llama 3/4", ring: "Trial", q: "AI" },
    { x: 58, y: 62, c: T.blue, n: "MCP Protocol", ring: "Trial", q: "AI" },
    { x: 35, y: 75, c: T.amber, n: "Edge AI", ring: "Assess", q: "AI" },
    { x: 68, y: 78, c: T.amber, n: "Digital Twins", ring: "Assess", q: "AI" },
    { x: 50, y: 88, c: T.rose, n: "jQuery", ring: "Hold", q: "Lang" },
    { x: 22, y: 42, c: T.green, n: "Tailwind", ring: "Adopt", q: "Lang" },
    { x: 62, y: 30, c: T.green, n: "Snowflake", ring: "Adopt", q: "Platform" },
    { x: 78, y: 60, c: T.blue, n: "Cursor IDE", ring: "Trial", q: "Tools" },
    { x: 40, y: 50, c: T.blue, n: "LangChain", ring: "Trial", q: "AI" },
    { x: 85, y: 85, c: T.rose, n: "Monolithic ERP", ring: "Hold", q: "Platform" },
  ];

  return (
    <section style={{ background: T.dark, padding: "88px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}>
        <motion.div variants={fadeUp}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: T.green, letterSpacing: 2, marginBottom: 14, fontWeight: 600 }}>OPINIONATED LEADERSHIP</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 14, fontFamily: "system-ui" }}>The mVerve Tech Radar</h2>
          <p style={{ fontSize: 15, color: T.onDarkSec, lineHeight: 1.7, marginBottom: 16 }}>
            Our opinionated guide to what's working — and what's not — at the intersection of AI, manufacturing, and sustainable technology. Updated quarterly.
          </p>
          <p style={{ fontSize: 14, color: T.onDarkMuted, lineHeight: 1.7, marginBottom: 28 }}>
            We tell you what to adopt, trial, assess, and avoid. Because that's what partners do.
          </p>
          {/* Ring legend */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
            {[{ l: "Adopt", c: T.green }, { l: "Trial", c: T.blue }, { l: "Assess", c: T.amber }, { l: "Hold", c: T.rose }].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.c }} />
                <span style={{ fontSize: 11, fontFamily: "monospace", color: T.onDarkSec }}>{r.l}</span>
              </div>
            ))}
          </div>
          <Btn onClick={() => navigate && navigate("tech-radar")}>Explore the Tech Radar <ArrowRight size={14} /></Btn>
        </motion.div>

        {/* Interactive Radar */}
        <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 300, height: 300 }}>
            {/* Rings */}
            {[1, 0.75, 0.5, 0.25].map((s, i) => (
              <motion.div key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={vis ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease }}
                style={{ position: "absolute", inset: `${(1 - s) * 50}%`, borderRadius: "50%", border: `1px solid rgba(255,255,255,${0.05 + i * 0.02})` }} />
            ))}
            {/* Crosshairs */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(255,255,255,0.04)" }} />
            {/* Ring labels */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "monospace", fontSize: 7, color: "rgba(255,255,255,0.12)", textAlign: "center" }}>ADOPT</div>
            {/* Quadrant labels */}
            {[{ l: "LANGUAGES", x: "18%", y: "6%" }, { l: "PLATFORMS", x: "60%", y: "6%" }, { l: "TOOLS", x: "6%", y: "92%" }, { l: "AI & DATA", x: "62%", y: "92%" }].map((q, i) => (
              <div key={i} style={{ position: "absolute", left: q.x, top: q.y, fontFamily: "monospace", fontSize: 7, color: "rgba(255,255,255,0.15)", letterSpacing: 1 }}>{q.l}</div>
            ))}
            {/* Blips */}
            {blips.map((b, i) => (
              <motion.div key={i}
                initial={{ scale: 0 }}
                animate={vis ? { scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.04, type: "spring", stiffness: 500, damping: 15 }}
                onMouseEnter={() => setHovBlip(i)}
                onMouseLeave={() => setHovBlip(null)}
                style={{ position: "absolute", left: `${b.x}%`, top: `${b.y}%`, width: hovBlip === i ? 12 : 8, height: hovBlip === i ? 12 : 8, borderRadius: "50%", background: b.c, boxShadow: hovBlip === i ? `0 0 16px ${b.c}60` : `0 0 6px ${b.c}30`, cursor: "pointer", transition: "all 0.15s", transform: "translate(-50%, -50%)", zIndex: hovBlip === i ? 10 : 1 }}>
                {/* Tooltip */}
                <AnimatePresence>
                  {hovBlip === i && (
                    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: T.dark, border: `1px solid ${T.borderDark}`, borderRadius: 6, padding: "6px 10px", whiteSpace: "nowrap", pointerEvents: "none" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{b.n}</div>
                      <div style={{ fontSize: 9, fontFamily: "monospace", color: b.c }}>{b.ring} · {b.q}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8: METHODOLOGY
   ═══════════════════════════════════════════ */
function Methodology() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const mobile = w < 768;
  const steps = [
    { n: "01", t: "Discover", d: "Domain immersion. We learn your business before touching code.", i: <Search size={18} /> },
    { n: "02", t: "Architect", d: "Systems design with AI-first thinking and GreenOps by default.", i: <Layers size={18} /> },
    { n: "03", t: "Engineer", d: "Agile Pods ship production code in 2-week sprints.", i: <Code2 size={18} /> },
    { n: "04", t: "Deploy", d: "Cloud-native CI/CD. Zero-downtime releases. Observability built in.", i: <Rocket size={18} /> },
    { n: "05", t: "Evolve", d: "Continuous optimization. Your system gets smarter every sprint.", i: <Sparkles size={18} /> },
  ];

  return (
    <section style={{ background: T.white, padding: "88px 24px" }}>
      <motion.div ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: "-0.03em", fontFamily: "system-ui" }}>How We Engineer</h2>
          <p style={{ fontSize: 15, color: T.textSec, marginTop: 6 }}>Five phases. One relentless focus: production-grade outcomes.</p>
        </motion.div>
        <div style={{ position: "relative" }}>
          {/* Connecting line */}
          {!mobile && <div style={{ position: "absolute", top: 30, left: "10%", right: "10%", height: 2, background: `linear-gradient(90deg, ${T.blue}30, ${T.green}30)`, borderRadius: 1 }} />}
          <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(5, 1fr)", gap: mobile ? 20 : 16 }}>
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }}
                style={{ textAlign: "center", position: "relative", cursor: "default" }}>
                <motion.div
                  whileHover={{ scale: 1.1, borderColor: T.blue }}
                  style={{ width: 60, height: 60, borderRadius: "50%", background: T.white, border: `2px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", position: "relative", zIndex: 1, color: T.blue, transition: "border-color 0.2s" }}>
                  {s.i}
                </motion.div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textMuted, marginBottom: 4 }}>{s.n}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 6, fontFamily: "system-ui" }}>{s.t}</div>
                <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>{s.d}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 9: CLOSING CTA
   ═══════════════════════════════════════════ */
function ClosingCTA({ navigate }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", padding: "88px 24px", textAlign: "center" }}>
      <motion.div initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger} style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 14, fontFamily: "system-ui" }}>
          Ready to Engineer<br />Your Industrial Future?
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 32 }}>
          Let's talk about what AI-native engineering can do for your business. No pitch decks — just honest conversation with senior engineers who understand your domain.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Btn pill color="#fff" onClick={() => navigate && navigate("contact")}>
            <span style={{ color: T.blue, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
              Let's Innovate Together <ArrowRight size={16} />
            </span>
          </Btn>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  const w = useWindowSize();
  const mobile = w < 768;
  const cols = [
    { h: "Expertise", links: ["Cloud-Native Engineering", "Enterprise Modernization", "Platform Engineering", "Digital Experience", "Product Strategy", "Agile Pods"] },
    { h: "Industries", links: ["Manufacturing & Industry 4.0", "CleanTech & Sustainability", "Healthcare & Life Sciences", "Retail & Consumer", "FinTech & Insurance"] },
    { h: "Insights", links: ["Tech Radar", "Success Stories", "White Papers", "Blog"] },
    { h: "Company", links: ["About mVerve", "Careers", "Contact", "Privacy Policy"] },
  ];

  return (
    <footer style={{ background: T.dark, borderTop: `1px solid ${T.borderDark}`, padding: "64px 24px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "280px repeat(4, 1fr)", gap: mobile ? 32 : 36, marginBottom: 48 }}>
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, background: T.blue, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "system-ui" }}>m</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "system-ui" }}>m<span style={{ color: T.blue }}>Verve</span></span>
            </div>
            <p style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7, marginBottom: 20 }}>
              AI-Native Engineering for the Industrial Future. We bridge the gap between heavy industry and cognitive intelligence.
            </p>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: T.blue, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>NEWSLETTER</div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid ${T.borderDark}`, borderRadius: 6, padding: "9px 12px", fontSize: 12, color: T.textMuted }}>
                your@email.com
              </div>
              <button style={{ background: T.blue, color: "#fff", border: "none", borderRadius: 6, padding: "9px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>→</button>
            </div>
          </div>
          {/* Nav cols */}
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{col.h}</div>
              {col.links.map((l, j) => (
                <div key={j} style={{ fontSize: 13, color: T.onDarkSec, padding: "5px 0", cursor: "pointer", transition: "color 0.12s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = T.onDarkSec}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Bottom */}
        <div style={{ borderTop: `1px solid ${T.borderDark}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: T.textMuted }}>© 2026 mVerve Technologies. All rights reserved.</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 14 }}>
              {[{ l: "Bengaluru, India" }, { l: "Maryland, USA" }].map((loc, i) => (
                <span key={i} style={{ fontSize: 11, color: T.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={10} /> {loc.l}
                </span>
              ))}
            </div>
            <div style={{ width: 1, height: 14, background: T.borderDark }} />
            <div style={{ display: "flex", gap: 6 }}>
              {[Linkedin, Mail, Globe].map((Icon, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
                  <Icon size={13} color={T.textMuted} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
/* Page content export for prototype assembly */
export function HomepageContent({ navigate }) {
  return (
    <>
      <Hero navigate={navigate} />
      <ValueProps />
      <Metrics />
      <Services />
      <Industries navigate={navigate} />
      <CaseStudies />
      <TechRadar navigate={navigate} />
      <Methodology />
      <ClosingCTA navigate={navigate} />
    </>
  );
}

export default function MVerveHomepage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
      <Nav />
      <Hero />
      <ValueProps />
      <Metrics />
      <Services />
      <Industries />
      <CaseStudies />
      <TechRadar />
      <Methodology />
      <ClosingCTA />
      <Footer />
    </div>
  );
}
