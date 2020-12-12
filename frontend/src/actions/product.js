import { GET_PRODUCT, GET_PRODUCTS, GET_PRODUCTS_FAIL, GET_PRODUCTS_START } from "./types";
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
        payload: error.response? error.response.data.message: error.message,
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
      const response = await axios.get("/api/products/"+id);
      const product = response.data.product;
      dispatch({
        type: GET_PRODUCT,
        payload: product,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload:  error.response? error.response.data.message: error.message,
      });
    }
  };
};
