import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../utils/tokenUtils";

// ─────────────────────────────────────────
// BASE AXIOS INSTANCE
// ─────────────────────────────────────────
const axiosInstance = axios.create({
  baseURL: "http://localhost:8088/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ─────────────────────────────────────────
// REQUEST INTERCEPTOR
// Attach JWT token to every request
// ─────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─────────────────────────────────────────
// RESPONSE INTERCEPTOR
// Handle token expiry and auto refresh
// ─────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(
          "http://localhost:8080/api/auth/refresh-token",
          null,
          { params: { refreshToken } },
        );

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        saveTokens(accessToken, newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
