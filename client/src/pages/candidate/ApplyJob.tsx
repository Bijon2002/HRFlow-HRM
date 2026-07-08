import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';

const ApplyJob = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">Apply for Job</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Senior Frontend Developer at TechCorp BD</p>
      </div>
      {/* Progress */}
      <div className="flex items-center gap-2">
        {['Personal Info', 'Upload CV', 'Cover Letter', 'Review'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-primary' : 'text-on-surface-variant'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i + 1 < step ? 'bg-primary border-primary text-on-primary' : i + 1 === step ? 'border-primary text-primary' : 'border-outline-variant text-on-surface-variant'}`}>
                {i + 1 < step ? <CheckCircle size={14} className="fill-current" /> : i + 1}
              </div>
              <span className="font-label-sm text-label-sm hidden sm:block">{s}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-0.5 ${i + 1 < step ? 'bg-primary' : 'bg-outline-variant'}`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-8 space-y-5">
        {step === 1 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">First name</label><input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
            <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Last name</label><input type="text" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          </div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Email</label><input type="email" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Phone</label><input type="tel" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" /></div>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">LinkedIn URL</label><input type="url" className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none" placeholder="https://linkedin.com/in/..." /></div>
        </>)}
        {step === 2 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Upload Your CV</h2>
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-10 text-center hover:border-primary transition-colors cursor-pointer bg-surface-container-low/50">
            <Upload size={32} className="mx-auto text-on-surface-variant mb-3" />
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">Drag and drop your CV here</p>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">PDF, DOCX up to 10MB</p>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">Choose File</button>
          </div>
        </>)}
        {step === 3 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Cover Letter</h2>
          <div><label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">Why are you a great fit for this role?</label>
          <textarea rows={8} className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none" placeholder="Write your cover letter here..." /></div>
        </>)}
        {step === 4 && (<>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Review Your Application</h2>
          <div className="space-y-3">
            {[['Position', 'Senior Frontend Developer'], ['Company', 'TechCorp BD'], ['Location', 'Remote'], ['Type', 'Full-time']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-outline-variant">
                <span className="font-label-md text-label-md text-on-surface-variant">{k}</span>
                <span className="font-body-md text-body-md text-on-surface">{v}</span>
              </div>
            ))}
          </div>
        </>)}
      </div>
      <div className="flex justify-between">
        <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="border border-outline-variant px-6 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary disabled:opacity-50 transition-colors">Previous</button>
        <button onClick={() => setStep(Math.min(4, step + 1))} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors">
          {step === 4 ? 'Submit Application' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};
export default ApplyJob;
