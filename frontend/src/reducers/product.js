import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_START,
  GET_PRODUCTS_FAIL,
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
    default:
      return state;
  }
};

export default productReducer;
