import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Mail, Phone, Linkedin, Calendar, MapPin, Clock,
  CheckCircle2, Shield, Zap, Users, ChevronDown, Send, X,
  Building2, Globe, Factory, Leaf, Heart, ShoppingBag, Landmark,
  ExternalLink, Copy, Check, Sparkles, ArrowUpRight, Menu
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

function Btn({ children, primary = true, color = T.blue, pill = false, small = false, ghost = false, wide = false, onClick }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: wide ? "flex" : "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    border: "none", cursor: "pointer", fontWeight: 600, transition: "all 0.2s", textDecoration: "none",
    borderRadius: pill ? 999 : 8, fontSize: small ? 13 : 15, width: wide ? "100%" : "auto",
    padding: small ? "8px 18px" : pill ? "14px 32px" : "13px 26px",
    ...(wide && { minHeight: 48 }),
  };
  if (ghost) return (
    <button {...{ onClick }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: "transparent", border: `1px solid ${T.border}`, color: hov ? T.text : T.textSec }}>
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

/* ═══════════════════════════════════════════
   FORM DATA
   ═══════════════════════════════════════════ */
const INDUSTRIES = [
  { value: "manufacturing", label: "Manufacturing & Industry 4.0", color: T.amber, icon: Factory },
  { value: "cleantech", label: "CleanTech & Sustainability", color: T.green, icon: Leaf },
  { value: "healthcare", label: "Healthcare & Life Sciences", color: T.rose, icon: Heart },
  { value: "retail", label: "Retail & Consumer", color: T.purple, icon: ShoppingBag },
  { value: "fintech", label: "FinTech & Insurance", color: T.cyan, icon: Landmark },
  { value: "other", label: "Other", color: T.textMuted, icon: Building2 },
];

const CHALLENGES = [
  { value: "ai", label: "AI & Automation" },
  { value: "cloud", label: "Cloud & Modernization" },
  { value: "design", label: "Product Design & UX" },
  { value: "data", label: "Data & Analytics" },
  { value: "talent", label: "Strategic Talent / Pods" },
  { value: "other", label: "Other" },
];

const BUDGETS = [
  { value: "under50", label: "Under $50K" },
  { value: "50-150", label: "$50K – $150K" },
  { value: "150-500", label: "$150K – $500K" },
  { value: "500plus", label: "$500K+" },
  { value: "unsure", label: "Not sure yet — let's discuss" },
];

/* ═══════════════════════════════════════════
   FORM COMPONENTS
   ═══════════════════════════════════════════ */
function FormInput({ label, required, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
        {label} {required && <span style={{ color: T.blue }}>*</span>}
      </label>
      <input type={type} value={value} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onChange={e => setValue(e.target.value)}
        style={{
          width: "100%", minHeight: 48, padding: "14px 16px", borderRadius: 8,
          background: T.darkSurface, border: `1px solid ${focused ? T.blue : "rgba(255,255,255,0.08)"}`,
          color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16,
          outline: "none", transition: "border-color 0.2s",
          boxShadow: focused ? `0 0 0 3px ${T.blueGlow}` : "none",
        }}
      />
    </div>
  );
}

