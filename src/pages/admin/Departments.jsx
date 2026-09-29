import { Building2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import AddDepartmentModal from "../../components/AddDepartmentModel";

const Departments = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [assignHodModal, setAssignHodModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [isAssigningHod, setIsAssigningHod] = useState(false);
  const [assignHodError, setAssignHodError] = useState("");
  const [departmentsRefreshKey, setDepartmentsRefreshKey] = useState(0);

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
  }, [departmentsRefreshKey]);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/teachers`,
          { method: "GET", credentials: "include" },
        );
        const data = await res.json();
        setTeachers(data.teacher);
        setSelectedTeacherId(data?.teacher?.[0]?._id ?? "");
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTeacher();
  }, []);

  const filteredDepartments =
    inputSearch.trim().length > 0
      ? departments.filter((department) => {
          const searchTerm = inputSearch.trim().toLowerCase();
          return department.departmentName.toLowerCase().includes(searchTerm);
        })
      : departments;

  const handleDepartmentCreate = (newDepartment) => {
    setDepartments([...departments, newDepartment]);
  };

  const closeAssignHodModal = () => {
    setAssignHodModal(false);
    setSelectedDepartmentId("");
    setAssignHodError("");
  };

  const assignHod = async () => {
    if (!selectedDepartmentId || !selectedTeacherId) {
      setAssignHodError("Please select a teacher");
      return;
    }

    try {
      setIsAssigningHod(true);
      setAssignHodError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/department/${selectedDepartmentId}/assign-hod`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ teacherId: selectedTeacherId }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setDepartmentsRefreshKey((key) => key + 1);
      closeAssignHodModal();
    } catch (error) {
      setAssignHodError(error.message);
    } finally {
      setIsAssigningHod(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-2xl font-bold">Departments</h1>

      {/* search bar */}
      <div className="flex sm:flex-row flex-col sm:items-center mt-4 gap-2 max-w-3xl">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search departments"
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex justify-center items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-indigo-700 duration-200 cursor-pointer"
        >
          <span>+</span>
          <span className="hidden lg:block">Add Department</span>
        </button>
      </div>

      {/* department grid */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-stretch md:p-4 py-4">
        {filteredDepartments.map((department, idx) => (
          <article
            key={idx}
            className="group relative p-6 border border-slate-200 hover:border-indigo-500 w-full h-full rounded-lg hover:-translate-y-1 duration-200 bg-white shadow-sm hover:shadow-md"
          >
            <div className="flex gap-4 items-center ">
              {/* icon */}
              <span className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white shadow">
                <Building2 size={30} />
              </span>
              {/* details */}
              <div className="flex-1">
                <h2 className="font-bold text-slate-900 leading-tight">
                  {department.departmentName}
                  <span className="ml-2 text-xs font-medium py-1 px-2.5 rounded-lg bg-blue-50 text-blue-600">
                    {department.departmentCode}
                  </span>
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-2">
                  HOD •{" "}
                  <span>
                    {department.hod
                      ? department.hod?.userId?.name
                      : "Not assigned"}
                  </span>
                </p>
                {/* edit  */}
                <div className="flex justify-between items-center w-full">
                  <button
                    onClick={() => {
                      setSelectedDepartmentId(department._id);
                      setAssignHodError("");
                      setAssignHodModal(true);
                    }}
                    className="text-xs font-medium text-red-400 hover:underline"
                  >
                    {department.hod ? "Change HOD" : "Assign HOD"}
                  </button>
                  {/* edit department */}
                  <button
                    className="rounded-full bg-rose-500 px-3 py-3 text-white transition hover:bg-rose-600"
                    title="Delete Department"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* other department details */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
              <div>
                <p className="text-xl font-bold text-slate-900">
                  {department.studentCount ?? 0}
                </p>
                <p className="text-xs text-slate-500">Students</p>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">
                  {department.teacherCount ?? 0}
                </p>
                <p className="text-xs text-slate-500">Teachers</p>
              </div>
              <div>
                <p className="text-xl font-bold text-emerald-600">
                  {department.activeTeacherCount ?? 0}
                </p>
                <p className="text-xs text-slate-500">Active</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* new department Modal */}
      {showModal && (
        <AddDepartmentModal
          onClose={() => setShowModal(false)}
          handleDepartmentCreate={handleDepartmentCreate}
        />
      )}

      {/* assign hod modal */}
      {assignHodModal && (
        <div
          onClick={(e) => e.target === e.currentTarget && closeAssignHodModal()}
          className="fixed z-70 inset-0 flex justify-center items-center bg-black/40 p-2.5 sm:p-0"
        >
          <div className="p-6 rounded-2xl shadow-xl bg-white max-w-md w-full">
            <h2 className="text-2xl font-bold text-slate-800">Assign Hod</h2>
            <div className="mt-4 ">
              <label
                htmlFor="selectTeacher"
                className="text-xs font-semibold uppercase tracking-wide text-slate-500 block"
              >
                Select Teacher :
              </label>
              <select
                name="selectTeacher"
                id="selectTeacher"
                required
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="mt-1 w-full py-2.5 px-3 rounded-md text-sm outline-none focus:border-indigo-500 font-medium border border-gray-200 bg-white text-slate-700"
              >
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher?.userId?.name}
                  </option>
                ))}
              </select>
            </div>
            {assignHodError && (
              <p className="mt-3 text-sm text-red-600">{assignHodError}</p>
            )}
            <div className="flex gap-4 items-center justify-end mt-6">
              <button
                onClick={closeAssignHodModal}
                type="button"
                disabled={isAssigningHod}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 duration-200 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={assignHod}
                type="button"
                disabled={isAssigningHod}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-200 text-sm font-medium"
              >
                {isAssigningHod ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
