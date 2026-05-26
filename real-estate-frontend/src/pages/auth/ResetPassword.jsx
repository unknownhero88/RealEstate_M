import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Lock } from "lucide-react";
import { resetPasswordApi } from "../../api/authApi";
import InputField from "../../components/auth/InputField";

const schema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@$!%*?&]/, "Must contain a special character")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordApi(token, data.newPassword);
      toast.success("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset failed. Link may have expired.",
      );
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
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔑</div>
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-500 mt-1">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="New Password"
            type="password"
            placeholder="Min 8 chars, uppercase, number, symbol"
            icon={Lock}
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <InputField
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter new password"
            icon={Lock}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