function FormSelect({ label, required, placeholder, options, optional }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ marginBottom: 16, position: "relative" }}>
      <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
        {label} {required && <span style={{ color: T.blue }}>*</span>}
        {optional && <span style={{ color: T.onDarkMuted, fontWeight: 400, fontSize: 11, marginLeft: 6 }}>(Optional)</span>}
      </label>
      <div onClick={() => setOpen(!open)}
        style={{
          width: "100%", minHeight: 48, padding: "14px 16px", borderRadius: 8,
          background: T.darkSurface, border: `1px solid ${open ? T.blue : "rgba(255,255,255,0.08)"}`,
          color: selected ? "#fff" : T.onDarkMuted, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "border-color 0.2s", boxShadow: open ? `0 0 0 3px ${T.blueGlow}` : "none",
        }}>
        <span>{selected || placeholder}</span>
        <ChevronDown size={16} color={T.onDarkMuted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50, marginTop: 4, background: T.dark, border: `1px solid ${T.borderDark}`, borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            {options.map(opt => (
              <div key={opt.value} onClick={() => { setSelected(opt.label); setOpen(false); }}
                style={{ padding: "10px 14px", cursor: "pointer", fontSize: 13, color: T.onDarkSec, transition: "all 0.15s", borderBottom: `1px solid ${T.borderDark}` }}
                onMouseEnter={e => { e.currentTarget.style.background = `${T.blue}15`; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.onDarkSec; }}>
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormTextarea({ label, required, placeholder, hint }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
        {label} {required && <span style={{ color: T.blue }}>*</span>}
      </label>
      <textarea value={value} placeholder={placeholder} rows={5}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onChange={e => setValue(e.target.value)}
        style={{
          width: "100%", padding: "14px 16px", borderRadius: 8, resize: "vertical",
          background: T.darkSurface, border: `1px solid ${focused ? T.blue : "rgba(255,255,255,0.08)"}`,
          color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16,
          outline: "none", transition: "border-color 0.2s", minHeight: 140,
          boxShadow: focused ? `0 0 0 3px ${T.blueGlow}` : "none",
        }}
      />
      {hint && <div style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkMuted, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */
function ContactHero() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(170deg, ${T.dark} 0%, ${T.darkAlt} 100%)`, padding: "120px 24px 80px", position: "relative", overflow: "hidden", textAlign: "center" }}>
      {/* Grid dots */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(37,99,235,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      {/* Gradient mesh */}
      <div style={{ position: "absolute", top: "20%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: `1px solid ${T.blue}30`, background: `${T.blue}08`, marginBottom: 20 }}>
          <Send size={14} color={T.blue} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, letterSpacing: 1.5, fontWeight: 600 }}>LET'S INNOVATE</span>
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>
          Let's Engineer Something<br />Extraordinary
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: 17, color: T.onDarkSec, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
          Every transformation starts with a conversation. Tell us what you're trying to solve — and we'll show you what AI-native engineering can make possible.
        </motion.p>
        {/* Scroll indicator */}
        <motion.div variants={fadeIn} style={{ marginTop: 40 }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: 28, height: 44, borderRadius: 14, border: `1px solid rgba(255,255,255,0.15)`, margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 3, height: 10, borderRadius: 2, background: T.blue }} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — QUALIFIER STRIP
   ═══════════════════════════════════════════ */
function QualifierStrip() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "48px 24px", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, lineHeight: 1.8, marginBottom: 24 }}>
          We partner with <strong style={{ color: T.text }}>manufacturing, cleantech, and healthcare leaders</strong> who are ready to move beyond off-the-shelf solutions. Whether you're modernizing a legacy ERP, deploying your first AI system, or scaling an innovation initiative — our engineers build what others can't.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {INDUSTRIES.slice(0, 5).map(ind => {
            const Icon = ind.icon;
            return (
              <div key={ind.value} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: ind.color }} />
                <span style={{ fontFamily: "monospace", fontSize: 11, color: T.textSec }}>{ind.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — SMART FORM + TRUST SIDEBAR
   ═══════════════════════════════════════════ */
function SmartForm() {
  const [ref, vis] = useReveal(0.05);
  const w = useWindowSize();
  const isMobile = w < 900;
  const [submitted, setSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const trustCards = [
    { icon: Zap, color: T.blue, title: "24-Hour Response", desc: "Every inquiry is reviewed by a senior engineer — not a sales bot. You'll hear from someone who understands your tech stack within one business day." },
    { icon: Users, color: T.green, title: "Zero Commitment", desc: "Your discovery call is free — no hidden agenda. If we're not the right fit, we'll tell you (and recommend who is)." },
    { icon: CheckCircle2, color: T.amber, title: "40+ Engagements", desc: "Manufacturing, cleantech, healthcare, retail, and fintech. 92% client retention. 3.2× average ROI delivered." },
  ];

  return (
    <motion.section id="contact-form" ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
              style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: 32 }}>
              {/* LEFT: Form */}
              <motion.div variants={fadeUp}
                style={{ background: T.darkAlt, borderRadius: 16, padding: isMobile ? 24 : 36, border: `1px solid ${T.borderDark}` }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  Tell Us About Your Challenge
                </div>
                <div style={{ fontSize: 13, color: T.onDarkMuted, marginBottom: 28 }}>
                  We respond to every inquiry within one business day. No sales pitch — just an honest assessment of how we can help.
                </div>

                {/* Progressive disclosure: Step 1 always visible */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                  <FormInput label="Full Name" required placeholder="e.g., Sarah Chen" />
                  <FormInput label="Work Email" required placeholder="you@company.com" type="email" />
                </div>
                <FormInput label="Company" required placeholder="Your company name" />

                {/* Step 2: Reveals after first fields */}
                <motion.div initial={formStep < 2 ? { opacity: 0.4 } : { opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                    <FormSelect label="Industry" required placeholder="Select your industry" options={INDUSTRIES} />
                    <FormSelect label="Challenge Type" required placeholder="What do you need help with?" options={CHALLENGES} />
                  </div>
                  <FormSelect label="Budget Range" optional placeholder="Select approximate range" options={BUDGETS} />
                  <FormTextarea
                    label="Tell Us About Your Project" required
                    placeholder="What challenge are you trying to solve? What does success look like? Any timeline constraints?"
                    hint="No need for a formal RFP — a few sentences about your situation is a great start."
                  />
                </motion.div>

                {/* Submit */}
                <div style={{ marginTop: 24 }}>
                  <Btn wide color={T.blue} onClick={() => setSubmitted(true)}>
                    <Send size={16} /> Send Your Challenge
                  </Btn>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted, textAlign: "center", marginTop: 12 }}>
                    By submitting, you agree to our <span style={{ color: T.blue, cursor: "pointer" }}>Privacy Policy</span>. We never share your information with third parties.
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Trust builders */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {trustCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div key={i} variants={fadeUp}
                      style={{ background: T.darkAlt, borderRadius: 12, padding: 20, border: `1px solid ${T.borderDark}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${card.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={18} color={card.color} />
                        </div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>{card.title}</div>
                      </div>
                      <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7 }}>{card.desc}</div>
                    </motion.div>
                  );
                })}
                {/* Client logos */}
                <motion.div variants={fadeUp}
                  style={{ background: T.darkAlt, borderRadius: 12, padding: 20, border: `1px solid ${T.borderDark}` }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted, letterSpacing: 1.5, marginBottom: 12, fontWeight: 600 }}>TRUSTED BY</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <Placeholder key={n} label="[Client Logo]" h={40} dark radius={4} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* SUCCESS STATE */
            <motion.div key="success-state" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
              {/* Animated checkmark */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, delay: 0.2 }}
                style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.green}, #059669)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <Check size={32} color="#fff" strokeWidth={3} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                Challenge Received
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ fontSize: 15, color: T.onDarkSec, lineHeight: 1.7, marginBottom: 8 }}>
                Thank you, <span style={{ color: "#fff" }}>[First Name]</span>. A senior engineer from our <span style={{ color: T.blue }}>[selected challenge type]</span> practice will review your submission and respond within 24 hours.
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                style={{ fontSize: 13, color: T.onDarkMuted, marginBottom: 32 }}>
                You'll receive a confirmation email at <span style={{ color: T.blue }}>[submitted email]</span> shortly.
              </motion.div>
              {/* Skip-ahead card */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                style={{ background: T.darkAlt, borderRadius: 12, padding: 28, border: `1px solid ${T.borderDark}`, marginBottom: 24 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Want to Skip Ahead?</div>
                <div style={{ fontSize: 13, color: T.onDarkSec, marginBottom: 16 }}>Book a 30-minute discovery call directly on our calendar — no waiting for us to get back to you.</div>
                <Btn wide color={T.green} onClick={() => {}}>
                  <Calendar size={16} /> Book a Discovery Call
                </Btn>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted, marginTop: 10 }}>Powered by Calendly · Pick any available slot</div>
              </motion.div>
              {/* While you wait links */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: T.onDarkMuted }}>While you wait:</span>
                <span style={{ fontSize: 13, color: T.blue, cursor: "pointer" }}>Explore our Tech Radar →</span>
                <span style={{ fontSize: 13, color: T.blue, cursor: "pointer" }}>Read Success Stories →</span>
              </motion.div>
              {/* Reset for demo */}
              <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px dashed ${T.borderDark}` }}>
                <button onClick={() => setSubmitted(false)} style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkMuted, background: "transparent", border: `1px dashed ${T.borderDark}`, padding: "6px 14px", borderRadius: 6, cursor: "pointer" }}>
                  ↻ Reset form (wireframe demo only)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — WHAT HAPPENS NEXT
   ═══════════════════════════════════════════ */
function WhatHappensNext() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w > 900 ? 3 : 1;
  const steps = [
    { num: 1, title: "We Review", timeline: "Within 24 hours", color: T.blue, gradEnd: "#1D4ED8",
      desc: "A senior engineer (not a salesperson) reads your submission and assesses how our expertise aligns with your challenge. If we're not the right fit, we'll tell you honestly — and suggest who might be." },
    { num: 2, title: "We Schedule a Call", timeline: "Within 48 hours", color: T.green, gradEnd: "#059669",
      desc: "We'll invite you to a 30-minute discovery call with a practice lead who specializes in your industry and challenge type. Come with questions — we'll come with relevant case studies and initial ideas." },
    { num: 3, title: "We Propose", timeline: "Within 1 week", color: T.amber, gradEnd: "#D97706",
      desc: "If there's a fit, we deliver a tailored proposal with clear scope, timeline, team composition, and investment. No surprises, no scope creep — just an honest assessment of what it takes." },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: T.text, marginBottom: 8 }}>
            What Happens After You Hit Send
          </h2>
          <p style={{ fontSize: 15, color: T.textSec, maxWidth: 480, margin: "0 auto" }}>
            No black hole. No generic autoresponder. Here's exactly what to expect.
          </p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 32, position: "relative" }}>
          {/* Connector line (desktop) */}
          {cols === 3 && (
            <div style={{ position: "absolute", top: 28, left: "18%", right: "18%", height: 2, background: T.border, zIndex: 0 }} />
          )}
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: `linear-gradient(135deg, ${s.color}, ${s.gradEnd})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", boxShadow: `0 4px 16px ${s.color}30`,
              }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{s.num}</span>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: T.text, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: s.color, fontWeight: 600, marginBottom: 10 }}>{s.timeline}</div>
              <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — ALTERNATIVE CONTACT METHODS
   ═══════════════════════════════════════════ */
