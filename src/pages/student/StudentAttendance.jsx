import {
  CalendarCheck,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAttendance = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/student/attendance`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error(`Failed to load attendance (${response.status})`);
      }
      const data = await response.json();
      setAttendance(data.attendance || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load attendance records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const overallStats = useMemo(() => {
    let present = 0;
    let absent = 0;
    let leave = 0;
    attendance.forEach((row) => {
      present += row.present || 0;
      absent += row.absent || 0;
      leave += row.leave || 0;
    });
    const total = present + absent + leave;
    const percentage = total
      ? Number(((present / total) * 100).toFixed(1))
      : 0;
    return { present, absent, leave, total, percentage };
  }, [attendance]);

  if (loading) return <DashboardSkeleton />;

  return (
    <section className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-700 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Academic Attendance History</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
              Attendance Records
            </h1>
            <p className="mt-1 text-sm text-emerald-100 max-w-xl">
              Real-time tracking of lecture attendance, present/absent logs, and eligibility statuses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 text-center">
              <p className="text-xs text-emerald-100 uppercase font-medium">
                Overall Rate
              </p>
              <p className="text-2xl font-extrabold">{overallStats.percentage}%</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 text-center">
              <p className="text-xs text-emerald-100 uppercase font-medium">
                Total Classes
              </p>
              <p className="text-2xl font-extrabold">{overallStats.total}</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
          <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">
            Present
          </span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {overallStats.present}
          </p>
          <span className="text-xs text-slate-500">Attended sessions</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">
            Absent
          </span>
          <p className="text-2xl font-bold text-rose-600 mt-1">
            {overallStats.absent}
          </p>
          <span className="text-xs text-slate-500">Missed lectures</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">
            Approved Leaves
          </span>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {overallStats.leave}
          </p>
          <span className="text-xs text-slate-500">Excused absences</span>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold uppercase">
            Eligibility
          </span>
          <p
            className={`text-2xl font-bold mt-1 ${
              overallStats.percentage >= 75
                ? "text-emerald-600"
                : "text-rose-600"
            }`}
          >
            {overallStats.percentage >= 75 ? "Eligible" : "Debar Risk"}
          </p>
          <span className="text-xs text-slate-500">75% threshold</span>
        </div>
      </div>

      {/* Subject-Wise Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {attendance.map((row) => {
          const isEligible = row.percentage >= 75;
          return (
            <article
              key={row.subject?._id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700 uppercase">
                    {row.subject?.subjectCode}
                  </span>
                  <h2 className="mt-1.5 font-bold text-slate-900 text-base">
                    {row.subject?.subjectName}
                  </h2>
                </div>
                <div className="text-right">
                  <span
                    className={`text-2xl font-extrabold ${
                      isEligible ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {row.percentage}%
                  </span>
                  <p className="text-[11px] font-medium text-slate-400">
                    {isEligible ? "Good Standing" : "Low Attendance"}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isEligible ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${Math.min(row.percentage, 100)}%` }}
                />
              </div>

              {/* Metric Breakdown */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                  <b className="block text-lg font-bold">{row.present}</b>
                  <span>Present</span>
                </div>
                <div className="rounded-xl bg-rose-50 p-2.5 text-rose-700">
                  <b className="block text-lg font-bold">{row.absent}</b>
                  <span>Absent</span>
                </div>
                <div className="rounded-xl bg-amber-50 p-2.5 text-amber-700">
                  <b className="block text-lg font-bold">{row.leave}</b>
                  <span>Leave</span>
                </div>
              </div>

              {/* Recent Logs for this subject */}
              {row.records && row.records.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Recent Logs
                  </p>
                  <div className="space-y-1 text-xs">
                    {row.records.slice(0, 4).map((record, i) => (
                      <div
                        key={`${record.date}-${i}`}
                        className="flex items-center justify-between py-0.5 text-slate-600"
                      >
                        <span className="font-medium text-slate-700">
                          {record.date}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${
                            record.status === "present"
                              ? "bg-emerald-100 text-emerald-700"
                              : record.status === "absent"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {record.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {!attendance.length && !loading && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-400 md:col-span-2">
            <CalendarCheck className="mx-auto mb-2 text-slate-300" size={32} />
            No attendance entries have been recorded yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentAttendance;
