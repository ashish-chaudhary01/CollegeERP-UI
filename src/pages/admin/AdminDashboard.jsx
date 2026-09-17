import {
  BookOpen,
  Building2,
  CalendarClock,
  GraduationCap,
  IndianRupee,
  TrendingUp,
  Users,
  UsersRound,
  Activity,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";
import { useAuth } from "../../context/AuthContext";

function StatCard({ icon: Icon, label, value, color, bg, trend }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-3 ${bg}`}>
          <Icon size={22} className={color} />
        </div>
        {trend !== undefined && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
            <TrendingUp size={11} /> Live
          </span>
        )}
      </div>
      <p className="mt-4 text-3xl font-black text-slate-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

function AdminDashboard() {
  const [overviewData, setOverviewData] = useState(null);
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchAdminDashboard() {
      try {
        const res = await fetch(`${API_URL}/admin/dashboard`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setOverviewData(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAdminDashboard();
  }, [API_URL]);

  if (!overviewData) return <DashboardSkeleton />;

  const attendancePct = Number(overviewData?.attendance?.overall ?? 0);
  const present = overviewData?.attendance?.present ?? 0;
  const absent = overviewData?.attendance?.absent ?? 0;
  const total = present + absent;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen space-y-6 overflow-hidden">
      {/* ── Hero greeting ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 p-6 text-white shadow-lg">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-32 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
        <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">
              Welcome back, {user?.name || "Admin"}! 👋
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Here&apos;s what&apos;s happening across your college today.
            </p>
          </div>
          <div className="mt-4 flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm sm:mt-0 sm:items-end">
            <span className="text-xl font-bold tabular-nums">{timeStr}</span>
            <span className="text-xs text-slate-300">{dateStr}</span>
          </div>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          icon={UsersRound}
          label="Total Students"
          value={overviewData?.totalStudents ?? 0}
          color="text-blue-600"
          bg="bg-blue-50"
          trend
        />
        <StatCard
          icon={GraduationCap}
          label="Total Teachers"
          value={overviewData?.totalTeachers ?? 0}
          color="text-violet-600"
          bg="bg-violet-50"
        />
        <StatCard
          icon={Building2}
          label="Departments"
          value={overviewData?.totalDepartments ?? 0}
          color="text-amber-600"
          bg="bg-amber-50"
        />
        <StatCard
          icon={BookOpen}
          label="Total Subjects"
          value={overviewData?.totalSubjects ?? 0}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
      </div>

      {/* ── Secondary row ── */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Attendance card */}
        <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-cyan-600" />
              <h2 className="font-bold text-slate-800">Overall Attendance</h2>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                attendancePct >= 75
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {attendancePct}%
            </span>
          </div>

          {/* progress bar */}
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700"
              style={{ width: `${Math.min(attendancePct, 100)}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-2xl font-black text-emerald-700">{present}</p>
              <p className="text-xs text-emerald-600">Present</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-3">
              <p className="text-2xl font-black text-rose-700">{absent}</p>
              <p className="text-xs text-rose-600">Absent</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-2xl font-black text-slate-700">{total}</p>
              <p className="text-xs text-slate-500">Total Records</p>
            </div>
          </div>
        </div>

        {/* Quick stats column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-cyan-50 p-3">
              <CalendarClock size={22} className="text-cyan-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Today's Classes
              </p>
              <p className="text-3xl font-black text-slate-900">
                {overviewData?.todayClasses ?? 0}
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-amber-50 p-3">
              <IndianRupee size={22} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Pending Fees
              </p>
              <p className="text-3xl font-black text-slate-900">
                {overviewData?.pendingFees ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick links ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={16} className="text-cyan-600" />
          <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Quick Navigation</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Manage Students", icon: Users, href: "/admin/students", color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100" },
            { label: "Manage Teachers", icon: GraduationCap, href: "/admin/teachers", color: "text-violet-600", bg: "bg-violet-50 hover:bg-violet-100" },
            { label: "Departments", icon: Building2, href: "/admin/departments", color: "text-amber-600", bg: "bg-amber-50 hover:bg-amber-100" },
            { label: "Fee Records", icon: IndianRupee, href: "/admin/fees", color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100" },
          ].map(({ label, icon: Icon, href, color, bg }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-xl p-3 text-sm font-semibold transition-colors ${bg}`}
            >
              <Icon size={18} className={color} />
              <span className="text-slate-700">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
