import React from 'react';
import { CheckSquare, Clock, TrendingUp, Calendar } from 'lucide-react';

const EmployeeDashboard = () => {
  const now = new Date();
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Employee Dashboard</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Good morning, Employee!</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-2">
            <Clock size={16} /> Clock In
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Tasks Due Today', val: '4', icon: CheckSquare, color: 'bg-primary-fixed text-primary' },
          { label: 'Hours This Week', val: '32h', icon: Clock, color: 'bg-secondary-fixed text-secondary' },
          { label: 'Performance Score', val: '87%', icon: TrendingUp, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
          { label: 'Leave Days Left', val: '8', icon: Calendar, color: 'bg-surface-variant text-on-surface-variant' },
        ].map(m => (
          <div key={m.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${m.color}`}><m.icon size={18} /></div>
            <p className="font-headline-lg text-headline-lg text-on-surface font-bold">{m.val}</p>
            <p className="font-label-md text-label-md text-on-surface-variant mt-1">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Complete UI design review', priority: 'High', done: false },
              { task: 'Update API documentation', priority: 'Medium', done: true },
              { task: 'Team standup at 10am', priority: 'High', done: true },
              { task: 'Code review for PR #42', priority: 'Low', done: false },
            ].map(t => (
              <div key={t.task} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${t.done ? 'border-secondary bg-secondary' : 'border-outline-variant'}`}>
                  {t.done && <CheckSquare size={10} className="text-on-secondary" />}
                </div>
                <span className={`flex-1 font-body-md text-body-md ${t.done ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{t.task}</span>
                <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded text-[10px] font-bold ${t.priority === 'High' ? 'bg-error-container text-on-error-container' : t.priority === 'Medium' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-variant text-on-surface-variant'}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Attendance This Week</h3>
          <div className="space-y-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
              <div key={d} className="flex items-center gap-3">
                <span className="font-label-sm text-label-sm text-on-surface-variant w-8">{d}</span>
                <div className="flex-1 h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: i < 3 ? '100%' : i === 3 ? '87%' : '0%' }} />
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant w-16 text-right">{i < 3 ? '8h 00m' : i === 3 ? '7h 00m' : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeDashboard;
