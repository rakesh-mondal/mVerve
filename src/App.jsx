import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Menu, X, Sparkles, Brain, Factory,
  Cloud, Layers, Radar, Send, Home, Zap, Code2, MapPin,
  ChevronRight, ExternalLink, Compass, PanelRightOpen, PanelRightClose
} from "lucide-react";

/* ─── Page Content Imports ─── */
import { HomepageContent } from "./pages/mverve-home-thoughtworks";
import { AILabHubContent, GenAIContent } from "./pages/mverve-ailab-wireframe";
import { ExpertiseHubContent, CloudNativeContent } from "./pages/mverve-expertise-wireframe";
import { ManufacturingContent } from "./pages/mverve-industry-wireframe";
import { TechRadarContent } from "./pages/mverve-techradar-wireframe";
import { ContactContent } from "./pages/mverve-contact-wireframe";

/* ═══════════════════════════════════════════
   SHARED TOKENS
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
const MOBILE_BREAKPOINT = 768;

function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

/* ═══════════════════════════════════════════
   ROUTE DEFINITIONS
   ═══════════════════════════════════════════ */
const ROUTES = [
  { id: "home", hash: "", label: "Homepage", shortLabel: "Home", icon: Home, color: T.blue, Component: HomepageContent },
  { id: "ai-lab", hash: "ai-lab", label: "AI & Innovation Lab", shortLabel: "AI Lab", icon: Brain, color: T.cyan, Component: AILabHubContent },
  { id: "genai", hash: "genai", label: "Generative AI Solutions", shortLabel: "GenAI", icon: Sparkles, color: T.cyan, Component: GenAIContent, indent: true },
  { id: "expertise", hash: "expertise", label: "Expertise Hub", shortLabel: "Expertise", icon: Layers, color: T.blue, Component: ExpertiseHubContent },
  { id: "cloud-native", hash: "cloud-native", label: "Cloud-Native Engineering", shortLabel: "Cloud-Native", icon: Cloud, color: T.blue, Component: CloudNativeContent, indent: true },
  { id: "manufacturing", hash: "manufacturing", label: "Manufacturing & Industry 4.0", shortLabel: "Manufacturing", icon: Factory, color: T.amber, Component: ManufacturingContent },
  { id: "tech-radar", hash: "tech-radar", label: "mVerve Tech Radar", shortLabel: "Tech Radar", icon: Radar, color: T.cyan, Component: TechRadarContent },
  { id: "contact", hash: "contact", label: "Let's Innovate (Contact)", shortLabel: "Contact", icon: Send, color: T.green, Component: ContactContent },
];

/* ═══════════════════════════════════════════
   HASH ROUTER HOOK
   ═══════════════════════════════════════════ */
