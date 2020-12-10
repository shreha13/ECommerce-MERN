const {
  CART_ITEM_ADD,
  CART_ITEM_LOADING,
  CART_ITEM_REMOVE,
  CART_ITEM_FAIL,
} = require("../actions/types");

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_ITEM_ADD:
      const item = payload;
      const itemExist = state.cartItems.find((i) => i.product === item.product);
      debugger;
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
        loading: false
      };
    case CART_ITEM_FAIL:
      return {
        ...state,
        cartItems: [],
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default cartReducer;
