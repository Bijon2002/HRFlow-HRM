import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, TrendingUp, Calendar, ArrowRight, Briefcase, Award, CheckCircle2 } from 'lucide-react';

const initialProjects = [
  { id: '1', title: 'HRM Suite 2.0', dept: 'Engineering', members: ['Sarah Hassan', 'Tanvir Khan'], progress: 68, status: 'On Track', tasksCount: 14 },
  { id: '2', title: 'AI CV Screening Engine', dept: 'Engineering', members: ['Sarah Hassan', 'Lin Wei'], progress: 45, status: 'At Risk', tasksCount: 9 },
  { id: '4', title: 'Employee Portal Refactor', dept: 'Design', members: ['Nadia Islam', 'Sarah Hassan'], progress: 12, status: 'Delayed', tasksCount: 8 }
];

const initialTasks = [
  { id: 1, title: 'Complete UI design review', priority: 'High', due: 'Jul 10', done: false, column: 'inprogress' },
  { id: 2, title: 'Update API documentation', priority: 'High', due: 'Jul 10', done: false, column: 'todo' },
  { id: 3, title: 'Team standup at 10am', priority: 'High', done: true, column: 'done' },
  { id: 4, title: 'Code review for PR #42', priority: 'Low', done: false, column: 'todo' },
];

