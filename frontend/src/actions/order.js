import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_LOAD,
  CREATE_ORDER_SUCCESS,
  DELIVER_ORDERS_FAIL,
  DELIVER_ORDERS_SUCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_SUCCESS,
  PAY_ORDERS_FAIL,
  PAY_ORDER_SUCCESS,
} from "./types";

export const createOrder = (orderData) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_ORDER_LOAD,
    });

    const token = getState().auth.user.token;

    try {
      const { data } = await axios.post("/api/orders", orderData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-header": `Bearer ${token}`,
        },
      });

      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const getOrders = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_ORDER_LOAD,
    });

    const token = getState().auth.user.token;
    try {
      const { data } = await axios.get("/api/orders", {
        headers: {
          "x-auth-header": `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDERS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const getOrderById = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_ORDER_LOAD,
    });

    const token = getState().auth.user.token;

    try {
      const { data } = await axios.get("/api/orders/" + id, {
        headers: {
          "x-auth-header": `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ORDER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const payOrder = (id, paymentResult) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CREATE_ORDER_LOAD,
    });

    const token = getState().auth.user.token;

    try {
      const { data } = await axios.put(
        "/api/orders/" + id + "/pay",
        paymentResult,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-header": `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: PAY_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAY_ORDERS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const getAllOrders = () => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ORDER_LOAD
  })
  const auth = getState().auth;
  try {
    const token = auth.user.token;

    const { data } = await axios.get("/api/orders/all", {
      headers: {
        "x-auth-header": `Bearer ${token}`,
      },
    });

    dispatch({
      type: GET_ALL_ORDERS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDERS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ORDER_LOAD
  })
  const auth = getState().auth;
  try {
    const token = auth.user.token;

    const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, {
      headers: {
        "x-auth-header": `Bearer ${token}`,
      },
    });

    dispatch({
      type: DELIVER_ORDERS_SUCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: DELIVER_ORDERS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
