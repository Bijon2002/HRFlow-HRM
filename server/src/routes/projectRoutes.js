const express = require('express');
const { createProject, getProjects, createTask, getTasks, updateTaskStatus } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getProjects)
  .post(protect, authorize('hr', 'admin'), createProject);

router.post('/tasks', protect, authorize('hr', 'admin'), createTask);
router.get('/:projectId/tasks', protect, getTasks);
router.put('/tasks/:id', protect, updateTaskStatus);

module.exports = router;
