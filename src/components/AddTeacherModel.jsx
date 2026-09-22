import { useEffect, useState } from "react";

const AddTeacherModel = ({ onClose, onTeacherAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
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
            department: defaultDepartment._id,
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
      const url = `${import.meta.env.VITE_API_URL}/admin/teacher`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(res.message || "Failed To add teacher");
      }
      onTeacherAdded?.();
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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 md:p-0"
    >
      <div className="rounded-2xl w-full overflow-auto max-w-xl sm:max-w-2xl shadow-xl bg-white border border-slate-700/40 p-6">
        {/* heading */}
        <h1 className="font-semibold text-xl text-slate-900">Add Teacher</h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a new Teacher to College
        </p>

        {/* form data */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* name */}
          <div>
            <label
              className="text-xs font-semibold capitalize block text-slate-500"
              htmlFor="teacherName"
            >
              Teacher Name :
            </label>
            <input
              name="teacherName"
              id="teacherName"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Ashish Chaudhary"
              type="text"
              className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
            />
          </div>
          {/* email & phone number */}
          <div className="flex gap-4 sm:items-center flex-col sm:flex-row w-full">
            {/* email */}
            <div className="flex-1">
              <label
                className="text-xs font-semibold capitalize block text-slate-500"
                htmlFor="email"
              >
                Email :
              </label>
              <input
                name="email"
                id="email"
                placeholder="e.g. ashish@gmail.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150  rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
            {/* phone */}
            <div className="flex-1">
              <label
                className="text-xs font-semibold capitalize block text-slate-500"
                htmlFor="phone"
              >
                Phone No :
              </label>
              <input
                name="phone"
                id="phone"
                placeholder="e.g. +91-999999999"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                type="number"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150  rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
          </div>

          {/* department */}
          <div className="">
            <label
              className="text-xs font-semibold capitalize block text-slate-500"
              htmlFor="department"
            >
              Department :
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
            >
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.departmentCode}
                </option>
              ))}
            </select>
          </div>

          {/* password */}
          <div>
            <label
              className="text-xs font-semibold capitalize block text-slate-500"
              htmlFor="password"
            >
              password :
            </label>
            <input
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="e.g. *********"
              type="text"
              className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
            />
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

export default AddTeacherModel;
