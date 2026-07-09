const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const orig = content;
      content = content.replace(/required=""/g, 'required');
      content = content.replace(/onclick=/g, 'onClick=');
      content = content.replace(/autocomplete=/g, 'autoComplete=');
      content = content.replace(/tabindex=/g, 'tabIndex=');
      content = content.replace(/maxlength=/g, 'maxLength=');
      content = content.replace(/ stroke-width=/g, ' strokeWidth=');
      content = content.replace(/ stroke-linecap=/g, ' strokeLinecap=');
      content = content.replace(/ stroke-linejoin=/g, ' strokeLinejoin=');
      content = content.replace(/ fill-rule=/g, ' fillRule=');
      content = content.replace(/ clip-rule=/g, ' clipRule=');
      content = content.replace(/ viewbox=/g, ' viewBox=');
      
      if (content !== orig) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed JSX attributes in ' + file);
      }
    }
  }
}
processDir(path.join(__dirname, 'src/pages'));
processDir(path.join(__dirname, 'src/components'));
