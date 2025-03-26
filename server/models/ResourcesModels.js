const mongoose = require('mongoose')

const resourcesSchema = new mongoose.Schema({
    task:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'tasks',
        required: true
    },
    Rname: {
        type: String,
        required: true
    },
    Rtype: {
        type: String,
        required: true
    },
    Rquantity: {
        type: Number,
        required: true
    },
    Rsupplier: {
        type: String,
        required: true
    }
}) 

const resource = mongoose.model('resources', resourcesSchema)
module.exports = resource 