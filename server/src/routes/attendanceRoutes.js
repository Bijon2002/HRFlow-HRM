const express = require('express');
const { clockIn, clockOut, getAttendance } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getAttendance);

router.post('/clockin', protect, clockIn);
router.post('/clockout', protect, clockOut);

module.exports = router;
