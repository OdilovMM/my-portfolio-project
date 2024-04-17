import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const admin_Login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {
    clearMessage: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    //
    builder
      .addCase(admin_Login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_Login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        toast.success(payload.message)
      })
      .addCase(admin_Login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      });
  },
});

export const { clearMessage } = authReducer.actions;
export default authReducer.reducer;
