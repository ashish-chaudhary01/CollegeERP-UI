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
      section: "MAIN",
      items: [
        {
          href: "/student/dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      section: "ACADEMICS",
      items: [
        { href: "/student/subjects", label: "Subjects", icon: BookOpen },
        {
          href: "/student/attendance",
          label: "Attendance",
          icon: CalendarCheck,
        },
        { href: "/student/timetable", label: "Time Table", icon: CalendarDays },
      ],
    },
    {
      section: "FEE & RESULT",
      items: [
        { href: "/student/result", label: "Result", icon: SquareText },
        {
          href: "/student/Fees",
          label: "Fees",
          icon: ReceiptIndianRupee,
        },
      ],
    },
  ],
  teacher: [
    {
      section: "MAIN",
      items: [
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
      ],
    },
    {
      section: "ACADEMICS",
      items: [
        { href: "/teacher/classes", label: "Classes", icon: BookOpen },
        {
          href: "/teacher/attendance",
          label: "Attendance",
          icon: CalendarCheck,
        },
        { href: "/teacher/timetable", label: "Time Table", icon: CalendarDays },
        { href: "/teacher/students", label: "Students", icon: Users },
        {
          href: "/teacher/Fees",
          label: "Fees management",
          icon: ReceiptIndianRupee,
        },
      ],
    },
  ],
  hod: [
    {
      section: "MAIN",
      items: [
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
      ],
    },
    {
      section: "ACADEMICS",
      items: [
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
        {
          href: "/hod/timetable",
          label: "College Timetable",
          icon: CalendarDays,
        },
        {
          href: "/hod/Fees",
          label: "Fees management",
          icon: ReceiptIndianRupee,
        },
      ],
    },
  ],
  admin: [
    {
      section: "MAIN",
      items: [
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
      ],
    },
    {
      section: "ACADEMICS",
      items: [
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
          href: "/admin/subjects",
          label: "Subjects",
          icon: BookOpen,
        },
        { href: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
        {
          href: "/admin/timetable",
          label: "College Timetable",
          icon: CalendarDays,
        },
        {
          href: "/admin/Fees",
          label: "Fees management",
          icon: ReceiptIndianRupee,
        },
      ],
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
    { href: "/admin/profile", label: "Profile", icon: User },
    { href: "/campx/about", label: "About", icon: Info },
  ],
};
