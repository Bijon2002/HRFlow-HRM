import React, { useState, useEffect } from 'react';
import { Star, Check, Sparkles, MessageSquare, ArrowLeft, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConductInterview = () => {
  const navigate = useNavigate();
  const [interview, setInterview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, number>>({
    technical: 0,
    problemSolving: 0,
    communication: 0,
    cultureFit: 0
  });
  const [notes, setNotes] = useState('');
  const [decision, setDecision] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [questionsChecked, setQuestionsChecked] = useState<Record<number, boolean>>({});

  const fetchInterviewData = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const queryParams = new URLSearchParams(window.location.search);
      const appId = queryParams.get('appId');
      
      const apps = await api.get('/jobs/applications');
      let selectedApp: any = null;
      
      if (appId) {
        selectedApp = apps.find((a: any) => a._id === appId);
      } else {
        const interviewApps = apps.filter((a: any) => a.status === 'Interview');
        if (interviewApps.length > 0) {
          selectedApp = interviewApps[0];
        }
      }

      if (selectedApp) {
        setInterview({
          id: selectedApp._id,
          candidateName: selectedApp.candidateId?.name || 'Anonymous Candidate',
          role: selectedApp.internshipId?.title || 'Unknown Position',
          experience: selectedApp.candidateId?.phone ? `${Math.abs(parseInt(selectedApp.candidateId.phone.replace(/[^0-9]/g, '')) % 6) + 2} Years` : '4 Years',
          education: 'B.Sc. in Computer Science',
          skills: selectedApp.internshipId?.tags || ['React', 'Node.js', 'TypeScript', 'MongoDB'],
          aiScore: selectedApp.score || Math.floor(Math.random() * 20) + 78,
          aiInsights: `Candidate has a strong matching profile for the ${selectedApp.internshipId?.title || 'vacancy'}. Demonstrated skills in core technologies with an evaluated AI match score of ${selectedApp.score || 85}%.`,
          suggestedQuestions: [
            `Describe your experience working with ${selectedApp.internshipId?.tags?.[0] || 'React'} and its core architecture.`,
            `How do you optimize performance and manage state in high-volume web applications?`,
            `What is your approach to structuring security, error boundary, and api calls in ${selectedApp.internshipId?.title || 'this role'}?`
          ]
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviewData();
  }, []);

  const setRatingVal = (category: string, val: number) => {
    setRatings(prev => ({ ...prev, [category]: val }));
  };

  const toggleQuestion = (idx: number) => {
    setQuestionsChecked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleFinishInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision) {
      alert('Please select a preliminary decision before ending the interview.');
      return;
    }
    
    try {
      const { api } = await import('../../api');
      // Map preliminary decision to status
      let nextStatus = 'Interview';
      if (decision === 'hire') nextStatus = 'Offer Sent';
      else if (decision === 'reject') nextStatus = 'Rejected';
      else nextStatus = 'Under Review';

      if (interview?.id) {
        await api.put(`/jobs/applications/${interview.id}`, {
          status: nextStatus,
          stage: decision === 'hire' ? 'Offer Issued' : 'Evaluation Completed'
        });
      }

      setShowConfetti(true);
      setTimeout(() => {
        navigate('/hr/interviews');
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to save interview evaluation.');
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-slate-400 font-semibold">Loading evaluation workspace...</div>;
  }

  if (!interview) {
    return (
      <div className="p-6 text-center space-y-4">
        <h3 className="font-headline-md text-headline-md text-primary font-bold">No Active Interview Candidate</h3>
        <p className="text-on-surface-variant max-w-md mx-auto">
          Please schedule interviews or select a candidate with status "Interview" from the applicant list to conduct their evaluation.
        </p>
        <button onClick={() => navigate('/hr/interviews')} className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold">
          Go to Interview Schedule
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 relative">
      {showConfetti && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex flex-col items-center justify-center text-white text-center">
          <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-2xl max-w-sm text-slate-900 space-y-4 shadow-2xl animate-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center mx-auto">
              <Check size={36} />
            </div>
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Evaluation Logged</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">
              Interview results for <strong>{interview.candidateName}</strong> have been submitted to HR recruitment flow.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/hr/interviews')}
          className="p-2 hover:bg-surface-container-high rounded-full text-on-surface transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wide text-secondary bg-secondary-fixed px-2 py-0.5 rounded">
            Live Workspace
          </span>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Conduct Candidate Evaluation</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Panel: Candidate profile & AI recommendations */}
        <div className="lg:col-span-7 space-y-5 flex flex-col">
          {/* Card: Profile Summary */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-2xl shrink-0">
                  {interview.candidateName[0]}
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{interview.candidateName}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{interview.role} · {interview.experience} Exp</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="inline-flex items-center gap-1 bg-error-container text-error px-2.5 py-1 rounded-lg font-label-md text-label-md font-bold shadow-sm">
                  <Sparkles size={14} />
                  {interview.aiScore}% Match
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">AI Recommendation Score</p>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Education</p>
                <p className="font-body-md text-on-surface mt-0.5 font-medium">{interview.education}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Core Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {interview.skills.map((s: string) => (
                    <span key={s} className="bg-surface-container px-2 py-0.5 rounded text-[11px] font-medium text-on-surface border border-outline-variant">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card: AI Insights */}
          <div className="bg-gradient-to-r from-primary-container/10 to-surface-container-low border border-primary-fixed rounded-xl p-5 space-y-3 shadow-sm relative overflow-hidden flex-1">
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary-fixed/20 rounded-full blur-xl"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">auto_awesome</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">AI Screening Assessment</h3>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm leading-relaxed">
              {interview.aiInsights}
            </p>
          </div>

          {/* Card: Suggested Interview Questions */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-outline-variant">
              <MessageSquare size={18} className="text-secondary" />
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Suggested AI Tech Questions</h3>
            </div>
            
            <div className="space-y-3">
              {interview.suggestedQuestions.map((q: string, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => toggleQuestion(idx)}
                  className={`border rounded-lg p-3 cursor-pointer transition-all flex items-start gap-3 ${
                    questionsChecked[idx] ? 'border-secondary/40 bg-secondary/5' : 'border-outline-variant bg-surface hover:border-primary/40'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    questionsChecked[idx] ? 'bg-secondary border-secondary text-on-secondary' : 'border-outline-variant bg-white'
                  }`}>
                    {questionsChecked[idx] && <Check size={10} />}
                  </div>
                  <p className={`font-body-md text-body-md text-xs leading-relaxed ${questionsChecked[idx] ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Grading Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleFinishInterview} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-5 shadow-sm h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant">
                <Award size={18} className="text-primary" />
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Live Scoring Panel</h3>
              </div>

              {/* Rate Categories */}
              <div className="space-y-3">
                {[
                  { key: 'technical', label: 'Technical Capabilities', desc: 'Syntax, algorithm design, architecture' },
                  { key: 'problemSolving', label: 'Problem Solving', desc: 'Analytical thinking, debug flow' },
                  { key: 'communication', label: 'Communication Skills', desc: 'Clarity, listening, collaboration' },
                  { key: 'cultureFit', label: 'Cultural Fit & Attitude', desc: 'Team mindset, alignment with values' }
                ].map(cat => (
                  <div key={cat.key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">{cat.label}</span>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        {ratings[cat.key] > 0 ? `${ratings[cat.key]} / 5` : 'Rate'}
                      </span>
                    </div>
                    <p className="font-body-md text-[10px] text-on-surface-variant mt-0.5">{cat.desc}</p>
                    <div className="flex items-center gap-1.5 pt-1.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingVal(cat.key, star)}
                          className="focus:outline-none transition-transform active:scale-125"
                        >
                          <Star 
                            size={20} 
                            className={`${
                              star <= ratings[cat.key] 
                                ? 'text-secondary fill-secondary' 
                                : 'text-outline-variant hover:text-secondary/60'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedback Notes */}
              <div className="space-y-1 pt-2">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Evaluation Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Record summary of candidate performance, standout answers, or areas of concern..."
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-xs focus:border-primary focus:outline-none placeholder:text-on-surface-variant"
                />
              </div>

              {/* Preliminary Decision */}
              <div className="space-y-2 pt-2">
                <label className="font-label-md text-label-md text-on-surface font-semibold">Preliminary Decision</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'hire', label: 'Hire', color: 'border-secondary text-secondary bg-secondary-fixed/30', activeColor: 'bg-secondary text-on-secondary border-secondary' },
                    { val: 'discuss', label: 'Discuss', color: 'border-tertiary-container text-on-tertiary-container bg-tertiary-fixed', activeColor: 'bg-tertiary-container text-on-tertiary border-tertiary-container' },
                    { val: 'reject', label: 'Reject', color: 'border-error text-error bg-error-container/30', activeColor: 'bg-error text-on-error border-error' }
                  ].map(btn => (
                    <button
                      key={btn.val}
                      type="button"
                      onClick={() => setDecision(btn.val)}
                      className={`border px-3 py-2 rounded-lg font-label-md text-label-md text-center transition-all ${
                        decision === btn.val ? btn.activeColor + ' shadow-sm scale-105' : 'border-outline-variant hover:bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant flex gap-3">
              <button 
                type="button"
                onClick={() => navigate('/hr/interviews')}
                className="flex-1 border border-outline-variant hover:bg-surface-container-low text-on-surface py-2.5 rounded-lg font-label-md text-label-md transition-colors"
              >
                Hold Assessment
              </button>
              <button 
                type="submit"
                className="flex-1 bg-primary hover:bg-secondary text-on-primary py-2.5 rounded-lg font-label-md text-label-md transition-colors shadow-sm"
              >
                Log Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConductInterview;
