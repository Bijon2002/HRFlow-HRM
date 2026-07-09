import React, { useState } from 'react';
import { Save, RefreshCw, Mail, Sliders, Globe, Bell } from 'lucide-react';

const SystemConfiguration = () => {
  const [general, setGeneral] = useState({
    orgName: 'HRFlow Enterprise',
    contactEmail: 'admin@hrflow.app',
    welcomeMsg: 'Empowering High-Performance Teams.',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60'
  });

  const [smtp, setSmtp] = useState({
    host: 'smtp.hrflow.app',
    port: '587',
    sender: 'noreply@hrflow.app',
    useTls: true
  });

  const [flags, setFlags] = useState({
    disableRegistration: false,
    enableAIScreening: true,
    autoScheduleInterviews: false,
    maintenanceMode: false
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerToast('General settings updated successfully.');
    }, 800);
  };

  const handleSaveSMTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      triggerToast('SMTP server configuration saved.');
    }, 800);
  };

  const handleToggleFlag = (key: keyof typeof flags) => {
    const newVal = !flags[key];
    setFlags({ ...flags, [key]: newVal });
    triggerToast(`${key.replace(/([A-Z])/g, ' $1')} toggled to ${newVal ? 'ENABLED' : 'DISABLED'}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-slate-900 border border-slate-800 text-teal-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Configuration</h1>
          <p className="text-slate-500 text-xs mt-1">Configure global application brand variables, system routing flags, and mail services</p>
        </div>
        <div className="flex gap-2">
          <button 
            type="button" 
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 transition-all active:scale-95 cursor-pointer"
            onClick={() => triggerToast('System cache refreshed.')}
          >
            <RefreshCw size={14} />
            Flush cache
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Columns - Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* General Branding Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
            
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500 border border-teal-100">
                <Globe size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Branding & General Profile</h3>
            </div>

            <form onSubmit={handleSaveGeneral} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Platform Title Name</label>
                  <input
                    type="text"
                    value={general.orgName}
                    onChange={(e) => setGeneral({ ...general, orgName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Platform Support Email</label>
                  <input
                    type="email"
                    value={general.contactEmail}
                    onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Default Banner Welcome Message</label>
                <textarea
                  value={general.welcomeMsg}
                  onChange={(e) => setGeneral({ ...general, welcomeMsg: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <img src={general.logoUrl} alt="Logo" className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-100" />
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Brand Logo URL</label>
                  <input
                    type="text"
                    value={general.logoUrl}
                    onChange={(e) => setGeneral({ ...general, logoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary text-white hover:opacity-95 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-primary/10 border-0 cursor-pointer"
                >
                  <Save size={14} />
                  Save Brand Changes
                </button>
              </div>
            </form>
          </div>

          {/* SMTP Configurations */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                <Mail size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">SMTP Server Outgoing Mail</h3>
            </div>

            <form onSubmit={handleSaveSMTP} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SMTP Server Host</label>
                  <input
                    type="text"
                    value={smtp.host}
                    onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SMTP Port</label>
                  <input
                    type="text"
                    value={smtp.port}
                    onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Default Sender Signature Address</label>
                <input
                  type="email"
                  value={smtp.sender}
                  onChange={(e) => setSmtp({ ...smtp, sender: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-700">Force SSL/TLS Session Protocol</p>
                  <p className="text-[10px] text-slate-400">Encrypt outbound emails automatically over secure transport tunnels</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={smtp.useTls} 
                    onChange={() => setSmtp({ ...smtp, useTls: !smtp.useTls })} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-primary text-white hover:opacity-95 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-primary/10 border-0 cursor-pointer"
                >
                  <Save size={14} />
                  Save SMTP Settings
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Feature Toggles */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500 border border-teal-100">
                <Sliders size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">System Feature Flags</h3>
            </div>

            <div className="space-y-5">
              {/* Flag 1 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1">
                  <h4 className="text-xs font-bold text-slate-800">Disable Candidate Signups</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Turn off open candidate accounts registration portals</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={flags.disableRegistration} 
                    onChange={() => handleToggleFlag('disableRegistration')} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              {/* Flag 2 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1">
                  <h4 className="text-xs font-bold text-slate-800">Enable AI CV Screening</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Let AI parse candidate resumes and scoring match factors automatically</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={flags.enableAIScreening} 
                    onChange={() => handleToggleFlag('enableAIScreening')} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              {/* Flag 3 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5 flex-1">
                  <h4 className="text-xs font-bold text-slate-800">Auto-Schedule Interviews</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Book interviewer calendars as soon as screening criteria checks pass</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={flags.autoScheduleInterviews} 
                    onChange={() => handleToggleFlag('autoScheduleInterviews')} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>

              <hr className="border-slate-100 my-2" />

              {/* Flag 4 */}
              <div className="flex items-start justify-between gap-4 bg-rose-50/50 border border-rose-100/50 p-3 rounded-2xl">
                <div className="space-y-0.5 flex-1">
                  <h4 className="text-xs font-bold text-rose-800">Global Maintenance Mode</h4>
                  <p className="text-[10px] text-rose-600/80 leading-relaxed">Puts platform into read-only. Offline message shown to non-admin accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={flags.maintenanceMode} 
                    onChange={() => handleToggleFlag('maintenanceMode')} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-slate-900 rounded-3xl p-5 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-teal-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Admin Tip</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Toggling <strong>Maintenance Mode</strong> prevents users from logging in or modifying active data models. Admins retain full credentials validation bypass.
            </p>
            <div className="bg-slate-800 border border-slate-700/50 p-3 rounded-xl flex items-center justify-between text-[10px] font-bold text-slate-400">
              <span>Environment</span>
              <span className="bg-teal-950 text-teal-400 border border-teal-800 px-2 py-0.5 rounded-full uppercase tracking-wider text-[8px]">Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfiguration;
