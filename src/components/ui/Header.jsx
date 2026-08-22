import { Menu } from "lucide-react";

function Header({ setSidebarOpen }) {
  return (
    <header className="bg-white p-4 flex justify-between md:justify-end items-center shadow">
      {/* menu icon for mobile */}
      <div className="flex md:hidden gap-3 items-center">
        <span onClick={() => setSidebarOpen(true)}>
          <Menu />
        </span>
        <h2 className="text-2xl font-bold">
          CAMP<span className="text-secondary">X</span>
        </h2>
      </div>
      {/* profile conatiner */}
      <div className="rounded-full h-10 w-10 bg-gray-400"></div>
    </header>
  );
}

export default Header;
