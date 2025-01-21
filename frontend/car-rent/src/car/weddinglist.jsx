import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeddingCarCard from './weddingcarCard';
import { fetchAllWeddingCars } from '../Redux/weddingcar/Action';

function WeddingCarList() {
    const dispatch = useDispatch();
    const { weddingCars, loading, error } = useSelector((state) => state.weddingCar);
    console.log("Wedding Cars: ", weddingCars);

    useEffect(() => {
        dispatch(fetchAllWeddingCars());
    }, [dispatch]);

    return (
        <div className="wedding-car-list p-4 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Wedding Cars</h1>
            {loading ? (
                <p className="text-center text-gray-600">Loading cars...</p>
            ) : error ? (
                <p className="text-center text-red-500">Error: {error}</p>
            ) : weddingCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {weddingCars.map((car) => (
                        <WeddingCarCard key={car._id} car={car} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No cars available</p>
            )}
        </div>
    );
}

export default WeddingCarList;