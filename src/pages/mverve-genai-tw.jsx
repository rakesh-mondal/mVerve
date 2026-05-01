import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";

const PROBLEMS = [
  { h: "Demos that don't survive contact with reality.", d: "Most enterprise GenAI pilots stall in production because they were built without eval, observability, or a clear owner for failure modes." },
  { h: "Hallucination as a feature, not a bug.", d: "If your model can confidently make things up about your business, you don't have a product — you have a liability." },
  { h: "Cost curves that don't add up.", d: "An impressive proof-of-concept can quietly become a five-figure monthly bill the moment you put it in front of real users." },
];

const CAPABILITIES = [
  { tag: "RAG", t: "Retrieval-Augmented Generation", d: "Grounded answers built on your own corpus — with citations, freshness controls, and verifiable sources." },
  { tag: "Agents", t: "Agentic Workflows", d: "Multi-step agents that operate inside your tools using MCP, with clear escalation paths to humans." },
  { tag: "Fine-tuning", t: "Domain-tuned Models", d: "Continued pre-training and SFT on your data, evaluated against the tasks you actually care about." },
  { tag: "Eval", t: "Evals & Observability", d: "Eval harnesses, regression suites, and tracing that catch drift before your customers do." },
];

const PHASES = [
  { n: "01", t: "Discovery", d: "Two weeks. We map workflows, data, and the specific decisions where AI moves a metric." },
  { n: "02", t: "Spike", d: "Two to four weeks. A working slice in your stack — production-grade infra, lightweight UI, real evals." },
  { n: "03", t: "Pilot", d: "Six to eight weeks. Real users, real data, real KPIs. Iterate weekly with the people who'll own it." },
  { n: "04", t: "Hand-off", d: "Two weeks. Runbooks, eval suites, observability, and on-call rotations transferred to your team." },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-40 top-20 w-[560px] h-[560px] opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        <path d="M40 480 Q 320 40 600 480" stroke="#CF4520" strokeWidth="14" strokeLinecap="round" />
        <path d="M40 520 Q 320 200 600 520" stroke="#CF4520" strokeWidth="1" opacity="0.4" />
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          Generative AI Solutions
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["GenAI that earns", "its keep —", "in production."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(44px,8vw,132px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            We build retrieval pipelines, domain-tuned models, and agentic workflows that ship to real users — with the evaluation, observability, and cost discipline that turns AI demos into AI products.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">Why most GenAI fails</div>
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
              Four shapes a real GenAI <span className="italic">product</span> takes.
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

function Methodology() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">From idea to production</div>
        <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-cream max-w-[18ch] mb-16">
          A four-phase rhythm. <span className="italic text-cream/70">Twelve weeks, give or take.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-cream/10">
          {PHASES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-ink p-8 lg:p-10 min-h-[260px] flex flex-col justify-between">
              <div className="font-mono text-[11px] tracking-[0.2em] text-coral">{p.n}</div>
              <div>
                <div className="font-display text-3xl lg:text-4xl font-light text-cream mb-3">{p.t}</div>
                <p className="text-[14px] leading-relaxed text-cream/65">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GenAIContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <Problem />
      <Capabilities />
      <Methodology />
    </PageShell>
  );
}

export default GenAIContent;
