import api from "../config/api";
import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, DELETE_BOOKING_FAILURE, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS, GET_ALL_BOOKINGS_FAILURE, GET_ALL_BOOKINGS_REQUEST, GET_ALL_BOOKINGS_SUCCESS, GET_BOOKING_FAILURE, GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS, UPDATE_BOOKING_FAILURE, UPDATE_BOOKING_REQUEST, UPDATE_BOOKING_SUCCESS } from "./ActionType";

export const createBooking = (bookingData) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_REQUEST });
  try {
    const response = await api.post('/api/bookings/create', bookingData);
    dispatch({
      type: CREATE_BOOKING_SUCCESS,
      payload: response.data,
    });
    console.log('Booking successful:', response.data);
  } catch (error) {
    dispatch({
      type: CREATE_BOOKING_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get Booking By ID
export const getBookingById = (bookingId) => async (dispatch) => {
  dispatch({ type: GET_BOOKING_REQUEST });
  try {
    const response = await axios.get(`/api/bookings/${bookingId}`);
    dispatch({
      type: GET_BOOKING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BOOKING_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Update Booking
export const updateBooking = (bookingId, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_BOOKING_REQUEST });
  try {
    const response = await axios.put(`/api/bookings/${bookingId}`, updatedData);
    dispatch({
      type: UPDATE_BOOKING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BOOKING_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Delete Booking
export const deleteBooking = (bookingId) => async (dispatch) => {
  dispatch({ type: DELETE_BOOKING_REQUEST });
  try {
    await axios.delete(`/api/bookings/${bookingId}`);
    dispatch({
      type: DELETE_BOOKING_SUCCESS,
      payload: bookingId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BOOKING_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getAllBookingsForUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BOOKINGS_REQUEST });
  try {
    const response = await api.get('/api/bookings');
    dispatch({
      type: GET_ALL_BOOKINGS_SUCCESS,
      payload: response.data,
    });
    console.log("get all booking cars", response.data);
  } catch (error) {
    dispatch({
      type: GET_ALL_BOOKINGS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};