const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    }
    catch (err) {
        console.log(`Error: ${err.message}`.red)
        process.exit(1); // Exit with failure
    }
}

// Export module so we can use it
module.exports = connectDB;