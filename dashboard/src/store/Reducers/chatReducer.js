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

export const sendMessageToCustomer = createAsyncThunk(
  "chat/sendMessageToCustomer",
  async (messageInfo, { rejectWithValue, fulfillWithValue }) => {
    console.log(messageInfo);
    try {
      const { data } = await api.post(
        `/chat/send-message-to-customer`,
        messageInfo,
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
    successMessage: "",
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
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.customers = payload.customers;
        // toast.success(payload.message);
      })
      .addCase(getCustomers.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload.error);
      })

      .addCase(getCustomerMessage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCustomerMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
        // toast.success(payload.success);
      })
      .addCase(getCustomerMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload.error);
      })
      .addCase(sendMessageToCustomer.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(sendMessageToCustomer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.sentMessage.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, payload.sentMessage];
        // toast.success(payload.success);
        state.successMessage = "success";
      })
      .addCase(sendMessageToCustomer.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(payload.error);
      });
  },
});
export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
