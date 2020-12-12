const {
  LOGIN_USER_LOAD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_LOAD,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  GET_USER_PROFILE,
  CLEAR_MESSAGE,
} = require("../actions/types");

const initialState = {
  user: null,
  userProfile: null,
  loading: false,
  error: null,
  message: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_LOAD:
    case UPDATE_USER_LOAD:
      return {
        ...state,
        loading: true,
        mesaage: null,
      };
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        message: null,
        error: null,
        loading: false,
        user: payload,
      };
    case GET_USER_PROFILE:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        message: "Profile updated",
        userProfile: payload,
      };
    case LOGIN_USER_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: payload,
        message: null,
        loading: false,
      };
    case LOGOUT_USER:
      debugger;
      return {
        ...state,
        message: null,
        user: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default authReducer;
