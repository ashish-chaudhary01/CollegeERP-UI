import { Check, KeyRound, Save, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ProfileSkeleton } from "../../components/ui/Skeletons";

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) return { message: `Request failed (${response.status})` };
  try {
    return JSON.parse(text);
  } catch {
    return { message: `Request failed (${response.status})` };
  }
};

const RoleProfile = ({ role }) => {
  const { user, login } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    designation: "",
    profilePictureUrl: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const endpoint = `${API_URL}/${role}/profile`;

  useEffect(() => {
    let active = true;
    fetch(endpoint, { credentials: "include" })
      .then(async (response) => ({
        response,
        data: await parseResponse(response),
      }))
      .then(({ response, data }) => {
        if (!active) return;
        if (!response.ok || !data.profile) {
          setProfileError(
            data.message ||
              "Unable to load profile. Please restart the backend and try again.",
          );
          return;
        }
        const value = data.profile;
        setProfile(value);
        setForm({
          name: value?.userId?.name || "",
          email: value?.userId?.email || "",
          phoneNumber: value?.phoneNumber || "",
          address: value?.address || "",
          designation: value?.designation || "",
          profilePictureUrl: value?.profilePictureUrl || "",
        });
      })
      .catch(() => {
        if (active)
          setProfileError(
            "Backend is unavailable. Start the backend on port 3000 and retry.",
          );
      });
    return () => {
      active = false;
    };
  }, [endpoint]);
  const save = async (event) => {
    event.preventDefault();
    const response = await fetch(endpoint, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await parseResponse(response);
    setMessage(
      data.message ||
        (response.ok ? "Profile updated" : "Unable to update profile"),
    );
    if (response.ok) {
      setProfile(data.profile);
      login({ ...user, name: form.name, email: form.email });
      setEditing(false);
    }
  };
  const changePassword = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${API_URL}/auth/changePassword/${user?._id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      },
    );
    const data = await parseResponse(response);
    setMessage(data.message || "Password update failed");
    if (response.ok) setPasswords({ current: "", next: "", confirm: "" });
  };
  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("profilePhoto", file);
    setUploadingPhoto(true);
    const response = await fetch(`${endpoint}/photo`, {
      method: "POST",
      credentials: "include",
      body,
    });
    const data = await parseResponse(response);
    setMessage(data.message || "Photo upload failed");
    if (response.ok) {
      setProfile({ ...profile, profilePictureUrl: data.profilePictureUrl });
      setForm({ ...form, profilePictureUrl: data.profilePictureUrl });
    }
    setUploadingPhoto(false);
    event.target.value = "";
  };
  const removePhoto = async () => {
    const response = await fetch(`${endpoint}/photo`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await parseResponse(response);
    setMessage(data.message || "Photo removal failed");
    if (response.ok) {
      setProfile({ ...profile, profilePictureUrl: "" });
      setForm({ ...form, profilePictureUrl: "" });
    }
  };
  if (!profile) {
    if (!profileError) return <ProfileSkeleton />;
    return (
      <p className="text-sm text-rose-600">
        {profileError || "Loading profile..."}
      </p>
    );
  }
  const input = (key, label, type = "text") => (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input
        type={type}
        value={form[key]}
        disabled={!editing}
        onChange={(event) => setForm({ ...form, [key]: event.target.value })}
        className="mt-1 w-full rounded-lg border border-slate-200 p-3 font-normal disabled:bg-slate-50"
      />
    </label>
  );
  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
          Account settings
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {role === "hod" ? "HOD profile" : "Teacher profile"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Keep your contact details and account security up to date.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl bg-slate-950 p-5 text-white">
          <img
            src={profile.profilePictureUrl || "/no-image.jpg"}
            onError={(event) => {
              event.currentTarget.src = "/no-image.jpg";
            }}
            alt="Profile"
            className="mx-auto h-44 w-44 rounded-2xl object-cover"
          />
          <label className="mt-4 block cursor-pointer rounded-lg bg-white/10 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-white/20">
            {uploadingPhoto ? "Uploading..." : "Upload photo"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={uploadPhoto}
              disabled={uploadingPhoto}
              className="hidden"
            />
          </label>
          {profile.profilePictureUrl && (
            <button
              type="button"
              onClick={removePhoto}
              className="mt-2 w-full rounded-lg border border-rose-300/30 px-3 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-400/10"
            >
              Remove photo
            </button>
          )}
          <h2 className="mt-5 text-xl font-bold">{profile.userId?.name}</h2>
          <p className="mt-1 break-all text-sm text-slate-300">
            {profile.userId?.email}
          </p>
          <p className="mt-4 text-sm text-cyan-300">
            {profile.department?.departmentCode}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
            <ShieldCheck size={14} />
            {role === "hod" ? "Head of Department" : "Teacher"}
          </span>
        </aside>
        <div className="space-y-5">
          <form
            onSubmit={save}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Personal details</h2>
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold"
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {input("name", "Full name")}
              {input("email", "Email", "email")}
              {input("phoneNumber", "Phone number")}
              {input("address", "Address")}
              {input("designation", "Designation")}
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
          <form
            onSubmit={changePassword}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <KeyRound size={19} className="text-cyan-600" />
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
                      setPasswords({ ...passwords, [key]: event.target.value })
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
        </div>
      </div>
    </section>
  );
};

export default RoleProfile;
