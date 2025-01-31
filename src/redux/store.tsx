import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import studentDataReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    studentData: studentDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
