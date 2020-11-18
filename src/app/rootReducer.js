import { combineReducers } from "@reduxjs/toolkit";

import menuReducer from "../features/menu/menuSlice";
import valuteReducer from "../features/header/valuteSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/auth/userSlice";

const rootReducer = combineReducers({
  menu: menuReducer,
  currentValute: valuteReducer,
  cart: cartReducer,
  user: userReducer,
});
export default rootReducer;
