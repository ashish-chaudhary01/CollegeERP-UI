import { NavLink } from "react-router";
import { bottomlinksData, campusData, sidebarData } from "./sidebarData";

function Sidebar({ role }) {
  // sidebar menu based on role
  const sidebarMenu = sidebarData[role];
  // campus links
  const campusMenu = campusData;
  // bottom links based on role
  const bottomlinks = bottomlinksData[role];

  return (
    <aside className="w-67 hidden md:flex fixed top-0 bottom-0 left-0 z-10 min-h-screen flex-col bg-white border-r border-black/10">
      {/* logo */}
      <div className="flex items-center p-4 ">
        <h2 className="font-bold text-2xl">
          Camp
          <span className="text-secondary">X</span>
        </h2>
      </div>

      {/* navlinks */}
      <nav className="overflow-y-auto p-4 space-y-6">
        {/* menu */}
        <div className="border-b border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase mb-4">menu</p>
          {sidebarMenu.map((item, idx) => (
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

        {/* campus */}
        <div className="border-b border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase mb-4">
            campus
          </p>
          {campusMenu.map((item, idx) => (
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
    </aside>
  );
}

export default Sidebar;
