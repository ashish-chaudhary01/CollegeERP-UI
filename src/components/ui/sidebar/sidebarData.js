import {
  BookOpen,
  Building2,
  ClipboardMinus,
  CodeXml,
  FileSearchCorner,
  FlaskConical,
  FolderArchive,
  GraduationCap,
  Info,
  LayersArrowUp,
  LayoutDashboard,
  MapPinPlusInside,
  Settings,
  Store,
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
    { href: "/student/labs", label: "Labs", icon: FlaskConical },
    { href: "/student/workshops", label: "Workshops", icon: Store },
  ],
  teacher: [
    {
      href: "/teacher/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { href: "/teacher/subjects", label: "Subjects", icon: BookOpen },
    { href: "/teacher/labs", label: "Labs", icon: FlaskConical },
    { href: "/teacher/workshops", label: "Workshops", icon: Store },
  ],
  hod: [
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
      label: "Teachers",
      icon: GraduationCap,
    },
    {
      href: "/hod/subjects",
      label: "Subjects",
      icon: BookOpen,
    },
    {
      href: "/hod/labs",
      label: "Labs",
      icon: Building2,
    },
    {
      href: "/hod/archives",
      label: "Archives",
      icon: FolderArchive,
    },
    {
      href: "/hod/promotion",
      label: "Promotion",
      icon: LayersArrowUp,
    },
  ],
};

export const campusData = [
  { href: "/campus/map", label: "Campus Map", icon: MapPinPlusInside },
  {
    href: "/campus/lostandfound",
    label: "Lost & Found",
    icon: FileSearchCorner,
  },
  { href: "/campus/report", label: "Report", icon: ClipboardMinus },
];

export const bottomlinksData = {
  student: [
    { href: "/student/profile", label: "Profile", icon: User },
    { href: "/campx/settings", label: "Settings", icon: Settings },
    { href: "/campx/developers", label: "Developers", icon: CodeXml },
    { href: "/campx/about", label: "About", icon: Info },
  ],
  teacher: [
    { href: "/teacher/profile", label: "Profile", icon: User },
    { href: "/campx/developers", label: "Developers", icon: CodeXml },
    { href: "/campx/settings", label: "Settings", icon: Settings },
    { href: "/campx/about", label: "About", icon: Info },
  ],
  hod: [
    { href: "/hod/profile", label: "Profile", icon: User },
    { href: "/campx/developers", label: "Developers", icon: CodeXml },
    { href: "/campx/settings", label: "Settings", icon: Settings },
    { href: "/campx/about", label: "About", icon: Info },
  ],
};
