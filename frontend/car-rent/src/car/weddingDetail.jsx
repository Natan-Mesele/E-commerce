import React, { useEffect, useState } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchWeddingCarById } from '../Redux/weddingcar/Action';

function WeddingDetail() {
    const { carId } = useParams(); // Get car ID from URL
    const dispatch = useDispatch();
    const { carDetail, loading, error } = useSelector((state) => state.weddingCar);

    // State for handling rental dates
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Event handlers to handle changes in the date inputs
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    useEffect(() => {
        dispatch(fetchWeddingCarById(carId)); // Fetch car details by ID
    }, [dispatch, carId]);

    const handleBookNow = () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }
        alert(`Booking confirmed for ${carDetail.name} from ${startDate} to ${endDate}.`);
    };

    return (
        <div className="wedding-detail">
            {loading ? (
                <p className="text-center text-gray-600">Loading car details...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
            ) : carDetail ? (
                <div className="bg-white">
                    {/* Container for image and text overlay */}
                    <div className="relative">
                        <img
                            className="w-full h-64 object-cover rounded mb-4"
                            src={carDetail.images[0]}
                            alt={carDetail.name}
                        />

                        {/* Centered text for name and brand with improved background */}
                        <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2">
                            <h2 className="text-2xl md:text-3xl font-bold">{carDetail.name}</h2>
                            <p className="text-lg">{carDetail.brand}</p>
                        </div>
                    </div>

                    <div className="mx-auto px-4 max-w-5xl lg:px-12 py-6">
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                <span className="font-semibold">Price per day:</span> ${carDetail.pricePerDay}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Seats:</span> {carDetail.seats}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Transmission:</span> {carDetail.transmission}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Fuel Type:</span> {carDetail.fuelType}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Description:</span> {carDetail.description}
                            </p>
                        </div>

                        {/* Rental dates section */}
                        <div className="mt-6 space-y-4">
                            <label className="block text-gray-700 font-semibold">
                                Rental Start Date:
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className="mt-2 p-3 border-2 border-gray-300 rounded-lg w-full"
                                />
                            </label>
                            <label className="block text-gray-700 font-semibold">
                                Rental End Date:
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    className="mt-2 p-3 border-2 border-gray-300 rounded-lg w-full"
                                />
                            </label>
                        </div>

                        {/* Book Now button */}
                        <div className="mt-6">
                            <button
                                onClick={handleBookNow}
                                className="bg-custom-secondary text-white py-3 px-6 rounded-lg shadow-md hover:bg-custom-primary w-full"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">No car details found.</p>
            )}
        </div>
    );
}

export default WeddingDetail;