function AlternativeContacts() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w > 900 ? 4 : w > 600 ? 2 : 1;
  const [copiedIdx, setCopiedIdx] = useState(null);

  const contacts = [
    { icon: Mail, color: T.blue, title: "Email Us", value: "hello@mverve.com", sub: "For formal inquiries and RFPs", copyable: true },
    { icon: Phone, color: T.green, title: "Call Us", value: "[PLACEHOLDER: US Phone]", sub: "Mon–Fri, 9AM–6PM EST", copyable: true },
    { icon: Linkedin, color: T.blue, title: "LinkedIn", value: "/company/mverve", sub: "Follow for insights and updates", copyable: false },
    { icon: Calendar, color: T.amber, title: "Book Directly", value: "Calendly Link", sub: "Skip the form — pick a time", copyable: false },
  ];

  const handleCopy = (idx, val) => {
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.darkAlt, padding: "64px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            Prefer a Different Channel?
          </h2>
          <p style={{ fontSize: 14, color: T.onDarkSec }}>Reach us however works best for you.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const isCopied = copiedIdx === i;
            return (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: `0 4px 24px ${c.color}15` }}
                onClick={() => c.copyable && handleCopy(i, c.value)}
                style={{
                  background: T.dark, borderRadius: 12, padding: 24, textAlign: "center",
                  border: `1px solid ${T.borderDark}`, cursor: c.copyable ? "pointer" : "default",
                  transition: "all 0.2s",
                }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${c.color}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Icon size={22} color={c.color} />
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: c.color, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {c.value}
                  {c.copyable && (
                    isCopied ? <Check size={12} color={T.green} /> : <Copy size={12} color={T.onDarkMuted} />
                  )}
                </div>
                <div style={{ fontSize: 12, color: T.onDarkMuted }}>{c.sub}</div>
                {isCopied && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: "monospace", fontSize: 10, color: T.green, marginTop: 6 }}>
                    Copied!
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6 — OFFICE LOCATIONS
   ═══════════════════════════════════════════ */
