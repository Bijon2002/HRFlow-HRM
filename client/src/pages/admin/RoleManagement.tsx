import React, { useState } from 'react';
import { Shield, ShieldAlert, Check, X, Plus } from 'lucide-react';

interface SystemRole {
  name: string;
  description: string;
  users: number;
  permissions: string[];
  color: string;
}

const allPermissions = [
  'Full System Access',
  'User Management',
  'Role Management',
  'System Settings & Config',
  'Vacancy Management',
  'Applicant Review & Screening',
  'Interview Scheduling',
  'Employee Management',
  'Attendance Manager Access',
  'Job Application Submission',
];

const initialRoles: SystemRole[] = [
  { 
    name: 'Admin', 
    description: 'System owners with full, unconstrained access to data tables and firewall configs',
    users: 18, 
    permissions: ['Full System Access', 'User Management', 'Role Management', 'System Settings & Config', 'Vacancy Management', 'Applicant Review & Screening', 'Interview Scheduling', 'Employee Management', 'Attendance Manager Access', 'Job Application Submission'],
    color: 'bg-rose-50 text-rose-600 border-rose-100 border' 
  },
  { 
    name: 'HR Manager', 
    description: 'Talent managers managing cv screening, job vacancy setups, and staffing registries',
    users: 95, 
    permissions: ['Vacancy Management', 'Applicant Review & Screening', 'Interview Scheduling', 'Employee Management', 'Attendance Manager Access'],
    color: 'bg-blue-50 text-blue-600 border-blue-100 border' 
  },
  { 
    name: 'Employee', 
    description: 'Internal organization employees tracking timesheets, profiles, tasks, and KPIs',
    users: 245, 
    permissions: ['Attendance Manager Access'],
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100 border' 
  },
  { 
    name: 'Candidate', 
    description: 'External job applicants looking at listings and sending CV submissions',
    users: 890, 
    permissions: ['Job Application Submission'],
    color: 'bg-amber-50 text-amber-600 border-amber-100 border' 
  },
];

const RoleManagement = () => {
  const [roles, setRoles] = useState<SystemRole[]>(initialRoles);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  
  // Toast notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePermissionToggle = (roleIndex: number, perm: string) => {
    const updatedRoles = [...roles];
    const role = updatedRoles[roleIndex];
    
    if (role.permissions.includes(perm)) {
      role.permissions = role.permissions.filter(p => p !== perm);
      triggerToast(`Removed permission "${perm}" from ${role.name}.`);
    } else {
      role.permissions = [...role.permissions, perm];
      triggerToast(`Added permission "${perm}" to ${role.name}.`);
    }
    
    setRoles(updatedRoles);
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName) {
      alert('Role name is required.');
      return;
    }

    if (roles.some(r => r.name.toLowerCase() === newRoleName.toLowerCase())) {
      alert('A role with this name already exists.');
      return;
    }

    const newRole: SystemRole = {
      name: newRoleName,
      description: newRoleDesc || 'Custom-defined organizational access profile',
      users: 0,
      permissions: [],
      color: 'bg-purple-50 text-purple-600 border-purple-100 border'
    };

    setRoles([...roles, newRole]);
    setIsModalOpen(false);
    setSelectedRoleIndex(roles.length); // Select the newly created role
    triggerToast(`Custom role "${newRoleName}" registered.`);

    setNewRoleName('');
    setNewRoleDesc('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-slate-900 border border-slate-800 text-teal-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Role Management</h1>
          <p className="text-slate-500 text-xs mt-1">Configure role permissions matrices and review active user counts per role</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-primary/10 border-0 transition-all active:scale-95 cursor-pointer"
        >
          <Shield size={15} />
          Register Custom Role
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Roles List Panel */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Organizational Roles</p>
          {roles.map((role, idx) => (
            <div 
              key={role.name}
              onClick={() => setSelectedRoleIndex(idx)}
              className={`p-5 rounded-3xl border text-left cursor-pointer transition-all duration-150 ${
                selectedRoleIndex === idx 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/10 scale-[1.02]' 
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] tracking-wide uppercase ${
                  selectedRoleIndex === idx 
                    ? 'bg-white/20 text-white border border-white/20' 
                    : role.color
                }`}>
                  {role.name}
                </span>
                <span className={`text-[10px] font-bold ${
                  selectedRoleIndex === idx ? 'text-teal-300' : 'text-slate-400'
                }`}>
                  {role.users.toLocaleString()} users
                </span>
              </div>
              <p className={`text-[11px] font-medium leading-relaxed ${
                selectedRoleIndex === idx ? 'text-slate-200' : 'text-slate-500'
              }`}>
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Role Permissions Matrix */}
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>

            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] tracking-wide uppercase border ${roles[selectedRoleIndex].color}`}>
                  {roles[selectedRoleIndex].name}
                </span>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mt-2.5">Permissions Matrix Configuration</h3>
                <p className="text-slate-400 text-[10px] mt-0.5 font-medium">Toggle checkbox rules below to immediately updates role access parameters</p>
              </div>
              <ShieldAlert className="text-slate-300 shrink-0" size={24} />
            </div>

            <div className="space-y-2.5">
              {allPermissions.map((perm) => {
                const isChecked = roles[selectedRoleIndex].permissions.includes(perm);
                return (
                  <div 
                    key={perm}
                    onClick={() => handlePermissionToggle(selectedRoleIndex, perm)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 select-none ${
                      isChecked 
                        ? 'bg-slate-50 border-teal-200 text-slate-800' 
                        : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        isChecked 
                          ? 'bg-teal-500 border-teal-500 text-white' 
                          : 'border-slate-300 text-transparent'
                      }`}>
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="text-xs font-bold">{perm}</span>
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider uppercase ${
                      isChecked ? 'text-teal-600' : 'text-slate-300'
                    }`}>
                      {isChecked ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal dialog for custom roles */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>

            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Register Custom System Role</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors border-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role Title Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finance Auditor"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role Scope Description</label>
                <textarea
                  required
                  placeholder="Summarize access rules for this role..."
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl font-semibold text-xs text-slate-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95 shadow-md shadow-primary/10 border-0 cursor-pointer"
                >
                  Create Custom Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
