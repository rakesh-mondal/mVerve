import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/SiteLayout";
import { EditorialFigure } from "../components/Visuals";
import labImg from "../assets/ai-lab-rnd.png";

const CAPABILITIES = [
  { tag: "Generative AI", t: "Custom LLMs & Agents", d: "Domain-tuned models, retrieval pipelines, and agentic workflows for the messy realities of industrial operations.", route: "genai" },
  { tag: "Automation", t: "Intelligent Automation", d: "Process intelligence + ML to automate the work spreadsheets and ticketing systems can't.", route: "automation" },
  { tag: "GreenOps", t: "Sustainable AI", d: "Carbon-aware training, inference, and infrastructure. Lower emissions and lower bills, by design.", route: "greenops" },
  { tag: "Data", t: "Data Strategy & Engineering", d: "The unglamorous, foundational work that makes any of the above actually viable in production.", route: "data-strategy" },
];

const PRINCIPLES = [
  { n: "01", t: "AI in the loop, not on the loop.", d: "Models support decisions taken by humans accountable for the outcome — not the other way around." },
  { n: "02", t: "Production from week one.", d: "Every prototype runs on the same infrastructure that will hold it in production. No throwaway demos." },
  { n: "03", t: "Evaluate the way you'll operate.", d: "Eval suites for safety, regression, and drift — running before, during, and after every deploy." },
  { n: "04", t: "Privacy is non-negotiable.", d: "Sensitive data stays in your perimeter. Self-hosted models when the contract demands it." },
];

const STACK = [
  { h: "Models", l: ["Claude Sonnet 4.6", "Llama 3 / 4 (self-hosted)", "OpenAI gpt-4 series", "Custom fine-tunes"] },
  { h: "Tooling", l: ["MCP", "LangChain (prototype)", "LangGraph", "DSPy", "Weights & Biases"] },
  { h: "Infrastructure", l: ["AWS Bedrock · SageMaker", "Azure OpenAI", "vLLM", "Ray", "Kubernetes"] },
  { h: "Eval & safety", l: ["LangSmith", "Promptfoo", "Custom eval harness", "Guardrails AI"] },
];

function Hero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <motion.svg className="absolute -right-24 sm:-right-32 top-32 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] opacity-30 sm:opacity-90 pointer-events-none" viewBox="0 0 640 640" fill="none">
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx="320" cy="320" r={40 + i * 38} stroke="#CF4520" strokeWidth="1" opacity={0.5 - i * 0.05} />
        ))}
      </motion.svg>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 lg:mb-8 flex items-center">
          <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
          The mVerve AI & Innovation Lab
        </motion.div>
        <h1 className="font-display text-ink leading-[0.95] tracking-[-0.02em]">
          {["Where AI", "meets industrial", "intelligence."].map((line, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`block text-[clamp(48px,8vw,138px)] font-light ${i === 1 ? "italic text-coral" : ""}`}>
              {line}
            </motion.span>
          ))}
        </h1>
        <div className="grid grid-cols-12 gap-6 mt-12 lg:mt-16">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="col-span-12 lg:col-span-5 lg:col-start-7 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft">
            The Lab is mVerve's R&D engine — where we build the custom LLMs, agentic workflows, and sustainable AI systems that move our clients' operations. Production-grade from day one.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Capabilities({ navigate }) {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Four capabilities</div>
            <h2 className="font-display text-[clamp(36px,4.5vw,68px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              One Lab. Four <span className="italic">disciplines.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15">
          {CAPABILITIES.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => navigate && navigate(c.route)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-cream p-8 lg:p-12 text-left group hover:bg-paper transition-colors flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">{c.tag}</div>
                <div className="font-display text-[clamp(26px,2.6vw,38px)] leading-[1.05] font-light text-ink mb-4 group-hover:italic transition-all">{c.t}</div>
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{c.d}</p>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-ink link-reveal">
                Explore <ArrowUpRight size={14} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Operating principles</div>
            <h2 className="font-display text-[clamp(40px,5vw,76px)] leading-[1] tracking-[-0.02em] font-light text-ink">
              How we build with <span className="italic">AI.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {PRINCIPLES.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }} className="border-t border-ink pt-5">
              <div className="font-mono text-[10px] tracking-[0.2em] text-coral mb-3">{p.n}</div>
              <div className="font-display text-[clamp(24px,2.6vw,34px)] leading-tight font-light text-ink mb-3">{p.t}</div>
              <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCase() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-ink text-cream">
      <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-6">Featured engagement</div>
          <h2 className="font-display text-[clamp(36px,4.5vw,72px)] leading-[1] tracking-[-0.02em] font-light text-cream">
            A custom LLM that <span className="italic">underwrites</span> insurance in 90 seconds.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 space-y-6 text-[16px] lg:text-[18px] leading-relaxed text-cream/75">
          <p>A specialty insurer was losing deals to faster competitors because their underwriting cycle averaged five days. We built a domain-tuned LLM that reads their submission packets, retrieves the relevant policy precedents, and drafts a recommendation an underwriter can accept, edit, or reject in under two minutes.</p>
          <p>The model never auto-approves. The underwriter is still on the hook. But the work that took two senior people half a day now takes one of them two minutes.</p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-cream/20">
            {[
              { v: "90s", l: "Median draft latency" },
              { v: "76%", l: "Submissions auto-drafted" },
              { v: "0", l: "Auto-approvals (ever)" },
            ].map((m, i) => (
              <div key={i}>
                <div className="font-display text-3xl lg:text-5xl font-light text-coral leading-tight">{m.v}</div>
                <div className="text-[12px] text-cream/50 mt-2 font-mono tracking-wider uppercase">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="px-6 lg:px-10 py-20 lg:py-28 bg-cream-deep border-y border-rule">
      <div className="max-w-[1440px] mx-auto">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-10">The Lab's stack</div>
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

function LabShot() {
  return (
    <section className="px-0 lg:px-10 pb-4">
      <div className="max-w-[1440px] mx-auto">
        <EditorialFigure caption="The Lab · R&D bench">
          <img
            src={labImg}
            alt="AI research lab — long workbench with multiple monitors showing token streams and architecture diagrams, single overhead pendant, coral glow on a GPU rack"
            className="w-full block"
            style={{ aspectRatio: "21/9", objectFit: "cover" }}
          />
        </EditorialFigure>
      </div>
    </section>
  );
}

export function AILabHubContent({ navigate }) {
  return (
    <PageShell navigate={navigate}>
      <Hero />
      <LabShot />
      <Capabilities navigate={navigate} />
      <Principles />
      <FeaturedCase />
      <Stack />
    </PageShell>
  );
}

export default AILabHubContent;
