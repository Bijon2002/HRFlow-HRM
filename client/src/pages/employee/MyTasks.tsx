import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Trash2, ArrowLeft, ArrowRight, X, Sparkles } from 'lucide-react';

const initialColumns = {
  todo: [
    { id: 1, title: 'Update API documentation', priority: 'High', due: 'Jul 15', project: 'HRM Suite 2.0' },
    { id: 2, title: 'Design review feedback implementation', priority: 'Medium', due: 'Jul 16', project: 'Employee Portal Refactor' },
  ],
  inprogress: [
    { id: 3, title: 'Complete UI design review', priority: 'High', due: 'Jul 12', project: 'Employee Portal Refactor' },
    { id: 4, title: 'Implement OAuth2 auth flow', priority: 'High', due: 'Jul 14', project: 'HRM Suite 2.0' },
  ],
  done: [
    { id: 5, title: 'Team standup meeting notes', priority: 'Low', due: 'Jul 9', project: 'HRM Suite 2.0' },
    { id: 6, title: 'Code review for PR #42', priority: 'Medium', due: 'Jul 8', project: 'AI CV Screening Engine' },
  ],
};

const priorityColor: Record<string, string> = {
  High: 'bg-error-container text-error border-error/20',
  Medium: 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed-dim/20',
  Low: 'bg-surface-variant text-on-surface-variant border-outline-variant/30',
};

