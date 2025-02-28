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
export const getSellerAllOrders = createAsyncThunk(
  "order/getSellerAllOrders",
  async (
    { parPage, page, searchValue, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/order/get-seller-order/${sellerId}?page=${page}&search=${searchValue}&parPage=${parPage}`,
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

    try {
      const { data } = await api.get(
        `/order/get-admin-order-detail/${orderId}`,
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
export const getSellerSingleOrderDetail = createAsyncThunk(
  "order/getSellerSingleOrderDetail",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.get(
        `/order/get-seller-single-order-detail/${orderId}`,
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

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.patch(
        `/order/admin-update-order-status/${orderId}`,
        info,
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
export const sellerUpdateOrderStatus = createAsyncThunk(
  "order/sellerUpdateOrderStatus",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {

    try {
      const { data } = await api.patch(
        `/order/seller-update-order-status/${orderId}`,
        info,
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
      })
      .addCase(getSellerAllOrders.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSellerAllOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrders = payload.totalOrder;
        // toast.success(payload.message);
      })
      .addCase(getSellerAllOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })

      .addCase(getSellerSingleOrderDetail.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSellerSingleOrderDetail.fulfilled, (state, { payload }) => {
        state.order = payload.order;
        // toast.success(payload.message);
      })
      .addCase(getSellerSingleOrderDetail.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })
      .addCase(sellerUpdateOrderStatus.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(sellerUpdateOrderStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
      })
      .addCase(sellerUpdateOrderStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      });
  },
});

export default orderReducer.reducer;
