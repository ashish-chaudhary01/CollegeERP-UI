import { CalendarDays, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Header({ setSidebarOpen }) {
  const { user } = useAuth();
  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:justify-end md:gap-6 md:px-7">
      {/* menu icon for mobile */}
      <div className="flex md:hidden gap-3 items-center">
        <span onClick={() => setSidebarOpen(true)}>
          <Menu />
        </span>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          CER<span className="text-cyan-600">P</span>
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <CalendarDays size={16} className="text-cyan-600" />
          {new Date().toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {initials || "U"}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
              {displayName}
            </p>
            <p className="text-xs capitalize text-cyan-600">
              {user?.role || "user"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
