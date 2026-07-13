import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, Award, AlertTriangle, Play, CheckCircle2, ChevronRight, Plus, HelpCircle, UserPlus, X } from 'lucide-react';

const initialAiRecommendations = [
  { id: '1', employee: 'Sarah Hassan', currentTasks: 4, status: 'Critical Overload', recommendation: 'Transfer "Employee Portal Refactor" mockup task to Nadia Islam (UX Designer).', savedHours: '6.5 hrs/week' },
  { id: '2', employee: 'Tanvir Khan', currentTasks: 1, status: 'Underutilized', recommendation: 'Assign "HRM Suite 2.0" API integration testing to Tanvir to balance workload.', savedHours: '4.0 hrs/week' }
];

const ProjectAssignment = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [recs, setRecs] = useState(initialAiRecommendations);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAssignMemberModal, setShowAssignMemberModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [memberToAdd, setMemberToAdd] = useState('');

  const fetchProjectsAndStaff = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      
      // 1. Fetch staff
      const usersData = await api.get('/auth/users');
      const staff = usersData.filter((u: any) => u.role === 'employee' || u.role === 'hr');
      setAllEmployees(staff);
      if (staff.length > 0) {
        setMemberToAdd(staff[0]._id);
      }

      // 2. Fetch projects
      const projectsData = await api.get('/projects');
      
      // 3. Fetch tasks for each project to calculate members and progress
      const projectsWithDetails = await Promise.all(projectsData.map(async (p: any) => {
        try {
          const tasks = await api.get(`/projects/${p._id}/tasks`);
          const membersList = Array.from(new Set(tasks.map((t: any) => t.assignedTo?.name).filter(Boolean)));
          const doneTasks = tasks.filter((t: any) => t.status === 'Done').length;
          const progressVal = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : (p.status === 'Completed' ? 100 : 0);
          
          return {
            id: p._id,
            title: p.name,
            dept: p.requiredSkills?.[0] || 'Engineering',
            members: membersList,
            progress: progressVal,
            status: p.status === 'Completed' ? 'On Track' : (p.status === 'In Progress' ? 'On Track' : 'Not Started'),
            tasksCount: tasks.length,
            overload: tasks.length > 3
          };
        } catch (err) {
          return {
            id: p._id,
            title: p.name,
            dept: p.requiredSkills?.[0] || 'Engineering',
            members: [],
            progress: p.status === 'Completed' ? 100 : 0,
            status: p.status === 'Completed' ? 'On Track' : 'Not Started',
            tasksCount: 0,
            overload: false
          };
        }
      }));

      setProjects(projectsWithDetails);
    } catch (error) {
      console.error('Error fetching project data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsAndStaff();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const { api } = await import('../../api');
      await api.post('/projects', {
        name: newTitle,
        client: 'Internal',
        requiredSkills: [newDept],
        status: 'Not Started'
      });
      setNewTitle('');
      setShowAddProjectModal(false);
      fetchProjectsAndStaff();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenAssignModal = (proj: any) => {
    setSelectedProject(proj);
    setShowAssignMemberModal(true);
  };

  const handleAssignMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !memberToAdd) return;

    try {
      const { api } = await import('../../api');
      await api.post('/projects/tasks', {
        projectId: selectedProject.id,
        assignedTo: memberToAdd,
        title: 'Project Assignment Onboarding Task',
        status: 'In Progress'
      });
      setShowAssignMemberModal(false);
      fetchProjectsAndStaff();
    } catch (err) {
      console.error(err);
    }
  };

  const applyRecommendation = (id: string) => {
    setRecs(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Assign Projects & Teams</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Create projects, assign teams, and optimize workloads with smart resource planning
          </p>
        </div>
        <button 
          onClick={() => setShowAddProjectModal(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', val: projects.length.toString(), icon: <LayoutGrid size={20} />, color: 'bg-primary-fixed text-primary' },
          { label: 'Team Members', val: allEmployees.length.toString(), icon: <Users size={20} />, color: 'bg-secondary-fixed text-secondary' },
          { label: 'Overloaded Staff', val: projects.filter(p => p.overload).length.toString(), icon: <AlertTriangle size={20} />, color: 'bg-error-container text-error' },
          { label: 'AI Optimization', val: recs.length.toString() + ' Available', icon: <Award size={20} />, color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' }
        ].map((s, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
              <p className="font-headline-lg text-headline-lg text-primary font-bold mt-1.5">{s.val}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Cards (List) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Active Project List</h2>
          {isLoading ? (
            <div className="text-center py-12 text-slate-400 font-semibold">Loading projects database...</div>
          ) : projects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wide text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                          {proj.dept}
                        </span>
                        <h4 className="font-headline-sm text-[16px] text-primary mt-1 font-bold">{proj.title}</h4>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold text-[10px] ${
                        proj.status === 'On Track' ? 'bg-secondary-fixed text-secondary' :
                        proj.status === 'At Risk' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                        'bg-error-container text-error'
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                        <span>Progress</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
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

                  <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                    <div className="flex -space-x-2 overflow-hidden">
                      {proj.members.map((m: string, idx: number) => (
                        <div 
                          key={m} 
                          title={m}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border border-surface-container-lowest text-white shrink-0 ${
                            idx === 0 ? 'bg-primary' : 'bg-secondary'
                          }`}
                        >
                          {m.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {proj.members.length === 0 && (
                        <span className="text-xs text-on-surface-variant italic">Unassigned</span>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => handleOpenAssignModal(proj)}
                        className="p-1.5 hover:text-primary transition-colors text-on-surface-variant"
                        title="Assign member"
                      >
                        <UserPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-semibold">No projects assigned.</div>
          )}
        </div>

        {/* AI Recommendations Panel */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">auto_awesome</span>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">AI Resource Assistant</h3>
              </div>
              <HelpCircle size={16} className="text-on-surface-variant cursor-pointer" />
            </div>

            <div className="space-y-4">
              {recs.map(rec => (
                <div key={rec.id} className="border border-secondary/30 rounded-lg p-4 space-y-3 bg-gradient-to-br from-white to-secondary/5 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-semibold">{rec.employee}</p>
                      <span className="font-body-md text-[10px] text-error font-semibold uppercase tracking-wider">{rec.status}</span>
                    </div>
                    <span className="bg-secondary-fixed text-secondary px-2 py-0.5 rounded font-label-sm text-[10px] font-semibold">
                      {rec.savedHours}
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                    {rec.recommendation}
                  </p>

                  <button
                    onClick={() => applyRecommendation(rec.id)}
                    className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary py-1.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 transition-colors"
                  >
                    Apply Optimization
                  </button>
                </div>
              ))}
              {recs.length === 0 && (
                <div className="p-4 text-center space-y-2">
                  <CheckCircle2 size={32} className="text-secondary mx-auto" />
                  <p className="font-label-md text-label-md text-primary font-semibold">Allocations Optimized</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs">Workloads are balanced and all recommendations have been applied.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add Project */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">New Project Assignment</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="p-1 hover:bg-surface-container-high rounded-full"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateProject} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Project Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Talent Portal App"
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Department</label>
                <select 
                  value={newDept}
                  onChange={e => setNewDept(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddProjectModal(false)}
                  className="flex-1 border border-outline-variant text-on-surface hover:bg-surface-container-low py-2 rounded-lg font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary text-on-primary py-2 rounded-lg font-label-md text-label-md transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Assign Member */}
      {showAssignMemberModal && selectedProject && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Assign Team Member</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">Project: {selectedProject.title}</p>
              </div>
              <button onClick={() => setShowAssignMemberModal(false)} className="p-1 hover:bg-surface-container-high rounded-full"><X size={18} /></button>
            </div>
            <form onSubmit={handleAssignMember} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Select Employee</label>
                <select 
                  value={memberToAdd}
                  onChange={e => setMemberToAdd(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  {allEmployees.map(emp => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAssignMemberModal(false)}
                  className="flex-1 border border-outline-variant text-on-surface hover:bg-surface-container-low py-2 rounded-lg font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary text-on-primary py-2 rounded-lg font-label-md text-label-md transition-colors"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectAssignment;