function OfficeLocations() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w > 800 ? 2 : 1;

  const offices = [
    {
      badge: "ENGINEERING HQ", badgeColor: T.green, city: "Bengaluru, India",
      desc: "Our primary engineering center. Home to our AI Innovation Lab, core platform engineering teams, and the majority of our delivery pods.",
      address: "[PLACEHOLDER: Full Street Address]",
      timezone: "IST (UTC+5:30)",
      overlap: "Client overlap: 6AM–12PM EST",
      mapLabel: "Bengaluru, Karnataka — Engineering HQ",
      lat: 12.97, lng: 77.59,
    },
    {
      badge: "US HEADQUARTERS", badgeColor: T.blue, city: "Maryland, USA",
      desc: "Our US presence for client engagement, partnerships, and strategic consulting. Located in the DC-Baltimore corridor — close to federal, healthcare, and manufacturing hubs.",
      address: "[PLACEHOLDER: Full Street Address]",
      timezone: "EST (UTC-5)",
      overlap: "Full US business hours",
      mapLabel: "Maryland, USA — US Headquarters",
      lat: 39.05, lng: -76.87,
    },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 4 }}>
            Where We Work
          </h2>
          <p style={{ fontSize: 14, color: T.textSec }}>Two continents. One engineering culture. Client-facing hours across US and India time zones.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24 }}>
          {offices.map((o, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ background: T.white, borderRadius: 12, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              {/* Minimal map representation */}
              <div style={{ height: 160, background: T.lightBg, position: "relative", overflow: "hidden" }}>
                {/* Abstract map grid */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                {/* Location pin */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                    style={{ width: 32, height: 32, borderRadius: "50%", background: `${o.badgeColor}20`, border: `2px solid ${o.badgeColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={16} color={o.badgeColor} />
                  </motion.div>
                  <div style={{ width: 2, height: 12, background: `${o.badgeColor}40`, marginTop: -2 }} />
                  <div style={{ width: 8, height: 4, borderRadius: "50%", background: `${o.badgeColor}20`, marginTop: -1 }} />
                </div>
                {/* Coordinate label */}
                <div style={{ position: "absolute", bottom: 8, right: 12, fontFamily: "monospace", fontSize: 9, color: T.textMuted, background: "rgba(255,255,255,0.8)", padding: "2px 6px", borderRadius: 3 }}>
                  {o.lat.toFixed(2)}°N, {Math.abs(o.lng).toFixed(2)}°{o.lng > 0 ? "E" : "W"}
                </div>
              </div>
              {/* Office info */}
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: o.badgeColor }} />
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: o.badgeColor, fontWeight: 600, letterSpacing: 1 }}>{o.badge}</span>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 6 }}>{o.city}</div>
                <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7, marginBottom: 12 }}>{o.desc}</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: T.textMuted, marginBottom: 4 }}>{o.address}</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: T.textMuted }}>
                  {o.timezone} · {o.overlap}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Global delivery banner */}
        <motion.div variants={fadeUp} style={{ marginTop: 24, background: T.lightBg, borderRadius: 10, padding: 20, textAlign: "center", border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
            <Globe size={16} color={T.blue} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>Global Delivery, Local Partnership.</span>
          </div>
          <div style={{ fontSize: 13, color: T.textSec, maxWidth: 600, margin: "0 auto" }}>
            Our distributed model means your project runs 14+ hours per day across time zones — with a US-based engagement lead who speaks your language and understands your regulatory context.
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7 — TRUST FOOTER (Certifications)
   ═══════════════════════════════════════════ */
function TrustFooter() {
  const [ref, vis] = useReveal();
  const certs = [
    { label: "SOC 2 Type II", abbr: "SOC2" },
    { label: "ISO 27001", abbr: "ISO" },
    { label: "HIPAA Compliant", abbr: "HIPAA" },
    { label: "AWS Partner", abbr: "AWS" },
    { label: "GDPR Ready", abbr: "GDPR" },
  ];
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.lightBg, padding: "48px 24px", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <motion.div variants={fadeUp} style={{ fontFamily: "monospace", fontSize: 10, color: T.textMuted, letterSpacing: 1.5, marginBottom: 16, fontWeight: 600 }}>
          SECURITY & COMPLIANCE
        </motion.div>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {certs.map((c, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: T.white, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                <Shield size={18} color={T.textMuted} />
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: T.textMuted }}>{c.label}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeIn} style={{ fontSize: 12, color: T.textMuted, maxWidth: 480, margin: "0 auto" }}>
          Your data is encrypted in transit and at rest. We follow industry-standard security practices and maintain compliance certifications across healthcare, financial, and enterprise domains.
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        padding: "0 24px", height: 56, display: "flex", alignItems: "center",
        background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.borderDark}` : "none",
        transition: "all 0.3s",
      }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>mVerve</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["Expertise", "Industries", "AI Lab", "Insights"].map(l => (
            <span key={l} style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkSec, cursor: "pointer", display: "none" }}>{l}</span>
          ))}
          <Btn small color={T.blue} onClick={() => {}}>Let's Innovate <ArrowRight size={14} /></Btn>
        </div>
      </div>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: T.dark, padding: "32px 24px", borderTop: `1px solid ${T.borderDark}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkMuted }}>
          © 2026 mVerve Digital Engineering · AI-Native Engineering for the Industrial Future
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms", "Careers", "Insights"].map(l => (
            <span key={l} style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkSec, cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   ROOT — PAGE ASSEMBLY
   ═══════════════════════════════════════════ */
/* Page content export for prototype assembly */
export function ContactContent({ navigate }) {
  return (
    <>
      <ContactHero />
      <QualifierStrip />
      <SmartForm />
      <WhatHappensNext />
      <AlternativeContacts />
      <OfficeLocations />
      <TrustFooter />
    </>
  );
}

export default function MVerveContact() {
  return (
    <div style={{ background: T.dark, minHeight: "100vh" }}>
      <Nav />
      <ContactHero />
      <QualifierStrip />
      <SmartForm />
      <WhatHappensNext />
      <AlternativeContacts />
      <OfficeLocations />
      <TrustFooter />
      <Footer />
      {/* Page annotation */}
      <div style={{ padding: "16px 24px", background: T.dark, borderTop: `1px dashed ${T.borderDark}`, textAlign: "center" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted }}>
          WIREFRAME: mVerve Contact / Let's Innovate · /contact · Smart Form + Trust Builders + Process Strip + Office Locations + Alternative Contacts + Success State · L0 Primary Conversion Page
        </span>
      </div>
    </div>
  );
}
