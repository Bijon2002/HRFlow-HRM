import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-surface flex items-center justify-center px-6">
    <div className="text-center">
      <p className="font-headline-lg text-headline-lg text-primary font-black text-8xl mb-4">404</p>
      <h1 className="font-headline-md text-headline-md text-on-surface font-bold mb-3">Page not found</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors inline-block">Go back home</Link>
    </div>
  </div>
);
export default NotFound;
