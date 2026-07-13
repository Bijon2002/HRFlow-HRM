import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Video, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InterviewSchedule = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInterviews = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/jobs/applications');
      
      // Filter applications that are in Interview status
      const interviewApps = data.filter((app: any) => app.status === 'Interview');
      
      const mapped = interviewApps.map((app: any, index: number) => {
        const times = ['09:00 AM', '10:30 AM', '01:00 PM', '03:00 PM', '04:30 PM'];
        const interviewers = ['Dr. Rahman', 'Ms. Ahmed', 'Mr. Khan', 'Dr. Chowdhury', 'Ms. Yasmin'];
        
        return {
          id: app._id,
          time: app.interviewSlot?.time || times[index % times.length],
          name: app.candidateId?.name || 'Anonymous Candidate',
          role: app.internshipId?.title || 'Job Opportunity',
          interviewer: app.interviewSlot?.interviewer || interviewers[index % interviewers.length],
          type: app.interviewSlot?.type || (index % 2 === 0 ? 'Video' : 'Room A'),
          status: app.stage || 'Upcoming'
        };
      });
      
      setInterviews(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Interview Schedule</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant bg-surface-container-low/50 flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">Today's Schedule</h3>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400 font-semibold">Loading interview schedule...</div>
        ) : interviews.length > 0 ? (
          <div className="divide-y divide-outline-variant">
            {interviews.map(iv => (
              <div key={iv.id || iv.name} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
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
                  {iv.type === 'Video' && (
                    <button 
                      onClick={() => navigate('/hr/conduct-interview')}
                      className="bg-secondary text-on-secondary px-4 py-1.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors"
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 font-semibold">No interviews scheduled for today.</div>
        )}
      </div>
    </div>
  );
};

export default InterviewSchedule;
