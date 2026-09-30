import {
  ArrowRight,
  BookOpenCheck,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  ReceiptIndianRupee,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

const roles = [
  {
    title: "Administrator",
    description:
      "Manages departments, students, faculty, subjects, attendance, fees and the college timetable from one place.",
    responsibilities: ["College-wide records", "User access and accounts", "Academic operations"],
    icon: Landmark,
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "HOD",
    description:
      "Keeps department-level academics organized with access to students, faculty, subjects and department activities.",
    responsibilities: ["Department performance", "Faculty and student records", "Subjects and attendance"],
    icon: UsersRound,
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "Teacher",
    description:
      "Handles classes, student lists, attendance, timetable and fee-related academic responsibilities.",
    responsibilities: ["Class schedules", "Attendance and student lists", "Academic progress"],
    icon: GraduationCap,
    color: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "Student",
    description:
      "Gets a clear view of subjects, attendance, timetable, fees and personal account information.",
    responsibilities: ["Subjects and timetable", "Attendance record", "Fees and account details"],
    icon: BookOpenCheck,
    color: "bg-cyan-50 text-cyan-700",
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
  const [expandedRole, setExpandedRole] = useState(null);

  return (
    <main className="about-page pb-10">
      <section className="about-hero relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
        <div className="relative max-w-3xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-lg shadow-cyan-950/30">
            <GraduationCap size={29} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
            About CERP
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
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
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
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

        <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
          <ShieldCheck className="text-cyan-700" size={28} />
          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Designed around responsibility
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Every role sees tools relevant to its work. This keeps the system
            easier to understand and helps college information stay in the hands
            of the people responsible for it.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-cyan-800">
            <span>Organized access</span>
            <ArrowRight size={17} />
            <span>Better decisions</span>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
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
          {roles.map(({ title, description, responsibilities, icon: Icon, color }) => (
            <article
              key={title}
              className="about-role-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={`about-role-icon flex h-11 w-11 items-center justify-center rounded-xl ${color}`}
              >
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
              <button
                type="button"
                aria-expanded={expandedRole === title}
                aria-controls={`role-details-${title.toLowerCase()}`}
                onClick={() =>
                  setExpandedRole(expandedRole === title ? null : title)
                }
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700"
              >
                {expandedRole === title ? "Hide details" : "View responsibilities"}
                <ChevronDown
                  size={16}
                  className={`about-chevron transition-transform duration-200 ${expandedRole === title ? "rotate-180" : ""}`}
                />
              </button>
              {expandedRole === title && (
                <ul
                  id={`role-details-${title.toLowerCase()}`}
                  className="about-role-details mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm text-slate-600"
                >
                  {responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-cyan-700" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
            Core modules
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            The important parts of college management, together.
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modules.map(([Icon, title, description]) => (
            <div key={title} className="about-module flex gap-4 rounded-xl bg-slate-50 p-4">
              <div className="about-module-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-700 shadow-sm">
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
