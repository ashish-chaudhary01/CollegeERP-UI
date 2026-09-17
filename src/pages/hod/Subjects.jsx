import { BookOpen, Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const emptyForm = { subjectName: "", subjectCode: "", year: "", semester: "" };

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/hod/subjects`, { credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load subjects");
      setSubjects(data.subjects || []);
    } catch (err) {
      setError(err.message || "Unable to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/hod/subjects`, { credentials: "include" })
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => {
        if (!active) return;
        if (!response.ok) throw new Error(data.message || "Unable to load subjects");
        setSubjects(data.subjects || []);
        setError("");
      })
      .catch((err) => active && setError(err.message || "Unable to load subjects"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [API_URL]);

  const filteredSubjects = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return subjects;
    return subjects.filter((subject) =>
      [subject.subjectName, subject.subjectCode, subject.year, subject.semester]
        .some((value) => String(value || "").toLowerCase().includes(term)),
    );
  }, [search, subjects]);

  const addSubject = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError("");
      const response = await fetch(`${API_URL}/hod/subject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, year: Number(form.year), semester: Number(form.semester) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to add subject");
      setForm(emptyForm);
      setShowAdd(false);
      await loadSubjects();
    } catch (err) {
      setError(err.message || "Unable to add subject");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">Department academics</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Subjects</h1>
          <p className="mt-1 text-sm text-slate-500">Manage subjects offered by your department.</p>
        </div>
        <button onClick={() => { setShowAdd(true); setError(""); }} className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700">
          <Plus size={17} /> Add subject
        </button>
      </div>

      <div className="mt-6 max-w-xl">
        <label className="relative block"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by subject name, code, year or semester" className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" /></label>
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-rose-600">{error}</p>}
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4 font-semibold">Subject</th><th className="px-5 py-4 font-semibold">Code</th><th className="px-5 py-4 font-semibold">Department</th><th className="px-5 py-4 font-semibold">Year</th><th className="px-5 py-4 font-semibold">Semester</th><th className="px-5 py-4 font-semibold">Assigned faculty</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? <tr><td colSpan="6" className="px-5 py-10 text-center text-slate-500">Loading department subjects...</td></tr> : filteredSubjects.length === 0 ? <tr><td colSpan="6" className="px-5 py-12 text-center text-slate-500"><BookOpen className="mx-auto mb-2 text-slate-300" size={26} />No subjects found in your department.</td></tr> : filteredSubjects.map((subject) => <tr key={subject._id} className="transition hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-slate-900">{subject.subjectName}</td><td className="px-5 py-4 font-medium text-cyan-700">{subject.subjectCode}</td><td className="px-5 py-4 text-slate-600"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium">{subject.department}</span></td><td className="px-5 py-4 text-slate-600">{subject.year}</td><td className="px-5 py-4 text-slate-600">{subject.semester}</td><td className="px-5 py-4 text-slate-600">{subject.teacherName}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={(event) => event.target === event.currentTarget && setShowAdd(false)}><form onSubmit={addSubject} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold">Add department subject</h2><p className="mt-1 text-sm text-slate-500">This subject is automatically linked to your department.</p></div><button type="button" onClick={() => setShowAdd(false)} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"><X size={20} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700 sm:col-span-2">Subject name<input required value={form.subjectName} onChange={(event) => setForm({ ...form, subjectName: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 p-3 font-normal outline-none focus:border-cyan-500" /></label><label className="text-sm font-semibold text-slate-700">Subject code<input required value={form.subjectCode} onChange={(event) => setForm({ ...form, subjectCode: event.target.value.toUpperCase() })} className="mt-1 w-full rounded-lg border border-slate-200 p-3 font-normal outline-none focus:border-cyan-500" /></label><label className="text-sm font-semibold text-slate-700">Year<input required min="1" type="number" value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 p-3 font-normal outline-none focus:border-cyan-500" /></label><label className="text-sm font-semibold text-slate-700 sm:col-span-2">Semester<select required value={form.semester} onChange={(event) => setForm({ ...form, semester: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-3 font-normal outline-none focus:border-cyan-500"><option value="">Select semester</option>{[1, 2, 3, 4, 5, 6, 7, 8].map((number) => <option key={number} value={number}>Semester {number}</option>)}</select></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setShowAdd(false)} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button disabled={saving} className="rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Adding..." : "Add subject"}</button></div></form></div>}
    </section>
  );
}

export default Subject;
