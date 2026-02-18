import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Factory, Leaf, Heart, ShoppingBag, Landmark, ArrowRight, ChevronRight,
  ChevronDown, CheckCircle2, Zap, Database, BarChart3, Shield, Cloud,
  Code2, Cpu, Target, Layers, Globe, MapPin, ExternalLink, Menu, X,
  Search, Clock, Users, Rocket, Sparkles, Brain, Bot, Workflow, LineChart,
  ServerCog, Gauge, ArrowUpRight, FileText, Hexagon
} from "lucide-react";

/* ═══════════════════════════════════════════
   DESIGN TOKENS
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
      style={{ ...base, background: hov ? (color === T.blue ? T.blueHover : color) : color, color: "#fff", boxShadow: hov ? `0 4px 20px ${color}25` : "none" }}>
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

/* ═══════════════════════════════════════════════════════════════════
   INDUSTRY DATA — Template-driven content for all 5 verticals
   Swap `activeIndustry` to render any vertical with the same layout.
   ═══════════════════════════════════════════════════════════════════ */
const INDUSTRIES = {
  manufacturing: {
    id: "manufacturing",
    name: "Manufacturing & Industry 4.0",
    slug: "/industries/manufacturing",
    accent: T.amber,
    icon: Factory,
    hero: {
      overline: "MANUFACTURING & INDUSTRY 4.0",
      headline: ["Smart Factories Start with", "Intelligent Systems"],
      sub: "Your production lines generate millions of data points every shift. Most of it goes unanalyzed. We engineer the AI systems that turn that data into predictive intelligence — reducing downtime, optimizing throughput, and modernizing the ERP infrastructure that holds it all together.",
      cta: "Talk to a Manufacturing Engineer",
      ctaSec: "See Manufacturing Case Studies",
      image: "Editorial factory floor photograph with cool blue light overlay. Abstract data visualization overlaid — sensor data streams flowing from machines into central intelligence hub. Premium, modern, not stock-photo bright.",
    },
    challenge: {
      headline: "The Mid-Market Manufacturing Dilemma",
      paragraphs: [
        "You're running a $50M–$500M manufacturing operation on a 15-year-old ERP system that nobody wants to touch. PLEX holds your production data, your supply chain logic, and your compliance records — but it was architected for a pre-cloud, pre-AI world. Extending it is painful. Migrating away from it is terrifying.",
        "Your supply chain is a black box. Your quality control still relies on statistical sampling instead of computer vision. And your maintenance strategy? Reactive. You fix machines after they break — at $47K per hour of unplanned downtime.",
        "Meanwhile, the big consulting firms want $5M and 18 months for a \"digital transformation roadmap\" — half of which will be PowerPoint slides about Industry 4.0 that your team already understands. You don't need more strategy. You need an engineering partner.",
      ],
      punchline: "That's where mVerve comes in. We sit at the intersection nobody else occupies: deep PLEX expertise, production-grade AI engineering, and a team that has actually been on a factory floor.",
      image: "Simplified diagram: disconnected systems, siloed data, reactive operations. mVerve minimal line-art in gray/blue.",
    },
    solutions: {
      headline: "Four Interconnected Capabilities for the Smart Factory",
      cards: [
        { tag: "PLEX EXPERTISE", tagColor: T.amber, title: "PLEX ERP Modernization", desc: "Cloud migration via strangler-fig pattern. Modern API layers. Custom extensions. Microservices extraction. Zero-downtime cutover. We have deeper PLEX expertise than any AI-first firm in the market.", link: "Legacy Modernization Suite" },
        { tag: "AI / ML", tagColor: T.blue, title: "Predictive Maintenance & Quality AI", desc: "Real-time sensor data → anomaly detection → failure prediction → automated scheduling. Custom ML models trained on YOUR production data. Computer vision for quality inspection. 72-hour failure prediction window.", link: "Intelligent Decision Engines" },
        { tag: "DATA", tagColor: T.blue, title: "Production Intelligence Platform", desc: "Unified data layer connecting PLEX, MES, SCADA, and IoT sensors. Real-time dashboards for OEE, throughput, quality, and supply chain visibility. Single source of truth for operations managers.", link: "Data Intelligence Studio" },
        { tag: "SUSTAINABILITY", tagColor: T.green, title: "Sustainable Manufacturing / GreenOps", desc: "Carbon-aware production scheduling. Energy optimization. ESG compliance reporting automation. Our GreenOps methodology reduces the carbon impact of both your digital and physical operations.", link: "GreenOps Platform", accent: T.green },
      ],
    },
    spotlight: {
      overline: "DEEP DOMAIN EXPERTISE",
      headline: "The PLEX Problem — And Why We're Uniquely Positioned to Solve It",
      body: [
        "PLEX (now Plex by Rockwell Automation) runs critical operations for thousands of manufacturers. But it was architected for a pre-cloud, pre-AI world. Extending it is painful. Migrating away from it is terrifying. Most engineering firms won't touch it because they don't understand the manufacturing domain deeply enough.",
        "We do. mVerve has engineered PLEX extensions, built cloud-native API layers on top of PLEX, and migrated PLEX monoliths to microservices architectures — all without a single minute of unplanned production downtime.",
      ],
      capabilities: [
        { title: "Cloud Migration", desc: "Strangler-fig pattern migration from on-prem PLEX to cloud-native architecture. Zero downtime." },
        { title: "API Layer Engineering", desc: "Modern REST/GraphQL APIs on top of PLEX — so your teams can build modern applications against reliable manufacturing data." },
        { title: "AI Integration", desc: "Connecting PLEX data to ML pipelines for predictive maintenance, demand forecasting, and quality control AI." },
      ],
      image: "Technical architecture diagram: legacy PLEX monolith → strangler-fig decomposition → cloud-native microservices. Blue=cloud, amber=PLEX, green=AI layers.",
    },
    metrics: [
      { val: "42%", label: "Average unplanned downtime reduction", color: T.blue },
      { val: "$2M+", label: "Annual infrastructure savings per engagement", color: T.amber },
      { val: "99.95%", label: "Uptime maintained during PLEX migrations", color: T.blue },
      { val: "72hr", label: "Failure prediction lead time", color: T.green },
    ],
    caseStudies: [
      {
        tag: "PLEX MODERNIZATION", tagColor: T.amber, accentColor: T.amber,
        title: "PLEX-to-Cloud Migration for $200M Automotive Parts Manufacturer",
        desc: "Migrated a 15-year-old PLEX monolith to cloud-native microservices using strangler-fig pattern. Built modern API layer enabling 12 new downstream applications. Zero production downtime during cutover.",
        metrics: [
          { val: "$2.4M", label: "Annual savings", color: T.amber },
          { val: "0 min", label: "Downtime", color: T.blue },
          { val: "18 wks", label: "Full migration", color: T.green },
        ],
      },
      {
        tag: "PREDICTIVE MAINTENANCE", tagColor: T.blue, accentColor: T.blue,
        title: "Predictive Maintenance AI for Industrial Equipment Manufacturer",
        desc: "Deployed ML pipeline ingesting real-time sensor data from 200+ production machines. Predicts component failures 72 hours in advance with 94% accuracy. Automatically schedules maintenance windows.",
        metrics: [
          { val: "42%", label: "Downtime reduction", color: T.blue },
          { val: "72hr", label: "Prediction window", color: T.green },
          { val: "$1.8M", label: "Prevented losses/yr", color: T.amber },
        ],
      },
      {
        tag: "SUPPLY CHAIN INTELLIGENCE", tagColor: T.green, accentColor: T.green,
        title: "AI-Powered Supply Chain Visibility for Consumer Goods Manufacturer",
        desc: "Built unified supply chain intelligence platform connecting 40+ suppliers, warehouse systems, and logistics partners. ML-powered demand forecasting replaced manual spreadsheet planning.",
        metrics: [
          { val: "30%", label: "Forecast accuracy ↑", color: T.blue },
          { val: "22%", label: "Inventory cost ↓", color: T.green },
          { val: "40+", label: "Suppliers connected", color: T.amber },
        ],
      },
    ],
    techStack: [
      { category: "ERP & Industrial", items: ["Plex by Rockwell", "SAP Integration", "SCADA/OPC-UA", "MQTT / IoT Hub", "Ignition (Inductive)"] },
      { category: "AI & Data", items: ["PyTorch", "TensorFlow", "AWS SageMaker", "Snowflake", "Databricks", "Apache Kafka", "Grafana"] },
      { category: "Cloud & DevOps", items: ["AWS (ECS, Lambda)", "Azure (AKS, IoT Hub)", "Kubernetes", "Terraform", "GitHub Actions", "Datadog"] },
    ],
    idealClient: {
      headline: "Is This You?",
      sub: "We work best with mid-market manufacturers who are ready to move — not just ready to talk about it.",
      items: [
        { text: "You run a $50M–$500M manufacturing operation and your ERP system is holding you back", color: T.blue },
        { text: "You're on PLEX (or similar MES/ERP) and need cloud migration without disrupting production", color: T.blue },
        { text: "Your maintenance is reactive — you want to predict failures before they happen", color: T.blue },
        { text: "Your production data lives in silos and you need a unified intelligence platform", color: T.blue },
        { text: "You have ESG targets or sustainability mandates and need technology that helps", color: T.green },
        { text: "You're tired of generic dev shops that don't understand manufacturing workflows", color: T.blue },
      ],
    },
    cta: {
      headline: ["Your Factory Has the Data.", "We'll Engineer the Intelligence."],
      sub: "Start with a Manufacturing AI Assessment. We'll audit your PLEX environment, map your data landscape, and identify the highest-ROI AI opportunities — all in two weeks.",
      button: "Book a Manufacturing Assessment",
      gradient: `linear-gradient(135deg, ${T.blue}, ${T.blueHover})`,
    },
  },
  /* ── Additional verticals as stubs for template switching ── */
  cleantech: {
    id: "cleantech", name: "CleanTech & Sustainability", slug: "/industries/cleantech",
    accent: T.green, icon: Leaf,
    hero: { overline: "CLEANTECH & SUSTAINABILITY", headline: ["Engineering the", "Net-Zero Enterprise"], sub: "The climate transition isn't just a policy challenge — it's an engineering challenge. We build the intelligent platforms that CleanTech companies need to track carbon, optimize energy, automate ESG compliance, and prove sustainability at scale.", cta: "Talk to a CleanTech Engineer", ctaSec: "Explore GreenOps", image: "Aerial wind turbines or solar array with green-tinted gradient overlay. Abstract energy flow and carbon metrics overlaid." },
    challenge: { headline: "Sustainability Without Scalable Technology Is Just Good Intentions", paragraphs: ["You're building the future of clean energy or carbon management — but your technology stack wasn't built for the complexity you're facing. Carbon tracking across a multi-tier supply chain requires real-time data integration with dozens of partners.", "Energy grid optimization demands ML models that predict demand and supply in real-time. ESG regulations are multiplying faster than compliance teams can track them — CSRD, ISSB, SEC.", "Meanwhile, your own technology infrastructure has a carbon footprint nobody is measuring."], punchline: "mVerve is the engineering partner that understands both the domain complexity of sustainability and the technology required to make it scalable.", image: "Sustainability technology diagram: carbon flows, energy networks, compliance frameworks" },
    solutions: { headline: "Four Capabilities for the CleanTech Mission", cards: [
      { tag: "PROPRIETARY", tagColor: T.green, title: "GreenOps Platform Engineering", desc: "Carbon-aware workload scheduling, green model training, and infrastructure optimization. 60% average carbon reduction + 35% cost savings.", link: "GreenOps Platform", accent: T.green },
      { tag: "PLATFORMS", tagColor: T.blue, title: "Carbon Tracking & Credit Platforms", desc: "Real-time carbon accounting across multi-tier supply chains. Automated carbon credit generation, verification, and trading.", link: "Cloud-Native Engineering" },
      { tag: "AI / ML", tagColor: T.blue, title: "Energy Optimization AI", desc: "ML-powered demand forecasting, grid load balancing, and renewable energy dispatch optimization.", link: "Intelligent Automation" },
      { tag: "COMPLIANCE", tagColor: T.blue, title: "ESG Reporting Automation", desc: "Automated data collection and reporting across CSRD, ISSB, SEC, and voluntary frameworks.", link: "Data Engineering" },
    ]},
    spotlight: null,
    metrics: [
      { val: "60%", label: "Average cloud carbon reduction", color: T.green },
      { val: "35%", label: "Infrastructure cost savings", color: T.amber },
      { val: "100%", label: "Carbon reporting on every engagement", color: T.green },
      { val: "200hr", label: "Quarterly manual ESG work eliminated", color: T.blue },
    ],
    caseStudies: [
      { tag: "GREENOPS DEPLOYMENT", tagColor: T.green, accentColor: T.green, title: "Carbon-Aware Workload Scheduling for CleanTech SaaS Platform", desc: "Deployed GreenOps methodology across multi-region cloud. Workloads auto-route to regions with highest renewable energy availability.", metrics: [{ val: "62%", label: "Cloud carbon reduction", color: T.green }, { val: "38%", label: "Cost savings", color: T.amber }, { val: "10 wks", label: "Implementation", color: T.blue }] },
    ],
    techStack: [
      { category: "Carbon & Sustainability", items: ["Cloud Carbon Footprint", "Climatiq API", "Green Software Foundation", "CSRD/ISSB"] },
      { category: "AI & Data", items: ["PyTorch", "Snowflake", "Databricks", "Kafka", "dbt", "Grafana"] },
      { category: "Cloud & Platform", items: ["AWS (Green Regions)", "Azure (Carbon API)", "Kubernetes", "Terraform"] },
    ],
    idealClient: { headline: "Is This You?", sub: "We work best with CleanTech companies scaling past their first million in revenue.", items: [
      { text: "You're a CleanTech startup or scale-up building carbon, energy, or sustainability platforms", color: T.green },
      { text: "Your carbon tracking is still manual spreadsheets and you need real-time automation", color: T.green },
      { text: "You need to meet CSRD/ISSB/SEC compliance and manual reporting won't scale", color: T.blue },
      { text: "You want your own tech stack to embody sustainability, not just serve it", color: T.green },
    ]},
    cta: { headline: ["The Planet Can't Wait.", "Neither Should Your Technology."], sub: "Start with a GreenOps Assessment. We'll audit your technology footprint, identify sustainability engineering opportunities, and build a roadmap to net-zero infrastructure.", button: "Book a GreenOps Assessment", gradient: `linear-gradient(135deg, ${T.green}, #059669)` },
  },
  healthcare: {
    id: "healthcare", name: "Healthcare & Life Sciences", slug: "/industries/healthcare",
    accent: T.rose, icon: Heart,
    hero: { overline: "HEALTHCARE & LIFE SCIENCES", headline: ["Intelligent Systems", "for Better Outcomes"], sub: "Healthcare generates more data than any other industry — and uses less of it for decision-making. We engineer HIPAA-compliant AI systems that turn clinical, operational, and research data into better patient outcomes.", cta: "Talk to a Healthcare Engineer", ctaSec: "See Healthcare Case Studies", image: "Abstract medical data visualization — patient flow networks, clinical pathways overlaid on dark background." },
    challenge: { headline: "The Healthcare Data Paradox", paragraphs: ["Healthcare generates 30% of the world's data, yet 97% of it goes unanalyzed. Your EHR system captures clinical data but traps it in silos. Your research teams run analyses on months-old exports.", "Interoperability remains the industry's biggest unsolved problem — HL7, FHIR, and proprietary formats create a fragmented landscape. And every AI initiative faces the HIPAA compliance gauntlet."], punchline: "mVerve engineers HIPAA-compliant, interoperable AI systems that work within healthcare's regulatory reality — not against it.", image: "Healthcare data silo diagram showing EHR, imaging, claims, genomics flowing into unified intelligence layer" },
    solutions: { headline: "Four Capabilities for Healthcare Intelligence", cards: [
      { tag: "COMPLIANCE", tagColor: T.rose, title: "HIPAA-Compliant AI Platforms", desc: "End-to-end compliant ML pipelines with PHI protection, audit trails, and consent management. Built for healthcare from the ground up.", link: "Enterprise Security", accent: T.rose },
      { tag: "INTEROPERABILITY", tagColor: T.blue, title: "FHIR-Native Data Engineering", desc: "HL7/FHIR integration, EHR interoperability layers, and unified patient data platforms. Single source of truth across clinical systems.", link: "Data Engineering" },
      { tag: "AI / ML", tagColor: T.blue, title: "Clinical Intelligence & Decision Support", desc: "Predictive models for patient risk, readmission prevention, care pathway optimization, and clinical trial matching.", link: "Intelligent Automation" },
      { tag: "SUSTAINABILITY", tagColor: T.green, title: "GreenOps for Healthcare IT", desc: "Healthcare IT has a growing carbon footprint. GreenOps methodology reduces infrastructure impact while maintaining HIPAA compliance.", link: "GreenOps Platform", accent: T.green },
    ]},
    spotlight: null,
    metrics: [
      { val: "97%", label: "Healthcare data currently unanalyzed", color: T.rose },
      { val: "100%", label: "HIPAA compliance on every deployment", color: T.green },
      { val: "35%", label: "Average reduction in readmission risk", color: T.blue },
      { val: "24hr", label: "From data to clinical insight", color: T.amber },
    ],
    caseStudies: [
      { tag: "CLINICAL AI", tagColor: T.rose, accentColor: T.rose, title: "Readmission Risk Prediction for Regional Hospital Network", desc: "ML model predicting 30-day readmission risk at discharge. Integrated with Epic EHR via FHIR. Reduced readmissions by 28% in first quarter.", metrics: [{ val: "28%", label: "Readmission reduction", color: T.rose }, { val: "92%", label: "Model accuracy", color: T.blue }, { val: "8 wks", label: "To production", color: T.green }] },
    ],
    techStack: [
      { category: "Healthcare Standards", items: ["HL7 FHIR", "SMART on FHIR", "DICOM", "ICD-10/11", "Epic API"] },
      { category: "AI & Data", items: ["PyTorch", "Snowflake (Healthcare)", "Databricks", "AWS HealthLake"] },
      { category: "Cloud & Compliance", items: ["AWS (HIPAA BAA)", "Azure (Healthcare APIs)", "Kubernetes", "Terraform"] },
    ],
    idealClient: { headline: "Is This You?", sub: "We work with health systems and life science companies ready to operationalize their data.", items: [
      { text: "You're a health system drowning in clinical data but starved for actionable intelligence", color: T.rose },
      { text: "Your EHR interoperability is a mess and you need a unified data platform", color: T.blue },
      { text: "You need AI that's HIPAA-compliant from day one, not retrofitted later", color: T.rose },
      { text: "You want to reduce readmissions, optimize care pathways, or accelerate research", color: T.blue },
    ]},
    cta: { headline: ["Better Data.", "Better Outcomes."], sub: "Start with a Healthcare AI Assessment. We'll audit your data landscape, identify high-impact AI opportunities, and build a HIPAA-compliant roadmap.", button: "Book a Healthcare Assessment", gradient: `linear-gradient(135deg, ${T.rose}, #E11D48)` },
  },
  retail: {
    id: "retail", name: "Retail & Consumer", slug: "/industries/retail",
    accent: T.purple, icon: ShoppingBag,
    hero: { overline: "RETAIL & CONSUMER", headline: ["Intelligent Commerce", "at Every Touchpoint"], sub: "From personalization engines to supply chain AI, we engineer the intelligent systems that turn customer data into revenue and operational data into efficiency.", cta: "Talk to a Retail Engineer", ctaSec: "See Retail Case Studies", image: "Abstract commerce visualization — customer journey flows, recommendation networks, real-time analytics" },
    challenge: { headline: "The Omnichannel Intelligence Gap", paragraphs: ["Your customers interact across 8+ channels but your data tells a fragmented story. Your recommendation engine is five years old. Your inventory forecasting is still spreadsheet-driven.", "The gap between what Amazon does with AI and what mid-market retailers can access is widening every quarter."], punchline: "mVerve engineers personalization, recommendation, and supply chain AI that gives mid-market retailers enterprise-grade intelligence.", image: "Omnichannel data flow diagram showing disconnected touchpoints converging into unified customer intelligence" },
    solutions: { headline: "Four Capabilities for Intelligent Commerce", cards: [
      { tag: "PERSONALIZATION", tagColor: T.purple, title: "AI-Powered Personalization", desc: "Real-time recommendation engines, dynamic pricing, and customer segmentation AI that drives measurable revenue lift.", link: "Generative AI Solutions", accent: T.purple },
      { tag: "SUPPLY CHAIN", tagColor: T.blue, title: "Demand Forecasting & Inventory AI", desc: "ML-powered demand prediction, automated replenishment, and supply chain optimization that reduces stockouts and overstock.", link: "Intelligent Automation" },
      { tag: "EXPERIENCE", tagColor: T.blue, title: "Omnichannel Experience Platform", desc: "Unified customer data platform connecting web, mobile, in-store, and social. Consistent experience across every touchpoint.", link: "Digital Experience" },
      { tag: "SUSTAINABILITY", tagColor: T.green, title: "Sustainable Retail / GreenOps", desc: "Carbon-aware logistics optimization and sustainable supply chain intelligence. Meet consumer sustainability expectations.", link: "GreenOps Platform", accent: T.green },
    ]},
    spotlight: null,
    metrics: [
      { val: "23%", label: "Average revenue lift from personalization", color: T.purple },
      { val: "34%", label: "Reduction in stockouts", color: T.blue },
      { val: "67%", label: "Cart abandonment reduction", color: T.green },
      { val: "3×", label: "Customer lifetime value increase", color: T.amber },
    ],
    caseStudies: [
      { tag: "PERSONALIZATION AI", tagColor: T.purple, accentColor: T.purple, title: "Real-Time Recommendation Engine for DTC Fashion Brand", desc: "Built ML-powered product recommendation system processing 50M+ events daily. Replaced rule-based engine with collaborative filtering + deep learning hybrid.", metrics: [{ val: "23%", label: "Revenue lift", color: T.purple }, { val: "50M+", label: "Events/day", color: T.blue }, { val: "6 wks", label: "To production", color: T.green }] },
    ],
    techStack: [
      { category: "Commerce & CX", items: ["Shopify Plus", "Salesforce Commerce", "Segment", "Braze", "Algolia"] },
      { category: "AI & Data", items: ["PyTorch", "Snowflake", "Databricks", "Apache Kafka", "dbt"] },
      { category: "Cloud & Platform", items: ["AWS", "Vercel", "Kubernetes", "Terraform", "Datadog"] },
    ],
    idealClient: { headline: "Is This You?", sub: "We work with mid-market and DTC brands ready to compete with AI.", items: [
      { text: "You're a $20M–$500M retailer and your personalization is basic or non-existent", color: T.purple },
      { text: "Your demand forecasting is manual and you're losing money on inventory", color: T.blue },
      { text: "Your customer data is fragmented across channels", color: T.purple },
      { text: "You want to deliver Amazon-grade intelligence at mid-market budgets", color: T.blue },
    ]},
    cta: { headline: ["Your Customers Expect", "Intelligence. Deliver It."], sub: "Start with a Retail AI Assessment. We'll audit your customer data, identify personalization opportunities, and build a roadmap to intelligent commerce.", button: "Book a Retail Assessment", gradient: `linear-gradient(135deg, ${T.purple}, #7C3AED)` },
  },
  fintech: {
    id: "fintech", name: "FinTech & Insurance", slug: "/industries/fintech",
    accent: T.cyan, icon: Landmark,
    hero: { overline: "FINTECH & INSURANCE", headline: ["Intelligent Finance", "Engineered for Trust"], sub: "Financial services demand the highest bar for security, compliance, and reliability. We engineer AI systems that detect fraud in real-time, automate underwriting, and deliver hyper-personalized experiences — all within regulatory guardrails.", cta: "Talk to a FinTech Engineer", ctaSec: "See FinTech Case Studies", image: "Abstract financial data visualization — transaction networks, risk heat maps, compliance flows" },
    challenge: { headline: "The FinTech Compliance-Innovation Paradox", paragraphs: ["You need to move fast to compete with neobanks and insurtechs. But SOC 2, PCI-DSS, and state regulations mean you can't move recklessly.", "Legacy core banking systems are brittle. Fraud is evolving faster than rule-based systems can keep up. And your customers expect the same personalization from their bank that they get from Netflix."], punchline: "mVerve engineers compliant, production-grade AI that lets you innovate within guardrails — not despite them.", image: "FinTech architecture: compliance layer wrapping innovation engine, real-time fraud detection flows" },
    solutions: { headline: "Four Capabilities for Intelligent Finance", cards: [
      { tag: "FRAUD & RISK", tagColor: T.cyan, title: "Real-Time Fraud Detection AI", desc: "ML models that detect fraud in milliseconds, adapt to new patterns, and reduce false positives. Real-time transaction monitoring at scale.", link: "Intelligent Automation", accent: T.cyan },
      { tag: "UNDERWRITING", tagColor: T.blue, title: "AI-Powered Underwriting & Claims", desc: "Automated underwriting models, intelligent claims processing, and risk scoring that reduces processing time from days to minutes.", link: "Generative AI Solutions" },
      { tag: "PERSONALIZATION", tagColor: T.blue, title: "Hyper-Personalized Financial Products", desc: "ML-driven product recommendations, dynamic pricing, and next-best-action engines that drive cross-sell and retention.", link: "Digital Experience" },
      { tag: "COMPLIANCE", tagColor: T.green, title: "RegTech & Compliance Automation", desc: "Automated KYC/AML, real-time regulatory monitoring, and audit-ready reporting. Stay compliant without slowing down.", link: "Data Engineering", accent: T.green },
    ]},
    spotlight: null,
    metrics: [
      { val: "94%", label: "Fraud detection accuracy", color: T.cyan },
      { val: "85%", label: "Reduction in false positives", color: T.blue },
      { val: "3 min", label: "Underwriting decision (was 3 days)", color: T.green },
      { val: "100%", label: "SOC 2 / PCI-DSS compliance", color: T.amber },
    ],
    caseStudies: [
      { tag: "FRAUD DETECTION", tagColor: T.cyan, accentColor: T.cyan, title: "Real-Time Fraud Detection for Digital Payments Platform", desc: "Deployed ML fraud detection processing 100K+ transactions/second. Replaced rule-based system with ensemble model achieving 94% detection rate with 85% fewer false positives.", metrics: [{ val: "94%", label: "Detection rate", color: T.cyan }, { val: "85%", label: "Fewer false positives", color: T.blue }, { val: "< 50ms", label: "Decision latency", color: T.green }] },
    ],
    techStack: [
      { category: "Financial & Compliance", items: ["Plaid", "Stripe Connect", "Marqeta", "Socure KYC", "Alloy"] },
      { category: "AI & Data", items: ["PyTorch", "Snowflake", "Databricks", "Apache Flink", "Feature Store"] },
      { category: "Cloud & Security", items: ["AWS (FinTech)", "Azure", "Kubernetes", "Vault", "Terraform"] },
    ],
    idealClient: { headline: "Is This You?", sub: "We work with FinTech companies and insurers ready to deploy production-grade AI.", items: [
      { text: "You're a FinTech or insurer and your fraud detection relies on static rules", color: T.cyan },
      { text: "Your underwriting or claims processing takes days instead of minutes", color: T.blue },
      { text: "You need AI that meets SOC 2 / PCI-DSS from day one", color: T.cyan },
      { text: "You want Netflix-grade personalization within financial services compliance", color: T.blue },
    ]},
    cta: { headline: ["Intelligent Finance.", "Engineered for Trust."], sub: "Start with a FinTech AI Assessment. We'll audit your data infrastructure, identify high-impact AI opportunities, and build a compliance-first roadmap.", button: "Book a FinTech Assessment", gradient: `linear-gradient(135deg, ${T.cyan}, #0891B2)` },
  },
};

