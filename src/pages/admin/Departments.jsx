import { Building2 } from "lucide-react";
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
      if (!res.ok) {
        throw new Error("Failed to assign HOD");
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
      <div className="flex items-center mt-4 gap-2 max-w-3xl">
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
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer"
        >
          <span>+</span>
          <span className="hidden lg:block">Add Department</span>
        </button>
      </div>

      {/* department grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {filteredDepartments?.map((department, idx) => (
          <div
            key={idx}
            className="flex h-full flex-col rounded-lg border border-black/20 shadow-md hover:-translate-y-1.5 duration-300 ease-out p-4"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex-1 flex gap-4 items-center">
                {/* icon */}
                <div>
                  <Building2
                    size={60}
                    className="bg-blue-400/20 text-blue-700 rounded-full p-2"
                  />{" "}
                </div>
                {/* details */}
                <div className="flex flex-col gap-1 p-2 items-start">
                  <h2 className="text-2xl font-extrabold leading-tight">
                    {department.departmentName}
                    <span className="text-sm">
                      {" "}
                      ({department.departmentCode})
                    </span>
                  </h2>
                  <p className="font-bold text-sm px-4 py-1 bg-orange-500/10 text-orange-500 rounded-full">
                    Hod : {department.hod?.userId?.name ?? "not-assigned"}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDepartmentId(department._id);
                      setAssignHodError("");
                      setAssignHodModal(true);
                    }}
                    className="text-indigo-500 text-sm hover:underline text-left font-medium px-3"
                  >
                    {department.hod ? "Change HOD" : "Assign HOD"}
                  </button>
                </div>
              </div>
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
            </div>
          </div>
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
          className="fixed z-70 inset-0 flex justify-center items-center bg-black/40"
        >
          <div className="p-6 rounded-lg shadow-xl bg-white max-w-md w-full">
            <h2 className="text-xl font-bold">Assign Hod</h2>
            <div className="mt-4 flex gap-4 items-center">
              <label
                htmlFor="selectTeacher"
                className="text-xs font-medium uppercase"
              >
                Select Teacher :
              </label>
              <select
                name="selectTeacher"
                id="selectTeacher"
                required
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="bg-slate-200 border outline-0 border-slate-300 py-0.5 px-3 text-xs rounded"
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
