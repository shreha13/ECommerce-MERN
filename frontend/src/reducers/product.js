import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_START,
  GET_PRODUCTS_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_RESET,
} from "../actions/types";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS:
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
        error: null,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        products: [],
        product: {},
        error: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        loading: false,
        product: payload,
        error: null,
      };
    case DELETE_PRODUCT_FAIL:
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload,
        error: null,
      };
    case ADD_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default productReducer;
