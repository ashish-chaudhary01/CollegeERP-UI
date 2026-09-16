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
  }, [selectedDepartment, status, studentsRefreshKey, year, semester]);

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
      <h1 className="text-4xl font-bold">Students</h1>
      <p className="text-gray-400 text-[13px]">
        Search, view and manage student records
      </p>

      {/* search bar */}
      <div className="flex items-center mt-4 gap-2 max-w-3xl">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search by name or student ID..."
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer"
        >
          <span>+</span>
          <span className="hidden lg:block">Add Student</span>
        </button>
      </div>

      {/* filter container */}
      <div className="mt-6 px-4 py-2 bg-gray-200 rounded-xl flex gap-4 flex-wrap items-center text-sm">
        {/* department filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="departments" className="font-medium ">
            Departments :
          </label>

          <select
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
          >
            <option value="all">All</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentCode}
              </option>
            ))}
          </select>
        </div>
        {/* active filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="status" className="text-sm font-medium ">
            Status :
          </label>

          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {/* year filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="year" className="text-sm font-medium ">
            year :
          </label>

          <select
            name="year"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setSemester(e.target.value * 2 - 1);
            }}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
          >
            <option value="all">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        {/* semester filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="semester" className="text-sm font-medium ">
            semester :
          </label>

          <select
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
          >
            {year === "all" && (
              <>
                <option value="all">All</option>
              </>
            )}
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
        </div>
      </div>

      {/* student grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {filteredStudents?.map((student, idx) => (
          <Studentcard student={student} key={idx} />
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
