import React from 'react';
import { Filter, Download } from 'lucide-react';

const applicants = [
  { name: 'Marcus Aurelius', role: 'Product Manager', email: 'marcus@email.com', score: 92, status: 'New', date: 'Jul 9, 2026' },
  { name: 'Elena Rostova', role: 'Data Analyst', email: 'elena@email.com', score: 88, status: 'Screening', date: 'Jul 8, 2026' },
  { name: 'James Smith', role: 'Sr. Frontend Dev', email: 'james@email.com', score: 95, status: 'Interview', date: 'Jul 7, 2026' },
  { name: 'Aisha Patel', role: 'UX Designer', email: 'aisha@email.com', score: 78, status: 'Offer Sent', date: 'Jul 6, 2026' },
  { name: 'Lin Wei', role: 'Data Analyst', email: 'lin@email.com', score: 85, status: 'New', date: 'Jul 9, 2026' },
];

const statusColor: Record<string, string> = {
  'New': 'bg-primary-fixed text-primary',
  'Screening': 'bg-tertiary-fixed text-on-tertiary-fixed',
  'Interview': 'bg-secondary-fixed text-secondary',
  'Offer Sent': 'bg-surface-variant text-on-surface-variant',
};

const ApplicantList = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Applicant List</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage incoming applications</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Filter size={16} /> Filter</button>
        <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Download size={16} /> Export</button>
      </div>
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant flex gap-3">
        <input type="text" placeholder="Search applicants..." className="flex-1 max-w-xs rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        <select className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none text-on-surface-variant">
          <option>All Positions</option>
          <option>Product Manager</option>
          <option>Frontend Dev</option>
        </select>
      </div>
      <table className="w-full text-left">
        <thead className="bg-surface-container-low border-b border-outline-variant">
          <tr>{['Candidate', 'Position', 'AI Score', 'Status', 'Applied', 'Actions'].map(h => (
            <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {applicants.map(a => (
            <tr key={a.name} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm">{a.name[0]}</div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{a.name}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-xs">{a.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{a.role}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 max-w-[80px] h-1.5 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: a.score + '%' }} />
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">{a.score}</span>
                </div>
              </td>
              <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold ${statusColor[a.status] || 'bg-surface-variant text-on-surface-variant'}`}>{a.status}</span></td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{a.date}</td>
              <td className="px-4 py-4">
                <button className="border border-primary text-primary px-3 py-1 rounded-lg font-label-md text-label-md hover:bg-primary-fixed transition-colors text-xs">Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default ApplicantList;
