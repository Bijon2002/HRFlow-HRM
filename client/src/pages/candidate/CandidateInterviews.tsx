import React from 'react';
import { Video, Clock, Calendar, User, ArrowRight } from 'lucide-react';

const interviews = [
  { company: 'TechCorp BD', role: 'Senior Frontend Developer', date: 'Jul 12, 2026', time: '2:00 PM', type: 'Video', interviewer: 'Ms. Sarah Ahmed', status: 'Upcoming' },
  { company: 'DataViz Ltd', role: 'Data Analyst', date: 'Jul 9, 2026', time: '10:30 AM', type: 'Video', interviewer: 'Mr. Rahim Khan', status: 'Today' },
];

const CandidateInterviews = () => (
  <div className="p-6 space-y-6 max-w-5xl mx-auto">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Interviews</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Scheduled interviews and virtual meeting details</p>
    </div>
    
    <div className="space-y-4">
      {interviews.map(iv => {
        const isToday = iv.status === 'Today';
        return (
          <div 
            key={iv.company} 
            className={`bg-surface-container-lowest rounded-xl border p-6 transition-all ${
              isToday 
                ? 'border-secondary ring-2 ring-secondary/15 shadow-md shadow-secondary/5' 
                : 'border-outline-variant hover:border-primary hover:shadow-sm'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                  isToday ? 'bg-secondary text-on-secondary' : 'bg-primary-fixed text-primary'
                }`}>
                  {iv.company[0]}
                </div>
                <div className="space-y-1.5">
                  {isToday && (
                    <div className="flex items-center gap-2 text-secondary">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                      <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">Happening Today</span>
                    </div>
                  )}
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{iv.role}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant font-medium">{iv.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Calendar size={14} className="text-outline" /> {iv.date}
                    </span>
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Clock size={14} className="text-outline" /> {iv.time}
                    </span>
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Video size={14} className="text-outline" /> {iv.type} Call
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 text-on-surface-variant">
                    <User size={14} className="text-outline" />
                    <span className="font-body-md text-body-md text-sm">Interviewer: <strong className="text-on-surface">{iv.interviewer}</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant md:self-center shrink-0">
                {isToday ? (
                  <button className="w-full md:w-auto bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-opacity-90 hover:shadow-md transition-all flex items-center justify-center gap-2 shadow-sm">
                    <Video size={16} /> Join Interview
                  </button>
                ) : (
                  <button className="w-full md:w-auto border border-outline-variant text-on-surface-variant bg-surface px-5 py-2.5 rounded-lg font-label-md text-label-md hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-1.5">
                    Prepare Details <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CandidateInterviews;