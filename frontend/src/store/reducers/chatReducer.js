import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addFriendChat = createAsyncThunk(
  "chat/addFriend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post(`/chat/add-customer-chat`, info, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue, fulfillWithValue }) => {
    console.log(message);
    try {
      const { data } = await api.post(`/chat/send-message-to-seller`, message, {
        withCredentials: true,
      });

      console.log(data);
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
    myFriend: [],
    friendMessages: [],
    currentFriend: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFriendChat.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(addFriendChat.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
        state.friendMessages = payload.message;
        state.currentFriend = payload.currentFriend;
        state.myFriend = payload.MyFriends;
      })
      .addCase(addFriendChat.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      });
  },
});
export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
