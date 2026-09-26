
import { configureStore } from "@reduxjs/toolkit";
import userslice from "./userslice.js";

export const store = configureStore({
  reducer: {
    user: userslice
  }
});