function useHashRouter() {
  const getRoute = () => {
    const hash = window.location.hash.replace("#/", "").replace("#", "");
    return hash || "";
  };
  const [current, setCurrent] = useState(getRoute);

  useEffect(() => {
    const handler = () => setCurrent(getRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (hash) => {
    window.location.hash = hash ? `#/${hash}` : "#/";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { current, navigate };
}

/* ═══════════════════════════════════════════
   MEGA MENU DATA
   ═══════════════════════════════════════════ */
const megaData = {
  "AI & Innovation Lab": {
    feat: { title: "The mVerve Innovation Lab", sub: "Where AI meets industrial intelligence. Our R&D engine for custom LLMs, agentic workflows, and sustainable AI.", route: "ai-lab" },
    links: [
      { label: "Generative AI Solutions", route: "genai" },
      { label: "Intelligent Automation", route: "ai-lab" },
      { label: "Sustainable AI (GreenOps)", route: "ai-lab" },
      { label: "The MVP Incubator", route: "ai-lab" },
    ],
  },
  Expertise: {
    feat: { title: "Engineering Excellence", sub: "Eight disciplines. One standard: production-grade outcomes that move business metrics.", route: "expertise" },
    links: [
      { label: "Cloud-Native Engineering", route: "cloud-native" },
      { label: "Enterprise Modernization", route: "expertise" },
      { label: "Platform Engineering", route: "expertise" },
      { label: "Digital Experience", route: "expertise" },
    ],
  },
  Industries: {
    feat: { title: "Domain-First Engineering", sub: "We understand your world before writing a line of code.", route: "manufacturing" },
    links: [
      { label: "Manufacturing & Industry 4.0", route: "manufacturing" },
      { label: "CleanTech & Sustainability", route: "manufacturing" },
      { label: "Healthcare & Life Sciences", route: "manufacturing" },
    ],
  },
  Insights: {
    feat: { title: "Thought Leadership", sub: "Our opinionated take on the technologies shaping industrial AI.", route: "tech-radar" },
    links: [
      { label: "The Tech Radar", route: "tech-radar" },
      { label: "Success Stories", route: "tech-radar" },
      { label: "White Papers", route: "tech-radar" },
    ],
  },
};

/* ═══════════════════════════════════════════
   MEGA PANEL
   ═══════════════════════════════════════════ */
function MegaPanel({ item, navigate, onClose }) {
  const d = megaData[item];
  if (!d) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
      onMouseLeave={onClose}
      style={{ position: "absolute", top: "100%", left: 0, right: 0, background: T.dark, borderBottom: `1px solid ${T.borderDark}`, zIndex: 200 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }}>
        <div style={{ background: "rgba(37,99,235,0.05)", borderRadius: 8, padding: 20, border: "1px solid rgba(37,99,235,0.1)", cursor: "pointer" }}
          onClick={() => { navigate(d.feat.route); onClose(); }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{d.feat.title}</div>
          <div style={{ fontSize: 14, color: T.onDarkSec, lineHeight: 1.6, marginBottom: 12 }}>{d.feat.sub}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.blue, display: "flex", alignItems: "center", gap: 4 }}>
            Explore <ArrowRight size={12} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {d.links.map((l, i) => (
            <div key={i} onClick={() => { navigate(l.route); onClose(); }}
              style={{ padding: "10px 16px", borderRadius: 6, cursor: "pointer", fontSize: 14.5, color: T.onDarkSec, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${T.blue}10`; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.onDarkSec; }}>
              {l.label}
              <ChevronRight size={14} style={{ opacity: 0.4 }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SHARED NAV
   ═══════════════════════════════════════════ */
function SharedNav({ currentRoute, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const w = useWindowSize();
  const isMobile = w < MOBILE_BREAKPOINT;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = ["AI & Innovation Lab", "Expertise", "Industries", "Insights"];
  const routeObj = ROUTES.find(r => r.hash === currentRoute) || ROUTES[0];

  const closeAndNavigate = (hash) => {
    setMobileOpen(false);
    navigate(hash);
  };

  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          padding: "0 24px", height: 56, display: "flex", alignItems: "center",
          background: scrolled || isMobile ? "rgba(10,10,15,0.95)" : "rgba(10,10,15,0.7)",
          backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled || isMobile ? T.borderDark : "transparent"}`,
          transition: "all 0.3s",
        }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => { if (isMobile) setMobileOpen(false); navigate(""); }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={14} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>mVerve</span>
          </div>

          {/* Desktop nav items — hidden on mobile */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {navItems.map(item => (
                <div
                  key={item}
                  onMouseEnter={() => setHoveredNav(item)}
                  onClick={() => {
                    const route = megaData[item]?.feat?.route;
                    if (route) navigate(route);
                  }}
                  style={{ position: "relative" }}
                >
                  <div style={{
                    padding: "10px 16px", borderRadius: 6, cursor: "pointer", fontSize: 15, fontWeight: 500,
                    color: hoveredNav === item ? "#fff" : T.onDarkSec,
                    background: hoveredNav === item ? `${T.blue}10` : "transparent",
                    transition: "all 0.15s", display: "flex", alignItems: "center", gap: 4,
                  }}>
                    {item} <ChevronDown size={14} style={{ opacity: 0.5 }} />
                  </div>
                </div>
              ))}
              <div style={{ width: 1, height: 20, background: T.borderDark, margin: "0 8px" }} />
              <button onClick={() => navigate("contact")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 6,
                  background: T.blue, color: "#fff", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer",
                }}>
                Let's Innovate <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              style={{
                width: 44, height: 44, minWidth: 44, minHeight: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none", cursor: "pointer", borderRadius: 8,
                color: "#fff",
              }}
            >
              <Menu size={24} />
            </button>
          )}

          {/* Mega menu — desktop only */}
          {!isMobile && (
            <AnimatePresence>
              {hoveredNav && megaData[hoveredNav] && (
                <MegaPanel item={hoveredNav} navigate={navigate} onClose={() => setHoveredNav(null)} />
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Current page indicator — desktop only */}
        {!isMobile && (
          <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2 }}>
            <motion.div layoutId="nav-indicator"
              style={{ height: 2, background: routeObj.color, width: 48, margin: "0 auto", borderRadius: 1 }} />
          </div>
        )}
      </motion.nav>

      {/* Full-screen overlay navigation — mobile */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", inset: 0, zIndex: 950, background: T.dark,
              display: "flex", flexDirection: "column", overflow: "auto",
            }}
          >
            <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>mVerve</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                style={{
                  width: 44, height: 44, minWidth: 44, minHeight: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", borderRadius: 8, color: "#fff",
                }}
              >
                <X size={22} />
              </button>
            </div>
            <nav style={{ flex: 1, padding: "24px 20px 32px", display: "flex", flexDirection: "column", gap: 4 }}>
              {ROUTES.map((r) => {
                const Icon = r.icon;
                const isActive = currentRoute === r.hash;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => closeAndNavigate(r.hash)}
                    style={{
                      minHeight: 52, padding: "14px 18px", textAlign: "left",
                      display: "flex", alignItems: "center", gap: 14,
                      background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                      border: "none", borderRadius: 12, cursor: "pointer",
                      color: isActive ? "#fff" : T.onDarkSec, fontSize: 16, fontWeight: isActive ? 600 : 500,
                      transition: "background 0.15s, color 0.15s",
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: isActive ? `${r.color}20` : "rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon size={20} color={isActive ? r.color : T.onDarkMuted} />
                    </div>
                    {r.label}
                  </button>
                );
              })}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.borderDark}` }}>
                <button
                  type="button"
                  onClick={() => closeAndNavigate("contact")}
                  style={{
                    width: "100%", minHeight: 52, padding: "14px 18px",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: T.blue, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer",
                    fontSize: 16, fontWeight: 600,
                  }}
                >
                  Let's Innovate <ArrowRight size={18} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   SHARED FOOTER
   ═══════════════════════════════════════════ */
function SharedFooter({ navigate }) {
  const footerLinks = [
    { group: "Expertise", links: [{ label: "Cloud-Native", route: "cloud-native" }, { label: "All Expertise", route: "expertise" }] },
    { group: "Industries", links: [{ label: "Manufacturing", route: "manufacturing" }] },
    { group: "Insights", links: [{ label: "Tech Radar", route: "tech-radar" }] },
    { group: "Company", links: [{ label: "Contact", route: "contact" }] },
  ];

  return (
    <footer style={{ background: T.dark, borderTop: `1px solid ${T.borderDark}`, padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(4, 1fr)", gap: 32, marginBottom: 32 }}>
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }} onClick={() => navigate("")}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>mVerve</span>
            </div>
            <div style={{ fontSize: 14, color: T.onDarkMuted, lineHeight: 1.7, maxWidth: 260 }}>
              AI-Native Engineering for the Industrial Future. Where Manufacturing Meets Intelligence.
            </div>
          </div>
          {/* Link columns */}
          {footerLinks.map((group, i) => (
            <div key={i}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted, letterSpacing: 1.5, marginBottom: 12, fontWeight: 600 }}>
                {group.group.toUpperCase()}
              </div>
              {group.links.map((l, j) => (
                <div key={j} onClick={() => navigate(l.route)}
                  style={{ fontSize: 14, color: T.onDarkSec, marginBottom: 8, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = T.onDarkSec}>
                  {l.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${T.borderDark}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkMuted }}>
            © 2026 mVerve Digital Engineering · All rights reserved
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted, display: "flex", gap: 16 }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Careers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FLOATING PROTOTYPE NAVIGATOR
   ═══════════════════════════════════════════ */
function PrototypeNavigator({ currentRoute, navigate }) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => setMinimized(false)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 1000,
          width: 52, height: 52, borderRadius: 14,
          background: `linear-gradient(135deg, ${T.blue}, ${T.green})`,
          border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
        }}>
        <Compass size={24} color="#fff" />
      </motion.button>
    );
  }

  return (
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 1000,
        width: open ? 340 : 240, background: T.dark, borderRadius: 16,
        border: `1px solid ${T.borderDark}`,
        boxShadow: "0 16px 48px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.25)",
        overflow: "hidden", transition: "width 0.3s",
      }}>
      {/* Header — PROTOTYPE NAV label */}
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.borderDark}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Compass size={16} color={T.blue} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, fontWeight: 600, letterSpacing: 1.2 }}>PROTOTYPE NAV</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => setOpen(!open)}
            style={{ background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {open ? <PanelRightClose size={14} color={T.onDarkMuted} /> : <PanelRightOpen size={14} color={T.onDarkMuted} />}
          </button>
          <button onClick={() => setMinimized(true)}
            style={{ background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color={T.onDarkMuted} />
          </button>
        </div>
      </div>
      {/* Page list */}
      <div style={{ padding: 8, maxHeight: 400, overflowY: "auto" }}>
        {ROUTES.map((route) => {
          const Icon = route.icon;
          const isActive = currentRoute === route.hash;
          return (
            <div key={route.id} onClick={() => navigate(route.hash)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                marginLeft: route.indent ? 16 : 0,
                background: isActive ? `${route.color}15` : "transparent",
                border: isActive ? `1px solid ${route.color}30` : "1px solid transparent",
                transition: "all 0.15s", marginBottom: 2,
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; } }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: isActive ? `${route.color}20` : "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={14} color={isActive ? route.color : T.onDarkMuted} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? "#fff" : T.onDarkSec, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {open ? route.label : route.shortLabel}
                </div>
                {open && route.indent && (
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: T.onDarkMuted, marginTop: 1 }}>Sub-page example</div>
                )}
              </div>
              {isActive && (
                <div style={{ width: 6, height: 6, borderRadius: 3, background: route.color, flexShrink: 0 }} />
              )}
            </div>
          );
        })}
      </div>
      {/* Footer info */}
      <div style={{ padding: "8px 16px 12px", borderTop: `1px solid ${T.borderDark}` }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: T.onDarkMuted, textAlign: "center" }}>
          {ROUTES.length} pages · mVerve Prototype · v1.0
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   STICKY CTA — MOBILE ONLY
   ═══════════════════════════════════════════ */
function StickyCTA({ visible, currentRoute, navigate }) {
  if (!visible) return null;
  const isContact = currentRoute === "contact";
  return (
    <div
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 800,
        padding: "12px 16px", paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        background: T.dark, borderTop: `1px solid ${T.borderDark}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (isContact) {
            const el = document.getElementById("contact-form");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            navigate("contact");
          }
        }}
        style={{
          width: "100%", minHeight: 48, padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          background: T.blue, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer",
          fontSize: 16, fontWeight: 600,
        }}
      >
        {isContact ? "Send your challenge" : "Let's Innovate"}
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP SHELL
   ═══════════════════════════════════════════ */
export default function MVervePrototype() {
  const { current, navigate } = useHashRouter();
  const route = ROUTES.find(r => r.hash === current) || ROUTES[0];
  const PageComponent = route.Component;
  const w = useWindowSize();
  const isMobile = w < MOBILE_BREAKPOINT;
  const mainPaddingBottom = isMobile ? 88 : 0;

  // Home route uses its own self-contained shell (Thoughtworks-style cream design).
  if (route.id === "home") {
    return <PageComponent navigate={navigate} />;
  }

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
      background: T.dark, minHeight: "100vh",
    }}>
      <SharedNav currentRoute={current} navigate={navigate} />

      {/* Page content with transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={route.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease }}
          style={{ paddingTop: 56, paddingBottom: mainPaddingBottom }}
        >
          <PageComponent navigate={navigate} />
          <SharedFooter navigate={navigate} />
        </motion.main>
      </AnimatePresence>

      <StickyCTA visible={isMobile} currentRoute={current} navigate={navigate} />
      <PrototypeNavigator currentRoute={current} navigate={navigate} />
    </div>
  );
}
