import { useEffect, useState } from "react";
import Studentcard from "../../components/StudentCard";

const Students = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/students`,
          { method: "GET", credentials: "include" },
        );

        const data = await res.json();
        setStudents(data.students);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchStudents();
  }, []);

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
      <div className="flex items-center mt-4 gap-2">
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
