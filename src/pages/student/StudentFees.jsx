import {
  ReceiptIndianRupee,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  AlertCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSkeleton } from "../../components/ui/Skeletons";

const StudentFees = () => {
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchFees = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/student/fees`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to load fees details (${response.status})`);
      }
      const data = await response.json();
      setStudent(data.student || null);
      setFees(data.studentFees || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load fee information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, [API_URL]);

  if (loading) return <DashboardSkeleton />;

  const paidCount = fees.filter((f) => f.status === "paid").length;
  const pendingCount = fees.filter((f) => f.status === "pending").length;

  return (
    <section className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              <span>Financial Portal</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
              Student Fee Statements
            </h1>
            <p className="mt-1 text-sm text-emerald-100 max-w-xl">
              Track your session fees, payment clearance statuses, and financial records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 text-center">
              <p className="text-xs text-emerald-100 uppercase font-medium">
                Cleared Sessions
              </p>
              <p className="text-xl font-bold">{paidCount}</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 border border-white/10 text-center">
              <p className="text-xs text-emerald-100 uppercase font-medium">
                Pending Sessions
              </p>
              <p className="text-xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-800">
          <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Student Info Card */}
      {student && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Account Holder
            </p>
            <h2 className="text-lg font-bold text-slate-900">
              {student.userId?.name}
            </h2>
            <p className="text-xs text-slate-500">
              Roll No: <span className="font-semibold">{student.rollNumber}</span> •{" "}
              {student.department?.departmentName || "Engineering"}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Official University Record</span>
          </div>
        </div>
      )}

      {/* Fee Records Table */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Session Breakdown</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Academic Session</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map((fee) => {
                const isPaid = fee.status === "paid";
                return (
                  <tr key={fee._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-slate-400" />
                        <span className="font-bold text-slate-900">
                          {fee.session}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold capitalize ${
                          isPaid
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {isPaid ? (
                          <CheckCircle2 size={13} className="text-emerald-600" />
                        ) : (
                          <Clock size={13} className="text-amber-600" />
                        )}
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {isPaid
                        ? "Cleared by Accounts Section"
                        : "Payment processing / Outstanding"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => alert(`Receipt details for session ${fee.session}: Status is ${fee.status}.`)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        <FileText size={13} />
                        <span>Statement</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {!fees.length && (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-slate-400">
                    <ReceiptIndianRupee className="mx-auto mb-2 text-slate-300" size={32} />
                    No fee transactions recorded for this account.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default StudentFees;
