import { Outlet } from "react-router-dom";
import PageWrapper from "./PageWrapper";

import { HomepageContent } from "./pages/mverve-home-thoughtworks";
import { ContactContent } from "./pages/mverve-contact-tw";
import { CareersContent } from "./pages/mverve-careers-tw";
import { AILabHubContent } from "./pages/mverve-ailab-tw";
import { GenAIContent } from "./pages/mverve-genai-tw";
import { ExpertiseHubContent } from "./pages/mverve-expertise-tw";
import { CloudNativeContent } from "./pages/mverve-cloud-native-tw";
import { ManufacturingContent } from "./pages/mverve-manufacturing-tw";
import { TechRadarContent } from "./pages/mverve-techradar-tw";
import { AutomationContent } from "./pages/mverve-automation-tw";
import { GreenOpsContent } from "./pages/mverve-greenops-tw";
import { MVPIncubatorContent } from "./pages/mverve-mvp-incubator-tw";
import { DataStrategyContent } from "./pages/mverve-data-strategy-tw";
import { ModernizationContent } from "./pages/mverve-modernization-tw";
import { PlatformContent } from "./pages/mverve-platform-tw";
import { ExperienceContent } from "./pages/mverve-experience-tw";
import { ProductStrategyContent } from "./pages/mverve-product-strategy-tw";
import { ServiceDesignContent } from "./pages/mverve-service-design-tw";
import { AgilePodsContent } from "./pages/mverve-agile-pods-tw";
import { ConsultingContent } from "./pages/mverve-consulting-tw";
import { CleanTechContent } from "./pages/mverve-cleantech-tw";
import { HealthcareContent } from "./pages/mverve-healthcare-tw";
import { SuccessStoriesContent } from "./pages/mverve-success-stories-tw";
import { WhitePapersContent } from "./pages/mverve-white-papers-tw";
import { PrivacyContent } from "./pages/mverve-privacy-tw";
import { TermsContent } from "./pages/mverve-terms-tw";

