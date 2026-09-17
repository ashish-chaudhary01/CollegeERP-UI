import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";

const StudentSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/student/subjects`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error(`Failed to load subjects (${response.status})`);
      }
      const data = await response.json();
      setSubjects(data.studentSubjects || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load subjects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <section className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Curriculum & Courses</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
              My Academic Subjects
            </h1>
            <p className="mt-1 text-sm text-purple-100 max-w-xl">
              Overview of all registered courses, theory subjects, labs, and faculty instructors for this academic term.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md px-5 py-3 border border-white/10 text-center">
            <p className="text-xs text-purple-100 uppercase font-medium">
              Registered Subjects
            </p>
            <p className="text-2xl font-bold">{subjects.length}</p>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
          <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => {
          const faculty =
            subject.teacherId?.userId?.name ||
            subject.teacherId?.name ||
            "Faculty TBA";
          return (
            <article
              key={subject._id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 uppercase">
                    {subject.subjectCode}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    Sem {subject.semester}
                  </span>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                      {subject.subjectName}
                    </h2>
                    <p className="mt-1 text-xs text-slate-400 flex items-center gap-1.5">
                      <Layers size={12} />
                      <span>Year {subject.year} • Academic Term</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px]">
                    {faculty.charAt(0)}
                  </div>
                  <span className="truncate max-w-[150px] font-medium text-slate-700">
                    {faculty}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <GraduationCap size={14} />
                  <span>Faculty</span>
                </div>
              </div>
            </article>
          );
        })}
        {!subjects.length && !loading && (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
            <BookOpen className="mx-auto mb-2 text-slate-300" size={32} />
            No subjects assigned for your semester yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentSubject;
