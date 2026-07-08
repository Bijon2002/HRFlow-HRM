import React from 'react';
import { Search, Plus, Edit, Trash2, Shield } from 'lucide-react';

const users = [
  { name: 'Aisha Rahman', email: 'aisha@hrflow.app', role: 'HR Manager', status: 'Active', joined: 'Jan 2024' },
  { name: 'Tanvir Khan', email: 'tanvir@company.com', role: 'Employee', status: 'Active', joined: 'Mar 2023' },
  { name: 'Lin Wei', email: 'lin@candidate.com', role: 'Candidate', status: 'Pending', joined: 'Jul 2026' },
  { name: 'Admin User', email: 'admin@hrflow.app', role: 'Admin', status: 'Active', joined: 'Nov 2022' },
];

const roleColor: Record<string, string> = {
  Admin: 'bg-error-container text-on-error-container',
  'HR Manager': 'bg-primary-fixed text-primary',
  Employee: 'bg-secondary-fixed text-secondary',
  Candidate: 'bg-tertiary-fixed text-on-tertiary-fixed',
};

const UserManagement = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">User Management</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage all system accounts</p>
      </div>
      <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Plus size={16} /> Add User</button>
    </div>
    <div className="flex gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input type="text" placeholder="Search users..." className="pl-9 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none" />
      </div>
      <select className="rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none text-on-surface-variant">
        <option>All Roles</option><option>Admin</option><option>HR Manager</option><option>Employee</option><option>Candidate</option>
      </select>
    </div>
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-surface-container-low border-b border-outline-variant">
          <tr>{['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
            <th key={h} className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {users.map(u => (
            <tr key={u.email} className="hover:bg-surface-container-low/50 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">{u.name[0]}</div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{u.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{u.email}</td>
              <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold text-[10px] ${roleColor[u.role]}`}>{u.role}</span></td>
              <td className="px-4 py-4"><span className={`px-2 py-1 rounded-full font-label-sm text-label-sm font-bold text-[10px] ${u.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-surface-variant text-on-surface-variant'}`}>{u.status}</span></td>
              <td className="px-4 py-4 font-body-md text-body-md text-on-surface-variant">{u.joined}</td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button className="p-1.5 hover:text-secondary transition-colors text-on-surface-variant" title="Edit"><Edit size={16} /></button>
                  <button className="p-1.5 hover:text-primary transition-colors text-on-surface-variant" title="Manage Roles"><Shield size={16} /></button>
                  <button className="p-1.5 hover:text-error transition-colors text-on-surface-variant" title="Delete"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default UserManagement;