// Each route gets its own pre-rendered HTML file at build time.
const PAGES = [
  { path: "/", Component: HomepageContent, title: "mVerve — AI-Native Engineering for the Industrial Future", desc: "mVerve builds AI-powered platforms, modernizes legacy infrastructure, and deploys carbon-aware technology so mid-market industrial enterprises can compete like the giants." },

  { path: "/ai-lab", Component: AILabHubContent, title: "AI & Innovation Lab — mVerve", desc: "Where AI meets industrial intelligence. mVerve's R&D engine for custom LLMs, agentic workflows, and sustainable AI." },
  { path: "/genai", Component: GenAIContent, title: "Generative AI Solutions — mVerve", desc: "Production-grade GenAI: custom LLMs, RAG pipelines, agentic systems, and evaluation frameworks built for enterprise constraints." },
  { path: "/automation", Component: AutomationContent, title: "Intelligent Automation — mVerve", desc: "Process intelligence and automation that targets the friction your operations team already feels — not the one consultants invent." },
  { path: "/greenops", Component: GreenOpsContent, title: "Sustainable AI (GreenOps) — mVerve", desc: "Carbon-aware compute, model efficiency, and measurable Scope-2 reduction across your AI and cloud workloads." },
  { path: "/mvp-incubator", Component: MVPIncubatorContent, title: "The MVP Incubator — mVerve", desc: "Senior-led, full-stack pods that take a hypothesis to a shipping product in 8–12 weeks — not 8–12 months." },
  { path: "/data-strategy", Component: DataStrategyContent, title: "Data Strategy & Engineering — mVerve", desc: "Data platforms, governance, and engineering for industrial enterprises — built so AI and BI both work on the same source of truth." },

  { path: "/expertise", Component: ExpertiseHubContent, title: "Expertise — mVerve", desc: "Eight engineering disciplines, one standard: production-grade outcomes that move business metrics." },
  { path: "/cloud-native", Component: CloudNativeContent, title: "Cloud-Native Engineering — mVerve", desc: "Containers, microservices, infrastructure-as-code — and the discipline to keep them boring." },
  { path: "/modernization", Component: ModernizationContent, title: "Enterprise Modernization — mVerve", desc: "Strangler-fig migrations, API layering, and the unglamorous work of getting off legacy without going dark." },
  { path: "/platform", Component: PlatformContent, title: "Platform Engineering — mVerve", desc: "Internal developer platforms that make 'the right thing' also 'the easy thing.'" },
  { path: "/experience", Component: ExperienceContent, title: "Digital Experience — mVerve", desc: "Editorial-grade frontends with the performance budget enterprise sites usually fail." },
  { path: "/product-strategy", Component: ProductStrategyContent, title: "Product Strategy & Design — mVerve", desc: "Senior product thinking embedded in engineering, not bolted on at kickoff." },
  { path: "/service-design", Component: ServiceDesignContent, title: "Service Design — mVerve", desc: "End-to-end design for products that touch operations, ops people, and physical artifacts." },
  { path: "/agile-pods", Component: AgilePodsContent, title: "Agile Pods — mVerve", desc: "Senior-led, full-stack teams that ship in two-week sprints with the autonomy to actually do it." },
  { path: "/consulting", Component: ConsultingContent, title: "Technical Consulting — mVerve", desc: "Architecture reviews, due diligence, and second opinions — from people who would build it themselves." },

  { path: "/manufacturing", Component: ManufacturingContent, title: "Manufacturing & Industry 4.0 — mVerve", desc: "From shop floor to smart factory — without rewriting everything. Predictive maintenance, OEE intelligence, ERP modernization." },
  { path: "/cleantech", Component: CleanTechContent, title: "CleanTech & Sustainability — mVerve", desc: "The energy transition is a software engineering problem. Asset intelligence, carbon-aware compute, ESG accounting for cleantech operators." },
  { path: "/healthcare", Component: HealthcareContent, title: "Healthcare & Life Sciences — mVerve", desc: "Clinical-grade software for healthcare and life-sciences operators — HIPAA-compliant, FDA-aware, audit-ready." },

  { path: "/tech-radar", Component: TechRadarContent, title: "mVerve Tech Radar", desc: "What we adopt, trial, assess, and hold. Quarterly engineering opinions, signed by principals." },
  { path: "/success-stories", Component: SuccessStoriesContent, title: "Success Stories — mVerve", desc: "Real engagements. Real outcomes. Real numbers — for manufacturing, cleantech, and healthcare clients." },
  { path: "/white-papers", Component: WhitePapersContent, title: "White Papers — mVerve", desc: "Practical writing from the engineers shipping the work. Field-tested playbooks and reference architectures." },

  { path: "/contact", Component: ContactContent, title: "Contact — mVerve", desc: "No pitch decks. No bench rotations. An honest conversation with senior engineers who understand your domain." },
  { path: "/careers", Component: CareersContent, title: "Careers — mVerve", desc: "Senior engineers, principal-led work, and the autonomy to ship. Open roles at mVerve." },
  { path: "/privacy", Component: PrivacyContent, title: "Privacy Policy — mVerve", desc: "How mVerve Technologies collects, uses, and protects your personal data." },
  { path: "/terms", Component: TermsContent, title: "Terms of Use — mVerve", desc: "Terms and conditions that govern your access to and use of the mVerve Technologies website." },
];

const Layout = () => <Outlet />;

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: PAGES.map((p) => ({
      path: p.path === "/" ? undefined : p.path.slice(1),
      index: p.path === "/" ? true : undefined,
      element: <PageWrapper Component={p.Component} path={p.path} />,
      entry: undefined,
    })),
  },
];

// SEO map — used by main.jsx to inject per-route meta during SSG.
export const SEO_MAP = Object.fromEntries(
  PAGES.map((p) => [p.path, { title: p.title, desc: p.desc }])
);

// Export the page list for sitemap generation
export const ALL_PATHS = PAGES.map((p) => p.path);
