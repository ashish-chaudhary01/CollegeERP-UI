import {
  CalendarDays,
  Clock,
  BookOpen,
  User,
  GraduationCap,
  Sparkles,
  AlertCircle,
  RefreshCw,
  CalendarCheck,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";

const DAYS = [
  { id: "all", label: "All Days" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
];

const dayOrder = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

const StundentTimeTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState("all");

  const currentDayName = useMemo(() => {
    const dayIndex = new Date().getDay();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[dayIndex];
  }, []);

  const fetchTimetable = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/student/timetable`,
        { credentials: "include" }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with ${response.status}`);
      }
      const data = await response.json();
      setRows(data.timetable || []);
    } catch (err) {
      console.error("Timetable fetch error:", err);
      setError(
        err.message || "Unable to fetch timetable. Please verify backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  // Filter and sort rows
  const filteredRows = useMemo(() => {
    let list = [...rows];
    if (selectedDay !== "all") {
      list = list.filter(
        (r) => (r.day || "").toLowerCase() === selectedDay.toLowerCase()
      );
    }
    // Sort by day order then startTime
    return list.sort((a, b) => {
      const dayDiff =
        (dayOrder[(a.day || "").toLowerCase()] || 99) -
        (dayOrder[(b.day || "").toLowerCase()] || 99);
      if (dayDiff !== 0) return dayDiff;
      return (a.startTime || "").localeCompare(b.startTime || "");
    });
  }, [rows, selectedDay]);

  // Group by day for "all" view
  const groupedByDay = useMemo(() => {
    const map = {};
    filteredRows.forEach((item) => {
      const d = (item.day || "other").toLowerCase();
      if (!map[d]) map[d] = [];
      map[d].push(item);
    });
    return map;
  }, [filteredRows]);

  const todayClassesCount = useMemo(() => {
    return rows.filter(
      (r) => (r.day || "").toLowerCase() === currentDayName
    ).length;
  }, [rows, currentDayName]);

  return (
    <section className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Academic Schedule</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
              Class Timetable
            </h1>
            <p className="mt-1 text-sm text-cyan-100/90 max-w-xl">
              Stay on track with your weekly lecture timetable, room assignments,
              and instructor schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 text-center">
              <p className="text-xs text-cyan-100/80 uppercase font-medium">
                Today&apos;s Classes
              </p>
              <p className="text-xl font-bold">{todayClassesCount}</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 text-center">
              <p className="text-xs text-cyan-100/80 uppercase font-medium">
                Total Weekly
              </p>
              <p className="text-xl font-bold">{rows.length}</p>
            </div>
            <button
              onClick={fetchTimetable}
              title="Refresh Timetable"
              className="flex items-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 px-3.5 py-2.5 text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute left-1/2 -top-12 h-32 w-32 rounded-full bg-indigo-400/20 blur-xl" />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={fetchTimetable}
            className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Day Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day.id;
          const isToday = day.id === currentDayName;
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`group relative flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                isSelected
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{day.label}</span>
              {isToday && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isSelected
                      ? "bg-cyan-400 text-slate-900"
                      : "bg-cyan-100 text-cyan-800"
                  }`}
                >
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {loading ? (
        <DashboardSkeleton />
      ) : filteredRows.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="rounded-full bg-cyan-50 p-4 text-cyan-600 mb-3">
            <CalendarDays size={36} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Classes Scheduled
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            {selectedDay === "all"
              ? "Your academic timetable has not been assigned yet. Please contact your department admin."
              : `There are no scheduled classes for ${
                  DAYS.find((d) => d.id === selectedDay)?.label || selectedDay
                }. Enjoy your free time or prepare for upcoming sessions!`}
          </p>
          {selectedDay !== "all" && (
            <button
              onClick={() => setSelectedDay("all")}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
            >
              <CalendarCheck size={14} />
              View full week schedule
            </button>
          )}
        </div>
      ) : (
        /* Timetable Grid / Sections */
        <div className="space-y-6">
          {selectedDay === "all" ? (
            // Grouped By Day View
            Object.keys(groupedByDay).map((dayKey) => {
              const dayRows = groupedByDay[dayKey];
              const isToday = dayKey === currentDayName;
              return (
                <div
                  key={dayKey}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold capitalize text-slate-900">
                        {dayKey}
                      </h2>
                      {isToday && (
                        <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800">
                          Today
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {dayRows.length} {dayRows.length === 1 ? "Class" : "Classes"}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {dayRows.map((slot) => (
                      <TimetableCard key={slot._id} slot={slot} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            // Single Day View
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRows.map((slot) => (
                <TimetableCard key={slot._id} slot={slot} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// Reusable Timetable Card
function TimetableCard({ slot }) {
  const teacherName =
    slot.subject?.teacherId?.userId?.name ||
    slot.subject?.teacherId?.name ||
    "Faculty TBA";

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-cyan-400 hover:shadow-md hover:-translate-y-0.5">
      <div className="space-y-3">
        {/* Time Badge & Semester */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
            <Clock size={13} />
            <span>
              {slot.startTime} – {slot.endTime}
            </span>
          </div>
          {slot.subject?.semester && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              Sem {slot.subject?.semester}
            </span>
          )}
        </div>

        {/* Subject Information */}
        <div>
          <span className="inline-block rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
            {slot.subject?.subjectCode || "CODE"}
          </span>
          <h3 className="mt-1 font-semibold text-slate-900 line-clamp-1 group-hover:text-cyan-600 transition-colors">
            {slot.subject?.subjectName || "Subject Details"}
          </h3>
        </div>
      </div>

      {/* Instructor / Faculty Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-semibold text-[10px]">
            {teacherName.charAt(0)}
          </div>
          <span className="truncate max-w-[140px]">{teacherName}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <GraduationCap size={13} />
          <span className="capitalize">{slot.day}</span>
        </div>
      </div>
    </article>
  );
}

export default StundentTimeTable;
