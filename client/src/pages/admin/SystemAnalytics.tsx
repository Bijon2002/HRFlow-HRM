import React from 'react';
import { BarChart2, Users, Briefcase, TrendingUp } from 'lucide-react';

const SystemAnalytics = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">System Analytics</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Platform-wide reporting and insights</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'New Users (30d)', val: '+142', change: '+18%', icon: Users, color: 'text-secondary' },
        { label: 'Jobs Posted (30d)', val: '38', change: '+12%', icon: Briefcase, color: 'text-primary' },
        { label: 'Applications (30d)', val: '1,204', change: '+25%', icon: BarChart2, color: 'text-on-tertiary-fixed' },
        { label: 'Avg. Session', val: '14m', change: '+3m', icon: TrendingUp, color: 'text-error' },
      ].map(m => (
        <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <p className="font-label-md text-label-md text-on-surface-variant">{m.label}</p>
            <m.icon size={18} className={m.color} />
          </div>
          <p className="font-headline-md text-headline-md text-on-surface font-bold">{m.val}</p>
          <p className="font-label-sm text-label-sm text-secondary mt-1">{m.change} vs last month</p>
        </div>
      ))}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">User Growth (Last 6 Months)</h3>
        <div className="flex items-end gap-3 h-40">
          {[80, 110, 95, 140, 125, 160].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-primary rounded-t-md transition-all hover:bg-secondary" style={{ height: (h / 160) * 100 + '%' }} />
              <span className="font-label-sm text-label-sm text-on-surface-variant">{['F','M','A','M','J','J'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-6">Hiring Funnel</h3>
        <div className="space-y-3">
          {[
            { stage: 'Applications', count: 1204, pct: 100 },
            { stage: 'Screened', count: 842, pct: 70 },
            { stage: 'Interviewed', count: 312, pct: 26 },
            { stage: 'Offer Sent', count: 87, pct: 7 },
            { stage: 'Hired', count: 52, pct: 4 },
          ].map(s => (
            <div key={s.stage}>
              <div className="flex justify-between mb-1">
                <span className="font-body-md text-body-md text-on-surface">{s.stage}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{s.count.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: s.pct + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default SystemAnalytics;
