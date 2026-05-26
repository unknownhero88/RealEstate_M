import axiosInstance from "./axiosConfig";

// ─────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────
export const registerApi = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
export const loginApi = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

// ─────────────────────────────────────────
// VERIFY EMAIL
// ─────────────────────────────────────────
export const verifyEmailApi = async (token) => {
  const response = await axiosInstance.get("/auth/verify-email", {
    params: { token },
  });
  return response.data;
};

// ─────────────────────────────────────────
// FORGOT PASSWORD
// ─────────────────────────────────────────
export const forgotPasswordApi = async (email) => {
  const response = await axiosInstance.post("/auth/forgot-password", null, {
    params: { email },
  });
  return response.data;
};

// ─────────────────────────────────────────
// RESET PASSWORD
// ─────────────────────────────────────────
export const resetPasswordApi = async (token, newPassword) => {
  const response = await axiosInstance.post("/auth/reset-password", null, {
    params: { token, newPassword },
  });
  return response.data;
};

// ─────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────
export const logoutApi = async (refreshToken) => {
  const response = await axiosInstance.post("/auth/logout", null, {
    params: { refreshToken },
  });
  return response.data;
};
