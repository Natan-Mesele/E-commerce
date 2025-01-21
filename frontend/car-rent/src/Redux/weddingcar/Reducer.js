import { WEDDING_CAR_CREATE_FAILURE, WEDDING_CAR_CREATE_REQUEST, WEDDING_CAR_CREATE_SUCCESS, WEDDING_CAR_DELETE_FAILURE, WEDDING_CAR_DELETE_REQUEST, WEDDING_CAR_DELETE_SUCCESS, WEDDING_CAR_FETCH_ALL_FAILURE, WEDDING_CAR_FETCH_ALL_REQUEST, WEDDING_CAR_FETCH_ALL_SUCCESS, WEDDING_CAR_FETCH_BY_ID_FAILURE, WEDDING_CAR_FETCH_BY_ID_REQUEST, WEDDING_CAR_FETCH_BY_ID_SUCCESS, WEDDING_CAR_UPDATE_FAILURE, WEDDING_CAR_UPDATE_REQUEST, WEDDING_CAR_UPDATE_SUCCESS } from "./ActionType";

const initialState = {
    weddingCars: [],
    weddingCar: null,
    carDetail: null,
    loading: false,
    error: null,
  };
  
  // Wedding Car Reducer
  const weddingCarReducer = (state = initialState, action) => {
    switch (action.type) {
      case WEDDING_CAR_CREATE_REQUEST:
      case WEDDING_CAR_FETCH_ALL_REQUEST:
      case WEDDING_CAR_FETCH_BY_ID_REQUEST:
      case WEDDING_CAR_UPDATE_REQUEST:
      case WEDDING_CAR_DELETE_REQUEST:
        return { ...state, loading: true, error: null };
        
      case WEDDING_CAR_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          weddingCars: [...state.weddingCars, action.payload],
        };
  
      case WEDDING_CAR_FETCH_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          weddingCars: action.payload,
        };
  
      case WEDDING_CAR_FETCH_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          carDetail: action.payload,
        };
  
      case WEDDING_CAR_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          weddingCars: state.weddingCars.map((car) =>
            car._id === action.payload._id ? action.payload : car
          ),
        };
  
      case WEDDING_CAR_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          weddingCars: state.weddingCars.filter((car) => car._id !== action.payload),
        };
  
      case WEDDING_CAR_CREATE_FAILURE:
      case WEDDING_CAR_FETCH_ALL_FAILURE:
      case WEDDING_CAR_FETCH_BY_ID_FAILURE:
      case WEDDING_CAR_UPDATE_FAILURE:
      case WEDDING_CAR_DELETE_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default weddingCarReducer;