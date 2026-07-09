import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import hrFlowLogo from '../../assets/HR-Flow.png';

const DashboardLayout = () => {
  const loc = useLocation();

  // Dynamic Sidebar menu based on active role prefix
  const getSidebarLinks = () => {
    if (loc.pathname.startsWith('/hr')) {
      return [
        { label: 'Dashboard', path: '/hr/dashboard', icon: 'dashboard' },
        { label: 'Job Postings', path: '/hr/vacancies', icon: 'work' },
        { label: 'Recruitment', path: '/hr/applicants', icon: 'group' },
        { label: 'AI CV Screening', path: '/hr/cv-screening', icon: 'psychology' },
        { label: 'Interviews', path: '/hr/interviews', icon: 'event_available' },
        { label: 'Employees', path: '/hr/employees', icon: 'badge' },
        { label: 'Track Attendance', path: '/hr/attendance', icon: 'schedule' },
        { label: 'Assign Projects', path: '/hr/projects', icon: 'fact_check' },
        { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
      ];
    } else if (loc.pathname.startsWith('/candidate')) {
      return [
        { label: 'Dashboard', path: '/candidate/dashboard', icon: 'dashboard' },
        { label: 'Internships', path: '/candidate/internships', icon: 'work' },
        { label: 'My Applications', path: '/candidate/applications', icon: 'description' },
        { label: 'Interviews', path: '/candidate/interviews', icon: 'event' },
        { label: 'Quiz Assessment', path: '/candidate/quiz', icon: 'quiz' },
        { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
      ];
    } else if (loc.pathname.startsWith('/employee')) {
      return [
        { label: 'Dashboard', path: '/employee/dashboard', icon: 'dashboard' },
        { label: 'My Tasks', path: '/employee/tasks', icon: 'assignment' },
        { label: 'My Attendance', path: '/employee/attendance', icon: 'schedule' },
        { label: 'My Performance', path: '/employee/performance', icon: 'trending_up' },
        { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
      ];
    } else if (loc.pathname.startsWith('/admin')) {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        { label: 'User Management', path: '/admin/users', icon: 'manage_accounts' },
        { label: 'Role Management', path: '/admin/roles', icon: 'shield' },
        { label: 'System Analytics', path: '/admin/analytics', icon: 'analytics' },
        { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
      ];
    }
    
    // Default fallback
    return [
      { label: 'Dashboard', path: '/hr/dashboard', icon: 'dashboard' },
      { label: 'Candidates', path: '/candidate/internships', icon: 'group' },
      { label: 'Interviews', path: '/hr/interviews', icon: 'event_available' },
      { label: 'Employees', path: '/hr/employees', icon: 'badge' },
      { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
    ];
  };

  const getWorkspaceTitle = () => {
    if (loc.pathname.startsWith('/hr')) return 'HR Manager / Interviewer Workspace';
    if (loc.pathname.startsWith('/candidate')) return 'Candidate Portal';
    if (loc.pathname.startsWith('/employee')) return 'Employee Workspace';
    if (loc.pathname.startsWith('/admin')) return 'Administrator Console';
    return 'HRFlow Management';
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm z-50 flex flex-col p-4 gap-base hidden md:flex">
        <Link to="/" className="flex items-center gap-3 mb-8 px-2 hover:opacity-90 transition-opacity">
          <div className="bg-white p-1.5 rounded-lg shrink-0 shadow-sm border border-slate-100">
            <img src={hrFlowLogo} alt="HRFlow Logo" className="h-8 w-auto object-contain shrink-0" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-white leading-none">HRFlow</h1>
            <p className="text-[10px] text-teal-300 font-semibold tracking-wider uppercase mt-1">{roleLabel}</p>
          </div>
        </Link>
        
        {loc.pathname.startsWith('/hr') && (
          <Link to="/hr/vacancies" className="w-full bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container transition-colors duration-200 py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Post New Job
          </Link>
        )}
        
        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = loc.pathname === link.path;
            return (
              <Link 
                key={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${
                  isActive 
                    ? 'bg-secondary text-on-secondary' 
                    : 'text-on-primary-fixed-variant hover:bg-primary-container'
                }`} 
                to={link.path}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto flex flex-col gap-1 border-t border-white/10 pt-4">
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl transition-all font-label-md text-label-md no-underline" to="/shared/profile">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            My Profile
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl transition-all font-label-md text-label-md no-underline" to="/auth/login">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{getWorkspaceTitle()}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200 relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center ml-2 cursor-pointer border border-outline-variant">
              <span className="font-label-lg text-label-lg text-on-secondary-container font-bold">SH</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
