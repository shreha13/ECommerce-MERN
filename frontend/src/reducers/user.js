import {
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_LOAD,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_LOAD,
  GET_USER_RESET,
  GET_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAIL,
  UPDATE_ADMIN_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  users: [],
  user: {},
  error: null,
  success: false,
  loading: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        error: null,
        loading: false,
      };
    case GET_USERS_LOAD:
    case GET_USER_LOAD:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_FAIL:
    case DELETE_USER_FAIL:
    case GET_USER_FAIL:
      case UPDATE_ADMIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_USER_SUCCESS:
    case UPDATE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        user: payload,
      };
    case GET_USER_RESET: {
      return {
        ...state,
        success: false
      }
    }
    default:
      return state;
  }
};

export default userReducer;
