import { Route, Routes, useNavigate } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSubject from "./pages/student/StudentSubject";
import StudentProfile from "./pages/student/StudentProfile";
import HodDashboard from "./pages/hod/HodDashboard";
import Subject from "./pages/hod/Subjects";
import HodProfile from "./pages/hod/HodProfile";
import Teacher from "./pages/hod/Teacher";
import Student from "./pages/hod/Student";
import About from "./pages/AppInfo/About";
import StudentAttendance from "./pages/student/studentAttendance";
import StundentTimeTable from "./pages/student/StundentTimeTable";
import StudentResult from "./pages/student/StudentResult";
import StudentFees from "./pages/student/StudentFees";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";
import StudentList from "./pages/teacher/StudentList";
import TeacherTimeTable from "./pages/teacher/TeacherTimeTable";
import Fees from "./pages/teacher/Fees";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import LoginPage from "./pages/auth/login";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
// {<Navigate to="/student/dashboard" replace />}
function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      //   role based redirect
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
      if (user.role === "hod") {
        navigate("/hod/dashboard");
      }
      if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      }
      if (user.role === "student") {
        navigate("/student/dashboard");
      }
    } else {
      navigate("/");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* student dashboard layout and route */}
      <Route path="student" element={<DashboardLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="subjects" element={<StudentSubject />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="timetable" element={<StundentTimeTable />} />
        <Route path="result" element={<StudentResult />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* teacher route */}
      <Route path="teacher" element={<DashboardLayout />}>
        <Route path="search" element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="students" element={<StudentList />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="timetable" element={<TeacherTimeTable />} />
        <Route path="fees" element={<Fees />} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* hod route */}
      <Route path="hod" element={<DashboardLayout />}>
        <Route path="search" element={<StudentDashboard />} />
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="teachers" element={<Teacher />} />
        <Route path="students" element={<Student />} />
        <Route path="subjects" element={<Subject />} />
        <Route path="attendance" element={<StudentSubject />} />
        <Route path="timetable" element={<StudentSubject />} />
        <Route path="fees" element={<StudentSubject />} />
        <Route path="profile" element={<HodProfile />} />
      </Route>

      {/* admin route */}
      <Route path="admin" element={<DashboardLayout />}>
        <Route path="search" element={<StudentDashboard />} />
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="departments" element={<StudentDashboard />} />
        <Route path="students" element={<Student />} />
        <Route path="teachers" element={<Teacher />} />
        <Route path="subjects" element={<Subject />} />
        <Route path="attendance" element={<StudentSubject />} />
        <Route path="timetable" element={<StudentSubject />} />
        <Route path="fees" element={<StudentSubject />} />
        <Route path="profile" element={<HodProfile />} />
      </Route>

      {/* bottom links */}
      <Route path="campxErp" element={<DashboardLayout />}>
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
