import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, MapPin, Clock } from 'lucide-react';

const ManageVacancies = () => {
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Stats
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [totalApplicationsCount, setTotalApplicationsCount] = useState(0);

  const fetchVacancies = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/jobs');
      const mapped = data.map((job: any) => ({
        _id: job._id,
        title: job.title,
        dept: job.tags?.[0] || 'General',
        location: job.location,
        type: job.type || 'Full-time',
        applications: 0,
        status: 'Active',
        posted: new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));

      // Fetch all applications to calculate counts dynamically
      const apps = await api.get('/jobs/applications');
      setTotalApplicationsCount(apps.length);

      // Map application counts to vacancies
      const mappedWithApps = mapped.map((v: any) => {
        const count = apps.filter((a: any) => a.internshipId?._id === v._id || a.internshipId === v._id).length;
        return { ...v, applications: count };
      });

      setVacancies(mappedWithApps);
      setActiveJobsCount(mappedWithApps.length);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const filteredVacancies = vacancies.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Manage Vacancies</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Create and manage job postings</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[{ label: 'Active Jobs', val: String(activeJobsCount) }, { label: 'Total Applications', val: String(totalApplicationsCount) }, { label: 'Avg. Time to Fill', val: '18 days' }].map(s => (
          <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center">
            <p className="font-headline-lg text-headline-lg text-primary font-bold">{s.val}</p>
            <p className="font-label-md text-label-md text-on-surface-variant mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant">
          <input 
            type="text" 
            placeholder="Search vacancies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" 
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-400 font-semibold">Loading vacancies database...</div>
        ) : filteredVacancies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>{['Job Title', 'Department', 'Location', 'Applications', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-surface-variant">
                {filteredVacancies.map(v => (
                  <tr key={v._id || v.title} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-label-md text-label-md text-on-surface font-semibold">{v.title}</p>
                      <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-0.5 flex items-center gap-1"><Clock size={11} />Posted {v.posted}</p>
                    </td>
                    <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{v.dept}</td>
                    <td className="px-4 py-4"><span className="flex items-center gap-1 font-body-md text-body-md text-on-surface-variant"><MapPin size={12} />{v.location}</span></td>
                    <td className="px-4 py-4 font-body-md text-body-md text-on-surface font-semibold">{v.applications}</td>
                    <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold bg-secondary-fixed text-secondary`}>{v.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 font-semibold">No vacancies found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageVacancies;
