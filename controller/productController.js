const Product = require('../model/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

exports.createProduct = catchAsync(
    async (req, res, next) => {

        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: product
            }
        });

    }
);

exports.getProduct = catchAsync(
    async (req, res, next) => {

        const query = Product.findById(req.params.id).select('-__v');
        const product = await query;

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('No Product found for given id', 404));
        }

        // const tour = Tour.findOne({ _id: req.prams.id });
        res.status(200)
            .json({
                status: "success",
                data: {
                    data: product
                }
            });
    }
);

exports.getAllProducts = catchAsync(
    async (req, res, next) => {

        // Execute the query
        const features = new APIFeatures(Product.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const product = await features.query;
        // .explain();

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('Product not found', 404));
        }

        // Send Response
        res.status(200).json({
            status: 'success',
            results: product.length,
            data: {
                data: product
            }
        });
    }
);

exports.updateProduct = catchAsync(
    async (req, res, next) => {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('No product found with given id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: product
            }
        });
    }
);

exports.deleteProduct = catchAsync(
    async (req, res, next) => {
        const product = await Product.findByIdAndDelete(req.params.id);

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('No product was found with given id', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);