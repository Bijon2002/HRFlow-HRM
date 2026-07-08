import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const PublicLayout = () => {
  const loc = useLocation();
  const navLink = (to: string, label: string) => (
    <Link
      key={to}
      to={to}
      className={`font-label-md text-label-md transition-colors ${loc.pathname === to ? 'text-secondary font-semibold' : 'text-on-surface-variant hover:text-primary'}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">HR</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">HRFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLink('/', 'Home')}
            {navLink('/about', 'About')}
            {navLink('/careers', 'Careers')}
            {navLink('/contact', 'Contact')}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth/login" className="font-label-md text-label-md text-primary border border-primary rounded-lg px-4 py-2 hover:bg-primary hover:text-on-primary transition-colors">
              Login
            </Link>
            <Link to="/auth/register" className="font-label-md text-label-md bg-primary text-on-primary rounded-lg px-4 py-2 hover:bg-primary-container transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-on-primary py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold mb-4">HRFlow</h3>
            <p className="font-body-md text-body-md text-primary-fixed-dim">The unified HR management suite for modern organizations.</p>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-semibold mb-4 text-primary-fixed-dim uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2">
              {['Recruitment', 'Interviews', 'Employees', 'Analytics'].map(i => (
                <li key={i}><a href="#" className="font-body-md text-body-md text-primary-fixed hover:text-on-primary transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-semibold mb-4 text-primary-fixed-dim uppercase tracking-wide">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact', 'Privacy'].map(i => (
                <li key={i}><a href="#" className="font-body-md text-body-md text-primary-fixed hover:text-on-primary transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-semibold mb-4 text-primary-fixed-dim uppercase tracking-wide">Contact</h4>
            <p className="font-body-md text-body-md text-primary-fixed">hello@hrflow.app</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-primary-container text-center">
          <p className="font-body-md text-body-md text-primary-fixed-dim">© 2026 HRFlow Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default PublicLayout;
