const mongoose = require('mongoose');

//Create Schema for product
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product must have a name'],
        unique: true
    },
    quantity: Number,
    unitPrice: Number,
    unitInStock: Number,
    discontinued: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    }
});

// Populate the guide in the list of guide
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: '-__v -_id'
    });
    next();
});


// Create Model out of Schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
