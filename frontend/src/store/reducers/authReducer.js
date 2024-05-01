import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";

export const registerUserCustomer = createAsyncThunk(
  "customerAuth/registerUserCustomer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post(`/customer/register-customer`, info, {
        withCredentials: true,
      });
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserCustomer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(registerUserCustomer.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.token = payload.token;
        toast.success(payload.message);
      })
      .addCase(registerUserCustomer.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
      });
  },
});

export default authReducer.reducer;