/* ═══════════════════════════════════════════════════════════════════
   SECTION COMPONENTS — All data-driven from INDUSTRIES config
   ═══════════════════════════════════════════════════════════════════ */

function IndustryHero({ d }) {
  const [ref, vis] = useReveal(0.1);
  const Icon = d.icon;
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div variants={fadeIn} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <Badge color={d.accent}>{d.hero.overline}</Badge>
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 700, color: T.onDark, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          {d.hero.headline[0]}<br />{d.hero.headline[1]}
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontSize: "clamp(16px, 1.8vw, 18px)", color: T.onDarkSec, marginTop: 20, lineHeight: 1.7, maxWidth: 620 }}>
          {d.hero.sub}
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Btn color={d.accent}>{d.hero.cta} <ArrowRight size={16} /></Btn>
          <Btn primary={false}>{d.hero.ctaSec}</Btn>
        </motion.div>
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "42%", pointerEvents: "none" }}>
        <Placeholder label={d.hero.image} h="100%" dark radius={0} />
      </div>
    </motion.section>
  );
}

function IndustryChallenge({ d }) {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: w >= 900 ? "1.4fr 1fr" : "1fr", gap: 48 }}>
        <div>
          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 700, color: T.text, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            {d.challenge.headline}
          </motion.h2>
          {d.challenge.paragraphs.map((p, i) => (
            <motion.p key={i} variants={fadeUp} style={{ fontSize: 15, color: T.textSec, lineHeight: 1.8, marginTop: i === 0 ? 24 : 16 }}>{p}</motion.p>
          ))}
          <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.text, lineHeight: 1.8, marginTop: 16, fontWeight: 600 }}>
            {d.challenge.punchline}
          </motion.p>
        </div>
        <motion.div variants={fadeUp}>
          <Placeholder label={d.challenge.image} h={360} />
        </motion.div>
      </div>
    </motion.section>
  );
}

