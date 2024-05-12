import authSlice from "./Reducers/authReducer";
import categorySlice from "./Reducers/categoryReducer";
import chatSlice from "./Reducers/chatReducer";
import orderSlice from "./Reducers/orderReducer";
import paymentSlice from "./Reducers/paymentReducer";
import productSlice from "./Reducers/productReducer";
import sellerSlice from "./Reducers/sellerReducer";

const rootReducer = {
  auth: authSlice,
  category: categorySlice,
  product: productSlice,
  seller: sellerSlice,
  chat: chatSlice,
  order: orderSlice,
  payment: paymentSlice
};

export default rootReducer;
