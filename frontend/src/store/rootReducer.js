import homeSlice from "./reducers/homeReducer";
import authSlice from "./reducers/authReducer";

const rootReducer = {
  home: homeSlice,
  customerAuth: authSlice,
};

export default rootReducer;
