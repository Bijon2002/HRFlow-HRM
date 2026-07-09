const fs = require('fs');

let code = fs.readFileSync('rebuild_all_pages.cjs', 'utf-8');

const stitchLayout = `import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-surface flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm z-50 flex flex-col p-4 gap-base hidden md:flex">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary">corporate_fare</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-primary dark:text-on-primary-container leading-none">HRFlow</h1>
            <p className="font-label-md text-label-md text-on-primary-container mt-1">Management Suite</p>
          </div>
        </div>
        <button className="w-full bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container transition-colors duration-200 py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Post New Job
        </button>
        <nav className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 bg-secondary dark:bg-secondary-container text-on-secondary dark:text-on-secondary-container rounded-lg opacity-90 transition-all font-label-md text-label-md" href="/hr/dashboard">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/candidate/internships">
            <span className="material-symbols-outlined text-[20px]">group</span>
            Candidates
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/hr/interviews">
            <span className="material-symbols-outlined text-[20px]">event_available</span>
            Interviews
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/hr/employees">
            <span className="material-symbols-outlined text-[20px]">badge</span>
            Employees
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/admin/analytics">
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            Reports
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/shared/profile">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </a>
        </nav>
        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-primary-container">
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/shared/notifications">
            <span className="material-symbols-outlined text-[20px]">help</span>
            Help Center
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant dark:text-on-primary-container hover:bg-primary-container dark:hover:bg-primary rounded-lg transition-colors duration-200 font-label-md text-label-md" href="/auth/login">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </a>
        </div>
      </aside>

      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        {/* Header from Stitch */}
        <header className="h-[72px] bg-surface dark:bg-surface-container border-b border-outline-variant flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Admin Portal</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center ml-2 cursor-pointer">
              <span className="font-label-lg text-label-lg text-on-secondary-container font-bold">HR</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
`;

const dashboardLayoutStart = code.indexOf("'src/components/layouts/DashboardLayout.tsx':");
const loginStart = code.indexOf("'src/pages/auth/Login.tsx':");

code = code.substring(0, dashboardLayoutStart) + 
  "'src/components/layouts/DashboardLayout.tsx': `" + stitchLayout.replace(/`/g, '\\`') + "`,\n\n  " + 
  code.substring(loginStart);

// Global replacements to enforce Stitch premium styling
code = code.replace(/bg-white/g, 'bg-surface-container-lowest');
code = code.replace(/text-gray-900/g, 'text-on-surface');
code = code.replace(/text-gray-800/g, 'text-on-surface');
code = code.replace(/text-gray-600/g, 'text-on-surface-variant');
code = code.replace(/text-gray-500/g, 'text-on-surface-variant');
code = code.replace(/text-gray-400/g, 'text-outline');
code = code.replace(/border-gray-200/g, 'border-outline-variant');
code = code.replace(/border-gray-300/g, 'border-outline');
code = code.replace(/bg-gray-50/g, 'bg-surface-container-low');
code = code.replace(/bg-gray-100/g, 'bg-surface-container');
code = code.replace(/bg-blue-600/g, 'bg-primary');
code = code.replace(/bg-blue-50/g, 'bg-primary-container');
code = code.replace(/text-blue-600/g, 'text-primary');
code = code.replace(/text-blue-800/g, 'text-on-primary-container');

// Now, we must ensure we don't overwrite the original Home, Login, Register, and HRDashboard files!
// We'll remove them from the `files` writing loop, or remove them from the layout object.
// We'll just filter them out right before writing.

const finalLines = [];
const lines = code.split('\\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes("fs.mkdirSync(dir, { recursive: true });")) {
    finalLines.push(line);
    finalLines.push("  if (['src/pages/public/Home.tsx', 'src/pages/auth/Login.tsx', 'src/pages/auth/Register.tsx', 'src/pages/hr/HRDashboard.tsx'].includes(file)) { console.log('Skipping ' + file); continue; }");
    continue;
  }
  finalLines.push(line);
}

fs.writeFileSync('better_rebuild.cjs', finalLines.join('\\n'));
console.log('Created better_rebuild.cjs successfully.');
