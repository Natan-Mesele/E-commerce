import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../Redux/booking/Action';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';
import { fetchCarById } from '../Redux/car/Action';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarDetail = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { car, error } = useSelector((state) => state.cars);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false); // State to toggle the review form visibility
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchData = async () => {
      if (carId) {
        try {
          await dispatch(fetchCarById(carId, jwt)); // Fetch car details by carId
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      }
    };
  
    fetchData();
  }, [dispatch, carId, jwt]);
  

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!car) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleBookNow = async () => {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      toast.error('To book a car, first log in.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Please select valid dates for rental.');
      return;
    }

    const rentalDuration = Math.ceil((end - start) / (1000 * 3600 * 24));
    if (rentalDuration <= 0) {
      toast.error('The rental duration must be at least 1 day.');
      return;
    }

    if (car.availability <= 0) {
      toast.error('This car is not available for booking as it is rented by someone else.');
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

    try {
      await dispatch(createBooking(bookingData));
      toast.success('Booking successful!');
    } catch (error) {
      alert(error.message || 'An error occurred.');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const toggleReviewForm = () => {
    setShowReviewForm((prev) => !prev); // Toggle the visibility of the review form
  };

  return (
    <div className="">
      <div
        className="relative w-full h-64 bg-cover bg-center flex items-center justify-center rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${car.images[0]})` }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
          <h1 className="text-4xl font-bold text-white text-center">{car.name}</h1>
          <p className="text-lg font-semibold text-white text-center">{car.brand}</p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row mt-8 gap-8 py-8 px-4 lg:px-12">
        <div className="flex-1 md:max-w-4xl md:mx-auto">
          <div className="space-y-3">
            <p className="text-center text-gray-600 text-lg">
              {car.brand} - {car.model} ({car.year})
            </p>
            <div className="space-y-2">
              <p>
                <strong>Seats:</strong> {car.seats}
              </p>
              <p>
                <strong>Transmission:</strong> {car.transmission}
              </p>
              <p>
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p className="text-2xl font-semibold text-gray-600">${car.pricePerDay}/day</p>
            </div>
          </div>
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
          <div className="mt-6 flex justify-between flex-col sm:flex-row">
            <button
              onClick={() => navigate('/cars')}
              className="bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 w-full sm:w-auto mb-4 sm:mb-0"
            >
              Back
            </button>
            <button
              onClick={handleBookNow}
              className="bg-custom-secondary text-white py-3 px-6 rounded-lg shadow-md hover:bg-custom-primary w-full sm:w-auto"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {/* Review Form Toggle Icon */}
      <div className="text-center mt-6">
        <button
          onClick={toggleReviewForm}
          className="text-3xl text-custom-primary hover:text-custom-bg transition duration-300"
        >
          <FaPen /> Write a Review
        </button>
      </div>

      {/* Conditionally render the Review Form */}
      {showReviewForm && (
        <div className="flex-1 mt-8 lg:mt-0 md:max-w-4xl md:mx-auto">
          <ReviewForm carId={car._id} editingReview={editingReview} />
        </div>
      )}

      {/* Reviews List */}
      <div className='md:max-w-4xl md:mx-auto'>
        <ReviewsList reviews={car._id} onEdit={handleEditReview} />
      </div>

    </div>
  );
};

export default CarDetail;
