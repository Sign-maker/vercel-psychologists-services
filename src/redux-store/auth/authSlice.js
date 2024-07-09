import { createSlice } from "@reduxjs/toolkit";
import { getCurrent, signIn, signOutUser, signUp } from "./authOperations";

const initialState = {
  user: null,
  isLoggedIn: false,
  isRefreshing: true,
  isUserLoading: false,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //signUp
    builder.addCase(signUp.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.isLoggedIn = true;
      state.user = payload;
      state.error = null;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.isUserLoading = false;
      state.isLoggedIn = false;
      state.error = payload;
    });
    //signIn
    builder.addCase(signIn.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.isLoggedIn = true;
      state.user = payload;
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.isUserLoading = false;
      state.isLoggedIn = false;
      state.error = payload;
    });
    //signOut
    builder.addCase(signOutUser.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.isUserLoading = false;
      state.error = null;
    });
    builder.addCase(signOutUser.rejected, (state, { payload }) => {
      state.error = payload;
      state.isUserLoading = false;
    });
    //getCurrent
    builder.addCase(getCurrent.pending, (state) => {
      state.isRefreshing = true;
    });
    builder.addCase(getCurrent.fulfilled, (state, { payload }) => {
      state.isRefreshing = false;
      state.isLoggedIn = true;
      state.user = payload;
      state.error = null;
    });
    builder.addCase(getCurrent.rejected, (state, { payload }) => {
      state.error = payload;
      state.isRefreshing = false;
    });
  },
});
