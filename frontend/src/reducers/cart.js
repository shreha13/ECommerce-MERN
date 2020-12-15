const {
  CART_ITEM_ADD,
  CART_ITEM_LOADING,
  CART_ITEM_REMOVE,
  CART_ITEM_FAIL,
  CART_SAVE_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CLEAR_MESSAGE_CART,
} = require("../actions/types");

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
  shippingAddress: {},
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ITEM_ADD:
      const item = payload;
      const itemExist = state.cartItems.find((i) => i.product === item.product);
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === itemExist.product ? item : x
          ),
          loading: false,
          error: null,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          loading: false,
          error: null,
        };
      }
    case CART_ITEM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CART_ITEM_REMOVE:
      return {
        ...state,
        cartItems: [...state.cartItems.filter((i) => i.product !== payload)],
        loading: false,
      };
    case CART_ITEM_FAIL:
      return {
        ...state,
        cartItems: [],
        loading: false,
        error: payload,
      };
    case CART_SAVE_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case CLEAR_MESSAGE_CART:
      return {
        ...state,
        error: null,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
