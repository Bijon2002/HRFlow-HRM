const fs = require('fs');
let content = fs.readFileSync('rebuild_all_pages.cjs', 'utf8');
// Find where CandidateInterviews.tsx entry starts and remove it
const marker1 = "'src/pages/candidate/CandidateInterviews.tsx'";
const marker2 = "'src/pages/candidate/Quiz.tsx'";
const start = content.indexOf(marker1);
const end = content.indexOf(marker2);
if (start !== -1 && end !== -1) {
  content = content.substring(0, start) + content.substring(end);
  fs.writeFileSync('rebuild_all_pages.cjs', content);
  console.log('Patched successfully');
} else {
  console.log('Markers not found: start=' + start + ' end=' + end);
}
