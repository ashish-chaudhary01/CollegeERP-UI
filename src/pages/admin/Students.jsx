import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import Studentcard from "../../components/StudentCard";

const Students = () => {
  const [students, setStudents] = useState(null);
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
            placeholder="Search by name or student ID..."
            className="outline-0 border-black/15 px-4 py-2 rounded-l-md bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
          <button className="rounded-r-md bg-blue-600 text-white font-semibold flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-blue-700 duration-200">
            <span className="h-full">
              <Search />
            </span>
            <span className="hidden sm:block">Search</span>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-black/80 duration-200 cursor-pointer">
          <span>+</span>
          <span className="hidden lg:block">Add Student</span>
        </div>
      </div>

      {/* student grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {students?.map((student, idx) => (
          <Studentcard student={student} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Students;
