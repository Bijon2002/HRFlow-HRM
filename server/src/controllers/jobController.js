const Internship = require('../models/Internship');
const Application = require('../models/Application');

// @desc    Get all internships
// @route   GET /api/jobs
// @access  Public
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({});
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new internship post
// @route   POST /api/jobs
// @access  Private (HR/Admin)
const createInternship = async (req, res) => {
  const { title, company, location, type, salary, tags, timeline } = req.body;

  try {
    const internship = new Internship({
      title,
      company,
      location,
      type,
      salary,
      tags,
      timeline,
      postedBy: req.user._id
    });

    const created = await internship.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for an internship
// @route   POST /api/jobs/apply
// @access  Private (Candidate)
const applyToInternship = async (req, res) => {
  const { internshipId, resumeUrl, coverLetter } = req.body;

  try {
    const alreadyApplied = await Application.findOne({ candidateId: req.user._id, internshipId });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this internship' });
    }

    const application = new Application({
      candidateId: req.user._id,
      internshipId,
      status: 'Applied',
      stage: 'Application Submitted',
      stageNum: 1,
      resumeUrl
    });

    const created = await application.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications
// @route   GET /api/jobs/applications
// @access  Private (HR/Candidate)
const getApplications = async (req, res) => {
  try {
    let applications;
    if (req.user.role === 'hr' || req.user.role === 'admin') {
      applications = await Application.find({}).populate('candidateId', 'name email').populate('internshipId');
    } else {
      applications = await Application.find({ candidateId: req.user._id }).populate('internshipId');
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/jobs/applications/:id
// @access  Private (HR/Admin)
const updateApplicationStatus = async (req, res) => {
  const { status, stage, stageNum } = req.body;

  try {
    const application = await Application.findById(req.params.id);

    if (application) {
      application.status = status || application.status;
      application.stage = stage || application.stage;
      application.stageNum = stageNum !== undefined ? stageNum : application.stageNum;

      const updated = await application.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInternships,
  createInternship,
  applyToInternship,
  getApplications,
  updateApplicationStatus
};
