import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Linkedin, Twitter, Facebook } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Mega-nav structure (reused across all pages) ─── */
export const NAV_GROUPS = [
  {
    label: "AI & Innovation Lab",
    feat: { t: "The mVerve Innovation Lab", d: "Where AI meets industrial intelligence — custom LLMs, agentic workflows, sustainable AI.", route: "ai-lab" },
    items: [
      { label: "Generative AI Solutions", route: "genai" },
      { label: "Intelligent Automation", route: "automation" },
      { label: "Sustainable AI (GreenOps)", route: "greenops" },
      { label: "MVP Incubator", route: "mvp-incubator" },
      { label: "Data Strategy & Engineering", route: "data-strategy" },
    ],
  },
  {
    label: "Expertise",
    feat: { t: "Engineering Excellence", d: "Eight disciplines. One standard: production-grade outcomes that move business metrics.", route: "expertise" },
    items: [
      { label: "Cloud-Native Engineering", route: "cloud-native" },
      { label: "Enterprise Modernization", route: "modernization" },
      { label: "Platform Engineering", route: "platform" },
      { label: "Digital Experience", route: "experience" },
      { label: "Agile Pods", route: "agile-pods" },
    ],
  },
  {
    label: "Industries",
    feat: { t: "Domain-First Engineering", d: "We learn your world before writing a line of code. Deep expertise across industrial verticals.", route: "manufacturing" },
    items: [
      { label: "Manufacturing & Industry 4.0", route: "manufacturing" },
      { label: "CleanTech & Sustainability", route: "cleantech" },
      { label: "Healthcare & Life Sciences", route: "healthcare" },
    ],
  },
  {
    label: "Insights",
    feat: { t: "Thought Leadership", d: "Our opinionated take on the technologies shaping industrial AI. Updated quarterly.", route: "tech-radar" },
    items: [
      { label: "The Tech Radar", route: "tech-radar" },
      { label: "Success Stories", route: "success-stories" },
      { label: "White Papers", route: "white-papers" },
    ],
  },
];

/* ─── Lenis smooth scroll ─── */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); window.__lenis = null; };
  }, []);
}

