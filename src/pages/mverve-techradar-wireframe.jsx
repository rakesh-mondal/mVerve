import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Radar, X, ArrowRight, ChevronRight, Search, ExternalLink,
  Zap, Filter, Download, Calendar, Hash, Crosshair, Eye,
  ArrowUpRight, ChevronDown, Code2, Server, Wrench, Brain,
  Clock, CheckCircle2, AlertTriangle, XCircle, Sparkles, Menu
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
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color, lineHeight: 1 }}>
        {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkMuted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   RADAR DATA — ALL 25 TECHNOLOGIES
   ═══════════════════════════════════════════ */
const RINGS = [
  { id: "adopt", name: "Adopt", color: T.green, desc: "We use this daily in production. Proven, reliable, recommended.", icon: CheckCircle2 },
  { id: "trial", name: "Trial", color: T.blue, desc: "Actively testing in real projects. High confidence, emerging.", icon: Eye },
  { id: "assess", name: "Assess", color: T.amber, desc: "Watching closely. Promising but not yet production-proven.", icon: AlertTriangle },
  { id: "hold", name: "Hold", color: T.rose, desc: "Proceed with caution. We actively move clients away.", icon: XCircle },
];

const QUADRANTS = [
  { id: "lang", name: "Languages & Frameworks", color: T.blue, icon: Code2, angle: 0 },
  { id: "platform", name: "Platforms & Infrastructure", color: T.green, icon: Server, angle: 90 },
  { id: "tools", name: "Tools & Practices", color: T.purple, icon: Wrench, angle: 180 },
  { id: "ai", name: "AI & Data", color: T.cyan, icon: Brain, angle: 270 },
];

const TECHNOLOGIES = [
  /* ADOPT — 10 entries */
  { id: 1, name: "React", ring: "adopt", quadrant: "lang", isNew: false,
    desc: "The foundation of every frontend we build. React's component model, ecosystem maturity, and hiring pool make it the default choice for enterprise interfaces.",
    take: "Our entire frontend practice runs on React + TypeScript. With Server Components maturing and the ecosystem unmatched, there's no reason to look elsewhere for enterprise UI work. We pair it with Next.js for most new builds.",
    related: "/expertise/experience-engineering" },
  { id: 2, name: "Python", ring: "adopt", quadrant: "lang", isNew: false,
    desc: "The lingua franca of AI and data engineering. Python powers our ML pipelines, data processing workflows, automation scripts, and increasingly our backend services.",
    take: "Every AI project starts with Python. We use FastAPI for ML service APIs, pandas/polars for data wrangling, and the entire PyTorch/scikit-learn ecosystem for model development. For manufacturing clients, Python's integration with industrial protocols (OPC-UA, MQTT) is invaluable.",
    related: "/ai-lab" },
  { id: 3, name: "Tailwind CSS", ring: "adopt", quadrant: "lang", isNew: false,
    desc: "Utility-first CSS that eliminated the design-to-code bottleneck. Tailwind's constraint-based design system approach produces consistent, performant UIs.",
    take: "Tailwind is non-negotiable for new projects. Combined with shadcn/ui components, it lets our engineers build production-quality interfaces at 3× the speed of traditional CSS approaches.",
    related: "/expertise/experience-engineering" },
  { id: 4, name: "AWS", ring: "adopt", quadrant: "platform", isNew: false,
    desc: "Our primary cloud platform for manufacturing and industrial clients. AWS's breadth of services — particularly IoT, ML, and data lakes — aligns perfectly with industrial AI workloads.",
    take: "AWS is our default recommendation for manufacturing clients. The IoT + ML + data lake trifecta is unmatched. We also leverage Azure when clients have existing Microsoft enterprise agreements.",
    related: "/expertise/cloud-native-engineering" },
  { id: 5, name: "Snowflake", ring: "adopt", quadrant: "platform", isNew: false,
    desc: "The data warehouse that transformed how our clients think about analytics. Snowflake's separation of storage and compute make it the default for enterprise analytics.",
    take: "We've deployed Snowflake across manufacturing, retail, and fintech clients. The data sharing capabilities are particularly powerful for supply chain visibility. Snowpark has made it a credible ML platform too.",
    related: "/expertise/data-ai-engineering" },
  { id: 6, name: "PLEX ERP API", ring: "adopt", quadrant: "platform", isNew: false,
    desc: "The Plex Smart Manufacturing Platform API layer is the backbone of our manufacturing modernization practice. Deep expertise in PLEX's REST APIs sets mVerve apart.",
    take: "PLEX is our unfair advantage. While most consultancies treat ERP as a legacy headache, we've built a dedicated PLEX practice that extends, modernizes, and AI-enables the platform.",
    related: "/expertise/enterprise-modernization" },
  { id: 7, name: "Kubernetes", ring: "adopt", quadrant: "platform", isNew: false,
    desc: "Container orchestration for production workloads. We primarily use managed Kubernetes (EKS/AKS) with GitOps-based deployment via ArgoCD.",
    take: "K8s is the orchestration layer for all our production microservices. Managed EKS/AKS with Terraform provisioning is the sweet spot. We pair it with ArgoCD for GitOps and Prometheus/Grafana for observability.",
    related: "/expertise/cloud-native-engineering" },
  { id: 8, name: "Docker", ring: "adopt", quadrant: "tools", isNew: false,
    desc: "Containerization is table stakes. Docker ensures consistent environments from a developer's laptop to production edge devices on the factory floor.",
    take: "Every service we build ships as a container. For manufacturing clients running edge computing, Docker containers deployed via IoT Greengrass are the standard pattern.",
    related: "/expertise/cloud-native-engineering" },
  { id: 9, name: "Terraform / OpenTofu", ring: "adopt", quadrant: "tools", isNew: false,
    desc: "Infrastructure as Code is foundational to every cloud deployment we manage. Terraform gives us repeatable, version-controlled, peer-reviewed infrastructure.",
    take: "No cloud resource gets created without Terraform. Period. We maintain reusable module libraries for our most common patterns — EKS clusters, RDS setups, IoT Greengrass deployments.",
    related: "/expertise/platform-engineering" },
  { id: 10, name: "Apache Kafka", ring: "adopt", quadrant: "platform", isNew: false,
    desc: "Event streaming platform that powers real-time data pipelines in our manufacturing and IoT architectures. Kafka enables event-driven architectures for real-time dashboards.",
    take: "Kafka is the nervous system of our real-time manufacturing architectures. IoT sensor data, ERP events, ML predictions — all flow through Kafka topics. We default to Amazon MSK.",
    related: "/expertise/data-ai-engineering" },
  /* TRIAL — 6 entries */
  { id: 11, name: "Llama 3 / 4", ring: "trial", quadrant: "ai", isNew: true,
    desc: "Meta's open-weight LLM family has reached a quality inflection point. Llama models deliver GPT-4-class performance with the critical advantage of on-premise deployment.",
    take: "For manufacturing and healthcare clients who can't send proprietary data to external APIs, self-hosted Llama models are transformative. We're running fine-tuned Llama 3 70B on SageMaker for document understanding in ERP workflows.",
    related: "/ai-lab/generative-ai" },
  { id: 12, name: "Vector DBs", ring: "trial", quadrant: "ai", isNew: false,
    desc: "The infrastructure backbone for RAG and semantic search. We evaluate Pinecone, Weaviate, and pgvector depending on scale and existing infrastructure.",
    take: "For clients already on PostgreSQL, pgvector is our first recommendation. For high-scale RAG applications, Pinecone's managed service and hybrid search capabilities justify the dedicated tooling.",
    related: "/ai-lab/generative-ai" },
  { id: 13, name: "LangChain", ring: "trial", quadrant: "ai", isNew: false,
    desc: "The orchestration framework for LLM-powered applications. LangChain handles prompt management, while LangGraph enables stateful, multi-step agentic workflows.",
    take: "LangChain accelerates POC development significantly. LangGraph is proving essential for agentic workflows — like multi-step ERP data extraction and report generation.",
    related: "/ai-lab" },
  { id: 14, name: "Cursor IDE", ring: "trial", quadrant: "tools", isNew: true,
    desc: "AI-native code editors that integrate LLM capabilities directly into the development workflow. A fundamental shift in how engineers write, review, and refactor code.",
    take: "Our engineering teams are seeing 30-40% productivity gains on boilerplate tasks. The impact is most dramatic for migration work — converting legacy jQuery frontends to React.",
    related: "/expertise/experience-engineering" },
  { id: 15, name: "MCP Protocol", ring: "trial", quadrant: "ai", isNew: true,
    desc: "Anthropic's open protocol for connecting AI models to external tools and data sources. MCP standardizes how LLMs interact with databases, APIs, and enterprise tools.",
    take: "MCP is the most exciting development in enterprise AI integration since REST APIs. We're building MCP servers for PLEX, Snowflake, and manufacturing IoT systems.",
    related: "/ai-lab" },
  { id: 16, name: "Backstage IDP", ring: "trial", quadrant: "tools", isNew: false,
    desc: "Spotify's open-source Internal Developer Platform provides a unified portal for service catalogs, documentation, CI/CD pipelines, and infrastructure provisioning.",
    take: "Backstage is the IDP we recommend for mid-market companies ready to formalize their platform engineering practice. We're building custom Backstage plugins for manufacturing contexts.",
    related: "/expertise/platform-engineering" },
  /* ASSESS — 4 entries */
  { id: 17, name: "Quantum Computing", ring: "assess", quadrant: "platform", isNew: false,
    desc: "Quantum computing promises exponential speedups for optimization problems — supply chain routing, molecular simulation, financial portfolio optimization.",
    take: "We're running benchmarks comparing quantum-inspired algorithms versus actual quantum circuits for supply chain optimization. Current hardware is too noisy for production, but the potential is compelling.",
    related: "/insights" },
  { id: 18, name: "WebAssembly", ring: "assess", quadrant: "lang", isNew: false,
    desc: "Near-native performance in the browser opens new possibilities — real-time 3D visualization, client-side ML inference for quality inspection, and compute-heavy CAD rendering.",
    take: "WASM's potential for manufacturing is underexplored. We're prototyping browser-based digital twin visualizations using WASM + Three.js that run quality inspection ML models entirely client-side.",
    related: "/expertise/experience-engineering" },
  { id: 19, name: "Edge AI", ring: "assess", quadrant: "ai", isNew: false,
    desc: "Running ML inference directly on factory floor hardware — cameras, sensors, PLCs — without cloud round-trips. Critical for real-time quality inspection where latency must be sub-10ms.",
    take: "Edge AI is the future of smart manufacturing, but the deployment tooling isn't there yet. We're piloting NVIDIA Jetson-based visual inspection systems with impressive real-time defect detection results.",
    related: "/ai-lab" },
  { id: 20, name: "Digital Twins", ring: "assess", quadrant: "ai", isNew: true,
    desc: "Virtual replicas of physical manufacturing systems combining real-time IoT data with simulation models. Enable predictive maintenance and what-if scenario planning.",
    take: "The concept is powerful, but platforms are still maturing. AWS IoT TwinMaker is the most production-ready option. We're building a reference implementation for a cleantech client.",
    related: "/industries/cleantech" },
  /* HOLD — 4 entries */
  { id: 21, name: "On-Prem Monoliths", ring: "hold", quadrant: "platform", isNew: false,
    desc: "Single-server, vertically-scaled infrastructure in on-premise data centers. Still common in mid-market manufacturing but increasingly a competitive liability.",
    take: "The migration path isn't rip and replace — it's our strangler-fig approach: wrap the monolith with APIs, move workloads incrementally to cloud. Clients save 40-60% on infrastructure costs.",
    related: "/expertise/enterprise-modernization" },
  { id: 22, name: "jQuery", ring: "hold", quadrant: "lang", isNew: false,
    desc: "Once revolutionary, now a maintenance burden. jQuery-based UIs lack component architecture and the developer tooling ecosystem needed for modern enterprise applications.",
    take: "Every jQuery UI we encounter gets an immediate migration plan. We use AI-assisted code translation to accelerate jQuery → React conversions by 60%.",
    related: "/expertise/enterprise-modernization" },
  { id: 23, name: "Manual QA Only", ring: "hold", quadrant: "tools", isNew: false,
    desc: "Testing strategies that rely entirely on manual human testers with no automated test suites. The single biggest velocity killer in mid-market engineering teams.",
    take: "Our first engagement often starts with a testing transformation: Playwright for E2E, Jest/Vitest for unit tests, and CI-integrated test gates. Deployment frequency increases 5× within the first quarter.",
    related: "/expertise/quality-engineering" },
  { id: 24, name: "ERPs Without APIs", ring: "hold", quadrant: "platform", isNew: false,
    desc: "Legacy ERP systems lacking REST/GraphQL APIs — forcing data access through direct database queries, screen scraping, or CSV exports. The #1 reason manufacturers can't adopt AI.",
    take: "Our Enterprise Modernization practice specializes in wrapping legacy ERPs with modern API gateways — creating the data access layer that makes AI possible.",
    related: "/expertise/enterprise-modernization" },
  { id: 25, name: "dbt", ring: "adopt", quadrant: "ai", isNew: false,
    desc: "The transformation layer in our modern data stack. dbt brings software engineering practices — version control, testing, documentation — to SQL-based data transformations.",
    take: "dbt is how we ensure data quality. For manufacturing clients, production data flowing from PLEX → Snowflake → dbt → dashboards is our standard pattern.",
    related: "/expertise/data-ai-engineering" },
];

/* ═══════════════════════════════════════════
   BLIP POSITION CALCULATOR
   Assign polar coords within each quadrant/ring zone
   ═══════════════════════════════════════════ */
function getBlipPositions(techs, size) {
  const cx = size / 2, cy = size / 2;
  const maxR = size * 0.44;
  const ringBands = { adopt: [0.06, 0.24], trial: [0.26, 0.48], assess: [0.50, 0.72], hold: [0.74, 0.96] };
  const quadAngles = { lang: [0, 90], platform: [90, 180], tools: [180, 270], ai: [270, 360] };
  const placed = [];
  const groups = {};
  techs.forEach(t => {
    const key = `${t.ring}-${t.quadrant}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  Object.entries(groups).forEach(([key, items]) => {
    const [ring, quad] = key.split("-");
    const [rMin, rMax] = ringBands[ring];
    const [aMin, aMax] = quadAngles[quad];
    const aPad = 8;
    items.forEach((t, i) => {
      const frac = items.length === 1 ? 0.5 : i / (items.length - 1);
      const angle = (aMin + aPad + frac * (aMax - aMin - 2 * aPad)) * (Math.PI / 180);
      const rFrac = items.length === 1 ? 0.5 : 0.3 + (i % 2) * 0.4;
      const r = (rMin + rFrac * (rMax - rMin)) * maxR;
      placed.push({ ...t, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
    });
  });
  return placed;
}

/* ═══════════════════════════════════════════
   SVG RADAR VISUALIZATION
   ═══════════════════════════════════════════ */
function RadarSVG({ size, blips, activeQuadrant, activeRing, hoveredId, selectedId, onHover, onSelect, searchTerm }) {
  const cx = size / 2, cy = size / 2;
  const maxR = size * 0.44;
  const ringRadii = [0.25, 0.50, 0.75, 1.0];
  const ringColors = [T.green, T.blue, T.amber, T.rose];
  const ringLabels = ["Adopt", "Trial", "Assess", "Hold"];
  const quadLabels = ["Languages & Frameworks", "Platforms & Infrastructure", "Tools & Practices", "AI & Data"];
  const quadColors = [T.blue, T.green, T.purple, T.cyan];

  const matchesSearch = (b) => {
    if (!searchTerm) return true;
    return b.name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const isFiltered = (b) => {
    if (activeQuadrant && b.quadrant !== activeQuadrant) return false;
    if (activeRing && b.ring !== activeRing) return false;
    if (searchTerm && !matchesSearch(b)) return false;
    return true;
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: "100%", height: "auto" }}>
      {/* Background */}
      <circle cx={cx} cy={cy} r={maxR + 8} fill={T.darkAlt} />
      {/* Concentric rings — outer to inner */}
      {ringRadii.slice().reverse().map((r, ri) => {
        const idx = 3 - ri;
        return (
          <g key={idx}>
            <circle cx={cx} cy={cy} r={r * maxR} fill="none" stroke={`${ringColors[idx]}20`} strokeWidth={1.5} />
            <circle cx={cx} cy={cy} r={r * maxR} fill={`${ringColors[idx]}06`} />
          </g>
        );
      })}
      {/* Quadrant divider lines */}
      {[0, 90, 180, 270].map(a => {
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={cx} y1={cy} x2={cx + maxR * Math.cos(rad)} y2={cy + maxR * Math.sin(rad)} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />;
      })}
      {/* Ring labels */}
      {ringRadii.map((r, i) => (
        <text key={i} x={cx + 6} y={cy - r * maxR + 14} fill={`${ringColors[i]}90`} fontSize={9} fontFamily="monospace" fontWeight={600}>
          {ringLabels[i].toUpperCase()}
        </text>
      ))}
      {/* Quadrant labels */}
      {[
        { x: cx + maxR * 0.52, y: cy - maxR - 14, anchor: "middle" },
        { x: cx + maxR + 10, y: cy + 4, anchor: "start" },
        { x: cx - maxR * 0.52, y: cy + maxR + 18, anchor: "middle" },
        { x: cx - maxR - 10, y: cy + 4, anchor: "end" },
      ].map((pos, i) => (
        <text key={i} x={pos.x} y={pos.y} fill={`${quadColors[i]}80`} fontSize={8} fontFamily="monospace" fontWeight={600} textAnchor={pos.anchor} letterSpacing={1}>
          {quadLabels[i].toUpperCase()}
        </text>
      ))}
      {/* Center crosshair dot */}
      <circle cx={cx} cy={cy} r={3} fill={T.cyan} opacity={0.5} />
      {/* Blips */}
      {blips.map(b => {
        const active = isFiltered(b);
        const hovered = hoveredId === b.id;
        const selected = selectedId === b.id;
        const ringObj = RINGS.find(r => r.id === b.ring);
        const blipColor = ringObj?.color || T.blue;
        const radius = hovered || selected ? 10 : 7;
        const opacity = active ? 1 : 0.12;
        return (
          <g key={b.id} style={{ cursor: "pointer", transition: "opacity 0.3s" }} opacity={opacity}
            onMouseEnter={() => onHover(b.id)} onMouseLeave={() => onHover(null)} onClick={() => onSelect(b.id)}>
            {/* Glow ring */}
            {(hovered || selected) && (
              <circle cx={b.x} cy={b.y} r={16} fill={`${blipColor}15`} stroke={`${blipColor}30`} strokeWidth={1} />
            )}
            {/* Pulse for new entries */}
            {b.isNew && active && (
              <>
                <circle cx={b.x} cy={b.y} r={12} fill="none" stroke={blipColor} strokeWidth={0.5} opacity={0.4}>
                  <animate attributeName="r" from="8" to="18" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            {/* Main blip */}
            <circle cx={b.x} cy={b.y} r={radius} fill={blipColor} stroke={hovered || selected ? "#fff" : `${blipColor}60`} strokeWidth={hovered || selected ? 2 : 1}
              style={{ transition: "r 0.2s, stroke-width 0.2s" }} />
            {/* ID number */}
            <text x={b.x} y={b.y + 3.5} fill="#fff" fontSize={8} fontFamily="monospace" fontWeight={700} textAnchor="middle">
              {b.id}
            </text>
            {/* Hover tooltip */}
            {hovered && !selected && (
              <g>
                <rect x={b.x + 14} y={b.y - 18} width={Math.max(b.name.length * 7.5 + 16, 80)} height={28} rx={6} fill={T.dark} stroke={blipColor} strokeWidth={1} />
                <text x={b.x + 22} y={b.y + 1} fill="#fff" fontSize={11} fontFamily="monospace" fontWeight={600}>{b.name}</text>
                {b.isNew && (
                  <text x={b.x + 22 + b.name.length * 7} y={b.y + 1} fill={T.amber} fontSize={9} fontFamily="monospace" fontWeight={700}> NEW</text>
                )}
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   DETAIL PANEL (slides in from right)
   ═══════════════════════════════════════════ */
function DetailPanel({ tech, onClose }) {
  if (!tech) return null;
  const ringObj = RINGS.find(r => r.id === tech.ring);
  const quadObj = QUADRANTS.find(q => q.id === tech.quadrant);
  const RingIcon = ringObj?.icon || CheckCircle2;
  const QuadIcon = quadObj?.icon || Code2;
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      style={{
        position: "fixed", top: 0, right: 0, width: 420, maxWidth: "92vw", height: "100vh",
        background: T.white, borderLeft: `1px solid ${T.border}`, zIndex: 1000,
        overflowY: "auto", boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
      }}>
      {/* Header */}
      <div style={{ background: T.dark, padding: "28px 24px 24px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <X size={18} color="#fff" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: T.cyan, letterSpacing: 1.5 }}>#{String(tech.id).padStart(2, "0")}</span>
          {tech.isNew && (
            <span style={{ fontFamily: "monospace", fontSize: 9, padding: "2px 8px", borderRadius: 4, background: `${T.amber}25`, color: T.amber, fontWeight: 700 }}>NEW THIS EDITION</span>
          )}
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
          {tech.name}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, padding: "4px 10px", borderRadius: 999, background: `${ringObj?.color}20`, color: ringObj?.color, fontWeight: 600 }}>
            <RingIcon size={12} /> {ringObj?.name.toUpperCase()}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, padding: "4px 10px", borderRadius: 999, background: `${quadObj?.color}15`, color: quadObj?.color, fontWeight: 600 }}>
            <QuadIcon size={12} /> {quadObj?.name}
          </span>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: T.textMuted, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>DESCRIPTION</div>
          <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.8 }}>{tech.desc}</div>
        </div>
        <div style={{ background: T.lightBg, borderRadius: 10, padding: 20, marginBottom: 24, borderLeft: `3px solid ${T.cyan}` }}>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: T.cyan, letterSpacing: 1.5, marginBottom: 8, fontWeight: 600 }}>MVERVE'S TAKE</div>
          <div style={{ fontSize: 14, color: T.text, lineHeight: 1.8 }}>{tech.take}</div>
        </div>
        {/* Ring context */}
        <div style={{ background: `${ringObj?.color}08`, borderRadius: 8, padding: 16, marginBottom: 24, border: `1px solid ${ringObj?.color}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <RingIcon size={14} color={ringObj?.color} />
            <span style={{ fontFamily: "monospace", fontSize: 11, color: ringObj?.color, fontWeight: 600 }}>RING: {ringObj?.name.toUpperCase()}</span>
          </div>
          <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.6 }}>{ringObj?.desc}</div>
        </div>
        {/* Related link */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: T.lightBg, borderRadius: 8, cursor: "pointer" }}>
          <ExternalLink size={14} color={T.blue} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.blue, fontWeight: 600 }}>Related: {tech.related}</span>
          <ArrowRight size={12} color={T.blue} style={{ marginLeft: "auto" }} />
        </div>
      </div>
      {/* Panel annotation */}
      <div style={{ padding: "12px 24px 24px", borderTop: `1px solid ${T.border}` }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: T.textMuted, textAlign: "center" }}>
          PATTERN: Slide-in detail panel — 420px fixed right · spring animation · scroll-independent
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */
function RadarHero() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(170deg, ${T.dark} 0%, ${T.darkAlt} 100%)`, padding: "100px 24px 80px", position: "relative", overflow: "hidden" }}>
      {/* Scanline overlay */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.015) 2px, rgba(6,182,212,0.015) 4px)", pointerEvents: "none" }} />
      {/* Grid dots */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(6,182,212,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: `1px solid ${T.cyan}30`, background: `${T.cyan}08`, marginBottom: 20 }}>
          <Crosshair size={14} color={T.cyan} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.cyan, letterSpacing: 1.5, fontWeight: 600 }}>INSIGHTS / FLAGSHIP CONTENT</span>
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 16, letterSpacing: -1 }}>
          The mVerve<br />Tech Radar
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: 17, color: T.onDarkSec, lineHeight: 1.7, maxWidth: 640, margin: "0 auto 32px" }}>
          Our opinionated guide to the technologies shaping industrial AI. Built from real project experience across manufacturing, cleantech, and healthcare — not analyst hype or vendor keynotes.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
          <Counter value="25" label="Technologies" color={T.cyan} />
          <Counter value="4" label="Quadrants" color={T.green} />
          <Counter value="4" label="Rings" color={T.amber} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: T.rose, lineHeight: 1 }}>Q1</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: T.onDarkMuted, marginTop: 4 }}>2026 Edition</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — INTERACTIVE RADAR
   ═══════════════════════════════════════════ */
function InteractiveRadar({ selectedId, onSelect }) {
  const [ref, vis] = useReveal(0.05);
  const w = useWindowSize();
  const radarSize = Math.min(w > 900 ? 680 : w > 600 ? 520 : 360, 680);
  const blips = useMemo(() => getBlipPositions(TECHNOLOGIES, radarSize), [radarSize]);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeQuadrant, setActiveQuadrant] = useState(null);
  const [activeRing, setActiveRing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const clearFilters = () => { setActiveQuadrant(null); setActiveRing(null); setSearchTerm(""); };
  const hasFilters = activeQuadrant || activeRing || searchTerm;

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Filter bar */}
        <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.darkSurface, borderRadius: 8, padding: "10px 16px", border: `1px solid ${T.borderDark}`, flex: "1 1 260px", maxWidth: 360 }}>
              <Search size={16} color={T.onDarkMuted} />
              <input type="text" placeholder="Search technologies..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: "monospace", fontSize: 13, width: "100%" }} />
            </div>
            {hasFilters && (
              <button onClick={clearFilters} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${T.borderDark}`, color: T.onDarkSec, fontFamily: "monospace", fontSize: 11, cursor: "pointer" }}>
                <X size={12} /> Clear Filters
              </button>
            )}
          </div>
          {/* Quadrant pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {QUADRANTS.map(q => {
              const Icon = q.icon;
              const active = activeQuadrant === q.id;
              return (
                <button key={q.id} onClick={() => setActiveQuadrant(active ? null : q.id)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 6, border: `1px solid ${active ? q.color : T.borderDark}`, background: active ? `${q.color}15` : "transparent", color: active ? q.color : T.onDarkSec, fontFamily: "monospace", fontSize: 11, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>
                  <Icon size={13} /> {q.name}
                </button>
              );
            })}
          </div>
          {/* Ring pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {RINGS.map(r => {
              const active = activeRing === r.id;
              const count = TECHNOLOGIES.filter(t => t.ring === r.id).length;
              return (
                <button key={r.id} onClick={() => setActiveRing(active ? null : r.id)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, border: "none", background: active ? r.color : `${r.color}20`, color: active ? "#fff" : r.color, fontFamily: "monospace", fontSize: 10, cursor: "pointer", fontWeight: 700, transition: "all 0.2s" }}>
                  {r.name} ({count})
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Radar visualization — centered */}
        <motion.div variants={fadeIn} style={{ display: "flex", justifyContent: "center" }}>
          <RadarSVG
            size={radarSize} blips={blips}
            activeQuadrant={activeQuadrant} activeRing={activeRing}
            hoveredId={hoveredId} selectedId={selectedId} searchTerm={searchTerm}
            onHover={setHoveredId} onSelect={onSelect}
          />
        </motion.div>

        {/* Legend annotation */}
        <motion.div variants={fadeIn} style={{ marginTop: 20, textAlign: "center" }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted }}>
            CLICK any blip to open the detail panel → Numbers correspond to technology entries below
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — TECHNOLOGY LIST (grouped by ring)
   ═══════════════════════════════════════════ */
