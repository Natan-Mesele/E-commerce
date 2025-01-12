import { CAR_CREATE_FAILURE, CAR_CREATE_REQUEST, CAR_CREATE_SUCCESS, CAR_DELETE_FAILURE, CAR_DELETE_REQUEST, CAR_DELETE_SUCCESS, CAR_FETCH_ALL_FAILURE, CAR_FETCH_ALL_REQUEST, CAR_FETCH_ALL_SUCCESS, CAR_FETCH_BY_ID_FAILURE, CAR_FETCH_BY_ID_REQUEST, CAR_FETCH_BY_ID_SUCCESS, CAR_UPDATE_FAILURE, CAR_UPDATE_REQUEST, CAR_UPDATE_SUCCESS } from "./ActionType";

  
  const initialState = {
    cars: [], // List of all cars
    car: null, // Single car details
    loading: false,
    error: null,
  };
  
  const carReducer = (state = initialState, action) => {
    switch (action.type) {
      case CAR_CREATE_REQUEST:
      case CAR_FETCH_ALL_REQUEST:
      case CAR_FETCH_BY_ID_REQUEST:
      case CAR_UPDATE_REQUEST:
      case CAR_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CAR_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          cars: [...state.cars, action.payload], // Add the new car to the list
        };
  
      case CAR_FETCH_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          cars: action.payload, // Populate the list of cars
        };
  
      case CAR_FETCH_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          car: action.payload, // Populate the single car details
        };
  
      case CAR_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          cars: state.cars.map((car) =>
            car.id === action.payload.id ? action.payload : car
          ),
        };
  
      case CAR_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          cars: state.cars.filter((car) => car.id !== action.payload),
        };
  
      case CAR_CREATE_FAILURE:
      case CAR_FETCH_ALL_FAILURE:
      case CAR_FETCH_BY_ID_FAILURE:
      case CAR_UPDATE_FAILURE:
      case CAR_DELETE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default carReducer;
  