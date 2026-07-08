import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const jobs = [
  { title: 'Senior Frontend Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Manager', dept: 'Product', location: 'Dhaka, BD', type: 'Full-time' },
  { title: 'UX Designer', dept: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Data Analyst Intern', dept: 'Analytics', location: 'Dhaka, BD', type: 'Internship' },
];

const Careers = () => (
  <div className="max-w-5xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">Open Positions</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant">Join our team and help shape the future of HR technology.</p>
    </div>
    <div className="space-y-4">
      {jobs.map(job => (
        <div key={job.title} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant hover:border-primary hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{job.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">{job.dept}</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><MapPin size={12} />{job.location}</span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Clock size={12} />{job.type}</span>
              </div>
            </div>
            <Link to="/auth/register" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all opacity-0 group-hover:opacity-100">
              Apply <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Careers;
