import axios from "axios";
import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { API_BASE_URL } from "../config/api";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
      console.log("Register success:", data);
    } else {
      console.log("JWT is missing in the response");
    }
  } catch (error) {
    console.log("Error during registration:", error);
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, formData);
    console.log("Login API response:", data);

    if (data.jwt) {
      const userId = data.user._id;
      if (userId) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("userId", userId);  // Store userId
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            jwt: data.jwt,
            userId: userId,
          },
        });

        console.log("UserId from login action:", userId);
      } else {
        console.log("UserId is missing from API response.");
      }
    }

    console.log("Login success", data);
  } catch (error) {
    console.log("Login error:", error);
  }
};


export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("user success", data);
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = (profileData) => async (dispatch) => {
  dispatch({ type: EDIT_PROFILE_REQUEST });
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/users/profile`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    dispatch({ type: EDIT_PROFILE_SUCCESS, payload: data });
    console.log("Edit profile success", data);
  } catch (error) {
    console.log("Edit profile error:", error);
  }
};

export const changePassword = (passwordData) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/users/change-password`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data });
    console.log("Change password success", data);
  } catch (error) {
    console.log("Change password error:", error);
  }
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  };
};