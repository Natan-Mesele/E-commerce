import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCars } from '../Redux/car/Action';
import CarCard from './CarCard';

const CarList = () => {
    const dispatch = useDispatch();
    const { cars, loading, error } = useSelector((state) => state.cars);

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 9;

    useEffect(() => {
        dispatch(fetchAllCars());
    }, [dispatch]);

    // Ensure cars is always an array
    const carArray = Array.isArray(cars) ? cars : [];

    // Filter cars based on the search query (by name or brand)
    const filteredCars = carArray.filter((car) => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        car.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination Logic: Get the cars for the current page
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    // Total pages
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    // Handle page change (Next/Previous)
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="py-12 px-6 mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
            {/* Search Input aligned to the left */}
            <input 
                type="text" 
                placeholder="Search by car name or brand..." 
                className="p-3 w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {/* Header aligned to the right */}
            <h2 className="text-3xl font-bold text-gray-400 ml-8">Cars for Rent</h2>
        </div>
    
        {loading ? (
            <p className="text-center text-gray-600">Loading cars...</p>
        ) : error ? (
            <p className="text-center text-red-600">{error}</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCars.length === 0 ? (
                    <p className="text-center text-gray-600">No cars available.</p>
                ) : (
                    currentCars.map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))
                )}
            </div>
        )}
    
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-16 gap-16">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
                Previous
            </button>
            <p className="text-lg text-gray-600">Page {currentPage} of {totalPages}</p>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    </div>
    
    );
};

export default CarList;
