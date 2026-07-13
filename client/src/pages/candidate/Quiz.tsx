import React, { useState } from 'react';
import { Clock, CheckCircle, HelpCircle, Calendar, AlertCircle } from 'lucide-react';

const quizzes = [
  { title: 'React & Frontend Fundamentals', questions: 20, duration: '30 min', status: 'Pending', deadline: 'Jul 11, 2026' },
  { title: 'JavaScript Problem Solving', questions: 15, duration: '25 min', status: 'Completed', score: 87, deadline: 'Jul 8, 2026' },
];

const Quiz = () => (
  <div className="p-6 space-y-6 max-w-5xl mx-auto">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Assessments</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Complete assigned skill assessments before your technical interviews</p>
    </div>
    
    <div className="space-y-4">
      {quizzes.map(q => {
        const isCompleted = q.status === 'Completed';
        return (
          <div 
            key={q.title} 
            className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{q.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                    isCompleted ? 'bg-secondary-fixed text-secondary' : 'bg-error-container text-error'
                  }`}>
                    {q.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                    <Clock size={14} className="text-outline" /> {q.duration}
                  </span>
                  <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                    <HelpCircle size={14} className="text-outline" /> {q.questions} Questions
                  </span>
                  <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                    <Calendar size={14} className="text-outline" /> Due {q.deadline}
                  </span>
                </div>
                
                {isCompleted && q.score && (
                  <div className="flex items-center gap-2 pt-1 bg-surface-container-low/40 p-2 rounded-lg border border-outline-variant max-w-xs">
                    <CheckCircle size={18} className="text-secondary" />
                    <span className="font-label-md text-label-md text-secondary font-bold">Passed · Score: {q.score}/100</span>
                  </div>
                )}
              </div>
              
              <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-outline-variant flex items-center">
                {q.status === 'Pending' ? (
                  <button className="w-full md:w-auto bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary hover:shadow-md transition-all shadow-sm">
                    Start Assessment
                  </button>
                ) : (
                  <button className="w-full md:w-auto border border-outline-variant text-on-surface-variant bg-surface px-6 py-2.5 rounded-lg font-label-md text-label-md hover:border-primary hover:text-primary transition-all">
                    View Results
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Quiz;

