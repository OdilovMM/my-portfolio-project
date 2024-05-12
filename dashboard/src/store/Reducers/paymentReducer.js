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

export const getPaymentRequestFromSeller = createAsyncThunk(
  "payment/getPaymentRequestFromSeller",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/payment/get-admin-payment-request", {
        withCredentials: true,
      });
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
      })
      // sendWithdrawalRequest
      .addCase(sendWithdrawalRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(sendWithdrawalRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.pendingWithdraws = [
          ...state.pendingWithdraws,
          payload.withdrawal,
        ];
        state.availableAmount =
          state.availableAmount - payload.withdrawal.amount;
        state.pendingAmount = payload.withdrawal.amount;
        toast.success(payload.message);
      })
      .addCase(sendWithdrawalRequest.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
      })
      // getPaymentRequestFromSeller
      .addCase(getPaymentRequestFromSeller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getPaymentRequestFromSeller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.pendingWithdraws = payload.withdrawalRequest;
      })
      .addCase(getPaymentRequestFromSeller.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
      });
  },
});

export default paymentReducer.reducer;