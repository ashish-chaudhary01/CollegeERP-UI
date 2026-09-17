import {
  BookOpen,
  Building2,
  CalendarFold,
  GraduationCap,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";

const cards = [
  {
    key: "totalStudents",
    label: "Department Students",
    icon: UsersRound,
    color: "bg-blue-600/15 text-blue-700",
  },
  {
    key: "totalTeachers",
    label: "Faculty Members",
    icon: GraduationCap,
    color: "bg-violet-600/15 text-violet-700",
  },
  {
    key: "totalSubjects",
    label: "Department Subjects",
    icon: BookOpen,
    color: "bg-emerald-600/15 text-emerald-700",
  },
  {
    key: "totalDepartments",
    label: "Department",
    icon: Building2,
    color: "bg-amber-600/15 text-amber-700",
  },
];

function HodDashboard() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let active = true;
    async function loadDashboard() {
      try {
        const response = await fetch(`${API_URL}/hod/dashboard`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Unable to load dashboard");
        if (active) setOverview(data);
      } catch (err) {
        if (active) setError(err.message || "Unable to load dashboard");
      }
    }
    loadDashboard();
    return () => {
      active = false;
    };
  }, [API_URL]);

  if (!overview && !error) return <DashboardSkeleton />;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Department overview
          </p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Welcome back, HOD!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is your department&apos;s academic snapshot.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold sm:flex">
          <CalendarFold size={17} className="text-cyan-600" />{" "}
          {new Date().toDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, color }) => (
          <article
            key={key}
            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className={`rounded-full p-2.5 ${color}`}>
              <Icon size={27} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {overview[key] ?? 0}
              </p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-700">
              <UserCheck size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Overall attendance</p>
              <p className="text-2xl font-bold">
                {overview.attendance?.overall ?? 0}%
              </p>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{
                width: `${Math.min(Number(overview.attendance?.overall) || 0, 100)}%`,
              }}
            />
          </div>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Attendance records this year
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-50 p-3">
              <p className="text-xl font-bold text-emerald-700">
                {overview.attendance?.present ?? 0}
              </p>
              <p className="text-xs text-emerald-700">Present</p>
            </div>
            <div className="rounded-lg bg-rose-50 p-3">
              <p className="text-xl font-bold text-rose-700">
                {overview.attendance?.absent ?? 0}
              </p>
              <p className="text-xs text-rose-700">Absent</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default HodDashboard;
