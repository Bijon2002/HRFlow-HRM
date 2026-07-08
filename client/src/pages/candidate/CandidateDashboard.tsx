import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const metrics = [
  { label: 'Applications Sent', value: '7', icon: FileText, color: 'bg-primary-fixed text-primary' },
  { label: 'Interviews Scheduled', value: '2', icon: Calendar, color: 'bg-secondary-fixed text-secondary' },
  { label: 'Offers Received', value: '1', icon: CheckCircle, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { label: 'Tests Pending', value: '3', icon: Clock, color: 'bg-error-container text-error' },
];

const apps = [
  { company: 'TechCorp BD', role: 'Frontend Developer', status: 'Under Review', date: 'Jul 7' },
  { company: 'DataViz Ltd', role: 'Data Analyst', status: 'Interview Scheduled', date: 'Jul 5' },
  { company: 'FinTech Hub', role: 'UX Designer', status: 'Applied', date: 'Jul 3' },
];

const CandidateDashboard = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">My Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Welcome back, Candidate!</p>
      </div>
      <Link to="/candidate/internships" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        Browse Jobs <ArrowRight size={16} />
      </Link>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.color}`}><m.icon size={18} /></div>
          </div>
          <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{m.value}</p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1">{m.label}</p>
        </div>
      ))}
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">My Applications</h3>
        <Link to="/candidate/applications" className="font-label-md text-label-md text-secondary hover:underline">View All</Link>
      </div>
      <div className="divide-y divide-outline-variant">
        {apps.map(a => (
          <div key={a.company} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold">{a.company[0]}</div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{a.role}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{a.company}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-1 rounded-full font-label-sm text-label-sm font-bold bg-secondary-fixed text-secondary">{a.status}</span>
              <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default CandidateDashboard;
