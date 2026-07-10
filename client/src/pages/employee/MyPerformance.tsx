import React, { useState, useEffect } from 'react';
import { TrendingUp, Star, Award, CheckCircle2, User, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';

const initialGoals = [
  { id: 1, title: 'Complete React certification course', progress: 75, status: 'Active' },
  { id: 2, title: 'Mentor 2 junior web developers', progress: 50, status: 'Active' },
  { id: 3, title: 'Lead 1 sprint as Scrum Master', progress: 100, status: 'Completed' },
  { id: 4, title: 'Refactor client authentication flow API', progress: 20, status: 'Active' },
];

const initialSkills = [
  { skill: 'Technical Skills (React, TS, Node)', managerScore: 4.5, selfScore: 4.0 },
  { skill: 'Communication & Collaboration', managerScore: 4.0, selfScore: 4.5 },
  { skill: 'Teamwork & Mentor Capacity', managerScore: 4.8, selfScore: 4.8 },
  { skill: 'Problem Solving & Architecture', managerScore: 4.2, selfScore: 4.0 },
];

const initialReviews = [
  { id: 1, manager: 'Sarah Hassan (Self Review)', role: 'Senior Developer', date: 'Jul 9, 2026', comment: 'I have made great progress on Q3 deliverables, especially in leading the sprint planning sessions. Working towards completing my React certification.', rating: 4.0 },
  { id: 2, manager: 'Richard Hendricks (Engineering Manager)', role: 'Reviewer', date: 'Jul 1, 2026', comment: 'Sarah continues to exceed expectations in technical execution and codebase leadership. Her mentorship of junior teammates is a huge plus. Keep it up!', rating: 4.5 }
];

const MyPerformance = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  
  // Self rating states for form
  const [selectedSkill, setSelectedSkill] = useState(initialSkills[0].skill);
  const [newSelfRating, setNewSelfRating] = useState(4);
  const [selfComment, setSelfComment] = useState('');

  useEffect(() => {
    // 1. Goals Init
    const savedGoals = localStorage.getItem('hrflow_employee_goals');
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (e) {
        setGoals(initialGoals);
      }
    } else {
      setGoals(initialGoals);
      localStorage.setItem('hrflow_employee_goals', JSON.stringify(initialGoals));
    }

    // 2. Skills Init
    const savedSkills = localStorage.getItem('hrflow_employee_skills');
    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills));
      } catch (e) {
        setSkills(initialSkills);
      }
    } else {
      setSkills(initialSkills);
      localStorage.setItem('hrflow_employee_skills', JSON.stringify(initialSkills));
    }

    // 3. Reviews Init
    const savedReviews = localStorage.getItem('hrflow_employee_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        setReviews(initialReviews);
      }
    } else {
      setReviews(initialReviews);
      localStorage.setItem('hrflow_employee_reviews', JSON.stringify(initialReviews));
    }
  }, []);

  const handleUpdateGoal = (id: number, amount: number) => {
    const updated = goals.map(g => {
      if (g.id === id) {
        const nextProg = Math.min(100, Math.max(0, g.progress + amount));
        return {
          ...g,
          progress: nextProg,
          status: nextProg === 100 ? 'Completed' : 'Active'
        };
      }
      return g;
    });
    setGoals(updated);
    localStorage.setItem('hrflow_employee_goals', JSON.stringify(updated));
  };

  const handleUpdateSelfRating = (e: React.FormEvent) => {
    e.preventDefault();

    // Update skills array
    const updatedSkills = skills.map(s => {
      if (s.skill === selectedSkill) {
        return { ...s, selfScore: newSelfRating };
      }
      return s;
    });
    setSkills(updatedSkills);
    localStorage.setItem('hrflow_employee_skills', JSON.stringify(updatedSkills));

    // Append a self-review comment if present
    if (selfComment.trim()) {
      const newReview = {
        id: Date.now(),
        manager: 'Sarah Hassan (Self Evaluation)',
        role: 'Senior Developer',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        comment: selfComment,
        rating: newSelfRating
      };
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('hrflow_employee_reviews', JSON.stringify(updatedReviews));
      setSelfComment('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-primary via-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-[-30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[90px] pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <span className="bg-secondary/20 border border-secondary/30 text-teal-300 font-label-md text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">Review & Goals</span>
          <h1 className="text-3xl font-black tracking-tight mt-1">My Performance Hub</h1>
          <p className="text-indigo-200 text-sm max-w-xl font-body-md">
            Monitor target goals progress, compare manager vs self-assessments, and review formal engineering feedback.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Overall Review Rating', val: '87', unit: '/100', color: 'text-secondary', badge: 'Top 15%' },
          { label: 'Q3 Objectives Achieved', val: `${goals.filter(g => g.progress === 100).length}`, unit: `/${goals.length}`, color: 'text-primary', badge: `${goals.filter(g => g.progress > 50).length} in-progress` },
          { label: 'Manager Rating Score', val: '4.2', unit: '/5.0', color: 'text-on-tertiary-fixed', badge: 'Exceeds Expectations' },
        ].map((m, i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant text-center shadow-xs flex flex-col justify-between">
            <p className="font-label-md text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2">{m.label}</p>
            <p className={`font-headline-lg text-4xl font-black ${m.color}`}>
              {m.val}
              <span className="font-body-md text-sm text-on-surface-variant font-semibold">{m.unit}</span>
            </p>
            <span className="mt-3 bg-surface-container border border-outline-variant text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold w-fit mx-auto">
              {m.badge}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Tracker */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-3 mb-2">
            <Award size={18} className="text-secondary" />
            <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">Q3 Objectives Roadmap</h3>
          </div>

          <div className="space-y-5">
            {goals.map(g => (
              <div key={g.id} className="bg-surface border border-outline-variant rounded-xl p-4 hover:shadow-xs transition-all space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body-md text-sm text-primary font-bold truncate max-w-[280px]">{g.title}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-label-sm text-[9px] font-bold uppercase tracking-wider ${
                      g.status === 'Completed' ? 'bg-secondary-fixed text-secondary' : 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                    }`}>
                      {g.status}
                    </span>
                    <span className="text-xs text-secondary font-black">{g.progress}%</span>
                  </div>
                </div>

                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all" style={{ width: g.progress + '%' }} />
                </div>

                <div className="flex items-center justify-end gap-1.5 pt-1.5 border-t border-outline-variant/60">
                  <span className="text-[9px] text-on-surface-variant font-bold mr-auto uppercase tracking-wider">Update progress</span>
                  <button
                    disabled={g.progress === 0}
                    onClick={() => handleUpdateGoal(g.id, -10)}
                    className="px-2 py-1 bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded text-xs font-black text-on-surface-variant transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    -10%
                  </button>
                  <button
                    disabled={g.progress === 100}
                    onClick={() => handleUpdateGoal(g.id, 10)}
                    className="px-2 py-1 bg-primary text-white hover:bg-secondary rounded text-xs font-black transition-colors disabled:opacity-30 disabled:pointer-events-none shadow-sm shadow-primary/10"
                  >
                    +10%
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Matrix comparison */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-outline-variant pb-3">
            <TrendingUp size={18} className="text-secondary" />
            <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider">Skill Rating Matrix</h3>
          </div>

          <div className="space-y-4">
            {skills.map(s => (
              <div key={s.skill} className="space-y-2 border-b border-outline-variant/40 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-semibold text-primary">{s.skill}</p>
                
                {/* Manager rating display */}
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Manager Evaluation</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} size={13} className={n <= Math.round(s.managerScore) ? 'text-secondary fill-secondary' : 'text-slate-200'} />
                    ))}
                    <span className="font-bold text-primary ml-1.5">{s.managerScore}</span>
                  </div>
                </div>

                {/* Self rating display */}
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Self Assessment</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} size={13} className={n <= Math.round(s.selfScore) ? 'text-primary fill-primary' : 'text-slate-200'} />
                    ))}
                    <span className="font-bold text-primary ml-1.5">{s.selfScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Self-rating update form */}
          <form onSubmit={handleUpdateSelfRating} className="bg-surface-container-low border border-outline-variant rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-secondary" /> Submit Self Evaluation Update
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-on-surface-variant uppercase block">Select Competency</label>
                <select
                  value={selectedSkill}
                  onChange={e => setSelectedSkill(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant bg-surface px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none cursor-pointer font-medium"
                >
                  {skills.map(s => (
                    <option key={s.skill} value={s.skill}>{s.skill.split(' (')[0]}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-on-surface-variant uppercase block">Rating Score</label>
                <div className="flex gap-1.5 items-center bg-surface border border-outline-variant rounded-lg px-2 py-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star
                      key={n}
                      size={16}
                      onClick={() => setNewSelfRating(n)}
                      className={`cursor-pointer transition-transform hover:scale-110 ${
                        n <= newSelfRating ? 'text-primary fill-primary' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-on-surface-variant uppercase block">Evaluation Comment (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Explain why you rated yourself this way..."
                  value={selfComment}
                  onChange={e => setSelfComment(e.target.value)}
                  className="flex-1 rounded-lg border border-outline-variant bg-surface px-3 py-1.5 text-xs focus:border-primary focus:outline-none placeholder-slate-400 font-medium"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors active:scale-95 shrink-0 shadow-sm"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Review Feed Logs */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 space-y-4">
        <h3 className="font-headline-sm text-sm text-primary font-bold uppercase tracking-wider border-b border-outline-variant pb-3 flex items-center gap-2">
          <MessageSquare size={18} className="text-secondary" /> Formal Performance Evaluations History
        </h3>
        
        <div className="space-y-4">
          {reviews.map(rev => (
            <div key={rev.id} className="border border-outline-variant/60 rounded-xl p-4 hover:border-primary/45 transition-all bg-surface/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">
                    {rev.manager.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary">{rev.manager}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase font-semibold">{rev.role} • {rev.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase mr-1">Review Rating</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} size={11} className={n <= Math.round(rev.rating) ? 'text-secondary fill-secondary' : 'text-slate-200'} />
                    ))}
                  </div>
                  <span className="font-bold text-primary text-xs ml-1 bg-surface-container px-2 py-0.5 rounded border border-outline-variant">{rev.rating}</span>
                </div>
              </div>
              <p className="text-xs text-on-surface leading-relaxed italic font-medium">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPerformance;
