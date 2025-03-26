const mongoose = require ('mongoose')
const projects = require('./ProjectModels')

const TaskSchema = new mongoose.Schema({
    project:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project',
        required: true
    },
    Tdescription:{
        type: String,
        required: true
    },
    TstartDate: {
        type: Date,
        required: true,
    },
    TendDate: {
        type: Date,
        required: true
    },
    Tresources: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('tasks', TaskSchema)
module.exports = Task