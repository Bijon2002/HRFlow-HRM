import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Clock, Shield, ChevronRight, CheckCircle, Database, Users, Star, Layers, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full bg-slate-50/50">
      
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white pt-20 pb-28 px-6 overflow-hidden border-b border-slate-900">
        {/* Ambient mesh gradient backgrounds */}
        <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Heading and copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 self-start bg-slate-900 border border-slate-800/80 px-3.5 py-1.5 rounded-full shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Enterprise HRM Suite v2.4</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              The Intelligence-First Workforce Platform
            </h1>
            
            <p className="text-slate-300 font-body-lg text-body-lg max-w-xl leading-relaxed">
              Streamline recruitment pipelines, automate candidate screening with predictive AI, host integrated technical interviews, and oversee employee performance under a secure workspace.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                to="/auth/register" 
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:opacity-95 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-teal-500/15 hover:shadow-teal-500/25 transition-all duration-200 active:scale-[0.98] flex items-center gap-2 no-underline"
              >
                Get Started Free
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <Link 
                to="/careers" 
                className="border border-slate-800 bg-slate-900/40 text-slate-200 hover:bg-slate-900/80 hover:text-white transition-all font-semibold text-sm px-7 py-3.5 rounded-xl flex items-center justify-center no-underline"
              >
                Browse Open Jobs
              </Link>
            </div>
            
            {/* Quick stats tags */}
            <div className="flex flex-wrap gap-6 mt-6 border-t border-slate-900 pt-6">
              {[
                { label: 'AI Screening Match Rate', val: '98%' },
                { label: 'Hiring Pipeline Reduced', val: '75%' },
                { label: 'Platform Reliability Uptime', val: '99.98%' }
              ].map(s => (
                <div key={s.label}>
                  <p className="text-lg font-black text-white">{s.val}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Premium Floating Mock Card Dashboard */}
          <div className="lg:col-span-5 relative w-full h-[380px] lg:h-[420px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            {/* Main background card wrapper */}
            <div className="w-full max-w-[380px] bg-slate-900/80 border border-slate-800/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-indigo-500"></div>
              
              {/* Header metrics mock */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Workspace Health</h3>
                  <p className="text-sm font-bold text-white mt-0.5">SynthGlobal Inc.</p>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
              </div>
              
              {/* Fake Metrics Rows */}
              <div className="space-y-4">
                <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-2xl flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                      <Brain size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">CV AI Matches</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5">Priya Sharma</p>
                    </div>
                  </div>
                  <span className="bg-error-container text-error px-2 py-0.5 rounded text-[10px] font-black">98% Match</span>
                </div>
                
                <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-2xl flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Registered Staff</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5">1,248 Active Profiles</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">Updated</span>
                </div>

                <div className="bg-slate-950/60 border border-slate-850 p-3.5 rounded-2xl flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Activity size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Services</p>
                      <p className="text-xs font-semibold text-slate-200 mt-0.5">Technical Evaluations</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-900 px-2 py-0.5 rounded-full">6 Online</span>
                </div>
              </div>
            </div>

            {/* Micro-floating badges absolute positioning */}
            <div className="absolute top-12 left-[-16px] bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-2 shadow-2xl animate-bounce hover:scale-105 transition-transform duration-200 pointer-events-auto cursor-pointer" style={{ animationDuration: '6s' }}>
              <Star className="text-amber-400 fill-amber-400" size={14} />
              <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">Top Rated</span>
            </div>

            <div className="absolute bottom-16 right-[-10px] bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-2 shadow-2xl animate-bounce hover:scale-105 transition-transform duration-200 pointer-events-auto cursor-pointer" style={{ animationDuration: '8s' }}>
              <Shield className="text-blue-400" size={14} />
              <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">Secure Audit Log</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-secondary font-label-md text-label-md uppercase tracking-wider font-bold">Comprehensive HR Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-none">
              Build and Retain High-Performance Teams
            </h2>
            <p className="font-body-md text-body-md text-slate-500 leading-relaxed">
              HRFlow features modules designed to cover the entire organizational lifecycle, from CV screening to employee analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'AI Smart Screening',
                desc: 'Upload CV databases, evaluate skills matches, and extract top talent instantly using bias-free AI models.',
                icon: Brain,
                color: 'text-teal-600 bg-teal-50 border-teal-105'
              },
              {
                title: 'Recruitment Flow',
                desc: 'Keep track of job openings, applications stages, and candidate communications in a structured roadmap.',
                icon: Users,
                color: 'text-indigo-600 bg-indigo-50 border-indigo-105'
              },
              {
                title: 'Live Technical Panels',
                desc: 'Host integrated video evaluations, schedule times slots, and assess performance metrics on the fly.',
                icon: Clock,
                color: 'text-amber-600 bg-amber-50 border-amber-105'
              },
              {
                title: 'Global Analytics & Logs',
                desc: 'Monitor user access roles, configurations history, database transactions updates, and logs statistics.',
                icon: Database,
                color: 'text-rose-600 bg-rose-50 border-rose-105'
              }
            ].map((c) => (
              <div 
                key={c.title}
                className="bg-white hover:bg-slate-50/50 border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-150 flex flex-col gap-4 group"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${c.color} shrink-0 group-hover:scale-105 transition-transform`}>
                  <c.icon size={20} />
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">{c.title}</h3>
                  <p className="font-body-md text-body-md text-slate-500 leading-relaxed mt-1">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Block with Mock Preview */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              <Layers size={12} className="text-indigo-600" />
              <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">Consolidated Dashboard</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              One Login. Absolute Oversight.
            </h2>
            <p className="font-body-md text-body-md text-slate-500 leading-relaxed">
              No need to switch between disconnected HR databases, shift schedulers, email services, or tracking apps. HRFlow unifies staff registers, timekeeping records, candidate scoring, and security roles inside a clean interface.
            </p>
            <div className="space-y-3">
              {[
                'Single-Sign-On with customizable user permissions structures',
                'Predictive candidate matching reports with direct interviewer handoff',
                'Automated leave schedules, attendance tracking, and check-in logs'
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Link 
                to="/auth/login" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-teal-600 transition-colors no-underline"
              >
                Access HRFlow Demo Workspace
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 p-2.5 rounded-3xl shadow-lg relative overflow-hidden aspect-video">
            <img 
              className="object-cover w-full h-full rounded-2xl" 
              alt="Dashboard interface preview screenshot"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            />
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-6">
            <div className="text-left space-y-2">
              <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-none">Open Careers Opportunities</h2>
              <p className="font-body-md text-body-md text-slate-500">Apply to become part of our modern partner network database.</p>
            </div>
            <Link 
              to="/careers" 
              className="text-secondary hover:text-primary font-semibold text-sm flex items-center gap-1 transition-colors no-underline"
            >
              View all listings
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Senior Frontend Developer',
                dept: 'Engineering',
                loc: 'Remote',
                desc: 'Lead the development of our core HR management interface using React, Tailwind and modern build systems.'
              },
              {
                title: 'Product Manager, AI Module',
                dept: 'Product Management',
                loc: 'New York, USA',
                desc: 'Drive the roadmap for our AI-powered insights, automated resume screening systems, and analytics matrices.'
              },
              {
                title: 'Lead Enterprise Account Exec',
                dept: 'Business Sales',
                loc: 'London, UK',
                desc: 'Build relationships with top-tier enterprise clients and guide them through adopting the HRFlow workspace.'
              }
            ].map(j => (
              <div 
                key={j.title}
                className="bg-slate-50 hover:bg-slate-100/50 border border-slate-200/60 hover:border-slate-350 rounded-3xl p-6 flex flex-col justify-between min-h-[220px] transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-indigo-50 border border-indigo-150 text-indigo-700 px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider">{j.dept}</span>
                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> {j.loc}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold leading-tight mt-1">{j.title}</h3>
                  <p className="font-body-md text-body-md text-slate-500 line-clamp-2 leading-relaxed">{j.desc}</p>
                </div>
                
                <Link 
                  to="/auth/register" 
                  className="mt-6 w-full py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs no-underline"
                >
                  Apply Now
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
