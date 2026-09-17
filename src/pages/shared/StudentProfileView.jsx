import { ArrowLeft, Check, KeyRound, Pencil, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ProfileSkeleton } from "../../components/ui/Skeletons";

const StudentProfileView = () => {
  const { studentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isSelf = !studentId;
  const canEdit = user?.role === "admin" || user?.role === "hod" || isSelf;
  const endpoint = isSelf
    ? `${import.meta.env.VITE_API_URL}/student/profile`
    : `${import.meta.env.VITE_API_URL}/${user?.role === "admin" ? "admin" : user?.role}/student/${studentId}`;
  const updateEndpoint = isSelf
    ? `${import.meta.env.VITE_API_URL}/student/profile`
    : `${import.meta.env.VITE_API_URL}/admin/student/${studentId}`;
  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState({
    present: 0,
    total: 0,
    percentage: 0,
  });
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  useEffect(() => {
    if (!isSelf && !user?.role) return;
    fetch(endpoint, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        const value = data.student;
        setStudent(value);
        setFees(data.studentFees || data.fees || []);
        setAttendance(
          data.attendance || { present: 0, total: 0, percentage: 0 },
        );
        setForm({
          name: value?.userId?.name || "",
          email: value?.userId?.email || "",
          rollNumber: value?.rollNumber || "",
          year: value?.year || "",
          semester: value?.semester || "",
          academicSession: value?.academicSession || "",
          phoneNumber: value?.phoneNumber || "",
          address: value?.address || "",
          fatherName: value?.fatherName || "",
          profilePictureUrl: value?.profilePictureUrl || "",
          status: value?.status || "active",
          department: value?.department?._id || value?.department || "",
        });
      });
  }, [endpoint, isSelf, user?.role]);

  const save = async (event) => {
    event.preventDefault();
    const response = await fetch(updateEndpoint, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setMessage(
      data.message ||
        (response.ok ? "Profile updated" : "Unable to update profile"),
    );
    if (response.ok) {
      setEditing(false);
      setStudent(data.student || student);
    }
  };
  const changePassword = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/changePassword/${user?._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      },
    );
    const data = await response.json();
    setMessage(data.message || "Password update failed");
    if (response.ok) setPasswords({ current: "", next: "", confirm: "" });
  };
  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !isSelf) return;
    const body = new FormData();
    body.append("profilePhoto", file);
    setUploadingPhoto(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/student/profile/photo`,
      { method: "POST", credentials: "include", body },
    );
    const data = await response.json();
    setMessage(data.message || "Photo upload failed");
    if (response.ok) {
      setStudent({ ...student, profilePictureUrl: data.profilePictureUrl });
      setForm({ ...form, profilePictureUrl: data.profilePictureUrl });
    }
    setUploadingPhoto(false);
    event.target.value = "";
  };
  const removePhoto = async () => {
    if (!isSelf) return;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/student/profile/photo`,
      { method: "DELETE", credentials: "include" },
    );
    const data = await response.json();
    setMessage(data.message || "Photo removal failed");
    if (response.ok) {
      setStudent({ ...student, profilePictureUrl: "" });
      setForm({ ...form, profilePictureUrl: "" });
    }
  };
  const input = (key, label, type = "text") => (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input
        type={type}
        value={form[key] ?? ""}
        disabled={!editing}
        onChange={(event) => setForm({ ...form, [key]: event.target.value })}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 font-normal disabled:bg-slate-50"
      />
    </label>
  );

  if (!student) return <ProfileSkeleton />;
  return (
    <section className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Student record
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {student.userId?.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete profile, fee history and attendance.
          </p>
        </div>
        {studentId && (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        )}
      </div>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-slate-950 p-5 text-white">
          <img
            src={student.profilePictureUrl || "/no-image.jpg"}
            onError={(event) => {
              event.currentTarget.src = "/no-image.jpg";
            }}
            alt="Student"
            className="mx-auto h-48 w-48 rounded-2xl object-cover ring-4 ring-white/10"
          />
          {isSelf && (
            <label className="mt-4 block cursor-pointer rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-semibold hover:bg-white/20">
              {uploadingPhoto ? "Uploading..." : "Upload photo"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={uploadPhoto}
                disabled={uploadingPhoto}
                className="hidden"
              />
            </label>
          )}
          {isSelf && student.profilePictureUrl && (
            <button
              type="button"
              onClick={removePhoto}
              className="mt-2 w-full rounded-lg border border-rose-300/30 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-400/10"
            >
              Remove photo
            </button>
          )}
          <h2 className="mt-5 text-xl font-bold">{student.userId?.name}</h2>
          <p className="mt-1 text-sm text-slate-300">{student.userId?.email}</p>
          <p className="mt-5 text-sm text-cyan-300">
            {student.department?.departmentCode || "Department not assigned"}
          </p>
          <span
            className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
              student.status === "active"
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-rose-500/20 text-rose-300"
            }`}
          >
            Status: {student.status || "active"}
          </span>
          <div className="mt-5 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded-lg bg-white/10 p-3">
              <b className="block text-lg">{attendance.percentage}%</b>
              Attendance
            </div>
            <div className="rounded-lg bg-white/10 p-3">
              <b className="block text-lg">{fees.length}</b>Fee records
            </div>
          </div>
        </aside>
        <div className="space-y-5">
          <form
            onSubmit={save}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Personal and academic details
              </h2>
              {canEdit && (
                <button
                  type="button"
                  onClick={() => setEditing(!editing)}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold"
                >
                  <Pencil size={15} />
                  {editing ? "Cancel" : "Edit"}
                </button>
              )}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {input("name", "Full name")}
              {input("email", "Email", "email")}
              {input("phoneNumber", "Phone number")}
              {input("address", "Address")}
              {input("fatherName", "Father name")}
              {input("rollNumber", "Roll number")}
              {input("academicSession", "Academic session")}
              {input("year", "Year", "number")}
              {input("semester", "Semester", "number")}
              <label className="text-sm font-semibold text-slate-700">
                Status
                <select
                  value={form.status || "active"}
                  disabled={!editing || isSelf}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 font-normal disabled:bg-slate-50 outline-none focus:border-cyan-600 capitalize"
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
              <p className="mt-3 flex items-center gap-1 text-sm text-emerald-600">
                <Check size={15} />
                {message}
              </p>
            )}
          </form>
          {isSelf && (
            <form
              onSubmit={changePassword}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <KeyRound size={18} className="text-cyan-600" />
                Change password
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  ["current", "Current password"],
                  ["next", "New password"],
                  ["confirm", "Confirm password"],
                ].map(([key, label]) => (
                  <label key={key} className="text-sm font-semibold">
                    {label}
                    <input
                      required
                      type="password"
                      value={passwords[key]}
                      onChange={(event) =>
                        setPasswords({
                          ...passwords,
                          [key]: event.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 p-3 font-normal"
                    />
                  </label>
                ))}
              </div>
              <button className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Update password
              </button>
            </form>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold">Attendance</h2>
              <p className="mt-3 text-3xl font-bold text-emerald-600">
                {attendance.percentage}%
              </p>
              <p className="text-sm text-slate-500">
                {attendance.present} present out of {attendance.total} recorded
                classes.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold">Fee history</h2>
              <div className="mt-3 space-y-2">
                {fees.map((fee) => (
                  <div
                    key={fee._id || fee.session}
                    className="flex justify-between border-b border-slate-100 py-2 text-sm"
                  >
                    <span>{fee.session}</span>
                    <span
                      className={
                        fee.status === "paid"
                          ? "font-semibold text-emerald-600"
                          : "font-semibold text-rose-600"
                      }
                    >
                      {fee.status}
                    </span>
                  </div>
                ))}
                {!fees.length && (
                  <p className="text-sm text-slate-400">
                    No fee records found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProfileView;
