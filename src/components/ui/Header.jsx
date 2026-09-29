import { CalendarDays, Menu, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router";
import { pageNames } from "./sidebar/pageName";

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

  const location = useLocation();

  const currentPage = pageNames[location.pathname] || "CERP";

  return (
    <header className="fixed top-0 left-0 md:left-66 right-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow  md:gap-6 md:px-7">
      {/* menu icon for mobile */}
      <div className="flex md:hidden gap-3 items-center">
        <span onClick={() => setSidebarOpen(true)}>
          <Menu />
        </span>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          CER<span className="text-cyan-600">P</span>
        </h2>
      </div>
      {/* path name */}
      {/* <div className="hidden md:flex w-full max-w-lg">
        <span className="font-bold text-xl text-black"> {currentPage} </span>
      </div> */}
      {/* Global Search */}
      <div className="relative w-full max-w-lg hidden md:block">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search students, teachers, subjects..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-50"
        />
      </div>
      {/* date and logo */}
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 text-sm text-slate-500 lg:flex">
          <CalendarDays size={16} className="text-cyan-600" />
          {new Date().toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
        <Link
          to={`/${user.role}/profile`}
          className="flex items-center gap-3 border-l border-slate-200 pl-4 cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
            {initials || "U"}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="max-w-32 truncate text-sm font-semibold text-slate-900 capitalize">
              {displayName}
            </p>
            <p className="text-xs capitalize text-cyan-600">
              {user?.role || "user"}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
