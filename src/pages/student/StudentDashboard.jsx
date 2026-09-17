import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Clock,
  GraduationCap,
  ReceiptIndianRupee,
  TrendingUp,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { DashboardSkeleton } from "../../components/ui/Skeletons";
import { useAuth } from "../../context/AuthContext";

const readResponse = async (response) => {
  const text = await response.text();
  if (!text) return { message: `Request failed (${response.status})` };
  try {
    return JSON.parse(text);
  } catch {
    return { message: `Request failed (${response.status})` };
  }
};

const StudentDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = () => {
    setLoading(true);
    setError("");
    let active = true;

    fetch(`${API_URL}/student/dashboard`, { credentials: "include" })
      .then(async (response) => ({
        response,
        data: await readResponse(response),
      }))
      .then(({ response, data: responseData }) => {
        if (!active) return;
        if (!response.ok || !responseData.profile) {
          setError(
            responseData.message ||
              "Unable to load student dashboard. Please ensure backend is running."
          );
          return;
        }
        setData(responseData);
      })
      .catch(() => {
        if (active) {
          setError(
            "Backend server is unreachable. Please make sure the backend is active on port 8000/3000."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  };

  useEffect(() => {
    fetchDashboard();
  }, [API_URL]);

  const currentDateFormatted = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto space-y-4">
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 sm:p-8 text-rose-900 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-rose-100 p-2 text-rose-600">
              <AlertCircle size={24} />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Student Dashboard Unavailable</h1>
              <p className="mt-1 text-sm text-rose-700">{error}</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={fetchDashboard}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-rose-700 transition"
                >
                  Retry Loading
                </button>
                <Link
                  to="/student/profile"
                  className="rounded-xl bg-white border border-rose-300 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
                >
                  Go to Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { profile, subjects = [], todayClasses = [], attendance = {}, fees = [] } =
    data || {};

  const studentName =
    profile?.userId?.name || user?.name || "Student";
  const departmentName =
    profile?.department?.departmentName || "Engineering & Sciences";
  const rollNumber = profile?.rollNumber || "N/A";
  const semester = profile?.semester || "1";
  const academicSession = profile?.academicSession || "Current Session";

  // Fee status calculation
  const latestFee = fees.length > 0 ? fees[0] : null;
  const isFeePaid = latestFee?.status === "paid";

  // Attendance rate & status
  const attendanceRate = attendance.percentage ?? 0;
  const isAttendanceLow = attendanceRate < 75 && (attendance.total || 0) > 0;

  return (
    <section className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Hero / Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        {/* Glow and background circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full bg-violet-600/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative flex-shrink-0">
              {profile?.profilePictureUrl ? (
                <img
                  src={profile.profilePictureUrl}
                  alt={studentName}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
              ) : (
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-2xl sm:text-3xl font-bold text-white shadow-md border-2 border-white/20">
                  {studentName.charAt(0)}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-slate-900">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold backdrop-blur-md text-cyan-300">
                <Sparkles size={12} />
                <span>{currentDateFormatted}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {studentName}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{departmentName}</span>
                <span>•</span>
                <span className="font-semibold text-cyan-400">
                  Roll: {rollNumber}
                </span>
                <span>•</span>
                <span>
                  Sem {semester} ({academicSession})
                </span>
              </p>
            </div>
          </div>

          {/* Action shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/student/timetable"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all active:scale-95"
            >
              <CalendarDays size={15} className="text-cyan-300" />
              <span>Timetable</span>
            </Link>
            <Link
              to="/student/attendance"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all active:scale-95"
            >
              <CalendarCheck size={15} className="text-emerald-300" />
              <span>Attendance</span>
            </Link>
            <Link
              to="/student/fees"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <ReceiptIndianRupee size={15} />
              <span>Fee Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Low Attendance Alert Banner (If Applicable) */}
      {isAttendanceLow && (
        <div className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50/90 p-4 sm:p-5 text-amber-900 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-200 p-2 text-amber-800">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">
                Attendance Warning: {attendanceRate}%
              </p>
              <p className="text-xs text-amber-700">
                Your overall attendance is below the mandatory 75% requirement.
                Ensure you attend upcoming lectures to prevent exam debarment.
              </p>
            </div>
          </div>
          <Link
            to="/student/attendance"
            className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition"
          >
            <span>View Record</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      )}

      {/* 3. Key Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Attendance Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-cyan-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Overall Attendance
            </span>
            <div
              className={`rounded-xl p-2.5 ${
                attendanceRate >= 75
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold ${
                attendanceRate >= 75 ? "text-slate-900" : "text-rose-600"
              }`}
            >
              {attendanceRate}%
            </span>
            <span className="text-xs font-medium text-slate-500">
              ({attendance.present || 0}/{attendance.total || 0} classes)
            </span>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                attendanceRate >= 75 ? "bg-emerald-500" : "bg-rose-500"
              }`}
              style={{ width: `${Math.min(attendanceRate, 100)}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span
              className={`font-semibold ${
                attendanceRate >= 75 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {attendanceRate >= 75 ? "✓ Eligible for Exams" : "⚠️ Needs Improvement"}
            </span>
            <Link
              to="/student/attendance"
              className="text-cyan-600 hover:text-cyan-700 font-semibold"
            >
              Details →
            </Link>
          </div>
        </div>

        {/* Subjects Enrolled Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-indigo-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Enrolled Subjects
            </span>
            <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {subjects.length}
            </span>
            <span className="text-xs font-medium text-slate-500">Courses this Sem</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Semester {semester} curriculum active
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Department of {departmentName.slice(0, 15)}...</span>
            <Link
              to="/student/subjects"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              View all →
            </Link>
          </div>
        </div>

        {/* Today's Lectures Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-amber-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Today&apos;s Lectures
            </span>
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {todayClasses.length}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {todayClasses.length === 1 ? "Class Scheduled" : "Classes Scheduled"}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {todayClasses.length > 0
              ? `First session starts at ${todayClasses[0]?.startTime || "09:00"}`
              : "No classes scheduled for today"}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Weekly total: {data?.weeklyScheduleCount || 0}</span>
            <Link
              to="/student/timetable"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Schedule →
            </Link>
          </div>
        </div>

        {/* Fees Status Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fee Clearance
            </span>
            <div
              className={`rounded-xl p-2.5 ${
                isFeePaid
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              <ReceiptIndianRupee size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span
              className={`text-2xl sm:text-3xl font-extrabold capitalize ${
                isFeePaid ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {latestFee ? latestFee.status : "Cleared"}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {latestFee?.session || academicSession}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            {isFeePaid ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 size={13} /> No outstanding dues
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                <AlertCircle size={13} /> Dues pending for session
              </span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Session Fees</span>
            <Link
              to="/student/fees"
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Details →
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Two-Column Content: Today's Lectures & Subject-Wise Attendance Breakdown */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Today&apos;s Class Schedule
              </h2>
              <p className="text-xs text-slate-500">
                Lectures lined up for {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date())}
              </p>
            </div>
            <Link
              to="/student/timetable"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
            >
              <span>Full Timetable</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            {todayClasses.length > 0 ? (
              todayClasses.map((lecture, idx) => {
                const instructor =
                  lecture.subject?.teacherId?.userId?.name ||
                  lecture.subject?.teacherId?.name ||
                  "Faculty TBA";
                return (
                  <div
                    key={lecture._id || idx}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:bg-cyan-50/40 hover:border-cyan-200"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-indigo-100/70 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800 uppercase">
                            {lecture.subject?.subjectCode || "COURSE"}
                          </span>
                          <h4 className="font-semibold text-slate-900 text-sm">
                            {lecture.subject?.subjectName}
                          </h4>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                          <User size={12} className="text-slate-400" />
                          <span>{instructor}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                      <div className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 border border-slate-200 shadow-xs">
                        <Clock size={12} className="text-cyan-600" />
                        <span>
                          {lecture.startTime} - {lecture.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <CalendarDays size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-800">
                  No Classes Scheduled Today
                </h3>
                <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">
                  You have no lectures scheduled for today. Take this time to review course materials or work on projects!
                </p>
                <Link
                  to="/student/timetable"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
                >
                  <span>Check weekly schedule</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Subject-Wise Attendance Progress (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Subject Attendance
              </h2>
              <p className="text-xs text-slate-500">
                Keep all subjects above the 75% threshold
              </p>
            </div>
            <Link
              to="/student/attendance"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
            >
              <span>View Logs</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            {attendance.bySubject && attendance.bySubject.length > 0 ? (
              attendance.bySubject.map((item) => {
                const pct = item.percentage || 0;
                const isSafe = pct >= 75;
                return (
                  <div key={item.subject?._id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">
                          {item.subject?.subjectCode}
                        </span>
                        <span className="ml-1.5 text-slate-500 truncate max-w-[140px] inline-block align-bottom">
                          {item.subject?.subjectName}
                        </span>
                      </div>
                      <span
                        className={`font-bold ${
                          isSafe ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {pct}% ({item.present}/{item.total})
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSafe ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                <CalendarCheck className="mx-auto mb-2 text-slate-300" size={28} />
                No subject attendance records found yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Enrolled Subjects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Current Enrolled Courses
            </h2>
            <p className="text-xs text-slate-500">
              Academic subjects registered for Semester {semester}
            </p>
          </div>
          <Link
            to="/student/subjects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
          >
            <span>View All Subjects</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((subject) => {
            const facultyName =
              subject.teacherId?.userId?.name ||
              subject.teacherId?.name ||
              "Assigned Faculty";
            return (
              <div
                key={subject._id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 uppercase">
                      {subject.subjectCode}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      Sem {subject.semester}
                    </span>
                  </div>
                  <h3 className="mt-3 font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {subject.subjectName}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Year {subject.year} • {departmentName}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <GraduationCap size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="truncate">{facultyName}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {subjects.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
              No subjects enrolled for this semester yet.
            </div>
          )}
        </div>
      </div>

      {/* 6. Quick Academic Navigation Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Academic Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/student/timetable"
            className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-cyan-400 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <CalendarDays size={22} />
            </div>
            <span className="mt-3 text-sm font-bold text-slate-800">
              Class Timetable
            </span>
            <span className="mt-0.5 text-[11px] text-slate-400">
              Weekly schedules
            </span>
          </Link>

          <Link
            to="/student/attendance"
            className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CalendarCheck size={22} />
            </div>
            <span className="mt-3 text-sm font-bold text-slate-800">
              Attendance Logs
            </span>
            <span className="mt-0.5 text-[11px] text-slate-400">
              Percentage & breakdown
            </span>
          </Link>

          <Link
            to="/student/fees"
            className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <ReceiptIndianRupee size={22} />
            </div>
            <span className="mt-3 text-sm font-bold text-slate-800">
              Fee Receipts
            </span>
            <span className="mt-0.5 text-[11px] text-slate-400">
              Dues & transactions
            </span>
          </Link>

          <Link
            to="/student/profile"
            className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-violet-400 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <User size={22} />
            </div>
            <span className="mt-3 text-sm font-bold text-slate-800">
              Student Profile
            </span>
            <span className="mt-0.5 text-[11px] text-slate-400">
              Personal & contact info
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
