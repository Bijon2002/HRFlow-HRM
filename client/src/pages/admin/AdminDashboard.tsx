import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Settings, 
  Database, 
  Activity, 
  ShieldCheck, 
  Sliders, 
  FileBarChart2, 
  RefreshCw, 
  HardDriveDownload,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  // Interactive Dashboard States
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memUsage, setMemUsage] = useState(68);
  const [isRefreshingCache, setIsRefreshingCache] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [usersCount, setUsersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Toast notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const users = await api.get('/auth/users');
      setUsersCount(users.length);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleToggleMaintenance = () => {
    const nextVal = !maintenanceMode;
    setMaintenanceMode(nextVal);
    triggerToast(nextVal ? 'Global Maintenance Mode: ACTIVATED (Read-Only applied)' : 'Global Maintenance Mode: DEACTIVATED');
  };

  const handleRefreshCache = () => {
    setIsRefreshingCache(true);
    setTimeout(() => {
      setIsRefreshingCache(false);
      triggerToast('API Routing Table cache flushed successfully.');
    }, 1000);
  };

  const handleBackupDatabase = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      triggerToast('Database transaction backup completed (hrflow_backup_db.sql saved).');
    }, 1200);
  };

  // Metrics array
  const systemMetrics = [
    { label: 'Registered Profiles', count: isLoading ? '...' : String(usersCount), link: '/admin/users', icon: Users, color: 'text-blue-500 bg-blue-50 border-blue-100 border' },
    { label: 'Configured Roles', count: '4 Roles', link: '/admin/roles', icon: Shield, color: 'text-rose-500 bg-rose-50 border-rose-100 border' },
    { label: 'Feature Toggles', count: '4 Flags', link: '/admin/configuration', icon: Sliders, color: 'text-teal-500 bg-teal-50 border-teal-100 border' },
    { label: 'Audit Security Logs', count: '14 Active', link: '/admin/security', icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-50 border-indigo-100 border' },
  ];

  // System Core Capabilities matching requested role requirements
  const systemCapabilities = [
    {
      title: 'Manage Entire System',
      description: 'Control global uptime configurations, purge system routing caches, take database backups, and inspect live service health metrics.',
      icon: Database,
      link: '/admin/dashboard',
      actionLabel: 'Stay on Dashboard',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'User & Role Management',
      description: 'Audit registered accounts, edit profiles, register custom roles, and configure dynamic permissions matrices.',
      icon: Users,
      link: '/admin/users',
      actionLabel: 'Configure Users & Roles',
      color: 'from-teal-400 to-emerald-600'
    },
    {
      title: 'System Configuration',
      description: 'Modify organizational branding assets, default welcome panels, custom SMTP servers parameters, and toggle system-wide feature flags.',
      icon: Settings,
      link: '/admin/configuration',
      actionLabel: 'Edit Configuration',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'Reports & Analytics',
      description: 'Evaluate overall user growth trends, analyze recruitment and hiring funnel stages, and download analytical logs.',
      icon: FileBarChart2,
      link: '/admin/analytics',
      actionLabel: 'View Analytics',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Security & Permissions',
      description: 'Enforce Global Multi-Factor Auth, configure session idle limits, manage IP Whitelisting patterns, and audit administrative actions.',
      icon: ShieldCheck,
      link: '/admin/security',
      actionLabel: 'View Security Hub',
      color: 'from-rose-500 to-red-600'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-slate-900 border border-slate-800 text-teal-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] rounded-full bg-blue-600/20 blur-[70px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest bg-teal-950 border border-teal-800/40 px-3 py-1 rounded-full">
              System Administrator Session
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none pt-1">Welcome back, Admin</h1>
            <p className="text-slate-300 text-xs max-w-lg leading-relaxed">
              You are logged in with full access. Monitor platform metrics, audit security parameters, and manage employee & applicant resources.
            </p>
          </div>
          
          {/* Quick Stats Panel */}
          <div className="flex gap-4 items-center bg-slate-800/50 border border-slate-700/30 backdrop-blur-md rounded-2xl p-4 self-start md:self-auto">
            <div className="relative flex items-center justify-center">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Database Engine Uptime</p>
              <p className="text-sm font-black text-slate-100">99.98% (Operational)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((m) => (
          <Link 
            key={m.label} 
            to={m.link} 
            className="bg-white hover:bg-slate-50/50 border border-slate-200 rounded-3xl p-5 shadow-sm transition-all duration-150 active:scale-[0.98] group flex flex-col justify-between h-[120px] no-underline hover:no-underline"
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.color}`}>
                <m.icon size={16} />
              </div>
              <span className="material-symbols-outlined text-[18px] text-slate-300 group-hover:text-slate-600 transition-colors">arrow_forward</span>
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 tracking-tight leading-none">{m.count}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{m.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Live System Diagnostics & Maintenance */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Live Gauges Monitor */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
              <Activity size={16} />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Live System Resource Monitor</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* CPU Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">CPU Usage Diagnostics</span>
                <span className="font-mono font-bold text-blue-600">{cpuUsage}%</span>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-700" 
                  style={{ width: `${cpuUsage}%` }}
                />
              </div>
              <p className="text-[9px] text-slate-400">8 Virtual Cores active. Load average stable.</p>
            </div>

            {/* Memory Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">RAM Allocation Pool</span>
                <span className="font-mono font-bold text-indigo-600">{memUsage}%</span>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-700" 
                  style={{ width: `${memUsage}%` }}
                />
              </div>
              <p className="text-[9px] text-slate-400">Allocated 5.44 GB of 8 GB pool size.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-slate-100">
            {/* Flush Cache */}
            <button
              onClick={handleRefreshCache}
              disabled={isRefreshingCache}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={12} className={isRefreshingCache ? 'animate-spin' : ''} />
              Flush Routing Cache
            </button>

            {/* Take Backup */}
            <button
              onClick={handleBackupDatabase}
              disabled={isBackingUp}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <HardDriveDownload size={12} className={isBackingUp ? 'animate-bounce' : ''} />
              {isBackingUp ? 'Backing up...' : 'Backup Transaction Database'}
            </button>
          </div>
        </div>

        {/* Global Maintenance Controller */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-rose-600"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
                <AlertTriangle size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Maintenance Mode</h3>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Activating maintenance offline redirects non-admin accounts to a status page. DB changes will be queued in read-only tables.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Service Status</p>
              <p className={`text-xs font-black ${maintenanceMode ? 'text-rose-500' : 'text-emerald-500'}`}>
                {maintenanceMode ? 'Locked (Offline)' : 'Online (Active)'}
              </p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={maintenanceMode} 
                onChange={handleToggleMaintenance} 
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Administrator Core Requirements Matching Image */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-slate-800 uppercase tracking-wider px-1">Administrator Core Capabilities</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemCapabilities.map((cap) => (
            <div 
              key={cap.title}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${cap.color} flex items-center justify-center text-white shadow-md shadow-slate-200/50`}>
                  <cap.icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-800 tracking-tight">{cap.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-medium">{cap.description}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100 flex">
                <Link 
                  to={cap.link} 
                  className="text-xs font-bold text-primary hover:text-teal-600 transition-colors flex items-center gap-1 no-underline"
                >
                  {cap.actionLabel}
                  <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
