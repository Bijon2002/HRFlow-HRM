const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  status: { type: String, enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Offer Sent'], default: 'Applied' },
  stage: { type: String, default: 'Application Submitted' },
  stageNum: { type: Number, default: 1 },
  resumeUrl: { type: String },
  quizScore: { type: Number },
  interviewSlot: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
