const fs = require('fs');
const path = require('path');

const plan1Path = path.join(__dirname, 'seo_content_plan.json');
const plan2Path = path.join(__dirname, 'seo_content_plan_2.json');
const sitemapPath = path.join(__dirname, 'src', 'app', 'sitemap.js');

const plan1 = JSON.parse(fs.readFileSync(plan1Path, 'utf8'));
const plan2 = JSON.parse(fs.readFileSync(plan2Path, 'utf8'));
const allPlans = [...plan1, ...plan2];

const seoPagesEntries = allPlans.map(page => `    {
      url: \`\${baseUrl}/${page.slug}\`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    }`).join(',\n');

let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

// We will inject seoPagesEntries right before `  // Dynamic blog pages`
if (sitemapContent.includes('// Dynamic blog pages')) {
  const insertionPoint = '  // Dynamic blog pages';
  const newContent = sitemapContent.replace(
    insertionPoint,
    `  // SEO Landing Pages\n  const seoPages = [\n${seoPagesEntries}\n  ];\n\n${insertionPoint}`
  );
  
  // Also need to update the return statement:
  // return [...pages, ...blogPages];
  // to: return [...pages, ...seoPages, ...blogPages];
  const finalContent = newContent.replace('return [...pages, ...blogPages];', 'return [...pages, ...seoPages, ...blogPages];');
  
  fs.writeFileSync(sitemapPath, finalContent, 'utf8');
  console.log("Successfully updated sitemap.js with 30 SEO links!");
} else {
  console.log("Could not find insertion point in sitemap.js");
}
