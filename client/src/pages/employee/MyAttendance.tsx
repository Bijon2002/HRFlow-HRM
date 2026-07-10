import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Search, Calendar, ChevronDown, Plus, HelpCircle, FileText, Send } from 'lucide-react';

const initialHistory = [
  { date: 'Jul 9, 2026', day: 'Wed', in: '9:02 AM', out: '5:00 PM', hours: '7h 58m', status: 'Present' },
  { date: 'Jul 8, 2026', day: 'Tue', in: '8:58 AM', out: '5:03 PM', hours: '8h 05m', status: 'Present' },
  { date: 'Jul 7, 2026', day: 'Mon', in: '9:15 AM', out: '5:00 PM', hours: '7h 45m', status: 'Present' },
  { date: 'Jul 4, 2026', day: 'Fri', in: null, out: null, hours: null, status: 'Absent' },
  { date: 'Jul 3, 2026', day: 'Thu', in: '9:00 AM', out: '5:00 PM', hours: '8h 00m', status: 'Present' },
];

const initialLeaves = [
  { id: 1, type: 'Sick Leave', from: 'Jun 12, 2026', to: 'Jun 13, 2026', days: 2, status: 'Approved', reason: 'Flu symptoms and medical checkup' },
  { id: 2, type: 'Annual Leave', from: 'Aug 24, 2026', to: 'Aug 28, 2026', days: 5, status: 'Pending', reason: 'Family summer vacation travel' }
];

