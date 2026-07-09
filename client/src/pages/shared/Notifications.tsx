import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const notifs = [
  { icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary-fixed', title: 'Interview Confirmed', msg: 'Your interview with TechCorp BD is confirmed for Jul 12.', time: '2 min ago', unread: true },
  { icon: Info, color: 'text-primary', bg: 'bg-primary-fixed', title: 'New Job Match', msg: 'A new job matching your profile: Senior React Developer.', time: '1 hour ago', unread: true },
  { icon: AlertTriangle, color: 'text-error', bg: 'bg-error-container', title: 'Assessment Due', msg: 'Your JavaScript assessment is due in 2 days.', time: '3 hours ago', unread: false },
  { icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary-fixed', title: 'Application Viewed', msg: 'DataViz Ltd has viewed your application.', time: 'Yesterday', unread: false },
];

const Notifications = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Notifications</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">2 unread notifications</p>
      </div>
      <button className="font-label-md text-label-md text-secondary hover:underline">Mark all as read</button>
    </div>
    <div className="space-y-3">
      {notifs.map(n => (
        <div key={n.title} className={`bg-surface-container-lowest rounded-xl border p-4 flex gap-4 hover:shadow-sm transition-all ${n.unread ? 'border-primary/30 bg-primary-fixed/10' : 'border-outline-variant'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg}`}><n.icon size={18} className={n.color} /></div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <p className="font-label-md text-label-md text-on-surface font-semibold">{n.title}{n.unread && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-secondary" />}</p>
              <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 ml-4">{n.time}</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">{n.msg}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Notifications;
