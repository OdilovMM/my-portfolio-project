import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const getCustomerCartProducts = createAsyncThunk(
  "cart/getCustomerCartProducts",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/cart/get-customer-cart/${userId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/cart/add-cart`, id, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/cart/remove-product-from-cart/${id}`,
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

export const incrementProductQuantity = createAsyncThunk(
  "cart/incrementProductQuantity",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    console.log(productId);
    try {
      const { data } = await api.patch(
        `/cart/increment-product-of-cart/${productId}`,
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
export const decrementProductQuantity = createAsyncThunk(
  "cart/decrementProductQuantity",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    console.log(productId);
    try {
      const { data } = await api.patch(
        `/cart/decrement-product-of-cart/${productId}`,
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

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    card_products: [],
    card_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shipping_fee: 0,
    outofstock_products: [],
    buy_product_item: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.card_product_count = state.card_product_count + 1;
        toast.success(payload.message);
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        toast.error(payload.error);
      })
      .addCase(getCustomerCartProducts.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getCustomerCartProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.card_products = payload.card_products;
        state.price = payload.price;
        state.card_product_count = payload.card_product_count;
        state.shipping_fee = payload.shipping_fee;
        state.outofstock_products = payload.outOfStockProduct;
        state.buy_product_item = payload.buy_product_item;
      })
      .addCase(getCustomerCartProducts.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(deleteProductFromCart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(incrementProductQuantity.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(decrementProductQuantity.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
