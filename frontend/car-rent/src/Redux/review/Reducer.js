import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAILURE, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS, UPDATE_REVIEW_FAILURE, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS } from "./ActionType";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  rating: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Reviews
    case FETCH_REVIEWS_REQUEST:
      return { ...state, loading: true };
    case FETCH_REVIEWS_SUCCESS:
      return { ...state, loading: false, reviews: action.payload };
    case FETCH_REVIEWS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create Review
    case CREATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case CREATE_REVIEW_SUCCESS:
      return { ...state, loading: false, reviews: [...state.reviews, action.payload] };
    case CREATE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Review
    case UPDATE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
      };

    case UPDATE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete Review
    case DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          reviews: state.reviews.filter((review) => review._id !== action.payload), // Use reviewId here
        };
      
    case DELETE_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Create Rating
    case CREATE_RATING_REQUEST:
      return { ...state, loading: true };
    case CREATE_RATING_SUCCESS:
      return { ...state, loading: false, rating: action.payload };
    case CREATE_RATING_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reviewReducer;
