const express = require('express');
const router = express.Router();
const { getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    editTask, } = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)//.put(editTask)

// app.get('/api/v1/tasks')
// app.post('/api/v1/tasks')
// app.get('/api/v1/tasks/:id')
// app.patch('/api/v1/tasks/:id')
// app.delete('/api/v1/tasks/:id')

module.exports = router