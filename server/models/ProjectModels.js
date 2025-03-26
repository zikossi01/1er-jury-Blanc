const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    Pname: {
        type: String,
        required: true
    },
    Pdescription: {
        type: String,
        required: true
    },
    PstartDate: {
        type: Date,
        required: true
    },
    PendDate: {
        type: Date,
        required: true
    },
    Pbudget: {
        type: Number,
        required: true, 
        min: 0
    }
})

const project = mongoose.model('Project', projectSchema)
module.exports = project