import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function Studentcard({ student, onDeleted, profileBase = "/admin/student" }) {
  const navigate = useNavigate();
  const image_url = student?.profilePictureUrl || "/no-image.jpg";
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setError("");
      setDeleting(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/student/${student._id}`,
        { method: "DELETE", credentials: "include" },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onDeleted?.();
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="aspect-square">
          <img
            src={image_url}
            alt="student profile"
            onError={(event) => {
              event.currentTarget.src = "/no-image.jpg";
            }}
            className="h-full w-full object-cover"
          />
        </div>
        {/* details */}
        <div className="px-2 pb-2 flex-1">
          <h2 className="mt-2 font-bold text-xl capitalize leading-tight">
            {student.userId?.name ?? "Unknown student"}
          </h2>
          <p className="text-xs wrap-break-word whitespace-normal text-slate-500">
            {student.userId?.email ?? "No email"}
          </p>
          <div className="mt-1 text-xs text-gray-700 flex gap-1 flex-wrap">
            <span className="px-2 py-1 rounded-full text-orange-700 backdrop-blur-2xl border-black/10 border bg-orange-400/20">
              Year : {student?.year ?? "-"}
            </span>
            <span className="px-2 py-1 rounded-full bg-orange-400/20 text-orange-700 backdrop-blur-2xl border-black/10 border">
              semester : {student?.semester ?? "-"}
            </span>
            <span
              className={`px-2 py-1 rounded-full backdrop-blur-2xl border-black/10 border  ${student?.status === "active" ? "bg-green-400/20 text-green-700" : "bg-red-400/20 text-red-700"}`}
            >
              Status : {student?.status ?? "unknown"}
            </span>
          </div>
          {/* other details */}
          <div className="mt-2 text-sm">
            <p>UBTER-ID : {student?.rollNumber ?? "-"}</p>
            <p>
              BRANCH : {student.department?.departmentCode ?? "Not assigned"}
            </p>
          </div>
        </div>
        {/* buttons */}
        <div className="flex">
          <button
            onClick={() => navigate(`${profileBase}/${student._id}`)}
            className="flex-1 bg-slate-900 p-3 text-sm font-bold text-white transition hover:bg-cyan-700"
          >
            View Profile
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="bg-rose-500 px-3 py-3 text-white transition hover:bg-rose-600"
            title="Delete student"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => e.target === e.currentTarget && setConfirming(false)}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-800">
              Delete Student?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">
                {student.userId?.name}
              </span>
              ? This action cannot be undone.
            </p>
            {/* error */}
            {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Studentcard;
