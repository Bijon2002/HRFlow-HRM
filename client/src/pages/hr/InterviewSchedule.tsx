import React from 'react';
import { Calendar, Plus, Video, MapPin } from 'lucide-react';

const interviews = [
  { time: '9:00 AM', name: 'Priya Sharma', role: 'Full Stack Engineer', interviewer: 'Dr. Rahman', type: 'Video', status: 'Upcoming' },
  { time: '10:30 AM', name: 'Marcus Roy', role: 'Product Manager', interviewer: 'Ms. Ahmed', type: 'Room B', status: 'Upcoming' },
  { time: '1:00 PM', name: 'Lin Wei', role: 'Data Analyst', interviewer: 'Mr. Khan', type: 'Video', status: 'In Progress' },
  { time: '3:00 PM', name: 'Aisha Johnson', role: 'UX Designer', interviewer: 'Dr. Chowdhury', type: 'Room A', status: 'Upcoming' },
];

const InterviewSchedule = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Interview Schedule</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Wednesday, July 9, 2026</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">
        <Plus size={16} /> Schedule Interview
      </button>
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-4 border-b border-outline-variant bg-surface-container-low/50 flex items-center gap-2">
        <Calendar size={18} className="text-primary" />
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Today's Schedule</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        {interviews.map(iv => (
          <div key={iv.name} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-20 text-center">
                <p className="font-label-md text-label-md text-primary font-semibold">{iv.time}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold shrink-0">
                {iv.name[0]}
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">{iv.name}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{iv.role} · with {iv.interviewer}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                {iv.type === 'Video' ? <Video size={12} /> : <MapPin size={12} />} {iv.type}
              </span>
              <span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold ${iv.status === 'In Progress' ? 'bg-secondary-fixed text-secondary' : 'bg-surface-variant text-on-surface-variant'}`}>{iv.status}</span>
              {iv.type === 'Video' && <button className="bg-secondary text-on-secondary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors">Join</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default InterviewSchedule;
