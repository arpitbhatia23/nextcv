const fs = require('fs');
const path = require('path');

console.log('--- Starting NextCV SEO Validation Check ---');

let errors = 0;
let warnings = 0;

// Helper to report error
function reportError(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  errors++;
}

function reportWarning(msg) {
  console.warn(`⚠️ [WARN] ${msg}`);
  warnings++;
}

// 1. Check SEO pages JSON data
const seoPagesPath = path.join(__dirname, '../src/app/(landingPage)/seo-pages.json');
if (fs.existsSync(seoPagesPath)) {
  const seoPages = JSON.parse(fs.readFileSync(seoPagesPath, 'utf8'));
  console.log(`Checking ${seoPages.length} SEO pages...`);

  seoPages.forEach(page => {
    if (!page.slug) reportError(`SEO page missing slug: ${JSON.stringify(page)}`);
    if (!page.title) reportError(`SEO page '${page.slug}' missing title`);
    if (!page.description) reportError(`SEO page '${page.slug}' missing description`);

    // Check for internal leakage
    const fullText = JSON.stringify(page);
    if (/publishing note|citeturn|source profile/i.test(fullText)) {
      reportError(`Internal text leakage detected in SEO page '${page.slug}'`);
    }

    // Check for markdown in title or description
    if (/[\#\*\_\[\]]/.test(page.title || '')) {
      reportWarning(`Markdown syntax detected in title for '${page.slug}': ${page.title}`);
    }
  });
}

// 2. Check Career pages JSON data
const careerPagesPath = path.join(__dirname, '../src/app/(landingPage)/career-pages.json');
if (fs.existsSync(careerPagesPath)) {
  const careerPages = JSON.parse(fs.readFileSync(careerPagesPath, 'utf8'));
  console.log(`Checking ${careerPages.length} Career pages...`);

  careerPages.forEach(page => {
    if (!page.slug) reportError(`Career page missing slug: ${JSON.stringify(page)}`);
    if (!page.title) reportError(`Career page '${page.slug}' missing title`);

    // Check for internal leakage in content
    if (/publishing note|citeturn|source profile|note to editor/i.test(page.content || '')) {
      reportError(`Internal text leakage detected in Career page '${page.slug}'`);
    }
  });
}

// 3. Check Sitemap generator file
const sitemapPath = path.join(__dirname, '../src/app/sitemap.js');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  if (sitemapContent.includes('inundefined') || sitemapContent.includes('localhost')) {
    reportError('Sitemap contains malformed domain (inundefined or localhost)');
  }
}

// 4. Check SEO Utility file
const seoUtilPath = path.join(__dirname, '../src/shared/utils/seo.js');
if (fs.existsSync(seoUtilPath)) {
  const seoUtil = fs.readFileSync(seoUtilPath, 'utf8');
  if (!seoUtil.includes('SITE_URL')) {
    reportError('SEO utility missing central SITE_URL configuration');
  }
}

console.log('\n--- SEO Validation Summary ---');
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors > 0) {
  console.error('\nSEO Validation FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ SEO Validation PASSED cleanly!');
  process.exit(0);
}