/* ─── TopBar ─── */
export function TopBar({ navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    };
  }, [mobileOpen]);

  const go = (route) => {
    setOpenGroup(null);
    setMobileOpen(false);
    if (navigate) navigate(route);
  };

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || openGroup ? "bg-cream/95 backdrop-blur-md border-b border-rule" : "bg-cream/0"
      }`}
      onMouseLeave={handleLeave}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[80px]">
        <button onClick={() => go("")} className="flex items-baseline gap-2 group cursor-pointer">
          <span className="font-display text-2xl lg:text-[30px] font-medium tracking-tight text-ink">
            m<span className="italic font-light">Verve</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-coral group-hover:scale-150 transition-transform" />
        </button>

        {/* Desktop nav — bigger fonts */}
        <nav className="hidden xl:flex items-center gap-2">
          {NAV_GROUPS.map((g) => (
            <button
              key={g.label}
              onMouseEnter={() => handleEnter(g.label)}
              onClick={() => go(g.feat.route)}
              className={`px-4 py-3 text-[16px] font-medium tracking-tight transition-colors ${
                openGroup === g.label ? "text-coral" : "text-ink hover:text-coral"
              }`}
            >
              {g.label}
            </button>
          ))}
          <button
            onClick={() => go("careers")}
            className="px-4 py-3 text-[16px] font-medium tracking-tight text-ink hover:text-coral transition-colors"
          >
            Careers
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("contact")}
            className="hidden sm:inline-flex group items-center gap-2 text-[15px] font-medium text-ink border-b border-ink pb-0.5 hover:text-coral hover:border-coral transition-colors"
          >
            Let's innovate
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            type="button"
            className="xl:hidden relative w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-1.5 text-ink z-[110]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Desktop mega panel — larger items */}
      <AnimatePresence>
        {openGroup && (
          <motion.div
            key={openGroup}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => handleEnter(openGroup)}
            className="hidden xl:block absolute left-0 right-0 top-full bg-cream border-b border-rule"
          >
            <div className="max-w-[1440px] mx-auto px-10 py-14 grid grid-cols-12 gap-10">
              <button
                onClick={() => go(NAV_GROUPS.find((g) => g.label === openGroup).feat.route)}
                className="col-span-5 text-left group"
              >
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-coral mb-4">Featured</div>
                <div className="font-display text-[44px] leading-[1.05] tracking-[-0.02em] font-light text-ink mb-4 group-hover:text-coral transition-colors">
                  {NAV_GROUPS.find((g) => g.label === openGroup).feat.t}
                </div>
                <p className="text-[16px] leading-relaxed text-ink-soft max-w-md">
                  {NAV_GROUPS.find((g) => g.label === openGroup).feat.d}
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-[14px] font-medium text-ink link-reveal">
                  Explore <ArrowUpRight size={15} />
                </span>
              </button>

              <div className="col-span-6 col-start-7 grid grid-cols-1 gap-px bg-rule self-start">
                {NAV_GROUPS.find((g) => g.label === openGroup).items.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => go(it.route)}
                    className="group bg-cream py-5 px-5 flex items-center justify-between hover:bg-paper text-left transition-colors"
                  >
                    <span className="font-display text-[22px] text-ink group-hover:italic group-hover:text-coral transition-all">
                      {it.label}
                    </span>
                    <ArrowUpRight size={20} className="text-ink-muted group-hover:text-coral group-hover:rotate-45 transition-all duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, zIndex: 100 }}
            className="xl:hidden bg-cream overflow-y-auto overscroll-contain"
          >
            <div className="px-6 py-8 pb-32 flex flex-col gap-2">
              {NAV_GROUPS.map((g) => (
                <div key={g.label} className="border-b border-rule py-4">
                  <button
                    type="button"
                    onClick={() => go(g.feat.route)}
                    className="w-full text-left font-display text-[32px] leading-tight font-light text-ink"
                  >
                    {g.label}
                  </button>
                  <div className="mt-3 flex flex-col">
                    {g.items.map((it, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => go(it.route)}
                        className="text-left text-[16px] text-ink-soft hover:text-coral py-2 pl-1"
                      >
                        — {it.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => go("careers")}
                className="border-b border-rule py-5 text-left font-display text-[32px] font-light text-ink"
              >
                Careers
              </button>
              <button
                type="button"
                onClick={() => go("contact")}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-ink text-cream py-4 px-6 text-[15px] font-medium tracking-wide"
              >
                Let's innovate <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Closing CTA ─── */
export function ClosingCTA({ navigate }) {
  return (
    <section className="bg-ink text-cream py-32 lg:py-44 px-6 lg:px-10 relative overflow-hidden">
      <div className="absolute -bottom-32 -right-32 w-[640px] h-[640px] rounded-full bg-coral/30 blur-3xl pointer-events-none" />
      <div className="max-w-[1440px] mx-auto relative">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-coral mb-10">Let's innovate together</div>
        <h2 className="font-display text-[clamp(48px,9vw,160px)] leading-[0.95] tracking-[-0.03em] font-light text-cream max-w-[12ch]">
          Ready to engineer your <span className="italic text-coral">industrial future?</span>
        </h2>
        <div className="grid grid-cols-12 gap-6 mt-16 lg:mt-24">
          <p className="col-span-12 lg:col-span-5 text-[18px] leading-relaxed text-cream/70">
            No pitch decks. No bench rotations. Just an honest conversation with senior engineers who already understand your domain — and what production-grade actually means.
          </p>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col items-start gap-6">
            <button
              onClick={() => navigate && navigate("contact")}
              className="group inline-flex items-center gap-3 font-display italic text-3xl lg:text-4xl text-cream border-b border-cream/40 pb-2 hover:text-coral hover:border-coral transition-colors"
            >
              Start a conversation
              <ArrowUpRight size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <a href="mailto:hello@mverve.tech" className="font-mono text-[12px] tracking-[0.2em] uppercase text-cream/50 hover:text-cream transition-colors">
              hello@mverve.tech
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
export function Footer({ navigate }) {
  const cols = [
    { h: "Expertise", l: [
      { t: "Cloud-Native Engineering", r: "cloud-native" },
      { t: "Enterprise Modernization", r: "modernization" },
      { t: "Platform Engineering", r: "platform" },
      { t: "Digital Experience", r: "experience" },
      { t: "Agile Pods", r: "agile-pods" },
    ]},
    { h: "Industries", l: [
      { t: "Manufacturing & Industry 4.0", r: "manufacturing" },
      { t: "CleanTech & Sustainability", r: "cleantech" },
      { t: "Healthcare & Life Sciences", r: "healthcare" },
    ]},
    { h: "Insights", l: [
      { t: "Tech Radar", r: "tech-radar" },
      { t: "Success Stories", r: "success-stories" },
      { t: "White Papers", r: "white-papers" },
    ]},
    { h: "Company", l: [
      { t: "Careers", r: "careers" },
      { t: "Contact", r: "contact" },
    ]},
  ];

  const socials = [
    { Icon: Linkedin, href: "https://linkedin.com/company/mverve", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com/mverve", label: "Twitter / X" },
    { Icon: Facebook, href: "https://facebook.com/mverve", label: "Facebook" },
  ];

  return (
    <footer className="bg-cream border-t border-ink/20 px-6 lg:px-10 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 lg:col-span-4">
            <div className="font-display text-5xl font-light text-ink mb-6">m<span className="italic">Verve</span><span className="text-coral">.</span></div>
            <p className="text-[15px] leading-relaxed text-ink-soft max-w-sm mb-8">
              AI-Native engineering for the industrial future. Bridging heavy industry and cognitive intelligence.
            </p>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-6">Bengaluru · Maryland</div>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-ink/30 flex items-center justify-center text-ink hover:bg-ink hover:text-cream transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c, i) => (
            <div key={i} className="col-span-6 lg:col-span-2">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-5">{c.h}</div>
              <ul className="space-y-3">
                {c.l.map((it, j) => (
                  <li key={j}>
                    <button
                      onClick={() => navigate && navigate(it.r)}
                      className="text-[14px] text-ink-soft hover:text-ink link-reveal text-left"
                    >
                      {it.t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-ink/20 pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
          <div>© 2026 mVerve Technologies</div>
          <div>Privacy · Terms · Cookies</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page wrapper helper ─── */
export function PageShell({ navigate, children, includeClosingCTA = true }) {
  useLenis();
  return (
    <div className="bg-cream text-ink grain min-h-screen">
      <TopBar navigate={navigate} />
      <main>{children}</main>
      {includeClosingCTA && <ClosingCTA navigate={navigate} />}
      <Footer navigate={navigate} />
    </div>
  );
}
