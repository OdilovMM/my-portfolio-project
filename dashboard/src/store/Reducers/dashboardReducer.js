import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getAdminDashboardInfo = createAsyncThunk(
  "dashboard/getAdminDashboardInfo",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/get-admin-dashboard-info", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    loader: false,
    successMessage: "",
    errorMessage: "",
    totalSales: 0,
    totalOrders: 0,
    totalProduct: 0,
    totalSellers: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    recentChats: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardInfo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getAdminDashboardInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.totalAmount = payload.totalAmount;
        // state.withdrawAmount = payload.withdrawAmount;
        // state.availableAmount = payload.availableAmount;
        // state.pendingAmount = payload.pendingAmount;
        // state.pendingWithdraws = payload.pendingWithdraws;
        // state.successWithdraws = payload.successWithdraws;
      })
      .addCase(getAdminDashboardInfo.rejected, (state, { payload }) => {
        state.loader = false;
      });
  },
});

export default dashboardReducer.reducer;
