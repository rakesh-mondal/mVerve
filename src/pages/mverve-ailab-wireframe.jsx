import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, Leaf, Factory, Hexagon, ArrowRight, ChevronRight, Zap,
  Database, BarChart3, Rocket, Sparkles, Bot, Workflow, LineChart,
  ServerCog, Shield, Code2, Cloud, CheckCircle2, ChevronDown, X,
  Menu, ExternalLink, FileText, Cpu, Target, Layers, Globe,
  ArrowUpRight, Clock, Users, Search, Mail, Phone, Linkedin, MapPin
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
    borderRadius: pill ? 999 : 8, fontSize: small ? 13 : 15,
    padding: small ? "8px 18px" : pill ? "14px 32px" : "13px 26px",
  };
  if (ghost) return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: "transparent", border: `1px solid ${T.border}`, color: hov ? T.text : T.textSec }}>
      {children}
    </button>
  );
  if (!primary) return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${hov ? T.borderHover : T.borderDark}`, color: T.onDark }}>
      {children}
    </button>
  );
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? T.blueHover : color, color: "#fff", boxShadow: hov ? `0 4px 20px ${T.blueGlow}` : "none" }}>
      {children}
    </button>
  );
}

function Counter({ value, suffix = "", prefix = "", label, color = T.blue }) {
  const [count, setCount] = useState(0);
  const [ref, vis] = useReveal();
  const num = parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const dur = 2200, steps = 70, inc = num / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(start));
    }, dur / steps);
    return () => clearInterval(t);
  }, [vis, num]);
  return (
    <motion.div ref={ref} variants={fadeUp} style={{ textAlign: "center" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "system-ui" }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: T.onDarkSec, marginTop: 8, lineHeight: 1.5, maxWidth: 180, margin: "8px auto 0" }}>{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   NAV BAR (Simplified for sub-page)
   ═══════════════════════════════════════════ */
function Nav({ page, onSwitch }) {
  const [scrolled, setScrolled] = useState(false);
  const w = useWindowSize();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(10,10,15,0.96)" : "rgba(10,10,15,0.75)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? T.borderDark : "transparent"}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, background: T.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>m</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: T.onDark, letterSpacing: "-0.02em" }}>mVerve</span>
        </div>
        {w >= 768 && (
          <div style={{ display: "flex", gap: 4 }}>
            {["AI Lab Hub", "Generative AI"].map(p => (
              <button key={p} onClick={() => onSwitch(p)}
                style={{ padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: page === p ? "rgba(37,99,235,0.15)" : "transparent", color: page === p ? T.blue : T.onDarkSec, transition: "all 0.2s" }}>
                {p}
              </button>
            ))}
          </div>
        )}
        <AnimatePresence>
          {scrolled && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Btn small pill>Talk to the Lab <ArrowRight size={14} /></Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AI LAB HUB PAGE
   ═══════════════════════════════════════════════════════════════════ */

/* ── SECTION 1: SUB-BRAND HERO ── */
function LabHero() {
  const [ref, vis] = useReveal(0.1);
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      {/* Scanline overlay */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)", pointerEvents: "none" }} />
      {/* Floating code fragments */}
      <div style={{ position: "absolute", top: "15%", left: "5%", opacity: 0.04, color: T.green, fontFamily: "monospace", fontSize: 13, whiteSpace: "pre", pointerEvents: "none" }}>
        {"import torch\nfrom transformers import AutoModel\n\nmodel = AutoModel.from_pretrained(\n  'mverve/industrial-bert'\n)"}
      </div>
      <div style={{ position: "absolute", bottom: "20%", right: "8%", opacity: 0.03, color: T.blue, fontFamily: "monospace", fontSize: 12, whiteSpace: "pre", pointerEvents: "none" }}>
        {"pipeline = Pipeline(\n  steps=[\n    DataIngestion(),\n    FeatureEngineer(),\n    ModelTrain(carbon_aware=True),\n    Deploy(target='production')\n  ]\n)"}
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Lab badge */}
        <motion.div variants={fadeIn} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${T.green}`, borderRadius: 6, padding: "6px 16px", marginBottom: 28 }}>
          <Hexagon size={14} color={T.green} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.green, fontWeight: 600, letterSpacing: 1.5 }}>THE MVERVE INNOVATION LAB</span>
        </motion.div>

        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: T.onDark, lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>
          The mVerve<br />Innovation Lab
        </motion.h1>

        <motion.p variants={fadeUp} style={{ fontSize: "clamp(18px, 2.2vw, 22px)", color: T.onDarkSec, marginTop: 16, lineHeight: 1.5, fontWeight: 500, maxWidth: 600 }}>
          Where AI Meets Industrial Intelligence
        </motion.p>

        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDarkMuted, marginTop: 20, lineHeight: 1.7, maxWidth: 600 }}>
          This is where manufacturing's hardest problems meet machine intelligence. The Innovation Lab is mVerve's dedicated AI practice — a team of senior ML engineers, data architects, and domain specialists who build production-grade intelligent systems for the industrial future.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn>Bring Your AI Challenge to the Lab <ArrowRight size={16} /></Btn>
          <Btn primary={false}>See What We've Built <ChevronDown size={16} /></Btn>
        </motion.div>
      </div>

      {/* Neural mesh placeholder */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", pointerEvents: "none" }}>
        <Placeholder label="Generative neural-network particle mesh — blue + green nodes with connecting edges, animating continuously" h="100%" dark radius={0} />
      </div>
    </motion.section>
  );
}

