const fs = require('fs');
const path = require('path');

// =============================================================================
// LAYOUT REWRITES
// =============================================================================

const layouts = {
  'src/components/layouts/AuthLayout.tsx': `import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="min-h-screen bg-background">
    <Outlet />
  </div>
);
export default AuthLayout;
`,

  'src/components/layouts/PublicLayout.tsx': `import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const PublicLayout = () => {
  const loc = useLocation();
  const navLink = (to: string, label: string) => (
    <Link
      key={to}
      to={to}
      className={\`font-label-md text-label-md transition-colors \${loc.pathname === to ? 'text-secondary font-semibold' : 'text-on-surface-variant hover:text-primary'}\`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">HR</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">HRFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLink('/', 'Home')}
            {navLink('/about', 'About')}
            {navLink('/careers', 'Careers')}
            {navLink('/contact', 'Contact')}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth/login" className="font-label-md text-label-md text-primary border border-primary rounded-lg px-4 py-2 hover:bg-primary hover:text-on-primary transition-colors">
              Login
            </Link>
            <Link to="/auth/register" className="font-label-md text-label-md bg-primary text-on-primary rounded-lg px-4 py-2 hover:bg-primary-container transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-on-primary py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold mb-4">HRFlow</h3>
            <p className="font-body-md text-body-md text-primary-fixed-dim">The unified HR management suite for modern organizations.</p>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-semibold mb-4 text-primary-fixed-dim uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2">
              {['Recruitment', 'Interviews', 'Employees', 'Analytics'].map(i => (
                <li key={i}><a href="#" className="font-body-md text-body-md text-primary-fixed hover:text-on-primary transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-semibold mb-4 text-primary-fixed-dim uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact', 'Privacy'].map(i => (
                <li key={i}><a href="#" className="font-body-md text-body-md text-primary-fixed hover:text-on-primary transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-semibold mb-4 text-primary-fixed-dim uppercase tracking-wide">Contact</h4>
            <p className="font-body-md text-body-md text-primary-fixed">hello@hrflow.app</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-primary-container text-center">
          <p className="font-body-md text-body-md text-primary-fixed-dim">© 2026 HRFlow Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default PublicLayout;
`,

  'src/components/layouts/DashboardLayout.tsx': `import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, Users, FileText, Calendar, Settings,
  Bell, MessageSquare, LogOut, CheckSquare, BarChart2, ClipboardList,
  Clock, TrendingUp, Shield, Globe, ChevronLeft, ChevronRight, Search, Menu
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, label, collapsed }: any) => {
  const loc = useLocation();
  const isActive = loc.pathname === to || loc.pathname.startsWith(to + '/');
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className={\`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group \${
        isActive
          ? 'bg-secondary text-on-secondary font-semibold shadow-sm'
          : 'text-on-primary-fixed-variant hover:bg-primary-container hover:text-on-primary'
      } \${collapsed ? 'justify-center' : ''}\`}
    >
      <Icon size={20} className="shrink-0" />
      {!collapsed && <span className="font-label-md text-label-md truncate">{label}</span>}
    </Link>
  );
};

const DashboardLayout = () => {
  const loc = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  let role = 'Employee';
  let roleColor = 'bg-secondary-container text-on-secondary-container';
  if (loc.pathname.startsWith('/hr')) { role = 'HR Manager'; roleColor = 'bg-primary text-on-primary'; }
  if (loc.pathname.startsWith('/admin')) { role = 'Admin'; roleColor = 'bg-error-container text-on-error-container'; }
  if (loc.pathname.startsWith('/candidate')) { role = 'Candidate'; roleColor = 'bg-tertiary-fixed text-on-tertiary-fixed'; }

  const getLinks = () => {
    if (loc.pathname.startsWith('/hr')) return [
      { to: '/hr/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/hr/vacancies', label: 'Vacancies', icon: Briefcase },
      { to: '/hr/applicants', label: 'Applicants', icon: Users },
      { to: '/hr/cv-screening', label: 'CV Screening', icon: FileText },
      { to: '/hr/interviews', label: 'Interviews', icon: Calendar },
      { to: '/hr/employees', label: 'Employees', icon: Users },
    ];
    if (loc.pathname.startsWith('/candidate')) return [
      { to: '/candidate/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/candidate/internships', label: 'Browse Jobs', icon: Globe },
      { to: '/candidate/applications', label: 'My Applications', icon: ClipboardList },
      { to: '/candidate/interviews', label: 'Interviews', icon: Calendar },
      { to: '/candidate/quiz', label: 'Assessments', icon: CheckSquare },
    ];
    if (loc.pathname.startsWith('/admin')) return [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/admin/users', label: 'User Management', icon: Users },
      { to: '/admin/roles', label: 'Role Management', icon: Shield },
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
    ];
    return [
      { to: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/employee/tasks', label: 'My Tasks', icon: CheckSquare },
      { to: '/employee/attendance', label: 'Attendance', icon: Clock },
      { to: '/employee/performance', label: 'Performance', icon: TrendingUp },
    ];
  };

  const sidebarWidth = collapsed ? 'w-20' : 'w-[240px]';

  return (
    <div className="flex h-screen bg-surface-container-low overflow-hidden">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={\`\${sidebarWidth} fixed md:relative h-full bg-primary z-50 flex flex-col transition-all duration-300 shadow-lg \${mobileOpen ? 'left-0' : '-left-full md:left-0'}\`}>
        {/* Logo */}
        <div className={\`flex items-center gap-3 p-4 mb-2 \${collapsed ? 'justify-center' : ''}\`}>
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <span className="text-on-secondary font-bold text-sm">HR</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-on-primary leading-none">HRFlow</h1>
              <p className="text-[10px] text-primary-fixed-dim mt-0.5">Management Suite</p>
            </div>
          )}
        </div>

        {/* Role Badge */}
        {!collapsed && (
          <div className="mx-4 mb-4">
            <span className={\`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold \${roleColor}\`}>
              {role}
            </span>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
          {getLinks().map(link => (
            <SidebarLink key={link.to} {...link} collapsed={collapsed} />
          ))}

          <div className="border-t border-primary-container my-3" />

          <SidebarLink to="/shared/notifications" label="Notifications" icon={Bell} collapsed={collapsed} />
          <SidebarLink to="/shared/messages" label="Messages" icon={MessageSquare} collapsed={collapsed} />
          <SidebarLink to="/shared/calendar" label="Calendar" icon={Calendar} collapsed={collapsed} />
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 flex flex-col gap-1 border-t border-primary-container pt-3">
          <SidebarLink to="/shared/profile" label="Profile Settings" icon={Settings} collapsed={collapsed} />
          <SidebarLink to="/auth/login" label="Logout" icon={LogOut} collapsed={collapsed} />
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-surface border border-outline-variant rounded-full flex items-center justify-center shadow-md hover:bg-surface-container transition-colors z-50 hidden md:flex"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-on-surface-variant" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-surface-container rounded-lg text-sm border border-outline-variant focus:outline-none focus:border-primary w-56 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/shared/notifications" className="relative text-on-surface-variant hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full text-on-error text-[9px] flex items-center justify-center font-bold">3</span>
            </Link>
            <Link to="/shared/messages" className="text-on-surface-variant hover:text-primary transition-colors">
              <MessageSquare size={20} />
            </Link>
            <Link to="/shared/profile" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm shadow-sm">
                {role.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="font-label-md text-label-md text-on-surface leading-none">{role}</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">View profile</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
`,
};

// =============================================================================
// PAGE CONTENT — clean content-only components (no sidebar!)
// =============================================================================

