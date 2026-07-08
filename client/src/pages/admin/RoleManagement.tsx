import React from 'react';
import { Shield, Edit } from 'lucide-react';

const roles = [
  { name: 'Admin', users: 18, perms: ['Full System Access', 'User Management', 'Role Management', 'Analytics', 'Settings'], color: 'bg-error-container text-on-error-container' },
  { name: 'HR Manager', users: 95, perms: ['Vacancy Management', 'Applicant Review', 'Interview Scheduling', 'Employee Management'], color: 'bg-primary-fixed text-primary' },
  { name: 'Employee', users: 245, perms: ['View Own Profile', 'Attendance Management', 'Task Management', 'Performance View'], color: 'bg-secondary-fixed text-secondary' },
  { name: 'Candidate', users: 890, perms: ['Browse Jobs', 'Submit Applications', 'View Own Status', 'Take Assessments'], color: 'bg-tertiary-fixed text-on-tertiary-fixed' },
];

const RoleManagement = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Role Management</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage access levels and permissions</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Shield size={16} /> Create Role</button>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {roles.map(role => (
        <div key={role.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 hover:border-primary transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full font-label-md text-label-md font-bold ${role.color}`}>{role.name}</div>
              <span className="font-body-md text-body-md text-on-surface-variant">{role.users.toLocaleString()} users</span>
            </div>
            <button className="p-2 hover:text-primary transition-colors text-on-surface-variant"><Edit size={16} /></button>
          </div>
          <div className="space-y-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">Permissions</p>
            {role.perms.map(p => (
              <div key={p} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                <span className="font-body-md text-body-md text-on-surface">{p}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default RoleManagement;
