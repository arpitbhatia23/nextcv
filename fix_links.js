const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

function processFiles() {
  walk('./src', function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Part 1: 4xx fixes
      content = content.replace(/resume-format-india-2026/g, 'indian-resume-format');
      content = content.replace(/ats-resume-optimization-2026/g, 'ats-friendly-resume-checklist');
      content = content.replace(/\/cdn-cgi\/l\/email-protection/g, 'mailto:support@nextcv.in');

      // Part 2: 3xx fixes for SEO pages - mostly inside (landingPage) and shared/components
      // Be careful not to break dashboard routes or layout stuff
      if (filePath.includes('(landingPage)') || filePath.includes('shared') || filePath.includes('seo_content_plan.json')) {
        // nextcv.in -> www.nextcv.in
        content = content.replace(/https:\/\/nextcv\.in\//g, 'https://www.nextcv.in/');
        content = content.replace(/https:\/\/nextcv\.in/g, 'https://www.nextcv.in');

        // dashboard links
        content = content.replace(/href="\/dashboard\/resume\/new\?/g, 'href="/start?');
        content = content.replace(/href="\/dashboard\/resume\/new"/g, 'href="/start"');
        content = content.replace(/href="\/dashboard"/g, 'href="/start"');
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log('Updated', filePath);
      }
    }
  });

  walk('./', function(filePath) {
    if (filePath === 'seo_content_plan.json') {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      content = content.replace(/resume-format-india-2026/g, 'indian-resume-format');
      content = content.replace(/ats-resume-optimization-2026/g, 'ats-friendly-resume-checklist');
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log('Updated', filePath);
      }
    }
  });
}

processFiles();
