import { useState } from "react";

const Subjects = () => {
  const [inputSearch, setInputSearch] = useState("");
  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-4xl font-bold">Subjects</h1>
      <p className="text-gray-400 text-[13px]">
        Search, view and manage subjects
      </p>

      {/* search bar */}
      <div className="flex items-center mt-4 gap-2 max-w-3xl">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search subject by name.."
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>

        <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer">
          <span>+</span>
          <span className="hidden lg:block">Add Subjects</span>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
