import React from 'react';
import { Brain, Star, ChevronRight } from 'lucide-react';

const candidates = [
  { name: 'Priya Sharma', role: 'Full Stack Engineer', match: 98, skills: ['React', 'Node.js', 'TypeScript'], yoe: 6 },
  { name: 'Marcus Roy', role: 'Product Manager', match: 94, skills: ['Agile', 'Roadmapping', 'Jira'], yoe: 5 },
  { name: 'Lin Wei', role: 'Data Analyst', match: 91, skills: ['Python', 'SQL', 'Tableau'], yoe: 3 },
  { name: 'Aisha Johnson', role: 'UX Designer', match: 87, skills: ['Figma', 'Research', 'Prototyping'], yoe: 4 },
  { name: 'David Kim', role: 'Backend Engineer', match: 83, skills: ['Java', 'Spring', 'Microservices'], yoe: 7 },
];

const CVScreening = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-secondary-fixed rounded-xl flex items-center justify-center">
        <Brain size={20} className="text-secondary" />
      </div>
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">AI CV Screening</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Candidates ranked by AI match score for selected position</p>
      </div>
    </div>
    <div className="bg-primary-fixed/30 border border-primary-fixed rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Star size={20} className="text-primary fill-primary" />
        <p className="font-body-md text-body-md text-primary font-medium">AI has analyzed <strong>248 CVs</strong> and ranked top candidates for <strong>Senior Frontend Developer</strong></p>
      </div>
      <select className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none">
        <option>Senior Frontend Developer</option>
        <option>Product Manager</option>
        <option>UX Designer</option>
      </select>
    </div>
    <div className="space-y-4">
      {candidates.map((c, i) => (
        <div key={c.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex items-center gap-5">
          <div className="text-2xl font-black text-on-surface-variant w-8 text-center">#{i + 1}</div>
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="font-label-md text-label-md text-on-surface font-semibold">{c.name}</p>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">{c.role} · {c.yoe} YOE</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {c.skills.map(s => <span key={s} className="text-xs bg-surface-container border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">{s}</span>)}
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center">
              <div className={`text-2xl font-black ${c.match >= 95 ? 'text-error' : c.match >= 90 ? 'text-secondary' : 'text-on-surface'}`}>{c.match}%</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">AI Match</div>
            </div>
            <button className="flex items-center gap-1 border border-secondary text-secondary px-3 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary-fixed transition-colors">
              Review <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default CVScreening;
