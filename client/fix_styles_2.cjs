const fs = require('fs');
const files = [
  'src/pages/hr/HRDashboard.tsx',
  'src/pages/public/Home.tsx',
  'src/pages/auth/Login.tsx',
  'src/pages/auth/Register.tsx'
];
let found = false;
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    // Replace all remaining style="..."
    content = content.replace(/style="([^"]*)"/g, (match, styleString) => {
      console.log(`Replacing in ${f}: ${styleString}`);
      // Simple parse for inline styles (e.g., width: 50%; height: 20px)
      const rules = styleString.split(';').filter(s => s.trim() !== '');
      const styleObj = {};
      rules.forEach(rule => {
        const parts = rule.split(':');
        if (parts.length === 2) {
          const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          let val = parts[1].trim();
          styleObj[key] = val;
        }
      });
      found = true;
      return `style={${JSON.stringify(styleObj)}}`;
    });
    fs.writeFileSync(f, content);
  }
});
if (!found) console.log('No more style strings found!');
