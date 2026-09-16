import { useEffect, useState } from "react";
import TeacherCard from "../../components/TeacherCard";

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/hod/teachers`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setTeachers(data.teachers || []));
  }, []);
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Department faculty
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Teachers</h1>
        <p className="mt-1 text-sm text-slate-500">
          View and edit teacher details in your department.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <TeacherCard
            teacher={teacher}
            key={teacher._id}
            profileBase="/hod/teacher"
          />
        ))}
        {!teachers.length && (
          <p className="text-sm text-slate-400">No teachers found.</p>
        )}
      </div>
    </section>
  );
}

export default Teacher;
