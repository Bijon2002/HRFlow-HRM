import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const loc = useLocation();

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
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/hr/dashboard' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/hr/dashboard">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </Link>
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/candidate/internships' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/candidate/internships">
            <span className="material-symbols-outlined text-[20px]">group</span>
            Candidates
          </Link>
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/hr/interviews' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/hr/interviews">
            <span className="material-symbols-outlined text-[20px]">event_available</span>
            Interviews
          </Link>
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/hr/employees' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/hr/employees">
            <span className="material-symbols-outlined text-[20px]">badge</span>
            Employees
          </Link>
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/admin/analytics' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/admin/analytics">
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            Reports
          </Link>
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/shared/profile' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/shared/profile">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </Link>
        </nav>
        
        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-primary-container">
          <Link className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-label-md text-label-md ${loc.pathname === '/shared/notifications' ? 'bg-secondary text-on-secondary' : 'text-on-primary-fixed-variant hover:bg-primary-container'}`} to="/shared/notifications">
            <span className="material-symbols-outlined text-[20px]">help</span>
            Help Center
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed-variant hover:bg-primary-container rounded-lg transition-colors duration-200 font-label-md text-label-md" to="/auth/login">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex-1 md:ml-[240px] flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-[72px] bg-surface border-b border-outline-variant flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Workspace</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center ml-2 cursor-pointer border border-outline-variant">
              <span className="font-label-lg text-label-lg text-on-secondary-container font-bold">JD</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-surface-container-low">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
