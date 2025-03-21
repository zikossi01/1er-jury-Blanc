const express = require('express');
const router = express.Router();

const {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

router.get('/:projectId', getTasks);
router.post('/', createTask);
router.get('/task/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;