const MyTasks = () => {
  const [cols, setCols] = useState<any>(initialColumns);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDue, setNewDue] = useState('');
  const [newProject, setNewProject] = useState('HRM Suite 2.0');

  useEffect(() => {
    const saved = localStorage.getItem('hrflow_employee_tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.todo && parsed.inprogress && parsed.done) {
          setCols(parsed);
        } else if (Array.isArray(parsed)) {
          // If saved as flat array (from dashboard), reconstruct columns
          const reconstructed = {
            todo: parsed.filter((t: any) => t.column === 'todo' || (!t.column && !t.done)),
            inprogress: parsed.filter((t: any) => t.column === 'inprogress'),
            done: parsed.filter((t: any) => t.column === 'done' || t.done)
          };
          setCols(reconstructed);
        }
      } catch (e) {
        setCols(initialColumns);
      }
    } else {
      localStorage.setItem('hrflow_employee_tasks', JSON.stringify(initialColumns));
    }
  }, []);

  const saveColumns = (newCols: any) => {
    setCols(newCols);
    localStorage.setItem('hrflow_employee_tasks', JSON.stringify(newCols));
    
    // Also update dynamic flat tasks format in localStorage for the dashboard
    const flat = [
      ...newCols.todo.map((t: any) => ({ ...t, column: 'todo', done: false })),
      ...newCols.inprogress.map((t: any) => ({ ...t, column: 'inprogress', done: false })),
      ...newCols.done.map((t: any) => ({ ...t, column: 'done', done: true }))
    ];
    localStorage.setItem('hrflow_employee_tasks_flat', JSON.stringify(flat));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle,
      priority: newPriority,
      due: newDue ? new Date(newDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Soon',
      project: newProject
    };

    const updated = {
      ...cols,
      todo: [...cols.todo, newTask]
    };

    saveColumns(updated);
    
    // Clear form
    setNewTitle('');
    setNewPriority('Medium');
    setNewDue('');
    setShowAddModal(false);
  };

  const moveTask = (taskId: number, currentColumn: string, targetColumn: string) => {
    const taskToMove = cols[currentColumn].find((t: any) => t.id === taskId);
    if (!taskToMove) return;

    const updated = {
      ...cols,
      [currentColumn]: cols[currentColumn].filter((t: any) => t.id !== taskId),
      [targetColumn]: [...cols[targetColumn], taskToMove]
    };

    saveColumns(updated);
  };

  const deleteTask = (taskId: number, currentColumn: string) => {
    const updated = {
      ...cols,
      [currentColumn]: cols[currentColumn].filter((t: any) => t.id !== taskId)
    };
    saveColumns(updated);
  };

  const filterTask = (task: any) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.project.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  };

  const colMeta = [
    { key: 'todo', label: 'To Do', color: 'border-t-primary', bg: 'bg-primary-container/10' },
    { key: 'inprogress', label: 'In Progress', color: 'border-t-secondary', bg: 'bg-secondary/5' },
    { key: 'done', label: 'Done', color: 'border-t-emerald-600', bg: 'bg-emerald-600/5' },
  ];

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">My Workspace Tasks</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and track your developer deliverables</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-label-md text-label-md hover:bg-secondary transition-colors shadow-md active:scale-95"
          >
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input
            type="text"
            placeholder="Search tasks or projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface border border-outline-variant pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-primary focus:outline-none placeholder-slate-405"
          />
        </div>
        <div className="flex items-center gap-2 bg-surface border border-outline-variant rounded-xl px-3 py-2 w-full sm:w-auto">
          <Filter size={16} className="text-on-surface-variant" />
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="bg-transparent border-0 text-sm focus:outline-none font-medium cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-start">
        {colMeta.map(col => {
          const columnTasks = cols[col.key] || [];
          const filtered = columnTasks.filter(filterTask);

          return (
            <div key={col.key} className={`bg-surface-container-lowest border-t-4 ${col.color} border border-outline-variant rounded-2xl p-4 shadow-sm min-h-[500px] flex flex-col gap-4`}>
              <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">{col.label}</h3>
                  <span className="font-label-sm text-xs text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full font-bold">
                    {filtered.length}
                  </span>
                </div>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar">
                {filtered.map((task: any) => (
                  <div 
                    key={task.id} 
                    className="bg-surface border border-outline-variant rounded-xl p-4 hover:border-primary hover:shadow-md transition-all flex flex-col gap-3 group/card relative overflow-hidden"
                  >
                    {/* Priority border highlight */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-black text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                          {task.project}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                          <button
                            onClick={() => deleteTask(task.id, col.key)}
                            className="p-1 hover:text-error hover:bg-error-container/20 rounded transition-colors text-on-surface-variant"
                            title="Delete Task"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="font-label-md text-sm text-on-surface font-semibold mt-1.5 leading-tight">{task.title}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/60">
                      <span className={`font-label-sm text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${priorityColor[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                        Due {task.due}
                      </span>
                    </div>

                    {/* Column Movement controls */}
                    <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-lg p-1.5 mt-1.5">
                      <button
                        disabled={col.key === 'todo'}
                        onClick={() => moveTask(task.id, col.key, col.key === 'done' ? 'inprogress' : 'todo')}
                        className="p-1 hover:bg-surface hover:text-primary rounded text-on-surface-variant disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Move Left"
                      >
                        <ArrowLeft size={14} />
                      </button>
                      <span className="text-[9px] font-black uppercase text-on-surface-variant">Move Card</span>
                      <button
                        disabled={col.key === 'done'}
                        onClick={() => moveTask(task.id, col.key, col.key === 'todo' ? 'inprogress' : 'done')}
                        className="p-1 hover:bg-surface hover:text-secondary rounded text-on-surface-variant disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Move Right"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl bg-surface-container-low/20">
                    <span className="material-symbols-outlined text-[36px] text-slate-300">task_alt</span>
                    <p className="text-xs font-semibold text-primary mt-2">No tasks in column</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">Add a new task or move cards here.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <Sparkles className="text-secondary" size={18} />
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Assign Workspace Task</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="p-1.5 hover:bg-surface-container-high rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Task Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement dashboard widget animations"
                  className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none placeholder-slate-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none cursor-pointer font-medium"
                  >
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Due Date</label>
                  <input 
                    type="date" 
                    value={newDue}
                    onChange={e => setNewDue(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none cursor-pointer text-on-surface"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Project Mapping</label>
                <select
                  value={newProject}
                  onChange={e => setNewProject(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none cursor-pointer font-medium"
                >
                  <option value="HRM Suite 2.0">HRM Suite 2.0</option>
                  <option value="AI CV Screening Engine">AI CV Screening Engine</option>
                  <option value="Employee Portal Refactor">Employee Portal Refactor</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-outline-variant text-on-surface hover:bg-surface-container-low py-2.5 rounded-xl font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary text-white py-2.5 rounded-xl font-label-md text-label-md transition-colors shadow-md shadow-primary/10 active:scale-95"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
