import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getCustomers = createAsyncThunk(
  "chat/getCustomers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-customers/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustomerMessage = createAsyncThunk(
  "chat/getCustomerMessage",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    console.log(customerId);
    try {
      const { data } = await api.get(
        `/chat/get-customer-message/${customerId}`,
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

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: "",
    friends: [],
    sellerAdminMessage: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.customers = payload.customers;
        toast.success(payload.message);
      })
      .addCase(getCustomers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })

      .addCase(getCustomerMessage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCustomerMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
        toast.success(payload.success);
      })
      .addCase(getCustomerMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      });
  },
});
// export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
