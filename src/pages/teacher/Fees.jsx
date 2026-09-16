import { useEffect, useState } from "react";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [session, setSession] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let active = true;
    fetch(
      `${API_URL}/teacher/fees${session ? `?session=${encodeURIComponent(session)}` : ""}`,
      { credentials: "include" },
    )
      .then((response) => response.json())
      .then((data) => {
        if (active) setFees((data.fees || []).filter((fee) => fee.studentId));
      });
    return () => {
      active = false;
    };
  }, [API_URL, session]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Department finance
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Student fees</h1>
          <p className="mt-1 text-sm text-slate-500">
            Read-only fee status for students in your department.
          </p>
        </div>
        <input
          value={session}
          onChange={(event) => setSession(event.target.value)}
          placeholder="Filter session e.g. 2026-27"
          className="rounded-lg border border-slate-200 p-2 text-sm"
        />
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-170 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Roll number</th>
              <th className="px-5 py-4">Session</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fees.map((fee) => (
              <tr key={fee._id}>
                <td className="px-5 py-4 font-semibold">
                  {fee.studentId?.userId?.name}
                </td>
                <td className="px-5 py-4">{fee.studentId?.rollNumber}</td>
                <td className="px-5 py-4">{fee.session}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${fee.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                  >
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
            {!fees.length && (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-400">
                  No fee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Fees;
