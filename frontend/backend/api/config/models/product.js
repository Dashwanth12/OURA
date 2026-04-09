const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        required: true
    },

    originalPrice: {
        type:Number,
        default: 0,
        required: true
    },

    category: {
        type: String,
        required: true,
        lowercase: true
    },

    color: {
        type: String
    },

    imageUrl: {
        type: String
    },

    gallery: [
        {type: String}
    ],

    averageRating: {
        type: Number,
        default: 0
    },

    ratingsCount: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    stock: {
        type: Number,
        default: 10,
        min: 0  
    },

 
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)