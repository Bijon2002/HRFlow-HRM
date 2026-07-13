const mongoose = require('mongoose');
const User = require('../models/User');

const seedDefaultUsers = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@hrflow.app' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@hrflow.app',
        password: 'Admin123!',
        role: 'admin',
        dept: 'Management',
        phone: '+880 1700 000000',
        status: 'Active'
      });
      console.log('Seeded admin user');
    }

    const hrExists = await User.findOne({ email: 'hr@hrflow.app' });
    if (!hrExists) {
      await User.create({
        name: 'Aisha Rahman',
        email: 'hr@hrflow.app',
        password: 'HrManager123!',
        role: 'hr',
        dept: 'HR Department',
        phone: '+880 1700 000001',
        status: 'Active'
      });
      console.log('Seeded HR manager');
    }

    const employeeExists = await User.findOne({ email: 'employee@hrflow.app' });
    if (!employeeExists) {
      await User.create({
        name: 'Tanvir Khan',
        email: 'employee@hrflow.app',
        password: 'Employee123!',
        role: 'employee',
        dept: 'Engineering',
        phone: '+880 1700 000002',
        status: 'Active'
      });
      console.log('Seeded employee');
    }

    const candidateExists = await User.findOne({ email: 'candidate@hrflow.app' });
    if (!candidateExists) {
      await User.create({
        name: 'Lin Wei',
        email: 'candidate@hrflow.app',
        password: 'Candidate123!',
        role: 'candidate',
        dept: 'General',
        phone: '+880 1700 000003',
        status: 'Active'
      });
      console.log('Seeded candidate');
    }
  } catch (error) {
    console.error('Error seeding default users:', error.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultUsers();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
