const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: `./config.env`
});
const app = require('./app');


// Atlas Database
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD);


// Local Database Uncoment if you want to use local database
// const DB = 'mongodb://localhost:27017/product_category_api'

// Connect to mongoDb using mongoose
mongoose.connect(
    DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected Successfully!"));



// Setup server and port
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Server is listening on Port no: ${PORT}....`);
});

// Stop server for unhandled rejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!, Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});