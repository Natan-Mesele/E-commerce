import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../Redux/booking/Action';

const CarDetail = ({ car, onClose }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const dispatch = useDispatch();  // Get the dispatch function from useDispatch

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const calculateTotalAmount = (startDate, endDate, pricePerDay) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.ceil((end - start) / (1000 * 3600 * 24)); // Calculate days
        if (duration < 1) return 0; // If the duration is less than 1 day, set to 0
        return duration * pricePerDay; // Calculate total cost
    };

    const handleBookNow = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            console.error("Invalid dates");
            return;
        }
        const rentalDuration = Math.ceil((end - start) / (1000 * 3600 * 24));
    
        if (rentalDuration <= 0) {
            console.error("Invalid rental duration");
            return;
        }
        const totalAmount = rentalDuration * car.pricePerDay;
        const bookingData = {
            carId: car._id,
            rentalStartDate: startDate,
            rentalEndDate: endDate,
            rentalDuration,
            totalAmount,
        };
        dispatch(createBooking(bookingData));
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full sm:max-w-lg md:max-w-2xl">
                <h1 className="text-4xl font-bold text-center text-gray-800">{car.name}</h1>
                <img
                    src={car.images[0]}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-64 object-cover rounded-lg mt-4 shadow-md"
                />
                <div className="mt-6 space-y-3">
                    <p className="text-center text-gray-600 text-lg">{car.brand} - {car.model} ({car.year})</p>
                    <div className="space-y-2">
                        <p><strong className="text-gray-800">Seats:</strong> {car.seats}</p>
                        <p><strong className="text-gray-800">Transmission:</strong> {car.transmission}</p>
                        <p><strong className="text-gray-800">Fuel Type:</strong> {car.fuelType}</p>
                        <p className="text-2xl font-semibold text-blue-600">
                            ${car.pricePerDay}/day
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <label className="block text-gray-700 font-semibold">
                        <span>Rental Start Date:</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="mt-2 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>

                    <label className="block text-gray-700 font-semibold">
                        <span>Rental End Date:</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="mt-2 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                </div>

                <div className="mt-6 space-x-4 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleBookNow}
                        className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300 focus:outline-none"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
