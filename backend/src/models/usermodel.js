const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String, 
    phoneNumber: String,
    role:{
        type:String,
        default: 'ROLE_USER',
        enum: ['ROLE_USER', 'ROLE_ADMIN']
    },
    rentals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental', // Reference to the Rental model
    }],
    favorites: [{
        carId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car', // Reference to the Car model
        },
    }],
    addresses: [{
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    }],
    driverLicense: {
        licenseNumber: String,
        issueDate: Date,
        expiryDate: Date,
    },
    paymentMethods: [{
        cardType: String,
        cardNumber: String,
        expiryDate: String,
    }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;