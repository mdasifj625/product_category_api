const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const productRoutes = require('./router/productRoutes');
const categoryRoutes = require('./router/categoryRoutes');

// Start express app
const app = express();
// Enabling trust proxy for X-Forwarded - Header
app.enable('trust proxy');


// Implement CORS  to access the API from cross origin
app.use(cors());
app.options('*', cors());

// Setup helmet,  It helps securing express app setting up various HTTP headers
app.use(helmet());


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));


// Data Senitization against NoSQL Query injection
app.use(mongoSanitize());

// Data Senitization against XSS
app.use(xss());


// MIddleware to set Content Security Policy header
app.use((req, res, next) => {
    res
        .set("Content-Security-Policy",
            "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");
    next();
});


// routs
app.use(
    '/api/v1/products',
    productRoutes
);
app.use(
    '/api/v1/category',
    categoryRoutes
);

module.exports = app;