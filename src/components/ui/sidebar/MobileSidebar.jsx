import { NavLink, useNavigate } from "react-router";
import { bottomlinksData, sidebarData } from "./sidebarData";
import { LogOut, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function MobileSidebar({ sidebarOpen, setSidebarOpen, role }) {
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
      logout();
      setSidebarOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-50 flex h-full w-72 md:hidden flex-col bg-white border-r border-slate-200 shadow-2xl transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* logo & close button */}
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          CER<span className="text-cyan-600">P</span>
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
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
                <NavLink
                  to={item.href}
                  key={idx}
                  onClick={() => setSidebarOpen(false)}
                >
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
              <NavLink
                to={item.href}
                key={idx}
                onClick={() => setSidebarOpen(false)}
              >
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
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-600 hover:text-white transition-colors duration-200"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default MobileSidebar;
