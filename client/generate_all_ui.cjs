const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components', 'ui');
const layoutsDir = path.join(srcDir, 'components', 'layouts');
const pagesDir = path.join(srcDir, 'pages');

// Ensure directories exist
fs.mkdirSync(componentsDir, { recursive: true });

// --- 1. SHARED COMPONENTS ---
const components = {
  'Card.tsx': `
import React from 'react';
export const Card = ({ children, className = '' }) => (
  <div className={\`card \${className}\`}>{children}</div>
);
`,
  'Button.tsx': `
import React from 'react';
export const Button = ({ children, variant = 'primary', className = '', ...props }) => (
  <button className={\`btn btn-\${variant} \${className}\`} {...props}>
    {children}
  </button>
);
`,
  'Input.tsx': `
import React from 'react';
export const Input = ({ label, type = 'text', className = '', ...props }) => (
  <div className={\`flex-col flex \${className}\`} style={{ marginBottom: '1rem' }}>
    {label && <label style={{ marginBottom: '0.5rem', fontWeight: 500 }}>{label}</label>}
    <input type={type} style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-light)', width: '100%' }} {...props} />
  </div>
);
`,
  'Table.tsx': `
import React from 'react';
export const Table = ({ columns, data }) => (
  <div style={{ overflowX: 'auto', width: '100%' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
          {columns.map((col, i) => <th key={i} style={{ padding: '1rem' }}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '1rem' }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
`
};

for (const [file, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(componentsDir, file), content.trim());
}

// --- 2. LAYOUTS ---
const layouts = {
  'DashboardLayout.tsx': `
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, FileText, Calendar, Settings, Bell, MessageSquare, LogOut, CheckSquare, BarChart } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label }) => {
  const loc = useLocation();
  const isActive = loc.pathname.includes(to);
  return (
    <Link to={to} style={{ 
      display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', 
      color: isActive ? 'var(--primary)' : 'var(--text-body)', 
      backgroundColor: isActive ? 'var(--background)' : 'transparent',
      borderRadius: '8px', marginBottom: '0.5rem', fontWeight: 500 
    }}>
      <Icon size={20} style={{ marginRight: '1rem' }} /> {label}
    </Link>
  );
};

const DashboardLayout = () => {
  const loc = useLocation();
  let role = 'Employee';
  if (loc.pathname.startsWith('/hr')) role = 'HR';
  if (loc.pathname.startsWith('/admin')) role = 'Admin';
  if (loc.pathname.startsWith('/candidate')) role = 'Candidate';

  const getLinks = () => {
    switch (role) {
      case 'HR': return [
        { to: '/hr/dashboard', label: 'Dashboard', icon: Home },
        { to: '/hr/vacancies', label: 'Vacancies', icon: Briefcase },
        { to: '/hr/applicants', label: 'Applicants', icon: Users },
        { to: '/hr/cv-screening', label: 'CV Screening', icon: FileText },
        { to: '/hr/interviews', label: 'Interviews', icon: Calendar },
        { to: '/hr/employees', label: 'Employees', icon: Users },
      ];
      case 'Candidate': return [
        { to: '/candidate/dashboard', label: 'Dashboard', icon: Home },
        { to: '/candidate/internships', label: 'Jobs', icon: Briefcase },
        { to: '/candidate/applications', label: 'My Applications', icon: FileText },
        { to: '/candidate/interviews', label: 'Interviews', icon: Calendar },
      ];
      case 'Admin': return [
        { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
        { to: '/admin/users', label: 'Users', icon: Users },
        { to: '/admin/roles', label: 'Roles', icon: Settings },
        { to: '/admin/analytics', label: 'Analytics', icon: BarChart },
      ];
      default: return [
        { to: '/employee/dashboard', label: 'Dashboard', icon: Home },
        { to: '/employee/tasks', label: 'My Tasks', icon: CheckSquare },
        { to: '/employee/attendance', label: 'Attendance', icon: Calendar },
        { to: '/employee/performance', label: 'Performance', icon: BarChart },
      ];
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'var(--surface)', borderRight: '1px solid var(--border-light)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>HRFlow <span style={{fontSize:'0.9rem', color:'var(--text-body)'}}>| {role}</span></h2>
        <nav style={{ flex: 1 }}>
          {getLinks().map(link => <SidebarLink key={link.to} {...link} />)}
        </nav>
        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
          <SidebarLink to="/shared/profile" label="Profile Settings" icon={Settings} />
          <SidebarLink to="/auth/login" label="Logout" icon={LogOut} />
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Navbar */}
        <header style={{ height: '70px', backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'var(--icon-color)' }}>
            <Link to="/shared/notifications"><Bell size={20} style={{ color: 'var(--icon-color)' }} /></Link>
            <Link to="/shared/messages"><MessageSquare size={20} style={{ color: 'var(--icon-color)' }} /></Link>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {role.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
`,
  'AuthLayout.tsx': `
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '2rem' }}>HRFlow</h1>
      <Outlet />
    </div>
  </div>
);
export default AuthLayout;
`,
  'PublicLayout.tsx': `
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const PublicLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-light)' }}>
      <h2 style={{ color: 'var(--primary)', margin: 0 }}>HRFlow</h2>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ color: 'var(--text-heading)', fontWeight: 500 }}>Home</Link>
        <Link to="/about" style={{ color: 'var(--text-heading)', fontWeight: 500 }}>About</Link>
        <Link to="/careers" style={{ color: 'var(--text-heading)', fontWeight: 500 }}>Careers</Link>
        <Link to="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
      </nav>
    </header>
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <footer style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--text-heading)', color: 'white' }}>
      &copy; 2026 HRFlow - All Rights Reserved.
    </footer>
  </div>
);
export default PublicLayout;
`
};

