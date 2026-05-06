import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { HiggsfieldPlaceholder } from "../components/Visuals";

const PROBLEMS = [
  { h: "Every team reinvents CI, observability, and auth.", d: "Without a platform, every team writes the same boilerplate, makes the same mistakes, and ships at half the speed they could." },
  { h: "Cognitive load is the silent productivity tax.", d: "Engineers shouldn't have to learn five tools to deploy a service. The platform's job is to make 'the right thing' also 'the easy thing.'" },
  { h: "Internal tools that nobody adopts.", d: "Most internal platforms fail because they're built like infrastructure. We build them like products — with users, roadmaps, and KPIs." },
];

const CAPABILITIES = [
  { tag: "Golden Paths", t: "The boring default that ships.", d: "Opinionated paths for service creation, deploy, observability, and on-call — covering 80% of cases without a single Jira ticket." },
  { tag: "Self-Serve Infra", t: "Terraform behind a friendly API.", d: "Engineers provision compute, databases, queues, and DNS through Backstage or a CLI. Platform team approves the templates, not every request." },
  { tag: "Developer Experience", t: "DX as a measurable KPI.", d: "Time-to-first-deploy. Time-to-fix-incident. Lead time. We instrument the platform like any other product and iterate weekly." },
  { tag: "Platform-as-Product", t: "Roadmap, users, success metrics.", d: "The platform team has product owners, design partners, and quarterly reviews. Adoption is earned, not mandated." },
];

const PRINCIPLES = [
  { n: "01", t: "Treat the platform like a product.", d: "Engineers are users. Adoption is the success metric. Build accordingly." },
  { n: "02", t: "Golden paths, not golden cages.", d: "Provide the easy default. Allow escape hatches. Document them." },
  { n: "03", t: "Buy boring, build value.", d: "Backstage, ArgoCD, Datadog, Postgres. The differentiation is in the integration, not the components." },
  { n: "04", t: "Measure DX like uptime.", d: "If you can't graph it, you can't improve it. Lead time, deploy frequency, MTTR — instrumented from day one." },
];

const STACK = [
  { h: "Platform spine", l: ["Backstage", "ArgoCD", "Crossplane", "Terraform", "Kubernetes"] },
  { h: "Developer tools", l: ["GitHub Actions", "Renovate", "Buildkite", "Earthly", "Nx"] },
  { h: "Observability", l: ["Datadog", "Grafana", "OpenTelemetry", "PagerDuty", "Honeycomb"] },
  { h: "Identity & policy", l: ["Okta · Auth0", "OPA · Cedar", "Vault", "Permit.io"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-32 top-32 w-[500px] h-[500px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <rect x="60" y="60" width="520" height="120" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
        <rect x="60" y="220" width="520" height="120" stroke="#CF4520" strokeWidth="1" opacity="0.5" />
        <rect x="60" y="380" width="520" height="120" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Platform Engineering
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["The right thing,", "and the easy thing,", "are the same thing."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(40px,7vw,118px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Internal developer platforms that turn 'every team reinvents the wheel' into 'every team ships on Tuesday.' Built like products — with users, roadmaps, and the DX metrics to prove it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Why platform programs fail</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {PROBLEMS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-cream-deep p-8 lg:p-10">
              <div className="font-display text-[clamp(22px,2.4vw,32px)] leading-tight font-light text-ink mb-4 italic">{p.h}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we build</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four pieces of a real <span className="italic">platform.</span>
            </h2>
          </div>
        </div>
        <div className="border-t border-ink/15">
          {CAPABILITIES.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="grid grid-cols-12 gap-6 items-baseline border-b border-ink/15 py-10">
              <div className="col-span-12 lg:col-span-2 font-mono text-[11px] tracking-[0.2em] uppercase text-coral">{c.tag}</div>
              <div className="col-span-12 lg:col-span-3">
                <div className="font-display text-[clamp(24px,2.4vw,32px)] leading-tight font-light text-ink">{c.t}</div>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{c.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Operating principles</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1.05] tracking-[-0.02em] font-light text-cream">
            Four convictions <span className="italic text-cream/70">we ship by.</span>
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-cream/30 pt-5">
              <div className="font-mono text-[10px] tracking-[0.2em] text-coral mb-3">{p.n}</div>
              <div className="font-display text-[24px] lg:text-[28px] font-light text-cream mb-3">{p.t}</div>
              <p className="text-[15px] leading-relaxed text-cream/70">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">The default stack</div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STACK.map((c, i) => (
            <div key={i} className="border-t border-ink pt-6">
              <div className="font-display text-2xl text-ink mb-5 italic">{c.h}</div>
              <ul className="space-y-2">
                {c.l.map((it, j) => (
                  <li key={j} className="text-[14px] text-ink-soft">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoldenPath() {
  const steps = [
    { t: "scaffold", d: "CLI · template" },
    { t: "build", d: "CI · checks" },
    { t: "deploy", d: "ArgoCD" },
    { t: "observe", d: "Datadog · OTel" },
    { t: "on-call", d: "PagerDuty" },
  ];
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Golden path, drawn</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              From <span className="italic">scaffold</span> to <span className="italic">on-call</span> in five steps.
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12 overflow-x-auto">
          <svg viewBox="0 0 1280 240" className="w-full min-w-[900px] h-auto" role="img" aria-label="Platform golden path">
            {steps.map((s, i) => {
              const x = 60 + i * 240;
              return (
                <g key={i}>
                  <rect x={x} y="60" width="200" height="120" fill={i === 0 ? "#CF4520" : "none"} stroke={i === 0 ? "none" : "#0E1116"} strokeWidth="1" />
                  <text x={x + 100} y="92" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill={i === 0 ? "#F5F1EB" : "#0E1116"} textAnchor="middle" opacity={i === 0 ? 0.85 : 0.7}>0{i + 1}</text>
                  <text x={x + 100} y="128" fontFamily="serif" fontStyle="italic" fontSize="22" fill={i === 0 ? "#F5F1EB" : "#0E1116"} textAnchor="middle">{s.t}</text>
                  <text x={x + 100} y="158" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill={i === 0 ? "#F5F1EB" : "#0E1116"} textAnchor="middle" opacity={i === 0 ? 0.75 : 0.6}>{s.d.toUpperCase()}</text>
                  {i < steps.length - 1 && (
                    <g>
                      <line x1={x + 200} y1="120" x2={x + 240} y2="120" stroke="#0E1116" strokeWidth="1" />
                      <polygon points={`${x + 240},115 ${x + 250},120 ${x + 240},125`} fill="#0E1116" />
                    </g>
                  )}
                </g>
              );
            })}
            <text x="640" y="220" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="3" fill="#CF4520" textAnchor="middle">ESCAPE HATCHES DOCUMENTED · NEVER FORCED</text>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 11 · Internal developer platform · Golden path
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function PlatformContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Problems />
      <Capabilities />
      <GoldenPath />
      <Principles />
      <Stack />
    </PageShell>
  );
}

export default PlatformContent;
