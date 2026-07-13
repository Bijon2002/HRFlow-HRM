import React, { useState, useEffect, useRef } from 'react';
import { Brain, Star, ChevronRight, Upload, Loader2, FileText, X, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AiAnalysis {
  score: number;
  skills: string[];
  education: string;
  experience: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  analyzedAt?: string;
}

const CVScreening = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState('All Positions');
  const [isLoading, setIsLoading] = useState(true);

  // AI Analysis state
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AiAnalysis | null>(null);
  const [analysisError, setAnalysisError] = useState('');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [selectedCandidateName, setSelectedCandidateName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingApplicationId, setPendingApplicationId] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const { api } = await import('../../api');
      const data = await api.get('/jobs/applications');
      const mapped = data.map((app: any) => ({
        id: app._id,
        name: app.candidateId?.name || 'Anonymous User',
        email: app.candidateId?.email || '',
        role: app.internshipId?.title || 'Unknown Position',
        match: app.aiAnalysis?.score || null,
        skills: app.aiAnalysis?.skills || app.internshipId?.tags || [],
        aiAnalysis: app.aiAnalysis || null,
        hasAnalysis: !!(app.aiAnalysis && app.aiAnalysis.score),
        createdAt: app.createdAt,
      }));

      // Sort: analyzed first (by score desc), then unanalyzed
      mapped.sort((a: any, b: any) => {
        if (a.hasAnalysis && b.hasAnalysis) return b.match - a.match;
        if (a.hasAnalysis) return -1;
        if (b.hasAnalysis) return 1;
        return 0;
      });
      setCandidates(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAnalyzeCv = (applicationId: string, candidateName: string) => {
    setPendingApplicationId(applicationId);
    setSelectedCandidateName(candidateName);
    setAnalysisError('');
    setAnalysisResult(null);
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingApplicationId) return;

    if (file.type !== 'application/pdf') {
      setAnalysisError('Only PDF files are allowed');
      return;
    }

    setAnalyzingId(pendingApplicationId);
    setAnalysisError('');
    setAnalysisResult(null);
    setShowAnalysisModal(true);

    try {
      const { api } = await import('../../api');
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('applicationId', pendingApplicationId);

      const result = await api.post('/cv/analyze', formData);
      setAnalysisResult(result.analysis);
      // Refresh the list to show updated scores
      fetchCandidates();
    } catch (err: any) {
      setAnalysisError(err.message || 'Failed to analyze CV');
    } finally {
      setAnalyzingId(null);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const viewStoredAnalysis = (candidate: any) => {
    setSelectedCandidateName(candidate.name);
    setAnalysisResult(candidate.aiAnalysis);
    setAnalysisError('');
    setShowAnalysisModal(true);
  };

  const uniqueJobs = ['All Positions', ...new Set(candidates.map(c => c.role))];

  const filteredCandidates = candidates.filter(c => {
    return selectedJob === 'All Positions' || c.role === selectedJob;
  });

  const analyzedCount = candidates.filter(c => c.hasAnalysis).length;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'bg-blue-50 border-blue-200';
    if (score >= 50) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hidden file input for PDF upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileSelected}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary-fixed rounded-xl flex items-center justify-center">
          <Brain size={20} className="text-secondary" />
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">AI CV Screening</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Upload CVs for Gemini AI-powered analysis and scoring</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-primary-fixed/30 border border-primary-fixed rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Sparkles size={20} className="text-primary" />
          <p className="font-body-md text-body-md text-primary font-medium">
            <strong>{analyzedCount}</strong> of <strong>{candidates.length}</strong> candidates analyzed by AI · Showing <strong>{selectedJob}</strong>
          </p>
        </div>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none text-on-surface-variant"
        >
          {uniqueJobs.map(job => (
            <option key={job} value={job}>{job}</option>
          ))}
        </select>
      </div>

      {/* Candidate list */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-400 font-semibold flex items-center justify-center gap-2">
          <Loader2 size={20} className="animate-spin" /> Loading applications...
        </div>
      ) : filteredCandidates.length > 0 ? (
        <div className="space-y-4">
          {filteredCandidates.map((c, i) => (
            <div key={c.id || c.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex items-center gap-5">
              <div className="text-2xl font-black text-on-surface-variant w-8 text-center">#{i + 1}</div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{c.name}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">{c.role}</p>
                  {c.hasAnalysis && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle size={10} /> AI Analyzed
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {c.skills.slice(0, 6).map((s: string) => (
                    <span key={s} className="text-xs bg-surface-container border border-outline-variant px-2 py-0.5 rounded text-on-surface-variant">
                      {s}
                    </span>
                  ))}
                  {c.skills.length > 6 && (
                    <span className="text-xs text-on-surface-variant">+{c.skills.length - 6} more</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {c.hasAnalysis ? (
                  <>
                    <div className="text-center">
                      <div className={`text-2xl font-black ${getScoreColor(c.match)}`}>{c.match}%</div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant">AI Score</div>
                    </div>
                    <button
                      onClick={() => viewStoredAnalysis(c)}
                      className="flex items-center gap-1 border border-primary text-primary px-3 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-fixed transition-colors cursor-pointer"
                    >
                      View Report <ChevronRight size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAnalyzeCv(c.id, c.name)}
                    disabled={analyzingId === c.id}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-blue-600 text-white px-4 py-2.5 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 border-0 shadow-sm"
                  >
                    {analyzingId === c.id ? (
                      <><Loader2 size={14} className="animate-spin" /> Analyzing...</>
                    ) : (
                      <><Upload size={14} /> Upload & Analyze CV</>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 font-semibold">No candidates found matching criteria.</div>
      )}

      {/* AI Analysis Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 rounded-t-2xl px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Brain size={18} className="text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">AI Analysis Report</h3>
                  <p className="text-xs text-slate-400">{selectedCandidateName}</p>
                </div>
              </div>
              <button onClick={() => setShowAnalysisModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer border-0 bg-transparent">
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Loading state */}
              {analyzingId && !analysisResult && !analysisError && (
                <div className="text-center py-10 space-y-3">
                  <div className="w-16 h-16 mx-auto bg-violet-100 rounded-2xl flex items-center justify-center">
                    <Loader2 size={28} className="text-violet-600 animate-spin" />
                  </div>
                  <p className="font-bold text-slate-700">Gemini AI is analyzing the CV...</p>
                  <p className="text-sm text-slate-400">This may take 10-20 seconds</p>
                </div>
              )}

              {/* Error state */}
              {analysisError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                  <AlertTriangle size={20} className="text-red-500 shrink-0" />
                  <p className="text-sm text-red-700 font-medium">{analysisError}</p>
                </div>
              )}

              {/* Results */}
              {analysisResult && (
                <>
                  {/* Score */}
                  <div className={`text-center p-6 rounded-xl border ${getScoreBg(analysisResult.score)}`}>
                    <div className={`text-5xl font-black ${getScoreColor(analysisResult.score)}`}>
                      {analysisResult.score}%
                    </div>
                    <p className="text-sm font-medium text-slate-500 mt-1">Overall AI Match Score</p>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <FileText size={14} /> Professional Summary
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">
                      {analysisResult.summary}
                    </p>
                  </div>

                  {/* Education & Experience */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Education</p>
                      <p className="text-sm text-slate-700">{analysisResult.education}</p>
                    </div>
                    <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Experience</p>
                      <p className="text-sm text-slate-700">{analysisResult.experience}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 text-sm">Extracted Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.skills.map((skill) => (
                        <span key={skill} className="text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 px-2.5 py-1 rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                        <CheckCircle size={14} /> Strengths
                      </h4>
                      <ul className="space-y-1.5">
                        {analysisResult.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-slate-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-amber-700 text-sm flex items-center gap-1.5">
                        <AlertTriangle size={14} /> Areas to Improve
                      </h4>
                      <ul className="space-y-1.5">
                        {analysisResult.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs text-slate-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {analysisResult.analyzedAt && (
                    <p className="text-[10px] text-slate-400 text-right">
                      Analyzed: {new Date(analysisResult.analyzedAt).toLocaleString()}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVScreening;
