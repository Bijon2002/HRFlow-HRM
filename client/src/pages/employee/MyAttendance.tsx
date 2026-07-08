import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const records = [
  { date: 'Jul 9, 2026', day: 'Wed', in: '9:02 AM', out: null, hours: null, status: 'Present' },
  { date: 'Jul 8, 2026', day: 'Tue', in: '8:58 AM', out: '5:03 PM', hours: '8h 05m', status: 'Present' },
  { date: 'Jul 7, 2026', day: 'Mon', in: '9:15 AM', out: '5:00 PM', hours: '7h 45m', status: 'Present' },
  { date: 'Jul 4, 2026', day: 'Fri', in: null, out: null, hours: null, status: 'Absent' },
  { date: 'Jul 3, 2026', day: 'Thu', in: '9:00 AM', out: '5:00 PM', hours: '8h 00m', status: 'Present' },
];

const MyAttendance = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">My Attendance</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Clock in/out and view your attendance history</p>
      </div>
    </div>
    <div className="bg-primary rounded-xl p-6 flex items-center justify-between">
      <div>
        <p className="font-label-md text-label-md text-primary-fixed-dim">Today — Wednesday, July 9</p>
        <p className="font-headline-lg text-headline-lg text-on-primary font-bold mt-1">Clocked In: 9:02 AM</p>
        <p className="font-body-md text-body-md text-primary-fixed-dim mt-1">Working for: 4h 22m</p>
      </div>
      <button className="bg-error text-on-error px-6 py-3 rounded-xl font-label-md text-label-md hover:bg-on-error-container transition-colors shadow-md flex items-center gap-2">
        <Clock size={18} /> Clock Out
      </button>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {[{ label: 'Days Present', val: '18' }, { label: 'Days Absent', val: '2' }, { label: 'Avg Hours/Day', val: '7.9h' }].map(s => (
        <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center">
          <p className="font-headline-md text-headline-md text-primary font-bold">{s.val}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Attendance History</h3>
      </div>
      <table className="w-full text-left">
        <thead className="bg-surface-container-low border-b border-outline-variant">
          <tr>{['Date', 'Day', 'Clock In', 'Clock Out', 'Hours', 'Status'].map(h => (
            <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {records.map(r => (
            <tr key={r.date} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.date}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface-variant">{r.day}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.in || '—'}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.out || '—'}</td>
              <td className="px-4 py-3 font-body-md text-body-md text-on-surface">{r.hours || '—'}</td>
              <td className="px-4 py-3">
                <span className={`flex items-center gap-1 font-label-sm text-label-sm font-bold px-2 py-1 rounded-full w-fit ${r.status === 'Present' ? 'bg-secondary-fixed text-secondary' : 'bg-error-container text-on-error-container'}`}>
                  {r.status === 'Present' ? <CheckCircle size={12} /> : <XCircle size={12} />} {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default MyAttendance;
