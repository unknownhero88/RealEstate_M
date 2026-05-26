import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Mail, Lock, Home } from "lucide-react";
import { loginApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/auth/InputField";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginApi(data);
      const authData = response.data;

      // Save to context + localStorage
      login(authData);

      toast.success(`Welcome back, ${authData.fullName}!`);

      // Role-based redirect
      setTimeout(() => {
        if (authData.role === "ADMIN") navigate("/admin/dashboard");
        else if (authData.role === "SELLER") navigate("/seller/dashboard");
        else navigate("/");
      }, 1000);
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br 
                        from-green-50 to-blue-50 
                        flex items-center justify-center p-4"
    >
      <Toaster position="top-right" />

      <div className="auth-card">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Home className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register("email")}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Forgot Password */}
          <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
