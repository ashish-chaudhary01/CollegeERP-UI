import { BookOpen, CalendarClock, TrendingUp, Users } from "lucide-react";
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
    return () => {
      active = false;
    };
  }, [API_URL]);

  const cards = [
    {
      label: "Assigned subjects",
      value: data?.subjects?.length || 0,
      icon: BookOpen,
      color: "text-cyan-600",
    },
    {
      label: "Department students",
      value: data?.students || 0,
      icon: Users,
      color: "text-indigo-600",
    },
    {
      label: "Today classes",
      value: data?.todayClasses?.length || 0,
      icon: CalendarClock,
      color: "text-amber-600",
    },
    {
      label: "Year attendance",
      value: `${data?.attendance?.percentage || 0}%`,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ];

  if (error)
    return (
      <section className="rounded-xl border border-rose-200 bg-rose-50 p-6">
        <h1 className="text-xl font-bold text-rose-800">
          Teacher dashboard unavailable
        </h1>
        <p className="mt-2 text-sm text-rose-700">{error}</p>
      </section>
    );
  if (!data) return <DashboardSkeleton />;

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Teacher workspace
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Good day, {data.profile?.userId?.name || "Teacher"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {data.profile?.department?.departmentName || "Your department"} · Here
          is your teaching overview.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <Icon className={color} size={22} />
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-bold">Today&apos;s timetable</h2>
          {data.todayClasses?.length ? (
            <div className="space-y-3">
              {data.todayClasses.map((row) => (
                <div
                  key={row._id}
                  className="flex justify-between rounded-lg bg-slate-50 p-3"
                >
                  <span className="font-semibold">
                    {row.subject?.subjectCode} · {row.subject?.subjectName}
                  </span>
                  <span className="text-sm text-slate-500">
                    {row.startTime} - {row.endTime}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              No classes scheduled today.
            </p>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-bold">Assigned subjects</h2>
          <div className="space-y-2">
            {data.subjects?.map((subject) => (
              <div
                key={subject._id}
                className="flex justify-between border-b border-slate-100 py-2"
              >
                <span className="font-semibold">{subject.subjectCode}</span>
                <span className="text-sm text-slate-500">
                  {subject.subjectName} · Sem {subject.semester}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
