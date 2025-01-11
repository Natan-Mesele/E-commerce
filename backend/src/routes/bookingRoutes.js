const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const bookingController = require('../controller/bookingController');

router.post('/create', authenticate, bookingController.createBooking);
router.get('/:bookingId', authenticate, bookingController.getBookingById);
router.put('/:bookingId', authenticate, bookingController.updateBooking);
router.delete('/:bookingId', authenticate, bookingController.deleteBooking);
router.get('/', authenticate, bookingController.getAllBookingsForUser);

module.exports = router;
