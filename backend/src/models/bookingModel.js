const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rentalStartDate: {
        type: Date,
        required: true
    },
    rentalEndDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
