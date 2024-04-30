import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAllCategories = createAsyncThunk(
  "home/getAllCategories",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-categories`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductsByType = createAsyncThunk(
  "home/getProductsByTypes",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products", {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
    products: [],
    latestProduct: [],
    topRatedProduct: [],
    discountProduct: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.categories;
    });
    builder.addCase(getProductsByType.fulfilled, (state, { payload }) => {
      state.products = payload.products;
      state.latestProduct = payload.latestProduct;
      state.topRatedProduct = payload.topRatedProduct;
      state.discountProduct = payload.discountProduct;
    });
  },
});

export default homeReducer.reducer;
