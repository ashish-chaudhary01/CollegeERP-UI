import { useEffect, useState } from "react";

const AdminFeesPage = () => {
  const [studentFees, setStudentFees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [semester, setSemester] = useState("all");

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
        let url = `${import.meta.env.VITE_API_URL}/admin/fees?department=${selectedDepartment}&semester=${semester}`;
        const res = await fetch(url, { method: "GET", credentials: "include" });
        const data = await res.json();
        setStudentFees(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchStudentFees();
  }, [semester, selectedDepartment, status]);
  return (
    <div className="min-h-screen overflow-hidden">
      {/* heading */}
      <h1 className="text-3xl md:text-4xl font-bold">Fees</h1>
      <p className="text-sm text-gray-500">Manage Fees of students</p>

      {/* filter container */}
      <div className="mt-6 px-4 py-2 bg-gray-200 rounded-xl flex gap-4 flex-wrap items-center text-sm">
        {/* department filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="departments" className="font-medium ">
            Departments :
          </label>

          <select
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
          >
            <option value="all">All</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentCode}
              </option>
            ))}
          </select>
        </div>
        {/* status filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="status" className="text-sm font-medium ">
            Status :
          </label>

          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {/* semester filter */}
        <div className="flex gap-2 items-center">
          <label htmlFor="semester" className="text-sm font-medium ">
            Semester :
          </label>

          <select
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-500 py-0.5 px-2 text-xs rounded-xl"
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
                <td className="px-6 py-2 font-medium capitalize">
                  {fee.studentName}
                </td>
                <td className="px-6 py-2 font-medium text-indigo-400">
                  {fee.email}
                </td>
                <td className="px-6 py-2 font-medium">
                  {fee.studentRollNumber}
                </td>
                <td className="px-6 py-2 font-medium">{fee.departmentName}</td>
                <td className="px-6 py-2 font-medium">{fee.year}</td>
                <td className="px-6 py-2 font-medium">{fee.semester}</td>
                <td
                  className={`px-6 py-2 font-medium ${fee.status === "pending" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}
                >
                  {fee.status}
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
