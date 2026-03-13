import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  message: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { extra, rejectWithValue }) => {
    const { requestAuth } = extra;
    try {
      const response = await requestAuth.register(userData);
      
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { extra, rejectWithValue }) => {
    const { requestAuth } = extra;
    try {
      const { data } = await requestAuth.login(credentials);

      return data.token;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
