import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";

const Departments = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/departments`,
          { method: "GET", credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to Fetch Departments");
        const data = await res.json();
        console.log(data.departments);
        setDepartments(data.departments);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchDepartment();
  }, []);

  const filteredDepartments =
    inputSearch.trim().length > 0
      ? departments.filter((department) => {
          const searchTerm = inputSearch.trim().toLowerCase();
          return department.departmentName.toLowerCase().includes(searchTerm);
        })
      : departments;
  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-2xl font-bold">Departments</h1>

      {/* search bar */}
      <div className="flex items-center mt-4 gap-2">
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            placeholder="Search departments"
            className="outline-0 border-black/15 px-4 py-2 rounded bg-gray-200 placeholder:text-sm flex-1 text-md text-slate-700"
          />
        </div>

        <div className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700/80 duration-200 cursor-pointer">
          <span>+</span>
          <span className="hidden lg:block">Add Department</span>
        </div>
      </div>

      {/* department grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {filteredDepartments?.map((department, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-black/20 shadow-md hover:-translate-y-1.5 duration-300 ease-out p-4"
          >
            <div className="flex gap-4 items-center">
              {/* icon */}
              <div>
                <Building2
                  size={60}
                  className="bg-blue-400/20 text-blue-700 rounded-full p-2"
                />{" "}
              </div>
              {/* details */}
              <div className="flex flex-col gap-1 p-2">
                <h2 className="text-2xl font-extrabold leading-tight">
                  {department.departmentName}
                  <span className="text-sm">
                    {" "}
                    ({department.departmentCode})
                  </span>
                </h2>
                <p className="font-bold text-sm">
                  Hod : {department.hod.userId.name}
                </p>
              </div>
            </div>
            <button className="p-2 w-full bg-blue-600 text-md text-white font-bold hover:bg-blue-700 duration-200 cursor-pointer">
              View Department
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
