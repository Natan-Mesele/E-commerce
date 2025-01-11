import React from 'react';

const CarCard = ({ car }) => {
    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative">
                <img
                    src={car.images[0]} // Assuming `car.images` is an array
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
                    <p className="text-2xl font-semibold text-blue-600">
                        ${car.pricePerDay}/day
                    </p>
                </div>
                {/* Updated Rent Now button */}
                <button className="mt-6 w-full py-3 px-6 rounded-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg border-2 border-blue-500 hover:bg-white hover:text-blue-200 transition duration-300 transform hover:scale-105">
                    Rent Now
                </button>
            </div>
        </div>
    );
};

export default CarCard;