function IndustrySolutions({ d }) {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  const [hovered, setHovered] = useState(null);
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={d.accent}>OUR APPROACH</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          {d.solutions.headline}
        </motion.h2>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "1fr 1fr" : "1fr", gap: 20, marginTop: 36 }}>
          {d.solutions.cards.map((c, i) => {
            const isHov = hovered === i;
            return (
              <motion.div key={i} variants={fadeUp}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                style={{
                  background: T.darkCard, borderRadius: 10, padding: 28,
                  border: `1px solid ${isHov ? (c.accent || c.tagColor) + "40" : T.borderDark}`,
                  borderLeft: c.accent ? `3px solid ${c.accent}` : undefined,
                  transform: isHov ? "translateY(-3px)" : "none",
                  transition: "all 0.25s", cursor: "default",
                }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: c.tagColor, marginBottom: 10, fontWeight: 600 }}>{c.tag}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: T.onDark, marginBottom: 10 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7 }}>{c.desc}</div>
                <div style={{ marginTop: 14, fontFamily: "monospace", fontSize: 11, color: c.tagColor }}>Service: {c.link}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

function IndustrySpotlight({ d }) {
  if (!d.spotlight) return null;
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.darkAlt, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={T.amber}>{d.spotlight.overline}</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, color: T.onDark, lineHeight: 1.15 }}>
          {d.spotlight.headline}
        </motion.h2>
        {d.spotlight.body.map((p, i) => (
          <motion.p key={i} variants={fadeUp} style={{ fontSize: 15, color: i === d.spotlight.body.length - 1 ? T.onDark : T.onDarkSec, lineHeight: 1.8, marginTop: i === 0 ? 20 : 14, fontWeight: i === d.spotlight.body.length - 1 ? 600 : 400 }}>{p}</motion.p>
        ))}

        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 900 ? "repeat(3, 1fr)" : "1fr", gap: 16, marginTop: 32 }}>
          {d.spotlight.capabilities.map((c, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 20, border: `1px solid ${T.borderDark}` }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.onDark, marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: T.onDarkSec, lineHeight: 1.7 }}>{c.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
          <Placeholder label={d.spotlight.image} h={240} dark />
        </motion.div>
      </div>
    </motion.section>
  );
}

