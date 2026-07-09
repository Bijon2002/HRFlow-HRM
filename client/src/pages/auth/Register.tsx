import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import registerBanner from '../../assets/auth_register_banner.png';

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation states
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('Weak');
  const [strengthColor, setStrengthColor] = useState('bg-slate-200');

  useEffect(() => {
    // Calculate strength score
    if (!password) {
      setStrengthScore(0);
      setStrengthLabel('Weak');
      setStrengthColor('bg-slate-200');
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setStrengthScore(score);

    if (score <= 1) {
      setStrengthLabel('Weak');
      setStrengthColor('bg-rose-500');
    } else if (score === 2 || score === 3) {
      setStrengthLabel('Medium');
      setStrengthColor('bg-amber-500');
    } else if (score === 4) {
      setStrengthLabel('Strong');
      setStrengthColor('bg-emerald-500');
    }
  }, [password]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(true);
      navigate('/candidate/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex font-sans">
      
      {/* Left Banner Section (Desktop Only) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-slate-950 overflow-hidden text-white">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-600/15 blur-[120px] pointer-events-none"></div>

        {/* Brand Banner Image Background */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-lighten">
          <img 
            src={registerBanner} 
            alt="HRFlow Collaboration Banner" 
            className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <ShieldCheck className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              HRFlow
            </h1>
            <span className="text-[10px] text-teal-400 font-bold uppercase tracking-widest bg-teal-950/60 border border-teal-800/30 px-2 py-0.5 rounded-full">
              Enterprise v2.4
            </span>
          </div>
        </div>

        {/* Bottom Banner Content */}
        <div className="relative z-10 space-y-8 max-w-md">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Unlock Your Potential.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Create a free candidate profile to instantly apply to modern vacancies, track evaluation steps in real-time, and chat directly with recruiters.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/40 backdrop-blur-md p-3.5 rounded-xl">
              <div className="h-7 w-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-teal-400 stroke-[3]" />
              </div>
              <p className="text-xs font-semibold text-slate-200">One-click CV screening & automatic profile enrichment</p>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/40 backdrop-blur-md p-3.5 rounded-xl">
              <div className="h-7 w-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-teal-400 stroke-[3]" />
              </div>
              <p className="text-xs font-semibold text-slate-200">Interactive live coding evaluation modules</p>
            </div>
            
            <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/40 backdrop-blur-md p-3.5 rounded-xl">
              <div className="h-7 w-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-teal-400 stroke-[3]" />
              </div>
              <p className="text-xs font-semibold text-slate-200">Real-time scheduling of video & technical panels</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 text-xs text-slate-500">
          © 2026 HRFlow Inc. All rights reserved.
        </div>
      </div>

      {/* Right Register Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-slate-50 overflow-y-auto">
        
        {/* Mobile Header Branding */}
        <div className="lg:hidden flex items-center gap-2.5 mb-6">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-teal-400 to-blue-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="h-5 w-5 text-slate-950 stroke-[2.5]" />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
            HRFlow
          </h1>
        </div>

        <div className="w-full max-w-[500px] space-y-6">
          
          {/* Main Card */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            
            {/* Soft decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Create Candidate Account
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 font-medium">
                Join our recruitment ecosystem in less than two minutes
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4.5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="fullName">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <User className="h-5 w-5 stroke-[2]" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="block w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="email">
                    Email Address <span className="text-rose-500">*</span>
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
                      placeholder="jane@example.com"
                      className="block w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                      <Phone className="h-5 w-5 stroke-[2]" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="block w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="password">
                  Password <span className="text-rose-500">*</span>
                </label>
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
                    className="block w-full pl-12 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
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

                {/* Password Strength Meter */}
                {password && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthScore >= 1 ? strengthColor : 'bg-slate-200'} transition-all duration-300`} style={{ width: '25%' }}></div>
                      <div className={`h-full ${strengthScore >= 2 ? strengthColor : 'bg-slate-200'} transition-all duration-300`} style={{ width: '25%' }}></div>
                      <div className={`h-full ${strengthScore >= 3 ? strengthColor : 'bg-slate-200'} transition-all duration-300`} style={{ width: '25%' }}></div>
                      <div className={`h-full ${strengthScore >= 4 ? strengthColor : 'bg-slate-200'} transition-all duration-300`} style={{ width: '25%' }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-400 uppercase tracking-wider">Complexity Meter</span>
                      <span className={`uppercase tracking-wider ${
                        strengthScore <= 1 ? 'text-rose-500' : strengthScore <= 3 ? 'text-amber-500' : 'text-emerald-500'
                      }`}>{strengthLabel}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider" htmlFor="confirmPassword">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Lock className="h-5 w-5 stroke-[2]" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-12 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 stroke-[2]" />
                    ) : (
                      <Eye className="h-5 w-5 stroke-[2]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label htmlFor="terms" className="font-semibold text-slate-500 cursor-pointer select-none">
                    I agree to the{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700 transition-colors hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700 transition-colors hover:underline">
                      Privacy Policy
                    </a>.
                  </label>
                </div>
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
                    <span>Creating Profile...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span>Register Candidate Profile</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>

            </form>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-slate-400 font-semibold uppercase tracking-wider">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Link
                to="/auth/login"
                className="w-full flex justify-center items-center py-3 px-4 border border-slate-200 bg-white rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-100"
              >
                Log In to Account
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

export default Register;