const pages = {

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
'src/pages/auth/Login.tsx': `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10">
          <h1 className="font-headline-lg text-headline-lg font-black text-on-primary">HRFlow</h1>
          <p className="font-headline-sm text-headline-sm text-primary-fixed-dim mt-2 max-w-md">The unified management suite for high-stakes recruitment.</p>
        </div>
        <div className="relative z-10 bg-primary-container/30 rounded-2xl p-6 border border-primary-container">
          <p className="font-body-lg text-body-lg text-on-primary italic mb-4">"Streamlining our hiring process by 40% in the first quarter."</p>
          <p className="font-label-md text-label-md text-primary-fixed-dim">— HR Director, TechCorp</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 bg-surface">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-headline-md text-headline-md font-black text-primary">HRFlow</h1>
          </div>
          <div className="bg-surface-container-lowest py-10 px-8 shadow-sm border border-outline-variant rounded-2xl">
            <h2 className="font-headline-md text-headline-md text-on-background text-center mb-2">Welcome back</h2>
            <p className="text-center font-body-md text-body-md text-on-surface-variant mb-8">Sign in to your account</p>
            <form className="space-y-5">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="email">Email address</label>
                <input id="email" type="email" className="block w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-on-background text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="name@company.com" />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5" htmlFor="password">Password</label>
                <div className="relative">
                  <input id="password" type={showPwd ? 'text' : 'password'} className="block w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 pr-10 text-on-background text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute inset-y-0 right-0 px-3 text-on-surface-variant hover:text-primary transition-colors">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary" />
                  <span className="font-body-md text-body-md text-on-surface-variant">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="font-label-md text-label-md text-primary hover:underline">Forgot password?</Link>
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm mt-2">
                Sign In
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">Don't have an account?{' '}
                <Link to="/auth/register" className="font-label-md text-label-md text-primary hover:underline">Create account</Link>
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-on-surface-variant">© 2026 HRFlow Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
`,

'src/pages/auth/Register.tsx': `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register = () => {
  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-container-high relative flex-col justify-between p-12">
        <div className="z-10 relative">
          <h1 className="font-headline-lg text-headline-lg text-primary flex items-center gap-3 font-black">HRFlow</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-md">Join thousands of HR professionals managing their teams more effectively.</p>
        </div>
        <div className="z-10 relative space-y-4">
          {['AI-powered CV screening', 'Automated interview scheduling', 'Real-time analytics dashboard'].map(f => (
            <div key={f} className="flex items-center gap-3">
              <CheckCircle size={20} className="text-secondary shrink-0" />
              <span className="font-body-md text-body-md text-on-surface-variant">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 bg-surface">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <h1 className="font-headline-md text-headline-md text-primary font-black">HRFlow</h1>
          </div>
          <div className="bg-surface-container-lowest py-10 px-8 shadow-sm border border-outline-variant rounded-2xl">
            <h2 className="font-headline-md text-headline-md text-on-background text-center mb-2">Create account</h2>
            <p className="text-center font-body-md text-body-md text-on-surface-variant mb-8">Get started with HRFlow today</p>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">First name</label>
                  <input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Last name</label>
                  <input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email address</label>
                <input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="name@company.com" />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Register as</label>
                <select className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Candidate</option>
                  <option>HR Manager</option>
                  <option>Employee</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute inset-y-0 right-0 px-3 text-on-surface-variant hover:text-primary">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all shadow-sm">
                Create Account
              </button>
            </form>
            <p className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-label-md text-label-md text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
`,

'src/pages/auth/ForgotPassword.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const ForgotPassword = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">
    <div className="w-full max-w-md">
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant p-10">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center">
            <Mail size={24} className="text-primary" />
          </div>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-background text-center mb-2">Forgot your password?</h2>
        <p className="text-center font-body-md text-body-md text-on-surface-variant mb-8">Enter your email and we'll send you a reset link.</p>
        <form className="space-y-4">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email address</label>
            <input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="name@company.com" />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all">
            Send Reset Link
          </button>
        </form>
        <p className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">
          <Link to="/auth/login" className="font-label-md text-label-md text-primary hover:underline">← Back to Login</Link>
        </p>
      </div>
    </div>
  </div>
);
export default ForgotPassword;
`,

// ─── PUBLIC PAGES ─────────────────────────────────────────────────────────────
'src/pages/public/Home.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Brain, BarChart2, Calendar, ArrowRight, Star } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Resume Screening', desc: 'Automatically rank and shortlist candidates with AI-powered analysis saving 80% of screening time.' },
  { icon: Calendar, title: 'Smart Scheduling', desc: 'Coordinate interview slots across time zones with automated calendar sync and reminders.' },
  { icon: Users, title: 'Employee Lifecycle', desc: 'From hiring to offboarding, manage every touchpoint of the employee journey in one place.' },
  { icon: BarChart2, title: 'Real-time Analytics', desc: 'Get actionable insights into hiring velocity, cost per hire, and team performance metrics.' },
];

const stats = [
  { value: '10k+', label: 'HR Professionals' },
  { value: '500k+', label: 'Candidates Processed' },
  { value: '40%', label: 'Faster Hiring' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const Home = () => (
  <div>
    {/* Hero */}
    <section className="relative bg-primary overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-on-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-secondary/30">
            <Star size={14} className="fill-on-primary" /> AI-Powered HR Platform
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-primary font-black mb-6 leading-tight">
            The Modern HR Suite for Growing Teams
          </h1>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim mb-8 max-w-lg">
            Streamline recruitment, automate interviews, and manage your workforce — all in one beautiful platform built for speed.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/auth/register" className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-md">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/careers" className="bg-transparent border border-on-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-primary-container/30 transition-all">
              View Open Roles
            </Link>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-primary-container/40 border border-primary-container rounded-xl p-6 text-center">
              <div className="font-headline-lg text-headline-lg text-on-primary font-black">{s.value}</div>
              <div className="font-label-md text-label-md text-primary-fixed-dim mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">Everything you need to hire smarter</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">HRFlow brings all your HR operations into a single, intuitive platform that your team will actually love using.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant hover:shadow-md hover:border-primary transition-all group">
              <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <f.icon size={24} className="text-primary group-hover:text-on-primary transition-colors" />
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">{f.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-secondary py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-secondary font-bold mb-4">Ready to transform your hiring?</h2>
        <p className="font-body-lg text-body-lg text-on-secondary/80 mb-8">Join 10,000+ HR professionals already using HRFlow.</p>
        <Link to="/auth/register" className="inline-flex items-center gap-2 bg-on-secondary text-secondary px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-surface transition-all shadow-lg">
          Start Free Trial <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  </div>
);
export default Home;
`,

'src/pages/public/About.tsx': `import React from 'react';

const About = () => (
  <div className="max-w-4xl mx-auto px-6 py-20">
    <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-6">About HRFlow</h1>
    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
      HRFlow was founded with a simple mission: make human resources management intuitive, powerful, and data-driven. 
      We believe great companies are built by great teams, and great teams start with great hiring.
    </p>
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {[
        { year: '2021', event: 'HRFlow founded in Dhaka' },
        { year: '2023', event: 'Reached 5,000 active companies' },
        { year: '2026', event: 'Launched AI Screening Module' },
      ].map(item => (
        <div key={item.year} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant">
          <div className="text-secondary font-bold text-2xl mb-2">{item.year}</div>
          <p className="font-body-md text-body-md text-on-surface-variant">{item.event}</p>
        </div>
      ))}
    </div>
  </div>
);
export default About;
`,

'src/pages/public/Careers.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const jobs = [
  { title: 'Senior Frontend Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Manager', dept: 'Product', location: 'Dhaka, BD', type: 'Full-time' },
  { title: 'UX Designer', dept: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Data Analyst Intern', dept: 'Analytics', location: 'Dhaka, BD', type: 'Internship' },
];

