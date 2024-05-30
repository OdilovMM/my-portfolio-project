import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const admin_Login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "auth/get_user_detail",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-user-detail", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/seller-register", info, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const profileImageUpload = createAsyncThunk(
  "auth/uploadProfileImage",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch("/auth/upload-profile-image", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProfileInfo = createAsyncThunk(
  "auth/addProfileInfo",
  async (detail, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/add-profile-address", detail, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("accessToken");
      if (role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/login");
      }
      return fulfillWithValue(data);
    } catch (error) {
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
    imgLoader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    clearMessage: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_Login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_Login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
        toast.success(payload.message);
      })
      .addCase(admin_Login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(seller_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
        toast.success(payload.message);
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      //
      .addCase(seller_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
        toast.success(payload.message);
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
        console.log(payload.error);
      })
      .addCase(getUserDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })
      .addCase(profileImageUpload.pending, (state, { payload }) => {
        state.imgLoader = true;
      })
      .addCase(profileImageUpload.fulfilled, (state, { payload }) => {
        state.imgLoader = false;
        state.userInfo = payload.userInfo;
        toast.success(payload.message);
      })
      .addCase(profileImageUpload.rejected, (state, { payload }) => {
        state.imgLoader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(addProfileInfo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProfileInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        toast.success(payload.message);
      })
      .addCase(addProfileInfo.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = "";
        toast.success(payload.message);
      });
  },
});

export const { clearMessage } = authReducer.actions;
export default authReducer.reducer;
