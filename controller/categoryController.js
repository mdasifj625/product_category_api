const Category = require('../model/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

//Create a new Category 
exports.createCategory = catchAsync(
    async (req, res, next) => {

        const category = await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: category
            }
        });

    }
);

// Get a Specific Category
exports.getCategory = catchAsync(
    async (req, res, next) => {


        //Quering category by Id commit from parameter 
        // Hiding __v
        const query = Category.findById(req.params.id).select('-__v');
        const category = await query;

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('No Category found for given id', 404));
        }

        // Send response
        res.status(200)
            .json({
                status: "success",
                data: {
                    data: category
                }
            });
    }
);

// Get all Categories
exports.getAllCategories = catchAsync(
    async (req, res, next) => {

        // Execute the query with somany features 
        const features = new APIFeatures(Category.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // Awaiting the query at the end to get actual result
        const category = await features.query;

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('Category not found', 404));
        }

        // Send Response
        res.status(200).json({
            status: 'success',
            results: category.length,
            data: {
                data: category
            }
        });

    }
);

// Update a specific product
exports.updateCategory = catchAsync(
    async (req, res, next) => {

        // Find query with Id comming from parameter and update it with data comming from req body
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('No category found with given id', 404));
        }
        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                data: category
            }
        });
    }
);

// Delete Specific product
exports.deleteCategory = catchAsync(
    async (req, res, next) => {

        // Find category by Id commig from parameter and delete it
        const category = await Category.findByIdAndDelete(req.params.id);

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('No category was found with given id', 404));
        }
        // Send respounse
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);