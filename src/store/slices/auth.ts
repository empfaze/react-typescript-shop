import { AuthState, AuthPayload } from "../../types/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: AuthState = {
  isAuth: false,
  token: null,
  expirationTime: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action: AuthPayload) => {
      state.isAuth = true;
      state.token = action.payload.jwtToken;
      state.expirationTime = action.payload.expTime;
    },
    logout: (state) => {
      state.isAuth = false;
      state.expirationTime = null;
      state.token = null;
    },
  },
});
export const authActions = authSlice.actions;
