// Generate sitemap.xml + robots.txt after vite-react-ssg build.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://mverve.com";

// Mirror of paths in src/routes.jsx (kept in sync manually).
const PATHS = [
  "/", "/ai-lab", "/genai", "/automation", "/greenops", "/mvp-incubator", "/data-strategy",
  "/expertise", "/cloud-native", "/modernization", "/platform", "/experience",
  "/product-strategy", "/service-design", "/agile-pods", "/consulting",
  "/manufacturing", "/cleantech", "/healthcare",
  "/tech-radar", "/success-stories", "/white-papers",
  "/contact", "/careers", "/privacy", "/terms",
];

const today = new Date().toISOString().slice(0, 10);

const urlset = PATHS.map((p) => `  <url>
    <loc>${SITE}${p === "/" ? "" : p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${p === "/" ? "1.0" : "0.7"}</priority>
  </url>`).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const dist = resolve(process.cwd(), "dist");
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);
writeFileSync(resolve(dist, "robots.txt"), robots);
console.log(`✔ wrote sitemap.xml (${PATHS.length} urls) + robots.txt`);
