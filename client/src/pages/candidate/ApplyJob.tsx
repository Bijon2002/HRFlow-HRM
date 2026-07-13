import React, { useState } from 'react';
import { Upload, CheckCircle, ChevronRight, Briefcase, FileText } from 'lucide-react';

const ApplyJob = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-outline-variant pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Briefcase size={16} /> Job Application
          </div>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">Apply for Position</h1>
          <p className="font-body-md text-body-md text-on-surface-variant font-medium">Senior Frontend Developer · TechCorp BD</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm overflow-x-auto">
        {['Personal Info', 'Upload CV', 'Cover Letter', 'Review'].map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-3 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                i + 1 < step 
                  ? 'bg-primary border-primary text-on-primary' 
                  : i + 1 === step 
                    ? 'border-primary text-primary bg-primary/10' 
                    : 'border-outline-variant text-on-surface-variant'
              }`}>
                {i + 1 < step ? <CheckCircle size={16} className="fill-current" /> : i + 1}
              </div>
              <span className={`font-label-md text-label-md hidden md:block ${
                i + 1 <= step ? 'text-on-surface font-semibold' : 'text-on-surface-variant'
              }`}>{s}</span>
            </div>
            {i < 3 && <ChevronRight size={16} className="text-outline-variant hidden md:block shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-6 md:p-8 space-y-6">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Personal Information</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Please provide your contact details. This information will be used to review your profile and contact you for further steps.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none transition-all" 
                  placeholder="e.g. John"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none transition-all" 
                  placeholder="e.g. Doe"
                />
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none transition-all" 
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none transition-all" 
                placeholder="+880 17XX XXXXXX"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">LinkedIn Profile URL</label>
              <input 
                type="url" 
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none transition-all" 
                placeholder="https://linkedin.com/in/username" 
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Upload Your CV</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Upload your most recent curriculum vitae. PDF format is highly recommended for best AI scoring results.</p>
            
            <div className="border-2 border-dashed border-outline-variant hover:border-primary rounded-2xl p-10 text-center transition-colors cursor-pointer bg-surface-container-low/30 hover:bg-surface-container-low/50">
              <Upload size={36} className="mx-auto text-primary mb-3" />
              <p className="font-label-md text-label-md text-on-surface font-semibold mb-1">Drag and drop your CV here</p>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-4">PDF, DOCX up to 10MB</p>
              <div className="flex justify-center">
                <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-secondary hover:shadow-sm transition-all">
                  Choose File
                </button>
              </div>
            </div>

            {file && (
              <div className="flex items-center gap-3 p-3 bg-primary-container/20 rounded-xl border border-primary-container/40">
                <FileText size={20} className="text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-on-surface">resume_john_doe.pdf</p>
                  <p className="text-xs text-on-surface-variant">2.4 MB</p>
                </div>
                <CheckCircle size={18} className="text-secondary" />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Cover Letter</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Briefly introduce yourself and share why you are a great match for this role.</p>
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">Why are you a great fit for this role?</label>
              <textarea 
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={8} 
                className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm focus:border-primary focus:outline-none resize-none transition-all" 
                placeholder="Write your cover letter or introduction here..." 
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Review Your Application</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Please confirm your application details before submitting. You cannot edit this information once submitted.</p>
            
            <div className="bg-surface-container-low rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-outline-variant">
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">Full Name</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">{formData.firstName || 'John'} {formData.lastName || 'Doe'}</span>
                </div>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">Email Address</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">{formData.email || 'john.doe@example.com'}</span>
                </div>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">Phone</span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">{formData.phone || '+880 1700 000000'}</span>
                </div>
                <div>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">CV File</span>
                  <span className="font-body-md text-body-md text-secondary font-semibold">resume_john_doe.pdf</span>
                </div>
              </div>
              <div>
                <span className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Cover Letter Preview</span>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3 bg-surface p-3 rounded-lg border border-outline-variant">
                  {formData.coverLetter || 'No cover letter provided. I am extremely interested in joining TechCorp BD and working on Frontend technologies.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center gap-4">
        <button 
          onClick={() => setStep(Math.max(1, step - 1))} 
          disabled={step === 1} 
          className="border border-outline-variant bg-surface-container-lowest px-6 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-outline-variant disabled:hover:text-on-surface-variant transition-all shadow-sm"
        >
          Previous
        </button>
        <button 
          onClick={() => {
            if (step === 4) {
              alert('Application submitted successfully!');
            } else {
              setStep(step + 1);
            }
          }} 
          className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-secondary hover:shadow-md transition-all"
        >
          {step === 4 ? 'Submit Application' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default ApplyJob;

