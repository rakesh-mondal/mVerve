import { motion } from "framer-motion";
import { PageShell } from "../components/SiteLayout";

const SECTIONS = [
  {
    h: "Acceptance of Terms",
    body: [
      "By accessing or using the mVerve Technologies website (the Site), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.",
      "These terms apply to all visitors, users, and others who access the Site. They do not constitute or form part of any contract for services — engagements with mVerve are governed by separate, signed agreements.",
    ],
  },
  {
    h: "Intellectual Property",
    body: [
      "All content on this Site — including text, graphics, logos, page designs, and code — is the property of mVerve Technologies or its content suppliers and is protected by applicable intellectual property laws.",
      "You may view and print pages from this Site for your own personal, non-commercial use. Any other use — including reproduction, modification, distribution, or republication — requires our prior written consent.",
      "The mVerve name, wordmark, and logo are trademarks of mVerve Technologies. Nothing on this Site grants any licence to use our trademarks.",
    ],
  },
  {
    h: "Use of the Site",
    body: [
      "You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Site.",
      "Prohibited conduct includes: transmitting any unlawful, threatening, or defamatory material; attempting to gain unauthorised access to any part of the Site or its infrastructure; introducing malicious code; and scraping or harvesting content by automated means without our express permission.",
    ],
  },
  {
    h: "Disclaimer of Warranties",
    body: [
      "The Site and its content are provided on an as-is and as-available basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      "mVerve does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. Content on the Site is provided for general information only and does not constitute professional advice.",
    ],
  },
  {
    h: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, mVerve Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site or its content.",
      "Our total liability for any claim arising from your use of the Site shall not exceed £100 (one hundred pounds sterling).",
    ],
  },
  {
    h: "Links to Third-Party Sites",
    body: [
      "The Site may contain links to third-party websites for your convenience. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.",
      "A link from our Site does not imply endorsement of any third-party site, its content, or its operators.",
    ],
  },
  {
    h: "Governing Law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  {
    h: "Changes to These Terms",
    body: [
      "We reserve the right to amend these Terms at any time. Changes will be posted to this page with an updated effective date. Your continued use of the Site following any changes constitutes your acceptance of the revised Terms.",
      "If you have questions about these Terms, contact us at legal@mverve.com.",
    ],
  },
];

export function TermsContent({ navigate }) {
  return (
    <PageShell navigate={navigate} includeClosingCTA={false}>
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
                Terms <span className="italic text-coral">of Use.</span>
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
              Please read these terms before using the mVerve website. They set out the rules that govern your access to and use of this Site.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="border-t border-rule mx-6 lg:mx-10" />

      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="hidden lg:block col-span-3">
              <div className="sticky top-32 space-y-3">
                {SECTIONS.map((s, i) => (
                  <a key={i} href={`#term-${i}`} className="block font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted hover:text-coral transition-colors">
                    {s.h}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5 space-y-16">
              {SECTIONS.map((s, i) => (
                <motion.div
                  key={i}
                  id={`term-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="border-t border-rule pt-10"
                >
                  <h2 className="font-display text-[clamp(22px,2.2vw,30px)] font-light text-ink mb-6 italic">{s.h}</h2>
                  <div className="space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">{p}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-rule pt-10">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-4">Contact</p>
                <p className="text-[15px] lg:text-[16px] leading-relaxed text-ink-soft">
                  Questions about these Terms?{" "}
                  <a href="mailto:legal@mverve.com" className="text-ink underline underline-offset-4 hover:text-coral transition-colors">legal@mverve.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default TermsContent;
