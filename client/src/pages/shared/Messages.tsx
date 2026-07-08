import React, { useState } from 'react';
import { Send, Search } from 'lucide-react';

const conversations = [
  { name: 'HR — TechCorp BD', last: 'We would like to schedule a call...', time: '10:32 AM', unread: 2, avatar: 'T' },
  { name: 'DataViz Recruiter', last: 'Your CV has been shortlisted!', time: 'Yesterday', unread: 0, avatar: 'D' },
  { name: 'HRFlow Support', last: 'Your issue has been resolved.', time: 'Jul 7', unread: 0, avatar: 'H' },
];

const msgs = [
  { from: 'them', text: 'Hello! We reviewed your application and loved your portfolio.', time: '10:28 AM' },
  { from: 'me', text: 'Thank you! I am very excited about this opportunity.', time: '10:30 AM' },
  { from: 'them', text: 'We would like to schedule a technical interview. Are you free this week?', time: '10:32 AM' },
];

const Messages = () => {
  const [msg, setMsg] = useState('');
  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-72 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0">
        <div className="p-4 border-b border-outline-variant">
          <h2 className="font-headline-sm text-headline-sm text-primary font-semibold mb-3">Messages</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input type="text" placeholder="Search..." className="pl-8 w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-outline-variant">
          {conversations.map((c, i) => (
            <div key={c.name} className={`p-4 flex gap-3 cursor-pointer transition-colors ${i === 0 ? 'bg-primary-fixed/20' : 'hover:bg-surface-container-low'}`}>
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shrink-0">{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{c.name}</p>
                  <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 ml-2">{c.time}</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs truncate mt-0.5">{c.last}</p>
                {c.unread > 0 && <span className="inline-flex items-center justify-center w-5 h-5 bg-secondary text-on-secondary rounded-full font-label-sm text-label-sm mt-1">{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">T</div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-semibold">HR — TechCorp BD</p>
            <p className="font-body-md text-body-md text-secondary text-xs">Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface-container-low">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${m.from === 'me' ? 'bg-primary text-on-primary rounded-br-sm' : 'bg-surface-container-lowest text-on-surface border border-outline-variant rounded-bl-sm'}`}>
                <p className="font-body-md text-body-md">{m.text}</p>
                <p className={`font-label-sm text-label-sm mt-1 ${m.from === 'me' ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-outline-variant bg-surface-container-lowest flex gap-3">
          <input value={msg} onChange={e => setMsg(e.target.value)} type="text" placeholder="Type a message..." className="flex-1 rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          <button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Messages;
