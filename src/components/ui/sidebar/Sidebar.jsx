import { NavLink } from "react-router";
import { bottomlinksData, sidebarData } from "./sidebarData";
import { GraduationCap } from "lucide-react";

function Sidebar({ role }) {
  // sidebar menu based on role
  const sidebarMenu = sidebarData[role];
  // bottom links based on role
  const bottomlinks = bottomlinksData[role];

  return (
    <aside className="w-67 hidden md:flex fixed top-0 bottom-0 left-0 z-10 min-h-screen flex-col bg-white border-r border-black/10">
      {/* logo */}
      <div className="flex items-center p-4 gap-4">
        <div className="bg-linear-to-br from-indigo-600 to-violet-500 rounded-xl p-2 text-white">
          <GraduationCap size={27} />{" "}
        </div>
        <div className="font-bold text-2xl flex flex-col">
          <span className="text-violet-600">CERP</span>
          <span className="text-gray-500 text-xs">College ERP System</span>
        </div>
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
          <p className="text-xs font-bold text-gray-400 uppercase mb-4">
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
    </aside>
  );
}

export default Sidebar;
