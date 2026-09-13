import { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard";

const Teachers = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/teachers`,
          { method: "GET", credentials: "include" },
        );

        const data = await res.json();
        setTeachers(data.teacher);
        console.log(data.teacher);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTeachers();
  }, []);

  const filteredTeachers =
    inputSearch.trim().length > 0
      ? teachers.filter((teacher) => {
          const teacherName = teacher?.userId?.name?.toLowerCase() ?? "";
          const teacherEmail = teacher?.userId?.email?.toLowerCase() ?? "";
          const searchTerm = inputSearch.trim().toLowerCase();
          return (
            teacherName.includes(searchTerm) ||
            teacherEmail.includes(searchTerm)
          );
        })
      : teachers;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-4xl font-bold">Teachers</h1>
      <p className="text-gray-400 text-[13px]">
        Search, view and manage Teacher records
      </p>

      {/* search bar */}
      <div className="flex items-center mt-4 gap-2">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>

        <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer">
          <span>+</span>
          <span className="hidden lg:block">Add Teachers</span>
        </div>
      </div>

      {/* student grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {filteredTeachers?.map((teacher, idx) => (
          <TeacherCard teacher={teacher} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Teachers;
