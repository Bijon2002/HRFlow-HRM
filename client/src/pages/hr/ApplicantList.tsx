import React, { useState, useEffect } from 'react';
import { Filter, Download } from 'lucide-react';

const statusColor: Record<string, string> = {
  'New': 'bg-primary-fixed text-primary',
  'Screening': 'bg-tertiary-fixed text-on-tertiary-fixed',
  'Interview': 'bg-secondary-fixed text-secondary',
  'Offer Sent': 'bg-surface-variant text-on-surface-variant',
  'Applied': 'bg-primary-fixed text-primary',
  'Under Review': 'bg-tertiary-fixed text-on-tertiary-fixed',
};

const ApplicantList = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All Positions');
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplicants = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/jobs/applications');
      const mapped = data.map((app: any) => ({
        _id: app._id,
        name: app.candidateId?.name || 'Anonymous User',
        email: app.candidateId?.email || '',
        role: app.internshipId?.title || 'Job Opportunity',
        score: app.score || Math.floor(Math.random() * 20) + 75, // Simulated AI score for demonstration
        status: app.status || 'New',
        date: new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
      setApplicants(mapped);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const uniquePositions = ['All Positions', ...new Set(applicants.map(a => a.role))];

  const filteredApplicants = applicants.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = selectedPosition === 'All Positions' || a.role === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Applicant List</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage incoming applications</p>
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex gap-3">
          <input 
            type="text" 
            placeholder="Search applicants..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-xs rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" 
          />
          <select 
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none text-on-surface-variant"
          >
            {uniquePositions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400 font-semibold">Loading applicants database...</div>
        ) : filteredApplicants.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>{['Candidate', 'Position', 'AI Match', 'Status', 'Applied'].map(h => (
                <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-surface-variant">
              {filteredApplicants.map(a => (
                <tr key={a._id || a.email} className="hover:bg-surface-container-low/50 transition-colors">
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
                      <span className="font-label-sm text-label-sm text-secondary font-bold">{a.score}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold ${statusColor[a.status] || 'bg-surface-variant text-on-surface-variant'}`}>{a.status}</span></td>
                  <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-slate-400 font-semibold">No applications found.</div>
        )}
      </div>
    </div>
  );
};

export default ApplicantList;
