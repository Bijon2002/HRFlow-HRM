import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, ArrowLeft, CheckCircle2, Lock, ShieldAlert } from 'lucide-react';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  
  // Get active role
  const getRole = () => {
    const path = window.location.pathname;
    if (path.startsWith('/hr')) return 'hr';
    if (path.startsWith('/candidate')) return 'candidate';
    if (path.startsWith('/employee')) return 'employee';
    if (path.startsWith('/admin')) return 'admin';
    return localStorage.getItem('hrflow_current_role') || 'employee';
  };

  const role = getRole();

  // Profile fields state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('U');
  
  // Success indicator
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification toggles
  const [notifySettings, setNotifySettings] = useState<Record<string, boolean>>({
    'Email notifications': true,
    'Interview reminders': true,
    'Application status updates': true,
    'New job matches': false
  });

  useEffect(() => {
    // Load profile from localStorage based on active role
    const key = `hrflow_profile_${role}`;
    const saved = localStorage.getItem(key);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFirstName(parsed.firstName || '');
        setLastName(parsed.lastName || '');
        setEmail(parsed.email || '');
        setPhone(parsed.phone || '');
        setBio(parsed.bio || '');
        setAvatar(parsed.avatar || (parsed.firstName ? parsed.firstName[0] : 'U'));
      } catch (e) {}
    } else {
      // Set defaults depending on role
      let defaultProfile = { firstName: 'Sarah', lastName: 'Hassan', email: 'sarah.hassan@hrflow.app', phone: '+1 (555) 234-5678', bio: 'Senior Software Engineer with 5+ years of experience.', avatar: 'SH' };
      if (role === 'hr') {
        defaultProfile = { firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah.jenkins@hrflow.app', phone: '+1 (555) 987-6543', bio: 'Lead Talent Acquisition Manager & Recruiter.', avatar: 'SJ' };
      } else if (role === 'candidate') {
        defaultProfile = { firstName: 'David', lastName: 'Chen', email: 'david.chen@gmail.com', phone: '+1 (555) 456-7890', bio: 'Experienced Frontend Engineer seeking new opportunities.', avatar: 'DC' };
      } else if (role === 'admin') {
        defaultProfile = { firstName: 'Alex', lastName: 'Admin', email: 'admin@hrflow.app', phone: '+1 (555) 111-2222', bio: 'System Administrator and Security Operations.', avatar: 'AA' };
      }

      setFirstName(defaultProfile.firstName);
      setLastName(defaultProfile.lastName);
      setEmail(defaultProfile.email);
      setPhone(defaultProfile.phone);
      setBio(defaultProfile.bio);
      setAvatar(defaultProfile.avatar);
      
      localStorage.setItem(key, JSON.stringify(defaultProfile));
    }

    // Load toggles
    const savedToggles = localStorage.getItem(`hrflow_notifications_${role}`);
    if (savedToggles) {
      try {
        setNotifySettings(JSON.parse(savedToggles));
      } catch (e) {}
    }
  }, [role]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const initials = (firstName.trim().slice(0, 1) + lastName.trim().slice(0, 1)).toUpperCase();
    const updated = {
      firstName,
      lastName,
      email,
      phone,
      bio,
      avatar: initials || 'U'
    };

    localStorage.setItem(`hrflow_profile_${role}`, JSON.stringify(updated));
    setAvatar(initials || 'U');
    
    // Display Toast
    setToastMessage('Profile settings saved successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // Mock save
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setToastMessage('Password updated successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleNotificationSetting = (name: string) => {
    const nextSettings = {
      ...notifySettings,
      [name]: !notifySettings[name]
    };
    setNotifySettings(nextSettings);
    localStorage.setItem(`hrflow_notifications_${role}`, JSON.stringify(nextSettings));
    
    setToastMessage('Notification settings updated!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const tabs = [
    { key: 'profile', label: 'Profile Information', icon: 'badge' },
    { key: 'security', label: 'Security & Password', icon: 'security' },
    { key: 'notifications', label: 'Notification Settings', icon: 'notifications' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={16} className="text-secondary" />
          <span className="text-xs font-bold font-body-md">{toastMessage}</span>
        </div>
      )}

      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-all border border-slate-200 hover:bg-slate-100 px-4 py-2.5 rounded-xl cursor-pointer bg-white shadow-xs w-fit"
      >
        <ArrowLeft size={14} />
        Back to Dashboard
      </button>

      {/* Heading */}
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Profile Settings</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage workspace account preferences, email, and password</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-outline-variant">
        {tabs.map(t => (
          <button 
            key={t.key} 
            onClick={() => setTab(t.key)} 
            className={`px-5 py-3 font-label-md text-sm border-b-2 transition-all flex items-center gap-2 ${
              tab === t.key 
                ? 'border-primary text-primary font-bold bg-primary-fixed/5' 
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: PROFILE DETAILS */}
      {tab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-outline-variant/60 pb-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-indigo-900 flex items-center justify-center text-white text-3xl font-black shadow-md border-2 border-surface-container-lowest">
                {avatar}
              </div>
              <button 
                type="button" 
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary hover:bg-primary text-white rounded-full flex items-center justify-center transition-colors shadow"
                title="Change Avatar"
              >
                <Camera size={14} />
              </button>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <p className="font-headline-sm text-lg text-primary font-bold capitalize">{firstName} {lastName}</p>
              <p className="font-body-md text-xs text-on-surface-variant font-mono">{email}</p>
              <span className="inline-block bg-secondary-fixed text-secondary px-2.5 py-0.5 rounded font-label-sm text-[10px] font-bold uppercase tracking-wider">
                {role} account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-semibold text-on-surface" 
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-semibold text-on-surface" 
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-mono" 
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Phone Number</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-semibold" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Profile Summary / Bio</label>
            <textarea 
              rows={4} 
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell us about yourself and your developer experience..."
              className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none font-body-md text-on-surface" 
            />
          </div>

          <div className="pt-4 border-t border-outline-variant/60 flex justify-end">
            <button 
              type="submit" 
              className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-label-md text-sm font-bold transition-all shadow-md active:scale-95 w-full sm:w-auto justify-center"
            >
              <Save size={16} /> Save Workspace Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: SECURITY & PASSWORD */}
      {tab === 'security' && (
        <form onSubmit={handleSavePassword} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-4">
            <Lock className="text-secondary" size={18} />
            <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">Update Account Password</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Current Password</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-mono" 
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-mono" 
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm focus:border-primary focus:outline-none font-mono" 
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant/60 flex justify-end">
            <button 
              type="submit" 
              className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-label-md text-sm font-bold transition-all shadow-md active:scale-95 w-full sm:w-auto justify-center"
            >
              Update Password Key
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {tab === 'notifications' && (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-outline-variant/60 pb-4">
            <span className="material-symbols-outlined text-secondary">notifications</span>
            <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">Subscription Preferences</h3>
          </div>

          <div className="divide-y divide-surface-variant">
            {Object.keys(notifySettings).map(name => (
              <label 
                key={name} 
                className="flex items-center justify-between cursor-pointer py-4 hover:bg-surface-container-low/10 transition-all rounded-lg px-2"
              >
                <div className="space-y-0.5">
                  <span className="font-body-md text-sm text-on-surface font-semibold block">{name}</span>
                  <span className="text-[10px] text-on-surface-variant block">Receive system triggers regarding {name.toLowerCase()}.</span>
                </div>
                <div 
                  onClick={() => toggleNotificationSetting(name)}
                  className={`w-12 h-6.5 rounded-full relative cursor-pointer transition-all border ${
                    notifySettings[name] 
                      ? 'bg-secondary border-secondary' 
                      : 'bg-surface-variant border-outline-variant'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all ${
                    notifySettings[name] ? 'right-0.5' : 'left-0.5'
                  }`} />
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
