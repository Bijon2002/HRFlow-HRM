const fs = require('fs');
const path = require('path');

const pages = {
  public: ['Home', 'About', 'Careers', 'Contact'],
  auth: ['Login', 'Register', 'ForgotPassword'],
  candidate: ['CandidateDashboard', 'InternshipsList', 'ApplyJob', 'MyApplications', 'CandidateInterviews', 'Quiz'],
  hr: ['HRDashboard', 'ManageVacancies', 'ApplicantList', 'CVScreening', 'InterviewSchedule', 'ManageEmployees'],
  employee: ['EmployeeDashboard', 'MyTasks', 'MyAttendance', 'MyPerformance'],
  admin: ['AdminDashboard', 'UserManagement', 'RoleManagement', 'SystemAnalytics'],
  shared: ['Notifications', 'Messages', 'Calendar', 'ProfileSettings'],
  error: ['NotFound', 'Unauthorized']
};

const layouts = ['PublicLayout', 'AuthLayout', 'DashboardLayout'];

const baseDir = path.join(__dirname, 'src');

Object.entries(pages).forEach(([folder, files]) => {
  const dirPath = path.join(baseDir, 'pages', folder);
  fs.mkdirSync(dirPath, { recursive: true });
  
  files.forEach(file => {
    const filePath = path.join(dirPath, `${file}.tsx`);
    const content = `import React from 'react';\n\nconst ${file} = () => {\n  return (\n    <div className="card">\n      <h2>${file}</h2>\n      <p>This is the ${file} page.</p>\n    </div>\n  );\n};\n\nexport default ${file};\n`;
    fs.writeFileSync(filePath, content);
  });
});

const layoutDir = path.join(baseDir, 'components', 'layouts');
fs.mkdirSync(layoutDir, { recursive: true });

layouts.forEach(layout => {
  const filePath = path.join(layoutDir, `${layout}.tsx`);
  const content = `import React from 'react';\nimport { Outlet } from 'react-router-dom';\n\nconst ${layout} = () => {\n  return (\n    <div className="${layout.toLowerCase()}">\n      <header>\n        <h2>${layout} Header</h2>\n      </header>\n      <main>\n        <Outlet />\n      </main>\n    </div>\n  );\n};\n\nexport default ${layout};\n`;
  fs.writeFileSync(filePath, content);
});

console.log('Scaffolding complete!');
