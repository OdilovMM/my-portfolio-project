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
// export const sendMessage = createAsyncThunk(
//   "chat/sendMessage",
//   async (messageInfo, { rejectWithValue, fulfillWithValue }) => {
//     console.log(messageInfo);
//     try {
//       const { data } = await api.post(
//         `/chat/send-message-to-seller`,
//         messageInfo,
//         {
//           withCredentials: true,
//         }
//       );

//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
      });
    //   .addCase(sendMessage.pending, (state, { payload }) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(sendMessage.fulfilled, (state, { payload }) => {
    //     state.isLoading = false;
    //     let tempFriends = state.myFriends;
    //     let index = tempFriends.findIndex(
    //       (f) => f.fdId === payload.messageText.receiverId
    //     );
    //     while (index > 0) {
    //       let temp = tempFriends[index];
    //       tempFriends[index] = tempFriends[index - 1];
    //       tempFriends[index - 1] = temp;
    //       index--;
    //     }
    //     state.myFriends = tempFriends;
    //     state.friendMessages = [...state.friendMessages, payload.messageText];
    //     console.log(Array.isArray(payload.messageText));
    //     console.log(state.friendMessages);
    //   })
    //   .addCase(sendMessage.rejected, (state, { payload }) => {
    //     state.isLoading = false;
    //     toast.error(payload.error);
    //   });
  },
});
// export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
