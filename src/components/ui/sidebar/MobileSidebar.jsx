import { NavLink, useNavigate } from "react-router";
import { bottomlinksData, sidebarData } from "./sidebarData";
import { LogOut, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function MobileSidebar({ sidebarOpen, setSidebarOpen, role }) {
  // sidebar menu based on role
  const sidebarMenu = sidebarData[role];
  // bottom links based on role
  const bottomlinks = bottomlinksData[role];

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
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-67"} w-67 flex md:hidden fixed top-0 bottom-0 left-0 z-10 min-h-screen flex-col bg-white border-r border-black/10 duration-200`}
    >
      {/* logo */}
      <div className="flex items-center p-4 justify-between">
        <h2 className="font-bold text-2xl">
          Camp
          <span className="text-secondary">X</span>
        </h2>
        <span onClick={() => setSidebarOpen(false)}>
          <X />
        </span>
      </div>

      {/* navlinks */}
      <nav className="overflow-y-auto p-4 space-y-6">
        {sidebarMenu.map((g, gidx) => (
          <div key={gidx}>
            <p className="text-xs font-bold text-gray-400 uppercase mb-4">
              {g.section}
            </p>

            {g.items.map((item, idx) => (
              <NavLink to={item.href} key={idx}>
                {({ isActive }) => (
                  <div
                    className={`flex items-center gap-3 px-4 py-2 mb-2 text-sm rounded-lg ${isActive ? "bg-secondary text-white font-bold" : "font-semibold hover:bg-gray-200"}`}
                  >
                    <span>{<item.icon />}</span>
                    <span>{item.label}</span>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        ))}

        {/* bottom links */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase mb-4">
            user & settings
          </p>
          {bottomlinks.map((item, idx) => (
            <NavLink to={item.href} key={idx}>
              {({ isActive }) => (
                <div
                  className={`flex items-center gap-4 px-4 py-2 mb-2 text-sm rounded-lg ${isActive ? "bg-secondary text-white font-bold" : "font-semibold hover:bg-gray-200"}`}
                >
                  <span>{<item.icon />}</span>
                  <span>{item.label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      {/* logout button */}
      <div className="p-1 border-t border-black/10">
        <button
          onClick={handleLogout}
          className="w-full pl-8 py-3 text-red-400 flex items-center gap-2 rounded hover:bg-red-500 duration-200 hover:text-white"
        >
          <LogOut />
          <span>logout</span>
        </button>
      </div>
    </aside>
  );
}

export default MobileSidebar;
