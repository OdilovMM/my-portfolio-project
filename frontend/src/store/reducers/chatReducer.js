import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

// export const registerUserCustomer = createAsyncThunk(
//   "chat/registerUserCustomer",
//   async (info, { rejectWithValue, fulfillWithValue }) => {
//     console.log(info);
//     try {
//       const { data } = await api.post(`/customer/register-customer`, info, {
//         withCredentials: true,
//       });
//       localStorage.setItem("customerToken", data.token);

//       console.log(data);
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
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(registerUserCustomer.pending, (state, { payload }) => {
  //         state.loader = true;
  //       })
  //       .addCase(registerUserCustomer.fulfilled, (state, { payload }) => {
  //         state.loader = false;
  //         state.successMessage = payload.message;
  //         toast.success(payload.message);
  //       })
  //       .addCase(registerUserCustomer.rejected, (state, { payload }) => {
  //         state.loader = false;
  //         state.errorMessage = payload.error;
  //         toast.error(payload.error);
  //       })

  //   },
});
export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;
