import {
  BookOpen,
  Building2,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  Info,
  LayoutDashboard,
  ReceiptIndianRupee,
  Search,
  SquareText,
  User,
  Users,
} from "lucide-react";

export const sidebarData = {
  student: [
    {
      href: "/student/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { href: "/student/subjects", label: "Subjects", icon: BookOpen },
    { href: "/student/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/student/timetable", label: "Time Table", icon: CalendarDays },
    { href: "/student/result", label: "Result", icon: SquareText },
    {
      href: "/student/Fees",
      label: "Fees",
      icon: ReceiptIndianRupee,
    },
    // later on ---
    // Leave Application
    // Documents
    // Notices
  ],
  teacher: [
    {
      href: "/teacher/search",
      label: "Search",
      icon: Search,
    },
    {
      href: "/teacher/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { href: "/teacher/classes", label: "Classes", icon: BookOpen },
    { href: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/teacher/timetable", label: "Time Table", icon: CalendarDays },
    { href: "/teacher/students", label: "Students", icon: Users },
    {
      href: "/teacher/Fees",
      label: "Fees management",
      icon: ReceiptIndianRupee,
    },
  ],
  hod: [
    {
      href: "/hod/search",
      label: "Search",
      icon: Search,
    },
    {
      href: "/hod/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/hod/students",
      label: "Students",
      icon: Users,
    },
    {
      href: "/hod/teachers",
      label: "faculty",
      icon: GraduationCap,
    },
    {
      href: "/hod/subjects",
      label: "Subjects",
      icon: BookOpen,
    },
    { href: "/hod/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/hod/timetable", label: "Time Table", icon: CalendarDays },
    {
      href: "/hod/Fees",
      label: "Fees management",
      icon: ReceiptIndianRupee,
    },
  ],
  admin: [
    {
      href: "/admin/search",
      label: "Search",
      icon: Search,
    },
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/departments",
      label: "Departments",
      icon: Building2,
    },
    {
      href: "/admin/students",
      label: "Students",
      icon: Users,
    },
    {
      href: "/admin/teachers",
      label: "faculty",
      icon: GraduationCap,
    },
    {
      href: "/hod/subjects",
      label: "Subjects",
      icon: BookOpen,
    },
    { href: "/hod/attendance", label: "Attendance", icon: CalendarCheck },
    { href: "/hod/timetable", label: "Time Table", icon: CalendarDays },
    {
      href: "/admin/Fees",
      label: "Fees management",
      icon: ReceiptIndianRupee,
    },
  ],
};

export const bottomlinksData = {
  student: [
    { href: "/student/profile", label: "Profile", icon: User },
    { href: "/campx/about", label: "About", icon: Info },
  ],
  teacher: [
    { href: "/teacher/profile", label: "Profile", icon: User },
    { href: "/campx/about", label: "About", icon: Info },
  ],
  hod: [
    { href: "/hod/profile", label: "Profile", icon: User },
    { href: "/campx/about", label: "About", icon: Info },
  ],
  admin: [
    { href: "/hod/profile", label: "Profile", icon: User },
    { href: "/campx/about", label: "About", icon: Info },
  ],
};