function IndustryMetrics({ d }) {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.dark, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: 24, fontWeight: 700, color: T.onDark, textAlign: "center", marginBottom: 40 }}>
          The Numbers That Matter
        </motion.h2>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {d.metrics.map((m, i) => (
            <Counter key={i} value={m.val} label={m.label} color={m.color} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function IndustryCaseStudies({ d }) {
  const [ref, vis] = useReveal();
  const [active, setActive] = useState(0);
  const cs = d.caseStudies;
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 12 }}>
          <Badge color={d.accent}>PROOF FROM THE FIELD</Badge>
        </motion.div>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.text, lineHeight: 1.15 }}>
          What This Looks Like in Practice
        </motion.h2>

        {/* Case study tabs */}
        {cs.length > 1 && (
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
            {cs.map((c, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "monospace", background: active === i ? `${c.tagColor}15` : T.lightBg, color: active === i ? c.tagColor : T.textMuted, transition: "all 0.2s" }}>
                {c.tag}
              </button>
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
            style={{ marginTop: 24, borderRadius: 12, border: `1px solid ${T.border}`, borderLeft: `3px solid ${cs[active].accentColor}`, padding: 32, background: T.white }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: cs[active].tagColor, marginBottom: 8, fontWeight: 600 }}>CASE STUDY: {cs[active].tag}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 12 }}>{cs[active].title}</div>
            <div style={{ fontSize: 14, color: T.textSec, lineHeight: 1.8 }}>{cs[active].desc}</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginTop: 24 }}>
              {cs[active].metrics.map((m, i) => (
                <div key={i} style={{ background: T.light, borderRadius: 8, padding: 16, textAlign: "center", border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4, lineHeight: 1.4 }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <Btn small color={d.accent}>Read Full Case Study <ArrowRight size={14} /></Btn>
              <Btn small ghost>See All {d.name.split("&")[0].trim()} Stories</Btn>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function IndustryTechStack({ d }) {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.light, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
          <Badge color={T.textMuted}>TECHNOLOGY STACK</Badge>
        </motion.div>
        {d.techStack.map((cat, ci) => (
          <motion.div key={ci} variants={fadeUp} style={{ marginTop: ci > 0 ? 24 : 0 }}>
            <div style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 600, color: T.textSec, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{cat.category}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.items.map((item, ii) => (
                <span key={ii} style={{ fontFamily: "monospace", fontSize: 12, padding: "6px 14px", borderRadius: 6, background: T.white, color: T.textSec, border: `1px solid ${T.border}` }}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function IndustryIdealClient({ d }) {
  const [ref, vis] = useReveal();
  const w = useWindowSize();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: T.white, padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: T.text, lineHeight: 1.15, textAlign: "center" }}>
          {d.idealClient.headline}
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: T.textSec, textAlign: "center", marginTop: 8, maxWidth: 550, margin: "8px auto 0" }}>
          {d.idealClient.sub}
        </motion.p>
        <motion.div variants={stagger} style={{ display: "grid", gridTemplateColumns: w >= 700 ? "1fr 1fr" : "1fr", gap: 14, marginTop: 36 }}>
          {d.idealClient.items.map((item, i) => (
            <motion.div key={i} variants={fadeUp}
              style={{ display: "flex", gap: 12, padding: 18, borderRadius: 8, background: T.light, borderLeft: `3px solid ${item.color}`, border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: item.color }}>
              <CheckCircle2 size={18} color={item.color} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 14, color: T.textSec, lineHeight: 1.6 }}>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function IndustryCTA({ d }) {
  const [ref, vis] = useReveal();
  return (
    <motion.section ref={ref} initial="hidden" animate={vis ? "visible" : "hidden"} variants={stagger}
      style={{ background: d.cta.gradient, padding: "100px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>
          {d.cta.headline[0]}<br />{d.cta.headline[1]}
        </motion.h2>
        <motion.p variants={fadeUp} style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 16, lineHeight: 1.8 }}>
          {d.cta.sub}
        </motion.p>
        <motion.div variants={fadeUp} style={{ marginTop: 32 }}>
          <Btn pill color="#fff">
            <span style={{ color: T.text }}>{d.cta.button}</span> <ArrowRight size={16} color={T.text} />
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

/* ═══════════════════════════════════════════
   NAVBAR — Industry Switcher
   ═══════════════════════════════════════════ */
function Nav({ activeId, onSwitch }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const w = useWindowSize();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const tabs = Object.values(INDUSTRIES);
  const current = INDUSTRIES[activeId];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(10,10,15,0.96)" : "rgba(10,10,15,0.75)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? T.borderDark : "transparent"}`, transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{ width: 30, height: 30, background: T.blue, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>m</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, color: T.onDark, letterSpacing: "-0.02em" }}>mVerve</span>
          <span style={{ fontSize: 12, color: T.onDarkMuted, marginLeft: 8 }}>Industries</span>
        </div>

        {w >= 900 ? (
          <div style={{ display: "flex", gap: 2 }}>
            {tabs.map(t => {
              const Icon = t.icon;
              const isActive = t.id === activeId;
              return (
                <button key={t.id} onClick={() => { onSwitch(t.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, background: isActive ? `${t.accent}20` : "transparent", color: isActive ? t.accent : T.onDarkMuted, transition: "all 0.2s" }}>
                  <Icon size={13} /> {t.name.split("&")[0].trim()}
                </button>
              );
            })}
          </div>
        ) : (
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: T.onDark }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        <AnimatePresence>
          {scrolled && w >= 900 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Btn small pill color={current.accent}>Let's Talk <ArrowRight size={14} /></Btn>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && w < 900 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden", borderTop: `1px solid ${T.borderDark}` }}>
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => { onSwitch(t.id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "14px 24px", border: "none", background: t.id === activeId ? `${t.accent}10` : "transparent", color: t.id === activeId ? t.accent : T.onDarkSec, fontSize: 14, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                  <Icon size={16} /> {t.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN APP — Template-driven Industry Page
   ═══════════════════════════════════════════════════════════════════ */
/* Page content export for prototype assembly */
export function ManufacturingContent({ navigate }) {
  const d = INDUSTRIES["manufacturing"];
  return (
    <>
      <IndustryHero d={d} />
      <IndustryChallenge d={d} />
      <IndustrySolutions d={d} />
      {d.spotlight && <IndustrySpotlight d={d} />}
      <IndustryMetrics d={d} />
      <IndustryCaseStudies d={d} />
      <IndustryTechStack d={d} />
      <IndustryIdealClient d={d} />
      <IndustryCTA d={d} />
    </>
  );
}

export default function MVerveIndustryPage() {
  const [activeId, setActiveId] = useState("manufacturing");
  const d = INDUSTRIES[activeId];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <Nav activeId={activeId} onSwitch={setActiveId} />

      <AnimatePresence mode="wait">
        <motion.div key={activeId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <IndustryHero d={d} />
          <IndustryChallenge d={d} />
          <IndustrySolutions d={d} />
          {d.spotlight && <IndustrySpotlight d={d} />}
          <IndustryMetrics d={d} />
          <IndustryCaseStudies d={d} />
          <IndustryTechStack d={d} />
          <IndustryIdealClient d={d} />
          <IndustryCTA d={d} />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