function TechList({ selectedId, onSelect }) {
  const [ref, vis] = useReveal(0.05);
  const w = useWindowSize();
  const cols = w > 900 ? 2 : 1;

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {RINGS.map(ring => {
          const Icon = ring.icon;
          const techs = TECHNOLOGIES.filter(t => t.ring === ring.id);
          return (
            <motion.div key={ring.id} variants={fadeUp} style={{ marginBottom: 48 }}>
              {/* Ring header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: `2px solid ${ring.color}20` }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${ring.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={ring.color} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: T.text }}>{ring.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: T.textMuted }}>{ring.desc}</div>
                </div>
                <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: `${ring.color}40` }}>
                  {techs.length}
                </span>
              </div>
              {/* Tech cards */}
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
                {techs.map(t => {
                  const isSelected = selectedId === t.id;
                  const quadObj = QUADRANTS.find(q => q.id === t.quadrant);
                  return (
                    <motion.div key={t.id} variants={fadeUp} onClick={() => onSelect(t.id)}
                      whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                      style={{
                        background: isSelected ? `${ring.color}05` : T.white,
                        border: `1px solid ${isSelected ? ring.color : T.border}`,
                        borderRadius: 10, padding: 20, cursor: "pointer", transition: "all 0.2s",
                        borderLeft: `3px solid ${ring.color}`,
                      }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: T.textMuted, background: T.lightBg, padding: "2px 6px", borderRadius: 4 }}>#{String(t.id).padStart(2, "0")}</span>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>{t.name}</span>
                        {t.isNew && (
                          <span style={{ fontFamily: "monospace", fontSize: 9, padding: "2px 6px", borderRadius: 4, background: `${T.amber}15`, color: T.amber, fontWeight: 700 }}>NEW</span>
                        )}
                        <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 10, color: quadObj?.color, background: `${quadObj?.color}10`, padding: "2px 8px", borderRadius: 4 }}>
                          {quadObj?.name}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7 }}>
                        {t.desc.length > 140 ? t.desc.slice(0, 140) + "..." : t.desc}
                      </div>
                      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, color: T.blue, fontFamily: "monospace", fontSize: 11, fontWeight: 600 }}>
                        Read mVerve's Take <ArrowRight size={12} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — METHODOLOGY
   ═══════════════════════════════════════════ */
function Methodology() {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const cols = w > 900 ? 4 : w > 600 ? 2 : 1;
  const steps = [
    { num: "01", title: "Project Data", desc: "We review every technology used across active projects. Usage frequency, team satisfaction, and incident data all factor in.", color: T.cyan },
    { num: "02", title: "Engineering Review", desc: "Senior engineers and architects nominate technologies and propose ring placements. Debates are encouraged — disagreements reveal the most interesting assessments.", color: T.blue },
    { num: "03", title: "Client Validation", desc: "We cross-reference assessments with client feedback. A technology that struggles in a client's regulatory environment gets downgraded.", color: T.green },
    { num: "04", title: "Quarterly Publish", desc: "The radar updates quarterly. Each edition highlights new entries, movements, and retirements alongside a blog post explaining the biggest changes.", color: T.amber },
  ];

  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.lightBg, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: T.cyan, letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>OUR PROCESS</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: T.text, marginBottom: 8 }}>
            Built From Production, Not Predictions
          </h2>
          <p style={{ fontSize: 15, color: T.textSec, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Every placement on the mVerve Tech Radar is earned through real project experience — not vendor briefings or conference hype.
          </p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
          {steps.map((s, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ background: T.white, borderRadius: 12, padding: 24, borderTop: `3px solid ${s.color}`, position: "relative" }}>
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: `${s.color}20`, position: "absolute", top: 16, right: 20 }}>{s.num}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: T.textSec, lineHeight: 1.7 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — CTA
   ═══════════════════════════════════════════ */
function RadarCTA() {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: `linear-gradient(135deg, ${T.dark}, #0C1222)`, padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(6,182,212,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div variants={fadeUp} style={{ fontFamily: "monospace", fontSize: 11, color: T.cyan, letterSpacing: 2, marginBottom: 12, fontWeight: 600 }}>
          LET'S TALK TECHNOLOGY
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
          Disagree With Our Radar?<br />We'd Love to Hear Why.
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.onDarkSec, lineHeight: 1.7, marginBottom: 28 }}>
          The best technology conversations start with strong opinions loosely held. Book a Tech Strategy session and let's debate your stack.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn color={T.cyan} onClick={() => {}}>Book a Tech Strategy Session <ArrowRight size={16} /></Btn>
          <Btn primary={false} onClick={() => {}}><Download size={16} /> Download Radar as PDF</Btn>
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
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${T.cyan}, ${T.blue})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Crosshair size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>mVerve</span>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.05)" }}>Tech Radar</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted }}>Q1 2026</span>
          <Btn small color={T.cyan} onClick={() => {}}>Book Strategy Call <ArrowRight size={14} /></Btn>
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
          © 2026 mVerve Digital Engineering · Tech Radar Q1 2026 Edition
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Insights Hub", "AI Lab", "Expertise", "Contact"].map(l => (
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
export function TechRadarContent({ navigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedTech = TECHNOLOGIES.find(t => t.id === selectedId) || null;
  const handleSelect = useCallback((id) => { setSelectedId(prev => prev === id ? null : id); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setSelectedId(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  return (
    <>
      <RadarHero />
      <InteractiveRadar selectedId={selectedId} onSelect={handleSelect} />
      <TechList selectedId={selectedId} onSelect={handleSelect} />
      <Methodology />
      <RadarCTA />
      <AnimatePresence>
        {selectedTech && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999, backdropFilter: "blur(4px)" }} />
            <DetailPanel key="panel" tech={selectedTech} onClose={() => setSelectedId(null)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MVerveTechRadar() {
  const [selectedId, setSelectedId] = useState(null);
  const selectedTech = TECHNOLOGIES.find(t => t.id === selectedId) || null;

  const handleSelect = useCallback((id) => {
    setSelectedId(prev => prev === id ? null : id);
  }, []);

  // Close panel on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setSelectedId(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div style={{ background: T.dark, minHeight: "100vh" }}>
      <Nav />
      <RadarHero />
      <InteractiveRadar selectedId={selectedId} onSelect={handleSelect} />
      <TechList selectedId={selectedId} onSelect={handleSelect} />
      <Methodology />
      <RadarCTA />
      <Footer />

      {/* Detail panel overlay + backdrop */}
      <AnimatePresence>
        {selectedTech && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999, backdropFilter: "blur(4px)" }} />
            <DetailPanel key="panel" tech={selectedTech} onClose={() => setSelectedId(null)} />
          </>
        )}
      </AnimatePresence>

      {/* Page annotation */}
      <div style={{ padding: "16px 24px", background: T.dark, borderTop: `1px dashed ${T.borderDark}`, textAlign: "center" }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: T.onDarkMuted }}>
          WIREFRAME: mVerve Tech Radar · /insights/tech-radar · 25 Technologies · 4 Quadrants · 4 Rings · Interactive SVG Radar + Slide-in Detail Panel + Filterable List
        </span>
      </div>
    </div>
  );
}
