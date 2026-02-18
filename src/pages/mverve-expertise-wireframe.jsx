import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Cloud, Layers, ServerCog, Globe, Cpu, Shield, Code2, Database,
  ArrowRight, ChevronRight, ChevronDown, Zap, Brain, Sparkles,
  CheckCircle2, ExternalLink, Menu, X, MapPin, Users, Rocket,
  BarChart3, Target, Workflow, LineChart, Bot, FileText, Hexagon,
  Gauge, Monitor, Palette, Lightbulb, BookOpen, ArrowUpRight
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
    h(); window.addEventListener("resize", h);
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
      <span style={{ fontFamily: "monospace", fontSize: 11, color: dark ? "#475569" : "#94A3B8", background: dark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.85)", padding: "6px 14px", borderRadius: 4, textAlign: "center", maxWidth: "85%", lineHeight: 1.5 }}>{label}</span>
    </div>
  );
}

function Badge({ children, color = T.blue }) {
  return (
    <span style={{ fontFamily: "monospace", fontSize: 10, padding: "3px 10px", borderRadius: 4, background: `${color}15`, color, fontWeight: 600, letterSpacing: 0.5 }}>{children}</span>
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
      style={{ ...base, background: "transparent", border: `1px solid ${T.border}`, color: hov ? T.text : T.textSec }}>{children}</button>
  );
  if (!primary) return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${hov ? T.borderHover : T.borderDark}`, color: T.onDark }}>{children}</button>
  );
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? T.blueHover : color, color: "#fff", boxShadow: hov ? `0 4px 20px ${T.blueGlow}` : "none" }}>{children}</button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ★ REUSABLE AI-ENHANCED CALLOUT PATTERN
   This component repeats identically on every service sub-page.
   Pass title + body text to customize per-service.
   ═══════════════════════════════════════════════════════════════════ */
function AIEnhancedCallout({ title, body }) {
  const [ref, vis] = useReveal();
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.div variants={fadeUp}
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(16,185,129,0.06))",
            border: "1px solid rgba(37,99,235,0.15)", borderRadius: 12, padding: 32, cursor: "pointer",
            transition: "all 0.25s",
          }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #2563EB, #10B981)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Brain size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: T.blue, fontWeight: 600, letterSpacing: 1.5, marginBottom: 2 }}>HOW AI ELEVATES THIS SERVICE</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: T.text }}>{title}</div>
            </div>
            <ChevronDown size={18} color={T.textMuted} style={{ marginLeft: "auto", transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </div>

          {/* Preview (always visible) */}
          <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.8 }}>
            {body.split(". ").slice(0, 2).join(". ") + "."}
          </div>

          {/* Expanded detail */}
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(37,99,235,0.1)", fontSize: 14, color: T.textSec, lineHeight: 1.8 }}>
                  {body.split(". ").slice(2).join(". ")}
                </div>
                {/* AI capability pills */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
                  {["ML-Powered", "Production-Grade", "Continuous Learning", "GreenOps Integrated"].map(p => (
                    <span key={p} style={{ fontFamily: "monospace", fontSize: 10, padding: "4px 10px", borderRadius: 4, background: "rgba(37,99,235,0.08)", color: T.blue, border: "1px solid rgba(37,99,235,0.12)" }}>{p}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pattern note for dev handoff */}
        <motion.div variants={fadeIn} style={{ marginTop: 12, fontFamily: "monospace", fontSize: 10, color: T.textMuted, textAlign: "center" }}>
          PATTERN: AI-Enhanced Callout — repeats on all 8 service sub-pages with unique title + body
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPERTISE HUB PAGE
   ═══════════════════════════════════════════════════════════════════ */

/* ── HUB HERO ── */
function HubHero({ onNavigate }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div variants={fadeIn} style={{ marginBottom: 24 }}>
          <Badge color={T.blue}>ENGINEERING EXPERTISE</Badge>
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, color: T.onDark, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          We Don't Sell Technology.<br />We Engineer Outcomes.
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: T.onDarkSec, marginTop: 20, lineHeight: 1.7, maxWidth: 620 }}>
          Eight capabilities. Three pillars. One relentless focus: building intelligent systems that move your business forward. Every service is AI-enhanced, GreenOps-certified, and delivered by senior-led Agile Pods.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn>Let's Scope Your Project <ArrowRight size={16} /></Btn>
          <Btn primary={false}>Explore the AI Lab</Btn>
        </motion.div>
      </div>

      {/* Abstract grid visualization */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", pointerEvents: "none" }}>
        <Placeholder label="Abstract engineering grid — interconnected nodes forming 3 columns (blue, green, amber) converging into a unified system" h="100%" dark radius={0} />
      </div>
    </motion.section>
  );
}

/* ── 3-COLUMN CAPABILITY OVERVIEW ── */
function CapabilityOverview({ onNavigate }) {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const [hoveredService, setHoveredService] = useState(null);

  const pillars = [
    {
      name: "DIGITAL & CLOUD", color: T.blue,
      services: [
        { title: "Cloud-Native Engineering", sub: "AWS/Azure, Microservices, Serverless", slug: "cloud-native", navigable: true },
        { title: "Enterprise Modernization", sub: "Legacy Migration, PLEX ERP, API Management", slug: "enterprise-mod" },
        { title: "Platform Engineering", sub: "DevOps, CI/CD, SRE", slug: "platform-eng" },
      ],
    },
    {
      name: "EXPERIENCE & DESIGN", color: T.green,
      services: [
        { title: "Digital Experience", sub: "Frontend React/Vue, Mobile iOS/Android", slug: "digital-exp" },
        { title: "Product Strategy & Design", sub: "UI/UX Research, Design Systems, Prototyping", slug: "product-strategy" },
        { title: "Service Design", sub: "Customer Journey Mapping, Process Optimization", slug: "service-design" },
      ],
    },
    {
      name: "STRATEGIC TALENT", color: T.amber,
      services: [
        { title: "Agile Pods", sub: "Cross-Functional Teams: PM + Dev + QA", slug: "agile-pods" },
        { title: "Technical Consulting", sub: "Architecture Review, Agile Coaching", slug: "tech-consulting" },
      ],
    },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: T.text, lineHeight: 1.15 }}>Three Pillars. Eight Capabilities.</h2>
          <p style={{ fontSize: 15, color: T.textSec, marginTop: 8 }}>Click any service to explore the full capability page.</p>
        </motion.div>

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "1fr 1fr 1fr" : "1fr", gap: 24 }}>
          {pillars.map((pillar, pi) => (
            <motion.div key={pi} variants={fadeUp} style={{ borderTop: `3px solid ${pillar.color}`, borderRadius: 12, overflow: "hidden", border: `1px solid ${T.border}`, borderTopWidth: 3, borderTopColor: pillar.color }}>
              {/* Pillar header */}
              <div style={{ padding: "18px 22px", background: T.light, borderBottom: `1px solid ${T.border}` }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: pillar.color, fontWeight: 600, letterSpacing: 1.5 }}>{pillar.name}</div>
              </div>
              {/* Services */}
              {pillar.services.map((s, si) => {
                const key = `${pi}-${si}`;
                const isHov = hoveredService === key;
                return (
                  <div key={si}
                    onClick={s.navigable ? () => onNavigate("cloud-native") : undefined}
                    onMouseEnter={() => setHoveredService(key)}
                    onMouseLeave={() => setHoveredService(null)}
                    style={{
                      padding: "16px 22px", borderBottom: si < pillar.services.length - 1 ? `1px solid ${T.border}` : "none",
                      cursor: s.navigable ? "pointer" : "default",
                      background: isHov ? `${pillar.color}08` : "transparent",
                      transition: "background 0.15s",
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 2 }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: T.textMuted }}>{s.sub}</div>
                      </div>
                      <ChevronRight size={14} color={isHov ? pillar.color : T.textMuted} style={{ transition: "all 0.2s", transform: isHov ? "translateX(3px)" : "none" }} />
                    </div>
                    {s.navigable && isHov && (
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: pillar.color, marginTop: 6 }}>→ View Cloud-Native Engineering</div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── AI-ENHANCED DIFFERENTIATOR STRIP ── */
function AIEnhancedStrip() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "80px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <motion.div variants={fadeIn} style={{ marginBottom: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #2563EB, #10B981)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <Brain size={24} color="#fff" />
          </div>
        </motion.div>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>WHAT MAKES US DIFFERENT</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          Every Service. AI-Enhanced.
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDarkSec, marginTop: 16, lineHeight: 1.8 }}>
          AI isn't a separate line item — it's the lens through which we deliver every capability. Our cloud platforms include AI-powered observability. Our enterprise migrations use ML for risk assessment. Our design work incorporates predictive analytics. Intelligence is woven in, not bolted on.
        </motion.p>

        {/* Capability indicators */}
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 36 }}>
          {[
            { icon: Cloud, label: "Cloud: AI Observability", color: T.blue },
            { icon: Layers, label: "Modernization: ML Risk", color: T.amber },
            { icon: Palette, label: "Design: Predictive UX", color: T.green },
            { icon: Users, label: "Pods: AI Augmented", color: T.purple },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} variants={fadeUp}
                style={{ padding: "16px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: `1px solid ${T.borderDark}`, textAlign: "center" }}>
                <Icon size={18} color={item.color} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 11, color: T.onDarkSec, lineHeight: 1.4 }}>{item.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── HUB CLOSING CTA ── */
function HubCTA() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.blueHover})`, padding: "100px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>
          Not Sure Where to Start?
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 14, lineHeight: 1.8 }}>
          Tell us about your challenge. We'll map it to the right capability — or build something new.
        </motion.p>
        <motion.div variants={fadeUp} style={{ marginTop: 28 }}>
          <Btn pill color="#fff">
            <span style={{ color: T.blue }}>Let's Scope Your Project</span> <ArrowRight size={16} color={T.blue} />
          </Btn>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CLOUD-NATIVE ENGINEERING SUB-PAGE
   ═══════════════════════════════════════════════════════════════════ */

