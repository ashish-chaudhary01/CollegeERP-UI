import { GraduationCap, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "hod") return <Navigate to="/hod/dashboard" replace />;
    if (user.role === "teacher")
      return <Navigate to="/teacher/dashboard" replace />;
    if (user.role === "student")
      return <Navigate to="/student/dashboard" replace />;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      const { user } = data; //user

      //  context + localStorage
      login(user);

      //   role based redirect
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
      if (user.role === "hod") {
        navigate("/hod/dashboard");
      }
      if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      }
      if (user.role === "student") {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid md:grid-cols-2 min-h-screen w-full p-2">
      {/* left container */}
      <div className="flex justify-center pt-44 w-full h-full">
        {/* logo */}
        <div className="absolute top-10 left-10 flex gap-3">
          <div className="bg-linear-to-br from-indigo-600 to-violet-500 rounded-xl p-3 text-white">
            <GraduationCap size={27} />{" "}
          </div>
          <div className="font-bold text-2xl flex flex-col">
            <span className="text-violet-600">CERP</span>
            <span className="text-gray-500 text-xs">College ERP System</span>
          </div>
        </div>
        <form onSubmit={handleClick} className="p-4 flex flex-col gap-8">
          {/* heading */}
          <div className="text-center">
            <h2 className="font-bold text-4xl text-black">Welcome Back</h2>
            <p className="text-sm text-gray-400 mt-2">
              Enter your email and password to access your account
            </p>
          </div>
          {/* inputs div container */}
          <div className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="email"
                className="text-[14px] font-semibold drop-shadow-xl mb-1 flex gap-1 items-center"
              >
                <Mail size={20} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded border-2 border-black/40 outline-0 focus:border-blue-600 duration-200 text-sm bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-[14px] font-semibold drop-shadow-xl mb-1 flex gap-1 items-center"
              >
                <Lock size={20} />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded border-2 border-black/40 outline-0 focus:border-blue-600 duration-200 text-sm bg-gray-100"
              />
            </div>
          </div>

          {/* button */}
          <div className="">
            <button
              disabled={loading}
              className="w-full py-2 bg-blue-700 rounded text-white font-semibold text-md shadow hover:bg-blue-600 duration-200"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="text-center text-[#6766CF] text-sm mt-2">
              Forgot your password?
            </p>
          </div>
        </form>
      </div>
      {/* right container */}
      <div className="hidden md:flex rounded-xl h-screen">
        <img
          src="/clg-img.jpg"
          alt="image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default LoginPage;
