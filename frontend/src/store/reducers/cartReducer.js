import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const getCustomerCartProducts = createAsyncThunk(
  "cart/getCustomerCartProducts",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    console.log(userId);
    try {
      const { data } = await api.get(`/cart/get-customer-cart/${userId}`, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.post(`/cart/add-cart`, id, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async (id, { rejectWithValue, fulfillWithValue }) => {
//     console.log(id);
//     try {
//       const { data } = await api.post(`/cart/remove-cart`, id, {
//         withCredentials: true,
//       });

//       console.log(data);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const addToWishlist = createAsyncThunk(
//   "cart/addToWishlist",
//   async (id, { rejectWithValue, fulfillWithValue }) => {
//     console.log(id);
//     try {
//       const { data } = await api.post(`/cart/add-to-wishlist`, id, {
//         withCredentials: true,
//       });

//       console.log(data);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const removeFromWishlist = createAsyncThunk(
//   "cart/removeFromWishlist",
//   async (id, { rejectWithValue, fulfillWithValue }) => {
//     console.log(id);
//     try {
//       const { data } = await api.post(`/cart/remove-from-wishlist`, id, {
//         withCredentials: true,
//       });

//       console.log(data);
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    card_products: [],
    card_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outofstock_products: [],
    buy_product_item: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.card_product_count = state.card_product_count + 1;
        toast.success(payload.message);
      })
      .addCase(getCustomerCartProducts.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getCustomerCartProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.card_products = payload.card_products;
        state.price = payload.price;
        state.card_product_count = payload.card_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.outofstock_products = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
      })
      .addCase(getCustomerCartProducts.rejected, (state, { payload }) => {
        state.loading = false;
      });
  },
});
export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