function CloudHero() {
  const [ref, vis] = useReveal(0.1);
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, minHeight: "85vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <motion.div variants={fadeIn} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 12, color: T.onDarkMuted }}>
          <span style={{ cursor: "pointer", color: T.onDarkSec }}>Expertise</span>
          <ChevronRight size={12} />
          <span style={{ color: T.blue }}>Cloud-Native Engineering</span>
        </motion.div>

        <motion.div variants={fadeIn} style={{ marginBottom: 20 }}>
          <Badge color={T.blue}>DIGITAL & CLOUD</Badge>
        </motion.div>

        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(34px, 4.5vw, 48px)", fontWeight: 700, color: T.onDark, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Cloud Platforms That Scale<br />Without Breaking — or<br />Breaking the Budget
        </motion.h1>

        <motion.p variants={fadeUp} style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: T.onDarkSec, marginTop: 20, lineHeight: 1.7, maxWidth: 600 }}>
          We architect cloud-native systems on AWS and Azure that deliver 99.95% uptime, auto-scale under load, and cost 40% less than the infrastructure they replace. Not lift-and-shift. Real cloud-native engineering.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn>Discuss Your Cloud Strategy <ArrowRight size={16} /></Btn>
        </motion.div>

        {/* Tech badges */}
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, marginTop: 28, flexWrap: "wrap" }}>
          {["AWS", "Azure", "Kubernetes", "Serverless", "Terraform", "GitOps"].map(t => (
            <span key={t} style={{ fontFamily: "monospace", fontSize: 11, padding: "4px 12px", borderRadius: 4, background: "rgba(37,99,235,0.1)", color: T.blue, border: "1px solid rgba(37,99,235,0.15)" }}>{t}</span>
          ))}
        </motion.div>
      </div>

      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", pointerEvents: "none" }}>
        <Placeholder label="Cloud architecture diagram — microservices topology with load balancers, auto-scaling groups, and monitoring layers" h="100%" dark radius={0} />
      </div>
    </motion.section>
  );
}

