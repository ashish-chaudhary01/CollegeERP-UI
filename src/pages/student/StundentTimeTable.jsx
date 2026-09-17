import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
const StundentTimeTable = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => { fetch(`${import.meta.env.VITE_API_URL}/student/timetable`, { credentials: "include" }).then((r) => r.json()).then((data) => setRows(data.timetable || [])); }, []);
  return <section><p className="text-sm font-semibold uppercase tracking-[.18em] text-cyan-600">My academics</p><h1 className="mt-1 text-3xl font-bold">Time table</h1><div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-150 text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Day</th><th className="p-4">Time</th><th className="p-4">Subject</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row._id}><td className="p-4 font-semibold capitalize">{row.day}</td><td className="p-4">{row.startTime} – {row.endTime}</td><td className="p-4"><b>{row.subject?.subjectCode}</b> <span className="text-slate-500">{row.subject?.subjectName}</span></td></tr>)}{!rows.length && <tr><td colSpan="3" className="p-12 text-center text-slate-400"><CalendarDays className="mx-auto mb-2"/>No classes scheduled.</td></tr>}</tbody></table></div></section>;
};

export default StundentTimeTable;
