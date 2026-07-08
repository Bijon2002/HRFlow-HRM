import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const ForgotPassword = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">
    <div className="w-full max-w-md">
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant p-10">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center">
            <Mail size={24} className="text-primary" />
          </div>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-background text-center mb-2">Forgot your password?</h2>
        <p className="text-center font-body-md text-body-md text-on-surface-variant mb-8">Enter your email and we'll send you a reset link.</p>
        <form className="space-y-4">
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email address</label>
            <input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="name@company.com" />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-all">
            Send Reset Link
          </button>
        </form>
        <p className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">
          <Link to="/auth/login" className="font-label-md text-label-md text-primary hover:underline">← Back to Login</Link>
        </p>
      </div>
    </div>
  </div>
);
export default ForgotPassword;