/* ── OUTCOMES SECTION ── */
function CloudOutcomes() {
  const [ref, vis] = useReveal();
  const [hovered, setHovered] = useState(null);

  const outcomes = [
    { title: "Ship faster with zero-downtime deployments", desc: "Microservices architectures with independent deployment cycles — your teams ship features daily, not quarterly. Blue-green and canary deployments as standard.", icon: Rocket, color: T.blue },
    { title: "Scale automatically under demand spikes", desc: "Kubernetes orchestration and serverless event-driven architectures that scale from 10 to 10,000 users without manual intervention or over-provisioning.", icon: Gauge, color: T.blue },
    { title: "Cut cloud costs by 40% without cutting capability", desc: "Right-sized infrastructure, reserved capacity optimization, spot instance strategies, and our GreenOps methodology for carbon-aware workload scheduling.", icon: BarChart3, color: T.green },
    { title: "Sleep through deployments with production-grade observability", desc: "Full-stack monitoring, distributed tracing, and AI-powered anomaly detection — so you know about issues before your customers do.", icon: Shield, color: T.blue },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>OUTCOMES, NOT FEATURES</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: T.text, lineHeight: 1.15 }}>
          What This Service Delivers
        </motion.h2>

        <motion.div variants={stagger} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 32 }}>
          {outcomes.map((o, i) => {
            const Icon = o.icon;
            const isHov = hovered === i;
            return (
              <motion.div key={i} variants={fadeUp}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex", gap: 20, padding: 24, borderRadius: 10,
                  borderLeft: `3px solid ${o.color}`,
                  background: isHov ? T.light : T.white,
                  border: `1px solid ${isHov ? o.color + "30" : T.border}`,
                  borderLeftWidth: 3, borderLeftColor: o.color,
                  transition: "all 0.2s",
                }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${o.color}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color={o.color} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 6 }}>{o.title}</div>
                  <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.7 }}>{o.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── HOW WE'RE DIFFERENT ── */
function CloudDifferentiator() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          Not Another "Cloud Migration" Shop
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDarkSec, lineHeight: 1.8, marginTop: 20 }}>
          Most firms do lift-and-shift and call it cloud-native. We actually re-architect — decomposing monoliths into microservices, building event-driven pipelines, and deploying with GitOps. The difference? Their clients get a bigger cloud bill. Ours get a smaller one with better performance.
        </motion.p>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDark, lineHeight: 1.8, marginTop: 16, fontWeight: 600 }}>
          Our edge: Every cloud platform we build includes GreenOps carbon monitoring from day one, AI-powered observability that learns your system's normal behavior, and a cost optimization review every sprint — not every quarter.
        </motion.p>

        {/* Three differentiator cards */}
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 36 }}>
          {[
            { title: "Real Re-Architecture", desc: "Monolith decomposition, event-driven pipelines, GitOps deployment — not just VMs in the cloud.", color: T.blue },
            { title: "GreenOps Built In", desc: "Carbon-aware workload scheduling and sustainability metrics on every dashboard from day one.", color: T.green },
            { title: "Cost Optimization per Sprint", desc: "Continuous right-sizing, reserved capacity planning, and spend alerts — reviewed every two weeks.", color: T.amber },
          ].map((d, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 22, border: `1px solid ${T.borderDark}`, borderTop: `2px solid ${d.color}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.onDark, marginBottom: 8 }}>{d.title}</div>
              <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7 }}>{d.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── TECH STACK ── */
function CloudTechStack() {
  const [ref, vis] = useReveal();
  const techs = ["AWS (ECS, Lambda, EKS)", "Azure (AKS, Functions)", "Kubernetes", "Terraform", "Docker", "Istio", "ArgoCD", "Datadog", "Grafana", "Prometheus", "Apache Kafka", "PostgreSQL", "Redis", "CloudFlare"];
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.light, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
          <Badge color={T.textMuted}>TECHNOLOGIES & TOOLS</Badge>
        </motion.div>
        <motion.div variants={stagger} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {techs.map((t, i) => (
            <motion.span key={i} variants={fadeUp}
              style={{ fontFamily: "monospace", fontSize: 12, padding: "8px 16px", borderRadius: 6, background: T.white, color: T.textSec, border: `1px solid ${T.border}`, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSec; }}>
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── CASE STUDY ── */
function CloudCaseStudy() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.blue}>RELATED CASE STUDY</Badge>
        </motion.div>

        <motion.div variants={fadeUp} style={{ borderRadius: 12, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.blue}`, padding: 32, marginTop: 20 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, marginBottom: 8, fontWeight: 600 }}>CLOUD-NATIVE × MANUFACTURING</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 12 }}>Cloud-Native Platform for [Manufacturing Client]</div>
          <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.8 }}>
            Migrated a monolithic on-prem application to a Kubernetes-based microservices architecture on AWS. 99.97% uptime, 43% reduction in cloud costs, and deployment frequency increased from monthly to daily.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginTop: 24 }}>
            {[
              { val: "99.97%", label: "Uptime", color: T.blue },
              { val: "43%", label: "Cost reduction", color: T.green },
              { val: "30×", label: "Deployment frequency", color: T.amber },
            ].map((m, i) => (
              <div key={i} style={{ background: T.light, borderRadius: 8, padding: 16, textAlign: "center", border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.val}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Btn small>Read Full Case Study <ArrowRight size={14} /></Btn>
            <Btn small ghost>See All Cloud Case Studies</Btn>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ── CLOUD CTA ── */
function CloudCTA() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(135deg, ${T.blue}, ${T.blueHover})`, padding: "100px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>
          Ready to Go Cloud-Native —<br />For Real?
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 14, lineHeight: 1.8 }}>
          No lift-and-shift. No surprise cloud bills. Just production-grade cloud platforms built right.
        </motion.p>
        <motion.div variants={fadeUp} style={{ marginTop: 28 }}>
          <Btn pill color="#fff">
            <span style={{ color: T.blue }}>Discuss Your Cloud Strategy</span> <ArrowRight size={16} color={T.blue} />
          </Btn>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
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
            <span key={loc} style={{ fontSize: 12, color: T.onDarkMuted, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} /> {loc}</span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "20px auto 0", borderTop: `1px solid ${T.borderDark}`, paddingTop: 16, fontSize: 11, color: T.onDarkMuted, textAlign: "center" }}>
        © 2026 mVerve Technologies. All rights reserved. &nbsp;|&nbsp; SOC 2 Type II &nbsp;|&nbsp; ISO 27001 &nbsp;|&nbsp; HIPAA Compliant
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
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
          <span style={{ fontSize: 12, color: T.onDarkMuted, marginLeft: 8 }}>Expertise</span>
        </div>
        {w >= 768 && (
          <div style={{ display: "flex", gap: 4 }}>
            {["Expertise Hub", "Cloud-Native"].map(p => (
              <button key={p} onClick={() => { onSwitch(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{ padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: page === p ? "rgba(37,99,235,0.15)" : "transparent", color: page === p ? T.blue : T.onDarkSec, transition: "all 0.2s" }}>
                {p}
              </button>
            ))}
          </div>
        )}
        <AnimatePresence>
          {scrolled && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Btn small pill>Let's Scope Your Project <ArrowRight size={14} /></Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP — PAGE ROUTER
   ═══════════════════════════════════════════════════════════════════ */
/* Page content exports for prototype assembly */
export function ExpertiseHubContent({ navigate }) {
  return (
    <>
      <HubHero onNavigate={() => navigate && navigate("cloud-native")} />
      <CapabilityOverview onNavigate={() => navigate && navigate("cloud-native")} />
      <AIEnhancedStrip />
      <HubCTA />
    </>
  );
}

export function CloudNativeContent({ navigate }) {
  return (
    <>
      <CloudHero />
      <CloudOutcomes />
      <CloudDifferentiator />
      <CloudTechStack />
      <CloudCaseStudy />
      <AIEnhancedCallout
        title="AI-Powered Observability"
        body="Our cloud platforms include ML-based anomaly detection that learns your system's normal behavior patterns and alerts on deviations before they become incidents. Predictive auto-scaling that anticipates load spikes 30 minutes ahead. Cost optimization AI that continuously right-sizes instances and identifies waste. GreenOps carbon tracking that routes workloads to low-carbon regions automatically."
      />
      <CloudCTA />
    </>
  );
}

export default function MVerveExpertise() {
  const [page, setPage] = useState("Expertise Hub");

  const navigateToCloud = () => {
    setPage("Cloud-Native");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <Nav page={page} onSwitch={setPage} />

      <AnimatePresence mode="wait">
        {page === "Expertise Hub" ? (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <HubHero onNavigate={navigateToCloud} />
            <CapabilityOverview onNavigate={setPage} />
            <AIEnhancedStrip />
            <HubCTA />
            <Footer />
          </motion.div>
        ) : (
          <motion.div key="cloud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <CloudHero />
            <CloudOutcomes />
            <CloudDifferentiator />
            <CloudTechStack />
            <CloudCaseStudy />
            <AIEnhancedCallout
              title="AI-Powered Observability"
              body="Our cloud platforms include ML-based anomaly detection that learns your system's normal behavior patterns and alerts on deviations before they become incidents. Predictive auto-scaling that anticipates load spikes 30 minutes ahead. Cost optimization AI that continuously right-sizes instances and identifies waste. GreenOps carbon tracking that routes workloads to low-carbon regions automatically."
            />
            <CloudCTA />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
