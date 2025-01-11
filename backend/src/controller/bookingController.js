const { getUserIdFromToken } = require("../config/jwtProvider");
const bookingService = require("../service/bookingService");

module.exports = {
    async createBooking(req, res) {
        try {
            // Extract the token from the Authorization header
            const token = req.headers.authorization?.replace('Bearer ', '');  // Remove 'Bearer ' prefix
        
            // Check if the token exists
            if (!token) {
                return res.status(400).json({ message: 'Token not provided' });
            }
        
            // Get user ID from the token
            const userId = getUserIdFromToken(token);  // Assuming the token decoding function works here
        
            // Extract other data from the request body
            const { carId, rentalStartDate, rentalEndDate } = req.body;
        
            // Call the booking service to create the booking
            const booking = await bookingService.createBooking(userId, carId, rentalStartDate, rentalEndDate);
        
            // Respond with success
            res.status(201).json({ message: 'Booking created successfully', booking });
        } catch (error) {
            console.error("Error creating booking:", error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Get booking by ID
    async getBookingById(req, res) {
        const { bookingId } = req.params;
        try {
            const booking = await bookingService.getBookingById(bookingId);
            res.status(200).json({ booking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update booking
    async updateBooking(req, res) {
        const { bookingId } = req.params;
        const updatedData = req.body;
        try {
            const updatedBooking = await bookingService.updateBooking(bookingId, updatedData);
            res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete booking
    async deleteBooking(req, res) {
        const { bookingId } = req.params;
        try {
            const deletedBooking = await bookingService.deleteBooking(bookingId);
            res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all bookings for a user
    async getAllBookingsForUser(req, res) {
        const userId = req.user.id; 
        try {
            const bookings = await bookingService.getAllBookingsForUser(userId);
            res.status(200).json({ bookings });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
