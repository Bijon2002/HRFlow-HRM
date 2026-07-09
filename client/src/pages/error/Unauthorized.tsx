import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

const Unauthorized = () => (
  <div className="min-h-screen bg-surface flex items-center justify-center px-6">
    <div className="text-center">
      <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldOff size={28} className="text-error" />
      </div>
      <h1 className="font-headline-md text-headline-md text-on-surface font-bold mb-3">Access Denied</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">You don't have permission to view this page.</p>
      <Link to="/" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors inline-block">Go back home</Link>
    </div>
  </div>
);
export default Unauthorized;
