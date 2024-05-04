import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (
    {
      products,
      items,
      shippingFee,
      price,
      shippingToAddress,
      userId,
      navigate,
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post(
        `/order/place-order`,
        {
          products,
          items,
          shippingFee,
          price,
          shippingToAddress,
          userId,
          navigate,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/payment", {
        state: {
          price: price + shippingFee,
          items,
          orderId: data.orderId,
        },
      });
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async ({ userId, status }, { rejectWithValue, fulfillWithValue }) => {
    console.log(userId);
    try {
      const { data } = await api.get(`/order/get-orders/${userId}/${status}`, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    loading: false,
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.myOrders = payload.orders;
      });
  },
});
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
