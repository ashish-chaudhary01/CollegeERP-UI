import { Navigate, Route, Routes } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentLabs from "./pages/student/StudentLabs";
import StudentNotes from "./pages/student/StudentNotes";
import StudentWorkshop from "./pages/student/StudentWorkshop";
import StudentSubject from "./pages/student/StudentSubject";
import StudentProfile from "./pages/student/StudentProfile";
import HodDashboard from "./pages/hod/HodDashboard";
import Subject from "./pages/hod/Subjects";
import Labs from "./pages/hod/Labs";
import Workshop from "./pages/hod/Workshop";
import HodProfile from "./pages/hod/HodProfile";
import Teacher from "./pages/hod/Teacher";
import Student from "./pages/hod/Student";
import Archives from "./pages/hod/Archives";
import Promotion from "./pages/hod/Promotion";
import Mappage from "./pages/campus/Mappage";
import Lostfoundpage from "./pages/campus/Lostfoundpage";
import Reportpage from "./pages/campus/Reportpage";
import Settingpage from "./pages/AppInfo/Settingpage";
import About from "./pages/AppInfo/About";
import Developers from "./pages/AppInfo/Developers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
      {/* student dashboard layout and route */}
      <Route path="student" element={<DashboardLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="subjects" element={<StudentSubject />} />
        <Route path="subjects/notes" element={<StudentNotes />} />
        <Route path="labs" element={<StudentLabs />} />
        <Route path="workshops" element={<StudentWorkshop />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* teacher route */}
      <Route path="teacher" element={<DashboardLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="subjects" element={<StudentSubject />} />
        <Route path="subjects/notes" element={<StudentNotes />} />
        <Route path="labs" element={<StudentLabs />} />
        <Route path="workshops" element={<StudentWorkshop />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* hod route */}
      <Route path="hod" element={<DashboardLayout />}>
        <Route path="dashboard" element={<HodDashboard />} />
        <Route path="teachers" element={<Teacher />} />
        <Route path="students" element={<Student />} />
        <Route path="subjects" element={<Subject />} />
        <Route path="subjects/notes" element={<StudentNotes />} />
        <Route path="labs" element={<Labs />} />
        <Route path="workshops" element={<Workshop />} />
        <Route path="archives" element={<Archives />} />
        <Route path="promotion" element={<Promotion />} />
        <Route path="profile" element={<HodProfile />} />
      </Route>

      {/* campus links*/}
      <Route path="campus" element={<DashboardLayout />}>
        <Route path="map" element={<Mappage />} />
        <Route path="lostandfound" element={<Lostfoundpage />} />
        <Route path="report" element={<Reportpage />} />
      </Route>

      {/* bottom links */}
      <Route path="campx" element={<DashboardLayout />}>
        <Route path="settings" element={<Settingpage />} />
        <Route path="about" element={<About />} />
        <Route path="developers" element={<Developers />} />
      </Route>
    </Routes>
  );
}

export default App;
