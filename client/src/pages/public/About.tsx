import React from 'react';

const About = () => (
  <div className="max-w-4xl mx-auto px-6 py-20">
    <h1 className="font-headline-lg text-headline-lg text-primary font-bold mb-6">About HRFlow</h1>
    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
      HRFlow was founded with a simple mission: make human resources management intuitive, powerful, and data-driven. 
      We believe great companies are built by great teams, and great teams start with great hiring.
    </p>
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {[
        { year: '2021', event: 'HRFlow founded in Dhaka' },
        { year: '2023', event: 'Reached 5,000 active companies' },
        { year: '2026', event: 'Launched AI Screening Module' },
      ].map(item => (
        <div key={item.year} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant">
          <div className="text-secondary font-bold text-2xl mb-2">{item.year}</div>
          <p className="font-body-md text-body-md text-on-surface-variant">{item.event}</p>
        </div>
      ))}
    </div>
  </div>
);
export default About;
