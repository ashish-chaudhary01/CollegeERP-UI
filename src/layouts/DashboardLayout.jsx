import { Outlet } from "react-router";

import Header from "../components/ui/Header";
import { useState } from "react";
import Sidebar from "../components/ui/sidebar/Sidebar";
import MobileSidebar from "../components/ui/sidebar/MobileSidebar";

const DashboardLayout = () => {
  // sidebar open or close state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // role based sidebar
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen">
      {/* desktop siderbar */}
      <Sidebar role={role} />
      {/* mobile sidebar */}
      <MobileSidebar
        role={role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* content */}
      <div className="md:pl-67 min-h-[200vh]">
        <Header setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed md:hidden min-h-screen inset-0 z-5 bg-black/30"
          />
        )}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