/* ── SECTION 2: OVERVIEW NARRATIVE ── */
function OverviewNarrative() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: w >= 900 ? "1.5fr 1fr" : "1fr", gap: 56 }}>
        <div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 700, color: T.text, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Not a Service Line.<br />An Intelligence Engine.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, lineHeight: 1.8, marginTop: 24 }}>
            The mVerve Innovation Lab was founded on a simple conviction: AI shouldn't be a line item on a proposal — it should be the lens through which every engineering challenge is approached.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, lineHeight: 1.8, marginTop: 16 }}>
            While most firms bolt AI onto existing systems as an afterthought, the Lab architects intelligence into the foundation. We don't run workshops about AI or build impressive demos that never reach production. We ship. Every engagement starts with your domain reality — the factory floor constraints, the regulatory requirements, the legacy systems you can't switch off.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.text, lineHeight: 1.8, marginTop: 16, fontWeight: 600 }}>
            The result: intelligent systems that get smarter with use, not just older. Production-grade AI that delivers measurable ROI within 90 days, not 90 slide decks.
          </motion.p>
        </div>
        <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { title: "Domain-First AI", desc: "We understand manufacturing, CleanTech, and healthcare before we write a single line of model code.", color: T.blue },
            { title: "Sustainable by Design", desc: "Every model we train, every pipeline we deploy runs through our GreenOps methodology. Carbon-aware computing is engineered in.", color: T.green },
            { title: "Production, Not Prototypes", desc: "We don't hand off a notebook and a slide deck. We deploy to production, monitor in real-time, and iterate until the numbers move.", color: T.amber },
          ].map((d, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ padding: 20, borderRadius: 8, borderLeft: `3px solid ${d.color}`, background: T.light, border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: d.color }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 6 }}>{d.title}</div>
              <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>{d.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── SECTION 3: 5 CAPABILITY CARDS ── */
function CapabilityCards({ onViewGenAI }) {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const [hovered, setHovered] = useState(null);

  const row1 = [
    { num: "01", title: "Generative AI Solutions", desc: "Custom LLM implementations, RAG architectures, and domain-specific AI copilots that understand your industry's language, regulations, and workflows.", uses: "Intelligent document processing, AI-assisted quality inspection, automated RFQ generation", color: T.blue, link: true },
    { num: "02", title: "Intelligent Automation", desc: "ML-powered workflow automation that replaces manual decision-making with production-grade intelligence. From predictive maintenance to demand forecasting.", uses: "Predictive maintenance, anomaly detection, demand forecasting, supply chain optimization", color: T.blue },
    { num: "03", title: "Sustainable AI / GreenOps", desc: "Our proprietary GreenOps methodology for carbon-aware model training, green workload scheduling, and infrastructure optimization.", uses: "Carbon-aware scheduling, green model training, sustainability compliance, NetZero infrastructure", color: T.green },
  ];
  const row2 = [
    { num: "04", title: "Data Strategy & Engineering", desc: "Unified data platforms, real-time streaming pipelines, and lakehouse architectures that turn fragmented enterprise data into a single intelligence layer.", uses: "Data lakehouse, real-time streaming, PLEX data unification, IoT ingestion", color: T.blue },
    { num: "05", title: "The MVP Incubator", desc: "From idea to shipped product in 6 weeks. AI-powered rapid prototyping and validation with a clear go/no-go framework. 80% proceed to full build.", uses: "Product validation, AI feature prototyping, internal tool rapid-build", color: T.amber },
  ];

  const Card = ({ d, idx }) => {
    const isHov = hovered === idx;
    return (
      <motion.div variants={fadeUp}
        onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}
        onClick={d.link ? onViewGenAI : undefined}
        style={{
          background: T.darkCard, borderRadius: 10, padding: 28, cursor: d.link ? "pointer" : "default",
          border: `1px solid ${isHov ? d.color + "40" : T.borderDark}`,
          boxShadow: isHov ? `0 0 30px ${d.color}12` : "none",
          transform: isHov ? "translateY(-4px)" : "none",
          transition: "all 0.25s",
        }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: d.color, marginBottom: 10, fontWeight: 600 }}>DISCIPLINE {d.num}</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: T.onDark, marginBottom: 10 }}>{d.title}</div>
        <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7 }}>{d.desc}</div>
        <div style={{ fontSize: 12, color: T.onDarkMuted, marginTop: 14, lineHeight: 1.6 }}>Use cases: {d.uses}</div>
        {d.link && (
          <div style={{ marginTop: 16, fontSize: 13, color: T.blue, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            Explore Generative AI <ArrowRight size={14} />
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>LAB DISCIPLINES</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Five Capabilities. One Intelligent Platform.
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDarkSec, marginTop: 12, maxWidth: 600, lineHeight: 1.7 }}>
          Each discipline operates as a focused practice — with dedicated engineers, proven frameworks, and a track record of production deployments.
        </motion.p>
        {/* Row 1: 3 cards */}
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "1fr 1fr 1fr" : w >= 600 ? "1fr 1fr" : "1fr", gap: 20, marginTop: 40 }}>
          {row1.map((d, i) => <Card key={i} d={d} idx={i} />)}
        </motion.div>
        {/* Row 2: 2 cards */}
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 600 ? "1fr 1fr" : "1fr", gap: 20, marginTop: 20 }}>
          {row2.map((d, i) => <Card key={i + 3} d={d} idx={i + 3} />)}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── SECTION 4: METHODOLOGY — Step-by-Step Visual Flow ── */
