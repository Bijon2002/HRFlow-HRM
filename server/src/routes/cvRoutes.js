const express = require('express');
const { analyzeCv, getAnalysis, upload } = require('../controllers/cvController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

// AI CV analysis — HR/Admin only
router.post('/analyze', protect, authorize('hr', 'admin'), upload.single('cv'), analyzeCv);
router.get('/analysis/:applicationId', protect, authorize('hr', 'admin'), getAnalysis);

module.exports = router;
