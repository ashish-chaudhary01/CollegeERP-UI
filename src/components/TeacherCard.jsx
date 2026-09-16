import { useNavigate } from "react-router";

function TeacherCard({ teacher, profileBase = "/admin/teacher" }) {
  const navigate = useNavigate();
  const image_url = teacher.profilePictureUrl || "/no-image.jpg";
  const role = teacher.userId?.role || "teacher";
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* role */}
      <p
        className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] ${role === "hod" ? "bg-rose-100 text-rose-700" : "bg-cyan-100 text-cyan-700"} inline font-bold`}
      >
        {teacher.userId.role}
      </p>
      <div className="aspect-square">
        <img
          src={image_url}
          alt="teacher profile"
          onError={(event) => {
            event.currentTarget.src = "/no-image.jpg";
          }}
          className="h-full w-full object-cover"
        />
      </div>
      {/* details */}
      <div className="px-2 pb-2 flex-1">
        <h2 className="mt-2 font-bold text-xl capitalize leading-tight">
          {teacher.userId?.name || "Unknown teacher"}
        </h2>
        <p className="text-[13px] text-slate-500">
          {teacher.userId?.email || "No email"}
        </p>
        <div className="mt-1 text-xs text-gray-700 flex gap-1 flex-wrap">
          <span
            className={`px-2 py-1 rounded-full backdrop-blur-2xl border-black/10 border  ${teacher.status === "active" ? "bg-green-400/20 text-green-700" : "bg-red-400/20 text-red-700"}`}
          >
            Status : {teacher.status || "unknown"}
          </span>
        </div>
        {/* other details */}
        <div className="mt-2 text-sm">
          <p>
            Department : {teacher.department?.departmentCode || "Not assigned"}
          </p>
        </div>
      </div>
      {/* view profile button */}
      <button
        onClick={() => navigate(`${profileBase}/${teacher._id}`)}
        className="border-t border-slate-100 px-3 py-3 text-left text-xs font-semibold text-cyan-700 transition hover:bg-cyan-50"
      >
        View full profile · {teacher.designation || "Faculty member"}
      </button>
    </div>
  );
}

export default TeacherCard;
