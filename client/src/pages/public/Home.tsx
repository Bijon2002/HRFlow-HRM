import React from 'react';
import { Link } from 'react-router-dom';
import hrFlowLogo from '../../assets/HR-Flow.png';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full h-full">
      
{/**/}
<header className="fixed top-0 left-0 w-full bg-surface/90 backdrop-blur-sm border-b border-outline-variant z-50 h-header_height flex justify-between items-center px-margin_mobile md:px-margin_desktop transition-all duration-300">
<Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity no-underline hover:no-underline text-left">
  <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100">
    <img src={hrFlowLogo} alt="HRFlow Logo" className="h-7 w-auto object-contain" />
  </div>
  <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">HRFlow</span>
</Link>
<nav className="hidden md:flex items-center gap-stack_lg">
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md" href="#">Features</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md" href="#">Solutions</a>
<a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md" href="#">Pricing</a>
</nav>
<div className="flex items-center gap-stack_md">
<Link to="/auth/login" className="text-primary hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors font-label-md text-label-md flex items-center justify-center">Login</Link>
<Link to="/auth/register" className="bg-primary-container text-on-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-label-md text-label-md shadow-sm flex items-center justify-center">Apply for Jobs</Link>
</div>
</header>
<main className="flex-grow pt-header_height">
{/**/}
<section className="relative w-full min-h-[819px] flex items-center bg-surface-container-lowest overflow-hidden border-b border-outline-variant">
<div className="absolute inset-0 w-full h-full opacity-10">
    <div className="bg-cover bg-center w-full h-full mix-blend-multiply" data-alt="A subtle, abstract geometric background pattern suitable for a corporate HR dashboard landing page. Light gray lines on a white background, creating a sense of structure and connectivity. The style is modern, minimalist, and professional." style={{backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}}></div>
</div>
<div className="container mx-auto px-margin_mobile md:px-margin_desktop relative z-10 grid md:grid-cols-2 gap-gutter items-center">
<div className="flex flex-col gap-stack_lg max-w-2xl">
<span className="text-secondary font-label-md text-label-md uppercase tracking-wider">Enterprise HR Suite</span>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary text-balance">
                        Manage Your Entire Workforce in One Place
                    </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                        Streamline recruitment, employee management, and organizational analytics with HRFlow's secure, intuitive platform designed for modern enterprises.
                    </p>
<div className="flex flex-wrap items-center gap-stack_md pt-stack_sm">
<Link to="/auth/login" className="bg-primary-container text-on-primary px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-label-md text-label-md shadow-sm flex items-center gap-2">
                            Login to Dashboard
                            <ArrowRight className="h-4.5 w-4.5" />
</Link>
<Link to="/careers" className="border border-outline text-primary px-6 py-3 rounded-lg hover:bg-surface-container-low transition-colors font-label-md text-label-md flex items-center justify-center">
                            View Open Positions
                        </Link>
