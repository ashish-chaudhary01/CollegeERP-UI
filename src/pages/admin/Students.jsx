import { useEffect, useState } from "react";
import Studentcard from "../../components/StudentCard";
import AddStudentModel from "../../components/AddStudentModel";

const Students = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState("active");
  const [year, setYear] = useState("all");
  const [semester, setSemester] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [studentsRefreshKey, setStudentsRefreshKey] = useState(0);
  const [onDeleted, setOnDeleted] = useState(0);

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/departments`,
          { method: "GET", credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to Fetch Departments");
        const data = await res.json();
        setDepartments((data.departments ?? []).filter(Boolean));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchDepartment();
  }, []);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const url = `${import.meta.env.VITE_API_URL}/admin/students?status=${status}&departmentId=${selectedDepartment}&year=${year}&semester=${semester}`;
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const contentType = res.headers.get("content-type") || "";
        if (!res.ok || !contentType.includes("application/json")) {
          throw new Error(
            "Could not load students. Confirm that VITE_API_URL points to the API server.",
          );
        }

        const data = await res.json();
        setStudents(data.students ?? []);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStudents();
  }, [
    selectedDepartment,
    status,
    studentsRefreshKey,
    onDeleted,
    year,
    semester,
  ]);

  const filteredStudents =
    inputSearch.trim().length > 0
      ? students.filter((student) => {
          const studentName = student?.userId?.name?.toLowerCase() ?? "";
          const studentEmail = student?.userId?.email?.toLowerCase() ?? "";
          const studentRollNumber = student?.rollNumber ?? "";
          const searchTerm = inputSearch.trim().toLowerCase();
          return (
            studentName.includes(searchTerm) ||
            studentRollNumber.includes(searchTerm) ||
            studentEmail.includes(searchTerm)
          );
        })
      : students;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
        Academic directory
      </p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
        Students
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Search, view and manage student records
      </p>

      {/* search bar */}
      <div className="mt-5 flex max-w-4xl flex-col gap-3 sm:flex-row">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search by name, email or roll number..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <span>+</span>
          <span className="hidden lg:block">Add Student</span>
        </button>
      </div>

      {/* filter container */}
      <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-linear-to-br from-white to-indigo-50/70 p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
        {/* department filter */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Department
          <select
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentCode}
              </option>
            ))}
          </select>
        </label>
        {/* active filter */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Status
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        {/* year filter */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Year
          <select
            name="year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setSemester("all");
            }}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        {/* semester filter */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Semester
          <select
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All semesters</option>
            {year === "1" && (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
              </>
            )}
            {year === "2" && (
              <>
                <option value="3">3</option>
                <option value="4">4</option>
              </>
            )}
            {year === "3" && (
              <>
                <option value="5">5</option>
                <option value="6">6</option>
              </>
            )}
          </select>
        </label>
      </div>

      {/* student grid */}
      <div className="grid grid-cols-1 items-stretch gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filteredStudents?.map((student) => (
          <Studentcard
            student={student}
            onDeleted={() => setOnDeleted((prev) => prev + 1)}
            key={`${student._id}-${onDeleted}`}
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddStudentModel
          onClose={() => setShowModal(false)}
          onStudentAdded={() => setStudentsRefreshKey((key) => key + 1)}
        />
      )}

      {/* Students Table
      <div className="mt-6 overflow-x-auto rounded-xl border">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Roll Number</th>
              <th className="p-4">Email</th>
              <th className="p-4">Branch</th>
              <th className="p-4">Year</th>
              <th className="p-4">Semester</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b">
                <td className="p-4">{student.userId?.name}</td>

                <td className="p-4">{student.rollNumber}</td>
                <td className="p-4">{student.userId?.email}</td>

                <td className="p-4">{student.department?.departmentName}</td>

                <td className="p-4">{student.year}</td>
                <td className="p-4">{student.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Students;
