import { ArrowLeft, BookOpen, Pencil, Save, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProfileSkeleton } from "../../components/ui/Skeletons";

const TeacherProfileView = ({ role }) => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const endpoint = `${API_URL}/${role}/teacher/${teacherId}`;

  useEffect(() => {
    fetch(endpoint, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        const value = data.teacher;
        setTeacher(value);
        setSubjects(data.subjects || []);
        setForm({
          name: value?.userId?.name || "",
          email: value?.userId?.email || "",
          phoneNumber: value?.phoneNumber || "",
          address: value?.address || "",
          designation: value?.designation || "Teacher",
          profilePictureUrl: value?.profilePictureUrl || "",
          status: value?.status || "active",
          department: value?.department?._id || "",
        });
      });
  }, [endpoint]);
  const save = async (event) => {
    event.preventDefault();
    const response = await fetch(endpoint, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setMessage(data.message || "Unable to update teacher");
    if (response.ok) {
      setTeacher(data.teacher);
      setSubjects(data.subjects || subjects);
      setEditing(false);
    }
  };
  const input = (key, label, type = "text") => (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input
        type={type}
        value={form[key] || ""}
        disabled={!editing}
        onChange={(event) => setForm({ ...form, [key]: event.target.value })}
        className="mt-1 w-full rounded-lg border border-slate-200 p-3 font-normal disabled:bg-slate-50"
      />
    </label>
  );
  if (!teacher) return <ProfileSkeleton />;
  return (
    <section className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Faculty record
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {teacher.userId?.name || "Teacher"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete details and assigned subjects.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-slate-950 p-5 text-white">
          <img
            src={teacher.profilePictureUrl || "/no-image.jpg"}
            onError={(event) => {
              event.currentTarget.src = "/no-image.jpg";
            }}
            alt="Teacher profile"
            className="mx-auto h-48 w-48 rounded-2xl object-cover ring-4 ring-white/10"
          />
          <h2 className="mt-5 text-xl font-bold">{teacher.userId?.name}</h2>
          <p className="mt-1 break-all text-sm text-slate-300">
            {teacher.userId?.email}
          </p>
          <p className="mt-5 text-sm text-cyan-300">
            {teacher.department?.departmentCode || "Department not assigned"}
          </p>
          <div className="flex items-center gap-1 mt-4">
            <span className=" inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
              <ShieldCheck size={14} />
              {teacher.userId?.role === "hod"
                ? "Head of Department"
                : "Teacher"}
            </span>
            <span
              className={` inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                teacher.status === "active"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-rose-500/20 text-rose-300"
              }`}
            >
              Status: {teacher.status || "active"}
            </span>
          </div>
        </aside>
        <div className="space-y-5">
          <form
            onSubmit={save}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Teacher details</h2>
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold"
              >
                <Pencil size={15} />
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {input("name", "Full name")}
              {input("email", "Email", "email")}
              {input("phoneNumber", "Phone number")}
              {input("address", "Address")}
              {input("designation", "Designation")}
              <label className="text-sm font-semibold text-slate-700">
                Status
                <select
                  value={form.status || "active"}
                  disabled={!editing}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-3 font-normal disabled:bg-slate-50 outline-none focus:border-cyan-600 capitalize"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>
            {editing && (
              <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">
                <Save size={16} />
                Save changes
              </button>
            )}
            {message && (
              <p className="mt-3 text-sm font-semibold text-emerald-600">
                {message}
              </p>
            )}
          </form>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <BookOpen size={19} className="text-cyan-600" />
              Assigned subjects
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {subjects.map((subject) => (
                <div key={subject._id} className="rounded-lg bg-slate-50 p-3">
                  <p className="font-semibold">
                    {subject.subjectCode} · {subject.subjectName}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Year {subject.year} · Semester {subject.semester}
                  </p>
                </div>
              ))}
              {!subjects.length && (
                <p className="text-sm text-slate-400">No subjects assigned.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherProfileView;
