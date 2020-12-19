import { combineReducers } from "redux";

import product from "./product";
import cart from "./cart";
import auth from "./auth";
import order from "./order";
import user from "./user";

export default combineReducers({
  product,
  cart,
  auth,
  order,
  user
});