const Careers = () => (
  <div className="max-w-5xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">Open Positions</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">Join our team and help shape the future of HR technology.</p>
    </div>
    <div className="space-y-4">
      {jobs.map(job => (
        <div key={job.title} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant hover:border-primary hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{job.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">{job.dept}</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><MapPin size={12} />{job.location}</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Clock size={12} />{job.type}</span>
              </div>
            </div>
            <Link to="/auth/register" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all opacity-0 group-hover:opacity-100">
              Apply <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Careers;
`,

'src/pages/public/Contact.tsx': `import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => (
  <div className="max-w-5xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">Contact Us</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">We'd love to hear from you. Send us a message!</p>
    </div>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-6">Send a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Name</label>
            <input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email</label>
            <input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Message</label>
            <textarea rows={5} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>
          <button className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all">Send Message</button>
        </form>
      </div>
      <div className="space-y-6">
        {[
          { icon: Mail, label: 'Email', value: 'hello@hrflow.app' },
          { icon: Phone, label: 'Phone', value: '+880 1700 000000' },
          { icon: MapPin, label: 'Office', value: 'Dhaka, Bangladesh' },
        ].map(c => (
          <div key={c.label} className="flex items-start gap-4 p-6 bg-surface-container-lowest rounded-xl border border-outline-variant">
            <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center shrink-0">
              <c.icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">{c.label}</p>
              <p className="font-body-lg text-body-lg text-on-surface font-medium">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default Contact;
`,

// ─── HR PAGES ─────────────────────────────────────────────────────────────────
'src/pages/hr/HRDashboard.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Calendar, TrendingUp, ArrowRight, Star, Clock } from 'lucide-react';

const metrics = [
  { label: 'Open Vacancies', value: '12', change: '+3 this week', icon: Briefcase, color: 'bg-primary-fixed text-primary' },
  { label: 'Total Applicants', value: '248', change: '+42 today', icon: Users, color: 'bg-secondary-fixed text-secondary' },
  { label: 'Interviews Today', value: '8', change: '3 pending', icon: Calendar, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { label: 'Hire Rate', value: '23%', change: '+5% vs last month', icon: TrendingUp, color: 'bg-error-container text-error' },
];

const recentApps = [
  { name: 'Marcus Aurelius', role: 'Product Manager', date: 'Today', status: 'New', statusColor: 'bg-primary-fixed text-primary' },
  { name: 'Elena Rostova', role: 'Data Analyst', date: 'Yesterday', status: 'Screening', statusColor: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { name: 'James Smith', role: 'Senior Frontend Dev', date: 'Oct 24', status: 'Interviewing', statusColor: 'bg-secondary-fixed text-secondary' },
  { name: 'Aisha Patel', role: 'UX Designer', date: 'Oct 23', status: 'Offer Sent', statusColor: 'bg-surface-container text-on-surface-variant' },
];

const todayInterviews = [
  { time: '10:00 AM', name: 'Sarah Connor', role: 'Full Stack Engineer', duration: '60 min', type: 'Video' },
  { time: '1:30 PM', name: 'Alex Johnson', role: 'UX Designer', duration: '45 min', type: 'Room A' },
];

const aiMatches = [
  { name: 'Priya Sharma', role: 'Full Stack Engineer', match: 98, tags: ['React', 'Node.js', '5+ YOE'] },
  { name: 'Marcus Roy', role: 'Product Manager', match: 94, tags: ['Agile', 'Roadmapping'] },
  { name: 'Lin Wei', role: 'Data Analyst', match: 91, tags: ['Python', 'SQL', 'Tableau'] },
];

const HRDashboard = () => (
  <div className="p-6 space-y-6">
    {/* Page header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">HR Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Wednesday, July 9, 2026</p>
      </div>
      <Link to="/hr/vacancies" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        + Post New Job
      </Link>
    </div>

    {/* Metric Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">{m.label}</p>
              <p className="font-headline-lg text-headline-lg text-on-surface font-bold mt-1">{m.value}</p>
            </div>
            <div className={\`w-10 h-10 rounded-lg flex items-center justify-center \${m.color}\`}>
              <m.icon size={20} />
            </div>
          </div>
          <p className="font-label-sm text-label-sm text-secondary">{m.change}</p>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left - 2/3 */}
      <div className="lg:col-span-2 space-y-6">
        {/* Today's Interviews */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Today's Interviews</h3>
            <Link to="/hr/interviews" className="font-label-md text-label-md text-secondary hover:underline">View All</Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {todayInterviews.map(iv => (
              <div key={iv.name} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-surface-variant text-on-surface-variant rounded-lg p-2 text-center min-w-[70px]">
                    <div className="font-label-sm text-label-sm">{iv.time}</div>
                    <div className="font-label-md text-label-md text-primary mt-0.5">{iv.duration}</div>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{iv.name}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{iv.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">{iv.type}</span>
                  <button className="bg-secondary text-on-secondary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Recent Applications</h3>
            <Link to="/hr/applicants" className="font-label-md text-label-md text-secondary hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  {['Candidate', 'Position', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-surface-variant">
                {recentApps.map(app => (
                  <tr key={app.name} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-primary">{app.name}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{app.role}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{app.date}</td>
                    <td className="px-4 py-3"><span className={\`px-2 py-1 rounded-full font-label-sm text-label-sm uppercase font-bold \${app.statusColor}\`}>{app.status}</span></td>
                    <td className="px-4 py-3"><Link to="/hr/applicants" className="text-secondary hover:underline font-label-md text-label-md">Review</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right - AI Matches */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-outline-variant flex items-center gap-2 bg-gradient-to-r from-primary-container/10 to-surface-container-low">
          <Star size={18} className="text-secondary fill-secondary" />
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">AI Top Matches</h3>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {aiMatches.map(m => (
            <div key={m.name} className="bg-surface border border-outline-variant rounded-lg p-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{m.name}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs">{m.role}</p>
                </div>
                <span className={\`text-xs font-bold px-2 py-1 rounded-full \${m.match >= 95 ? 'bg-error-container text-on-error-container' : 'bg-tertiary-fixed text-on-tertiary-fixed'}\`}>{m.match}%</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {m.tags.map(t => <span key={t} className="text-[11px] bg-surface-container px-2 py-0.5 rounded border border-outline-variant text-on-surface-variant">{t}</span>)}
              </div>
              <button className="w-full mt-3 border border-secondary text-secondary py-1.5 rounded-lg text-sm font-medium hover:bg-secondary-fixed transition-colors">
                Review Profile
              </button>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-outline-variant bg-surface text-center">
          <Link to="/hr/cv-screening" className="font-label-md text-label-md text-secondary hover:underline">View All Matches</Link>
        </div>
      </div>
    </div>
  </div>
);
export default HRDashboard;
`,

'src/pages/hr/ManageVacancies.tsx': `import React from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Clock } from 'lucide-react';

const vacancies = [
  { title: 'Senior Frontend Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time', applications: 45, status: 'Active', posted: '5 days ago' },
  { title: 'Product Manager', dept: 'Product', location: 'Dhaka', type: 'Full-time', applications: 28, status: 'Active', posted: '1 week ago' },
  { title: 'UX Designer', dept: 'Design', location: 'Hybrid', type: 'Full-time', applications: 17, status: 'Paused', posted: '2 weeks ago' },
  { title: 'Data Analyst Intern', dept: 'Analytics', location: 'On-site', type: 'Internship', applications: 62, status: 'Active', posted: '3 days ago' },
];

const ManageVacancies = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Manage Vacancies</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Create and manage job postings</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        <Plus size={16} /> Post New Job
      </button>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {[{ label: 'Active Jobs', val: '10' }, { label: 'Total Applications', val: '152' }, { label: 'Avg. Time to Fill', val: '18 days' }].map(s => (
        <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center">
          <p className="font-headline-lg text-headline-lg text-primary font-bold">{s.val}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <input type="text" placeholder="Search vacancies..." className="w-full max-w-xs rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>{['Job Title', 'Department', 'Location', 'Applications', 'Status', 'Actions'].map(h => (
              <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-surface-variant">
            {vacancies.map(v => (
              <tr key={v.title} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-4 py-4">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{v.title}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-0.5 flex items-center gap-1"><Clock size={11} />{v.posted}</p>
                </td>
                <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{v.dept}</td>
                <td className="px-4 py-4"><span className="flex items-center gap-1 font-body-md text-body-md text-on-surface-variant"><MapPin size={12} />{v.location}</span></td>
                <td className="px-4 py-4 font-body-md text-body-md text-on-surface font-semibold">{v.applications}</td>
                <td className="px-4 py-4"><span className={\`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold \${v.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-surface-variant text-on-surface-variant'}\`}>{v.status}</span></td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:text-primary transition-colors text-on-surface-variant"><Eye size={16} /></button>
                    <button className="p-1.5 hover:text-secondary transition-colors text-on-surface-variant"><Edit size={16} /></button>
                    <button className="p-1.5 hover:text-error transition-colors text-on-surface-variant"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
export default ManageVacancies;
`,

'src/pages/hr/ApplicantList.tsx': `import React from 'react';
import { Filter, Download } from 'lucide-react';

const applicants = [
  { name: 'Marcus Aurelius', role: 'Product Manager', email: 'marcus@email.com', score: 92, status: 'New', date: 'Jul 9, 2026' },
  { name: 'Elena Rostova', role: 'Data Analyst', email: 'elena@email.com', score: 88, status: 'Screening', date: 'Jul 8, 2026' },
  { name: 'James Smith', role: 'Sr. Frontend Dev', email: 'james@email.com', score: 95, status: 'Interview', date: 'Jul 7, 2026' },
  { name: 'Aisha Patel', role: 'UX Designer', email: 'aisha@email.com', score: 78, status: 'Offer Sent', date: 'Jul 6, 2026' },
  { name: 'Lin Wei', role: 'Data Analyst', email: 'lin@email.com', score: 85, status: 'New', date: 'Jul 9, 2026' },
];

const statusColor: Record<string, string> = {
  'New': 'bg-primary-fixed text-primary',
  'Screening': 'bg-tertiary-fixed text-on-tertiary-fixed',
  'Interview': 'bg-secondary-fixed text-secondary',
  'Offer Sent': 'bg-surface-variant text-on-surface-variant',
};

const ApplicantList = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Applicant List</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage incoming applications</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Filter size={16} /> Filter</button>
        <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Download size={16} /> Export</button>
      </div>
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant flex gap-3">
        <input type="text" placeholder="Search applicants..." className="flex-1 max-w-xs rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        <select className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none text-on-surface-variant">
          <option>All Positions</option>
          <option>Product Manager</option>
          <option>Frontend Dev</option>
        </select>
      </div>
      <table className="w-full text-left">
        <thead className="bg-surface-container-low border-b border-outline-variant">
          <tr>{['Candidate', 'Position', 'AI Score', 'Status', 'Applied', 'Actions'].map(h => (
            <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {applicants.map(a => (
            <tr key={a.name} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm">{a.name[0]}</div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{a.name}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-xs">{a.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{a.role}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 max-w-[80px] h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: a.score + '%' }} />
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">{a.score}</span>
                </div>
              </td>
              <td className="px-4 py-4"><span className={\`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold \${statusColor[a.status] || 'bg-surface-variant text-on-surface-variant'}\`}>{a.status}</span></td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{a.date}</td>
              <td className="px-4 py-4">
                <button className="border border-primary text-primary px-3 py-1 rounded-lg font-label-md text-label-md hover:bg-primary-fixed transition-colors text-xs">Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ApplicantList;
`,

'src/pages/hr/CVScreening.tsx': `import React from 'react';
import { Brain, Star, ChevronRight } from 'lucide-react';

const candidates = [
  { name: 'Priya Sharma', role: 'Full Stack Engineer', match: 98, skills: ['React', 'Node.js', 'TypeScript'], yoe: 6 },
  { name: 'Marcus Roy', role: 'Product Manager', match: 94, skills: ['Agile', 'Roadmapping', 'Jira'], yoe: 5 },
  { name: 'Lin Wei', role: 'Data Analyst', match: 91, skills: ['Python', 'SQL', 'Tableau'], yoe: 3 },
  { name: 'Aisha Johnson', role: 'UX Designer', match: 87, skills: ['Figma', 'Research', 'Prototyping'], yoe: 4 },
  { name: 'David Kim', role: 'Backend Engineer', match: 83, skills: ['Java', 'Spring', 'Microservices'], yoe: 7 },
];

const CVScreening = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-secondary-fixed rounded-xl flex items-center justify-center">
        <Brain size={20} className="text-secondary" />
      </div>
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">AI CV Screening</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Candidates ranked by AI match score for selected position</p>
      </div>
    </div>
    <div className="bg-primary-fixed/30 border border-primary-fixed rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Star size={20} className="text-primary fill-primary" />
        <p className="font-body-md text-body-md text-primary font-medium">AI has analyzed <strong>248 CVs</strong> and ranked top candidates for <strong>Senior Frontend Developer</strong></p>
      </div>
      <select className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none">
        <option>Senior Frontend Developer</option>
        <option>Product Manager</option>
        <option>UX Designer</option>
      </select>
    </div>
    <div className="space-y-4">
      {candidates.map((c, i) => (
        <div key={c.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex items-center gap-5">
          <div className="text-2xl font-black text-on-surface-variant w-8 text-center">#{i + 1}</div>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="font-label-md text-label-md text-on-surface font-semibold">{c.name}</p>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">{c.role} · {c.yoe} YOE</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {c.skills.map(s => <span key={s} className="text-xs bg-surface-container border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">{s}</span>)}
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center">
              <div className={\`text-2xl font-black \${c.match >= 95 ? 'text-error' : c.match >= 90 ? 'text-secondary' : 'text-on-surface'}\`}>{c.match}%</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">AI Match</div>
            </div>
            <button className="flex items-center gap-1 border border-secondary text-secondary px-3 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary-fixed transition-colors">
              Review <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default CVScreening;
`,

'src/pages/hr/InterviewSchedule.tsx': `import React from 'react';
import { Calendar, Plus, Video, MapPin } from 'lucide-react';

const interviews = [
  { time: '9:00 AM', name: 'Priya Sharma', role: 'Full Stack Engineer', interviewer: 'Dr. Rahman', type: 'Video', status: 'Upcoming' },
  { time: '10:30 AM', name: 'Marcus Roy', role: 'Product Manager', interviewer: 'Ms. Ahmed', type: 'Room B', status: 'Upcoming' },
  { time: '1:00 PM', name: 'Lin Wei', role: 'Data Analyst', interviewer: 'Mr. Khan', type: 'Video', status: 'In Progress' },
  { time: '3:00 PM', name: 'Aisha Johnson', role: 'UX Designer', interviewer: 'Dr. Chowdhury', type: 'Room A', status: 'Upcoming' },
];

const InterviewSchedule = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Interview Schedule</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Wednesday, July 9, 2026</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        <Plus size={16} /> Schedule Interview
      </button>
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant bg-surface-container-low/50 flex items-center gap-2">
        <Calendar size={18} className="text-primary" />
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Today's Schedule</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        {interviews.map(iv => (
          <div key={iv.name} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-20 text-center">
                <p className="font-label-md text-label-md text-primary font-semibold">{iv.time}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold shrink-0">
                {iv.name[0]}
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{iv.name}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{iv.role} · with {iv.interviewer}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                {iv.type === 'Video' ? <Video size={12} /> : <MapPin size={12} />} {iv.type}
              </span>
              <span className={\`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold \${iv.status === 'In Progress' ? 'bg-secondary-fixed text-secondary' : 'bg-surface-variant text-on-surface-variant'}\`}>{iv.status}</span>
              {iv.type === 'Video' && <button className="bg-secondary text-on-secondary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors">Join</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default InterviewSchedule;
`,

'src/pages/hr/ManageEmployees.tsx': `import React from 'react';
import { Search, Filter, Mail, Phone } from 'lucide-react';

const employees = [
  { name: 'Sarah Hassan', role: 'Software Engineer', dept: 'Engineering', email: 'sarah@hrflow.app', phone: '+880 1700 000001', status: 'Active', joined: 'Jan 2024' },
  { name: 'Rafi Ahmed', role: 'Product Manager', dept: 'Product', email: 'rafi@hrflow.app', phone: '+880 1700 000002', status: 'Active', joined: 'Mar 2023' },
  { name: 'Nadia Islam', role: 'UX Designer', dept: 'Design', email: 'nadia@hrflow.app', phone: '+880 1700 000003', status: 'On Leave', joined: 'Jul 2022' },
  { name: 'Tanvir Khan', role: 'Data Analyst', dept: 'Analytics', email: 'tanvir@hrflow.app', phone: '+880 1700 000004', status: 'Active', joined: 'Sep 2023' },
];

const ManageEmployees = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Manage Employees</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Employee directory and records</p>
      </div>
      <button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">+ Add Employee</button>
    </div>
    <div className="flex gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input type="text" placeholder="Search employees..." className="pl-9 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none" />
      </div>
      <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Filter size={16} /> Filter</button>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      {employees.map(e => (
        <div key={e.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:shadow-md hover:border-primary transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">{e.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-label-md text-label-md text-on-surface font-semibold">{e.name}</p>
                <span className={\`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold text-[10px] \${e.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-tertiary-fixed text-on-tertiary-fixed'}\`}>{e.status}</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-0.5">{e.role} · {e.dept}</p>
              <div className="mt-3 space-y-1">
                <p className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant text-xs"><Mail size={12} />{e.email}</p>
                <p className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant text-xs"><Phone size={12} />{e.phone}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-outline-variant flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Joined {e.joined}</span>
                <button className="border border-primary text-primary px-3 py-1 rounded-lg font-label-md text-label-md hover:bg-primary-fixed transition-colors text-xs">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ManageEmployees;
`,

// ─── CANDIDATE PAGES ──────────────────────────────────────────────────────────
'src/pages/candidate/CandidateDashboard.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const metrics = [
  { label: 'Applications Sent', value: '7', icon: FileText, color: 'bg-primary-fixed text-primary' },
  { label: 'Interviews Scheduled', value: '2', icon: Calendar, color: 'bg-secondary-fixed text-secondary' },
  { label: 'Offers Received', value: '1', icon: CheckCircle, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { label: 'Tests Pending', value: '3', icon: Clock, color: 'bg-error-container text-error' },
];

const apps = [
  { company: 'TechCorp BD', role: 'Frontend Developer', status: 'Under Review', date: 'Jul 7' },
  { company: 'DataViz Ltd', role: 'Data Analyst', status: 'Interview Scheduled', date: 'Jul 5' },
  { company: 'FinTech Hub', role: 'UX Designer', status: 'Applied', date: 'Jul 3' },
];

const CandidateDashboard = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">My Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Welcome back, Candidate!</p>
      </div>
      <Link to="/candidate/internships" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        Browse Jobs <ArrowRight size={16} />
      </Link>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className={\`w-10 h-10 rounded-lg flex items-center justify-center \${m.color}\`}><m.icon size={18} /></div>
          </div>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{m.value}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{m.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">My Applications</h3>
        <Link to="/candidate/applications" className="font-label-md text-label-md text-secondary hover:underline">View All</Link>
      </div>
      <div className="divide-y divide-outline-variant">
        {apps.map(a => (
          <div key={a.company} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold">{a.company[0]}</div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{a.role}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{a.company}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-1 rounded-full font-label-sm text-label-sm font-bold bg-secondary-fixed text-secondary">{a.status}</span>
              <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default CandidateDashboard;
`,

'src/pages/candidate/InternshipsList.tsx': `import React from 'react';
import { MapPin, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
  { title: 'Senior Frontend Developer', company: 'TechCorp BD', location: 'Remote', type: 'Full-time', salary: '৳80k–120k', tags: ['React', 'TypeScript', 'Node.js'], posted: '2 days ago' },
  { title: 'Data Analyst Intern', company: 'DataViz Ltd', location: 'Dhaka', type: 'Internship', salary: '৳20k–30k', tags: ['Python', 'SQL', 'Excel'], posted: '3 days ago' },
  { title: 'UX Designer', company: 'DesignStudio', location: 'Hybrid', type: 'Full-time', salary: '৳60k–90k', tags: ['Figma', 'Prototyping'], posted: '1 week ago' },
  { title: 'Product Manager', company: 'FinTech Hub', location: 'Dhaka', type: 'Full-time', salary: '৳100k–150k', tags: ['Agile', 'Jira', 'Analytics'], posted: '5 days ago' },
];

const InternshipsList = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Browse Opportunities</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Discover jobs and internships that match your skills</p>
    </div>
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input type="text" placeholder="Search by title, company or skill..." className="pl-9 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2.5 text-sm focus:border-primary focus:outline-none" />
      </div>
      <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Filter size={16} /> Filter</button>
    </div>
    <div className="space-y-4">
      {jobs.map(job => (
        <div key={job.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:border-primary hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">{job.company[0]}</div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{job.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">{job.company}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><MapPin size={12} />{job.location}</span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Clock size={12} />{job.type}</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">{job.salary}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.tags.map(t => <span key={t} className="text-xs bg-primary-fixed text-primary px-2 py-0.5 rounded border border-primary-fixed-dim">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">{job.posted}</span>
              <Link to="/candidate/apply" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">
                Apply <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default InternshipsList;
`,

'src/pages/candidate/ApplyJob.tsx': `import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';

const ApplyJob = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Apply for Job</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Senior Frontend Developer at TechCorp BD</p>
      </div>
      {/* Progress */}
      <div className="flex items-center gap-2">
        {['Personal Info', 'Upload CV', 'Cover Letter', 'Review'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={\`flex items-center gap-2 \${i + 1 <= step ? 'text-primary' : 'text-on-surface-variant'}\`}>
              <div className={\`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 \${i + 1 < step ? 'bg-primary border-primary text-on-primary' : i + 1 === step ? 'border-primary text-primary' : 'border-outline-variant text-on-surface-variant'}\`}>
                {i + 1 < step ? <CheckCircle size={14} className="fill-current" /> : i + 1}
              </div>
              <span className="font-label-sm text-label-sm hidden sm:block">{s}</span>
            </div>
            {i < 3 && <div className={\`flex-1 h-0.5 \${i + 1 < step ? 'bg-primary' : 'bg-outline-variant'}\`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-8 space-y-5">
        {step === 1 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">First name</label><input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Last name</label><input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          </div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email</label><input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Phone</label><input type="tel" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">LinkedIn URL</label><input type="url" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="https://linkedin.com/in/..." /></div>
        </>)}
        {step === 2 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Upload Your CV</h2>
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-10 text-center hover:border-primary transition-colors cursor-pointer bg-surface-container-low/50">
            <Upload size={32} className="mx-auto text-on-surface-variant mb-3" />
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">Drag and drop your CV here</p>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">PDF, DOCX up to 10MB</p>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">Choose File</button>
          </div>
        </>)}
        {step === 3 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Cover Letter</h2>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Why are you a great fit for this role?</label>
          <textarea rows={8} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none" placeholder="Write your cover letter here..." /></div>
        </>)}
        {step === 4 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Review Your Application</h2>
          <div className="space-y-3">
            {[['Position', 'Senior Frontend Developer'], ['Company', 'TechCorp BD'], ['Location', 'Remote'], ['Type', 'Full-time']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-outline-variant">
                <span className="font-label-md text-label-md text-on-surface-variant">{k}</span>
                <span className="font-body-md text-body-md text-on-surface">{v}</span>
              </div>
            ))}
          </div>
        </>)}
      </div>
      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="border border-outline-variant px-6 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary disabled:opacity-50 transition-colors">Previous</button>
        <button onClick={() => setStep(Math.min(4, step + 1))} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">
          {step === 4 ? 'Submit Application' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};
export default ApplyJob;
`,

'src/pages/candidate/MyApplications.tsx': `import React from 'react';
import { CheckCircle, Clock, XCircle, Calendar } from 'lucide-react';

const apps = [
  { company: 'TechCorp BD', role: 'Senior Frontend Developer', applied: 'Jul 7', status: 'Interview', stage: 'Technical Interview', stageNum: 3 },
  { company: 'DataViz Ltd', role: 'Data Analyst', applied: 'Jul 5', status: 'Under Review', stage: 'Screening', stageNum: 2 },
  { company: 'FinTech Hub', role: 'Product Manager', applied: 'Jul 3', status: 'Applied', stage: 'Application Submitted', stageNum: 1 },
  { company: 'StartupXYZ', role: 'UX Designer', applied: 'Jun 28', status: 'Rejected', stage: 'Rejected', stageNum: 0 },
];

const statusIcon = (s: string) => {
  if (s === 'Rejected') return <XCircle size={16} className="text-error" />;
  if (s === 'Interview') return <Calendar size={16} className="text-secondary" />;
  return <Clock size={16} className="text-on-surface-variant" />;
};

const MyApplications = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Applications</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track the progress of all your job applications</p>
    </div>
    <div className="space-y-4">
      {apps.map(a => (
        <div key={a.company} className={\`bg-surface-container-lowest rounded-xl border p-5 hover:shadow-md transition-all \${a.status === 'Rejected' ? 'border-error/30 opacity-75' : 'border-outline-variant hover:border-primary'}\`}>
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">{a.company[0]}</div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{a.role}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{a.company} · Applied {a.applied}</p>
                {a.stageNum > 0 && (
                  <div className="flex items-center gap-1.5 mt-3">
                    {[1,2,3,4].map(n => (
                      <div key={n} className={\`h-1.5 w-8 rounded-full \${n <= a.stageNum ? 'bg-primary' : 'bg-surface-variant'}\`} />
                    ))}
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-2">{a.stage}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {statusIcon(a.status)}
              <span className={\`font-label-sm text-label-sm font-bold px-2 py-1 rounded-full \${
                a.status === 'Rejected' ? 'bg-error-container text-on-error-container' :
                a.status === 'Interview' ? 'bg-secondary-fixed text-secondary' :
                'bg-surface-variant text-on-surface-variant'
              }\`}>{a.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default MyApplications;
`,

'src/pages/candidate/Quiz.tsx': `import React, { useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const quizzes = [
  { title: 'React & Frontend Fundamentals', questions: 20, duration: '30 min', status: 'Pending', deadline: 'Jul 11' },
  { title: 'JavaScript Problem Solving', questions: 15, duration: '25 min', status: 'Completed', score: 87, deadline: 'Jul 8' },
];

const Quiz = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Assessments</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Complete assigned skill assessments before your interviews</p>
    </div>
    <div className="space-y-4">
      {quizzes.map(q => (
        <div key={q.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{q.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Clock size={12} />{q.duration}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{q.questions} questions</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Due {q.deadline}</span>
              </div>
              {q.status === 'Completed' && q.score && (
                <div className="mt-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-secondary" />
                  <span className="font-label-md text-label-md text-secondary font-bold">Score: {q.score}/100</span>
                </div>
              )}
            </div>
            <div>
              {q.status === 'Pending' ? (
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">Start Assessment</button>
              ) : (
                <button className="border border-outline-variant text-on-surface-variant px-5 py-2.5 rounded-lg font-label-md text-label-md hover:border-primary transition-colors">View Results</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Quiz;
`,

// ─── EMPLOYEE PAGES ───────────────────────────────────────────────────────────
'src/pages/employee/EmployeeDashboard.tsx': `import React from 'react';
import { CheckSquare, Clock, TrendingUp, Calendar } from 'lucide-react';

const EmployeeDashboard = () => {
  const now = new Date();
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Employee Dashboard</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Good morning, Employee!</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-2">
            <Clock size={16} /> Clock In
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Due Today', val: '4', icon: CheckSquare, color: 'bg-primary-fixed text-primary' },
          { label: 'Hours This Week', val: '32h', icon: Clock, color: 'bg-secondary-fixed text-secondary' },
          { label: 'Performance Score', val: '87%', icon: TrendingUp, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
          { label: 'Leave Days Left', val: '8', icon: Calendar, color: 'bg-surface-variant text-on-surface-variant' },
        ].map(m => (
          <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
            <div className={\`w-10 h-10 rounded-lg flex items-center justify-center mb-3 \${m.color}\`}><m.icon size={18} /></div>
            <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{m.val}</p>
            <p className="font-label-md text-label-md text-on-surface-variant mt-1">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Complete UI design review', priority: 'High', done: false },
              { task: 'Update API documentation', priority: 'Medium', done: true },
              { task: 'Team standup at 10am', priority: 'High', done: true },
              { task: 'Code review for PR #42', priority: 'Low', done: false },
            ].map(t => (
              <div key={t.task} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                <div className={\`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 \${t.done ? 'border-secondary bg-secondary' : 'border-outline-variant'}\`}>
                  {t.done && <CheckSquare size={10} className="text-on-secondary" />}
                </div>
                <span className={\`flex-1 font-body-md text-body-md \${t.done ? 'line-through text-on-surface-variant' : 'text-on-surface'}\`}>{t.task}</span>
                <span className={\`font-label-sm text-label-sm px-2 py-0.5 rounded text-[10px] font-bold \${t.priority === 'High' ? 'bg-error-container text-on-error-container' : t.priority === 'Medium' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-variant text-on-surface-variant'}\`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Attendance This Week</h3>
          <div className="space-y-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
              <div key={d} className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm text-on-surface-variant w-8">{d}</span>
                <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: i < 3 ? '100%' : i === 3 ? '87%' : '0%' }} />
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant w-16 text-right">{i < 3 ? '8h 00m' : i === 3 ? '7h 00m' : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeDashboard;
`,

'src/pages/employee/MyTasks.tsx': `import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const initialColumns = {
  todo: [
    { id: 1, title: 'Update API documentation', priority: 'High', due: 'Jul 10' },
    { id: 2, title: 'Design review feedback', priority: 'Medium', due: 'Jul 11' },
  ],
  inprogress: [
    { id: 3, title: 'Complete UI design review', priority: 'High', due: 'Jul 9' },
    { id: 4, title: 'Implement new auth flow', priority: 'High', due: 'Jul 9' },
  ],
  done: [
    { id: 5, title: 'Team standup meeting', priority: 'Low', due: 'Jul 9' },
    { id: 6, title: 'Code review for PR #42', priority: 'Medium', due: 'Jul 8' },
  ],
};

const priorityColor: Record<string, string> = {
  High: 'bg-error-container text-on-error-container',
  Medium: 'bg-tertiary-fixed text-on-tertiary-fixed',
  Low: 'bg-surface-variant text-on-surface-variant',
};

const MyTasks = () => {
  const [cols] = useState(initialColumns);
  const colMeta = [
    { key: 'todo', label: 'To Do', color: 'border-t-outline-variant' },
    { key: 'inprogress', label: 'In Progress', color: 'border-t-secondary' },
    { key: 'done', label: 'Done', color: 'border-t-primary' },
  ];
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">My Tasks</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your assigned tasks</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Plus size={16} /> Add Task</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {colMeta.map(col => (
          <div key={col.key} className="bg-surface-container-low rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{col.label}</h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{cols[col.key as keyof typeof cols].length}</span>
            </div>
            <div className="space-y-3">
              {cols[col.key as keyof typeof cols].map((task: any) => (
                <div key={task.id} className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant hover:border-primary hover:shadow-sm transition-all cursor-grab">
                  <p className="font-label-md text-label-md text-on-surface font-semibold mb-2">{task.title}</p>
                  <div className="flex items-center justify-between">
                    <span className={\`font-label-sm text-label-sm px-2 py-0.5 rounded text-[10px] font-bold \${priorityColor[task.priority]}\`}>{task.priority}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Due {task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyTasks;
`,

'src/pages/employee/MyAttendance.tsx': `import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const records = [
  { date: 'Jul 9, 2026', day: 'Wed', in: '9:02 AM', out: null, hours: null, status: 'Present' },
  { date: 'Jul 8, 2026', day: 'Tue', in: '8:58 AM', out: '5:03 PM', hours: '8h 05m', status: 'Present' },
  { date: 'Jul 7, 2026', day: 'Mon', in: '9:15 AM', out: '5:00 PM', hours: '7h 45m', status: 'Present' },
  { date: 'Jul 4, 2026', day: 'Fri', in: null, out: null, hours: null, status: 'Absent' },
  { date: 'Jul 3, 2026', day: 'Thu', in: '9:00 AM', out: '5:00 PM', hours: '8h 00m', status: 'Present' },
];

const MyAttendance = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">My Attendance</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Clock in/out and view your attendance history</p>
      </div>
    </div>
    <div className="bg-primary rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="font-label-md text-label-md text-primary-fixed-dim">Today — Wednesday, July 9</p>
        <p className="font-headline-lg text-headline-lg text-on-primary font-bold mt-1">Clocked In: 9:02 AM</p>
        <p className="font-body-md text-body-md text-primary-fixed-dim mt-1">Working for: 4h 22m</p>
      </div>
      <button className="bg-error text-on-error px-6 py-3 rounded-xl font-label-md text-label-md hover:bg-on-error-container transition-colors shadow-md flex items-center gap-2">
        <Clock size={18} /> Clock Out
      </button>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {[{ label: 'Days Present', val: '18' }, { label: 'Days Absent', val: '2' }, { label: 'Avg Hours/Day', val: '7.9h' }].map(s => (
        <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center">
          <p className="font-headline-md text-headline-md text-primary font-bold">{s.val}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Attendance History</h3>
      </div>
      <table className="w-full text-left">
        <thead className="bg-surface-container-low border-b border-outline-variant">
          <tr>{['Date', 'Day', 'Clock In', 'Clock Out', 'Hours', 'Status'].map(h => (
            <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {records.map(r => (
            <tr key={r.date} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.date}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface-variant">{r.day}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.in || '—'}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.out || '—'}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.hours || '—'}</td>
              <td className="px-4 py-3">
                <span className={\`flex items-center gap-1 font-label-sm text-label-sm font-bold px-2 py-1 rounded-full w-fit \${r.status === 'Present' ? 'bg-secondary-fixed text-secondary' : 'bg-error-container text-on-error-container'}\`}>
                  {r.status === 'Present' ? <CheckCircle size={12} /> : <XCircle size={12} />} {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default MyAttendance;
`,

'src/pages/employee/MyPerformance.tsx': `import React from 'react';
import { TrendingUp, Star } from 'lucide-react';

const goals = [
  { title: 'Complete React certification', progress: 75 },
  { title: 'Mentor 2 junior developers', progress: 50 },
  { title: 'Lead 1 sprint as Scrum Master', progress: 100 },
];

const MyPerformance = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Performance</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Q3 2026 performance review</p>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { label: 'Overall Score', val: '87', unit: '/100', color: 'text-secondary' },
        { label: 'Goals Completed', val: '6', unit: '/8', color: 'text-primary' },
        { label: 'Manager Rating', val: '4.2', unit: '/5.0', color: 'text-on-tertiary-fixed' },
      ].map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant text-center">
          <p className={\`font-headline-lg text-headline-lg font-black \${m.color}\`}>{m.val}<span className="font-body-md text-body-md text-on-surface-variant">{m.unit}</span></p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-2">{m.label}</p>
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">Q3 Goals Progress</h3>
        <div className="space-y-4">
          {goals.map(g => (
            <div key={g.title}>
              <div className="flex justify-between mb-1">
                <span className="font-body-md text-body-md text-on-surface">{g.title}</span>
                <span className="font-label-md text-label-md text-secondary font-bold">{g.progress}%</span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all" style={{ width: g.progress + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">Skill Ratings</h3>
        <div className="space-y-4">
          {[
            { skill: 'Technical Skills', score: 4.5 },
            { skill: 'Communication', score: 4.0 },
            { skill: 'Teamwork', score: 4.8 },
            { skill: 'Problem Solving', score: 4.2 },
          ].map(s => (
            <div key={s.skill} className="flex items-center justify-between">
              <span className="font-body-md text-body-md text-on-surface-variant">{s.skill}</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n => (
                  <Star key={n} size={16} className={n <= Math.round(s.score) ? 'text-on-tertiary-fixed fill-on-tertiary-fixed' : 'text-surface-variant'} />
                ))}
                <span className="font-label-md text-label-md text-on-surface-variant ml-2">{s.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default MyPerformance;
`,

// ─── ADMIN PAGES ──────────────────────────────────────────────────────────────
'src/pages/admin/AdminDashboard.tsx': `import React from 'react';
import { Users, Building2, Activity, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Admin Dashboard</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">System overview and management</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Users', val: '1,248', icon: Users, color: 'bg-primary-fixed text-primary' },
        { label: 'Active Companies', val: '34', icon: Building2, color: 'bg-secondary-fixed text-secondary' },
        { label: 'System Uptime', val: '99.9%', icon: Activity, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
        { label: 'Pending Issues', val: '3', icon: AlertTriangle, color: 'bg-error-container text-error' },
      ].map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
          <div className={\`w-10 h-10 rounded-lg flex items-center justify-center mb-3 \${m.color}\`}><m.icon size={18} /></div>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{m.val}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{m.label}</p>
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New user registered', user: 'Aisha@email.com', time: '2 min ago', type: 'new' },
            { action: 'Role updated', user: 'rafi@company.com', time: '15 min ago', type: 'edit' },
            { action: 'Account suspended', user: 'spam@example.com', time: '1 hour ago', type: 'alert' },
          ].map(a => (
            <div key={a.user} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
              <div className={\`w-2 h-2 rounded-full \${a.type === 'new' ? 'bg-secondary' : a.type === 'alert' ? 'bg-error' : 'bg-on-surface-variant'}\`} />
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface">{a.action}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs">{a.user}</p>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Users by Role</h3>
        <div className="space-y-3">
          {[
            { role: 'Candidates', count: 890, pct: 71 },
            { role: 'Employees', count: 245, pct: 20 },
            { role: 'HR Managers', count: 95, pct: 8 },
            { role: 'Admins', count: 18, pct: 1 },
          ].map(r => (
            <div key={r.role}>
              <div className="flex justify-between mb-1">
                <span className="font-body-md text-body-md text-on-surface">{r.role}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{r.count.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: r.pct + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default AdminDashboard;
`,

'src/pages/admin/UserManagement.tsx': `import React from 'react';
import { Search, Plus, Edit, Trash2, Shield } from 'lucide-react';

const users = [
  { name: 'Aisha Rahman', email: 'aisha@hrflow.app', role: 'HR Manager', status: 'Active', joined: 'Jan 2024' },
  { name: 'Tanvir Khan', email: 'tanvir@company.com', role: 'Employee', status: 'Active', joined: 'Mar 2023' },
  { name: 'Lin Wei', email: 'lin@candidate.com', role: 'Candidate', status: 'Pending', joined: 'Jul 2026' },
  { name: 'Admin User', email: 'admin@hrflow.app', role: 'Admin', status: 'Active', joined: 'Nov 2022' },
];

const roleColor: Record<string, string> = {
  Admin: 'bg-error-container text-on-error-container',
  'HR Manager': 'bg-primary-fixed text-primary',
  Employee: 'bg-secondary-fixed text-secondary',
  Candidate: 'bg-tertiary-fixed text-on-tertiary-fixed',
};

const UserManagement = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">User Management</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage all system accounts</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Plus size={16} /> Add User</button>
    </div>
    <div className="flex gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input type="text" placeholder="Search users..." className="pl-9 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none" />
      </div>
      <select className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none text-on-surface-variant">
        <option>All Roles</option><option>Admin</option><option>HR Manager</option><option>Employee</option><option>Candidate</option>
      </select>
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-surface-container-low border-b border-outline-variant">
          <tr>{['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
            <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {users.map(u => (
            <tr key={u.email} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">{u.name[0]}</div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{u.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{u.email}</td>
              <td className="px-4 py-4"><span className={\`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold text-[10px] \${roleColor[u.role]}\`}>{u.role}</span></td>
              <td className="px-4 py-4"><span className={\`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold text-[10px] \${u.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-surface-variant text-on-surface-variant'}\`}>{u.status}</span></td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{u.joined}</td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button className="p-1.5 hover:text-secondary transition-colors text-on-surface-variant" title="Edit"><Edit size={16} /></button>
                  <button className="p-1.5 hover:text-primary transition-colors text-on-surface-variant" title="Manage Roles"><Shield size={16} /></button>
                  <button className="p-1.5 hover:text-error transition-colors text-on-surface-variant" title="Delete"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default UserManagement;
`,

'src/pages/admin/RoleManagement.tsx': `import React from 'react';
import { Shield, Edit } from 'lucide-react';

const roles = [
  { name: 'Admin', users: 18, perms: ['Full System Access', 'User Management', 'Role Management', 'Analytics', 'Settings'], color: 'bg-error-container text-on-error-container' },
  { name: 'HR Manager', users: 95, perms: ['Vacancy Management', 'Applicant Review', 'Interview Scheduling', 'Employee Management'], color: 'bg-primary-fixed text-primary' },
  { name: 'Employee', users: 245, perms: ['View Own Profile', 'Attendance Management', 'Task Management', 'Performance View'], color: 'bg-secondary-fixed text-secondary' },
  { name: 'Candidate', users: 890, perms: ['Browse Jobs', 'Submit Applications', 'View Own Status', 'Take Assessments'], color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
];

const RoleManagement = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Role Management</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage access levels and permissions</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Shield size={16} /> Create Role</button>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {roles.map(role => (
        <div key={role.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 hover:border-primary transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={\`px-3 py-1 rounded-full font-label-md text-label-md font-bold \${role.color}\`}>{role.name}</div>
              <span className="font-body-md text-body-md text-on-surface-variant">{role.users.toLocaleString()} users</span>
            </div>
            <button className="p-2 hover:text-primary transition-colors text-on-surface-variant"><Edit size={16} /></button>
          </div>
          <div className="space-y-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">Permissions</p>
            {role.perms.map(p => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                <span className="font-body-md text-body-md text-on-surface">{p}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default RoleManagement;
`,

'src/pages/admin/SystemAnalytics.tsx': `import React from 'react';
import { BarChart2, Users, Briefcase, TrendingUp } from 'lucide-react';

const SystemAnalytics = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">System Analytics</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Platform-wide reporting and insights</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'New Users (30d)', val: '+142', change: '+18%', icon: Users, color: 'text-secondary' },
        { label: 'Jobs Posted (30d)', val: '38', change: '+12%', icon: Briefcase, color: 'text-primary' },
        { label: 'Applications (30d)', val: '1,204', change: '+25%', icon: BarChart2, color: 'text-on-tertiary-fixed' },
        { label: 'Avg. Session', val: '14m', change: '+3m', icon: TrendingUp, color: 'text-error' },
      ].map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <p className="font-label-md text-label-md text-on-surface-variant">{m.label}</p>
            <m.icon size={18} className={m.color} />
          </div>
          <p className="font-headline-md text-headline-md text-on-surface font-bold">{m.val}</p>
          <p className="font-label-sm text-label-sm text-secondary mt-1">{m.change} vs last month</p>
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">User Growth (Last 6 Months)</h3>
        <div className="flex items-end gap-3 h-40">
          {[80, 110, 95, 140, 125, 160].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary rounded-t-md transition-all hover:bg-secondary" style={{ height: (h / 160) * 100 + '%' }} />
              <span className="font-label-sm text-label-sm text-on-surface-variant">{['F','M','A','M','J','J'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">Hiring Funnel</h3>
        <div className="space-y-3">
          {[
            { stage: 'Applications', count: 1204, pct: 100 },
            { stage: 'Screened', count: 842, pct: 70 },
            { stage: 'Interviewed', count: 312, pct: 26 },
            { stage: 'Offer Sent', count: 87, pct: 7 },
            { stage: 'Hired', count: 52, pct: 4 },
          ].map(s => (
            <div key={s.stage}>
              <div className="flex justify-between mb-1">
                <span className="font-body-md text-body-md text-on-surface">{s.stage}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{s.count.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: s.pct + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default SystemAnalytics;
`,

// ─── SHARED PAGES ─────────────────────────────────────────────────────────────
'src/pages/shared/Notifications.tsx': `import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const notifs = [
  { icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary-fixed', title: 'Interview Confirmed', msg: 'Your interview with TechCorp BD is confirmed for Jul 12.', time: '2 min ago', unread: true },
  { icon: Info, color: 'text-primary', bg: 'bg-primary-fixed', title: 'New Job Match', msg: 'A new job matching your profile: Senior React Developer.', time: '1 hour ago', unread: true },
  { icon: AlertTriangle, color: 'text-error', bg: 'bg-error-container', title: 'Assessment Due', msg: 'Your JavaScript assessment is due in 2 days.', time: '3 hours ago', unread: false },
  { icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary-fixed', title: 'Application Viewed', msg: 'DataViz Ltd has viewed your application.', time: 'Yesterday', unread: false },
];

const Notifications = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Notifications</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">2 unread notifications</p>
      </div>
      <button className="font-label-md text-label-md text-secondary hover:underline">Mark all as read</button>
    </div>
    <div className="space-y-3">
      {notifs.map(n => (
        <div key={n.title} className={\`bg-surface-container-lowest rounded-xl border p-4 flex gap-4 hover:shadow-sm transition-all \${n.unread ? 'border-primary/30 bg-primary-fixed/10' : 'border-outline-variant'}\`}>
          <div className={\`w-10 h-10 rounded-full flex items-center justify-center shrink-0 \${n.bg}\`}><n.icon size={18} className={n.color} /></div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <p className="font-label-md text-label-md text-on-surface font-semibold">{n.title}{n.unread && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-secondary" />}</p>
              <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 ml-4">{n.time}</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">{n.msg}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Notifications;
`,

'src/pages/shared/Messages.tsx': `import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';

const conversations = [
  { name: 'HR — TechCorp BD', last: 'We would like to schedule a call...', time: '10:32 AM', unread: 2, avatar: 'T' },
  { name: 'DataViz Recruiter', last: 'Your CV has been shortlisted!', time: 'Yesterday', unread: 0, avatar: 'D' },
  { name: 'HRFlow Support', last: 'Your issue has been resolved.', time: 'Jul 7', unread: 0, avatar: 'H' },
];

const msgs = [
  { from: 'them', text: 'Hello! We reviewed your application and loved your portfolio.', time: '10:28 AM' },
  { from: 'me', text: 'Thank you! I am very excited about this opportunity.', time: '10:30 AM' },
  { from: 'them', text: 'We would like to schedule a technical interview. Are you free this week?', time: '10:32 AM' },
];

const Messages = () => {
  const [msg, setMsg] = useState('');
  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-72 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0">
        <div className="p-4 border-b border-outline-variant">
          <h2 className="font-headline-sm text-headline-sm text-primary font-semibold mb-3">Messages</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input type="text" placeholder="Search..." className="pl-8 w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant">
          {conversations.map((c, i) => (
            <div key={c.name} className={\`p-4 flex gap-3 cursor-pointer transition-colors \${i === 0 ? 'bg-primary-fixed/20' : 'hover:bg-surface-container-low'}\`}>
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shrink-0">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{c.name}</p>
                  <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 ml-2">{c.time}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs truncate mt-0.5">{c.last}</p>
                {c.unread > 0 && <span className="inline-flex items-center justify-center w-5 h-5 bg-secondary text-on-secondary rounded-full font-label-sm text-label-sm mt-1">{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">T</div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">HR — TechCorp BD</p>
            <p className="font-body-md text-body-md text-secondary text-xs">Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface-container-low">
          {msgs.map((m, i) => (
            <div key={i} className={\`flex \${m.from === 'me' ? 'justify-end' : 'justify-start'}\`}>
              <div className={\`max-w-[70%] px-4 py-3 rounded-2xl \${m.from === 'me' ? 'bg-primary text-on-primary rounded-br-sm' : 'bg-surface-container-lowest text-on-surface border border-outline-variant rounded-bl-sm'}\`}>
                <p className="font-body-md text-body-md">{m.text}</p>
                <p className={\`font-label-sm text-label-sm mt-1 \${m.from === 'me' ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}\`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex gap-3">
          <input value={msg} onChange={e => setMsg(e.target.value)} type="text" placeholder="Type a message..." className="flex-1 rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          <button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Messages;
`,

'src/pages/shared/Calendar.tsx': `import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  { day: 9, title: 'Interview - TechCorp', time: '2:00 PM', color: 'bg-secondary-fixed border-secondary text-secondary' },
  { day: 12, title: 'Interview - DataViz', time: '10:30 AM', color: 'bg-primary-fixed border-primary text-primary' },
  { day: 15, title: 'Performance Review', time: '3:00 PM', color: 'bg-tertiary-fixed border-on-tertiary-fixed text-on-tertiary-fixed' },
];

const Calendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="p-6 space-y-6">
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Calendar</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">July 2026</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant"><ChevronLeft size={18} /></button>
              <button className="p-2 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center font-label-sm text-label-sm text-on-surface-variant py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(1)].map((_, i) => <div key={'e' + i} />)}
            {days.map(d => {
              const hasEvent = events.find(e => e.day === d);
              return (
                <div key={d} className={\`aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all text-sm \${d === 9 ? 'bg-primary text-on-primary font-bold' : hasEvent ? 'bg-primary-fixed/50 text-primary' : 'hover:bg-surface-container-low text-on-surface'}\`}>
                  {d}
                  {hasEvent && <div className={\`w-1.5 h-1.5 rounded-full mt-0.5 \${d === 9 ? 'bg-on-primary' : 'bg-secondary'}\`} />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map(e => (
              <div key={e.title} className={\`p-3 rounded-lg border-l-4 \${e.color}\`}>
                <p className="font-label-md text-label-md font-semibold">{e.title}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-0.5">Jul {e.day} · {e.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
`,

'src/pages/shared/ProfileSettings.tsx': `import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';

const ProfileSettings = () => {
  const [tab, setTab] = useState('profile');
  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'security', label: 'Security' },
    { key: 'notifications', label: 'Notifications' },
  ];
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Profile Settings</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your account information</p>
      </div>
      <div className="flex gap-1 border-b border-outline-variant">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={\`px-4 py-2.5 font-label-md text-label-md border-b-2 transition-colors \${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}\`}>{t.label}</button>
        ))}
      </div>
      {tab === 'profile' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-on-primary text-3xl font-bold">U</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary text-on-secondary rounded-full flex items-center justify-center hover:bg-secondary-container transition-colors"><Camera size={14} /></button>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">User Name</p>
              <p className="font-body-md text-body-md text-on-surface-variant">user@hrflow.app</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">First Name</label><input type="text" defaultValue="User" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Last Name</label><input type="text" defaultValue="Name" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          </div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email</label><input type="email" defaultValue="user@hrflow.app" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Phone</label><input type="tel" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Bio</label><textarea rows={3} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none" /></div>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Save size={16} /> Save Changes</button>
        </div>
      )}
      {tab === 'security' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Change Password</h3>
          {['Current password', 'New password', 'Confirm new password'].map(l => (
            <div key={l}><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">{l}</label><input type="password" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          ))}
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">Update Password</button>
        </div>
      )}
      {tab === 'notifications' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Notification Preferences</h3>
          {['Email notifications', 'Interview reminders', 'Application status updates', 'New job matches'].map(n => (
            <label key={n} className="flex items-center justify-between cursor-pointer py-2 border-b border-outline-variant last:border-0">
              <span className="font-body-md text-body-md text-on-surface">{n}</span>
              <div className="w-11 h-6 bg-secondary rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-on-secondary rounded-full absolute top-0.5 right-0.5 shadow transition-all" />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProfileSettings;
`,

// ─── ERROR PAGES ──────────────────────────────────────────────────────────────
'src/pages/error/NotFound.tsx': `import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-surface flex items-center justify-center px-6">
    <div className="text-center">
      <p className="font-headline-lg text-headline-lg text-primary font-black text-8xl mb-4">404</p>
      <h1 className="font-headline-md text-headline-md text-on-surface font-bold mb-3">Page not found</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors inline-block">Go back home</Link>
    </div>
  </div>
);
export default NotFound;
`,

'src/pages/error/Unauthorized.tsx': `import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

const Unauthorized = () => (
  <div className="min-h-screen bg-surface flex items-center justify-center px-6">
    <div className="text-center">
      <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldOff size={28} className="text-error" />
      </div>
      <h1 className="font-headline-md text-headline-md text-on-surface font-bold mb-3">Access Denied</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">You don't have permission to view this page.</p>
      <Link to="/" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors inline-block">Go back home</Link>
    </div>
  </div>
);
export default Unauthorized;
`,
};

// =============================================================================
// WRITE ALL FILES
// =============================================================================

const allFiles = { ...layouts, ...pages };
let count = 0;
for (const [filePath, content] of Object.entries(allFiles)) {
  const abs = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  console.log('✓ ' + filePath);
  count++;
}
console.log('\nAll ' + count + ' files written!');
