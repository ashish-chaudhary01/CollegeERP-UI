import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard";
import AddTeacherModel from "../../components/AddTeacherModel";

const Teachers = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [teachersRefreshKey, setTeachersRefreshKey] = useState(0);
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/teachers`,
          { method: "GET", credentials: "include" },
        );

        const data = await res.json();
        setTeachers(data.teacher);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTeachers();
  }, [teachersRefreshKey]);

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
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Academic directory</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">Faculty</h1>
      <p className="mt-1 text-sm text-slate-500">
        Search, view and manage Teacher records
      </p>

      {/* search bar */}
      <div className="mt-5 flex max-w-4xl flex-col gap-3 sm:flex-row">
        <div className="relative flex flex-1 items-center">
          <Search size={18} className="absolute left-3 text-slate-400" />
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          <span>Add faculty</span>
        </button>
      </div>

      {/* teacher grid */}
      <div className="grid grid-cols-1 items-stretch gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filteredTeachers?.map((teacher, idx) => (
          <TeacherCard
            teacher={teacher}
            key={idx}
            profileBase="/admin/teacher"
          />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <AddTeacherModel
          onClose={() => setShowModal(false)}
          onTeacherAdded={() => setTeachersRefreshKey((key) => key + 1)}
        />
      )}
    </div>
  );
};

export default Teachers;
