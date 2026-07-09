import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const loc = useLocation();

  // Determine user role and styling/content based on route prefix
  const isAdmin = loc.pathname.startsWith('/admin');
  const isHR = loc.pathname.startsWith('/hr');
  const isEmployee = loc.pathname.startsWith('/employee');
  const isCandidate = loc.pathname.startsWith('/candidate');

  let workspaceTitle = 'Workspace';
  let userInitials = 'JD';
  let roleLabel = 'Management Suite';

  if (isAdmin) {
    workspaceTitle = 'System Administration';
    userInitials = 'AD';
    roleLabel = 'Super Admin';
  } else if (isHR) {
    workspaceTitle = 'HR Portal';
    userInitials = 'HR';
    roleLabel = 'HR Manager';
  } else if (isEmployee) {
    workspaceTitle = 'Employee Workspace';
    userInitials = 'EM';
    roleLabel = 'Staff Portal';
  } else if (isCandidate) {
    workspaceTitle = 'Candidate Hub';
    userInitials = 'CD';
    roleLabel = 'Job Applicant';
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-primary dark:bg-primary-container border-r border-outline-variant dark:border-outline shadow-sm z-50 flex flex-col p-4 gap-base hidden md:flex">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-white text-[20px]">shield_person</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-white leading-none">HRFlow</h1>
            <p className="text-[10px] text-teal-300 font-semibold tracking-wider uppercase mt-1">{roleLabel}</p>
          </div>
        </div>
        
        {/* Dynamic Action Button based on Role */}
        {isAdmin && (
          <Link to="/admin/users" className="w-full bg-secondary hover:bg-secondary/90 text-white hover:text-white transition-all duration-200 py-2.5 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 mb-4 shadow-sm border-0 no-underline hover:no-underline">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Create User
          </Link>
        )}
        {isHR && (
          <Link to="/hr/vacancies" className="w-full bg-secondary hover:bg-secondary/90 text-white hover:text-white transition-all duration-200 py-2.5 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 mb-4 shadow-sm border-0 no-underline hover:no-underline">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Post New Job
          </Link>
        )}
        {(isEmployee || isCandidate) && (
          <div className="h-4" />
        )}
        
        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto">
          {/* Admin Navigation */}
          {isAdmin && (
            <>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/admin/dashboard' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/admin/dashboard">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                System Overview
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/admin/users' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/admin/users">
                <span className="material-symbols-outlined text-[20px]">group</span>
                User Management
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/admin/roles' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/admin/roles">
                <span className="material-symbols-outlined text-[20px]">lock_person</span>
                Role Management
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/admin/analytics' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/admin/analytics">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                Reports & Analytics
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/admin/configuration' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/admin/configuration">
                <span className="material-symbols-outlined text-[20px]">settings_suggest</span>
                System Configuration
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/admin/security' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/admin/security">
                <span className="material-symbols-outlined text-[20px]">gpp_good</span>
                Security Controls
              </Link>
            </>
          )}

          {/* HR Navigation */}
          {isHR && (
            <>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/hr/dashboard' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/hr/dashboard">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/hr/vacancies' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/hr/vacancies">
                <span className="material-symbols-outlined text-[20px]">work</span>
                Vacancies
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/hr/applicants' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/hr/applicants">
                <span className="material-symbols-outlined text-[20px]">assignment_ind</span>
                Applicants
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/hr/cv-screening' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/hr/cv-screening">
                <span className="material-symbols-outlined text-[20px]">pageview</span>
                CV Screening
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/hr/interviews' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/hr/interviews">
                <span className="material-symbols-outlined text-[20px]">event_available</span>
                Interviews
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/hr/employees' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/hr/employees">
                <span className="material-symbols-outlined text-[20px]">badge</span>
                Employees
              </Link>
            </>
          )}

          {/* Employee Navigation */}
          {isEmployee && (
            <>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/employee/dashboard' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/employee/dashboard">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/employee/tasks' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/employee/tasks">
                <span className="material-symbols-outlined text-[20px]">task</span>
                My Tasks
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/employee/attendance' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/employee/attendance">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                My Attendance
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/employee/performance' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/employee/performance">
                <span className="material-symbols-outlined text-[20px]">insights</span>
                Performance
              </Link>
            </>
          )}

          {/* Candidate Navigation */}
          {isCandidate && (
            <>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/candidate/dashboard' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/candidate/dashboard">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                Dashboard
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/candidate/internships' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/candidate/internships">
                <span className="material-symbols-outlined text-[20px]">explore</span>
                Browse Internships
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/candidate/applications' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/candidate/applications">
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                My Applications
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/candidate/interviews' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/candidate/interviews">
                <span className="material-symbols-outlined text-[20px]">video_call</span>
                Interviews
              </Link>
              <Link className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-label-md text-label-md no-underline ${loc.pathname === '/candidate/quiz' ? 'bg-secondary text-white font-bold' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`} to="/candidate/quiz">
                <span className="material-symbols-outlined text-[20px]">quiz</span>
                Assessment Quiz
              </Link>
            </>
          )}
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
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{workspaceTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all text-slate-500 border border-slate-200 relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>
            <div className="h-9 w-px bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center cursor-pointer shadow-sm text-white font-bold text-sm">
                {userInitials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">
                  {isAdmin ? 'System Administrator' : isHR ? 'Aisha Rahman' : 'User Member'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-none">
                  {isAdmin ? 'admin@gmail.com' : isHR ? 'hr@hrflow.app' : 'user@company.com'}
                </p>
              </div>
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
