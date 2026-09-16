import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck2,
  CheckCircle2,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  ReceiptIndianRupee,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const roles = [
  {
    title: "Administrator",
    description:
      "Manages departments, students, faculty, subjects, attendance, fees and the college timetable from one place.",
    icon: Landmark,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "HOD",
    description:
      "Keeps department-level academics organized with access to students, faculty, subjects and department activities.",
    icon: UsersRound,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Teacher",
    description:
      "Handles classes, student lists, attendance, timetable and fee-related academic responsibilities.",
    icon: GraduationCap,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Student",
    description:
      "Gets a clear view of subjects, attendance, timetable, fees and personal account information.",
    icon: BookOpenCheck,
    color: "bg-rose-100 text-rose-600",
  },
];

const modules = [
  [
    LayoutDashboard,
    "Role-based dashboards",
    "A focused home screen for every user type.",
  ],
  [
    UsersRound,
    "People management",
    "Organize students, teachers and departments.",
  ],
  [
    CalendarCheck2,
    "Attendance and timetable",
    "Keep daily academic activity visible and structured.",
  ],
  [
    ReceiptIndianRupee,
    "Fee management",
    "Track fee information with less paperwork.",
  ],
];

function About() {
  return (
    <main className="pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-950/40">
            <GraduationCap size={29} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
            About CERP
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            One connected system for a better college experience.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            CERP, or College ERP, is a role-based college management platform
            built to bring everyday academic and administrative work into one
            simple, organized space.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              Built for college operations
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">
              Clear access by role
            </span>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Why this platform exists
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Less scattered work, more time for education.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            College teams often manage information across registers, messages
            and separate spreadsheets. CERP gives the college a shared digital
            workspace where the right people can view and manage the right
            information without unnecessary confusion.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Centralized college information",
              "Separate experiences for each role",
              "Quick access to daily academic data",
              "A cleaner, paper-light workflow",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-sm font-medium text-slate-700"
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-emerald-500"
                  size={18}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-indigo-50 p-6 sm:p-8">
          <ShieldCheck className="text-indigo-600" size={28} />
          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Designed around responsibility
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Every role sees tools relevant to its work. This keeps the system
            easier to understand and helps college information stay in the hands
            of the people responsible for it.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-indigo-700">
            <span>Organized access</span>
            <ArrowRight size={17} />
            <span>Better decisions</span>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Who uses CERP
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              A different view for every responsibility.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            The platform connects the complete college community while keeping
            each workflow focused.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roles.map(({ title, description, icon: Icon, color }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
              >
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Core modules
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            The important parts of college management, together.
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modules.map(([Icon, title, description]) => (
            <div key={title} className="flex gap-4 rounded-xl bg-slate-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        CERP is built to make college administration more connected, visible and
        efficient.
      </footer>
    </main>
  );
}

export default About;
