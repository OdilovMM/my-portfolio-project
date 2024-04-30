import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getAllCategories = createAsyncThunk(
  "home/getAllCategories",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-categories`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.categories;
      console.log(state.categories);
    });
  },
});

export default homeReducer.reducer;
