import homeSlice from "./reducers/homeReducer";
import authSlice from "./reducers/authReducer";
import cartSlice from "./reducers/cartReducer";
import orderSlice from "./reducers/orderReducer";

const rootReducer = {
  home: homeSlice,
  customerAuth: authSlice,
  cart: cartSlice,
  order: orderSlice,
};

export default rootReducer;
