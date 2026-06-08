const fs = require('fs');
const path = require('path');

const plan1Path = path.join(__dirname, 'seo_content_plan.json');
const plan2Path = path.join(__dirname, 'seo_content_plan_2.json');
const footerPath = path.join(__dirname, 'src', 'shared', 'components', 'footer', 'Footer.jsx');

const plan1 = JSON.parse(fs.readFileSync(plan1Path, 'utf8'));
const plan2 = JSON.parse(fs.readFileSync(plan2Path, 'utf8'));
const allPlans = [...plan1, ...plan2];

const seoLinksJsx = `        {/* SEO Links Block */}
        <div className="pt-8 pb-8 border-t border-slate-900">
          <h3 className="text-slate-100 font-semibold mb-4 text-sm uppercase tracking-wider">Popular Career & Resume Guides</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            ${allPlans.map(page => `<Link href="/${page.slug}" className="text-xs text-slate-100 hover:text-indigo-400 transition-colors">${page.title}</Link>`).join('\n            ')}
          </div>
        </div>

        {/* Bottom Bar */}`;

let footerContent = fs.readFileSync(footerPath, 'utf8');

if (footerContent.includes('{/* SEO Links Block */}')) {
  console.log("Footer already updated.");
} else {
  footerContent = footerContent.replace('{/* Bottom Bar */}', seoLinksJsx);
  fs.writeFileSync(footerPath, footerContent, 'utf8');
  console.log("Successfully updated Footer.jsx with 30 SEO links!");
}
