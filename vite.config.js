import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const SITE = "https://mverve.com";

// Per-route SEO. Mirrors the PAGES list in src/routes.jsx (kept in sync manually).
const SEO_MAP = {
  "/": { title: "mVerve — AI-Native Engineering for the Industrial Future", desc: "mVerve builds AI-powered platforms, modernizes legacy infrastructure, and deploys carbon-aware technology so mid-market industrial enterprises can compete like the giants." },
  "/ai-lab": { title: "AI & Innovation Lab — mVerve", desc: "Where AI meets industrial intelligence. mVerve's R&D engine for custom LLMs, agentic workflows, and sustainable AI." },
  "/genai": { title: "Generative AI Solutions — mVerve", desc: "Production-grade GenAI: custom LLMs, RAG pipelines, agentic systems, and evaluation frameworks built for enterprise constraints." },
  "/automation": { title: "Intelligent Automation — mVerve", desc: "Process intelligence and automation that targets the friction your operations team already feels — not the one consultants invent." },
  "/greenops": { title: "Sustainable AI (GreenOps) — mVerve", desc: "Carbon-aware compute, model efficiency, and measurable Scope-2 reduction across your AI and cloud workloads." },
  "/mvp-incubator": { title: "The MVP Incubator — mVerve", desc: "Senior-led, full-stack pods that take a hypothesis to a shipping product in 8–12 weeks — not 8–12 months." },
  "/data-strategy": { title: "Data Strategy & Engineering — mVerve", desc: "Data platforms, governance, and engineering for industrial enterprises — built so AI and BI both work on the same source of truth." },
  "/expertise": { title: "Expertise — mVerve", desc: "Eight engineering disciplines, one standard: production-grade outcomes that move business metrics." },
  "/cloud-native": { title: "Cloud-Native Engineering — mVerve", desc: "Containers, microservices, infrastructure-as-code — and the discipline to keep them boring." },
  "/modernization": { title: "Enterprise Modernization — mVerve", desc: "Strangler-fig migrations, API layering, and the unglamorous work of getting off legacy without going dark." },
  "/platform": { title: "Platform Engineering — mVerve", desc: "Internal developer platforms that make 'the right thing' also 'the easy thing.'" },
  "/experience": { title: "Digital Experience — mVerve", desc: "Editorial-grade frontends with the performance budget enterprise sites usually fail." },
  "/product-strategy": { title: "Product Strategy & Design — mVerve", desc: "Senior product thinking embedded in engineering, not bolted on at kickoff." },
  "/service-design": { title: "Service Design — mVerve", desc: "End-to-end design for products that touch operations, ops people, and physical artifacts." },
  "/agile-pods": { title: "Agile Pods — mVerve", desc: "Senior-led, full-stack teams that ship in two-week sprints with the autonomy to actually do it." },
  "/consulting": { title: "Technical Consulting — mVerve", desc: "Architecture reviews, due diligence, and second opinions — from people who would build it themselves." },
  "/manufacturing": { title: "Manufacturing & Industry 4.0 — mVerve", desc: "From shop floor to smart factory — without rewriting everything. Predictive maintenance, OEE intelligence, ERP modernization." },
  "/cleantech": { title: "CleanTech & Sustainability — mVerve", desc: "The energy transition is a software engineering problem. Asset intelligence, carbon-aware compute, ESG accounting for cleantech operators." },
  "/healthcare": { title: "Healthcare & Life Sciences — mVerve", desc: "Clinical-grade software for healthcare and life-sciences operators — HIPAA-compliant, FDA-aware, audit-ready." },
  "/tech-radar": { title: "mVerve Tech Radar", desc: "What we adopt, trial, assess, and hold. Quarterly engineering opinions, signed by principals." },
  "/success-stories": { title: "Success Stories — mVerve", desc: "Real engagements. Real outcomes. Real numbers — for manufacturing, cleantech, and healthcare clients." },
  "/white-papers": { title: "White Papers — mVerve", desc: "Practical writing from the engineers shipping the work. Field-tested playbooks and reference architectures." },
  "/contact": { title: "Contact — mVerve", desc: "No pitch decks. No bench rotations. An honest conversation with senior engineers who understand your domain." },
  "/careers": { title: "Careers — mVerve", desc: "Senior engineers, principal-led work, and the autonomy to ship. Open roles at mVerve." },
  "/privacy": { title: "Privacy Policy — mVerve", desc: "How mVerve Technologies collects, uses, and protects your personal data." },
  "/terms": { title: "Terms of Use — mVerve", desc: "Terms and conditions that govern your access to and use of the mVerve Technologies website." },
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: false,
  },
  ssgOptions: {
    onPageRendered(route, renderedHTML) {
      // route is "/" for the index, "cleantech" (no leading slash) for the rest.
      const key = route === "/" || route === "" ? "/" : `/${route.replace(/^\//, "")}`;
      const meta = SEO_MAP[key];
      if (!meta) return renderedHTML;
      const url = key === "/" ? SITE : `${SITE}${key}`;
      const t = escapeHtml(meta.title);
      const d = escapeHtml(meta.desc);
      const inject = `<title>${t}</title>
  <meta name="description" content="${d}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:site_name" content="mVerve" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />`;
      return renderedHTML.replace(/<title>[^<]*<\/title>/, inject);
    },
  },
});
