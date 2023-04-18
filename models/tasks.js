const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide a name"],
        trim: true,
        maxlength : [25, "name can not be more than 35 characters"]
    },
    completed: {
        type: Boolean, 
        default: false  
    }
})

module.exports = mongoose.model("Task", TaskSchema)  
