const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//load env vars
dotenv.config({
    path: './config/config.env'
});

//Connect to database
connectDB();

//Route files
const hackathons = require('./routes/hackathons');
const auth = require('./routes/auth');

const app = express();

//Body parser
app.use(express.json());

//Dev middleware Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    console.log(`${process.env.NODE_ENV} mode running.`);
}

//Mount routers
app.use('/api/v1/hackathons', hackathons);
app.use('/api/v1/auth', auth);

//access env vars
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
        .brightBlue.bold
    )
);

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold.underline);
    //close server and exit process
    server.close(() => process.exit(1));
});