import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, deleteReview, updateReview } from '../Redux/review/Action';
import { getUser } from '../Redux/Auth/Action';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ReviewsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { reviews, loading, error } = useSelector((state) => state.review);
  const { car } = useSelector((state) => state.cars);
  const [editingReview, setEditingReview] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const carId = car?._id;
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      dispatch(getUser());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (carId) {
        await dispatch(fetchReviews(user._id, carId)); 
      }
    };
    fetchData(); 
  }, [dispatch, carId, user._id]);

  const handleDelete = async (reviewId) => {
    try {
      await dispatch(deleteReview(userId, carId, reviewId));  // Wait for delete review to complete
      await dispatch(fetchReviews(userId, carId));     // Fetch the updated list of reviews
    } catch (error) {
      console.error("Error deleting review or fetching reviews:", error);
    }
  };

  const onEdit = (review) => {
    setEditingReview(review);
    setEditedComment(review.comment);
  };

  const handleCommentChange = (event) => {
    setEditedComment(event.target.value);
  };

  const handleSaveEdit = async () => {
    if (!carId) {
      console.error("Car ID is undefined, cannot update review.");
      return;
    }
  
    if (editingReview) {
      const updatedReviewData = {
        carId: editingReview.carId || carId,
        rating: editingReview.rating,
        comment: editedComment,
      };
      try {
        await dispatch(updateReview(userId, updatedReviewData));
        await dispatch(fetchReviews(userId, carId));
      } catch (error) {
        console.error("Error updating review or fetching reviews:", error);
      }
    }
    setEditingReview(null);  
  };
  

  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-4"></p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-gray-500 mt-4 text-bold">Add Your Review</p>;
  }

  return (
    <div className="reviews-list bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Reviews</h3>
      {reviews.map((review, index) => (
        <div key={review._id || index} className="review flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md border mb-4">
          <div className="text-gray-700">
            <p>
              <strong>Rating:</strong>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-xl">
                    {i < review.rating ? '⭐' : '☆'}
                  </span>
                ))}
            </p>
            {editingReview && editingReview._id === review._id ? (
              <div>
                <strong>Edit Comment:</strong>
                <textarea
                  value={editedComment}
                  onChange={handleCommentChange}
                  className="mt-2 p-2 border rounded"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg mt-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <p><strong>Comment:</strong> {review.comment}</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onEdit(review)}
              className="text-blue-500 hover:text-blue-700 transition duration-200"
            >
              <FaEdit className="text-xl" />
            </button>
            <button
              onClick={() => handleDelete(review._id)}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              <FaTrash className="text-xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;