</div>
</div>
<div className="hidden md:block relative h-[500px] w-full rounded-xl overflow-hidden shadow-sm border border-outline-variant bg-surface">
<img className="object-cover w-full h-full" data-alt="A clean, modern dashboard interface mockup shown on a stylized isometric laptop screen. The dashboard displays employee metrics, charts in deep blue and light blue colors, and a sidebar navigation. The lighting is bright and professional, emphasizing an efficient, enterprise-grade software tool." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSgMWkgiGULNRjmawtWicmbBjiulxgdS9jIw83R3YDzYuckTljtnOUIqSyz4YQT7dbOhppFVi7ebBaVg3ABvw9ClUkeAo2a_bttiB_p8xowztfoTZXKgC3Rr6lhwczBp1C2mPS8o-BjO9HIOuqA-YSqLSC4GnLsqskzP3hC7aJcJujMG8nAg_6rWjP9DDwKXGyxsoq7gKpZZhmjUAUhxiuN-8zaPUp3yPDbvP4I0SH4AsxyCVY9uq1TQ"/>
</div>
</div>
</section>
{/**/}
<section className="py-24 bg-surface">
<div className="container mx-auto px-margin_mobile md:px-margin_desktop">
<div className="text-center mb-16 flex flex-col gap-stack_sm items-center">
<h2 className="font-headline-md text-headline-md text-primary">Comprehensive HR Capabilities</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl text-center">Everything you need to source top talent and manage your existing workforce effectively.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-stack_md group">
<div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center group-hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors">group_add</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Recruitment</h3>
<p className="font-body-md text-body-md text-on-surface-variant">End-to-end applicant tracking, interview scheduling, and candidate evaluation tools.</p>
</div>
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-stack_md group">
<div className="w-12 h-12 bg-secondary-fixed rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors">
<span className="material-symbols-outlined text-secondary group-hover:text-on-secondary transition-colors">badge</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Employee Mgmt</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Centralized database for employee records, performance reviews, and organizational structuring.</p>
</div>
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-stack_md group">
<div className="w-12 h-12 bg-tertiary-fixed rounded-lg flex items-center justify-center group-hover:bg-tertiary-container transition-colors">
<span className="material-symbols-outlined text-tertiary-container group-hover:text-on-tertiary-container transition-colors">event_available</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Attendance</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Automated time tracking, leave management, and shift scheduling integrations.</p>
</div>
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col gap-stack_md group">
<div className="w-12 h-12 bg-error-container rounded-lg flex items-center justify-center group-hover:bg-error transition-colors">
<span className="material-symbols-outlined text-error group-hover:text-on-error transition-colors">analytics</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">AI Insights</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Predictive analytics for retention, bias detection in hiring, and smart reporting.</p>
</div>
</div>
</div>
</section>
{/**/}
<section className="py-24 bg-surface-container-low border-t border-outline-variant">
<div className="container mx-auto px-margin_mobile md:px-margin_desktop">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-stack_md">
<div className="flex flex-col gap-stack_sm">
<h2 className="font-headline-md text-headline-md text-primary">Open Positions</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Join our growing team or view opportunities across our enterprise network.</p>
</div>
<Link to="/careers" className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1.5 transition-colors">
                        View all jobs <ArrowRight className="h-4 w-4" />
</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between min-h-[220px]">
<div className="flex flex-col gap-stack_sm">
<div className="flex justify-between items-start">
<span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase">Engineering</span>
<span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> Remote
                                </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">Senior Frontend Developer</h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Lead the development of our core HR management interface using React and Tailwind.</p>
</div>
<Link to="/auth/register" className="mt-6 w-full border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors py-2 rounded-lg font-label-md text-label-md flex items-center justify-center">
                            Apply Now
                        </Link>
</div>
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between min-h-[220px]">
<div className="flex flex-col gap-stack_sm">
<div className="flex justify-between items-start">
<span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase">Product</span>
<span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> New York, NY
                                </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">Product Manager, Analytics</h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Drive the roadmap for our AI-powered insights module and reporting tools.</p>
</div>
<Link to="/auth/register" className="mt-6 w-full border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors py-2 rounded-lg font-label-md text-label-md flex items-center justify-center">
                            Apply Now
                        </Link>
</div>
{/**/}
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between min-h-[220px]">
<div className="flex flex-col gap-stack_sm">
<div className="flex justify-between items-start">
<span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase">Sales</span>
<span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span> London, UK
                                </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-2">Enterprise Account Executive</h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Manage relationships with top-tier clients and drive adoption of HRFlow.</p>
</div>
<Link to="/auth/register" className="mt-6 w-full border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors py-2 rounded-lg font-label-md text-label-md flex items-center justify-center">
                            Apply Now
                        </Link>
</div>
</div>
</div>
</section>
</main>
{/**/}
<footer className="bg-surface border-t border-outline-variant py-12">
<div className="container mx-auto px-margin_mobile md:px-margin_desktop">
<div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-8">
<div className="col-span-1 md:col-span-1 flex flex-col gap-stack_sm">
<Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity no-underline hover:no-underline text-left mb-2">
  <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100">
    <img src={hrFlowLogo} alt="HRFlow Logo" className="h-6 w-auto object-contain" />
  </div>
  <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">HRFlow</span>
</Link>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
                        Empowering enterprises to build and manage world-class teams.
                    </p>
</div>
<div className="flex flex-col gap-stack_sm">
<h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-2">Platform</h4>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Security</a>
</div>
<div className="flex flex-col gap-stack_sm">
<h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-2">Company</h4>
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/about">About Us</Link>
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/careers">Careers</Link>
<Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/contact">Contact</Link>
</div>
<div className="flex flex-col gap-stack_sm">
<h4 className="font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider mb-2">Legal</h4>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</div>
<div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row justify-between items-center gap-stack_md">
<p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    © 2026 HRFlow Inc. All rights reserved.
                </p>
<div className="flex items-center gap-4">
{/**/}
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">language</span>
</a>
<a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">share</span>
</a>
</div>
</div>
</div>
</footer>

    </div>
  );
};

export default Home;
