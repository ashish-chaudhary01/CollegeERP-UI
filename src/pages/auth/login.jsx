import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data) {
        const { user } = data;
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
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* container */}
      <form
        onSubmit={handleClick}
        className="px-4 py-8 rounded-xl shadow-lg bg-white flex flex-col gap-8 items-center"
      >
        {/* heading */}
        <div className="flex items-center gap-4">
          <div className="bg-linear-to-br from-indigo-600 to-violet-500 rounded-xl p-2 text-white">
            <GraduationCap size={27} />{" "}
          </div>
          <div className="font-bold text-2xl flex flex-col">
            <span className="text-violet-600">CERP</span>
            <span className="text-gray-500 text-xs">College ERP System</span>
          </div>
        </div>
        {/* inputs */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="font-semibold text-xs mb-1">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              className="w-full px-4 py-3 rounded-lg border-2 outline-0 border-black/30 focus:border-indigo-600 placeholder:text-sm text-sm duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-semibold text-xs mb-1">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password.."
              className="w-full px-4 py-3 rounded-lg border-2 outline-0 border-black/30 focus:border-indigo-600 placeholder:text-sm text-sm duration-200"
            />
          </div>
        </div>
        {/* links */}
        <div className="flex flex-col gap-2 items-center justify-center">
          {/* login button */}
          <button
            disabled={loading}
            className="px-6 py-2 rounded shadow bg-blue-600 font-semibold tracking-wider hover:bg-blue-700 duration-200 text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
