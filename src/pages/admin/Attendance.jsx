import { CalendarDays, RefreshCw, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

const today = new Date().toISOString().slice(0, 10);
const yearStart = `${new Date().getFullYear()}-01-01`;

const BarChart = ({
  rows,
  labelKey = "name",
  valueKey = "percentage",
  empty = "No attendance records yet",
}) => (
  <div className="space-y-4">
    {rows?.length ? (
      rows.slice(-8).map((row) => (
        <div key={row.id || row.date}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="truncate font-medium">{row[labelKey]}</span>
            <span className="font-semibold text-slate-700">
              {row[valueKey]}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all"
              style={{ width: `${Math.min(row[valueKey] || 0, 100)}%` }}
            />
          </div>
        </div>
      ))
    ) : (
      <p className="py-8 text-center text-sm text-slate-400">{empty}</p>
    )}
  </div>
);

const Attendance = () => {
  const [departments, setDepartments] = useState([]);
  const [filters, setFilters] = useState({
    from: yearStart,
    to: today,
    department: "all",
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const loadData = async () => {
    try {
      const query = new URLSearchParams(filters);
      const [analyticsResponse, departmentResponse] = await Promise.all([
        fetch(`${API_URL}/admin/attendance/analytics?${query}`, {
          credentials: "include",
        }),
        fetch(`${API_URL}/admin/departments`, { credentials: "include" }),
      ]);
      setData(await analyticsResponse.json());
      const departmentData = await departmentResponse.json();
      setDepartments(departmentData.departments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Filter changes intentionally control this reload effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.from, filters.to, filters.department]);
  const totals = data?.totals || {
    present: 0,
    absent: 0,
    leave: 0,
    percentage: 0,
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Attendance intelligence
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            College attendance
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Today and historical attendance, in one view.
          </p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 duration-200 px-4 py-2 text-sm font-semibold text-white"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <label className="text-sm font-semibold text-slate-600">
          From
          <input
            type="date"
            value={filters.from}
            onChange={(event) =>
              setFilters({ ...filters, from: event.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-slate-200 p-2 font-normal text-slate-900"
          />
        </label>
        <label className="text-sm font-semibold text-slate-600">
          To
          <input
            type="date"
            value={filters.to}
            onChange={(event) =>
              setFilters({ ...filters, to: event.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-slate-200 p-2 font-normal text-slate-900"
          />
        </label>
        <label className="text-sm font-semibold text-slate-600">
          Department
          <select
            value={filters.department}
            onChange={(event) =>
              setFilters({ ...filters, department: event.target.value })
            }
            className="mt-1 block w-full rounded-lg border border-slate-200 bg-white p-2 font-normal text-slate-900"
          >
            <option value="all">All departments</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentCode} · {department.departmentName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Overall",
            value: `${totals.percentage}%`,
            color: "text-cyan-600",
          },
          {
            label: "Present",
            value: totals.present,
            color: "text-emerald-600",
          },
          { label: "Absent", value: totals.absent, color: "text-rose-600" },
          { label: "Leave", value: totals.leave, color: "text-amber-600" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className={`mt-2 text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Department-wise attendance
          </h2>
          <BarChart rows={data?.departments} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Subject-wise attendance
          </h2>
          <BarChart rows={data?.subjects} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Daily trend</h2>
            <CalendarDays className="text-cyan-600" size={20} />
          </div>
          <BarChart
            rows={data?.daily?.map((row) => ({ ...row, name: row.date }))}
          />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Low attendance watchlist
            </h2>
            <TrendingDown className="text-rose-500" size={20} />
          </div>
          {data?.lowAttendance?.length ? (
            <div className="divide-y divide-slate-100">
              {data.lowAttendance.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {student.rollNumber} · {student.department}
                    </p>
                  </div>
                  <span className="font-bold text-rose-600">
                    {student.percentage}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-400">
              No students below 75% in this range.
            </p>
          )}
        </div>
      </div>
      {loading && (
        <p className="text-center text-sm text-slate-500">
          Loading attendance...
        </p>
      )}
    </section>
  );
};

export default Attendance;