function Methodology() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    { num: "01", title: "Discover", duration: "2 WEEKS", color: T.blue, desc: "Domain immersion. We embed with your team to understand the business reality — the data landscape, the legacy constraints, the workflow pain points. We map the AI opportunity space and identify the highest-ROI starting point.", deliverable: "AI Opportunity Map + Prioritized Roadmap", icon: Search },
    { num: "02", title: "Prototype", duration: "2-4 WEEKS", color: T.blue, desc: "Rapid validation. We build a working proof-of-value using your real data — not synthetic benchmarks. This isn't a demo; it's a functional system that proves the approach works in your environment.", deliverable: "Working Proof-of-Value + Go/No-Go Decision", icon: Rocket },
    { num: "03", title: "Engineer", duration: "6-12 WEEKS", color: T.blue, desc: "Production build. An Agile Pod ships production-grade code in 2-week sprints — with CI/CD, observability, GreenOps carbon monitoring, and enterprise security baked in from day one.", deliverable: "Production-Grade System + Monitoring Dashboard", icon: Code2 },
    { num: "04", title: "Scale", duration: "ONGOING", color: T.green, desc: "Continuous evolution. Your system gets smarter every sprint. We monitor model performance, retrain on new data, expand to additional use cases, and optimize for cost and carbon.", deliverable: "Quarterly AI Impact Report + Expansion Roadmap", icon: LineChart },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>LAB METHODOLOGY</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 700, color: T.text, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          From Challenge to Production in Four Phases
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, marginTop: 12, maxWidth: 650, lineHeight: 1.7 }}>
          Every Lab engagement follows a disciplined, outcome-driven methodology. No open-ended research projects. No POCs that gather dust. Just a clear path from your business challenge to a production-grade intelligent system.
        </motion.p>

        {/* Connecting timeline */}
        <div style={{ position: "relative", marginTop: 56 }}>
          {/* Horizontal connector line */}
          {w >= 900 && (
            <div style={{ position: "absolute", top: 44, left: "6%", right: "6%", height: 2, background: T.border, zIndex: 0 }}>
              <motion.div initial={{ scaleX: 0 }} animate={vis ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 1.2, delay: 0.3, ease }}
                style={{ height: "100%", background: `linear-gradient(90deg, ${T.blue}, ${T.green})`, transformOrigin: "left" }} />
            </div>
          )}

          <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "repeat(4, 1fr)" : w >= 600 ? "1fr 1fr" : "1fr", gap: 24, position: "relative", zIndex: 1 }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeStep === i;
              return (
                <motion.div key={i} variants={fadeUp}
                  onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)}
                  style={{ textAlign: "center", cursor: "default" }}>
                  {/* Node circle */}
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1, boxShadow: isActive ? `0 0 24px ${s.color}30` : "none" }}
                    style={{
                      width: 56, height: 56, borderRadius: "50%", margin: "0 auto 20px",
                      background: isActive ? s.color : T.light,
                      border: `2px solid ${isActive ? s.color : T.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.25s",
                    }}>
                    <Icon size={22} color={isActive ? "#fff" : s.color} />
                  </motion.div>
                  {/* Phase number watermark */}
                  <div style={{ fontSize: 48, fontWeight: 700, color: isActive ? `${s.color}15` : "#F1F5F9", lineHeight: 1, transition: "color 0.3s" }}>{s.num}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 4 }}>{s.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: s.color, margin: "6px 0 12px", fontWeight: 600 }}>{s.duration}</div>
                  <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, padding: "0 4px" }}>{s.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 12, color: T.textMuted, fontStyle: "italic" }}>Deliverable: {s.deliverable}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Timeline bar */}
        <motion.div variants={fadeUp} style={{ marginTop: 48, background: T.light, borderRadius: 8, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[{ label: "Discovery", w: "10%", c: T.blue }, { label: "Prototype", w: "15%", c: T.blue }, { label: "Engineer", w: "40%", c: T.blue }, { label: "Scale & Evolve", w: "35%", c: T.green }].map((seg, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: seg.c }} />
                <span style={{ fontSize: 12, color: T.textSec }}>{seg.label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>Total: 12-20 weeks to production</div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── SECTION 5: FEATURED CASE STUDY ── */
function FeaturedCaseStudy() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.darkAlt, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.green}>LAB CASE STUDY</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          From Lab to Production: Proof, Not Promises
        </motion.h2>

        <motion.div variants={fadeUp} style={{ marginTop: 36, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: `1px solid ${T.borderDark}`, borderLeft: `3px solid ${T.blue}`, padding: 32 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, marginBottom: 10, fontWeight: 600 }}>INTELLIGENT DECISION ENGINE × MANUFACTURING</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.onDark, marginBottom: 16 }}>Predictive Maintenance Intelligence for [Manufacturing Client]</div>

          <div style={{ fontSize: 14, color: T.onDarkSec, lineHeight: 1.8, marginBottom: 12 }}>
            <strong style={{ color: T.onDark }}>The Challenge:</strong> A $200M automotive parts manufacturer with 200+ production machines and zero predictive capability. Every hour of unplanned downtime cost $47K. Maintenance was entirely reactive.
          </div>
          <div style={{ fontSize: 14, color: T.onDarkSec, lineHeight: 1.8, marginBottom: 12 }}>
            <strong style={{ color: T.onDark }}>The Lab's Approach:</strong> We followed the four-phase methodology: Discover (2 weeks on factory floor) → Prototype (failure-prediction model in 3 weeks) → Engineer (production ML pipeline in 8 weeks) → Scale (50 → 200+ machines across two plants).
          </div>

          {/* Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginTop: 24 }}>
            {[
              { val: "42%", label: "Downtime reduction in Q1", color: T.blue },
              { val: "200+", label: "Machines monitored 24/7", color: T.green },
              { val: "72hr", label: "Avg failure prediction window", color: T.amber },
              { val: "12 wks", label: "Discovery to production", color: T.blue },
            ].map((m, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "16px 12px", textAlign: "center", border: `1px solid ${T.borderDark}` }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.val}</div>
                <div style={{ fontSize: 11, color: T.onDarkMuted, marginTop: 4, lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Btn small>Read the Full Case Study <ArrowRight size={14} /></Btn>
            <Btn small primary={false}>See All Lab Case Studies</Btn>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── SECTION 6: TECH ECOSYSTEM ── */
function TechEcosystem() {
  const [ref, vis] = useReveal();
  const [hovered, setHovered] = useState(null);
  const w = useWindowSize();
  const cols = w >= 900 ? 4 : w >= 600 ? 2 : 1;

  const categories = [
    { name: "AI & ML Platforms", items: [
      { name: "OpenAI", sub: "GPT-4, embeddings, fine-tuning" },
      { name: "Anthropic", sub: "Claude for enterprise AI copilots" },
      { name: "Hugging Face", sub: "Open-source model deployment" },
      { name: "PyTorch / TensorFlow", sub: "Custom model training" },
    ]},
    { name: "Cloud & Infrastructure", items: [
      { name: "AWS", sub: "SageMaker, ECS, Lambda" },
      { name: "Azure", sub: "Azure ML, AKS, Cognitive Services" },
      { name: "Snowflake", sub: "Data cloud, Snowpark ML" },
      { name: "Databricks", sub: "Lakehouse, MLflow, Unity Catalog" },
    ]},
    { name: "Automation & Integration", items: [
      { name: "UiPath", sub: "RPA + AI orchestration" },
      { name: "LangChain", sub: "LLM application framework" },
      { name: "Pinecone / Weaviate", sub: "Vector databases for RAG" },
      { name: "Plex by Rockwell", sub: "ERP integration specialists", accent: T.amber },
    ]},
  ];

  let gIdx = 0;
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.textMuted}>OUR TECHNOLOGY ECOSYSTEM</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.text, lineHeight: 1.15 }}>
          Built on the Platforms That Power Industry
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, marginTop: 12, maxWidth: 650, lineHeight: 1.7 }}>
          We're opinionated about our tech stack — and transparent about why. These are the platforms we've validated in production across dozens of deployments.
        </motion.p>

        {categories.map((cat, ci) => (
          <motion.div key={ci} variants={fadeUp} style={{ marginTop: ci === 0 ? 40 : 32 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, color: T.textMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14 }}>{cat.name}</div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
              {cat.items.map((item, ii) => {
                const idx = gIdx++;
                const isHov = hovered === idx;
                return (
                  <div key={ii} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)}
                    style={{ padding: 20, borderRadius: 8, border: `1px solid ${isHov ? (item.accent || T.blue) + "40" : T.border}`, background: isHov ? T.light : T.white, textAlign: "center", transition: "all 0.2s", cursor: "default" }}>
                    <Placeholder label={`${item.name} logo — grayscale${isHov ? " → color" : ""}`} h={40} radius={4} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginTop: 10 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: T.textSec, marginTop: 4 }}>{item.sub}</div>
                  </div>
                );
              })}
            </div>
            {ci < categories.length - 1 && <div style={{ borderBottom: `1px solid ${T.border}`, margin: "32px 0 0" }} />}
          </motion.div>
        ))}

        <motion.div variants={fadeUp} style={{ marginTop: 32, textAlign: "center" }}>
          <Btn ghost small>View the Full Tech Radar <ArrowRight size={14} /></Btn>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── SECTION 7: COMPARISON TABLE ── */
function ComparisonTable() {
  const [ref, vis] = useReveal();
  const rows = [
    { dim: "Starting Point", old: "Start with the technology", lab: "Start with the domain problem", color: T.blue },
    { dim: "Delivery", old: "POC that never reaches production", lab: "Production-grade from sprint one", color: T.blue },
    { dim: "Domain Knowledge", old: "Generic AI applied to any industry", lab: "Manufacturing, CleanTech, Healthcare specialists", color: T.blue },
    { dim: "Sustainability", old: "Ignored entirely", lab: "GreenOps: carbon-aware by default", color: T.green },
    { dim: "Team Composition", old: "Junior devs learning on your dime", lab: "Senior ML engineers + domain specialists", color: T.blue },
    { dim: "Success Metric", old: "Impressive demo, no business impact", lab: "Measurable ROI within 90 days", color: T.blue },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.light, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.text, lineHeight: 1.15, textAlign: "center" }}>
          Not Your Typical AI Consultancy
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 16, color: T.textSec, textAlign: "center", marginTop: 8 }}>
          We don't run workshops about AI. We ship AI into production.
        </motion.p>

        <motion.div variants={fadeUp} style={{ marginTop: 40, background: T.white, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}` }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", borderBottom: `2px solid ${T.border}` }}>
            <div style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: 11, color: T.textMuted, fontWeight: 600 }}>DIMENSION</div>
            <div style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: 11, color: T.rose, fontWeight: 600 }}>THE OLD WAY</div>
            <div style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: 11, color: T.blue, fontWeight: 600 }}>THE MVERVE LAB</div>
          </div>
          {/* Rows */}
          {rows.map((r, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", borderBottom: i < rows.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ padding: "14px 20px", fontSize: 13, color: T.textSec }}>{r.dim}</div>
              <div style={{ padding: "14px 20px", fontSize: 13, color: T.rose, textDecoration: "line-through", opacity: 0.7 }}>{r.old}</div>
              <div style={{ padding: "14px 20px", fontSize: 13, color: r.color, fontWeight: 600 }}>{r.lab}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── SECTION 8: CLOSING CTA ── */
function ClosingCTA() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.blueHover})`, padding: "100px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <motion.div variants={fadeIn} style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Hexagon size={12} /> THE MVERVE INNOVATION LAB
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>
          Bring Your AI Challenge<br />to the Lab
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 16, lineHeight: 1.8 }}>
          Start with a free AI Readiness Assessment. In two weeks, we'll map your data landscape, identify the highest-impact AI opportunities, and deliver a prioritized roadmap with clear ROI projections. No pitch decks — just honest engineering conversation.
        </motion.p>
        <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
          <Btn pill color="#fff" style={{ color: T.blue }}>
            <span style={{ color: T.blue }}>Book Your Lab Session</span> <ArrowRight size={16} color={T.blue} />
          </Btn>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GENERATIVE AI SOLUTIONS SUB-PAGE
   ═══════════════════════════════════════════════════════════════════ */

function GenAIHero() {
  const [ref, vis] = useReveal(0.1);
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <motion.div variants={fadeIn} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, fontSize: 12, color: T.onDarkMuted }}>
          <span style={{ cursor: "pointer", color: T.onDarkSec }}>AI Lab</span>
          <ChevronRight size={12} />
          <span style={{ color: T.blue }}>Generative AI Solutions</span>
        </motion.div>

        <motion.div variants={fadeIn} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${T.blue}`, borderRadius: 6, padding: "6px 16px", marginBottom: 24 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, fontWeight: 600, letterSpacing: 1 }}>DISCIPLINE 01</span>
        </motion.div>

        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, color: T.onDark, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Generative AI<br />Solutions
        </motion.h1>

        <motion.p variants={fadeUp} style={{ fontSize: "clamp(17px, 2vw, 20px)", color: T.onDarkSec, marginTop: 16, lineHeight: 1.6, maxWidth: 620 }}>
          Custom LLM implementations, RAG architectures, and domain-specific AI copilots that understand your industry's language, regulations, and workflows — not generic chatbots that hallucinate your compliance requirements.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn>Discuss Your GenAI Challenge <ArrowRight size={16} /></Btn>
          <Btn primary={false}>See GenAI Case Studies</Btn>
        </motion.div>

        {/* Tech stack pills */}
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
          {["OpenAI GPT-4", "Anthropic Claude", "LangChain", "Pinecone", "Hugging Face", "RAG Architecture"].map(t => (
            <span key={t} style={{ fontFamily: "monospace", fontSize: 11, padding: "4px 12px", borderRadius: 4, background: "rgba(37,99,235,0.1)", color: T.blue, border: `1px solid rgba(37,99,235,0.15)` }}>{t}</span>
          ))}
        </motion.div>
      </div>

      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", pointerEvents: "none" }}>
        <Placeholder label="Abstract LLM visualization — document nodes flowing through transformer architecture into structured outputs" h="100%" dark radius={0} />
      </div>
    </motion.section>
  );
}

