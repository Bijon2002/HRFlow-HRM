import React from 'react';
import { CheckCircle, Clock, XCircle, Calendar, ChevronRight } from 'lucide-react';

const apps = [
  { company: 'TechCorp BD', role: 'Senior Frontend Developer', applied: 'Jul 7', status: 'Interview', stage: 'Technical Interview', stageNum: 3 },
  { company: 'DataViz Ltd', role: 'Data Analyst', applied: 'Jul 5', status: 'Under Review', stage: 'Screening', stageNum: 2 },
  { company: 'FinTech Hub', role: 'Product Manager', applied: 'Jul 3', status: 'Applied', stage: 'Application Submitted', stageNum: 1 },
  { company: 'StartupXYZ', role: 'UX Designer', applied: 'Jun 28', status: 'Rejected', stage: 'Rejected', stageNum: 0 },
];

const statusIcon = (s: string) => {
  if (s === 'Rejected') return <XCircle size={16} className="text-error" />;
  if (s === 'Interview') return <Calendar size={16} className="text-secondary" />;
  return <Clock size={16} className="text-outline" />;
};

const MyApplications = () => (
  <div className="p-6 space-y-6 max-w-5xl mx-auto">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Applications</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track the progress of all your job applications</p>
    </div>
    
    <div className="space-y-4">
      {apps.map(a => (
        <div 
          key={a.company} 
          className={`bg-surface-container-lowest rounded-xl border p-6 hover:shadow-md transition-all ${
            a.status === 'Rejected' 
              ? 'border-error/20 bg-error-container/5 opacity-80' 
              : 'border-outline-variant hover:border-primary'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-lg shrink-0">
                {a.company[0]}
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{a.role}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {a.company} <span className="text-outline-variant px-1.5">·</span> Applied {a.applied}
                </p>
                
                {a.stageNum > 0 ? (
                  <div className="flex flex-wrap items-center gap-2 pt-3">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold mr-1">Pipeline:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map(n => (
                        <div 
                          key={n} 
                          className={`h-2 w-8 rounded-full transition-all ${
                            n <= a.stageNum ? 'bg-primary' : 'bg-surface-variant'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold ml-2 bg-primary-container px-2 py-0.5 rounded">
                      {a.stage}
                    </span>
                  </div>
                ) : (
                  <p className="font-label-sm text-label-sm text-error font-semibold pt-3">Application Closed</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold ${
                a.status === 'Rejected' ? 'bg-error-container text-error' :
                a.status === 'Interview' ? 'bg-secondary-fixed text-secondary' :
                'bg-surface-container text-on-surface-variant'
              }`}>
                {statusIcon(a.status)}
                <span>{a.status}</span>
              </div>
              <ChevronRight size={18} className="text-outline hidden md:block" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyApplications;

