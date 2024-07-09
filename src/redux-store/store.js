import { configureStore } from "@reduxjs/toolkit";
import { psychologistsSlice } from "./psychologists/psychologistsSlice";
import { authSlice } from "./auth/authSlice";
import { filterSlice } from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    [psychologistsSlice.name]: psychologistsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
  },
});
