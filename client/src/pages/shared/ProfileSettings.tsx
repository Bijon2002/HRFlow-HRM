import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, ArrowLeft } from 'lucide-react';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'security', label: 'Security' },
    { key: 'notifications', label: 'Notifications' },
  ];

  // Password update states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwdError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPwdError('New password must be at least 8 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPwdError('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    setIsUpdatingPwd(true);
    try {
      const { api } = await import('../../api');
      await api.put('/auth/password', { currentPassword, newPassword });
      setPwdSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPwdError(err.message || 'Failed to update password');
    } finally {
      setIsUpdatingPwd(false);
    }
  };
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-all border border-slate-200 hover:bg-slate-100 px-3.5 py-2 rounded-xl cursor-pointer"
      >
        <ArrowLeft size={14} />
        Back to Dashboard
      </button>
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Profile Settings</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your account information</p>
      </div>
      <div className="flex gap-1 border-b border-outline-variant">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2.5 font-label-md text-label-md border-b-2 transition-colors ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'profile' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-on-primary text-3xl font-bold">U</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-secondary text-on-secondary rounded-full flex items-center justify-center hover:bg-secondary-container transition-colors"><Camera size={14} /></button>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface font-semibold">User Name</p>
              <p className="font-body-md text-body-md text-on-surface-variant">user@hrflow.app</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">First Name</label><input type="text" defaultValue="User" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Last Name</label><input type="text" defaultValue="Name" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          </div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email</label><input type="email" defaultValue="user@hrflow.app" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Phone</label><input type="tel" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Bio</label><textarea rows={3} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none" /></div>
          <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm"><Save size={16} /> Save Changes</button>
        </div>
      )}
      {tab === 'security' && (
        <form onSubmit={handleUpdatePassword} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Change Password</h3>
          
          {pwdError && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold rounded-lg">
              {pwdError}
            </div>
          )}

          {pwdSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold rounded-lg">
              {pwdSuccess}
            </div>
          )}

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Current Password</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" 
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">New Password</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" 
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Confirm New Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isUpdatingPwd}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isUpdatingPwd ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
      {tab === 'notifications' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Notification Preferences</h3>
          {['Email notifications', 'Interview reminders', 'Application status updates', 'New job matches'].map(n => (
            <label key={n} className="flex items-center justify-between cursor-pointer py-2 border-b border-outline-variant last:border-0">
              <span className="font-body-md text-body-md text-on-surface">{n}</span>
              <div className="w-11 h-6 bg-secondary rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-on-secondary rounded-full absolute top-0.5 right-0.5 shadow transition-all" />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProfileSettings;
