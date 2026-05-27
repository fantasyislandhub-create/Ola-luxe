const mongoose = require('mongoose');

const connectDB = async () => {
    let MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        console.error('MONGODB_URI is not defined in .env');
        return;
    }

    // Clean the URI in case it includes the variable name
    if (MONGODB_URI.startsWith('MONGODB_URI=')) {
        MONGODB_URI = MONGODB_URI.replace('MONGODB_URI=', '');
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        if (process.env.NODE_ENV !== 'production') console.log('MongoDB connected');
    } catch (err) {
        console.error('DB connection failed');
        process.exit(1);
    }
};

module.exports = connectDB;
