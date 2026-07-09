import React, { useState } from 'react';
import { ShieldAlert, Key, ClipboardList, ShieldCheck } from 'lucide-react';

const initialLogs = [
  { id: '1', user: 'admin@gmail.com', action: 'Disabled candidate registration', ip: '192.168.1.102', time: 'Just now', type: 'warn' },
  { id: '2', user: 'admin@gmail.com', action: 'Cleared system API cache', ip: '192.168.1.102', time: '10 min ago', type: 'info' },
  { id: '3', user: 'hr@hrflow.app', action: 'Created vacancy "Senior React Architect"', ip: '185.22.140.9', time: '42 min ago', type: 'create' },
  { id: '4', user: 'admin@gmail.com', action: 'Modified role permissions for Employee', ip: '192.168.1.102', time: '2 hours ago', type: 'info' },
  { id: '5', user: 'hacker@compromised.net', action: 'Failed login attempt (x3)', ip: '45.188.9.22', time: '5 hours ago', type: 'error' },
];

const SecurityPermissions = () => {
  const [settings, setSettings] = useState({
    sessionTimeout: '60',
    ipWhitelist: '192.168.1.0/24, 10.0.0.0/8',
    forceMfa: false,
    minPasswordLength: 8,
    requireSpecialChars: true
  });

  const [auditLogs, setAuditLogs] = useState(initialLogs);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Security policy directives compiled and applied.');
    
    // Append a log entry to audit log
    const newLog = {
      id: String(Date.now()),
      user: 'admin@gmail.com',
      action: 'Updated global security policy directives',
      ip: '192.168.1.102',
      time: 'Just now',
      type: 'info'
    };
    
    setAuditLogs([newLog, ...auditLogs]);
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
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Security & Permissions</h1>
        <p className="text-slate-500 text-xs mt-1">Configure global platform firewall limits, password requirements, and audit active admin actions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Policy Forms */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500 border border-teal-100">
                <Key size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Access Control & Credentials Policy</h3>
            </div>

            <form onSubmit={handleSaveSecurity} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Session Timeout */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Session Idle Timeout (Minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                  />
                </div>

                {/* Password Min Length */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Min Password Length ({settings.minPasswordLength} chars)</label>
                  <input
                    type="range"
                    min={6}
                    max={20}
                    value={settings.minPasswordLength}
                    onChange={(e) => setSettings({ ...settings, minPasswordLength: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer focus:outline-none accent-teal-500 mt-3"
                  />
                </div>
              </div>

              {/* IP Whitelist */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Permitted Admin IP Address Blocks (CIDR format)</label>
                <input
                  type="text"
                  value={settings.ipWhitelist}
                  onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                  placeholder="e.g. 192.168.1.0/24"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-700">Enforce Multi-Factor Authentication (MFA)</p>
                    <p className="text-[10px] text-slate-400">Force all staff/admin accounts to pass MFA security challenges on sign-in</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.forceMfa} 
                      onChange={() => setSettings({ ...settings, forceMfa: !settings.forceMfa })} 
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-700">Strict Password Characters Rule</p>
                    <p className="text-[10px] text-slate-400">Verify passwords contain special characters and numbers during registry</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.requireSpecialChars} 
                      onChange={() => setSettings({ ...settings, requireSpecialChars: !settings.requireSpecialChars })} 
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-primary text-white hover:opacity-95 px-5 py-3 rounded-xl font-semibold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-primary/10 border-0 cursor-pointer"
                >
                  <ShieldCheck size={15} />
                  Save Security Policies
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Column */}
        <div>
          <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-400" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Security Warning</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Applying IP restrictions blocks all administrative traffic originating outside the whitelist patterns. Verify your current public gateway IP ranges before saving.
            </p>
            <div className="bg-slate-800/80 border border-slate-700/50 p-3 rounded-xl space-y-1.5 text-[10px] text-slate-400">
              <div className="flex justify-between">
                <span>Active Admin Session</span>
                <span className="text-teal-400 font-bold">Secure</span>
              </div>
              <div className="flex justify-between">
                <span>Current Gateway IP</span>
                <span className="text-slate-200 font-bold">192.168.1.102</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
              <ClipboardList size={16} />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Administrative Security Audit Log</h3>
          </div>
          <button 
            onClick={() => {
              setAuditLogs(initialLogs);
              triggerToast('Audit log reset to mock data.');
            }}
            className="text-[10px] font-bold text-slate-500 hover:text-slate-800 transition-colors border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            Reset Log
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">User Account</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Action Description</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gateway IP</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Occurred</th>
                <th className="pb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 font-bold text-slate-800">{log.user}</td>
                  <td className="py-3.5 text-slate-600 font-medium">{log.action}</td>
                  <td className="py-3.5 text-slate-400 font-mono font-medium">{log.ip}</td>
                  <td className="py-3.5 text-slate-500 font-medium">{log.time}</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${
                      log.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      log.type === 'warn' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      log.type === 'create' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {log.type === 'error' ? 'Critical' : log.type === 'warn' ? 'Warning' : 'Info'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityPermissions;
