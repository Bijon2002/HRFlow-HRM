import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import hrFlowLogo from '../../assets/HR-Flow.png';

const DashboardLayout = () => {
  const loc = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic Sidebar menu based on active role prefix, using localStorage as a fallback
  const getRole = () => {
    if (loc.pathname.startsWith('/hr')) {
      localStorage.setItem('hrflow_current_role', 'hr');
      return 'hr';
    }
    if (loc.pathname.startsWith('/candidate')) {
      localStorage.setItem('hrflow_current_role', 'candidate');
      return 'candidate';
    }
    if (loc.pathname.startsWith('/employee')) {
      localStorage.setItem('hrflow_current_role', 'employee');
      return 'employee';
    }
    if (loc.pathname.startsWith('/admin')) {
      localStorage.setItem('hrflow_current_role', 'admin');
      return 'admin';
    }
    // Fallback to persisted role if on shared paths
    return localStorage.getItem('hrflow_current_role') || 'hr';
  };

  const getSidebarLinks = () => {
    const role = getRole();
    if (role === 'hr') {
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
    } else if (role === 'candidate') {
      return [
        { label: 'Dashboard', path: '/candidate/dashboard', icon: 'dashboard' },
        { label: 'Internships', path: '/candidate/internships', icon: 'work' },
        { label: 'My Applications', path: '/candidate/applications', icon: 'description' },
        { label: 'Interviews', path: '/candidate/interviews', icon: 'event' },
        { label: 'Quiz Assessment', path: '/candidate/quiz', icon: 'quiz' },
        { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
      ];
    } else if (role === 'employee') {
      return [
        { label: 'Dashboard', path: '/employee/dashboard', icon: 'dashboard' },
        { label: 'My Projects', path: '/employee/projects', icon: 'folder' },
        { label: 'My Tasks', path: '/employee/tasks', icon: 'assignment' },
        { label: 'My Attendance', path: '/employee/attendance', icon: 'schedule' },
        { label: 'My Performance', path: '/employee/performance', icon: 'trending_up' },
        { label: 'Profile Settings', path: '/shared/profile', icon: 'settings' }
      ];
    } else if (role === 'admin') {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
        { label: 'User Management', path: '/admin/users', icon: 'manage_accounts' },
        { label: 'Role Management', path: '/admin/roles', icon: 'shield' },
        { label: 'System Analytics', path: '/admin/analytics', icon: 'analytics' },
        { label: 'Configuration', path: '/admin/configuration', icon: 'settings' },
        { label: 'Security & Permissions', path: '/admin/security', icon: 'security' },
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
    const role = getRole();
    if (role === 'hr') return 'HR Manager / Interviewer Workspace';
    if (role === 'candidate') return 'Candidate Portal';
    if (role === 'employee') return 'Employee Workspace';
    if (role === 'admin') return 'Administrator Console';
    return 'HRFlow Management';
  };

  const getProfileInitials = () => {
    try {
      const role = getRole();
      const profileStr = localStorage.getItem(`hrflow_profile_${role}`);
      if (profileStr) {
        const profile = JSON.parse(profileStr);
        if (profile.firstName && profile.lastName) {
          return (profile.firstName[0] + profile.lastName[0]).toUpperCase();
        }
      }
    } catch (e) {
      console.error(e);
    }
    return 'SH';
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar Mobile Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SideNavBar Drawer */}
      <aside className={`fixed left-0 top-0 h-full w-[240px] bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm z-50 flex flex-col p-4 gap-base transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:flex`}>
        <Link to="/" className="flex items-center gap-3 mb-8 px-2 hover:opacity-90 transition-opacity">
          <div className="bg-white p-1.5 rounded-lg shrink-0 shadow-sm border border-slate-100">
            <img src={hrFlowLogo} alt="HRFlow Logo" className="h-8 w-auto object-contain shrink-0" />
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-white leading-none">HRFlow</h1>
            <p className="text-[10px] text-teal-300 font-semibold tracking-wider uppercase mt-1">
              {getRole() === 'hr' ? 'HR Manager' : getRole() === 'admin' ? 'Administrator' : getRole() === 'employee' ? 'Employee' : 'Candidate'}
            </p>
          </div>
        </Link>
        
        {getRole() === 'hr' && (
          <Link to="/hr/vacancies" onClick={() => setSidebarOpen(false)} className="w-full bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container transition-colors duration-200 py-2.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 mb-4">
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
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${
                  isActive 
                    ? 'bg-secondary text-on-secondary shadow-md shadow-secondary/15' 
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
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
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl transition-all font-label-md text-label-md no-underline" to="/shared/profile" onClick={() => setSidebarOpen(false)}>
            <span className="material-symbols-outlined text-[20px]">settings</span>
            My Profile
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl transition-all font-label-md text-label-md no-underline" to="/auth/login" onClick={() => setSidebarOpen(false)}>
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200 focus:outline-none"
              aria-label="Open Sidebar Menu"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate max-w-[180px] sm:max-w-none">{getWorkspaceTitle()}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <Link to="/shared/notifications" className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200 relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </Link>
            <Link to="/shared/profile" className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center ml-2 cursor-pointer border border-outline-variant hover:opacity-90 transition-opacity">
              <span className="font-label-lg text-label-lg text-on-secondary-container font-bold">{getProfileInitials()}</span>
            </Link>
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
