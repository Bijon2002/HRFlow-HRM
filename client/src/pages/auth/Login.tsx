import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import loginBanner from '../../assets/auth_login_banner.png';
import hrFlowLogo from '../../assets/HR-Flow.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulate authentication API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Strict credentials check for requested admin
      if (email === 'admin@gmail.com') {
        if (password !== 'admin123') {
          setError('Invalid credentials. Admin password is "admin123"');
          return;
        }
        navigate('/admin/dashboard');
      } else if (email.includes('admin')) {
        navigate('/admin/dashboard');
      } else if (email.includes('hr')) {
        navigate('/hr/dashboard');
      } else if (email.includes('employee')) {
        navigate('/employee/dashboard');
      } else {
        navigate('/candidate/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex font-sans">
      
      {/* Left Banner Section (Desktop Only) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-slate-950 overflow-hidden text-white">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none"></div>

        {/* Brand Banner Image Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-lighten">
          <img 
            src={loginBanner} 
            alt="HRFlow Workflow Banner" 
            className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        {/* Top Header */}
        <Link to="/" className="relative z-10 flex items-center gap-2.5 hover:opacity-90 transition-opacity no-underline hover:no-underline text-left">
          <div className="bg-white p-1.5 rounded-xl shadow-lg shadow-teal-500/10 border border-slate-100">
            <img src={hrFlowLogo} alt="HRFlow Logo" className="h-8 w-auto object-contain" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              HRFlow
            </h1>
            <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest bg-teal-950/60 border border-teal-800/30 px-2 py-0.5 rounded-full">
              Enterprise v2.4
            </span>
          </div>
        </Link>

        {/* Bottom Banner Content */}
        <div className="relative z-10 space-y-6 max-w-md">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Empowering High-Performance Teams.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              HRFlow streamlines global recruitment, predictive screening, and candidate lifecycles under a unified, AI-driven dashboard.
            </p>
          </div>
          
          <div className="bg-slate-900/60 border border-slate-800/40 backdrop-blur-md rounded-2xl p-5 shadow-2xl">
            <p className="text-slate-200 text-sm italic leading-relaxed">
              "HRFlow transformed our hiring cycle. What used to take four weeks now takes four days, with much higher candidate quality."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-teal-400 text-xs">
                MC
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Marcus Vance</h4>
                <p className="text-[10px] text-slate-400">Head of Talent Acquisition, SynthGlobal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs text-slate-500">
          © 2026 HRFlow Inc. All rights reserved.
        </div>
      </div>

      {/* Right Login Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 bg-slate-50">
        
        {/* Mobile Header Branding */}
        <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-8 hover:opacity-90 transition-opacity no-underline hover:no-underline text-left">
          <div className="bg-white p-1.5 rounded-xl shadow-lg border border-slate-100">
            <img src={hrFlowLogo} alt="HRFlow Logo" className="h-7 w-auto object-contain" />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
            HRFlow
          </h1>
        </Link>

        <div className="w-full max-w-[420px] space-y-6">
          
          {/* Main Card */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            
            {/* Soft decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 font-medium">
                Enter your credentials to access the secure portal
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Mail className="h-5 w-5 stroke-[2]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    autoComplete="email"
                    className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors focus:outline-none focus:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Lock className="h-5 w-5 stroke-[2]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="block w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 stroke-[2]" />
                    ) : (
                      <Eye className="h-5 w-5 stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-3 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  Keep me logged in
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-500/15 hover:opacity-95 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-75 disabled:pointer-events-none transition-all duration-150"
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
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>

            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-slate-400 font-semibold uppercase tracking-wider">
                  New to HRFlow?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/auth/register"
                className="w-full flex justify-center items-center py-3 px-4 border border-slate-200 bg-white rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
              >
                Create Candidate Account
              </Link>
            </div>

          </div>
          
          <p className="lg:hidden text-center text-[10px] text-slate-400 font-medium">
            © 2026 HRFlow Inc. All rights reserved.
          </p>

        </div>
      </div>
      
    </div>
  );
};

export default Login;
