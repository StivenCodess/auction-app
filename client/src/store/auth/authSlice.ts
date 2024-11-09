import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: {
    uid?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    photo_url?: string;
  };
  errorMessage?: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    user: {},
    errorMessage: undefined,
  } as AuthState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onUserInfoUpdate: (state, { payload }) => {
      state.user = payload;
    },
    onLogout: (state) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onLogout,
  onUserInfoUpdate,
  clearErrorMessage,
} = authSlice.actions;
