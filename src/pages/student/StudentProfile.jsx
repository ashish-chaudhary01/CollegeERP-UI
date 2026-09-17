import StudentProfileView from "../shared/StudentProfileView";

// The shared view uses the absence of a route parameter to load the signed-in
// student's own profile from /student/profile.
function StudentProfile() {
  return <StudentProfileView />;
}

export default StudentProfile;
