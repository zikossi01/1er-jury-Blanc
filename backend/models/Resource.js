const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    supplierInfo: {
        type: String
    }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;