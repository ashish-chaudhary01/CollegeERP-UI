import {
  Building2,
  CalendarFold,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [overviewData, setOverviewData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchAdminDashboard() {
      try {
        const res = await fetch(`${API_URL}/admin/dashboard`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setOverviewData(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAdminDashboard();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Welcome back,Admin!
          </h2>
          <p className="text-sm text-gray-400">
            Here's what happening in your college today.
          </p>
        </div>
        {/* date */}
        <div className="bg-white py-1.5 px-2 rounded-md border border-black/20 text-xs font-semibold sm:flex hidden items-center gap-2">
          <CalendarFold />
          <span>{new Date().toDateString()}</span>
        </div>
      </div>

      {/* overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 items-stretch md:p-4 py-4">
        {/* card 1 */}
        <div className="p-3 sm:p-4 rounded-lg border border-black/20 bg-white flex items-center gap-3 sm:gap-4 min-w-0 w-full h-full">
          {/* icon */}
          <div className="shrink-0 rounded-full p-2 bg-blue-600/30 text-blue-700">
            <UsersRound size={30} />
          </div>
          {/* detail */}
          <div className="flex min-w-0 flex-col">
            <h2 className="text-xl font-bold">{overviewData?.totalStudents}</h2>
            <p className="text-sm">Total Students</p>
          </div>
        </div>
        {/* card 2 */}
        <div className="p-3 sm:p-4 rounded-lg border border-black/20 bg-white flex items-center gap-3 sm:gap-4 min-w-0 w-full h-full">
          {/* icon */}
          <div className="shrink-0 rounded-full p-2 bg-red-600/30 text-red-700">
            <Building2 size={30} />
          </div>
          {/* detail */}
          <div className="flex min-w-0 flex-col">
            <h2 className="text-xl font-bold">
              {overviewData?.totalDepartments}
            </h2>
            <p className="text-sm">Total Departments</p>
          </div>
        </div>
        {/* card 3 */}
        <div className="p-3 sm:p-4 rounded-lg border border-black/20 bg-white flex items-center gap-3 sm:gap-4 min-w-0 w-full h-full">
          {/* icon */}
          <div className="shrink-0 rounded-full p-2 bg-green-600/30 text-green-700">
            <GraduationCap size={30} />
          </div>
          {/* detail */}
          <div className="flex min-w-0 flex-col">
            <h2 className="text-xl font-bold">{overviewData?.totalTeachers}</h2>
            <p className="text-sm ">Total Teachers</p>
          </div>
        </div>
        {/* card 4 */}
        <div className="p-3 sm:p-4 rounded-lg border border-black/20 bg-white flex items-center gap-3 sm:gap-4 min-w-0 w-full h-full">
          {/* icon */}
          <div className="shrink-0 rounded-full p-2 bg-orange-600/30 text-orange-700">
            <UsersRound size={30} />
          </div>
          {/* detail */}
          <div className="flex min-w-0 flex-col">
            <h2 className="text-xl font-bold">
              {overviewData?.attendance?.overall ?? 0}%
            </h2>
            <p className="text-sm">Attendance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
