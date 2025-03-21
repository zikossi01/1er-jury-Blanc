const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// Helper function to verify token (moved from middleware)
const verifyToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded; // Return the decoded payload
        } catch (error) {
            return null; // Token is invalid or expired
        }
    }
    return null; // No token provided
};


// @desc    Get all tasks for a project
// @route   GET /api/tasks/:projectId
// @access  Private
const getTasks = async (req, res) => {
      const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const tasks = await Task.find({ project: req.params.projectId }).populate('resources');
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
      const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const { project, description, startDate, endDate, resources } = req.body;

    try {
        const newTask = new Task({
            project,
            description,
            startDate,
            endDate,
            resources
        });

        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get task by ID
// @route   GET /api/tasks/task/:id
// @access  Private
const getTaskById = async (req, res) => {
     const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const task = await Task.findById(req.params.id).populate('resources');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
        const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const { description, startDate, endDate, resources } = req.body;

    const taskFields = {};
    if (description) taskFields.description = description;
    if (startDate) taskFields.startDate = startDate;
    if (endDate) taskFields.endDate = endDate;
    if (resources) taskFields.resources = resources;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true }).populate('resources');

        res.json(task);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
         const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndRemove(req.params.id);

        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
};