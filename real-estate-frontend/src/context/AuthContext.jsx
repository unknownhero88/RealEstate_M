import { createContext, useContext, useState, useEffect } from "react";
import {
  saveTokens,
  clearTokens,
  saveUser,
  getUser,
  isLoggedIn,
} from "../utils/tokenUtils";
import { logoutApi } from "../api/authApi";

// ─────────────────────────────────────────
// CREATE CONTEXT
// ─────────────────────────────────────────
const AuthContext = createContext(null);

// ─────────────────────────────────────────
// PROVIDER
// ─────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    if (isLoggedIn()) {
      const savedUser = getUser();
      if (savedUser) setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Called after successful login
  const login = (authData) => {
    saveTokens(authData.accessToken, authData.refreshToken);
    const userData = {
      userId: authData.userId,
      fullName: authData.fullName,
      email: authData.email,
      role: authData.role,
      isVerified: authData.isVerified,
    };
    saveUser(userData);
    setUser(userData);
  };

  // Called on logout
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) await logoutApi(refreshToken);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
      setUser(null);
    }
  };

  // Role checkers
  const isAdmin = () => user?.role === "ADMIN";
  const isSeller = () => user?.role === "SELLER";
  const isBuyer = () => user?.role === "BUYER";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isSeller,
        isBuyer,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ─────────────────────────────────────────
// CUSTOM HOOK
// ─────────────────────────────────────────
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