function GenAIProblem() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: w >= 900 ? "1.4fr 1fr" : "1fr", gap: 48 }}>
        <div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: T.text, lineHeight: 1.2 }}>
            The Generative AI Paradox for Enterprise
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, lineHeight: 1.8, marginTop: 20 }}>
            Every enterprise wants generative AI. Few can deploy it safely. The gap between impressive demo and production system is vast — hallucinations, data security, regulatory compliance, integration with legacy systems, and the constant risk of AI that sounds confident but gets critical details wrong.
          </motion.p>
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.text, lineHeight: 1.8, marginTop: 16, fontWeight: 600 }}>
            The mVerve Lab builds generative AI that works within your constraints, not in spite of them. Domain-specific, guardrailed, production-grade.
          </motion.p>
        </div>
        <motion.div variants={fadeUp}>
          <Placeholder label="Infographic: Demo vs. Production gap — showing the hidden complexity iceberg (security, compliance, monitoring, data pipelines, retraining)" h={300} />
        </motion.div>
      </div>
    </motion.section>
  );
}

function GenAICapabilities() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const [expanded, setExpanded] = useState(null);

  const caps = [
    { icon: Bot, title: "Domain-Specific AI Copilots", desc: "Custom copilots trained on your knowledge base, SOPs, and regulatory frameworks. They don't guess — they reference.", examples: "Manufacturing floor assistant, regulatory compliance copilot, engineering knowledge base bot", color: T.blue },
    { icon: FileText, title: "Intelligent Document Processing", desc: "Extract, classify, and transform unstructured documents into structured data. Invoices, compliance docs, quality reports — at scale.", examples: "Automated invoice extraction, quality report classification, RFQ generation from specs", color: T.blue },
    { icon: Database, title: "RAG Architecture & Knowledge Bases", desc: "Retrieval-Augmented Generation systems that ground LLM outputs in your actual data. No hallucinations, just verified answers.", examples: "Enterprise knowledge search, technical documentation Q&A, customer support automation", color: T.purple },
    { icon: Shield, title: "Enterprise Guardrails & Safety", desc: "Production-grade safety layers — PII detection, output validation, compliance filters, and audit trails. Because enterprise AI must be trustworthy.", examples: "HIPAA-compliant outputs, SOC2 audit logging, automated hallucination detection", color: T.green },
    { icon: Workflow, title: "Agentic AI Workflows", desc: "Multi-step AI agents that orchestrate complex business processes — from data gathering to decision-making to action execution.", examples: "Automated procurement workflows, multi-step quality assurance chains, intelligent scheduling", color: T.amber },
    { icon: Layers, title: "Fine-Tuning & Custom Models", desc: "When off-the-shelf models aren't enough, we fine-tune or train custom models on your proprietary data for domain-specific accuracy.", examples: "Industry-specific language models, custom classification models, specialized NER for manufacturing", color: T.cyan },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>WHAT WE BUILD</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          Generative AI Capabilities
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDarkSec, marginTop: 12, maxWidth: 600, lineHeight: 1.7 }}>
          Six core capabilities that cover the full spectrum of enterprise generative AI — from copilots to custom models.
        </motion.p>

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "1fr 1fr 1fr" : w >= 600 ? "1fr 1fr" : "1fr", gap: 20, marginTop: 40 }}>
          {caps.map((c, i) => {
            const Icon = c.icon;
            const isExp = expanded === i;
            return (
              <motion.div key={i} variants={fadeUp} onClick={() => setExpanded(isExp ? null : i)}
                style={{ background: T.darkCard, borderRadius: 10, padding: 24, cursor: "pointer", border: `1px solid ${isExp ? c.color + "40" : T.borderDark}`, transition: "all 0.25s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={c.color} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.onDark }}>{c.title}</div>
                </div>
                <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7 }}>{c.desc}</div>
                <AnimatePresence>
                  {isExp && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.borderDark}`, fontSize: 12, color: T.onDarkMuted, lineHeight: 1.7 }}>
                        <strong style={{ color: c.color }}>Examples:</strong> {c.examples}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ marginTop: 12, fontSize: 11, color: c.color, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  {isExp ? "Less" : "See examples"} <ChevronDown size={12} style={{ transform: isExp ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

function GenAIMethodology() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();

  const phases = [
    { phase: "01", title: "Assess & Architect", duration: "Week 1-2", items: ["Map existing data sources & quality", "Identify high-value GenAI use cases", "Select model strategy (API vs. fine-tune vs. custom)", "Define guardrails & compliance requirements"], color: T.blue },
    { phase: "02", title: "Build & Validate", duration: "Week 3-6", items: ["Implement RAG pipeline with your data", "Build domain-specific prompts & chains", "Deploy guardrails & safety layers", "Validate against real-world test cases"], color: T.blue },
    { phase: "03", title: "Harden & Ship", duration: "Week 7-10", items: ["Production infrastructure & CI/CD", "Load testing & edge case handling", "Monitoring, logging & audit trails", "User training & adoption support"], color: T.blue },
    { phase: "04", title: "Evolve & Expand", duration: "Ongoing", items: ["Monitor model performance & drift", "Retrain on new data quarterly", "Expand to additional use cases", "Optimize cost & carbon footprint"], color: T.green },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.light, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>GENAI DELIVERY METHODOLOGY</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.text, lineHeight: 1.15 }}>
          From Use Case to Production in 10 Weeks
        </motion.h2>

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "repeat(4, 1fr)" : w >= 600 ? "1fr 1fr" : "1fr", gap: 20, marginTop: 40 }}>
          {phases.map((p, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ background: T.white, borderRadius: 10, padding: 24, border: `1px solid ${T.border}`, borderTop: `3px solid ${p.color}`, position: "relative" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: "#F1F5F9", lineHeight: 1 }}>{p.phase}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginTop: 4 }}>{p.title}</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: p.color, margin: "6px 0 16px", fontWeight: 600 }}>{p.duration}</div>
              {p.items.map((item, ii) => (
                <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>
                  <CheckCircle2 size={14} color={p.color} style={{ marginTop: 3, flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function GenAICaseStudy() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.darkAlt, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.green}>GENAI IN ACTION</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          From 3 Days to 3 Minutes: AI Document Processing
        </motion.h2>

        <motion.div variants={fadeUp} style={{ marginTop: 32, display: "grid", gridTemplateColumns: w >= 900 ? "1.3fr 1fr" : "1fr", gap: 36 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: T.amber, marginBottom: 12, fontWeight: 600 }}>MANUFACTURING × DOCUMENT INTELLIGENCE</div>
            <p style={{ fontSize: 14, color: T.onDarkSec, lineHeight: 1.8, marginBottom: 12 }}>
              A $150M automotive parts manufacturer processed 400+ supplier quality reports monthly — manually. Three full-time staff spent 3 days per batch extracting data, classifying defects, and routing to quality engineers.
            </p>
            <p style={{ fontSize: 14, color: T.onDarkSec, lineHeight: 1.8, marginBottom: 12 }}>
              We deployed a custom RAG pipeline with fine-tuned extraction models, achieving 97.3% accuracy on first pass — with human-in-the-loop verification for the remaining edge cases.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              <Btn small>Read Full Case Study <ArrowRight size={14} /></Btn>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { val: "97.3%", label: "First-pass extraction accuracy", color: T.blue },
              { val: "3 min", label: "Processing time (was 3 days)", color: T.green },
              { val: "400+", label: "Reports processed monthly", color: T.amber },
              { val: "89%", label: "Staff time redirected to QA", color: T.purple },
            ].map((m, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 18, textAlign: "center", border: `1px solid ${T.borderDark}` }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: m.color }}>{m.val}</div>
                <div style={{ fontSize: 11, color: T.onDarkMuted, marginTop: 6, lineHeight: 1.5 }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function GenAICTA() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(135deg, ${T.blue}, #6366F1)`, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
          Ready to Deploy Generative AI That Actually Works?
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 14, lineHeight: 1.7 }}>
          Start with a free GenAI Readiness Assessment. We'll evaluate your data, identify the highest-impact use case, and build a working proof-of-value in 4 weeks.
        </motion.p>
        <motion.div variants={fadeUp} style={{ marginTop: 28 }}>
          <Btn pill color="#fff">
            <span style={{ color: T.blue }}>Book a GenAI Assessment</span> <ArrowRight size={16} color={T.blue} />
          </Btn>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: T.dark, padding: "48px 24px 28px", borderTop: `1px solid ${T.borderDark}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, background: T.blue, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>m</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: T.onDark }}>mVerve</span>
          <span style={{ fontSize: 12, color: T.onDarkMuted, marginLeft: 8 }}>AI-Native Engineering for the Industrial Future</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Bengaluru, India", "Maryland, USA"].map(loc => (
            <span key={loc} style={{ fontSize: 12, color: T.onDarkMuted, display: "flex", alignItems: "center", gap: 4 }}>
              <MapPin size={11} /> {loc}
            </span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "20px auto 0", borderTop: `1px solid ${T.borderDark}`, paddingTop: 16, fontSize: 11, color: T.onDarkMuted, textAlign: "center" }}>
        © 2026 mVerve Technologies. All rights reserved. &nbsp;|&nbsp; SOC 2 Type II &nbsp;|&nbsp; ISO 27001 &nbsp;|&nbsp; HIPAA Compliant
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP — PAGE ROUTER
   ═══════════════════════════════════════════════════════════════════ */
/* Page content exports for prototype assembly */
export function AILabHubContent({ navigate }) {
  return (
    <>
      <LabHero />
      <OverviewNarrative />
      <CapabilityCards onViewGenAI={() => navigate && navigate("genai")} />
      <Methodology />
      <FeaturedCaseStudy />
      <TechEcosystem />
      <ComparisonTable />
      <ClosingCTA />
    </>
  );
}

export function GenAIContent({ navigate }) {
  return (
    <>
      <GenAIHero />
      <GenAIProblem />
      <GenAICapabilities />
      <GenAIMethodology />
      <GenAICaseStudy />
      <GenAICTA />
    </>
  );
}

export default function MVerveAILab() {
  const [page, setPage] = useState("AI Lab Hub");

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <Nav page={page} onSwitch={setPage} />

      <AnimatePresence mode="wait">
        {page === "AI Lab Hub" ? (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LabHero />
            <OverviewNarrative />
            <CapabilityCards onViewGenAI={() => { setPage("Generative AI"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            <Methodology />
            <FeaturedCaseStudy />
            <TechEcosystem />
            <ComparisonTable />
            <ClosingCTA />
            <Footer />
          </motion.div>
        ) : (
          <motion.div key="genai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <GenAIHero />
            <GenAIProblem />
            <GenAICapabilities />
            <GenAIMethodology />
            <GenAICaseStudy />
            <GenAICTA />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
