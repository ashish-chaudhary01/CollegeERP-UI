import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard";
import AddTeacherModel from "../../components/AddTeacherModel";

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/hod/teachers?status=${status}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      setTeachers(data.teachers || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [status]);

  const filteredTeachers = teachers.filter((teacher) => {
    const name = teacher?.userId?.name?.toLowerCase() || "";
    const email = teacher?.userId?.email?.toLowerCase() || "";
    const term = search.trim().toLowerCase();
    return !term || name.includes(term) || email.includes(term);
  });

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Department faculty
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Teachers</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and edit teacher details in your department.
          </p>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-white to-cyan-50/60 p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_180px]">
          <label className="relative block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty name or email..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-500"
            />
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-500"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Filter size={14} /> Showing {filteredTeachers.length} of{" "}
          {teachers.length} department teachers
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            teacher={teacher}
            key={teacher._id}
            profileBase="/hod/teacher"
          />
        ))}
      </div>

      {!loading && !filteredTeachers.length && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">
            No teachers found
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Try adjusting your search or status filter
          </p>
        </div>
      )}

      {showModal && (
        <AddTeacherModel
          onClose={() => setShowModal(false)}
          onTeacherAdded={fetchTeachers}
        />
      )}
    </section>
  );
}

export default Teacher;
