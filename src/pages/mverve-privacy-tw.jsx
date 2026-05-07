import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";

const SECTIONS = [
  {
    h: "Information We Collect",
    body: [
      "We collect information you provide directly — when you fill out a contact form, subscribe to our white papers, or correspond with us by email. This includes your name, email address, company name, and any message content you choose to share.",
      "When you visit our website, we automatically collect certain technical data including your IP address, browser type, operating system, referring URLs, and pages visited. This is standard server log data used solely for security and performance monitoring.",
      "We do not use third-party analytics platforms that track you across other websites. We do not run advertising networks or sell data to data brokers.",
    ],
  },
  {
    h: "How We Use It",
    body: [
      "Contact and inquiry data is used exclusively to respond to your message and, where relevant, to continue a business conversation you initiated. We do not add you to marketing lists without explicit opt-in.",
      "Technical log data is used to maintain the security and reliability of our infrastructure. Logs are retained for 90 days and then purged.",
      "White paper and content subscribers receive the specific content they requested. You can unsubscribe from any communication at any time by replying to any email from us.",
    ],
  },
  {
    h: "Third Parties",
    body: [
      "We use a small number of trusted service providers to operate this site — hosting infrastructure and email delivery. These providers process data only as instructed by us and are contractually bound to appropriate data protection standards.",
      "We do not share, sell, rent, or trade your personal information with any third party for their own marketing purposes.",
      "Our site may contain links to external resources. We are not responsible for the privacy practices of those sites and encourage you to review their policies independently.",
    ],
  },
  {
    h: "Cookies",
    body: [
      "This site uses only strictly necessary cookies required for basic site function. We do not use tracking, advertising, or analytics cookies.",
      "You can configure your browser to refuse all cookies. Doing so will not materially affect your ability to use this site.",
    ],
  },
  {
    h: "Data Retention & Security",
    body: [
      "Contact form submissions are retained for as long as necessary to service an active business relationship, and for a maximum of 3 years thereafter unless you request earlier deletion.",
      "We implement industry-standard technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction.",
    ],
  },
  {
    h: "Your Rights",
    body: [
      "Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data, and to object to certain processing activities.",
      "To exercise any of these rights, or if you have any privacy-related questions, contact us at privacy@mverve.com. We respond to all requests within 30 days.",
    ],
  },
  {
    h: "Changes to This Policy",
    body: [
      "We may update this policy from time to time. Material changes will be noted at the top of this page with a revised effective date. Your continued use of the site after such changes constitutes acceptance of the updated policy.",
    ],
  },
];

export function PrivacyContent({ navigate }) {
  return (
    <PageShell navigate={navigate} includeClosingCTA={false}>
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-coral mb-6 flex items-center"
          >
            <span className="inline-block w-6 h-px bg-coral align-middle mr-3" />
            Legal
          </motion.div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-display text-[clamp(44px,7vw,104px)] leading-[0.95] tracking-[-0.02em] font-light text-ink">
                {["Privacy", <span key="italic" className="italic text-coral"> Policy.</span>]}
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end pb-2">
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted">
                Effective date · 1 January 2026
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="col-span-12 lg:col-span-6 text-[16px] lg:text-[18px] leading-relaxed text-ink-soft"
            >
              mVerve Technologies is straightforward about what data we collect, why we collect it, and what we do — and don't do — with it.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-rule mx-6 lg:mx-10" />

      {/* Body */}
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Sticky nav on desktop */}
            <div className="hidden lg:block col-span-3">
              <div className="sticky top-32 space-y-3">
                {SECTIONS.map((s, i) => (
                  <a
                    key={i}
                    href={`#section-${i}`}
                    className="block font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted hover:text-coral transition-colors"
                  >
                    {s.h}
                  </a>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="col-span-12 lg:col-span-8 lg:col-start-5 space-y-16">
              {SECTIONS.map((s, i) => (
                <motion.div
                  key={i}
                  id={`section-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="border-t border-rule pt-10"
                >
                  <h2 className="font-display text-[clamp(22px,2.2vw,30px)] font-light text-ink mb-6 italic">
                    {s.h}
                  </h2>
                  <div className="space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Contact block */}
              <div className="border-t border-rule pt-10">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-4">Contact</p>
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">
                  Questions about this policy?{" "}
                  <a href="mailto:privacy@mverve.com" className="text-ink underline underline-offset-4 hover:text-coral transition-colors">
                    privacy@mverve.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default PrivacyContent;
