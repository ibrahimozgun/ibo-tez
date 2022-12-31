const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Products', ProductSchema)
