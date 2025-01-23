import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { createReview, fetchReviews } from '../Redux/review/Action';
import { toast } from 'react-toastify';

const ReviewForm = ({ carId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { rating, comment, carId };
    try {
      await dispatch(createReview(userId, reviewData));
      await dispatch(fetchReviews(userId, carId)); 
      setRating(1); 
      setComment('');
      toast.success("Review submitted successfully!");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message === "You have already reviewed this car"
          ? "You have already submitted a review for this car."
          : "An error occurred. Please try again.";
  
      setError(errorMessage); // Set the error state to display an error message
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="review-form bg-white p-6 rounded-lg shadow-lg mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block text-gray-700 font-medium">Rating</label>
          <div className="flex space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingClick(value)}
                className={`p-2 rounded-full ${rating >= value ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block text-gray-700 font-medium">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="mt-2 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
