import { useEffect, useState } from "react";
import AddSubjectModel from "../../components/AddSubjectModel";
import EditSubjectModel from "../../components/EditSubjectModel";

const Subjects = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [subjectsRefreshKey, setSubjectsRefreshKey] = useState(0);
  const [assignTeacherModal, setAssignTeacherModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [assignTeacherError, setAssignTeacherError] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [isAssigningTeacher, setIsAssigningTeacher] = useState(false);

  //  fetch subjects
  useEffect(() => {
    async function fetchSubjects() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/admin/subjects`;
        const res = await fetch(url, { method: "GET", credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        setSubjects(data.subjects);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchSubjects();
  }, [subjectsRefreshKey]);

  // fetch teachers
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

  const closeAssignTeacherModal = () => {
    setAssignTeacherModal(false);
    setAssignTeacherError("");
  };

  const filterSubject =
    inputSearch.trim().length > 0
      ? subjects.filter((sub) => {
          const searchTerm = inputSearch.trim().toLowerCase();
          const subjectName = sub.subjectName.toLowerCase();
          const subjectCode = sub.subjectCode.toLowerCase();

          return (
            subjectCode.includes(searchTerm) || subjectName.includes(searchTerm)
          );
        })
      : subjects;

  const assignTeacher = async () => {
    if (!selectedTeacherId) {
      setAssignTeacherError("Please select a teacher");
      return;
    }

    try {
      setIsAssigningTeacher(true);
      setAssignTeacherError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/subject/${selectedSubjectId}/assign-subject`,
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
        throw new Error("Failed to assign Teacher");
      }

      setSubjectsRefreshKey((key) => key + 1);
      closeAssignTeacherModal();
    } catch (error) {
      setAssignTeacherError(error.message);
    } finally {
      setIsAssigningTeacher(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-4xl font-bold">Subjects</h1>
      <p className="text-gray-400 text-[13px]">
        Search, view and manage subjects
      </p>

      {/* search bar */}
      <div className="flex items-center mt-4 gap-2 max-w-3xl">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search subject by name.."
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer"
        >
          <span>+</span>
          <span className="hidden lg:block">Add Subjects</span>
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Subject Code</th>

                <th className="px-6 py-4 font-semibold">Subject Name</th>

                <th className="px-6 py-4 font-semibold">Department</th>

                <th className="px-6 py-4 font-semibold">Year</th>

                <th className="px-6 py-4 font-semibold">Semester</th>

                <th className="px-6 py-4 font-semibold">Teacher</th>

                <th className="px-6 py-4 font-semibold">Status</th>

                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filterSubject.map((subject) => (
                <tr key={subject._id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-indigo-600">
                    {subject.subjectCode}
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {subject.subjectName}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {subject.department}
                  </td>

                  <td className="px-6 py-4 text-slate-600">{subject.year}</td>

                  <td className="px-6 py-4 text-slate-600">
                    {subject.semester}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    <span
                      onClick={() => {
                        setSelectedSubjectId(subject._id);
                        setAssignTeacherError("");
                        setAssignTeacherModal(true);
                      }}
                      className={`px-3 py-1 text-xs rounded-full block text-indigo-500 hover:underline`}
                    >
                      {subject.teacherName || "Assign Teacher"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      {/* <button className="text-indigo-600 hover:underline">
                        View
                      </button> */}

                      <button
                        onClick={() => setEditSubject(subject)}
                        className="text-slate-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddSubjectModel
          onClose={() => setShowModal(false)}
          onSubjectAdded={() => setSubjectsRefreshKey((key) => key + 1)}
        />
      )}

      {editSubject && (
        <EditSubjectModel
          subject={editSubject}
          onClose={() => setEditSubject(null)}
          onSubjectUpdated={() => setSubjectsRefreshKey((key) => key + 1)}
        />
      )}

      {/* assign teacher to subject modal */}
      {assignTeacherModal && (
        <div
          onClick={(e) =>
            e.target === e.currentTarget && closeAssignTeacherModal()
          }
          className="fixed z-70 inset-0 flex justify-center items-center bg-black/40"
        >
          <div className="p-6 rounded-lg shadow-xl bg-white max-w-md w-full">
            <h2 className="text-xl font-bold">Assign Teacher</h2>
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
            {assignTeacherError && (
              <p className="mt-3 text-sm text-red-600">{assignTeacherError}</p>
            )}
            <div className="flex gap-4 items-center justify-end mt-6">
              <button
                onClick={closeAssignTeacherModal}
                type="button"
                disabled={isAssigningTeacher}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 duration-200 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={assignTeacher}
                type="button"
                disabled={isAssigningTeacher}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-200 text-sm font-medium"
              >
                {isAssigningTeacher ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
