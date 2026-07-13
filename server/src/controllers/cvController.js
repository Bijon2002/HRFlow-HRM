const multer = require('multer');
const Application = require('../models/Application');

// Configure multer for memory storage (PDF buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// URL of the Python AI Microservice
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// @desc    Analyze a CV using the Python AI Microservice
// @route   POST /api/cv/analyze
// @access  Private (HR/Admin)
const analyzeCv = async (req, res) => {
  try {
    const { applicationId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    // Prepare FormData to send to Python service
    const formData = new FormData();
    // Convert Node buffer to Blob-like object for fetch
    const fileBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
    formData.append('file', fileBlob, req.file.originalname);

    // Call Python AI Microservice
    const response = await fetch(`${AI_SERVICE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Service Error:', errorText);
      return res.status(response.status).json({ message: 'AI Service failed to analyze CV' });
    }

    const data = await response.json();
    
    if (!data.success || !data.analysis) {
      return res.status(500).json({ message: 'AI Service returned invalid response format' });
    }

    const analysis = data.analysis;
    analysis.analyzedAt = new Date();

    // If applicationId is provided, store the analysis
    if (applicationId) {
      const application = await Application.findById(applicationId);
      if (application) {
        application.aiAnalysis = analysis;
        await application.save();
      }
    }

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('CV Analysis Error:', error.message);
    res.status(500).json({ message: 'Failed to communicate with AI Service: ' + error.message });
  }
};

// @desc    Get stored AI analysis for an application
// @route   GET /api/cv/analysis/:applicationId
// @access  Private (HR/Admin)
const getAnalysis = async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate('candidateId', 'name email')
      .populate('internshipId', 'title');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (!application.aiAnalysis || !application.aiAnalysis.score) {
      return res.status(404).json({ message: 'No AI analysis found for this application' });
    }

    res.json({
      candidate: application.candidateId,
      position: application.internshipId?.title,
      analysis: application.aiAnalysis
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { analyzeCv, getAnalysis, upload };
