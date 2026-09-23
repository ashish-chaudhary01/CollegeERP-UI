import { FingerprintPattern, MoveLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("assiku@gmail.com");
  const [otp, setOtp] = useState("");
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState("");

  //   verify email
  const handleForgotPassword = async () => {
    try {
      setEmailVerifying(true);
      setError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Unable to reset password.",
        );
      }
      setEmailVerified(true);
    } catch (error) {
      setError(error.message || "Unable to reset password try again.");
    } finally {
      setEmailVerifying(false);
    }
  };

  //   verify otp
  const handleVerifyOtp = async () => {};
  return (
    <div className="flex pt-20 sm:pt-32 md:pt-40 justify-center w-full h-screen">
      <div className="max-w-md p-4 w-full">
        {/* icon */}
        <div className="flex items-center justify-center mb-4">
          <FingerprintPattern
            size={50}
            className=" border border-slate-200 p-3 rounded-lg text-4xl"
          />
        </div>
        <h2 className="text-2xl font-bold tracking-wide text-center">
          {emailVerified ? "Password Reset" : "Forgot Password?"}
        </h2>
        <p className="mt-1 text-sm text-gray-700 text-center font-medium">
          {emailVerified ? (
            <span>
              OTP is sent to{" "}
              <span className="font-semibold text-slate-800">{email}</span>
            </span>
          ) : (
            "Enter your email to request an reset otp"
          )}
        </p>

        <div className="mt-6">
          <label
            htmlFor={emailVerified ? "otp" : "email"}
            className="block font-semibold text-xs text-slate-500"
          >
            {emailVerified ? "Enter OTP" : "Email"}
          </label>
          <input
            type={emailVerified ? "text" : "email"}
            name={emailVerified ? "otp" : "email"}
            value={emailVerified ? otp : email}
            onChange={(e) => {
              emailVerified ? setOtp(e.target.value) : setEmail(e.target.value);
              setError("");
            }}
            placeholder={emailVerified ? "Enter otp" : "Enter your email"}
            className="mt-1 w-full px-4 py-3 border border-slate-300 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
          />
          {/*  button */}
          <button
            onClick={emailVerified ? handleVerifyOtp : handleForgotPassword}
            disabled={emailVerifying}
            className="mt-4 w-full py-2 bg-blue-700 rounded text-white font-semibold text-md shadow hover:bg-blue-600 duration-200"
          >
            {emailVerifying
              ? "Verfying email..."
              : emailVerified
                ? "Verify OTP"
                : "Reset Password"}
          </button>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <Link
            to="/"
            className="group flex items-center justify-center gap-2 text-sm mt-3 text-gray-700"
          >
            <span className="group-hover:-translate-x-1.5 ease-out duration-200">
              <MoveLeft />
            </span>
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
