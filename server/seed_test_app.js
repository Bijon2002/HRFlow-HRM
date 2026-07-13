const mongoose = require('mongoose');
const User = require('./src/models/User');
const Internship = require('./src/models/Internship');
const Application = require('./src/models/Application');
require('dotenv').config();

const seedDummyApplication = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // 1. Create a dummy candidate
    let candidate = await User.findOne({ email: 'candidate@test.com' });
    if (!candidate) {
      candidate = new User({
        name: 'John Doe (Test Candidate)',
        email: 'candidate@test.com',
        password: 'password123',
        role: 'candidate'
      });
      await candidate.save();
    }

    // 2. Create a dummy job
    let job = await Internship.findOne({ title: 'Software Engineer Intern' });
    if (!job) {
      job = new Internship({
        title: 'Software Engineer Intern',
        company: 'HRFlow Tech',
        location: 'Remote',
        type: 'Full-time',
        description: 'Test job for AI screening.',
        tags: ['React', 'Node.js', 'Python'],
        status: 'Open'
      });
      await job.save();
    }

    // 3. Create a dummy application
    let app = await Application.findOne({ candidateId: candidate._id, internshipId: job._id });
    if (!app) {
      app = new Application({
        candidateId: candidate._id,
        internshipId: job._id,
        status: 'Applied',
        quizScore: 0,
        aiAnalysis: {}
      });
      await app.save();
      console.log('Dummy application created successfully! Check the CV Screening page now.');
    } else {
      console.log('Dummy application already exists.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding application:', err);
    process.exit(1);
  }
};

seedDummyApplication();
