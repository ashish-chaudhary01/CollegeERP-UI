import { useEffect, useState } from "react";

const AddSubjectModel = ({ onClose, onSubjectAdded }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    departmentId: "",
    semester: 1,
    year: 1,
  });

  //  departments
  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/departments`,
          { method: "GET", credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to Fetch Departments");
        const data = await res.json();
        const fetchedDepartments = data.departments ?? [];
        setDepartments(fetchedDepartments);

        const defaultDepartment =
          fetchedDepartments.find(
            (department) => department.departmentCode?.toLowerCase() === "cse",
          ) ?? fetchedDepartments[0];

        if (defaultDepartment) {
          setFormData((currentFormData) => ({
            ...currentFormData,
            departmentId: defaultDepartment._id,
          }));
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchDepartment();
  }, []);

  //   form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const url = `${import.meta.env.VITE_API_URL}/admin/subject`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(res.message || "Failed To add subject");
      }
      onSubjectAdded?.();
      onClose();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="rounded-2xl w-full overflow-auto max-w-xl sm:max-w-2xl shadow-xl bg-white border border-slate-700/40 p-6">
        {/* heading */}
        <h1 className="font-semibold text-xl text-slate-900">Add Subject</h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a new Subject to College
        </p>

        {/* form data */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* subject name and subject code */}
          <div className="flex gap-4 sm:items-center flex-col sm:flex-row">
            {/* subject name */}
            <div>
              <label
                className="flex-1 text-xs font-semibold"
                htmlFor="subjectName"
              >
                Subject Name :
              </label>
              <input
                name="subjectName"
                id="subjectName"
                required
                value={formData.subjectName}
                onChange={(e) =>
                  setFormData({ ...formData, subjectName: e.target.value })
                }
                placeholder="e.g. Java"
                type="text"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
            {/* subject code */}
            <div>
              <label
                className="flex-1 text-xs font-semibold"
                htmlFor="subjectCode"
              >
                Subject Code :
              </label>
              <input
                name="subjectCode"
                id="subjectCode"
                required
                value={formData.subjectCode}
                onChange={(e) =>
                  setFormData({ ...formData, subjectCode: e.target.value })
                }
                placeholder="e.g. JV"
                type="text"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
          </div>

          {/* department, year , semester */}
          <div className="flex gap-6 items-center flex-wrap">
            {/* department */}
            <div className="flex gap-2 items-center">
              <label
                className="text-xs font-semibold uppercase"
                htmlFor="department"
              >
                Department :
              </label>

              <select
                name="department"
                value={formData.departmentId}
                onChange={(e) =>
                  setFormData({ ...formData, departmentId: e.target.value })
                }
                required
                className="bg-slate-200 border outline-0 border-slate-300 py-0.5 px-3 text-xs rounded"
              >
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.departmentCode}
                  </option>
                ))}
              </select>
            </div>

            {/* year */}
            <div className="flex gap-2 items-center">
              <label className="text-xs font-semibold uppercase" htmlFor="year">
                year :
              </label>

              <select
                name="year"
                id="year"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="bg-slate-200 border outline-0 border-slate-300 py-0.5 px-3 text-xs rounded"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* semester */}
            <div className="flex gap-2 items-center">
              <label
                className="text-xs font-semibold uppercase"
                htmlFor="semester"
              >
                semester :
              </label>

              <select
                name="semester"
                id="semester"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                className="bg-slate-200 border outline-0 border-slate-300 py-0.5 px-3 text-xs rounded"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          {/* error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* buttons */}
          <div className="flex justify-end gap-3 pt-2">
            {/* cancel */}
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 duration-200 text-sm font-medium select-none"
            >
              Cancel
            </button>
            {/* create */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 duration-200 text-sm font-medium select-none"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubjectModel;
