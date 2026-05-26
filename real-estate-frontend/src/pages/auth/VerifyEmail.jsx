import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { verifyEmailApi } from "../../api/authApi";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const response = await verifyEmailApi(token);
        setStatus("success");
        setMessage(response.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. Link may have expired.",
        );
      }
    };

    verify();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br 
                        from-green-50 to-blue-50 
                        flex items-center justify-center p-4"
    >
      <div className="auth-card text-center">
        {/* Loading */}
        {status === "loading" && (
          <>
            <Loader
              className="h-16 w-16 text-green-600 
                                          animate-spin mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              Verifying your email...
            </h2>
            <p className="text-gray-500 mt-2">Please wait</p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <CheckCircle
              className="h-16 w-16 text-green-500 
                                               mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">Email Verified!</h2>
            <p className="text-gray-500 mt-2">{message}</p>
            <Link to="/login">
              <button className="btn-primary mt-6">Go to Login</button>
            </Link>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <XCircle
              className="h-16 w-16 text-red-500 
                                           mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-gray-500 mt-2">{message}</p>
            <Link to="/register">
              <button className="btn-primary mt-6">Register Again</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
