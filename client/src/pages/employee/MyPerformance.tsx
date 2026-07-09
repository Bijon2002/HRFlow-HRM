import React from 'react';
import { TrendingUp, Star } from 'lucide-react';

const goals = [
  { title: 'Complete React certification', progress: 75 },
  { title: 'Mentor 2 junior developers', progress: 50 },
  { title: 'Lead 1 sprint as Scrum Master', progress: 100 },
];

const MyPerformance = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">My Performance</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Q3 2026 performance review</p>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { label: 'Overall Score', val: '87', unit: '/100', color: 'text-secondary' },
        { label: 'Goals Completed', val: '6', unit: '/8', color: 'text-primary' },
        { label: 'Manager Rating', val: '4.2', unit: '/5.0', color: 'text-on-tertiary-fixed' },
      ].map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant text-center">
          <p className={`font-headline-lg text-headline-lg font-black ${m.color}`}>{m.val}<span className="font-body-md text-body-md text-on-surface-variant">{m.unit}</span></p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-2">{m.label}</p>
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">Q3 Goals Progress</h3>
        <div className="space-y-4">
          {goals.map(g => (
            <div key={g.title}>
              <div className="flex justify-between mb-1">
                <span className="font-body-md text-body-md text-on-surface">{g.title}</span>
                <span className="font-label-md text-label-md text-secondary font-bold">{g.progress}%</span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full transition-all" style={{ width: g.progress + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">Skill Ratings</h3>
        <div className="space-y-4">
          {[
            { skill: 'Technical Skills', score: 4.5 },
            { skill: 'Communication', score: 4.0 },
            { skill: 'Teamwork', score: 4.8 },
            { skill: 'Problem Solving', score: 4.2 },
          ].map(s => (
            <div key={s.skill} className="flex items-center justify-between">
              <span className="font-body-md text-body-md text-on-surface-variant">{s.skill}</span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(n => (
                  <Star key={n} size={16} className={n <= Math.round(s.score) ? 'text-on-tertiary-fixed fill-on-tertiary-fixed' : 'text-surface-variant'} />
                ))}
                <span className="font-label-md text-label-md text-on-surface-variant ml-2">{s.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default MyPerformance;
