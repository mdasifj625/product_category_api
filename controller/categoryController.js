const Category = require('../model/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

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

exports.getCategory = catchAsync(
    async (req, res, next) => {

        const query = Category.findById(req.params.id).select('-__v');
        const category = await query;

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('No Category found for given id', 404));
        }

        // const tour = Tour.findOne({ _id: req.prams.id });
        res.status(200)
            .json({
                status: "success",
                data: {
                    data: category
                }
            });
    }
);

exports.getAllCategories = catchAsync(
    async (req, res, next) => {

        // Execute the query
        const features = new APIFeatures(Category.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

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

exports.updateCategory = catchAsync(
    async (req, res, next) => {

        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('No category found with given id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: category
            }
        });
    }
);

exports.deleteCategory = catchAsync(
    async (req, res, next) => {
        const category = await Category.findByIdAndDelete(req.params.id);

        // Return an error if tour is not found
        if (!category) {
            return next(new AppError('No category was found with given id', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);