const fs = require('fs');
const html = fs.readFileSync('../stitch_downloads/ee919c2aad144d14831b6436d154879f.html', 'utf-8');
const startMatch = html.match(/tailwind\.config\s*=\s*\{/);
if (startMatch) {
  const startIdx = startMatch.index + startMatch[0].length - 1;
  let endIdx = startIdx;
  let braces = 0;
  for (let i = startIdx; i < html.length; i++) {
    if (html[i] === '{') braces++;
    if (html[i] === '}') braces--;
    if (braces === 0) {
      endIdx = i;
      break;
    }
  }
  const configObjStr = html.substring(startIdx, endIdx + 1);
  let finalConfig = `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${configObjStr};`;
  finalConfig = finalConfig.replace(/darkMode:\s*["']class["'],/, "darkMode: 'class',\n  content: [\n    './index.html',\n    './src/**/*.{js,ts,jsx,tsx}',\n  ],");
  fs.writeFileSync('tailwind.config.js', finalConfig);
  console.log('Tailwind config generated!');
} else {
  console.log('Config not found!');
}
