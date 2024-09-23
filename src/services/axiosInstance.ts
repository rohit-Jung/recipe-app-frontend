import axios from "axios";
import endPoints from "./endPoints"; // Import endpoints

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "http://127.0.0.1:8000/api/v1/"
    : "http://127.0.0.1:8000/api/v1/";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const csrfToken = localStorage.getItem("csrfToken");
    const accessToken = localStorage.getItem("accessToken");

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await api.post(endPoints.tokenRefresh, {
            refresh: refreshToken,
          });

          localStorage.setItem("accessToken", data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;

          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export { api };
