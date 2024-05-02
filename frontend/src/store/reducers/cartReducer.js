import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.post(`/cart/add-cart`, id, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.post(`/cart/remove-cart`, id, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.post(`/cart/add-to-wishlist`, id, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeFromWishlist = createAsyncThunk(
  "cart/removeFromWishlist",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    console.log(id);
    try {
      const { data } = await api.post(`/cart/remove-from-wishlist`, id, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    productCart: [],
    productCount: 0,
    wishlistCount: 0,
    wishlist: [],
    price: 0,
    shippingFee: 0,
    stockProducts: [],
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
        state.productCount = state.productCount + 1;
        toast.success(payload.message);
        console.log(payload);
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {});
  },
});
export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
