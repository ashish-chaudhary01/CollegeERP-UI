export const Skeleton = ({ className = "" }) => (
  <span
    className={`block animate-pulse rounded-lg bg-slate-200/80 ${className}`}
  />
);

export const DashboardSkeleton = () => (
  <section className="space-y-5" aria-label="Loading dashboard">
    <div className="space-y-3">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-9 w-72" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="mt-5 h-3 w-28" />
          <Skeleton className="mt-2 h-7 w-16" />
        </div>
      ))}
    </div>
    <div className="grid gap-5 lg:grid-cols-2">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-slate-200 bg-white p-5"
        >
          <Skeleton className="h-5 w-40" />
          <div className="mt-5 space-y-3">
            {[1, 2, 3].map((row) => (
              <Skeleton key={row} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const ProfileSkeleton = () => (
  <section className="space-y-5" aria-label="Loading profile">
    <div className="space-y-3">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
    <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
      <div className="rounded-2xl bg-slate-900 p-5">
        <Skeleton className="mx-auto h-44 w-44 rounded-2xl bg-slate-700" />
        <Skeleton className="mt-5 h-6 w-36 bg-slate-700" />
        <Skeleton className="mt-2 h-4 w-44 bg-slate-700" />
      </div>
      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <Skeleton className="h-6 w-48" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} className="h-12 w-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>
    </div>
  </section>
);

export const TableSkeleton = ({ columns = 5, rows = 6 }) => (
  <div
    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
    aria-label="Loading table"
  >
    <div className="flex gap-4 bg-slate-50 p-4">
      {Array.from({ length: columns }, (_, index) => (
        <Skeleton key={index} className="h-3 flex-1" />
      ))}
    </div>
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="flex gap-4 p-5">
          {Array.from({ length: columns }, (_, index) => (
            <Skeleton key={index} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const DepartmentSkeleton = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Heading */}
      <Skeleton className="h-8 w-40" />

      {/* Search bar */}
      <div className="flex sm:flex-row flex-col sm:items-center mt-4 gap-2 max-w-3xl">
        <Skeleton className="h-11 flex-1" />
        <Skeleton className="h-11 w-full sm:w-12" />
      </div>

      {/* Department grid */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-stretch py-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <article
            key={idx}
            className="p-6 border border-slate-200 w-full h-full rounded-lg bg-white shadow-sm"
          >
            {/* Department details */}
            <div className="flex gap-4 items-center">
              <Skeleton className="h-[54px] w-[54px] shrink-0 rounded-xl" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-12" />
                </div>

                <Skeleton className="h-3 w-36 mt-3" />

                {/* Action buttons */}
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>

            {/* Department counts */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-6 w-10" />
                  <Skeleton className="h-3 w-14" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const StudentCardSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Profile image */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* Details */}
      <div className="flex-1 px-2 pb-2">
        <Skeleton className="mt-3 h-6 w-3/4" />
        <Skeleton className="mt-2 h-3 w-full" />

        {/* Year, semester, status */}
        <div className="mt-3 flex flex-wrap gap-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Other details */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex">
        <Skeleton className="h-12 flex-1 rounded-none" />
        <Skeleton className="h-12 w-12 rounded-none" />
      </div>
    </div>
  );
};

export const StudentsSkeleton = ({ gridView = true }) => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Heading */}
      <Skeleton className="h-4 w-36" />
      <Skeleton className="mt-2 h-10 w-44 sm:w-52" />
      <Skeleton className="mt-2 h-4 w-64 max-w-full" />

      {/* Search bar */}
      <div className="mt-5 flex max-w-4xl flex-col gap-3 sm:flex-row">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl sm:w-12 lg:w-36" />
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx}>
            <Skeleton className="mb-2 h-3 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Count and view toggle */}
      <div className="mt-2 flex items-center justify-between px-4">
        <Skeleton className="h-4 w-32" />

        <div className="flex gap-2 rounded-xl bg-white p-1 shadow">
          <Skeleton className="h-9 w-12 rounded-lg" />
          <Skeleton className="h-9 w-12 rounded-lg" />
        </div>
      </div>

      {/* Grid View */}
      {gridView ? (
        <div className="mt-3 grid grid-cols-1 items-stretch gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, idx) => (
            <StudentCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Student", "Roll number", "Year", "Semester", "Status"].map(
                    (heading) => (
                      <th key={heading} className="px-5 py-4">
                        <Skeleton className="h-3 w-20" />
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="mt-2 h-3 w-44" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-8" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-4 w-8" />
                    </td>
                    <td className="px-5 py-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export const SubjectsSkeleton = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Heading */}
      <Skeleton className="h-4 w-36" />
      <Skeleton className="mt-2 h-10 w-44 sm:w-52" />
      <Skeleton className="mt-2 h-4 w-64 max-w-full" />

      {/* Search bar */}
      <div className="mt-5 flex max-w-4xl flex-col gap-3 sm:flex-row">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl sm:w-40" />
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Subject Code",
                  "Subject Name",
                  "Department",
                  "Year",
                  "Semester",
                  "Teacher",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className="px-6 py-4">
                    <Skeleton className="h-3 w-20" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx}>
                  {/* Subject Code */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>

                  {/* Subject Name */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-36" />
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Year */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* Semester */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-8" />
                  </td>

                  {/* Teacher */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-28 rounded-full" />
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-10" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const MyClassesSkeleton = () => {
  return (
    <section className="space-y-5">
      {/* Heading */}
      <div>
        <Skeleton className="h-4 w-36" />
        <Skeleton className="mt-2 h-9 w-40" />
        <Skeleton className="mt-2 h-4 w-64 max-w-full" />
      </div>

      {/* Subject cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            {/* Book icon */}
            <Skeleton className="h-[22px] w-[22px] rounded-md" />

            {/* Subject name */}
            <Skeleton className="mt-4 h-5 w-3/4" />

            {/* Subject details */}
            <Skeleton className="mt-2 h-4 w-full max-w-64" />

            {/* Department */}
            <Skeleton className="mt-4 h-3 w-20" />
          </article>
        ))}
      </div>
    </section>
  );
};

export const MyTimetableSkeleton = () => {
  return (
    <section className="space-y-5">
      {/* Heading */}
      <div>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-9 w-48" />
        <Skeleton className="mt-2 h-4 w-72 max-w-full" />
      </div>

      {/* Day cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            {/* Day heading */}
            <div className="mb-3 flex items-center gap-2">
              <Skeleton className="h-[18px] w-[18px] rounded-md" />
              <Skeleton className="h-5 w-24" />
            </div>

            {/* Class entries */}
            <div className="space-y-2">
              {Array.from({ length: idx % 3 === 0 ? 3 : 2 }).map(
                (_, classIdx) => (
                  <div key={classIdx} className="rounded-lg bg-slate-50 p-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="mt-2 h-4 w-28" />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const StudentFeesSkeleton = () => {
  return (
    <section className="space-y-5">
      {/* Heading and session filter */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-9 w-44" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
        </div>

        <Skeleton className="h-10 w-full rounded-lg sm:w-56" />
      </div>

      {/* Fees table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-170 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Student", "Roll number", "Session", "Status"].map(
                (heading) => (
                  <th key={heading} className="px-5 py-4">
                    <Skeleton className="h-3 w-20" />
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: 8 }).map((_, idx) => (
              <tr key={idx}>
                {/* Student */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-32" />
                </td>

                {/* Roll number */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>

                {/* Session */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const TakeAttendanceSkeleton = () => {
  return (
    <section className="mx-auto max-w-4xl space-y-5">
      {/* Heading */}
      <div>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-9 w-52" />
        <Skeleton className="mt-2 h-4 w-full max-w-xl" />
        <Skeleton className="mt-1 h-4 w-3/4 max-w-md" />
      </div>

      {/* Subject and Date filters */}
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
        <div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="h-4 w-10" />
          <Skeleton className="mt-2 h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Students list */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>

        {/* Student rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Student details */}
              <div>
                <Skeleton className="h-4 w-36" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>

              {/* Attendance status buttons */}
              <div className="flex gap-2">
                <Skeleton className="h-9 w-20 rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HodTimetableSkeleton = () => {
  return (
    <section className="space-y-5">
      {/* Heading and semester filter */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-9 w-60" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
        </div>

        <Skeleton className="h-10 w-full rounded-lg sm:w-44" />
      </div>

      {/* Timetable table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-165 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Day", "Time", "Subject", "Year / Sem"].map((heading) => (
                <th key={heading} className="px-5 py-4">
                  <Skeleton className="h-3 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {Array.from({ length: 8 }).map((_, idx) => (
              <tr key={idx}>
                {/* Day */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Time */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-28" />
                </td>

                {/* Subject */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-3 w-40" />
                </td>

                {/* Year / Semester */}
                <td className="px-5 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
