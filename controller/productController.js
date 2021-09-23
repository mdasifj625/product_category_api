const Product = require('../model/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/APIFeatures');

//Create a new Produt 
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

// Get a Specific product
exports.getProduct = catchAsync(
    async (req, res, next) => {

        //Quering product by Id commit from parameter 
        // Hiding __v
        const query = Product.findById(req.params.id)
            .select('-__v');

        // Awaiting the query to get actual result
        const product = await query;

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('No Product found for given id', 404));
        }

        // Send response
        res.status(200)
            .json({
                status: "success",
                data: {
                    data: product
                }
            });
    }
);

// Get All Products
exports.getAllProducts = catchAsync(
    async (req, res, next) => {

        // Execute the query with somany features 
        const features = new APIFeatures(Product.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // Awaiting the query at the end to get actual result
        const product = await features.query;

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

// Update a specific product
exports.updateProduct = catchAsync(
    async (req, res, next) => {
        // Find query with Id comming from parameter and update it with data comming from req body
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('No product found with given id', 404));
        }

        // Send response
        res.status(200).json({
            status: 'success',
            data: {
                data: product
            }
        });
    }
);

// Delete Specific product
exports.deleteProduct = catchAsync(
    async (req, res, next) => {
        
        // Find product by Id commig from parameter and delete it
        const product = await Product.findByIdAndDelete(req.params.id);

        // Return an error if tour is not found
        if (!product) {
            return next(new AppError('No product was found with given id', 404));
        }
        // Send response
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
);