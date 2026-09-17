import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

const TeacherClasses = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/teacher/subjects`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setSubjects(data.teacherSubjects || []));
  }, []);
  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Your teaching load
        </p>
        <h1 className="text-3xl font-bold text-slate-900">My classes</h1>
        <p className="mt-1 text-sm text-slate-500">
          Subjects assigned to your teacher profile.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <article
            key={subject._id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <BookOpen className="text-cyan-600" size={22} />
            <h2 className="mt-4 font-bold">{subject.subjectName}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {subject.subjectCode} · Year {subject.year} · Semester{" "}
              {subject.semester}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {subject.departmentId?.departmentCode}
            </p>
          </article>
        ))}
        {!subjects.length && (
          <p className="text-sm text-slate-400">No subjects assigned.</p>
        )}
      </div>
    </section>
  );
};

export default TeacherClasses;
