import React from 'react';
import CarCard from './CarCard';

const CarList = () => {
    const car = [
        {
            "name": "Tesla Model S",
            "brand": "Tesla",
            "model": "Model S",
            "year": 2022,
            "pricePerDay": 100,
            "seats": 5,
            "transmission": "Automatic",
            "fuelType": "Electric",
            "images": [
                "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ]
        },
        {
            "name": "Toyota Corolla Altis",
            "brand": "Toyota",
            "model": "Altis",
            "year": 2021,
            "pricePerDay": 50,
            "seats": 5,
            "transmission": "Automatic",
            "fuelType": "Gasoline",
            "images": [
                "https://plus.unsplash.com/premium_photo-1670963965022-59c9ac468c18?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ]
        },
        {
            "name": "Honda Civic Sport",
            "brand": "Honda",
            "model": "Sport",
            "year": 2023,
            "pricePerDay": 70,
            "seats": 9,
            "transmission": "Automatic",
            "fuelType": "Hybrid",
            "images": [
                "https://images.unsplash.com/photo-1494697536454-6f39e2cc972d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ]
        }
    ];

    return (
        <div className="py-12 px-6 mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Cars for Rent
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {car.map((cars, index) => (
                    <CarCard key={index} car={cars} />
                ))}
            </div>
        </div>
    );
};

export default CarList;
