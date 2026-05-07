import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import clinicalImg from "../assets/healthcare-clinical.png";

const REALITIES = [
  { h: "EHR data is necessary, insufficient, and difficult.", d: "FHIR, HL7, and the dozen flavours of legacy interface engines describe how the data moves — not how it tells the truth. Cleaning is most of the work." },
  { h: "Compliance is engineering, not checkbox.", d: "HIPAA, SOC 2, HITRUST, and 21 CFR Part 11 each shape architecture in specific ways. Bolt-on compliance becomes a remediation project the moment an auditor opens a laptop." },
  { h: "Clinicians have no patience for bad UX.", d: "Every extra click is a charting minute the clinician will never get back. Software that ignores this is software that gets clicked through, ignored, or actively sabotaged." },
];

const SOLUTIONS = [
  { tag: "Clinical AI", t: "Decision support, not auto-decision.", d: "LLMs and ML models that surface evidence, summarize charts, and draft notes — with the eval, audit, and human-in-the-loop discipline regulators will accept." },
  { tag: "Interop & Data", t: "FHIR-native, EHR-friendly.", d: "Bidirectional FHIR pipelines, HL7 v2 bridges, and clean data layers that make analytics, AI, and patient-facing apps actually viable." },
  { tag: "Patient Platforms", t: "Editorial-grade patient experience.", d: "Onboarding, scheduling, results delivery, and care-team messaging — with accessibility, multilingual support, and clinical safety built in." },
  { tag: "Compliance by Design", t: "HIPAA, HITRUST, SOC 2 from day one.", d: "Reference architectures, BAAs, audit logs, encryption, and access controls engineered into the platform rather than retrofitted before the audit." },
];

const PRINCIPLES = [
  { n: "01", t: "Clinical safety is product safety.", d: "If the tool can produce a wrong recommendation a clinician might miss, the product is unsafe — even if the model is technically right 99% of the time." },
  { n: "02", t: "Compliance from architecture down.", d: "Audit trails, encryption, access policy, and BAA scope decided before a line of code ships. Retrofitting these is the most expensive way to learn them." },
  { n: "03", t: "AI in the loop. Always.", d: "No auto-prescribing, no auto-diagnosing, no auto-billing. Models support decisions taken by humans accountable for the outcome." },
  { n: "04", t: "Design for the clinician's clock.", d: "If it adds even 30 seconds to a charting workflow without saving more elsewhere, it's not deployable. We measure clicks, not just outcomes." },
];

