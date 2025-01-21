import { CREATE_BOOKING_FAILURE, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, DELETE_BOOKING_FAILURE, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS, GET_ALL_BOOKINGS_FAILURE, GET_ALL_BOOKINGS_REQUEST, GET_ALL_BOOKINGS_SUCCESS, GET_BOOKING_FAILURE, GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS, UPDATE_BOOKING_FAILURE, UPDATE_BOOKING_REQUEST, UPDATE_BOOKING_SUCCESS } from "./ActionType";

const initialState = {
  bookings: [],
  booking: null,
  loading: false,
  error: null,
};

// Reducer
const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOKING_REQUEST:
    case GET_BOOKING_REQUEST:
    case UPDATE_BOOKING_REQUEST:
    case DELETE_BOOKING_REQUEST:
    case GET_ALL_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: Array.isArray(state.bookings) ? [...state.bookings, action.payload] : [action.payload],
        error: null,
      };

    case GET_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
        error: null,
      };

    case UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: state.bookings.map((booking) =>
          booking.id === action.payload.id ? action.payload : booking
        ),
        error: null,
      };

    case DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: state.bookings.filter((booking) => booking.id !== action.payload),
        error: null,
      };

    case GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
        error: null,
      };

    case CREATE_BOOKING_FAILURE:
    case GET_BOOKING_FAILURE:
    case UPDATE_BOOKING_FAILURE:
    case DELETE_BOOKING_FAILURE:
    case GET_ALL_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;