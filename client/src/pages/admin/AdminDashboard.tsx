import React from 'react';
import { Users, Building2, Activity, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Admin Dashboard</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">System overview and management</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Users', val: '1,248', icon: Users, color: 'bg-primary-fixed text-primary' },
        { label: 'Active Companies', val: '34', icon: Building2, color: 'bg-secondary-fixed text-secondary' },
        { label: 'System Uptime', val: '99.9%', icon: Activity, color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
        { label: 'Pending Issues', val: '3', icon: AlertTriangle, color: 'bg-error-container text-error' },
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
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New user registered', user: 'Aisha@email.com', time: '2 min ago', type: 'new' },
            { action: 'Role updated', user: 'rafi@company.com', time: '15 min ago', type: 'edit' },
            { action: 'Account suspended', user: 'spam@example.com', time: '1 hour ago', type: 'alert' },
          ].map(a => (
            <div key={a.user} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
              <div className={`w-2 h-2 rounded-full ${a.type === 'new' ? 'bg-secondary' : a.type === 'alert' ? 'bg-error' : 'bg-on-surface-variant'}`} />
              <div className="flex-1">
                <p className="font-label-md text-label-md text-on-surface">{a.action}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs">{a.user}</p>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Users by Role</h3>
        <div className="space-y-3">
          {[
            { role: 'Candidates', count: 890, pct: 71 },
            { role: 'Employees', count: 245, pct: 20 },
            { role: 'HR Managers', count: 95, pct: 8 },
            { role: 'Admins', count: 18, pct: 1 },
          ].map(r => (
            <div key={r.role}>
              <div className="flex justify-between mb-1">
                <span className="font-body-md text-body-md text-on-surface">{r.role}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{r.count.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: r.pct + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default AdminDashboard;
