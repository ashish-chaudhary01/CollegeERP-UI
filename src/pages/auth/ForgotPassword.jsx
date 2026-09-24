import {
  CircleCheckBig,
  FingerprintPattern,
  GraduationCap,
  IndianRupee,
  MoveLeft,
  School,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

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
  const [passwordReseted, setPasswordReseted] = useState(false);

  const navigate = useNavigate();

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
      setPasswordReseted(true);
      setTimeout(() => {
        setPasswordReseted(false);
      }, 3000);
      navigate("/", { replace: true });
    } catch (error) {
      setError("unable to reset password");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 h-screen w-full ">
      {/* left container */}
      <div className="flex justify-center pt-44 w-full h-full">
        <div className="max-w-md p-4 w-full ">
          {/* icon */}
          <div className="sm:flex items-center justify-center mb-4">
            <FingerprintPattern
              size={50}
              className=" border border-slate-200 p-3 rounded-lg text-4xl"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-wide sm:text-center">
            {otpVerified
              ? "Set new password"
              : emailVerified
                ? "Password Reset"
                : "Forgot Password?"}
          </h2>
          <p className="mt-1 text-sm text-gray-700 sm:text-center font-medium">
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
                  onClick={
                    emailVerified ? handleVerifyOtp : handleForgotPassword
                  }
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
      {/* right container */}
      <div className="relative hidden min-h-screen overflow-hidden lg:block">
        {/* background image */}
        <img
          src="/college_img.png"
          alt="image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-slate-950/70" />
        {/* content */}
        <div className="relative z-10 flex flex-col h-full justify-center px-12 lg:px-16">
          {/* heading */}
          <h1 className="text-4xl max-w-xl xl:text-5xl leading-tight text-white font-bold">
            Empowering Education Through{" "}
            <span className="text-[#8666F8]">Technology</span>
          </h1>
          {/* description */}
          <p className="max-w-lg text-sm text-gray-300 mt-1">
            {" "}
            A smarter, simpler and more connected way to manage college .
          </p>

          {/* features */}
          <div className="flex gap-12 items-center mt-8 text-white">
            {/* feature 1 */}
            <div className="flex flex-col gap-1 items-center">
              <span className="bg-white/10 hover:bg-white/20 duration-150 border border-white/10 backdrop-blur-xl rounded-md flex items-center text-center p-2">
                <Users />
              </span>
              <span className="text-xs text-center">
                Manage <br />
                Students
              </span>
            </div>
            {/* feature 2 */}
            <div className="flex flex-col gap-1 items-center">
              <span className="bg-white/10 border hover:bg-white/20 duration-150 border-white/10 backdrop-blur-xl rounded-md flex items-center text-center p-2">
                <School />
              </span>
              <span className="text-xs text-center">
                Manage <br />
                Departments
              </span>
            </div>
            {/* feature 3 */}
            <div className="flex flex-col gap-1 items-center">
              <span className="bg-white/10 hover:bg-white/20 duration-150 border border-white/10 backdrop-blur-xl rounded-md flex items-center text-center p-2">
                <GraduationCap />
              </span>
              <span className="text-xs text-center">
                Manage <br />
                Teacher
              </span>
            </div>
            {/* feature 4 */}
            <div className="flex flex-col gap-1 items-center">
              <span className="bg-white/10 hover:bg-white/20 duration-150 border border-white/10 backdrop-blur-xl rounded-md flex items-center text-center p-2">
                <IndianRupee />
              </span>
              <span className="text-xs text-center">
                Simplify <br />
                Fees
              </span>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-16">
            <p className="text-xl italic text-white/80">Better Systems,</p>

            <p className="text-xl italic text-white/80">
              Stronger Institutions
            </p>

            <div className="mt-3 h-1 w-24 rounded-full bg-[#8666F8]" />
          </div>
        </div>
      </div>

      {/* password reset successfull modal */}
      {passwordReseted && (
        <div className="absolute flex items-center gap-3 left-4 bottom-4 bg-white shadow-sm px-4 py-2.5 rounded-md text-sm text-green-700 font-medium animate-in">
          <span>
            <CircleCheckBig size={20} />
          </span>
          <p>Password reset successfully</p>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