const STACK = [
  { h: "Interop & data", l: ["FHIR R4 / R5", "HL7 v2", "Mirth · Rhapsody", "Snowflake (HIPAA)", "Apache Airflow"] },
  { h: "AI & ML", l: ["Claude Sonnet 4.6", "AWS HealthLake", "Azure Health Data Services", "PyTorch", "Custom eval harness"] },
  { h: "Compliance", l: ["HIPAA", "HITRUST", "SOC 2", "21 CFR Part 11", "GDPR (EU patients)"] },
  { h: "Cloud & DevOps", l: ["AWS (HIPAA-eligible)", "Azure (HITRUST)", "Kubernetes", "Vault", "Datadog"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M320 80 L320 580" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <path d="M80 320 L580 320" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <circle cx="320" cy="320" r="220" stroke="#CF4520" strokeWidth="1" opacity="0.25" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Healthcare & Life Sciences
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["AI in the loop.", "Compliance from day one.", "Built for the clinician's clock."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(36px,6.5vw,110px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            Clinical AI, FHIR-native interop, patient platforms, and compliance-by-design for providers, payers, life-science companies, and digital-health startups operating where clinical safety and regulatory rigor are not optional.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Realities() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">The reality</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/15">
          {REALITIES.map((p, i) => (
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

function Solutions() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">What we engineer</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              Four capabilities <span className="italic">for clinical software.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15">
          {SOLUTIONS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-cream p-8 lg:p-12 group hover:bg-paper transition-colors">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">{s.tag}</div>
              <div className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.1] font-light text-ink mb-4 group-hover:italic transition-all">{s.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{s.d}</p>
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
            Four <span className="italic text-cream/70">non-negotiables.</span>
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
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Tech stack</div>
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

function ClinicalShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="Point of care · Outpatient clinic">
          <img
            src={clinicalImg}
            alt="Modern outpatient clinic exam room — clinician's hands on a tablet, wall-mounted monitor showing a structured patient summary"
            className="w-full block"
            style={{ aspectRatio: "21/9", objectFit: "cover" }}
          />
        </EditorialFigure>
      </div>
    </section>
  );
}

function FHIRDiagram() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Interop, drawn</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              FHIR in. <span className="italic">Decisions out.</span> Audit kept.
            </h2>
          </div>
        </div>
        <figure className="relative bg-paper border border-ink/15 p-6 lg:p-12 overflow-x-auto">
          <svg viewBox="0 0 1280 380" className="w-full min-w-[900px] h-auto" role="img" aria-label="Healthcare data flow">
            {/* EHRs */}
            {[
              { y: 40, t: "EPIC · CERNER" },
              { y: 130, t: "HL7 v2 LEGACY" },
              { y: 220, t: "DEVICE · IOT" },
            ].map((s, i) => (
              <g key={i}>
                <rect x="40" y={s.y} width="200" height="60" fill="none" stroke="#0E1116" strokeWidth="1" />
                <text x="140" y={s.y + 36} fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#0E1116" textAnchor="middle" opacity="0.7">{s.t}</text>
                <line x1="240" y1={s.y + 30} x2="340" y2="170" stroke="#0E1116" strokeWidth="1" opacity="0.5" />
              </g>
            ))}

            {/* FHIR layer */}
            <rect x="340" y="120" width="220" height="100" fill="#CF4520" />
            <text x="450" y="150" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">INTEROP LAYER</text>
            <text x="450" y="180" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#F5F1EB" textAnchor="middle">FHIR R4 / R5</text>

            <line x1="560" y1="170" x2="640" y2="170" stroke="#0E1116" strokeWidth="1" />
            <polygon points="640,165 650,170 640,175" fill="#0E1116" />

            {/* Clinical AI */}
            <rect x="650" y="100" width="240" height="140" fill="none" stroke="#0E1116" strokeWidth="1" />
            <text x="770" y="130" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#0E1116" textAnchor="middle" opacity="0.7">CLINICAL AI</text>
            <text x="770" y="160" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" textAnchor="middle">RAG · summarisation</text>
            <text x="770" y="186" fontFamily="serif" fontStyle="italic" fontSize="20" fill="#0E1116" textAnchor="middle">decision support</text>
            <text x="770" y="218" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="2" fill="#CF4520" textAnchor="middle">HUMAN-IN-LOOP · ALWAYS</text>

            <line x1="890" y1="170" x2="970" y2="170" stroke="#0E1116" strokeWidth="1" />
            <polygon points="970,165 980,170 970,175" fill="#0E1116" />

            {/* Clinician UI */}
            <rect x="980" y="120" width="240" height="100" fill="#0E1116" />
            <text x="1100" y="150" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="2" fill="#F5F1EB" textAnchor="middle" opacity="0.85">CLINICIAN UI</text>
            <text x="1100" y="180" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#F5F1EB" textAnchor="middle">Suggestion → review</text>

            {/* Audit rail */}
            <rect x="40" y="290" width="1180" height="48" fill="none" stroke="#CF4520" strokeWidth="1.5" strokeDasharray="6 4" />
            <text x="630" y="320" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="3" fill="#CF4520" textAnchor="middle">AUDIT TRAIL · HIPAA · HITRUST · 21 CFR PART 11</text>
          </svg>
          <figcaption className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-6">
            Fig. 07 · FHIR-native clinical AI architecture
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function HealthcareContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <ClinicalShot />
      <Realities />
      <Solutions />
      <FHIRDiagram />
      <Principles />
      <Stack />
    </PageShell>
  );
}

export default HealthcareContent;
