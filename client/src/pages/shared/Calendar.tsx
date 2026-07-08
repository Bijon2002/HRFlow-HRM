import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  { day: 9, title: 'Interview - TechCorp', time: '2:00 PM', color: 'bg-secondary-fixed border-secondary text-secondary' },
  { day: 12, title: 'Interview - DataViz', time: '10:30 AM', color: 'bg-primary-fixed border-primary text-primary' },
  { day: 15, title: 'Performance Review', time: '3:00 PM', color: 'bg-tertiary-fixed border-on-tertiary-fixed text-on-tertiary-fixed' },
];

const Calendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="p-6 space-y-6">
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Calendar</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">July 2026</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant"><ChevronLeft size={18} /></button>
              <button className="p-2 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-center font-label-sm text-label-sm text-on-surface-variant py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[...Array(1)].map((_, i) => <div key={'e' + i} />)}
            {days.map(d => {
              const hasEvent = events.find(e => e.day === d);
              return (
                <div key={d} className={`aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all text-sm ${d === 9 ? 'bg-primary text-on-primary font-bold' : hasEvent ? 'bg-primary-fixed/50 text-primary' : 'hover:bg-surface-container-low text-on-surface'}`}>
                  {d}
                  {hasEvent && <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${d === 9 ? 'bg-on-primary' : 'bg-secondary'}`} />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-5">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {events.map(e => (
              <div key={e.title} className={`p-3 rounded-lg border-l-4 ${e.color}`}>
                <p className="font-label-md text-label-md font-semibold">{e.title}</p>
                <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-0.5">Jul {e.day} · {e.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
