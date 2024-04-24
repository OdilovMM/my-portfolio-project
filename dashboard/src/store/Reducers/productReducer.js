import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addProduct = createAsyncThunk(
  "product/addCategory",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(product);
      const { data } = await api.post("/products/add-product", product, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ parPage, page, search }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products/get-product?page=${page}&&search=${search}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    totalProducts: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        // state.token = payload.token;
        toast.success(payload.message);
        console.log(payload);
        console.log(payload.message);
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
        state.products = [...state.products, payload.category];
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.totalProducts = payload.totalProducts;
        state.products = payload.products;
      });
  },
});

export default productReducer.reducer;
