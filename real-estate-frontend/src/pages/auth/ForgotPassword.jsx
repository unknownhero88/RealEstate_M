import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { forgotPasswordApi } from "../../api/authApi";
import InputField from "../../components/auth/InputField";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPasswordApi(data.email);
      setSubmitted(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // After submission show success message
  if (submitted) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br 
                            from-green-50 to-blue-50 
                            flex items-center justify-center p-4"
      >
        <div className="auth-card text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-bold text-gray-800">Check Your Email</h2>
          <p className="text-gray-500 mt-2">
            We've sent a password reset link to your email. The link expires in
            30 minutes.
          </p>
          <Link to="/login">
            <button className="btn-secondary mt-6">Back to Login</button>
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800">Forgot Password?</h1>
          <p className="text-gray-500 mt-1">
            Enter your email and we'll send a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            error={errors.email?.message}
            {...register("email")}
          />

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link
          to="/login"
          className="flex items-center justify-center 
                               gap-2 text-gray-500 text-sm mt-6 
                               hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
