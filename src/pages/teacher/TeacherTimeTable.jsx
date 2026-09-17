import { CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const TeacherTimeTable = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/teacher/timetable`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setRows(data.timetable || []));
  }, []);
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Teaching schedule
        </p>
        <h1 className="text-3xl font-bold text-slate-900">My timetable</h1>
        <p className="mt-1 text-sm text-slate-500">
          Only subjects assigned to you are shown here.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {days.map((day) => (
          <div
            key={day}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <h2 className="mb-3 flex items-center gap-2 font-bold capitalize">
              <CalendarClock size={18} className="text-cyan-600" />
              {day}
            </h2>
            <div className="space-y-2">
              {rows
                .filter((row) => row.day === day)
                .map((row) => (
                  <div key={row._id} className="rounded-lg bg-slate-50 p-3">
                    <p className="font-semibold text-slate-900">
                      {row.subject?.subjectCode} · {row.subject?.subjectName}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {row.startTime} - {row.endTime}
                    </p>
                  </div>
                ))}
              {!rows.some((row) => row.day === day) && (
                <p className="text-sm text-slate-400">No class scheduled.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherTimeTable;
