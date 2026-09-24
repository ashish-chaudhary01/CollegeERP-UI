import { FingerprintPattern, MoveLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  //   verify email
  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setError("");
      if (email === "") {
        throw new Error("Email is empty");
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
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
      setLoading(false);
    }
  };

  //   verify otp
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "failed to verify otp");
      }
      setResetToken(data.resetToken);
      setOtpVerified(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // reset password
  const handleResetPassword = async () => {
    try {
      if (password === "" || confirmPassword === "" || password.length < 8) {
        throw new Error("Password must be of 8 characters");
      }
      if (password !== confirmPassword)
        throw new Error("confirm password do not match");
      setLoading(true);
      setError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ resetToken, password, confirmPassword }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || data.error || "unable to reset password",
        );
      }
    } catch (error) {
      setError("unable to reset password");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
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
          {otpVerified
            ? "Set new password"
            : emailVerified
              ? "Password Reset"
              : "Forgot Password?"}
        </h2>
        <p className="mt-1 text-sm text-gray-700 text-center font-medium">
          {otpVerified ? (
            "choose a strong password"
          ) : emailVerified ? (
            <span>
              OTP is sent to{" "}
              <span className="font-semibold text-slate-800">{email}</span>
            </span>
          ) : (
            "Enter your email to request an reset otp"
          )}
        </p>

        <div className="mt-6">
          {otpVerified ? (
            <>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block font-semibold text-xs text-slate-500"
                >
                  Password
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="newPassword"
                  className="mt-1 w-full px-4 py-3 border border-slate-300 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold text-xs text-slate-500"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                  className="mt-1 w-full px-4 py-3 border border-slate-300 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
                />
              </div>
              {/* button */}
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="mt-4 w-full py-2 bg-blue-700 rounded text-white font-semibold text-md shadow hover:bg-blue-600 duration-200"
              >
                {loading ? "Reseting Password..." : "Reset Password"}
              </button>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </>
          ) : (
            <>
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
                required
                onChange={(e) => {
                  emailVerified
                    ? setOtp(e.target.value)
                    : setEmail(e.target.value.toLowerCase());
                  setError("");
                }}
                placeholder={emailVerified ? "Enter otp" : "Enter your email"}
                className="mt-1 w-full px-4 py-3 border border-slate-300 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
              />
              {/*  button */}
              <button
                onClick={emailVerified ? handleVerifyOtp : handleForgotPassword}
                disabled={loading}
                className="mt-4 w-full py-2 bg-blue-700 rounded text-white font-semibold text-md shadow hover:bg-blue-600 duration-200"
              >
                {loading
                  ? emailVerified
                    ? "Verifying OTP..."
                    : "Sending OTP..."
                  : emailVerified
                    ? "Verify OTP"
                    : "Send OTP"}
              </button>
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </>
          )}

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