const MyAttendance = () => {
  // Clock Status
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  
  // Data lists
  const [history, setHistory] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  
  // Search & Filter
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Leave Form modal state
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  useEffect(() => {
    // 1. Sync clock-in state
    const savedAtt = localStorage.getItem('hrflow_employee_attendance');
    if (savedAtt) {
      try {
        const att = JSON.parse(savedAtt);
        setClockedIn(att.clockedIn || false);
        setClockInTime(att.clockInTime || null);
      } catch (e) {}
    }

    // 2. Sync attendance history list
    const savedHistory = localStorage.getItem('hrflow_employee_attendance_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        setHistory(initialHistory);
      }
    } else {
      setHistory(initialHistory);
      localStorage.setItem('hrflow_employee_attendance_history', JSON.stringify(initialHistory));
    }

    // 3. Sync leaves list
    const savedLeaves = localStorage.getItem('hrflow_employee_leave_requests');
    if (savedLeaves) {
      try {
        setLeaves(JSON.parse(savedLeaves));
      } catch (e) {
        setLeaves(initialLeaves);
      }
    } else {
      setLeaves(initialLeaves);
      localStorage.setItem('hrflow_employee_leave_requests', JSON.stringify(initialLeaves));
    }
  }, []);

  // Stopwatch timer logic
  useEffect(() => {
    let timer: any = null;
    if (clockedIn && clockInTime) {
      timer = setInterval(() => {
        const diff = Date.now() - clockInTime;
        const hrs = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        
        setElapsedTime(
          `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setElapsedTime('00:00:00');
    }
    return () => clearInterval(timer);
  }, [clockedIn, clockInTime]);

  const handleClockToggle = () => {
    const nextState = !clockedIn;
    const time = nextState ? Date.now() : null;
    setClockedIn(nextState);
    setClockInTime(time);

    const attState = { clockedIn: nextState, clockInTime: time };
    localStorage.setItem('hrflow_employee_attendance', JSON.stringify(attState));

    if (!nextState && clockInTime) {
      // Clock out -> compute record & update list
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

      const updatedHistory = [newRecord, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('hrflow_employee_attendance_history', JSON.stringify(updatedHistory));
    }
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveFrom || !leaveTo || !leaveReason.trim()) return;

    const fromDate = new Date(leaveFrom);
    const toDate = new Date(leaveTo);
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const newRequest = {
      id: Date.now(),
      type: leaveType,
      from: fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      to: toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      days: diffDays,
      status: 'Pending',
      reason: leaveReason
    };

    const updatedLeaves = [newRequest, ...leaves];
    setLeaves(updatedLeaves);
    localStorage.setItem('hrflow_employee_leave_requests', JSON.stringify(updatedLeaves));

    // Clear form
    setLeaveFrom('');
    setLeaveTo('');
    setLeaveReason('');
    setShowLeaveModal(false);
  };

  const filteredHistory = history.filter(r => {
    const matchesSearch = r.date.toLowerCase().includes(search.toLowerCase()) || 
                          r.day.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Today Date details
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">My Attendance Center</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Clock in sessions, track hours, and apply for leaves</p>
        </div>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-4 py-2.5 rounded-xl font-label-md text-label-md transition-colors shadow-md active:scale-95 shrink-0 w-full sm:w-auto justify-center"
        >
          <Calendar size={16} /> Request Leave
        </button>
      </div>

      {/* Clock Session Dashboard Card */}
      <div className="relative bg-gradient-to-br from-primary via-indigo-900 to-slate-900 rounded-2xl p-6 text-white overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[90px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] uppercase font-black tracking-widest text-indigo-300">Workspace Clock Session</p>
            <h2 className="text-xl font-bold text-teal-300 mt-1">{todayLabel}</h2>
            {clockedIn ? (
              <div className="flex flex-col md:flex-row items-center gap-2 pt-1">
                <span className="bg-emerald-500 text-white font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 shadow-sm animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Clocked In
                </span>
                <span className="text-xs text-indigo-200">Session started at: {clockInTime ? new Date(clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
              </div>
            ) : (
              <p className="text-sm text-slate-300 pt-1">Currently Offline. Click Clock In to log today's working session.</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 bg-slate-950/40 border border-white/10 backdrop-blur-md px-8 py-5 rounded-2xl shadow-inner min-w-[280px]">
            <div className="text-center">
              <span className="text-[9px] font-black uppercase text-indigo-300 tracking-wider">Session Active Time</span>
              <p className="text-3xl font-mono font-bold tracking-tight text-white mt-1">{elapsedTime}</p>
            </div>
            <button
              onClick={handleClockToggle}
              className={`w-full py-3 rounded-xl font-label-md text-sm font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                clockedIn
                  ? 'bg-error text-white hover:bg-error/95 shadow-error/15'
                  : 'bg-secondary text-white hover:bg-secondary/95 shadow-secondary/20'
              }`}
            >
              <Clock size={16} />
              {clockedIn ? 'Clock Out / End Session' : 'Clock In / Start Session'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Present Days', val: history.filter(h => h.status === 'Present').length + 15, color: 'text-secondary' },
          { label: 'Absent Days logged', val: history.filter(h => h.status === 'Absent').length, color: 'text-error' },
          { label: 'Average Session Hours', val: '8.1h', color: 'text-primary' }
        ].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center shadow-xs">
            <p className={`font-headline-lg text-3xl font-black ${s.color}`}>{s.val}</p>
            <p className="font-label-md text-xs text-on-surface-variant font-bold mt-2 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance logs history */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-3 bg-surface-container-low/30">
              <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">Attendance Logs History</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search by date/day..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-surface border border-outline-variant rounded-lg pl-8 pr-2.5 py-1.5 text-xs focus:border-primary focus:outline-none w-full placeholder-slate-400 font-medium"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-surface border border-outline-variant rounded-lg px-2.5 py-1.5 text-xs focus:outline-none cursor-pointer font-bold"
                >
                  <option value="All">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface border-b border-outline-variant">
                  <tr>
                    {['Date', 'Day', 'Clock In', 'Clock Out', 'Total Hours', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 font-label-md text-xs text-on-surface-variant font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant font-body-md text-sm">
                  {filteredHistory.map((r, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="px-4 py-3.5 font-semibold text-primary">{r.date}</td>
                      <td className="px-4 py-3.5 text-on-surface-variant">{r.day}</td>
                      <td className="px-4 py-3.5 font-mono text-xs">{r.in || '—'}</td>
                      <td className="px-4 py-3.5 font-mono text-xs">{r.out || '—'}</td>
                      <td className="px-4 py-3.5 font-semibold">{r.hours || '—'}</td>
                      <td className="px-4 py-3.5">
                        <span className={`flex items-center gap-1 font-label-sm text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                          r.status === 'Present' ? 'bg-secondary-fixed text-secondary' : 'bg-error-container text-error'
                        }`}>
                          {r.status === 'Present' ? <CheckCircle size={10} /> : <XCircle size={10} />} {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-on-surface-variant">No attendance records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leave Requests Panel */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 flex flex-col gap-4">
          <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider border-b border-outline-variant pb-3 flex items-center gap-2">
            <FileText size={16} className="text-secondary" /> Leaves & Absences
          </h3>
          <div className="space-y-4 overflow-y-auto no-scrollbar flex-1">
            {leaves.map((l, i) => (
              <div key={i} className="border border-outline-variant/60 rounded-xl p-4 space-y-2 hover:border-primary/50 transition-all bg-surface/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-xs text-primary font-bold">{l.type}</span>
                  <span className={`px-2 py-0.5 rounded font-label-sm text-[9px] font-bold uppercase tracking-wider ${
                    l.status === 'Approved' ? 'bg-secondary-fixed text-secondary' :
                    l.status === 'Pending' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                    'bg-error-container text-error'
                  }`}>
                    {l.status}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant font-mono">{l.from} → {l.to} ({l.days} days)</p>
                <p className="text-xs text-on-surface-variant italic font-body-md line-clamp-2">"{l.reason}"</p>
              </div>
            ))}
            {leaves.length === 0 && (
              <div className="text-center p-6 text-on-surface-variant">No leave requests logged yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-2">
                <Send className="text-secondary" size={18} />
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Apply for Leave</h3>
              </div>
              <button 
                onClick={() => setShowLeaveModal(false)}
                className="p-1.5 hover:bg-surface-container-high rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <XCircle size={18} className="text-on-surface-variant hover:text-error" />
              </button>
            </div>
            <form onSubmit={handleApplyLeave} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={e => setLeaveType(e.target.value)}
                  className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none cursor-pointer font-medium"
                >
                  <option value="Sick Leave">🤒 Sick Leave</option>
                  <option value="Annual Leave">✈️ Annual Leave</option>
                  <option value="Casual Leave">🍂 Casual Leave</option>
                  <option value="Unpaid Leave">⏳ Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">From Date</label>
                  <input 
                    type="date" 
                    value={leaveFrom}
                    onChange={e => setLeaveFrom(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none text-on-surface font-semibold"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">To Date</label>
                  <input 
                    type="date" 
                    value={leaveTo}
                    onChange={e => setLeaveTo(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none text-on-surface font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Reason for absence</label>
                <textarea
                  rows={3}
                  value={leaveReason}
                  onChange={e => setLeaveReason(e.target.value)}
                  placeholder="Explain why you need this leave request..."
                  className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none resize-none placeholder-slate-400"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant">
                <button 
                  type="button" 
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1 border border-outline-variant text-on-surface hover:bg-surface-container-low py-2.5 rounded-xl font-label-md text-label-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-secondary text-white py-2.5 rounded-xl font-label-md text-label-md transition-colors shadow-md shadow-primary/10 active:scale-95"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAttendance;
