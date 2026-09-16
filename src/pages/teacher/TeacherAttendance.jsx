import { Check, Save } from "lucide-react";
import { useEffect, useState } from "react";

const TeacherAttendance = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/teacher/subjects`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data.teacherSubjects || []);
        setSubjectId(data.teacherSubjects?.[0]?._id || "");
      });
  }, []);
  useEffect(() => {
    if (!subjectId) return;
    fetch(`${API_URL}/teacher/attendance?subjectId=${subjectId}&date=${date}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setStudents(data.students || []));
  }, [subjectId, date]);
  const updateStatus = (studentId, status) =>
    setStudents((current) =>
      current.map((student) =>
        student._id === studentId
          ? { ...student, attendance: status }
          : student,
      ),
    );
  const save = async () => {
    const response = await fetch(`${API_URL}/teacher/attendance`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectId,
        date,
        attendance: students.map((student) => ({
          studentId: student._id,
          status: student.attendance,
        })),
      }),
    });
    const result = await response.json();
    setMessage(result.message || "Attendance saved");
  };

  return (
    <section className="mx-auto max-w-4xl space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Teacher workspace
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Take attendance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Choose your subject and save one attendance record per student for the
          day.
        </p>
      </div>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-600">
          Subject
          <select
            value={subjectId}
            onChange={(event) => setSubjectId(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-200 bg-white p-2 font-normal text-slate-900"
          >
            <option value="">Select subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectCode} · {subject.subjectName}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-600">
          Date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-200 p-2 font-normal text-slate-900"
          />
        </label>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <h2 className="font-bold text-slate-900">
            {students.length} students
          </h2>
          <button
            onClick={save}
            disabled={!students.length}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            <Save size={16} />
            Save
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {student.userId?.name}
                </p>
                <p className="text-xs text-slate-500">{student.rollNumber}</p>
              </div>
              <div className="flex gap-2">
                {["present", "absent", "leave"].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(student._id, status)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold capitalize ${student.attendance === status ? (status === "present" ? "bg-emerald-100 text-emerald-700" : status === "absent" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700") : "bg-slate-100 text-slate-500"}`}
                  >
                    {student.attendance === status && (
                      <Check className="mr-1 inline" size={14} />
                    )}
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!students.length && (
            <p className="p-10 text-center text-sm text-slate-400">
              Select a subject to load its students.
            </p>
          )}
        </div>
      </div>
      {message && (
        <p className="text-sm font-semibold text-emerald-600">{message}</p>
      )}
    </section>
  );
};

export default TeacherAttendance;