const EmployeeDashboard = () => {
  const [profile, setProfile] = useState<any>({ firstName: 'Sarah', lastName: 'Hassan', email: 'sarah.hassan@hrflow.app' });
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [tasks, setTasks] = useState<any[]>(initialTasks);
  
  // Attendance States
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00h 00m 00s');

  useEffect(() => {
    // 1. Profile Init
    const savedProfile = localStorage.getItem('hrflow_profile_employee');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {}
    } else {
      const defaultProfile = { firstName: 'Sarah', lastName: 'Hassan', email: 'sarah.hassan@hrflow.app', phone: '+1 (555) 234-5678', bio: 'Senior Software Engineer with 5+ years of experience.', avatar: 'SH' };
      setProfile(defaultProfile);
      localStorage.setItem('hrflow_profile_employee', JSON.stringify(defaultProfile));
    }

    // 2. Projects Init
    const savedProjects = localStorage.getItem('hrflow_employee_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {}
    } else {
      localStorage.setItem('hrflow_employee_projects', JSON.stringify(initialProjects));
    }

    // 3. Tasks Init
    const savedTasks = localStorage.getItem('hrflow_employee_tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Flatten from columns key format if tasks are saved in columns format
        if (parsed.todo) {
          const flat = [
            ...parsed.todo.map((t: any) => ({ ...t, column: 'todo', done: false })),
            ...parsed.inprogress.map((t: any) => ({ ...t, column: 'inprogress', done: false })),
            ...parsed.done.map((t: any) => ({ ...t, column: 'done', done: true }))
          ];
          setTasks(flat);
        } else {
          setTasks(parsed);
        }
      } catch (e) {}
    } else {
      setTasks(initialTasks);
      localStorage.setItem('hrflow_employee_tasks', JSON.stringify(initialTasks));
    }

    // 4. Attendance Init
    const savedAtt = localStorage.getItem('hrflow_employee_attendance');
    if (savedAtt) {
      try {
        const att = JSON.parse(savedAtt);
        setClockedIn(att.clockedIn || false);
        setClockInTime(att.clockInTime || null);
      } catch (e) {}
    }
  }, []);

  // Sync tasks back to localStorage when changed
  const saveTasksList = (newTasks: any[]) => {
    setTasks(newTasks);
    // Also save in the format MyTasks.tsx expects: columns { todo, inprogress, done }
    const formatted = {
      todo: newTasks.filter(t => t.column === 'todo' || (!t.column && !t.done)),
      inprogress: newTasks.filter(t => t.column === 'inprogress'),
      done: newTasks.filter(t => t.column === 'done' || t.done)
    };
    localStorage.setItem('hrflow_employee_tasks', JSON.stringify(formatted));
  };

  // Stopwatch timer logic
  useEffect(() => {
    let interval: any = null;
    if (clockedIn && clockInTime) {
      interval = setInterval(() => {
        const diff = Date.now() - clockInTime;
        const hrs = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setElapsedTime(
          `${hrs.toString().padStart(2, '0')}h ${mins
            .toString()
            .padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`
        );
      }, 1000);
    } else {
      setElapsedTime('00h 00m 00s');
    }
    return () => clearInterval(interval);
  }, [clockedIn, clockInTime]);

  const handleClockToggle = () => {
    const nextState = !clockedIn;
    const time = nextState ? Date.now() : null;
    setClockedIn(nextState);
    setClockInTime(time);

    // Save state
    const attState = { clockedIn: nextState, clockInTime: time };
    localStorage.setItem('hrflow_employee_attendance', JSON.stringify(attState));

    // Save entry into attendance history if clocking out
    if (!nextState && clockInTime) {
      try {
        const historyStr = localStorage.getItem('hrflow_employee_attendance_history');
        let history: any[] = [];
        if (historyStr) {
          history = JSON.parse(historyStr);
        } else {
          history = [
            { date: 'Jul 9, 2026', day: 'Wed', in: '9:02 AM', out: '5:00 PM', hours: '7h 58m', status: 'Present' },
            { date: 'Jul 8, 2026', day: 'Tue', in: '8:58 AM', out: '5:03 PM', hours: '8h 05m', status: 'Present' },
            { date: 'Jul 7, 2026', day: 'Mon', in: '9:15 AM', out: '5:00 PM', hours: '7h 45m', status: 'Present' },
          ];
        }

        const dateObj = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const formatTime = (ts: number) => {
          const d = new Date(ts);
          return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        const inTimeStr = formatTime(clockInTime);
        const outTimeStr = formatTime(Date.now());
        const diffMs = Date.now() - clockInTime;
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);

        const newRecord = {
          date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          day: days[dateObj.getDay()],
          in: inTimeStr,
          out: outTimeStr,
          hours: `${diffHrs}h ${diffMins}m`,
          status: 'Present'
        };

        localStorage.setItem('hrflow_employee_attendance_history', JSON.stringify([newRecord, ...history]));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const toggleTaskDone = (id: number) => {
    const updated = tasks.map(t => {
      if (t.id === id) {
        const nextDone = !t.done;
        return {
          ...t,
          done: nextDone,
          column: nextDone ? 'done' : 'inprogress'
        };
      }
      return t;
    });
    saveTasksList(updated);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Dynamic Header Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary via-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[90px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">Active Workspace Session</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
              Welcome Back, {profile.firstName}!
            </h1>
            <p className="text-indigo-200 text-sm font-body-md mt-1 flex items-center gap-2">
              <Calendar size={14} className="text-teal-400" />
              <span>Today is {today}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-slate-950/40 border border-white/10 backdrop-blur-md p-4 rounded-xl shadow-inner min-w-[260px]">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Clock Status</p>
              {clockedIn ? (
                <div>
                  <p className="text-sm font-bold text-white mt-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Active Session
                  </p>
                  <p className="text-xs text-teal-300 font-mono font-bold mt-0.5">{elapsedTime}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-slate-300 mt-0.5">Offline</p>
                  <p className="text-xs text-slate-400 mt-0.5">Please clock in to start</p>
                </div>
              )}
            </div>
            <button
              onClick={handleClockToggle}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 ${
                clockedIn
                  ? 'bg-error text-white hover:bg-error/95 shadow-error/10'
                  : 'bg-secondary text-white hover:bg-secondary/95 shadow-secondary/15'
              }`}
            >
              <Clock size={14} />
              {clockedIn ? 'Clock Out' : 'Clock In'}
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Projects', val: projects.length, path: '/employee/projects', icon: Briefcase, color: 'bg-primary-fixed text-primary', status: 'Active Workspace' },
          { label: 'Tasks Due Today', val: tasks.filter(t => !t.done).length, path: '/employee/tasks', icon: CheckSquare, color: 'bg-secondary-fixed text-secondary', status: `${tasks.filter(t => t.done).length} completed` },
          { label: 'Attendance Ratio', val: '92%', path: '/employee/attendance', icon: Clock, color: 'bg-tertiary-fixed text-on-tertiary-fixed', status: 'Avg 8.1 hrs/day' },
          { label: 'Performance Score', val: '87%', path: '/employee/performance', icon: TrendingUp, color: 'bg-surface-variant text-on-surface-variant', status: 'Q3 Review Score' },
        ].map(m => (
          <Link
            key={m.label}
            to={m.path}
            className="bg-surface-container-lowest hover:bg-surface-container-low/50 rounded-xl p-5 border border-outline-variant shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between group no-underline"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-primary transition-colors font-bold">{m.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.color} group-hover:scale-105 transition-transform`}>
                <m.icon size={16} />
              </div>
            </div>
            <div>
              <p className="font-headline-lg text-2xl text-on-surface font-black tracking-tight">{m.val}</p>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider mt-1">{m.status}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Projects and Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects Summary Widget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/40">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Assigned Projects Portfolio</h3>
              <Link to="/employee/projects" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1 font-bold no-underline">
                View Details <ArrowRight size={14} />
              </Link>
            </div>
            <div className="p-4 divide-y divide-surface-variant space-y-4">
              {projects.slice(0, 3).map(proj => (
                <div key={proj.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 first:pt-0">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                        {proj.dept}
                      </span>
                      <h4 className="font-headline-sm text-sm text-primary font-bold">{proj.title}</h4>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex -space-x-1.5">
                        {proj.members?.slice(0, 3).map((m: string) => (
                          <div
                            key={m}
                            title={m}
                            className="w-5 h-5 rounded-full bg-slate-400 text-white font-bold text-[8px] flex items-center justify-center border border-white"
                          >
                            {m.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-on-surface-variant">{proj.members?.length || 0} Teammates</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-[150px] shrink-0">
                    <div className="flex justify-between text-[10px] text-on-surface-variant font-bold mb-1">
                      <span>Progress</span>
                      <span>{proj.progress}%</span>
                    </div>
                    <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold text-center w-fit ${
                    proj.status === 'On Track' ? 'bg-secondary-fixed text-secondary' :
                    proj.status === 'At Risk' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                    'bg-error-container text-error'
                  }`}>
                    {proj.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Today Tasks Widget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/40">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Actionable Tasks List</h3>
              <Link to="/employee/tasks" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1 font-bold no-underline">
                Open Kanban Board <ArrowRight size={14} />
              </Link>
            </div>
            <div className="p-4 divide-y divide-surface-variant">
              {tasks.filter(t => !t.done).slice(0, 4).map(t => (
                <div key={t.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 hover:bg-surface-container-low/30 transition-colors px-2 rounded-lg">
                  <button
                    onClick={() => toggleTaskDone(t.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      t.done ? 'border-secondary bg-secondary text-white' : 'border-outline-variant bg-surface'
                    }`}
                  >
                    {t.done && <CheckCircle2 size={12} className="text-white fill-secondary" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm text-on-surface font-semibold truncate ${t.done ? 'line-through text-on-surface-variant' : ''}`}>
                      {t.title}
                    </p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">Due {t.due || 'Soon'}</p>
                  </div>
                  <span className={`font-label-sm text-[10px] px-2 py-0.5 rounded font-bold ${
                    t.priority === 'High' ? 'bg-error-container text-error' :
                    t.priority === 'Medium' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                    'bg-surface-variant text-on-surface-variant'
                  }`}>
                    {t.priority}
                  </span>
                </div>
              ))}
              {tasks.filter(t => !t.done).length === 0 && (
                <div className="p-6 text-center space-y-2">
                  <CheckCircle2 className="text-secondary mx-auto" size={32} />
                  <p className="text-sm font-bold text-primary">All Tasks Completed!</p>
                  <p className="text-xs text-on-surface-variant">Outstanding job! You have no pending tasks remaining today.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Goal progress & Attendance highlight */}
        <div className="space-y-6">
          {/* Performance Widget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-5 space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold border-b border-outline-variant pb-3 flex items-center gap-2">
              <Award size={18} className="text-secondary" /> Goals Progress Overview
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Complete React certification', progress: 75 },
                { title: 'Mentor 2 junior developers', progress: 50 },
                { title: 'Lead 1 sprint as Scrum Master', progress: 100 },
              ].map(g => (
                <div key={g.title} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface font-semibold truncate max-w-[200px]">{g.title}</span>
                    <span className="text-secondary font-bold">{g.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all" style={{ width: g.progress + '%' }} />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/employee/performance" className="w-full border border-secondary text-secondary py-2 rounded-lg text-xs font-bold hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-1.5 mt-2 no-underline">
              Analyze Review Feedback
            </Link>
          </div>

          {/* Attendance History Widget */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-5 space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold border-b border-outline-variant pb-3">
              Attendance Record This Week
            </h3>
            <div className="space-y-3">
              {[
                { day: 'Mon', hours: '8h 00m', progress: 100 },
                { day: 'Tue', hours: '8h 05m', progress: 100 },
                { day: 'Wed', hours: '7h 58m', progress: 99 },
                { day: 'Thu', hours: '—', progress: 0 },
                { day: 'Fri', hours: '—', progress: 0 },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-label-sm text-xs text-on-surface-variant w-8 font-bold">{a.day}</span>
                  <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: `${a.progress}%` }} />
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant w-16 text-right font-semibold">{a.hours}</span>
                </div>
              ))}
            </div>
            <Link to="/employee/attendance" className="w-full bg-primary hover:bg-secondary text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 mt-2 no-underline">
              Open Clock Tracker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
