const express = require('express');
const router = express.Router();
const {
    getResources,
    createResource,
    getResourceById,
    updateResource,
    deleteResource
} = require('../controllers/resourceController');

router.get('/', getResources);
router.post('/', createResource);
router.get('/:id', getResourceById);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

module.exports = router;