import { useNavigate } from "react-router";

function Studentcard({ student }) {
  const navigate = useNavigate();
  const image_url = student?.profilePictureUrl || "/no-image.jpg";
  return (
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
        <p className="text-[13px] text-slate-500">
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
          <p className="">
            BRANCH : {student.department?.departmentCode ?? "Not assigned"}
          </p>
        </div>
      </div>
      {/* view profile button */}
      <button
        onClick={() => navigate(`/admin/student/${student._id}`)}
        className="w-full bg-slate-900 p-3 text-sm font-bold text-white transition hover:bg-cyan-700"
      >
        View Profile
      </button>
    </div>
  );
}

export default Studentcard;
