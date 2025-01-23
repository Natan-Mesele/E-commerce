import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CarCard = ({ car }) => {
    const navigate = useNavigate();

    const handleRentNowClick = () => {
        const jwt = localStorage.getItem('jwt');

        if (!jwt) {
            toast.warning('Please login to book a car.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Navigate to the car details page if the user is logged in
        navigate(`/car-detail/${car._id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative">
                <img
                    src={car.images[0]}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{car.name}</h2>
                    <p className="text-white">{car.brand} - {car.model} ({car.year})</p>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-3 text-gray-700">
                    <p><strong>Seats:</strong> {car.seats}</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                    <p className="text-2xl font-semibold text-black">${car.pricePerDay}/day</p>
                </div>
                <button 
                    onClick={handleRentNowClick}
                    className="mt-6 w-full py-3 px-6 rounded-lg bg-custom-primary text-white font-semibold hover:bg-custom-secondary hover:text-white transition duration-300"
                >
                    Rent Now
                </button>
            </div>
        </div>
    );
};

export default CarCard;
