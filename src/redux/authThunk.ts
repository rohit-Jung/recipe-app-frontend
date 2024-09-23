import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "./authSlice";
import { api } from "@/services/axiosInstance";
import endPoints from "@/services/endPoints";
import { IErrorResponse } from "@/types";
import axios from "axios";

const handleError = (error: unknown): IErrorResponse => {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data.message || error.message);
    return { message: error.response?.data.message || error.message };
  } else {
    console.error("An unexpected error occurred");
    return { message: "An unexpected error occurred" };
  }
};

export const fetchCurrentUser = createAsyncThunk(
  "http://127.0.0.1:8000/accounts/current-user/",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(endPoints.getCurrentUser);
      const { data, access, refresh, csrf_token } = response.data;
      if (data) {
        thunkAPI.dispatch(
          login({
            user: data,
            accessToken: access,
            refreshToken: refresh,
            csrfToken: csrf_token,
          })
        );
      } else {
        thunkAPI.dispatch(logout());
      }

      return response.data;
    } catch (error: unknown) {
      thunkAPI.dispatch(logout()); 

      // Extract relevant error details for serialization
      const serializedError = handleError(error).message;
      return thunkAPI.rejectWithValue(serializedError);
    }
  }
);
