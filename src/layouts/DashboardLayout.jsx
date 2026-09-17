import { Outlet } from "react-router";
import Header from "../components/ui/Header";
import { useState } from "react";
import Sidebar from "../components/ui/sidebar/Sidebar";
import MobileSidebar from "../components/ui/sidebar/MobileSidebar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useAuth();
  // sidebar open or close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* desktop sidebar */}
      <Sidebar role={user.role} />

      {/* mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* mobile sidebar (z-50) */}
      <MobileSidebar
        role={user.role}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* content wrapper */}
      <div className="md:pl-67 min-h-screen flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
