function TeacherCard({ teacher }) {
  const image_url = teacher.profilePictureUrl || "/no-image.jpg";
  return (
    <div className="relative rounded-lg border border-black/20 shadow-md hover:shadow-lg w-full h-full hover:-translate-y-1.5 duration-300 ease-out flex flex-col justify-between overflow-hidden">
      {/* role */}
      <p
        className={`absolute right-2 top-2 text-[8px] rounded-full mb-2 px-2 py-1 uppercase tracking-[0.30em] ${teacher.userId.role === "hod" ? "bg-pink-500/20 text-pink-700" : "bg-purple-500/20 text-purple-700"} inline font-bold`}
      >
        {teacher.userId.role}
      </p>
      <div className="aspect-square">
        <img
          src={image_url}
          alt="student-image"
          className="w-full h-full object-cover  rounded-t-lg"
        />
      </div>
      {/* details */}
      <div className="px-2 pb-2 flex-1">
        <h2 className="mt-2 font-bold text-xl capitalize leading-tight">
          {teacher.userId.name}
        </h2>
        <p className="text-[13px] text-slate-500">{teacher.userId.email}</p>
        <div className="mt-1 text-xs text-gray-700 flex gap-1 flex-wrap">
          <span
            className={`px-2 py-1 rounded-full backdrop-blur-2xl border-black/10 border  ${teacher.status === "active" ? "bg-green-400/20 text-green-700" : "bg-red-400/20 text-red-700"}`}
          >
            Status : {teacher.status}
          </span>
        </div>
        {/* other details */}
        <div className="mt-2 text-sm">
          <p className="">Department : {teacher.department.departmentName}</p>
        </div>
      </div>
      {/* view profile button */}
      <button className="w-full p-2 bg-blue-600 text-white font-bold text-md rounded-b-lg cursor-pointer hover:bg-blue-700">
        View Profile
      </button>
    </div>
  );
}

export default TeacherCard;
