import React from 'react';
import { CheckCircle, Clock, XCircle, Calendar } from 'lucide-react';

const apps = [
  { company: 'TechCorp BD', role: 'Senior Frontend Developer', applied: 'Jul 7', status: 'Interview', stage: 'Technical Interview', stageNum: 3 },
  { company: 'DataViz Ltd', role: 'Data Analyst', applied: 'Jul 5', status: 'Under Review', stage: 'Screening', stageNum: 2 },
  { company: 'FinTech Hub', role: 'Product Manager', applied: 'Jul 3', status: 'Applied', stage: 'Application Submitted', stageNum: 1 },
  { company: 'StartupXYZ', role: 'UX Designer', applied: 'Jun 28', status: 'Rejected', stage: 'Rejected', stageNum: 0 },
];

const statusIcon = (s: string) => {
  if (s === 'Rejected') return <XCircle size={16} className="text-error" />;
  if (s === 'Interview') return <Calendar size={16} className="text-secondary" />;
  return <Clock size={16} className="text-on-surface-variant" />;
};

const MyApplications = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Applications</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track the progress of all your job applications</p>
    </div>
    <div className="space-y-4">
      {apps.map(a => (
        <div key={a.company} className={`bg-surface-container-lowest rounded-xl border p-5 hover:shadow-md transition-all ${a.status === 'Rejected' ? 'border-error/30 opacity-75' : 'border-outline-variant hover:border-primary'}`}>
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">{a.company[0]}</div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{a.role}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{a.company} · Applied {a.applied}</p>
                {a.stageNum > 0 && (
                  <div className="flex items-center gap-1.5 mt-3">
                    {[1,2,3,4].map(n => (
                      <div key={n} className={`h-1.5 w-8 rounded-full ${n <= a.stageNum ? 'bg-primary' : 'bg-surface-variant'}`} />
                    ))}
                    <span className="font-label-sm text-label-sm text-on-surface-variant ml-2">{a.stage}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {statusIcon(a.status)}
              <span className={`font-label-sm text-label-sm font-bold px-2 py-1 rounded-full ${
                a.status === 'Rejected' ? 'bg-error-container text-on-error-container' :
                a.status === 'Interview' ? 'bg-secondary-fixed text-secondary' :
                'bg-surface-variant text-on-surface-variant'
              }`}>{a.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default MyApplications;
