require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Route imports
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes = require('./src/routes/jobRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/projects', projectRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('MERN Backend with MongoDB & API routes is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});


