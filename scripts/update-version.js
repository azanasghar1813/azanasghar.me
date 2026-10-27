const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const version = Date.now().toString();
const isoDate = new Date().toISOString();

// 1. Update version.json
const versionFilePath = path.join(rootDir, 'version.json');
const versionData = {
  version: version,
  buildTime: isoDate
};
fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2) + '\n', 'utf8');

// 2. Update styles.css and script.js query string in index.html
const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(/href="styles\.css(\?v=[^"]*)?"/g, `href="styles.css?v=${version}"`);
html = html.replace(/src="script\.js(\?v=[^"]*)?"/g, `src="script.js?v=${version}"`);

fs.writeFileSync(indexPath, html, 'utf8');

console.log(`[Version Auto-Update] Version updated to ${version} (${isoDate})`);

// 3. If running inside git, auto-stage the modified files
try {
  execSync('git add version.json index.html', { cwd: rootDir, stdio: 'ignore' });
} catch (e) {
  // Ignore if not in git context
}
