const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taxNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    administration: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
        default: 0
    },
})

module.exports = mongoose.model('Clients', clientSchema)
