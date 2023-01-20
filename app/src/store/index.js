import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/AuthSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