for (const [file, content] of Object.entries(layouts)) {
  fs.writeFileSync(path.join(layoutsDir, file), content.trim());
}

// --- 3. PAGES GENERATION FUNCTION ---
const generatePage = (name, type) => {
  if (type === 'dashboard') {
    return `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';

const ${name} = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card><h3>Total Users</h3><p style={{fontSize:'2rem', fontWeight:'bold', color:'var(--primary)'}}>1,245</p></Card>
        <Card><h3>Active Projects</h3><p style={{fontSize:'2rem', fontWeight:'bold', color:'var(--secondary)'}}>34</p></Card>
        <Card><h3>Pending Tasks</h3><p style={{fontSize:'2rem', fontWeight:'bold', color:'var(--warning)'}}>12</p></Card>
      </div>
      <Card>
        <h3 style={{ marginBottom: '1rem' }}>Recent Activity</h3>
        <Table 
          columns={['Date', 'Action', 'User', 'Status']} 
          data={[
            ['Today', 'Logged in', 'John Doe', 'Success'],
            ['Yesterday', 'Submitted Application', 'Jane Smith', 'Pending'],
            ['Oct 12', 'Completed Task', 'Mike Johnson', 'Done'],
          ]} 
        />
      </Card>
    </div>
  );
};
export default ${name};
`;
  }
  
  if (type === 'list') {
    return `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';

const ${name} = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
        <Button>Add New</Button>
      </div>
      <Card>
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Search..." style={{ padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '6px' }} />
          <select style={{ padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: '6px' }}><option>Filter by Status</option></select>
        </div>
        <Table 
          columns={['ID', 'Name', 'Department', 'Role', 'Status', 'Actions']} 
          data={[
            ['#001', 'Alice Cooper', 'Engineering', 'Developer', 'Active', 'Edit | Delete'],
            ['#002', 'Bob Builder', 'Design', 'UI Designer', 'Active', 'Edit | Delete'],
            ['#003', 'Charlie Chap', 'HR', 'Recruiter', 'On Leave', 'Edit | Delete'],
          ]} 
        />
      </Card>
    </div>
  );
};
export default ${name};
`;
  }

  if (type === 'form') {
    return `import React from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const ${name} = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <Card>
        <form onSubmit={e => e.preventDefault()}>
          <Input label="Full Name" placeholder="Enter name" />
          <Input label="Email Address" type="email" placeholder="Enter email" />
          <Input label="Password" type="password" placeholder="Enter password" />
          <Button style={{ width: '100%', marginTop: '1rem' }}>Submit</Button>
        </form>
      </Card>
    </div>
  );
};
export default ${name};
`;
  }

  // Default generic page
  return `import React from 'react';
import { Card } from '../../components/ui/Card';

const ${name} = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>${name.replace(/([A-Z])/g, ' $1').trim()}</h1>
      <Card>
        <p>This is the ${name} page. Content for this section will be implemented here.</p>
      </Card>
    </div>
  );
};
export default ${name};
`;
};

// Map each file to a template type
const pageMap = {
  public: { Home: 'default', About: 'default', Careers: 'list', Contact: 'form' },
  auth: { Login: 'form', Register: 'form', ForgotPassword: 'form' },
  candidate: { CandidateDashboard: 'dashboard', InternshipsList: 'list', ApplyJob: 'form', MyApplications: 'list', CandidateInterviews: 'list', Quiz: 'default' },
  hr: { HRDashboard: 'dashboard', ManageVacancies: 'list', ApplicantList: 'list', CVScreening: 'default', InterviewSchedule: 'list', ManageEmployees: 'list' },
  employee: { EmployeeDashboard: 'dashboard', MyTasks: 'list', MyAttendance: 'list', MyPerformance: 'default' },
  admin: { AdminDashboard: 'dashboard', UserManagement: 'list', RoleManagement: 'list', SystemAnalytics: 'dashboard' },
  shared: { Notifications: 'list', Messages: 'default', Calendar: 'default', ProfileSettings: 'form' },
  error: { NotFound: 'default', Unauthorized: 'default' }
};

for (const [folder, files] of Object.entries(pageMap)) {
  for (const [file, type] of Object.entries(files)) {
    const filePath = path.join(pagesDir, folder, file + '.tsx');
    fs.writeFileSync(filePath, generatePage(file, type).trim());
  }
}

console.log('UI Generation Script completed successfully.');
