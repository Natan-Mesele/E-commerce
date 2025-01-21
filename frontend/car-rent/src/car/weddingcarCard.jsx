import React from 'react';
import { useNavigate } from 'react-router-dom';

function WeddingCarCard({ car }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/wedding-detail/${car._id}`); // Navigate to the detail page
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={car.images[0]}
          alt={`${car.name}`}
        />
        <div className="absolute inset-x-0 bottom-2 text-center text-white text-sm">
          <p className="font-bold text-gray-50">{car.name}</p>
          <p className="text-gray-50">{car.brand}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600">
          <span className="font-semibold">Price per day:</span> ${car.pricePerDay}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Seats:</span> {car.seats}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleBookNow}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeddingCarCard;
