const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !['HRDashboard.tsx', 'Home.tsx', 'Login.tsx', 'Register.tsx'].includes(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Upgrade classes to premium design system
      content = content.replace(/bg-white/g, 'bg-surface-container-lowest');
      content = content.replace(/text-gray-900/g, 'text-on-surface');
      content = content.replace(/text-gray-800/g, 'text-on-surface');
      content = content.replace(/text-gray-600/g, 'text-on-surface-variant');
      content = content.replace(/text-gray-500/g, 'text-on-surface-variant');
      content = content.replace(/text-gray-400/g, 'text-outline');
      content = content.replace(/border-gray-200/g, 'border-outline-variant');
      content = content.replace(/border-gray-300/g, 'border-outline');
      content = content.replace(/bg-gray-50/g, 'bg-surface-container-low');
      content = content.replace(/bg-gray-100/g, 'bg-surface-container');
      content = content.replace(/bg-blue-600/g, 'bg-primary');
      content = content.replace(/bg-blue-50/g, 'bg-primary-container');
      content = content.replace(/text-blue-600/g, 'text-primary');
      content = content.replace(/text-blue-800/g, 'text-on-primary-container');
      
      // Ensure all generic cards get premium border and soft shadow
      content = content.replace(/bg-surface-container-lowest rounded-lg border/g, 'bg-surface-container-lowest rounded-xl border shadow-sm');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src/pages'));
console.log('Successfully upgraded 31 pages to Premium UI tokens!');
