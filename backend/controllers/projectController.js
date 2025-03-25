const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to verify token (moved from middleware)
 // No token provided


// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
    const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
    const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, description, startDate, endDate, budget } = req.body;

    try {
        const newProject = new Project({
            name,
            description,
            startDate,
            endDate,
            budget
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
    const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
    const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, description, startDate, endDate, budget } = req.body;

    const projectFields = {};
    if (name) projectFields.name = name;
    if (description) projectFields.description = description;
    if (startDate) projectFields.startDate = startDate;
    if (endDate) projectFields.endDate = endDate;
    if (budget) projectFields.budget = budget;

    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project = await Project.findByIdAndUpdate(req.params.id, { $set: projectFields }, { new: true });

        res.json(project);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
     const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await Project.findByIdAndRemove(req.params.id);

        res.json({ message: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject
};