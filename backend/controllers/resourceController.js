const Resource = require('../models/Resource');
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

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res) => {
         const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private
const createResource = async (req, res) => {
         const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    const { name, type, quantity, supplierInfo } = req.body;

    try {
        const newResource = new Resource({
            name,
            type,
            quantity,
            supplierInfo
        });

        const resource = await newResource.save();
        res.json(resource);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get resource by ID
// @route   GET /api/resources/:id
// @access  Private
const getResourceById = async (req, res) => {
         const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json(resource);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
const updateResource = async (req, res) => {
     const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    const { name, type, quantity, supplierInfo } = req.body;

    const resourceFields = {};
    if (name) resourceFields.name = name;
    if (type) resourceFields.type = type;
    if (quantity) resourceFields.quantity = quantity;
    if (supplierInfo) resourceFields.supplierInfo = supplierInfo;

    try {
        let resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        resource = await Resource.findByIdAndUpdate(req.params.id, { $set: resourceFields }, { new: true });

        res.json(resource);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = async (req, res) => {
         const decoded = verifyToken(req);
    if (!decoded) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        await Resource.findByIdAndRemove(req.params.id);

        res.json({ message: 'Resource removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getResources,
    createResource,
    getResourceById,
    updateResource,
    deleteResource
};