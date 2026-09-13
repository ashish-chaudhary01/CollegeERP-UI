import { useEffect, useState } from "react";
import Studentcard from "../../components/StudentCard";

const Students = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState("active");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/departments`,
          { method: "GET", credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to Fetch Departments");
        const data = await res.json();
        setDepartments(data.departments);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchDepartment();
  }, []);

  useEffect(() => {
    async function fetchStudents() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/admin/students/?status=${status}`;
        if (selectedDepartment !== "all") {
          url += `&departmentId=${selectedDepartment}`;
        }
        const res = await fetch(url, { method: "GET", credentials: "include" });

        const data = await res.json();
        setStudents(data.students);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStudents();
  }, [selectedDepartment, status]);

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

        <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer">
          <span>+</span>
          <span className="hidden lg:block">Add Student</span>
        </div>
      </div>

      {/* filter container */}
      <div className="mt-6 px-4 py-2 bg-gray-200  rounded-xl flex gap-4 flex-wrap items-center">
        {/* department filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="departments" className="text-sm font-medium ">
            Departments :
          </label>

          <select
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-black/20 p-0.75 rounded-xl"
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
            className="border border-black/20 p-0.75 rounded-xl"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* student grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {filteredStudents?.map((student, idx) => (
          <Studentcard student={student} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Students;
