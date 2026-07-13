import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock, AlertCircle, FileText, Check, X, Search } from 'lucide-react';

const initialLeaveRequests = [
  { id: '1', name: 'Nadia Islam', role: 'UX Designer', type: 'Annual Leave', duration: 'Jul 14 - Jul 17 (4 days)', reason: 'Family vacation and personal travel', status: 'Pending' },
  { id: '2', name: 'Sarah Hassan', role: 'Software Engineer', type: 'Sick Leave', duration: 'Jul 20 (1 day)', reason: 'Dental appointment & post-treatment rest', status: 'Pending' },
];

const AttendanceTracking = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [staffCount, setStaffCount] = useState(0);

  const fetchAttendanceLogs = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      
      // Fetch users count to calculate rates
      const users = await api.get('/auth/users');
      const staff = users.filter((u: any) => u.role === 'employee' || u.role === 'hr');
      setStaffCount(staff.length);

      // Fetch attendance logs
      const data = await api.get('/attendance');
      const mapped = data.map((log: any) => {
        const checkInTime = log.clockIn ? new Date(log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
        const checkOutTime = log.clockOut ? new Date(log.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
        
        // Mark as Late if check in is after 09:30 AM
        const clockInDate = log.clockIn ? new Date(log.clockIn) : null;
        let status = 'On Time';
        if (clockInDate) {
          const hour = clockInDate.getHours();
          const minute = clockInDate.getMinutes();
          if (hour > 9 || (hour === 9 && minute > 30)) {
            status = 'Late';
          }
        }
        
        return {
          id: log._id,
          name: log.employeeId?.name || 'Anonymous Staff',
          role: log.employeeId?.role === 'hr' ? 'HR Manager' : 'Software Engineer',
          date: log.date,
          checkIn: checkInTime,
          checkOut: checkOutTime,
          status,
          hours: log.totalHours ? `${log.totalHours} hrs` : '0 hrs'
        };
      });
      setLogs(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceLogs();
  }, []);

  const handleApproveLeave = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
  };

  const handleRejectLeave = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const presentToday = logs.filter(l => l.date === todayStr).length;
  const lateToday = logs.filter(l => l.date === todayStr && l.status === 'Late').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Attendance & Leave Tracking</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Monitor real-time employee clock-ins, working hours, and manage leave requests
          </p>
        </div>
        <div className="flex gap-2">
          <span className="bg-surface-container border border-outline-variant px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface flex items-center gap-2 shadow-sm">
            <CalendarIcon size={16} className="text-secondary" />
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Present Today', val: `${presentToday} / ${staffCount || 1}`, desc: 'Active attendance', color: 'text-secondary bg-secondary-fixed' },
          { label: 'Late Clock-ins', val: String(lateToday), desc: 'Clock-in after 09:30 AM', color: 'text-error bg-error-container' },
          { label: 'On Leave Today', val: '0', desc: 'Pre-approved leave', color: 'text-on-tertiary-fixed-variant bg-tertiary-fixed' },
          { label: 'Pending Requests', val: requests.filter(r => r.status === 'Pending').length.toString(), desc: 'Require review', color: 'text-secondary bg-secondary-fixed' }
        ].map((s, idx) => (
          <div key={idx} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
              <p className="font-headline-lg text-headline-lg text-primary font-bold mt-2">{s.val}</p>
            </div>
            <p className="font-body-md text-[11px] text-on-surface-variant mt-2 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${s.color.split(' ')[0]}`}></span>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Logs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Daily Logs</h3>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-48">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search name/role..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-8 w-full rounded-lg border border-outline-variant bg-surface px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="rounded-lg border border-outline-variant bg-surface px-3 py-1.5 text-xs focus:border-primary focus:outline-none text-on-surface-variant"
                >
                  <option value="All">All Statuses</option>
                  <option value="On Time">On Time</option>
                  <option value="Late">Late</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-slate-400 font-semibold">Loading attendance logs...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      {['Employee', 'Date', 'Clock In', 'Clock Out', 'Status', 'Work Hours'].map(h => (
                        <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-surface-container-low/40 transition-colors">
                          <td className="px-4 py-3.5">
                            <div>
                              <p className="font-label-md text-label-md text-on-surface font-semibold">{log.name}</p>
                              <p className="font-body-md text-body-md text-on-surface-variant text-xs">{log.role}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 font-body-md text-body-md text-on-surface-variant text-sm">{log.date}</td>
                          <td className="px-4 py-3.5 font-body-md text-body-md text-on-surface text-sm flex items-center gap-1.5">
                            <Clock size={12} className="text-on-surface-variant" /> {log.checkIn}
                          </td>
                          <td className="px-4 py-3.5 font-body-md text-body-md text-on-surface-variant text-sm">{log.checkOut}</td>
                          <td className="px-4 py-3.5">
                            <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold text-[10px] flex items-center gap-1 w-fit ${
                              log.status === 'On Time' ? 'bg-secondary-fixed text-secondary' : 'bg-error-container text-error'
                            }`}>
                              {log.status === 'On Time' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                              {log.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-label-md text-label-md text-on-surface font-semibold text-sm">{log.hours}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center font-body-md text-body-md text-on-surface-variant">
                          No attendance logs found matching search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Leave Requests Management */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-2 border-b border-outline-variant pb-3">
              <FileText size={18} className="text-primary" />
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Leave Requests</h3>
            </div>
            
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="border border-outline-variant rounded-lg p-4 space-y-3 bg-surface hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-semibold">{req.name}</p>
                      <p className="font-body-md text-body-md text-on-surface-variant text-xs">{req.role}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold text-[10px] ${
                      req.status === 'Pending' ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant' :
                      req.status === 'Approved' ? 'bg-secondary-fixed text-secondary' : 'bg-error-container text-error'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-body-md text-on-surface"><strong className="text-primary">Type:</strong> {req.type}</p>
                    <p className="font-body-md text-on-surface"><strong className="text-primary">Period:</strong> {req.duration}</p>
                    <p className="font-body-md text-on-surface-variant mt-1.5 italic">"{req.reason}"</p>
                  </div>

                  {req.status === 'Pending' && (
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleApproveLeave(req.id)}
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-on-secondary py-1.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button
                        onClick={() => handleRejectLeave(req.id)}
                        className="flex-1 border border-error text-error hover:bg-rose-50 py-1.5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-1 transition-all"
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-center font-body-md text-body-md text-on-surface-variant py-4">No leave requests found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracking;
