import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_LOAD,
  CREATE_ORDER_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_SUCCESS,
  PAY_ORDERS_FAIL,
  PAY_ORDER_LOAD,
  PAY_ORDER_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_RESET,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  DELIVER_ORDERS_FAIL,
  DELIVER_ORDERS_SUCESS,
} from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  orders: [],
  successPay: false,
  loadingPay: false,
  order: null,
  success: false,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        order: payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case CREATE_ORDER_LOAD:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PAY_ORDER_LOAD:
      return {
        ...state,
        loadingPay: true,
        successPay: false,
      };
    case ORDER_RESET:
      return {
        ...state,
        order: null,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        error: null,
        order: payload,
        loading: false,
      };
    case PAY_ORDER_SUCCESS:
      return {
        ...state,
        error: null,
        order: payload,
        loadingPay: false,
        successPay: true,
      };
    case GET_ORDERS_FAIL:
    case GET_ALL_ORDERS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case ORDER_PAY_RESET:
      return {
        ...state,
        success: null,
      };

    case PAY_ORDERS_FAIL:
      return {
        ...state,
        error: payload,
        order: null,
        successPay: false,
        loadingPay: false,
      };
    case GET_ORDERS_SUCCESS:
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload,
        error: null,
        loading: false,
      };
    case GET_ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELIVER_ORDERS_SUCESS:
      return {
        ...state,
        success: true,
        loading: false,
        orders: state.orders.map((i) => {
          return i._id !== payload._id ? i : payload;
        }),
      };
    case DELIVER_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
