import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const { api, setAuthToken } = await import('../../api');
      const data = await api.post('/auth/login', { email, password });
      
      setIsLoading(false);
      setAuthToken(data.token);
      localStorage.setItem('hrflow_user', JSON.stringify(data));
      localStorage.setItem('hrflow_current_role', data.role);
      
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.role === 'hr') {
        navigate('/hr/dashboard');
      } else if (data.role === 'employee') {
        navigate('/employee/dashboard');
      } else {
        navigate('/candidate/dashboard');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center py-16 px-6 relative overflow-hidden">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-teal-400/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] relative z-10">
        {/* Main Card */}
        <div className="bg-white/90 border border-slate-200/60 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden transition-all duration-350 hover:shadow-2xl">
          {/* Soft decorative accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">
              Enter your credentials to access the secure portal
            </p>
          </div>

          {/* Quick Demo Login Tabs */}
          {/* Quick Demo Login Grid */}
          <div className="mb-6 space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Quick Fill Demo Workspace
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-50 text-teal-650 border border-teal-100 animate-pulse">
                One-Click Access
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { 
                  label: 'Admin', 
                  sub: 'Full Access Console', 
                  email: 'admin@hrflow.app', 
                  pass: 'admin123',
                  border: 'hover:border-blue-500/40 hover:shadow-blue-500/5',
                  iconColor: 'text-blue-700 bg-blue-50 border-blue-100',
                  badge: 'Admin'
                },
                { 
                  label: 'HR Manager', 
                  sub: 'Hiring & Jobs', 
                  email: 'hr@hrflow.app', 
                  pass: 'hr123',
                  border: 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
                  iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
                  badge: 'HR'
                },
                { 
                  label: 'Employee', 
                  sub: 'Tasks & Timesheets', 
                  email: 'employee@hrflow.app', 
                  pass: 'emp123',
                  border: 'hover:border-teal-500/40 hover:shadow-teal-500/5',
                  iconColor: 'text-teal-700 bg-teal-50 border-teal-100',
                  badge: 'Staff'
                },
                { 
                  label: 'Candidate', 
                  sub: 'Portal & Quiz', 
                  email: 'candidate@hrflow.app', 
                  pass: 'cand123',
                  border: 'hover:border-slate-450/40 hover:shadow-slate-450/5',
                  iconColor: 'text-slate-700 bg-slate-100 border-slate-200',
                  badge: 'Applicant'
                }
              ].map(d => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => {
                    setEmail(d.email);
                    setPassword(d.pass);
                    setError('');
                  }}
                  className={`flex items-center gap-2.5 p-2.5 text-left bg-white border border-slate-200 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer hover:shadow-sm hover:bg-slate-50/50 ${d.border} group border-0`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border ${d.iconColor}`}>
                    {d.label[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-slate-800 leading-tight group-hover:text-primary transition-colors">
                      {d.label}
                    </p>
                    <p className="text-[9px] font-semibold text-slate-400 leading-tight mt-0.5 truncate">
                      {d.sub}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-100/50 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <Mail className="h-5 w-5 stroke-[2]" size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="block w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-450 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors focus:outline-none"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <Lock className="h-5 w-5 stroke-[2]" size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-11 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-450 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors border-0 bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 stroke-[2]" size={16} />
                  ) : (
                    <Eye className="h-5 w-5 stroke-[2]" size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-1">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4.5 w-4.5 rounded border-slate-350 text-teal-600 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2.5 text-xs font-semibold text-slate-500 cursor-pointer select-none">
                Keep me logged in
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 relative flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-500/15 transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-75 disabled:pointer-events-none cursor-pointer border-0"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span>Log In to System</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-150"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400 font-bold uppercase tracking-wider">
                New to HRFlow?
              </span>
            </div>
          </div>

          <div className="mt-5">
            <Link
              to="/auth/register"
              className="w-full flex justify-center items-center py-3 px-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-100 no-underline"
            >
              Create Candidate Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
