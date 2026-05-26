import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { User, Mail, Lock, Phone, Home } from "lucide-react";
import { registerApi } from "../../api/authApi";
import InputField from "../../components/auth/InputField";
import RoleSelector from "../../components/auth/RoleSelector";

// ─────────────────────────────────────────
// VALIDATION SCHEMA
// ─────────────────────────────────────────
const schema = yup.object({
  fullName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@$!%*?&]/, "Must contain a special character (@$!%*?&)")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number (10 digits)")
    .required("Phone number is required"),
  role: yup
    .string()
    .oneOf(["BUYER", "SELLER"], "Please select a role")
    .required("Role is required"),
});

const onSubmit = async (data) => {
  try {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role || "BUYER",
    };
    await registerApi(payload);
    navigate("/register-success");
  } catch (error) {
    // ✅ Show actual backend message instead of generic one
    const message =
      error.response?.data?.message || "Registration failed. Please try again.";
    setError(message); // or toast(message)
  }
};
// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Remove confirmPassword before sending
      const { confirmPassword, ...requestData } = data;
      await registerApi(requestData);

      toast.success("Registration successful! Please check your email.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      // Show field-level errors from backend
      if (error.response?.data?.data) {
        const fieldErrors = error.response.data.data;
        Object.values(fieldErrors).forEach((msg) => toast.error(msg));
      } else {
        toast.error(message);
      }
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
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-1">Join Real Estate Portal</p>
        </div>

        <RoleSelector
          selectedRole={selectedRole}
          register={register}
          error={errors.role?.message}
        />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register("email")}
          />

          <InputField
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            icon={Phone}
            error={errors.phone?.message}
            {...register("phone")}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Min 8 chars, uppercase, number, symbol"
            icon={Lock}
            error={errors.password?.message}
            {...register("password")}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            icon={Lock}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
