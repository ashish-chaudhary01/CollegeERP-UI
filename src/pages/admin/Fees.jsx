import { useEffect, useState } from "react";

const AdminFeesPage = () => {
  const [studentFees, setStudentFees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [feeStatus, setFeeStatus] = useState("all");
  const [status, setStatus] = useState("all");
  const [semester, setSemester] = useState("all");
  const [session, setSession] = useState(
    `${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(-2)}`,
  );

  // fetch departments
  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/departments`,
          { method: "GET", credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to Fetch Departments");
        const data = await res.json();
        setDepartments(data.departments);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchDepartment();
  }, []);

  useEffect(() => {
    async function fetchStudentFees() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/admin/fees?department=${selectedDepartment}&semester=${semester}&status=${status}&feeStatus=${feeStatus}&session=${encodeURIComponent(session)}`;
        const res = await fetch(url, { method: "GET", credentials: "include" });
        const data = await res.json();
        setStudentFees(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchStudentFees();
  }, [semester, selectedDepartment, status, feeStatus, session]);
  const pendingCount = studentFees.filter(
    (fee) => fee.status === "pending",
  ).length;
  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-3xl md:text-4xl font-bold">Fees collection</h1>
      <p className="text-sm text-gray-500">
        Track paid and pending fee status for every student.
      </p>

      {/* filter container */}
      <div className="mt-6 px-4 py-3 border border-slate-200 bg-linear-to-br from-white to-indigo-50/70 shadow-sm rounded-xl text-sm grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <label className="font-semibold text-xs tracking-wide uppercase text-slate-500 block">
          Session :
          <input
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          />
        </label>
        {/* department filter */}
        <div className="">
          <label
            htmlFor="department"
            className="font-semibold text-xs uppercase text-slate-500 tracking-wide block"
          >
            Departments :
          </label>

          <select
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentCode}
              </option>
            ))}
          </select>
        </div>
        {/* Feestatus filter */}
        <div>
          <label
            htmlFor="feestatus"
            className="font-semibold text-xs uppercase text-slate-500 tracking-wide block"
          >
            Fee Status :
          </label>

          <select
            name="feestatus"
            value={feeStatus}
            onChange={(e) => setFeeStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {/* semester filter */}
        <div>
          <label
            htmlFor="semester"
            className="font-semibold text-xs uppercase text-slate-500 tracking-wide block"
          >
            Semester :
          </label>

          <select
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        {/* student status filter */}
        <div>
          <label
            htmlFor="status"
            className="font-semibold text-xs uppercase text-slate-500 tracking-wide block"
          >
            Status :
          </label>

          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Students in view</p>
          <p className="text-2xl font-bold">{studentFees.length}</p>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-700">Paid</p>
          <p className="text-2xl font-bold text-emerald-700">
            {studentFees.length - pendingCount}
          </p>
        </div>
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">
          <p className="text-sm text-rose-700">Pending</p>
          <p className="text-2xl font-bold text-rose-700">{pendingCount}</p>
        </div>
      </div>

      {/* table */}
      <div className="rounded-xl mt-6 border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Student name</th>
              <th className="px-6 py-4 font-semibold">Student email</th>
              <th className="px-6 py-4 font-semibold">Student Roll</th>
              <th className="px-6 py-4 font-semibold">department</th>
              <th className="px-6 py-4 font-semibold">year</th>
              <th className="px-6 py-4 font-semibold">semester</th>
              <th className="px-6 py-4 font-semibold">Fees Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {studentFees.map((fee) => (
              <tr key={fee.email} className="tranisition hover:bg-slate-50">
                <td className="px-6 py-2 font-medium capitalize text-black">
                  {fee.studentName || "unknown"}
                </td>
                <td className="px-6 py-2 font-medium text-indigo-400">
                  {fee.email ?? "no-email"}
                </td>
                <td className="px-6 py-2 font-medium">
                  {fee.studentRollNumber}
                </td>
                <td className="px-6 py-2 font-medium">{fee.departmentName}</td>
                <td className="px-6 py-2 font-medium">{fee.year}</td>
                <td className="px-6 py-2 font-medium">{fee.semester}</td>
                <td className={`px-6 py-2 font-medium capitalize `}>
                  <span
                    className={`px-3 text-xs py-1 rounded-xl ${fee.status === "pending" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}
                  >
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeesPage;
