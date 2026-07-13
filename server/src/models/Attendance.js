const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clockIn: { type: Date, required: true },
  clockOut: { type: Date },
  date: { type: String, required: true }, // e.g. "YYYY-MM-DD"
  totalHours: { type: Number, default: 0 }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
