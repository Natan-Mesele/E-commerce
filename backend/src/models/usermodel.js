const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    name: {  // Changed from fullName to name
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
    },
    photoUrl: {
        type: String,  
    },
    phoneNumber: String,
    role: {
        type: String,
        default: 'ROLE_USER',
        enum: ['ROLE_USER', 'ROLE_ADMIN'],
    },
    rentals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental', 
    }],
    favorites: [{
        carId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Car', 
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
    uid: {
        type: String, 
        unique: true,
    },
}, {
    timestamps: true, 
});

UserSchema.pre('save', function (next) {
    if (!this.uid) {
        this.uid = uuidv4(); // Generate a unique uid
    }
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
