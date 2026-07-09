import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const initialColumns = {
  todo: [
    { id: 1, title: 'Update API documentation', priority: 'High', due: 'Jul 10' },
    { id: 2, title: 'Design review feedback', priority: 'Medium', due: 'Jul 11' },
  ],
  inprogress: [
    { id: 3, title: 'Complete UI design review', priority: 'High', due: 'Jul 9' },
    { id: 4, title: 'Implement new auth flow', priority: 'High', due: 'Jul 9' },
  ],
  done: [
    { id: 5, title: 'Team standup meeting', priority: 'Low', due: 'Jul 9' },
    { id: 6, title: 'Code review for PR #42', priority: 'Medium', due: 'Jul 8' },
  ],
};

const priorityColor: Record<string, string> = {
  High: 'bg-error-container text-on-error-container',
  Medium: 'bg-tertiary-fixed text-on-tertiary-fixed',
  Low: 'bg-surface-variant text-on-surface-variant',
};

const MyTasks = () => {
  const [cols] = useState(initialColumns);
  const colMeta = [
    { key: 'todo', label: 'To Do', color: 'border-t-outline-variant' },
    { key: 'inprogress', label: 'In Progress', color: 'border-t-secondary' },
    { key: 'done', label: 'Done', color: 'border-t-primary' },
  ];
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">My Tasks</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your assigned tasks</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Plus size={16} /> Add Task</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {colMeta.map(col => (
          <div key={col.key} className="bg-surface-container-low rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{col.label}</h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">{cols[col.key as keyof typeof cols].length}</span>
            </div>
            <div className="space-y-3">
              {cols[col.key as keyof typeof cols].map((task: any) => (
                <div key={task.id} className="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant hover:border-primary hover:shadow-sm transition-all cursor-grab">
                  <p className="font-label-md text-label-md text-on-surface font-semibold mb-2">{task.title}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded text-[10px] font-bold ${priorityColor[task.priority]}`}>{task.priority}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">Due {task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyTasks;
