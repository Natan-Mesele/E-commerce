const mongoose = require('mongoose');

const mongodbUrl = "mongodb+srv://huluale12:WVcOo57qDUfYHWIp@cluster0.vaudn.mongodb.net/e-commercen?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};

module.exports = connectDB;