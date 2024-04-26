import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getSellerRequest = createAsyncThunk(
  "seller/getSellerRequest",
  async ({ parPage, page, search }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/get-seller-req?page=${page}&&search=${search}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerDetail = createAsyncThunk(
  "seller/getSellerDetail",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    console.log(sellerId);
    try {
      const { data } = await api.get(`/seller/get-seller-detail/${sellerId}`, {
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

export const updateSellerStatus = createAsyncThunk(
  "seller/updateSellerStatus",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller/update-seller-status`, info, {
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

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSellers: 0,
    seller: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSellerRequest.fulfilled, (state, { payload }) => {
      state.totalSellers = payload.totalSellers;
      state.sellers = payload.sellers;
    });
    builder.addCase(getSellerDetail.fulfilled, (state, { payload }) => {
      state.seller = payload.seller;
    });
    builder.addCase(updateSellerStatus.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(updateSellerStatus.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.seller = payload.seller;
      toast.success(payload.message);
    });
    builder.addCase(updateSellerStatus.rejected, (state, { payload }) => {
      state.loader = false;
      toast.error(payload.message);
    });
  },
});

export default sellerReducer.reducer;
