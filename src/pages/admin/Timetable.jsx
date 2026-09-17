import { CalendarClock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const Timetable = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [department, setDepartment] = useState("all");
  const [semester, setSemester] = useState("all");
  const [form, setForm] = useState({
    subjectId: "",
    day: "monday",
    startTime: "09:00",
    endTime: "10:00",
  });
  const [message, setMessage] = useState("");

  const load = async () => {
    const query = new URLSearchParams({ department, semester });
    const [scheduleResponse, subjectResponse, departmentResponse] =
      await Promise.all([
        fetch(`${API_URL}/admin/timetable?${query}`, {
          credentials: "include",
        }),
        fetch(`${API_URL}/admin/subjects`, { credentials: "include" }),
        fetch(`${API_URL}/admin/departments`, { credentials: "include" }),
      ]);
    setRows((await scheduleResponse.json()).timetable || []);
    setSubjects((await subjectResponse.json()).subjects || []);
    setDepartments((await departmentResponse.json()).departments || []);
  };
  useEffect(() => {
    let active = true;
    const query = new URLSearchParams({ department, semester });
    Promise.all([
      fetch(`${API_URL}/admin/timetable?${query}`, {
        credentials: "include",
      }).then((response) => response.json()),
      fetch(`${API_URL}/admin/subjects`, { credentials: "include" }).then(
        (response) => response.json(),
      ),
      fetch(`${API_URL}/admin/departments`, { credentials: "include" }).then(
        (response) => response.json(),
      ),
    ]).then(([schedule, subjectData, departmentData]) => {
      if (!active) return;
      setRows(schedule.timetable || []);
      setSubjects(subjectData.subjects || []);
      setDepartments(departmentData.departments || []);
    });
    return () => {
      active = false;
    };
  }, [API_URL, department, semester]);
  const addSlot = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/admin/timetable`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) {
      setForm({ ...form, subjectId: "" });
      load();
    }
  };
  const removeSlot = async (id) => {
    await fetch(`${API_URL}/admin/timetable/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    load();
  };
  const visibleSubjects = subjects.filter((subject) => {
    const matchesDepartment =
      department === "all" ||
      String(subject.departmentId?._id || subject.departmentId) === department;
    const matchesSemester =
      semester === "all" || String(subject.semester) === semester;
    return matchesDepartment && matchesSemester;
  });
  const orderedRows = rows.sort(
    (a, b) =>
      days.indexOf(a.day) - days.indexOf(b.day) ||
      a.startTime.localeCompare(b.startTime),
  );

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Academic planning
        </p>
        <h1 className="text-3xl font-bold text-slate-900">College timetable</h1>
        <p className="mt-1 text-sm text-slate-500">
          Create separate schedules for each department, Monday through
          Saturday.
        </p>
      </div>
      <form
        onSubmit={addSlot}
        className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-5"
      >
        <label className="text-sm font-semibold text-slate-600">
          Department
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 font-normal"
          >
            <option value="all">All departments</option>
            {departments.map((item) => (
              <option key={item._id} value={item._id}>
                {item.departmentCode}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-600">
          Semester
          <select
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 font-normal"
          >
            <option value="all">All semesters</option>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <option key={item} value={item}>
                Semester {item}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-600 md:col-span-2">
          Subject
          <select
            required
            value={form.subjectId}
            onChange={(event) =>
              setForm({ ...form, subjectId: event.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 font-normal"
          >
            <option value="">Select subject</option>
            {visibleSubjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectCode} · {subject.subjectName}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-600">
          Day
          <select
            value={form.day}
            onChange={(event) => setForm({ ...form, day: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 font-normal"
          >
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm font-semibold text-slate-600">
            Start
            <input
              required
              type="time"
              value={form.startTime}
              onChange={(event) =>
                setForm({ ...form, startTime: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-normal"
            />
          </label>
          <label className="text-sm font-semibold text-slate-600">
            End
            <input
              required
              type="time"
              value={form.endTime}
              onChange={(event) =>
                setForm({ ...form, endTime: event.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-normal"
            />
          </label>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white md:col-span-5">
          <CalendarClock size={17} />
          Add timetable slot
        </button>
      </form>
      {message && (
        <p className="text-sm font-semibold text-cyan-700">{message}</p>
      )}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Day</th>
              <th className="px-5 py-4">Time</th>
              <th className="px-5 py-4">Subject</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orderedRows.map((row) => (
              <tr key={row._id}>
                <td className="px-5 py-4 font-semibold capitalize">
                  {row.day}
                </td>
                <td className="px-5 py-4">
                  {row.startTime} - {row.endTime}
                </td>
                <td className="px-5 py-4 font-semibold">
                  {row.subject?.subjectCode}
                  <span className="ml-2 font-normal text-slate-500">
                    {row.subject?.subjectName}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {row.subject?.departmentId?.departmentCode || "-"}
                </td>
                <td className="px-5 py-4">
                  <button
                    title="Remove slot"
                    onClick={() => removeSlot(row._id)}
                    className="text-rose-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
            {!orderedRows.length && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-400">
                  No timetable slots yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Timetable;
