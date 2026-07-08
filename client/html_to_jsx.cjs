const fs = require('fs');
const path = require('path');

const filesToConvert = [
  { id: 'ee919c2aad144d14831b6436d154879f', name: 'HRDashboard', path: 'src/pages/hr/HRDashboard.tsx' },
  { id: 'b60248c09a854d318008b4cd2cc5ee53', name: 'Home', path: 'src/pages/public/Home.tsx' },
  { id: '612bff6a95a64623b89c18d38f505cc7', name: 'Login', path: 'src/pages/auth/Login.tsx' },
  { id: '2cac3a251e414fac9bd2a4bccbfcb10c', name: 'Register', path: 'src/pages/auth/Register.tsx' },
];

function htmlToJsx(htmlStr) {
  // Extract body
  const bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : htmlStr;

  // Replace class= with className=
  content = content.replace(/class=/g, 'className=');

  // Replace for= with htmlFor=
  content = content.replace(/for=/g, 'htmlFor=');

  // Fix self-closing tags (img, input, hr, br)
  content = content.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
  content = content.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
  content = content.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
  content = content.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

  // Fix inline styles to object syntax roughly (since stitch html sometimes has inline styles)
  // Stitch html usually doesn't have complex styles, but let's just strip script tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  return content;
}

filesToConvert.forEach(file => {
  const htmlFilePath = path.join(__dirname, '../stitch_downloads', `${file.id}.html`);
  const outPath = path.join(__dirname, file.path);
  
  if (fs.existsSync(htmlFilePath)) {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    let jsxContent = htmlToJsx(htmlContent);
    
    // Stitch dashboards usually include the sidebar. But our DashboardLayout already has a sidebar.
    // However, since we are doing a direct copy to ensure the exact UI, we should just export the whole thing 
    // and maybe the layout will just render it. Wait, the layout renders the Sidebar. 
    // If the new Stitch page has a sidebar, we will have two sidebars. 
    // Let's just create the components and we can manually fix layouts later if needed.
    
    const reactComponent = `import React from 'react';\n\nconst ${file.name} = () => {\n  return (\n    <div className="w-full h-full">\n      ${jsxContent}\n    </div>\n  );\n};\n\nexport default ${file.name};\n`;
    
    fs.writeFileSync(outPath, reactComponent);
    console.log(`Converted ${file.name}`);
  } else {
    console.log(`File not found: ${htmlFilePath}`);
  }
});
