import Axios from "axios";
import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USER_LOAD,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_LOAD,
  GET_USERS_SUCCESS,
  UPDATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAIL,
} from "./types";

export const getUsers = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USERS_LOAD,
    });
    const auth = getState().auth;
    try {
      const token = auth.user.token;
      const { data } = await Axios.get("/api/users", {
        headers: {
          "x-auth-header": `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const deleteUser = (user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USERS_LOAD,
    });
    const auth = getState().auth;
    try {
      const token = auth.user.token;
      debugger;
      const { data } = await Axios.delete(`/api/users/${user._id}`, {
        headers: {
          "x-auth-header": `Bearer ${token}`,
        },
      });
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_USER_LOAD,
    });
    const auth = getState().auth;
    try {
      const token = auth.user.token;
      const { data } = await Axios.get(`/api/users/${id}`, {
        headers: {
          "x-auth-header": `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: GET_USER_LOAD,
  });
  const auth = getState().auth;
  try {
    const token = auth.user.token;
    const { data } = await Axios.put(
      `/api/users/${user._id}`,
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      {
        headers: {
          "x-auth-header": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: UPDATE_ADMIN_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_USER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
