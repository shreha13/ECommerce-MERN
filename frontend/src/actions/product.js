import {
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_START,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS
} from "./types";
import axios from "axios";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_PRODUCTS_START,
    });

    try {
      const response = await axios.get("/api/products");
      const products = response.data.products;
      dispatch({
        type: GET_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_PRODUCTS_START,
    });

    try {
      const response = await axios.get("/api/products/" + id);
      const product = response.data.product;
      dispatch({
        type: GET_PRODUCT,
        payload: product,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_PRODUCTS_START,
    });
    const auth = getState().auth;
    try {
      const token = auth.user.token;

      const { data } = await axios.delete(`/api/products/${id}`, {
        headers: {
          "x-auth-header": `Bearer ${token}`,
        },
      });
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const addProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCTS_START,
  });
  const auth = getState().auth;
  try {
    const token = auth.user.token;

    const { data } = await axios.post(`/api/products`, product, {
      headers: {
        "x-auth-header": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const editProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: GET_PRODUCTS_START,
  });
  const auth = getState().auth;
  try {
    const token = auth.user.token;

    const { data } = await axios.put(`/api/products/${product._id}`, product, {
      headers: {
        "x-auth-header": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
