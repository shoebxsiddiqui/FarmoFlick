import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  //   UPDATE_PROFILE_REQUEST,
  //   UPDATE_PROFILE_SUCCESS,
  //   UPDATE_PROFILE_FAIL,
  //   UPDATE_PROFILE_RESET,
  //   UPDATE_PASSWORD_REQUEST,
  //   UPDATE_PASSWORD_SUCCESS,
  //   UPDATE_PASSWORD_RESET,
  //   UPDATE_PASSWORD_FAIL,
  //   FORGOT_PASSWORD_REQUEST,
  //   FORGOT_PASSWORD_SUCCESS,
  //   FORGOT_PASSWORD_FAIL,
  //   RESET_PASSWORD_REQUEST,
  //   RESET_PASSWORD_SUCCESS,
  //   RESET_PASSWORD_FAIL,
  //   ALL_USERS_REQUEST,
  //   ALL_USERS_SUCCESS,
  //   ALL_USERS_FAIL,
  //   DELETE_USER_REQUEST,
  //   DELETE_USER_SUCCESS,
  //   DELETE_USER_FAIL,
  //   DELETE_USER_RESET,
  //   UPDATE_USER_REQUEST,
  //   UPDATE_USER_SUCCESS,
  //   UPDATE_USER_FAIL,
  //   UPDATE_USER_RESET,
  //   USER_DETAILS_REQUEST,
  //   USER_DETAILS_SUCCESS,
  //   USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

//Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Register User
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
