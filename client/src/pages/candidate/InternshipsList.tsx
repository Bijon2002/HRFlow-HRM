import React from 'react';
import { MapPin, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const jobs = [
  { title: 'Senior Frontend Developer', company: 'TechCorp BD', location: 'Remote', type: 'Full-time', salary: '৳80k–120k', tags: ['React', 'TypeScript', 'Node.js'], posted: '2 days ago' },
  { title: 'Data Analyst Intern', company: 'DataViz Ltd', location: 'Dhaka', type: 'Internship', salary: '৳20k–30k', tags: ['Python', 'SQL', 'Excel'], posted: '3 days ago' },
  { title: 'UX Designer', company: 'DesignStudio', location: 'Hybrid', type: 'Full-time', salary: '৳60k–90k', tags: ['Figma', 'Prototyping'], posted: '1 week ago' },
  { title: 'Product Manager', company: 'FinTech Hub', location: 'Dhaka', type: 'Full-time', salary: '৳100k–150k', tags: ['Agile', 'Jira', 'Analytics'], posted: '5 days ago' },
];

const InternshipsList = () => (
  <div className="p-6 space-y-6 max-w-5xl mx-auto">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Browse Opportunities</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Discover jobs and internships that match your skills</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-all shadow-sm">
          <Filter size={16} /> Filter
        </button>
      </div>
    </div>

    <div className="relative">
      <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
      <input 
        type="text" 
        placeholder="Search by title, company or skill..." 
        className="pl-11 w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm focus:border-primary focus:outline-none shadow-sm transition-all" 
      />
    </div>

    <div className="grid grid-cols-1 gap-4">
      {jobs.map(job => (
        <div key={job.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:border-primary hover:shadow-md transition-all">
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
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {job.tags.map(t => (
                    <span key={t} className="text-xs bg-primary-container text-on-primary-container px-2.5 py-1 rounded-md font-medium border border-primary-container">
                      {t}
                    </span>
                  ))}
                </div>
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
  </div>
);

export default InternshipsList;

