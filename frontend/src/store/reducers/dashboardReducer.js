import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getDashboardIndexData = createAsyncThunk(
  "dashboard/getDashboardIndexData",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    console.log(userId);
    try {
      const { data } = await api.get(`/order/get-dashboard-data/${userId}`, {
        withCredentials: true,
      });

      console.log(data);
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
    errorMessage: "",
    successMessage: "",
    recentOrders: [],
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardIndexData.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getDashboardIndexData.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.recentOrders = payload.recentOrders;
        state.pendingOrder = payload.pendingOrder;
        state.cancelledOrder = payload.cancelledOrder;
        state.totalOrder = payload.totalOrder;
      });
    //   .addCase(registerUserCustomer.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //     toast.error(payload.error);
    //   })
    //   .addCase(loginUserCustomer.pending, (state, { payload }) => {
    //     state.loader = true;
    //   })
    //   .addCase(loginUserCustomer.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message;
    //     toast.success(payload.message);
    //     const userInfo = decodeToken(payload.token);
    //     state.userInfo = userInfo;
    //   })
    //   .addCase(loginUserCustomer.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //     toast.error(payload.error);
    //   });
  },
});
export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
