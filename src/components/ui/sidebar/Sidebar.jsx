import { NavLink, useNavigate } from "react-router";
import { bottomlinksData, sidebarData } from "./sidebarData";
import { LogOut } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function Sidebar({ role }) {
  // sidebar menu based on role
  const sidebarMenu = sidebarData[role] || [];
  // bottom links based on role
  const bottomlinks = bottomlinksData[role] || [];
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      // clearing user from local storage
      logout();
      // navigating to the login page(Home Page)
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <aside className="fixed top-0 bottom-0 left-0 z-20 hidden md:flex h-full w-67 flex-col bg-white border-r border-slate-200">
      {/* logo */}
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          CER<span className="text-cyan-600">P</span>
        </h2>
      </div>

      {/* navlinks */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {sidebarMenu.map((g, gidx) => (
          <div key={gidx}>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {g.section}
            </p>

            <div className="space-y-1">
              {g.items.map((item, idx) => (
                <NavLink to={item.href} key={idx}>
                  {({ isActive }) => (
                    <div
                      className={`flex items-center gap-3 px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                        isActive
                          ? "bg-slate-900 text-white font-bold shadow-sm"
                          : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {/* bottom links */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            User & Settings
          </p>
          <div className="space-y-1">
            {bottomlinks.map((item, idx) => (
              <NavLink to={item.href} key={idx}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-3 px-3.5 py-2.5 text-sm rounded-xl transition-colors ${
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-sm"
                        : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* logout button */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-600 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
