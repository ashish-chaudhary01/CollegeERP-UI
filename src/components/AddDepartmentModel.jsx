import { useState } from "react";

const AddDepartmentModel = ({ onClose, handleDepartmentCreate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.departmentName.trim() && !formData.departmentCode.trim()) {
      return setError("Please fill all the fields");
    }

    try {
      setLoading(true);
      setError("");
      const url = `${import.meta.env.VITE_API_URL}/admin/department`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(res.message || "Failed To Create Department");
      }
      const data = await res.json();
      handleDepartmentCreate(data.department);
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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-0"
    >
      <div className="rounded-2xl w-full max-w-sm sm:max-w-md shadow-xl bg-white border border-slate-700/40 p-6">
        {/* heading */}
        <h1 className="font-semibold text-xl text-slate-900">Add Department</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create a new college department
        </p>

        {/* form data */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold" htmlFor="departmentName">
              Department Name :
            </label>
            <input
              name="departmentName"
              id="departmentName"
              required
              value={formData.departmentName}
              onChange={(e) =>
                setFormData({ ...formData, departmentName: e.target.value })
              }
              placeholder="Computer Science & Engineering"
              type="text"
              className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold" htmlFor="departmentCode">
              Department Code :
            </label>
            <input
              name="departmentCode"
              id="departmentCode"
              placeholder="CSE"
              required
              value={formData.departmentCode}
              onChange={(e) =>
                setFormData({ ...formData, departmentCode: e.target.value })
              }
              type="text"
              className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150  rounded-lg placeholder:text-sm outline-0 text-sm"
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
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentModel;
