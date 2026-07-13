const express = require('express');
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updatePassword, 
  getUsers, 
  adminCreateUser, 
  adminUpdateUser, 
  adminDeleteUser 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Public routes — rate limited
router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/password', protect, updatePassword);

// User management routes (Admin/HR only)
router.route('/users')
  .get(protect, authorize('hr', 'admin'), getUsers)
  .post(protect, authorize('admin'), adminCreateUser);

router.route('/users/:id')
  .put(protect, authorize('admin'), adminUpdateUser)
  .delete(protect, authorize('admin'), adminDeleteUser);

module.exports = router;
