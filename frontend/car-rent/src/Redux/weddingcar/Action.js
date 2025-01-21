import api from "../config/api";
import { WEDDING_CAR_CREATE_FAILURE, WEDDING_CAR_CREATE_REQUEST, WEDDING_CAR_CREATE_SUCCESS, WEDDING_CAR_DELETE_FAILURE, WEDDING_CAR_DELETE_REQUEST, WEDDING_CAR_DELETE_SUCCESS, WEDDING_CAR_FETCH_ALL_FAILURE, WEDDING_CAR_FETCH_ALL_REQUEST, WEDDING_CAR_FETCH_ALL_SUCCESS, WEDDING_CAR_FETCH_BY_ID_FAILURE, WEDDING_CAR_FETCH_BY_ID_REQUEST, WEDDING_CAR_FETCH_BY_ID_SUCCESS, WEDDING_CAR_UPDATE_FAILURE, WEDDING_CAR_UPDATE_REQUEST, WEDDING_CAR_UPDATE_SUCCESS } from "./ActionType";

export const createWeddingCar = (weddingCarData) => async (dispatch) => {
    try {
        dispatch({ type: WEDDING_CAR_CREATE_REQUEST });
        const response = await api.post("/api/wedding-cars", weddingCarData);

        dispatch({
            type: WEDDING_CAR_CREATE_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: WEDDING_CAR_CREATE_FAILURE,
            payload: error.message
        });
    }
};

// Action to fetch all wedding cars
export const fetchAllWeddingCars = () => async (dispatch) => {
    console.log("Dispatching fetchAllWeddingCars action");
    try {
        dispatch({ type: WEDDING_CAR_FETCH_ALL_REQUEST });
        const {data} = await api.get("/api/wedding-car");
        console.log("API Response:", data);
        dispatch({
            type: WEDDING_CAR_FETCH_ALL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: WEDDING_CAR_FETCH_ALL_FAILURE,
            payload: error.message
        });
    }
};

export const fetchWeddingCarById = (id) => async (dispatch) => {
    try {
        dispatch({ type: WEDDING_CAR_FETCH_BY_ID_REQUEST });
        const response = await api.get(`/api/wedding-car/${id}`);
        dispatch({
            type: WEDDING_CAR_FETCH_BY_ID_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: WEDDING_CAR_FETCH_BY_ID_FAILURE,
            payload: error.message
        });
    }
};

// Action to update a wedding car
export const updateWeddingCar = (id, weddingCarData) => async (dispatch) => {
    try {
        dispatch({ type: WEDDING_CAR_UPDATE_REQUEST });

        // Call API to update wedding car
        const response = await axios.put(`/api/wedding-cars/${id}`, weddingCarData);

        dispatch({
            type: WEDDING_CAR_UPDATE_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: WEDDING_CAR_UPDATE_FAILURE,
            payload: error.message
        });
    }
};

// Action to delete a wedding car
export const deleteWeddingCar = (id) => async (dispatch) => {
    try {
        dispatch({ type: WEDDING_CAR_DELETE_REQUEST });

        // Call API to delete wedding car
        await axios.delete(`/api/wedding-cars/${id}`);

        dispatch({
            type: WEDDING_CAR_DELETE_SUCCESS,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: WEDDING_CAR_DELETE_FAILURE,
            payload: error.message
        });
    }
};