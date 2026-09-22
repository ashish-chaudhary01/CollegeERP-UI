import { useEffect, useState } from "react";

const getInitialFormData = (subject) => ({
  subjectName: subject?.subjectName ?? "",
  subjectCode: subject?.subjectCode ?? "",
  departmentId:
    subject?.departmentId ??
    subject?.department?._id ??
    subject?.department ??
    "",
  semester: Number(subject?.semester) || 1,
  year: Number(subject?.year) || 1,
});

const EditSubjectModel = ({ subject, onClose, onSubjectUpdated }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState(() => getInitialFormData(subject));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/departments`,
          { method: "GET", credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();
        const fetchedDepartments = data.departments ?? [];
        setDepartments(fetchedDepartments);
        setFormData((currentFormData) => {
          const selectedDepartment = fetchedDepartments.find(
            (department) =>
              department._id === currentFormData.departmentId ||
              department.departmentCode === currentFormData.departmentId ||
              department.departmentName === currentFormData.departmentId,
          );

          return selectedDepartment
            ? { ...currentFormData, departmentId: selectedDepartment._id }
            : currentFormData;
        });
      } catch (error) {
        setError(error.message);
      }
    }

    fetchDepartments();
  }, []);

  const handleChange = (field, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
    setError("");
  };

  const handleYearChange = (value) => {
    const year = Number(value);
    setFormData((currentFormData) => ({
      ...currentFormData,
      year,
      semester: year * 2 - 1,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/subject/${subject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to update subject",
        );
      }

      onSubjectUpdated?.();
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 md:p-0"
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl border border-slate-700/40 bg-white p-6 shadow-xl sm:max-w-2xl">
        <h1 className="text-xl font-semibold text-slate-900">Edit Subject</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the subject details below
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* subject name */}
            <div className="flex-1">
              <label
                className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="editSubjectName"
              >
                Subject Name :
              </label>
              <input
                name="subjectName"
                id="editSubjectName"
                required
                value={formData.subjectName}
                onChange={(event) =>
                  handleChange("subjectName", event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-0 duration-150 focus:border-indigo-500"
              />
            </div>
            {/* subject code */}
            <div className="flex-1">
              <label
                className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="editSubjectCode"
              >
                Subject Code :
              </label>
              <input
                name="subjectCode"
                id="editSubjectCode"
                required
                value={formData.subjectCode}
                onChange={(event) =>
                  handleChange("subjectCode", event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-0 duration-150 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex sm:items-center flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label
                className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="editDepartment"
              >
                Department :
              </label>
              <select
                name="department"
                id="editDepartment"
                required
                value={formData.departmentId}
                onChange={(event) =>
                  handleChange("departmentId", event.target.value)
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-0 duration-150 focus:border-indigo-500"
              >
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.departmentCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="editYear"
              >
                Year :
              </label>
              <select
                name="year"
                id="editYear"
                value={formData.year}
                onChange={(event) => handleYearChange(event.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-0 duration-150 focus:border-indigo-500"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                htmlFor="editSemester"
              >
                Semester :
              </label>
              <select
                name="semester"
                id="editSemester"
                value={formData.semester}
                onChange={(event) =>
                  handleChange("semester", Number(event.target.value))
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-0 duration-150 focus:border-indigo-500"
              >
                {formData.year === 1 && (
                  <>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </>
                )}
                {formData.year === 2 && (
                  <>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </>
                )}
                {formData.year === 3 && (
                  <>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubjectModel;
