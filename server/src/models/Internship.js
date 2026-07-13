const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, default: 'Full-time' },
  salary: { type: String },
  tags: [String],
  timeline: { type: String },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  assessmentConfig: { type: Object },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', InternshipSchema);
