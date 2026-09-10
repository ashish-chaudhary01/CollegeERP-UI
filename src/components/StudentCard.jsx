function Studentcard({ student }) {
  return (
    <div className="rounded-lg border border-black/20 shadow-md hover:shadow-lg w-full h-full hover:-translate-y-1.5 duration-300 ease-out flex flex-col justify-between overflow-hidden">
      <div className="aspect-square">
        <img
          src="/no-image.jpg"
          alt="student-image"
          className="w-full h-full object-cover  rounded-t-lg"
        />
      </div>
      {/* details */}
      <div className="px-2 pb-2 flex-1">
        <h2 className="mt-2 font-bold text-xl capitalize leading-tight">
          {student.userId.name}
        </h2>
        <p className="text-[13px] text-slate-500">{student.userId.email}</p>
        <div className="mt-1 text-xs text-gray-700 flex gap-1 flex-wrap">
          <span className="px-2 py-1 rounded-full text-orange-700 backdrop-blur-2xl border-black/10 border bg-orange-400/20">
            Year : {student.year}
          </span>
          <span className="px-2 py-1 rounded-full bg-orange-400/20 text-orange-700 backdrop-blur-2xl border-black/10 border">
            semester : {student.semester}
          </span>
          <span
            className={`px-2 py-1 rounded-full backdrop-blur-2xl border-black/10 border  ${student.status === "active" ? "bg-green-400/20 text-green-700" : "bg-red-400/20 text-red-700"}`}
          >
            Status : {student.status}
          </span>
        </div>
        {/* other details */}
        <div className="mt-2 text-sm">
          <p>UBTER-ID : {student.rollNumber}</p>
          <p className="">BRANCH : {student.department.departmentName}</p>
        </div>
      </div>
      {/* view profile button */}
      <button className="w-full p-2 bg-blue-600 text-white font-bold text-md rounded-b-lg cursor-pointer">
        View Profile
      </button>
    </div>
  );
}

export default Studentcard;
