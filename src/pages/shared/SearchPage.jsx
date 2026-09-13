import { useState } from "react";

function SearchPage() {
  const [inputSearch, setInputSearch] = useState("");
  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-3xl font-bold">Search</h1>
      <p className="text-sm leading-tight text-gray-500">
        Search student of any department
      </p>

      {/* search bar */}
      <div className="flex items-center mt-4 gap-2 max-w-3xl">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search by name, email or roll number..."
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-xs sm:placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
