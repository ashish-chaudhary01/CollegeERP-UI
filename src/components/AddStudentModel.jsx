import { useEffect, useState } from "react";

const AddStudentModel = ({ onClose, onStudentAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    rollNumber: "",
    password: "",
    semester: 1,
    year: 1,
    department: "",
    academicSession: "",
    addharCardNumber: "",
    address: "",
  });

  //   departments
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
      const url = `${import.meta.env.VITE_API_URL}/admin/student`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(res.message || "Failed To add student");
      }
      onStudentAdded?.();
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
      <div className="rounded-2xl w-full overflow-auto h-150 max-w-xl sm:max-w-2xl shadow-xl bg-white border border-slate-700/40 p-6">
        {/* heading */}
        <h1 className="font-semibold text-xl text-slate-900">Add Student</h1>
        <p className="text-gray-500 text-sm mt-1">
          Add a new student to College
        </p>

        {/* form data */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* name */}
          <div>
            <label className="text-xs font-semibold" htmlFor="studentName">
              Student Name :
            </label>
            <input
              name="studentName"
              id="studentName"
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
                className="text-xs font-semibold uppercase"
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
                className="text-xs font-semibold uppercase"
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
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
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

          {/* roll number and academic session */}
          <div className="flex gap-4 sm:items-center flex-col sm:flex-row w-full">
            {/* roll number */}
            <div className="flex-1">
              <label
                className="text-xs font-semibold uppercase"
                htmlFor="rollNumber"
              >
                Roll no :
              </label>
              <input
                name="rollNumber"
                id="rollNumber"
                placeholder="e.g. 222222222222"
                required
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
                type="number"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150  rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
            {/*  academic session */}
            <div className="flex-1">
              <label
                className="text-xs font-semibold uppercase"
                htmlFor="session"
              >
                academic session :
              </label>
              <input
                name="session"
                id="session"
                placeholder="e.g. 2025-26"
                required
                value={formData.academicSession}
                onChange={(e) =>
                  setFormData({ ...formData, academicSession: e.target.value })
                }
                type="text"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150  rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
          </div>

          {/* addhar card number */}
          <div className="flex gap-4 sm:items-center sm:flex-row flex-col">
            {/* addhar */}
            <div>
              <label
                className="text-xs font-semibold uppercase"
                htmlFor="addhar"
              >
                addhar number :
              </label>
              <input
                name="addhar"
                id="addhar"
                required
                value={formData.addharCardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, addharCardNumber: e.target.value })
                }
                placeholder="e.g. 0000 0000 0000"
                type="number"
                className="mt-1 w-full px-4 py-3 border border-slate-200 focus:border-indigo-500 duration-150 rounded-lg placeholder:text-sm outline-0 text-sm"
              />
            </div>
            {/* password */}
            <div>
              <label
                className="text-xs font-semibold uppercase"
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
          </div>

          {/* address */}
          <div>
            <label
              className="text-xs uppercase font-semibold"
              htmlFor="address"
            >
              address :
            </label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={5}
              className="mt-1 w-full border border-slate-200 rounded outline-0"
            ></textarea>
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

export default AddStudentModel;
