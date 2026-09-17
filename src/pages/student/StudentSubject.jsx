import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
const StudentSubject = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => { fetch(`${import.meta.env.VITE_API_URL}/student/subjects`, { credentials: "include" }).then((r) => r.json()).then((data) => setSubjects(data.studentSubjects || [])); }, []);
  return <section><p className="text-sm font-semibold uppercase tracking-[.18em] text-cyan-600">My academics</p><h1 className="mt-1 text-3xl font-bold">Subjects</h1><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{subjects.map((subject) => <article key={subject._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><BookOpen className="text-cyan-600"/><h2 className="mt-4 font-bold">{subject.subjectName}</h2><p className="mt-1 text-sm text-slate-500">{subject.subjectCode}</p><p className="mt-4 text-xs font-semibold text-slate-500">YEAR {subject.year} · SEMESTER {subject.semester}</p></article>)}{!subjects.length && <p className="mt-6 text-sm text-slate-400">No subjects assigned for your semester.</p>}</div></section>;
};

export default StudentSubject;
