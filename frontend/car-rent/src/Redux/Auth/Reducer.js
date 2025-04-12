import { CHANGE_PASSWORD_SUCCESS, EDIT_PROFILE_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: localStorage.getItem("jwt") || null,
  success: null,
  registered: false, 
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload.jwt,
        registered: true, // Update flag on successful registration
        success: "Registration successful!",
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.payload.jwt,
        registered: false, // Reset flag on successful login
        success: "Operation successful",
        user: action.payload,
      };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: "Profile updated successfully!",
      };

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Password changed successfully!",
      };

    case LOGOUT:
      return {
        ...state,
        jwt: null,
      };

    default:
      return state;
  }
};