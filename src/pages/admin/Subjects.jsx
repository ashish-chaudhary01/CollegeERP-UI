import { useEffect, useState } from "react";

const Subjects = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/admin/subjects`;
        const res = await fetch(url, { method: "GEt", credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch subjects");
        const data = await res.json();
        setSubjects(data.subjects);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchSubjects();
  }, []);
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

        <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer">
          <span>+</span>
          <span className="hidden lg:block">Add Subjects</span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
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
              {subjects.map((subject) => (
                <tr
                  key={subject.subjectCode}
                  className="transition hover:bg-slate-50"
                >
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
                    {subject.teacherName || "Not Assigned"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button className="text-indigo-600 hover:underline">
                        View
                      </button>

                      <button className="text-slate-600 hover:underline">
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
    </div>
  );
};

export default Subjects;
