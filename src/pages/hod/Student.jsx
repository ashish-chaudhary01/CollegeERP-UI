import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Student() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/hod/students`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setStudents(data.students || []));
  }, []);
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Department roster
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Students</h1>
        <p className="mt-1 text-sm text-slate-500">
          Click any row to open the complete student profile.
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-170 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Roll number</th>
              <th className="px-5 py-4">Year</th>
              <th className="px-5 py-4">Semester</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr
                key={student._id}
                onClick={() => navigate(`/hod/student/${student._id}`)}
                className="cursor-pointer hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-semibold">
                  {student.userId?.name || "Unknown student"}
                  <span className="ml-2 font-normal text-slate-500">
                    {student.userId?.email}
                  </span>
                </td>
                <td className="px-5 py-4">{student.rollNumber}</td>
                <td className="px-5 py-4">{student.year}</td>
                <td className="px-5 py-4">{student.semester}</td>
                <td className="px-5 py-4 capitalize">{student.status}</td>
              </tr>
            ))}
            {!students.length && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-slate-400">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Student;
