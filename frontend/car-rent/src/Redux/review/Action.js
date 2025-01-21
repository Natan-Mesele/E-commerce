import api from "../config/api";
import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS, UPDATE_REVIEW_FAILURE, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS } from "./ActionType";

export const fetchReviews = (userId, carId) => async (dispatch) => {
  dispatch({ type: FETCH_REVIEWS_REQUEST }); 
  try {
    const response = await api.get(`/api/review/${userId}/reviews?carId=${carId}`);
    const data = response.data; 
    console.log("Fetched reviews:", data); 
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    dispatch({ 
      type: FETCH_REVIEWS_FAILURE, 
      payload: error.response?.data?.message || error.message, 
    });
  }
};

export const createReview = (userId, reviewData) => async (dispatch) => {
  dispatch({ type: CREATE_REVIEW_REQUEST });
  try {
    // Destructure reviewData to ensure required fields are provided
    const { rating, comment, carId } = reviewData;

    // Send POST request with Axios
    const response = await api.post(
      `/api/review/${userId}/reviews`, 
      { rating, comment, carId }, 
      { headers: { 'Content-Type': 'application/json' } }
    );

    const data = response.data; // Axios automatically parses the JSON response
    console.log('Review created successfully:', data);

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error creating review:', error);
    dispatch({ 
      type: CREATE_REVIEW_FAILURE, 
      payload: error.response?.data?.message || error.message // Use detailed error message if available
    });
  }
};

export const createRating = (ratingData) => async (dispatch) => {
  dispatch({ type: CREATE_RATING_REQUEST });
  try {
    const response = await fetch('/api/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_RATING_FAILURE, payload: error.message });
  }
};

export const updateReview = (userId, reviewData) => async (dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });
  try {
    const { carId, rating, comment } = reviewData;
    console.log('Review Data:', reviewData); // Debugging statement
    console.log('Car ID:', carId);

    const response = await api.put(
      `/api/review/${userId}/reviews`,  // Correct endpoint
      { carId, rating, comment },      // Request body
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;
    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const deleteReview = (userId, carId) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEW_REQUEST });
  try {
    const response = await api.delete(`/api/review/${userId}/reviews/${carId}`);
    const { message } = response.data;
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: { carId, message } });
    console.log("review comment is deleted sucessfully", )
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

