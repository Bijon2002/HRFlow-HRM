const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (HR/Admin)
const createProject = async (req, res) => {
  const { name, client, requiredSkills, startDate, status } = req.body;

  try {
    const project = new Project({ name, client, requiredSkills, startDate, status });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/projects/tasks
// @access  Private (HR/Admin)
const createTask = async (req, res) => {
  const { projectId, assignedTo, title, status } = req.body;

  try {
    const task = new Task({ projectId, assignedTo, title, status });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tasks
// @route   GET /api/projects/:projectId/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task status
// @route   PUT /api/projects/tasks/:id
// @access  Private
const updateTaskStatus = async (req, res) => {
  const { status, hoursLogged } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      task.status = status || task.status;
      if (hoursLogged !== undefined) {
        task.hoursLogged = hoursLogged;
      }
      const updated = await task.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, createTask, getTasks, updateTaskStatus };
