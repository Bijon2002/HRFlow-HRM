import React, { useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const quizzes = [
  { title: 'React & Frontend Fundamentals', questions: 20, duration: '30 min', status: 'Pending', deadline: 'Jul 11' },
  { title: 'JavaScript Problem Solving', questions: 15, duration: '25 min', status: 'Completed', score: 87, deadline: 'Jul 8' },
];

const Quiz = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="font-headline-md text-headline-md text-primary font-bold">Assessments</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Complete assigned skill assessments before your interviews</p>
    </div>
    <div className="space-y-4">
      {quizzes.map(q => (
        <div key={q.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{q.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"><Clock size={12} />{q.duration}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{q.questions} questions</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Due {q.deadline}</span>
              </div>
              {q.status === 'Completed' && q.score && (
                <div className="mt-3 flex items-center gap-2">
                  <CheckCircle size={16} className="text-secondary" />
                  <span className="font-label-md text-label-md text-secondary font-bold">Score: {q.score}/100</span>
                </div>
              )}
            </div>
            <div>
              {q.status === 'Pending' ? (
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">Start Assessment</button>
              ) : (
                <button className="border border-outline-variant text-on-surface-variant px-5 py-2.5 rounded-lg font-label-md text-label-md hover:border-primary transition-colors">View Results</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default Quiz;
