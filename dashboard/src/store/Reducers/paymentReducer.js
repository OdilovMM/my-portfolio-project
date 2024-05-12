import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getSellerPaymentDetails = createAsyncThunk(
  "payment/getSellerPaymentDetails",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/get-seller-payment-details/${sellerId}`,
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

export const sendWithdrawalRequest = createAsyncThunk(
  "payment/sendWithdrawalRequest",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/payment/send-withdrawal-request",
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

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdraws: [],
    successWithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    availableAmount: 0,
    pendingAmount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSellerPaymentDetails.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getSellerPaymentDetails.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.totalAmount = payload.totalAmount;
        state.withdrawAmount = payload.withdrawAmount;
        state.availableAmount = payload.availableAmount;
        state.pendingAmount = payload.availableAmount;
        state.pendingWithdraws = payload.pendingWithdraws;
        state.successWithdraws = payload.successWithdraws;
      })
      .addCase(getSellerPaymentDetails.rejected, (state, { payload }) => {
        state.loader = false;
      });
  },
});

export default paymentReducer.reducer;
