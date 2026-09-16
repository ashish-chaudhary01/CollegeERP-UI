import { useEffect, useState } from "react";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/student/attendance`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setAttendance(data.attendance || []));
  }, []);
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          My record
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Attendance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Subject-wise attendance history.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {attendance.map((row) => (
          <article
            key={row.subject?._id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-slate-900">
                  {row.subject?.subjectName}
                </h2>
                <p className="text-xs text-slate-500">
                  {row.subject?.subjectCode}
                </p>
              </div>
              <span
                className={`text-xl font-bold ${row.percentage < 75 ? "text-rose-600" : "text-emerald-600"}`}
              >
                {row.percentage}%
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <b className="block text-lg">{row.present}</b>Present
              </div>
              <div className="rounded-lg bg-rose-50 p-2 text-rose-700">
                <b className="block text-lg">{row.absent}</b>Absent
              </div>
              <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                <b className="block text-lg">{row.leave}</b>Leave
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              {row.records.slice(0, 5).map((record) => (
                <div
                  key={`${record.date}-${record.status}`}
                  className="flex justify-between"
                >
                  <span>{record.date}</span>
                  <span className="capitalize">{record.status}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
        {!attendance.length && (
          <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400 md:col-span-2">
            No attendance has been recorded yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default StudentAttendance;
