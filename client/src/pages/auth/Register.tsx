import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
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

    try {
      const { api, setAuthToken } = await import('../../api');
      const data = await api.post('/auth/register', { name: fullName, email, password, role: 'candidate' });
      
      setIsLoading(false);
      setAuthToken(data.token);
      localStorage.setItem('hrflow_user', JSON.stringify(data));
      localStorage.setItem('hrflow_current_role', data.role);
      
      navigate('/candidate/dashboard');
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center py-16 px-6 relative overflow-hidden">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-teal-400/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/10 blur-[90px] pointer-events-none"></div>

      <div className="w-full max-w-[520px] relative z-10">
        {/* Main Card */}
        <div className="bg-white/90 border border-slate-200/60 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative overflow-hidden transition-all duration-350 hover:shadow-2xl">
          {/* Soft decorative accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"></div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Create Candidate Account
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">
              Join our recruitment ecosystem in less than two minutes
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-100/50 text-rose-600 text-xs font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="fullName">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <User className="h-5 w-5 stroke-[2]" size={16} />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="block w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-455 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Grid Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="email">
                  Email Address <span className="text-rose-500">*</span>
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
                    placeholder="jane@example.com"
                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-455 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                    <Phone className="h-5 w-5 stroke-[2]" size={16} />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="block w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-455 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="password">
                Password <span className="text-rose-500">*</span>
              </label>
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
                  className="block w-full pl-11 pr-11 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-455 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
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
              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider" htmlFor="confirmPassword">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <Lock className="h-5 w-5 stroke-[2]" size={16} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-11 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-950 text-sm placeholder-slate-455 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors border-0 bg-transparent"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 stroke-[2]" size={16} />
                  ) : (
                    <Eye className="h-5 w-5 stroke-[2]" size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start pt-1">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-350 text-teal-600 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
                />
              </div>
              <div className="ml-2.5 text-xs">
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
              className="w-full mt-2 relative flex items-center justify-center py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-500/15 transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-75 disabled:pointer-events-none cursor-pointer border-0"
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
                Already have an account?
              </span>
            </div>
          </div>

          <div className="mt-5">
            <Link
              to="/auth/login"
              className="w-full flex justify-center items-center py-3 px-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-slate-100 no-underline"
            >
              Log In to Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
