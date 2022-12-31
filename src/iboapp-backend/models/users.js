const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    activity: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Users', userSchema)
