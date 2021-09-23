const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'Category must have a name'],
        unique: true
    }
});


// Create Model out of Schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
