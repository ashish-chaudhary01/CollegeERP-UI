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
