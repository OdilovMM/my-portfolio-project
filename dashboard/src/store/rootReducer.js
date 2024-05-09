import authSlice from "./Reducers/authReducer";
import categorySlice from "./Reducers/categoryReducer";
import chatSlice from "./Reducers/chatReducer";
import productSlice from "./Reducers/productReducer";
import sellerSlice from "./Reducers/sellerReducer";

const rootReducer = {
  auth: authSlice,
  category: categorySlice,
  product: productSlice,
  seller: sellerSlice,
  chat: chatSlice,
};

export default rootReducer;
