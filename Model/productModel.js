const mongoose = require('mongoose')
const productModel = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        default: 'Retro Route',
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        default: 'CAD',
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    countInStock: {
        type: Number,
        default: 0,
        min: 0,
    },
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('Product', productModel)