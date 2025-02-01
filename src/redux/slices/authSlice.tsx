import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  _id: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  userData: UserData | null;
}

const storedUserData = localStorage.getItem("userData");
const initialState: AuthState = { 
  isAuthenticated: localStorage.getItem("userToken") ? true : false,
  accessToken: localStorage.getItem("userToken") || "",
  userData: storedUserData ? JSON.parse(storedUserData) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string; userData: UserData }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.userData = action.payload.userData;
      localStorage.setItem("userToken", action.payload.accessToken);
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      state.userData = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;