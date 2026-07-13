const Attendance = require('../models/Attendance');

// @desc    Clock in
// @route   POST /api/attendance/clockin
// @access  Private
const clockIn = async (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    const existing = await Attendance.findOne({ employeeId: req.user._id, date: todayStr });
    if (existing) {
      return res.status(400).json({ message: 'Already clocked in today' });
    }

    const attendance = new Attendance({
      employeeId: req.user._id,
      clockIn: new Date(),
      date: todayStr
    });

    const saved = await attendance.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clock out
// @route   POST /api/attendance/clockout
// @access  Private
const clockOut = async (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    const attendance = await Attendance.findOne({ employeeId: req.user._id, date: todayStr });
    if (!attendance) {
      return res.status(404).json({ message: 'No clock-in record found for today' });
    }
    if (attendance.clockOut) {
      return res.status(400).json({ message: 'Already clocked out today' });
    }

    attendance.clockOut = new Date();
    const diffMs = attendance.clockOut.getTime() - attendance.clockIn.getTime();
    attendance.totalHours = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2));

    const saved = await attendance.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance logs
// @route   GET /api/attendance
// @access  Private
const getAttendance = async (req, res) => {
  try {
    let logs;
    if (req.user.role === 'hr' || req.user.role === 'admin') {
      logs = await Attendance.find({}).populate('employeeId', 'name email');
    } else {
      logs = await Attendance.find({ employeeId: req.user._id });
    }
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { clockIn, clockOut, getAttendance };
