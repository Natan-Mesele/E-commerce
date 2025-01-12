import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import CarDetail from './CarDetail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCars } from '../Redux/car/Action';

const CarList = () => {
    const [selectedCar, setSelectedCar] = useState(null); // To hold selected car
    const [showPopup, setShowPopup] = useState(false); // To control the visibility of the pop-up
    const dispatch = useDispatch();
    const { cars, loading, error } = useSelector((state) => state.cars);

    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);

    const handleBookNow = (car) => {
        setSelectedCar(car); // Set the selected car
        setShowPopup(true);   // Show the popup
    };

    const closePopup = () => {
        setShowPopup(false);  // Close the popup
        setSelectedCar(null);  // Clear the selected car
    };

    return (
        <div className="py-12 px-6 mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Cars for Rent
            </h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading cars...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(Array.isArray(cars) && cars.length > 0) ? (
                        cars.map((car, index) => (
                            <CarCard key={index} car={car} onBookNow={() => handleBookNow(car)} />
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No cars available</p>
                    )}
                </div>
            )}

            {showPopup && selectedCar && (
                <CarDetail car={selectedCar} onClose={closePopup} />
            )}
        </div>
    );
};

export default CarList;