import axios from "axios";
import {
  CLEAR_MESSAGE,
  GET_USER_PROFILE,
  LOGIN_USER_FAIL,
  LOGIN_USER_LOAD,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_LOAD,
  UPDATE_USER_SUCCESS,
} from "./types";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER_LOAD,
    });

    try {
      const userModel = { email, password };
      const { data } = await axios.post(`/api/users/login`, userModel, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(getProfile());

      setTimeout(() => {
        dispatch({
          type: LOGOUT_USER,
        });

        localStorage.removeItem("user");
      }, 3600000);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch({
      type: LOGOUT_USER,
    });
  };
};

export const registerUser = (email, password, name, isAdmin = false) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_USER_LOAD,
    });
    try {
      const user = await axios.post(
        "/api/users/register",
        {
          email,
          password,
          isAdmin,
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: user.data,
      });

      localStorage.setItem("user", user.data);
      dispatch(getProfile());

      setTimeout(() => {
        dispatch({
          type: LOGOUT_USER,
        });

        localStorage.removeItem("user");
      }, 3600000);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_LOAD,
    });
    try {
      const { user } = getState().auth;

      const userProfile = await axios.get("/api/users/profile", {
        headers: {
          "x-auth-header": `Bearer ${user.token}`,
        },
      });

      dispatch({
        type: GET_USER_PROFILE,
        payload: userProfile.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const updateUserProfile = (email, name, password, isAdmin = false) => {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_USER_LOAD,
    });
    try {
      const { user } = getState().auth;
      let userModel = {
        email,
        password,
        isAdmin,
        name,
      };

      if (password !== "") {
        userModel = {
          email,
          isAdmin,
          name,
        };
      }
      const userProfile = await axios.put("/api/users/profile", userModel, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-header": `Bearer ${user.token}`,
        },
      });

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: userProfile.data,
      });

      localStorage.setItem("user", user.data);

      setTimeout(() => {
        dispatch({
          type: CLEAR_MESSAGE,
        });
      }, 5000);

      setTimeout(() => {
        dispatch({
          type: LOGOUT_USER,
        });

        localStorage.removeItem("user");
      }, 3600000);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};
