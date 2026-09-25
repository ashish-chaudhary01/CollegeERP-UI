import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

const HodTimetable = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [semester, setSemester] = useState("all");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        setError("");
        setLoading(true);
        fetch(`${API_URL}/hod/timetable?semester=${semester}`, {
          credentials: "include",
        })
          .then(async (response) => ({ response, data: await response.json() }))
          .then(({ response, data }) => {
            if (!response.ok) throw new Error(data.message);
            setRows(data.timetable || []);
          });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeTable();
  }, [API_URL, semester]);
  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-cyan-600">
            Department planning
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            College timetable
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Your department&apos;s scheduled classes.
          </p>
        </div>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-cyan-500"
        >
          <option value="all">All semesters</option>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <option key={item} value={item}>
              Semester {item}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-165 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Day</th>
              <th className="px-5 py-4">Time</th>
              <th className="px-5 py-4">Subject</th>
              <th className="px-5 py-4">Year / Sem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row._id} className="hover:bg-cyan-50/50">
                <td className="px-5 py-4 font-semibold capitalize">
                  {row.day}
                </td>
                <td className="px-5 py-4">
                  {row.startTime} – {row.endTime}
                </td>
                <td className="px-5 py-4">
                  <b>{row.subject?.subjectCode}</b>
                  <span className="ml-2 text-slate-500">
                    {row.subject?.subjectName}
                  </span>
                </td>
                <td className="px-5 py-4">
                  Y{row.subject?.year} / S{row.subject?.semester}
                </td>
              </tr>
            ))}
            {!loading && !rows.length && (
              <tr>
                <td colSpan="4" className="p-12 text-center text-slate-400">
                  <CalendarDays className="mx-auto mb-2" />
                  No timetable slots found.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan="4" className="p-12 text-center text-slate-400">
                  <CalendarDays className="mx-auto mb-2" />
                  loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default HodTimetable;
