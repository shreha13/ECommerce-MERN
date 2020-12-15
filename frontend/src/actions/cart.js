import axios from "axios";
import {
  CART_ITEM_ADD,
  CART_ITEM_FAIL,
  CART_ITEM_LOADING,
  CART_ITEM_REMOVE,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CLEAR_MESSAGE_CART
} from "./types";

export const addItemsToCart = (id, qty) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ITEM_LOADING,
      });
      const { data } = await axios.get(`/api/products/${id}`);
      debugger;
      dispatch({
        type: CART_ITEM_ADD,
        payload: {
          product: data.product._id,
          name: data.product.name,
          price: data.product.price,
          image: data.product.image,
          countInStock: data.product.countInStock,
          qty: qty,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      dispatch({
        type: CART_ITEM_FAIL,
        payload: error.message,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_MESSAGE_CART,
        });
      }, 5000);
    }
  };
};

export const removeItemsFromCart = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ITEM_LOADING,
      });

      dispatch({
        type: CART_ITEM_REMOVE,
        payload: id,
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      dispatch({
        type: CART_ITEM_FAIL,
        payload: error.message,
      });

      setTimeout(() => {
        dispatch({
          type: CLEAR_MESSAGE_CART,
        });
      }, 5000);
    }
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: CART_SAVE_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
};
