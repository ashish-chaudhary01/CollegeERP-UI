import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard";
import AddTeacherModel from "../../components/AddTeacherModel";

const Teachers = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [teachersRefreshKey, setTeachersRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchDepartments() {
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
    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const url = `${import.meta.env.VITE_API_URL}/admin/teachers?status=${status}&departmentId=${selectedDepartment}`;
        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setTeachers(data.teacher || []);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchTeachers();
  }, [status, selectedDepartment, teachersRefreshKey]);

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
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
        Academic directory
      </p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
        Faculty
      </h1>
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
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add faculty</span>
        </button>
      </div>

      {/* filter container */}
      <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-linear-to-br from-white to-indigo-50/70 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        {/* department filter */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Department
          <select
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All departments</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentCode || department.departmentName}
              </option>
            ))}
          </select>
        </label>

        {/* status filter */}
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Status
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      <p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Filter size={14} /> Showing {filteredTeachers.length} of {teachers.length} faculty members
      </p>

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

      {!filteredTeachers.length && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">No faculty members found</p>
          <p className="mt-1 text-xs text-slate-400">Try changing your search or filter options</p>
        </div>
      )}

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
