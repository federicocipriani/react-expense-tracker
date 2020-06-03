const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// Connect to the MongoDB
connectDB();

// Import the router
const transactions = require('./routes/transactions')

const app = express();

// It allows to use the body parser
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount the router - API route
app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
    // Set the static folder
    app.use(express.static('client/build'));
    
    // Any request, except the API routes, will be directed to the index.html
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client','build','index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));