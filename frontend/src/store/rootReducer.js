import homeSlice from "./reducers/homeReducer";
import authSlice from "./reducers/authReducer";
import cartSlice from "./reducers/cartReducer";

const rootReducer = {
  home: homeSlice,
  customerAuth: authSlice,
  cart: cartSlice,
};

export default rootReducer;
