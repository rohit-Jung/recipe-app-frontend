import { IUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  refreshToken?: string;
  accessToken?: string;
  csrfToken?: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
  refreshToken: undefined,
  accessToken: undefined,
  csrfToken: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: IUser;
        accessToken: string;
        refreshToken: string;
        csrfToken: string;
      }>
    ) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.csrfToken = action.payload.csrfToken;

      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.csrfToken = undefined;

      localStorage.removeItem("isLoggedIn");
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setCSRFToken(state, action: PayloadAction<string>) {
      state.csrfToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, setRefreshToken, setCSRFToken } =
  authSlice.actions;
export default authSlice.reducer;
