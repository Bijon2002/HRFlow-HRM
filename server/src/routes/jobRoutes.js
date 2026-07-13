const express = require('express');
const { getInternships, createInternship, applyToInternship, getApplications, updateApplicationStatus } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// All job routes now require authentication
router.route('/')
  .get(protect, getInternships)
  .post(protect, authorize('hr', 'admin'), createInternship);

router.post('/apply', protect, authorize('candidate'), applyToInternship);
router.get('/applications', protect, getApplications);
router.put('/applications/:id', protect, authorize('hr', 'admin'), updateApplicationStatus);

module.exports = router;
