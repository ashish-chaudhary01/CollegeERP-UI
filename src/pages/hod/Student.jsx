import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import AddStudentModel from "../../components/AddStudentModel";

function Student() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const [semester, setSemester] = useState("all");
  const [status, setStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/hod/students`, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load students");
      setStudents(data.students || []);
      setError("");
    } catch (err) { setError(err.message || "Unable to load students"); }
    finally { setLoading(false); }
  };
  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/hod/students`, { credentials: "include" })
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!active) return;
        if (!response.ok) throw new Error(data.message || "Unable to load students");
        setStudents(data.students || []);
        setError("");
      })
      .catch((err) => active && setError(err.message || "Unable to load students"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [API_URL]);
  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return students.filter((student) => {
      const matched = !term || [student.userId?.name, student.userId?.email, student.rollNumber].some((value) => String(value || "").toLowerCase().includes(term));
      return matched && (year === "all" || String(student.year) === year) && (semester === "all" || String(student.semester) === semester) && (status === "all" || student.status === status);
    });
  }, [students, search, year, semester, status]);
  const years = [...new Set(students.map((student) => student.year).filter(Boolean))].sort((a, b) => a - b);
  const semesters = [...new Set(students.map((student) => student.semester).filter(Boolean))].sort((a, b) => a - b);
  const selectClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-500";
  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Department roster
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Students</h1>
        <p className="mt-1 text-sm text-slate-500">
          Click any row to open the complete student profile.
        </p>
      </div>
      <button onClick={() => setShowModal(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700"><Plus size={17} /> Add student</button></div>
      <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-white to-cyan-50/60 p-4 shadow-sm"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_150px_150px_150px]"><label className="relative block"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email or roll number" className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-500" /></label><select value={year} onChange={(e) => { setYear(e.target.value); setSemester("all"); }} className={selectClass}><option value="all">All years</option>{years.map((item) => <option key={item} value={item}>Year {item}</option>)}</select><select value={semester} onChange={(e) => setSemester(e.target.value)} className={selectClass}><option value="all">All semesters</option>{semesters.filter((item) => year === "all" || Math.ceil(item / 2) === Number(year)).map((item) => <option key={item} value={item}>Semester {item}</option>)}</select><select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}><option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div><p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500"><Filter size={14} /> Showing {filteredStudents.length} of {students.length} department students</p></div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-170 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Roll number</th>
              <th className="px-5 py-4">Year</th>
              <th className="px-5 py-4">Semester</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? <tr><td colSpan="5" className="p-10 text-center text-slate-500">Loading students...</td></tr> : filteredStudents.map((student) => (
              <tr
                key={student._id}
                onClick={() => navigate(`/hod/student/${student._id}`)}
                className="cursor-pointer hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-semibold">
                  {student.userId?.name || "Unknown student"}
                  <span className="ml-2 font-normal text-slate-500">
                    {student.userId?.email}
                  </span>
                </td>
                <td className="px-5 py-4">{student.rollNumber}</td>
                <td className="px-5 py-4">{student.year}</td>
                <td className="px-5 py-4">{student.semester}</td>
                <td className="px-5 py-4 capitalize">{student.status}</td>
              </tr>
            ))}
            {!loading && !filteredStudents.length && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && <AddStudentModel role="hod" onClose={() => setShowModal(false)} onStudentAdded={loadStudents} />}
    </section>
  );
}

export default Student;
