import React from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Clock } from 'lucide-react';

const vacancies = [
  { title: 'Senior Frontend Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time', applications: 45, status: 'Active', posted: '5 days ago' },
  { title: 'Product Manager', dept: 'Product', location: 'Dhaka', type: 'Full-time', applications: 28, status: 'Active', posted: '1 week ago' },
  { title: 'UX Designer', dept: 'Design', location: 'Hybrid', type: 'Full-time', applications: 17, status: 'Paused', posted: '2 weeks ago' },
  { title: 'Data Analyst Intern', dept: 'Analytics', location: 'On-site', type: 'Internship', applications: 62, status: 'Active', posted: '3 days ago' },
];

const ManageVacancies = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Manage Vacancies</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Create and manage job postings</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        <Plus size={16} /> Post New Job
      </button>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {[{ label: 'Active Jobs', val: '10' }, { label: 'Total Applications', val: '152' }, { label: 'Avg. Time to Fill', val: '18 days' }].map(s => (
        <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center">
          <p className="font-headline-lg text-headline-lg text-primary font-bold">{s.val}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{s.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <input type="text" placeholder="Search vacancies..." className="w-full max-w-xs rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>{['Job Title', 'Department', 'Location', 'Applications', 'Status', 'Actions'].map(h => (
              <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-surface-variant">
            {vacancies.map(v => (
              <tr key={v.title} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-4 py-4">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{v.title}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-0.5 flex items-center gap-1"><Clock size={11} />{v.posted}</p>
                </td>
                <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{v.dept}</td>
                <td className="px-4 py-4"><span className="flex items-center gap-1 font-body-md text-body-md text-on-surface-variant"><MapPin size={12} />{v.location}</span></td>
                <td className="px-4 py-4 font-body-md text-body-md text-on-surface font-semibold">{v.applications}</td>
                <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold ${v.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-surface-variant text-on-surface-variant'}`}>{v.status}</span></td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:text-primary transition-colors text-on-surface-variant"><Eye size={16} /></button>
                    <button className="p-1.5 hover:text-secondary transition-colors text-on-surface-variant"><Edit size={16} /></button>
                    <button className="p-1.5 hover:text-error transition-colors text-on-surface-variant"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
export default ManageVacancies;
