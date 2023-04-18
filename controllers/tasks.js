const Task = require("../models/tasks") 
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
})

const createTask = asyncWrapper(async (req, res) => { 
    const task = await Task.create(req.body)
    res.status(202).json({ task })
}
)

const getTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id ${taskID}`, 404))
        // return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) { 
        return next(createCustomError(`No task with id ${taskID}`, 404))
        // return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({task})
    // res.status(200).send({task})
    // res.status(200).json({ task: null, status: "success" })
})

const updateTask = asyncWrapper(async (req, res) => { 
    const { id: taskID } = req.params;

    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!task) { 
        return next(createCustomError(`No task with id ${taskID}`, 404))
        // return res.status(404).json({msg:`No task with id ${taskID}`})
    }
    res.status(200).json({task})
    // res.status(200).json({ id: taskID, data: req.body })
})

module.exports = { 
    getAllTasks,
    createTask,
    getTask, 
    deleteTask,
    updateTask,
    // editTask,
}

// app.get('/api/v1/tasks')             get all tasks
// app.post('/api/v1/tasks')            create a task
// app.get('/api/v1/tasks/:id')         get a task
// app.patch('/api/v1/tasks/:id')       update a task



// const editTask = async (req, res) => { 
//     try {
//         const { id: taskID } = req.params;

//         const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators: true,
//             overwrite: true // neccessary coz mongoose auto handles put request as patch
//         })
//         if (!task) { 
//             return res.status(404).json({msg:`No task with id ${taskID}`})
//         }
//         res.status(200).json({task})
//         // res.status(200).json({ id: taskID, data: req.body })
//     } catch (error) {
//         res.status(500).json({msg : error})   
//     }
// }
// app.delete('/api/v1/tasks/:id')      delete a task