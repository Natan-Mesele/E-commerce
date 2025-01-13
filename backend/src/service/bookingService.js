const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");

module.exports = {
    async calculateTotalAmount(carId, rentalStartDate, rentalEndDate) {
        try {
            // Fetch the car details
            const car = await Car.findById(carId);
            if (!car) {
                throw new Error('Car not found');
            }
    
            // Ensure pricePerDay is valid
            const pricePerDay = car.pricePerDay;
            if (!pricePerDay || pricePerDay <= 0) {
                throw new Error('Invalid car price per day');
            }
    
            // Calculate rental duration in days
            const startDate = new Date(rentalStartDate);
            const endDate = new Date(rentalEndDate);
            const rentalDurationInDays = (endDate - startDate) / (1000 * 3600 * 24);
            console.log('Rental duration (days):', rentalDurationInDays);
    
            if (rentalDurationInDays <= 0) {
                throw new Error('Invalid rental dates');
            }
    
            // Calculate total amount
            const totalAmount = pricePerDay * rentalDurationInDays;
            console.log('Total amount:', totalAmount);
    
            return totalAmount;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async createBooking(userId, carId, rentalStartDate, rentalEndDate) {
        try {
            // Fetch the car details
            const car = await Car.findById(carId);
            if (!car) {
                throw new Error('Car not found');
            }
    
            // Check if the car has sufficient availability
            if (car.availability <= 0) {
                throw new Error('No availability for this car');
            }
    
            // Calculate the total amount
            const totalAmount = await this.calculateTotalAmount(carId, rentalStartDate, rentalEndDate);
    
            // Create the booking
            const booking = await Booking.create({
                user: userId,
                car: carId,
                rentalStartDate,
                rentalEndDate,
                totalAmount,
            });
    
            // Decrease the car's availability
            car.availability -= 1;
            await car.save(); // Save the updated availability
    
            return booking;
        } catch (error) {
            throw new Error(error.message);
        }
    },    

    async getBookingById(bookingId) {
        try {
            const booking = await Booking.findById(bookingId).populate('car user');
            if (!booking) {
                throw new Error("Booking not found");
            }
            return booking;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Update booking
    async updateBooking(bookingId, updatedData) {
        try {
            const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });
            if (!updatedBooking) {
                throw new Error("Booking not found");
            }
            return updatedBooking;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Delete booking
    async deleteBooking(bookingId) {
        try {
            const deletedBooking = await Booking.findByIdAndDelete(bookingId);
            if (!deletedBooking) {
                throw new Error("Booking not found");
            }
            return deletedBooking;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Get all bookings for a user
    async getAllBookingsForUser(userId) {
        try {
            const bookings = await Booking.find({ user: userId }).populate('car');
            return bookings;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
