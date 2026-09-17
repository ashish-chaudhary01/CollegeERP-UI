import {
  Activity,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";

const readResponse = async (response) => {
  const text = await response.text();
  if (!text) return { message: `Request failed (${response.status})` };
  try {
    return JSON.parse(text);
  } catch {
    return { message: `Request failed (${response.status})` };
  }
};

const TeacherDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/teacher/dashboard`, { credentials: "include" })
      .then(async (response) => ({
        response,
        data: await readResponse(response),
      }))
      .then(({ response, data: responseData }) => {
        if (!active) return;
        if (!response.ok || !responseData.profile) {
          setError(
            responseData.message ||
              "Unable to load dashboard. Start the backend and try again.",
          );
          return;
        }
        setData(responseData);
      })
      .catch(() => {
        if (active)
          setError(
            "Backend is unavailable. Start the backend on port 3000 and retry.",
          );
      });
    return () => { active = false; };
  }, [API_URL]);

  if (error)
    return (
      <section className="rounded-xl border border-rose-200 bg-rose-50 p-6">
        <h1 className="text-xl font-bold text-rose-800">Teacher dashboard unavailable</h1>
        <p className="mt-2 text-sm text-rose-700">{error}</p>
      </section>
    );
  if (!data) return <DashboardSkeleton />;

  const attendancePct = data?.attendance?.percentage || 0;
  const present = data?.attendance?.present || 0;
  const absent = data?.attendance?.absent || 0;
  const total = present + absent;

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const statCards = [
    {
      label: "Assigned Subjects",
      value: data?.subjects?.length || 0,
      icon: BookOpen,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Dept. Students",
      value: data?.students || 0,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Today's Classes",
      value: data?.todayClasses?.length || 0,
      icon: CalendarClock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Class Attendance",
      value: `${attendancePct}%`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section className="min-h-screen space-y-6">
      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 p-6 text-white shadow-lg">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-32 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
        <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Teacher Workspace
            </p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">
              Good day, {data.profile?.userId?.name || "Teacher"}! 👋
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              {data.profile?.department?.departmentName || "Your department"} ·{" "}
              {data.profile?.designation || "Teacher"}
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
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className={`inline-flex rounded-xl p-3 ${bg}`}>
              <Icon size={22} className={color} />
            </div>
            <p className="mt-4 text-3xl font-black text-slate-900">{value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Content grid ── */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Today's timetable */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <CalendarClock size={18} className="text-amber-500" />
            <h2 className="font-bold text-slate-800">Today&apos;s Classes</h2>
            <span className="ml-auto rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
              {data.todayClasses?.length || 0} scheduled
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {data.todayClasses?.length ? (
              data.todayClasses.map((row) => (
                <div
                  key={row._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {row.subject?.subjectCode}
                      <span className="ml-2 font-normal text-slate-500 text-sm">
                        {row.subject?.subjectName}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Clock size={13} />
                    {row.startTime} – {row.endTime}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <CalendarClock size={36} className="mb-2 opacity-30" />
                <p className="text-sm">No classes scheduled today.</p>
              </div>
            )}
          </div>
        </div>

        {/* Assigned subjects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-cyan-600" />
            <h2 className="font-bold text-slate-800">Assigned Subjects</h2>
            <span className="ml-auto rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-bold text-cyan-700">
              {data.subjects?.length || 0} total
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {data.subjects?.length ? (
              data.subjects.map((subject) => (
                <div
                  key={subject._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-bold text-cyan-700">
                      {subject.subjectCode}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-slate-700">
                      {subject.subjectName}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Sem {subject.semester}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <BookOpen size={36} className="mb-2 opacity-30" />
                <p className="text-sm">No subjects assigned yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Attendance stats ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-emerald-600" />
            <h2 className="font-bold text-slate-800">Class Attendance Overview</h2>
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
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700"
            style={{ width: `${Math.min(attendancePct, 100)}%` }}
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-emerald-50 p-4">
            <CheckCircle2 size={18} className="mx-auto mb-1 text-emerald-500" />
            <p className="text-2xl font-black text-emerald-700">{present}</p>
            <p className="text-xs text-emerald-600">Present</p>
          </div>
          <div className="rounded-xl bg-rose-50 p-4">
            <XCircle size={18} className="mx-auto mb-1 text-rose-500" />
            <p className="text-2xl font-black text-rose-700">{absent}</p>
            <p className="text-xs text-rose-600">Absent</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <Activity size={18} className="mx-auto mb-1 text-slate-500" />
            <p className="text-2xl font-black text-slate-700">{total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
