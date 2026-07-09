import React from 'react';
import { Search, Filter, Mail, Phone } from 'lucide-react';

const employees = [
  { name: 'Sarah Hassan', role: 'Software Engineer', dept: 'Engineering', email: 'sarah@hrflow.app', phone: '+880 1700 000001', status: 'Active', joined: 'Jan 2024' },
  { name: 'Rafi Ahmed', role: 'Product Manager', dept: 'Product', email: 'rafi@hrflow.app', phone: '+880 1700 000002', status: 'Active', joined: 'Mar 2023' },
  { name: 'Nadia Islam', role: 'UX Designer', dept: 'Design', email: 'nadia@hrflow.app', phone: '+880 1700 000003', status: 'On Leave', joined: 'Jul 2022' },
  { name: 'Tanvir Khan', role: 'Data Analyst', dept: 'Analytics', email: 'tanvir@hrflow.app', phone: '+880 1700 000004', status: 'Active', joined: 'Sep 2023' },
];

const ManageEmployees = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Manage Employees</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Employee directory and records</p>
      </div>
      <button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm">+ Add Employee</button>
    </div>
    <div className="flex gap-3">
      <div className="relative flex-1 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input type="text" placeholder="Search employees..." className="pl-9 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none" />
      </div>
      <button className="flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary transition-colors"><Filter size={16} /> Filter</button>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
      {employees.map(e => (
        <div key={e.name} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 hover:shadow-md hover:border-primary transition-all">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">{e.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-label-md text-label-md text-on-surface font-semibold">{e.name}</p>
                <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold text-[10px] ${e.status === 'Active' ? 'bg-secondary-fixed text-secondary' : 'bg-tertiary-fixed text-on-tertiary-fixed'}`}>{e.status}</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-0.5">{e.role} · {e.dept}</p>
              <div className="mt-3 space-y-1">
                <p className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant text-xs"><Mail size={12} />{e.email}</p>
                <p className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant text-xs"><Phone size={12} />{e.phone}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-outline-variant flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Joined {e.joined}</span>
                <button className="border border-primary text-primary px-3 py-1 rounded-lg font-label-md text-label-md hover:bg-primary-fixed transition-colors text-xs">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default ManageEmployees;
