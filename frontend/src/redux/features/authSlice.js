import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = "";
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setAuth, logout, finishInitialLoad, setUser } =
  authSlice.actions;
export default authSlice.reducer;
