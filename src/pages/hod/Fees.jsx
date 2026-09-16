import { CheckCircle2, CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";

const Fees = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [session, setSession] = useState(
    `${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(-2)}`,
  );
  const [fees, setFees] = useState([]);
  const [message, setMessage] = useState("");

  const load = () =>
    fetch(`${API_URL}/hod/fees?session=${encodeURIComponent(session)}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setFees(data.fees || []));
  useEffect(() => {
    fetch(`${API_URL}/hod/fees?session=${encodeURIComponent(session)}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setFees(data.fees || []));
  }, [API_URL, session]);
  const submit = async (studentId) => {
    const response = await fetch(`${API_URL}/hod/fees/${studentId}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session, status: "paid" }),
    });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) load();
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">
            Department finance
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Fee collection</h1>
          <p className="mt-1 text-sm text-slate-500">
            Mark fees paid and see students who are still pending.
          </p>
        </div>
        <input
          value={session}
          onChange={(event) => setSession(event.target.value)}
          className="rounded-lg border border-slate-200 p-2 text-sm"
        />
      </div>
      {message && (
        <p className="text-sm font-semibold text-cyan-700">{message}</p>
      )}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Roll number</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Session</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fees.map((fee) => (
              <tr key={fee.id}>
                <td className="px-5 py-4 font-semibold">
                  {fee.studentId?.userId?.name}
                </td>
                <td className="px-5 py-4">{fee.studentId?.rollNumber}</td>
                <td className="px-5 py-4">{fee.studentId?.userId?.email}</td>
                <td className="px-5 py-4">{fee.session}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${fee.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                  >
                    {fee.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {fee.status === "pending" ? (
                    <button
                      onClick={() => submit(fee.studentId?._id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
                    >
                      <CheckCircle2 size={15} />
                      Mark paid
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <CircleDollarSign size={16} />
                      Done
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!fees.length && (
              <tr>
                <td colSpan="6" className="p-10 text-center text-slate-400">
                  No students found in this department.
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
