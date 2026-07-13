import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Shield, X, Check } from 'lucide-react';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

const mapRoleToDb = (role: string): string => {
  if (role === 'HR Manager') return 'hr';
  return role.toLowerCase();
};

const mapRoleToUi = (role: string): string => {
  if (role === 'hr') return 'HR Manager';
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const roleColor: Record<string, string> = {
  Admin: 'bg-rose-50 text-rose-600 border border-rose-100',
  'HR Manager': 'bg-blue-50 text-blue-600 border border-blue-100',
  Employee: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  Candidate: 'bg-amber-50 text-amber-600 border border-amber-100',
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All Roles');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Employee');
  const [newUserStatus, setNewUserStatus] = useState('Active');
  
  // Toast notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/auth/users');
      const mapped = data.map((u: any) => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: mapRoleToUi(u.role),
        status: u.status || 'Active',
        joined: new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }));
      setUsers(mapped);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) {
      alert('Please fill out all fields.');
      return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === newUserEmail.toLowerCase())) {
      alert('A user with this email address already exists.');
      return;
    }

    try {
      const { api } = await import('../../api');
      await api.post('/auth/users', {
        name: newUserName,
        email: newUserEmail,
        password: 'User123!', // secure default password
        role: mapRoleToDb(newUserRole),
        status: newUserStatus
      });
      
      triggerToast(`User "${newUserName}" created successfully.`);
      fetchUsers();
      
      // Reset fields
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('Employee');
      setNewUserStatus('Active');
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (!window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      return;
    }
    try {
      const { api } = await import('../../api');
      await api.delete(`/auth/users/${user._id}`);
      triggerToast(`Account for "${user.name}" deleted.`);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    }
  };

  const handleToggleStatus = async (user: User) => {
    const nextStatus = user.status === 'Active' ? 'Pending' : 'Active';
    try {
      const { api } = await import('../../api');
      await api.put(`/auth/users/${user._id}`, {
        status: nextStatus
      });
      triggerToast(`Status for ${user.name} updated to ${nextStatus}.`);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to update user status');
    }
  };

  // Filtered users list
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === 'All Roles' || user.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

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
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h1>
          <p className="text-slate-500 text-xs mt-1">Audit, register, and update system profiles and access states</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-primary/10 border-0 transition-all active:scale-95 cursor-pointer"
        >
          <Plus size={16} />
          Create User Account
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Filter by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:bg-white focus:border-teal-500 focus:outline-none transition-all"
          />
        </div>
        <select 
          value={selectedRoleFilter}
          onChange={(e) => setSelectedRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs focus:bg-white focus:border-teal-500 focus:outline-none text-slate-600 font-semibold"
        >
          <option value="All Roles">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="HR Manager">HR Manager</option>
          <option value="Employee">Employee</option>
          <option value="Candidate">Candidate</option>
        </select>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-bold text-[10px] text-slate-500 uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 font-bold text-[10px] text-slate-500 uppercase tracking-wider">Email Address</th>
                <th className="px-6 py-4 font-bold text-[10px] text-slate-500 uppercase tracking-wider">Access Role</th>
                <th className="px-6 py-4 font-bold text-[10px] text-slate-500 uppercase tracking-wider">Registry Status</th>
                <th className="px-6 py-4 font-bold text-[10px] text-slate-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 font-bold text-[10px] text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.email} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white font-black text-sm shadow-sm">
                          {u.name[0]}
                        </div>
                        <span className="font-bold text-slate-800 text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-500">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] tracking-wide uppercase ${roleColor[u.role] || 'bg-slate-50 text-slate-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[9px] tracking-wide uppercase border cursor-pointer hover:scale-105 active:scale-95 transition-all ${
                          u.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-400">{u.joined}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => triggerToast(`Feature to edit ${u.name} details will be supported in v2.5.`)}
                          className="p-2 hover:bg-slate-100 hover:text-secondary rounded-lg transition-all text-slate-400 border border-slate-100 cursor-pointer" 
                          title="Edit Profile"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => triggerToast(`Updating permission levels for ${u.name} from Role Manager.`)}
                          className="p-2 hover:bg-slate-100 hover:text-primary rounded-lg transition-all text-slate-400 border border-slate-100 cursor-pointer" 
                          title="Edit Permissions"
                        >
                          <Shield size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(u)}
                          className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all text-slate-400 border border-slate-100 cursor-pointer" 
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-semibold">
                    No registry profiles matching filters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Modal Popup for creating user */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
            
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Create Account profile</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors border-0 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">User Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abir Chowdhury"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:bg-white focus:outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Employee">Employee</option>
                    <option value="Candidate">Candidate</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Status</label>
                  <select
                    value={newUserStatus}
                    onChange={(e) => setNewUserStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:bg-white focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
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
                  Create Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
