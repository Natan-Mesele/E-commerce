import axios from "axios";
import { CAR_CREATE_FAILURE, CAR_CREATE_REQUEST, CAR_CREATE_SUCCESS, CAR_DELETE_FAILURE, CAR_DELETE_REQUEST, CAR_DELETE_SUCCESS, CAR_FETCH_ALL_FAILURE, CAR_FETCH_ALL_REQUEST, CAR_FETCH_ALL_SUCCESS, CAR_FETCH_BY_ID_FAILURE, CAR_FETCH_BY_ID_REQUEST, CAR_FETCH_BY_ID_SUCCESS, CAR_UPDATE_FAILURE, CAR_UPDATE_REQUEST, CAR_UPDATE_SUCCESS, GET_CARS_BY_CATEGORY_FAILURE, GET_CARS_BY_CATEGORY_REQUEST, GET_CARS_BY_CATEGORY_SUCCESS } from "./ActionType";
import api from "../config/api";

export const createCar = (carData) => async (dispatch) => {
  try {
    dispatch({ type: CAR_CREATE_REQUEST });

    const { data } = await axios.post("/api/cars", carData);

    dispatch({
      type: CAR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAR_CREATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchAllCars = () => async (dispatch) => {
  try {
    dispatch({ type: CAR_FETCH_ALL_REQUEST });

    const { data } = await api.get("/api/cars");

    dispatch({
      type: CAR_FETCH_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAR_FETCH_ALL_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchCarById = (carId) => async (dispatch) => {
  try {
    dispatch({ type: CAR_FETCH_BY_ID_REQUEST });

    const { data } = await api.get(`/api/cars/${carId}`);
    dispatch({
      type: CAR_FETCH_BY_ID_SUCCESS,
      payload: data,
    });
    console.log("fetch car by id", data);
  } catch (error) {
    dispatch({
      type: CAR_FETCH_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateCar = (id, carData) => async (dispatch) => {
  try {
    dispatch({ type: CAR_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/cars/${id}`, carData);

    dispatch({
      type: CAR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAR_UPDATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAR_DELETE_REQUEST });

    await axios.delete(`/api/cars/${id}`);

    dispatch({
      type: CAR_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CAR_DELETE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getCarsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: GET_CARS_BY_CATEGORY_REQUEST }); // Dispatch request action
    
    // Make API call to fetch cars by category
    const response = await axios.get(`/api/cars?category=${category}`);
    
    dispatch({
      type: GET_CARS_BY_CATEGORY_SUCCESS,
      payload: response.data, // Pass the cars data to the success action
    });
  } catch (error) {
    dispatch({
      type: GET_CARS_BY_CATEGORY_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
