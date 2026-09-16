import {
  AtSign,
  Building2,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const getUserValue = (user, key) => user?.[key] ?? user?.userId?.[key] ?? "";

const AdminProfile = () => {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState({
    name: getUserValue(user, "name") || "Admin User",
    email: getUserValue(user, "email") || "admin@college.edu",
    phone: getUserValue(user, "phoneNumber"),
    department: "Administration",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const displayName = profile.name || "Admin User";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  // profile update function
  const updateProfile = async (event) => {
    event.preventDefault();

    try {
      setIsUpdatingProfile(true);
      setProfileError("");
      setProfileSaved(false);

      const profilePayload = {
        name: profile.name.trim(),
        email: profile.email.trim(),
        phoneNumber: profile.phone.trim(),
        department: profile.department.trim(),
      };
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/profileUpdate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(profilePayload),
        },
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || data.error || `Profile update failed (${res.status})`,
        );
      }

      const updatedUser = data.user ||
        data.admin ||
        data.data?.user || { ...user, ...profilePayload };
      login(updatedUser);
      setProfile((currentProfile) => ({
        ...currentProfile,
        ...profilePayload,
        phone: profilePayload.phoneNumber,
      }));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (error) {
      setProfileError(error.message || "Unable to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // change password function
  const updatePassword = async (event) => {
    event.preventDefault();
    try {
      if (passwords.next !== passwords.confirm) {
        setPasswordSaved(false);
        setPasswordError("New password and confirmation do not match.");
        return;
      }
      setPasswordError("");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/changePassword/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(passwords),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.message || "password change failed");
        throw new Error("password change failed");
      }

      setPasswordSaved(true);
      setPasswords({ current: "", next: "", confirm: "" });
      setTimeout(() => setPasswordSaved(false), 2500);
    } catch (error) {
      console.log(error.message);
      setPasswordError(error.message);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-0 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="min-h-screen pb-10">
      <div className="mb-7">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Account settings
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Admin profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account details and security preferences.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(250px,0.7fr)_minmax(0,1.5fr)]">
        <aside className="relative overflow-hidden rounded-2xl bg-slate-950 p-7 text-white shadow-lg">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-indigo-500/30 blur-2xl" />
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-4xl font-bold shadow-xl ring-8 ring-white/10">
              {initials || "AD"}
            </div>
            <div className="mt-7">
              <h2 className="wrap-break-words text-2xl font-bold">
                {displayName}
              </h2>
              <p className="mt-1 break-all text-sm text-slate-300">
                {profile.email}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={15} /> Administrator
              </span>
            </div>
            <div className="mt-12 border-t border-white/10 pt-5 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Building2 size={16} className="text-indigo-300" />
                College administration
              </p>
              <p className="mt-3 flex items-center gap-2">
                <AtSign size={16} className="text-indigo-300" />
                {profile.email}
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <form
            onSubmit={updateProfile}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Personal details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the information shown on your profile.
                </p>
              </div>
              <UserRound className="text-indigo-500" size={22} />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Full name
                <input
                  required
                  value={profile.name}
                  onChange={(event) => {
                    setProfile({ ...profile, name: event.target.value });
                    setProfileSaved(false);
                    setProfileError("");
                  }}
                  className={inputClass}
                  placeholder="Enter admin name"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Email address
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    required
                    type="email"
                    value={profile.email}
                    onChange={(event) => {
                      setProfile({ ...profile, email: event.target.value });
                      setProfileSaved(false);
                      setProfileError("");
                    }}
                    className={`${inputClass} pl-10`}
                    placeholder="admin@college.edu"
                  />
                </div>
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Phone number
                <input
                  value={profile.phone}
                  onChange={(event) => {
                    setProfile({ ...profile, phone: event.target.value });
                    setProfileSaved(false);
                    setProfileError("");
                  }}
                  className={inputClass}
                  placeholder="Enter phone number"
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Department
                <input
                  value={profile.department}
                  onChange={(event) => {
                    setProfile({ ...profile, department: event.target.value });
                    setProfileSaved(false);
                    setProfileError("");
                  }}
                  className={inputClass}
                  placeholder="Administration"
                />
              </label>
            </div>

            {profileError && (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {profileError}
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              {profileSaved && (
                <span
                  role="status"
                  className="flex items-center gap-1 text-sm text-emerald-600"
                >
                  <Check size={16} /> Profile updated successfully
                </span>
              )}
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                {isUpdatingProfile ? "Updating..." : "Save details"}
              </button>
            </div>
          </form>

          <form
            onSubmit={updatePassword}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Change password
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Use a strong password to keep your admin account secure.
                </p>
              </div>
              <KeyRound className="text-indigo-500" size={22} />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {["current", "next", "confirm"].map((field) => (
                <label
                  key={field}
                  className="text-sm font-semibold text-slate-700"
                >
                  {field === "current"
                    ? "Current password"
                    : field === "next"
                      ? "New password"
                      : "Confirm password"}
                  <div className="relative">
                    <input
                      required
                      type={showPasswords ? "text" : "password"}
                      value={passwords[field]}
                      onChange={(event) => {
                        setPasswords({
                          ...passwords,
                          [field]: event.target.value,
                        });
                        setPasswordError("");
                      }}
                      className={`${inputClass} pr-10`}
                    />
                    {field === "confirm" && (
                      <button
                        type="button"
                        aria-label={
                          showPasswords ? "Hide passwords" : "Show passwords"
                        }
                        onClick={() => setShowPasswords(!showPasswords)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showPasswords ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {passwordError && (
              <p className="mt-4 text-sm text-red-600">{passwordError}</p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              {passwordSaved && (
                <span className="flex items-center gap-1 text-sm text-emerald-600">
                  <Check size={16} /> Password updated
                </span>
              )}
              <button
                type="submit"
                className="rounded-lg border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                Update password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
