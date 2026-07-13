const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const createHRUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if HR user already exists
    let hrUser = await User.findOne({ email: 'hr@hrflow.com' });
    
    if (!hrUser) {
      hrUser = new User({
        name: 'HR Manager',
        email: 'hr@hrflow.com',
        password: 'password123',
        role: 'hr'
      });
      await hrUser.save();
      console.log('HR User created successfully!');
    } else {
      console.log('HR User already exists!');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating HR user:', err);
    process.exit(1);
  }
};

createHRUser();
