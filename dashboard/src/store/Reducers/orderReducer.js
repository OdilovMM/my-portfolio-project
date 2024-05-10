import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getAdminAllOrders = createAsyncThunk(
  "order/getAdminAllOrders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/order/get-admin-order?page=${page}&&search=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    totalOrders: 0,
    order: {},
    myOrders: [],
    successMessage: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminAllOrders.fulfilled, (state, { payload }) => {
      state.totalOrders = payload.totalOrder;
      state.myOrders = payload.orders;
    });
  },
});

export default orderReducer.reducer;
