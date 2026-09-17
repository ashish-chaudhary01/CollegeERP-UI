import { Filter, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [year, setYear] = useState("all");
  const [semester, setSemester] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(
      `${import.meta.env.VITE_API_URL}/teacher/students?status=${status}&year=${year}&semester=${semester}`,
      {
        credentials: "include",
      },
    )
      .then((response) => response.json())
      .then((data) => setStudents(data.students || []))
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [status, year, semester]);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) => {
      const name = student.userId?.name?.toLowerCase() || "";
      const email = student.userId?.email?.toLowerCase() || "";
      const roll = student.rollNumber?.toLowerCase() || "";
      return name.includes(term) || email.includes(term) || roll.includes(term);
    });
  }, [students, search]);

  const selectClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-500";

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Department roster
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Students</h1>
        <p className="mt-1 text-sm text-slate-500">
          Students available for your department classes. Click any student to
          view details.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-white to-cyan-50/60 p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_140px_140px_140px]">
          <label className="relative block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or roll number..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-500"
            />
          </label>
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setSemester("all");
            }}
            className={selectClass}
          >
            <option value="all">All years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
          </select>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className={selectClass}
          >
            <option value="all">All semesters</option>
            {year === "1" && (
              <>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </>
            )}
            {year === "2" && (
              <>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
              </>
            )}
            {year === "3" && (
              <>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
              </>
            )}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectClass}
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Filter size={14} /> Showing {filteredStudents.length} of{" "}
          {students.length} department students
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-162.5 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Roll number</th>
              <th className="px-5 py-4">Year</th>
              <th className="px-5 py-4">Semester</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-500">
                  Loading students...
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  onClick={() => navigate(`/teacher/student/${student._id}`)}
                  className="cursor-pointer hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-semibold">
                    {student.userId?.name}
                    <span className="ml-2 font-normal text-slate-500">
                      {student.userId?.email}
                    </span>
                  </td>
                  <td className="px-5 py-4">{student.rollNumber}</td>
                  <td className="px-5 py-4">{student.year}</td>
                  <td className="px-5 py-4">{student.semester}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        student.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {student.status || "active"}
                    </span>
                  </td>
                </tr>
              ))
            )}
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
    </section>
  );
};

export default StudentList;
