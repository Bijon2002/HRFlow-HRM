import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const InternshipsList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/jobs');
      const mapped = data.map((job: any) => ({
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type || 'Full-time',
        salary: job.salary || 'Negotiable',
        tags: job.tags || [],
        posted: new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
      setJobs(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Browse Opportunities</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Discover jobs and internships that match your skills</p>
        </div>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input 
          type="text" 
          placeholder="Search by title, company or skill..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm focus:border-primary focus:outline-none shadow-sm transition-all" 
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-semibold">Loading job listings...</div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map(job => (
            <div key={job._id || job.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:border-primary hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-lg shrink-0">
                    {job.company[0]}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors cursor-pointer">{job.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant font-medium">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                      <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <MapPin size={14} className="text-outline" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                        <Clock size={14} className="text-outline" /> {job.type}
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        {job.salary}
                      </span>
                    </div>
                    {job.tags && job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {job.tags.map((t: string) => (
                          <span key={t} className="text-xs bg-primary-container text-on-primary-container px-2.5 py-1 rounded-md font-medium border border-primary-container">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{job.posted}</span>
                  <Link to="/candidate/apply" className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary hover:shadow-md transition-all">
                    Apply <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 font-semibold">No opportunities match your search.</div>
      )}
    </div>
  );
};

export default InternshipsList;
