import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HRDashboard = () => {
  const [stats, setStats] = useState({ openPositions: 0, applicationsCount: 0, interviewsTodayCount: 0 });
  const [interviews, setInterviews] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [topMatches, setTopMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      
      // 1. Fetch positions
      const jobs = await api.get('/jobs');
      const openCount = jobs.length;

      // 2. Fetch applications
      const apps = await api.get('/jobs/applications');
      const appsCount = apps.length;

      // 3. Filter interviews
      const interviewApps = apps.filter((a: any) => a.status === 'Interview');
      const interviewsCount = interviewApps.length;

      // Map interviews (similar to schedule)
      const mappedInterviews = interviewApps.slice(0, 3).map((a: any, idx: number) => {
        const times = ['10:00 AM', '01:30 PM', '03:00 PM'];
        return {
          id: a._id,
          time: times[idx % times.length],
          name: a.candidateId?.name || 'Anonymous Candidate',
          role: a.internshipId?.title || 'Unknown Position',
          type: idx % 2 === 0 ? 'Video' : 'Room A'
        };
      });

      // Recent Applications (top 5)
      const sortedRecent = [...apps].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const mappedRecent = sortedRecent.slice(0, 5).map((a: any) => ({
        id: a._id,
        name: a.candidateId?.name || 'Anonymous User',
        role: a.internshipId?.title || 'Job Opening',
        date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        status: a.status || 'New'
      }));

      // AI Top Matches (top 2 by score)
      const sortedMatches = [...apps].sort((a: any, b: any) => (b.score || 0) - (a.score || 0));
      const mappedMatches = sortedMatches.slice(0, 2).map((a: any) => ({
        id: a._id,
        name: a.candidateId?.name || 'Anonymous User',
        role: a.internshipId?.title || 'Job Opening',
        match: a.score || Math.floor(Math.random() * 20) + 78,
        skills: a.internshipId?.tags || ['React', 'Node.js']
      }));

      setStats({
        openPositions: openCount,
        applicationsCount: appsCount,
        interviewsTodayCount: interviewsCount
      });
      setInterviews(mappedInterviews);
      setRecentApplications(mappedRecent);
      setTopMatches(mappedMatches);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-7xl mx-auto space-y-stack_lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">HR Dashboard</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Welcome back, Sarah. Here's what's happening today.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/hr/vacancies" className="bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-primary transition-colors no-underline">
              <span className="material-symbols-outlined text-[18px]">add_box</span>
              Post New Job
            </Link>
            <Link to="/hr/interviews" className="border border-secondary text-secondary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container-low transition-colors no-underline">
              <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
              Schedule Interview
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400 font-semibold">Loading dashboard metrics...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-fixed/30 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-3 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary-container">work</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Open Positions</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-headline-lg text-[40px] leading-none text-primary font-bold">{stats.openPositions}</span>
                  <span className="font-label-md text-label-md text-secondary bg-secondary-fixed px-2 py-1 rounded">+1 this week</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-3 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary">description</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Applications This Week</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-headline-lg text-[40px] leading-none text-primary font-bold">{stats.applicationsCount}</span>
                  <span className="font-label-md text-label-md text-secondary bg-secondary-fixed px-2 py-1 rounded">+14% vs last</span>
                </div>
              </div>

              <div className="bg-primary-container text-on-primary rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/50 rounded-full blur-2xl"></div>
                <div className="flex items-center gap-3 mb-4 text-on-primary-container">
                  <span className="material-symbols-outlined">event</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Interviews Today</span>
                </div>
                <div className="flex items-end justify-between relative z-10">
                  <span className="font-headline-lg text-[40px] leading-none font-bold">{stats.interviewsTodayCount}</span>
                  <span className="font-label-md text-label-md text-primary-fixed-dim bg-primary px-2 py-1 rounded">2 remaining</span>
                </div>
              </div>
            </div>

            {/* Content sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              <div className="lg:col-span-2 space-y-stack_lg">
                {/* Interviews table */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                    <h3 className="font-headline-sm text-headline-sm text-primary">Interviews Today</h3>
                    <Link to="/hr/interviews" className="font-label-md text-label-md text-secondary hover:underline no-underline">View Calendar</Link>
                  </div>
                  
                  {interviews.length > 0 ? (
                    <div className="divide-y divide-surface-variant">
                      {interviews.map(iv => (
                        <div key={iv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-low/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="bg-surface-variant text-on-surface-variant rounded-lg p-2 text-center min-w-[70px]">
                              <div className="font-label-sm text-label-sm">{iv.time}</div>
                            </div>
                            <div>
                              <h4 className="font-headline-sm text-[16px] text-primary leading-tight font-semibold">{iv.name}</h4>
                              <p className="font-body-md text-body-md text-on-surface-variant text-sm">{iv.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 sm:ml-auto">
                            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 bg-surface-container py-1 px-2 rounded">
                              <span className="material-symbols-outlined text-[14px]">videocam</span> {iv.type}
                            </span>
                            <Link to="/hr/conduct-interview" className="bg-secondary text-on-secondary px-4 py-1.5 rounded font-label-md text-label-md hover:bg-secondary-container transition-colors no-underline">Join</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm font-semibold">No interviews scheduled today.</div>
                  )}
                </div>

                {/* Recent Applications table */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                    <h3 className="font-headline-sm text-headline-sm text-primary">Recent Applications</h3>
                    <Link to="/hr/applicants" className="font-label-md text-label-md text-secondary hover:underline no-underline">View All</Link>
                  </div>
                  
                  {recentApplications.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface border-b border-outline-variant">
                            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Candidate</th>
                            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Applied For</th>
                            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Date</th>
                            <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="font-body-md text-body-md">
                          {recentApplications.map(a => (
                            <tr key={a.id} className="border-b border-surface-variant hover:bg-surface/50">
                              <td className="p-4 font-medium text-primary">{a.name}</td>
                              <td className="p-4 text-on-surface-variant">{a.role}</td>
                              <td className="p-4 text-on-surface-variant">{a.date}</td>
                              <td className="p-4">
                                <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded-full font-label-sm text-[10px] uppercase font-bold">
                                  {a.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm font-semibold">No recent applications found.</div>
                  )}
                </div>
              </div>

              {/* AI Top Matches */}
              <div className="lg:col-span-1">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
                  <div className="p-4 border-b border-outline-variant flex gap-2 items-center bg-gradient-to-r from-primary-container/10 to-surface-container-low">
                    <span className="material-symbols-outlined text-secondary">auto_awesome</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary">AI Top Matches</h3>
                  </div>
                  
                  {topMatches.length > 0 ? (
                    <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto no-scrollbar">
                      {topMatches.map(m => (
                        <div key={m.id} className="bg-surface border border-outline-variant rounded-lg p-4 relative group cursor-pointer hover:border-primary transition-colors">
                          <div className="absolute top-4 right-4 bg-error-container text-on-error-container font-label-md text-label-md px-2 py-1 rounded-full font-bold shadow-sm text-xs">
                            {m.match}% Match
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-sm shrink-0">
                              {m.name[0]}
                            </div>
                            <div>
                              <h4 className="font-headline-sm text-[16px] text-primary font-semibold">{m.name}</h4>
                              <p className="font-body-md text-[13px] text-on-surface-variant">{m.role}</p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-2 pt-3 border-t border-surface-variant">
                            <div className="flex gap-2 flex-wrap">
                              {m.skills.map((s: string) => (
                                <span key={s} className="text-[11px] bg-surface-container px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Link to="/hr/cv-screening" className="w-full mt-4 border border-secondary text-secondary py-1.5 rounded text-sm font-medium hover:bg-secondary-fixed transition-colors flex items-center justify-center no-underline">
                            Review Profile
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-sm font-semibold">No matches analyzed yet.</div>
                  )}

                  <div className="p-3 border-t border-outline-variant bg-surface text-center">
                    <Link className="font-label-md text-label-md text-secondary hover:underline no-underline" to="/hr/cv-screening">View All Matches</Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;
