import React, { useState, useEffect } from 'react';
import { LayoutGrid, Search, Filter, FolderKanban, Users, Clock, CheckCircle } from 'lucide-react';

const defaultProjects = [
  { id: '1', title: 'HRM Suite 2.0', dept: 'Engineering', members: ['Sarah Hassan', 'Tanvir Khan'], progress: 68, status: 'On Track', tasksCount: 14, role: 'Lead Developer', description: 'Upgrading the core HRM core modules to support employee self-service features and OAuth2 auth flow.' },
  { id: '2', title: 'AI CV Screening Engine', dept: 'Engineering', members: ['Sarah Hassan', 'Lin Wei'], progress: 45, status: 'At Risk', tasksCount: 9, role: 'AI Model Integrator', description: 'Building the screening logic pipeline and matching recommendations algorithm with LLM API.' },
  { id: '4', title: 'Employee Portal Refactor', dept: 'Design', members: ['Nadia Islam', 'Sarah Hassan'], progress: 12, status: 'Delayed', tasksCount: 8, role: 'Frontend Engineer', description: 'Redesigning the employee dashboard UI panels for maximum responsiveness and modern look.' }
];

const MyProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('hrflow_employee_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('hrflow_employee_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesDept = deptFilter === 'All' || p.dept === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-primary to-indigo-900 rounded-2xl p-6 md:p-8 text-white overflow-hidden shadow-md">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <span className="bg-secondary/20 border border-secondary/30 text-teal-300 font-label-md text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">Workspace Portfolio</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">My Assigned Projects</h1>
          <p className="text-indigo-200 text-sm max-w-xl font-body-md">
            Review active projects, view collaborative teams, monitor completion timelines, and track deliverables.
          </p>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Assigned Projects', val: projects.length, icon: FolderKanban, color: 'bg-primary-fixed text-primary' },
          { label: 'Completed Milestones', val: projects.filter(p => p.progress === 100).length || '1', icon: CheckCircle, color: 'bg-secondary-fixed text-secondary' },
          { label: 'Pending Deliverables', val: projects.reduce((acc, p) => acc + (p.tasksCount || 0), 0), icon: Clock, color: 'bg-error-container text-error' },
        ].map((s, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant hover:shadow-sm transition-all flex items-center justify-between">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
              <p className="font-headline-lg text-headline-lg text-primary font-bold mt-1.5">{s.val}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
              <s.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Control */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input
            type="text"
            placeholder="Search projects by title or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface border border-outline-variant pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-primary focus:outline-none placeholder-slate-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-3 py-1.5">
            <Filter size={16} className="text-on-surface-variant" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent border-0 text-sm focus:outline-none font-medium cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-3 py-1.5">
            <LayoutGrid size={16} className="text-on-surface-variant" />
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="bg-transparent border-0 text-sm focus:outline-none font-medium cursor-pointer"
            >
              <option value="All">All Depts</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(proj => (
          <div key={proj.id} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between gap-6 group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-wider text-on-surface-variant bg-surface-container px-2.5 py-1 rounded">
                    {proj.dept}
                  </span>
                  <h3 className="font-headline-sm text-lg text-primary font-bold mt-2 group-hover:text-secondary transition-colors">{proj.title}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full font-label-sm text-xs font-bold ${
                  proj.status === 'On Track' ? 'bg-secondary-fixed text-secondary' :
                  proj.status === 'At Risk' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                  'bg-error-container text-error'
                }`}>
                  {proj.status}
                </span>
              </div>

              <p className="text-xs text-on-surface-variant font-body-md leading-relaxed">
                {proj.description}
              </p>

              <div className="bg-surface border border-outline-variant/60 rounded-xl p-3.5 space-y-1.5">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">My Specific Assignment</p>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">badge</span>
                  <span>{proj.role}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between font-label-sm text-xs text-on-surface-variant mb-1.5 font-bold">
                  <span>Development Progress</span>
                  <span>{proj.progress}%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      proj.status === 'On Track' ? 'bg-secondary' :
                      proj.status === 'At Risk' ? 'bg-tertiary-container' : 'bg-error'
                    }`} 
                    style={{ width: proj.progress + '%' }} 
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Project Team</p>
                <div className="flex -space-x-2">
                  {proj.members.map((m: string, idx: number) => (
                    <div 
                      key={m} 
                      title={m}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-surface-container-lowest text-white shrink-0 shadow-sm ${
                        idx === 0 ? 'bg-primary' : 'bg-secondary'
                      }`}
                    >
                      {m.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">Deliverables</span>
                <span className="text-sm font-bold text-primary flex items-center gap-1.5 mt-1 justify-end">
                  <span className="material-symbols-outlined text-[16px] text-secondary">task_alt</span>
                  {proj.tasksCount} Active Tasks
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mx-auto text-on-surface-variant">
              <FolderKanban size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="font-headline-sm text-primary font-bold">No Projects Found</h3>
              <p className="text-sm text-on-surface-variant">We couldn't find any projects matching your search query or filter options.</p>
            </div>
            <button
              onClick={() => { setSearch(''); setStatusFilter('All'); setDeptFilter('All'); }}
              className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;
