import React from 'react';
import { Video, Clock, Calendar } from 'lucide-react';

const interviews = [
  { company: 'TechCorp BD', role: 'Senior Frontend Developer', date: 'Jul 12, 2026', time: '2:00 PM', type: 'Video', interviewer: 'Ms. Sarah Ahmed', status: 'Upcoming' },
  { company: 'DataViz Ltd', role: 'Data Analyst', date: 'Jul 9, 2026', time: '10:30 AM', type: 'Video', interviewer: 'Mr. Rahim Khan', status: 'Today' },
];

const CandidateInterviews = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Interviews</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Scheduled interviews and their details</p>
    </div>
    <div className="space-y-4">
      {interviews.map(iv => (
        <div key={iv.company} className={['bg-surface-container-lowest rounded-xl border p-6 hover:shadow-md transition-all', iv.status === 'Today' ? 'border-secondary ring-2 ring-secondary/20' : 'border-outline-variant'].join(' ')}>
          {iv.status === 'Today' && (
            <div className="flex items-center gap-2 text-secondary mb-4">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-md text-label-md font-bold">Interview Today!</span>
            </div>
          )}
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-lg">{iv.company[0]}</div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{iv.role}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{iv.company}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Calendar size={12} />{iv.date}</span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Clock size={12} />{iv.time}</span>
                  <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Video size={12} />{iv.type}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-2">Interviewer: {iv.interviewer}</p>
              </div>
            </div>
            {iv.status === 'Today' && (
              <button className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors flex items-center gap-2">
                <Video size={16} /> Join Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default CandidateInterviews;