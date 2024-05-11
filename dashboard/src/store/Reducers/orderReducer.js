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

export const getSingleOrderDetail = createAsyncThunk(
  "order/getSingleOrderDetail",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    console.log(orderId);

    try {
      const { data } = await api.get(
        `/order/get-admin-order-detail/${orderId}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    console.log(orderId);

    try {
      const { data } = await api.patch(
        `/order/admin-update-order-status/${orderId}`,
        info,
        {
          withCredentials: true,
        }
      );
      console.log(data);
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
    builder
      .addCase(getAdminAllOrders.fulfilled, (state, { payload }) => {
        state.totalOrders = payload.totalOrder;
        state.myOrders = payload.orders;
      })
      .addCase(getSingleOrderDetail.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      .addCase(updateOrderStatus.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      });
  },
});

export default orderReducer.reducer;
