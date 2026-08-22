import {
  Book,
  ClipboardMinus,
  FileSearchCorner,
  FlaskConical,
  MapPinPlusInside,
  NotepadText,
} from "lucide-react";
import { Link } from "react-router";

function Herosection({ name }) {
  const overviewFields = [
    {
      label: "Subject",
      value: "6",
      description: "This Semester",
      icon: <Book />,
      bgcolor: "bg-blue-500/30",
      color: "text-blue-500/60",
    },
    {
      label: "Notes",
      value: "12",
      description: "This Semester",
      icon: <NotepadText />,
      bgcolor: "bg-green-500/30",
      color: "text-green-500/60",
    },
    {
      label: "Labs",
      value: "2",
      description: "This Semester",
      icon: <FlaskConical />,
      bgcolor: "bg-yellow-500/30",
      color: "text-yellow-500/60",
    },
    {
      label: "Report",
      value: "2",
      description: "This Semester",
      icon: <ClipboardMinus />,
      bgcolor: "bg-red-500/30",
      color: "text-red-500/60",
    },
  ];

  const quickAccess = [
    {
      label: "My Subjects",
      icon: <Book size={30} />,
      color: "text-purple-500/60",
      href: "/student/subjects",
    },
    {
      label: "All Notes",
      icon: <NotepadText size={30} />,
      color: "text-green-500/60",
      href: "/student/notes",
    },
    {
      label: "Labs",
      icon: <FlaskConical size={30} />,
      color: "text-yellow-500/60",
      href: "/student/labs",
    },
    {
      label: "All Report",
      icon: <ClipboardMinus size={30} />,
      color: "text-purple-500/60",
      href: "/campus/report",
    },
    {
      label: "Campus Map",
      icon: <MapPinPlusInside size={30} />,
      color: "text-red-500/60",
      href: "/campus/map",
    },
    {
      label: "Lost & Found",
      icon: <FileSearchCorner size={30} />,
      color: "text-purple-500/60",
      href: "/campus/lostandfound",
    },
  ];

  return (
    <section className="min-h-screen">
      <h2 className="font-bold text-2xl">Welcome back, {name}!</h2>

      {/* overview container */}
      <div className="flex gap-4 flex-wrap py-4 sm:px-6">
        {overviewFields.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 px-4 py-6 shadow bg-white rounded-lg flex items-center gap-4"
          >
            {/* icon div */}
            <div className={`p-2 rounded-lg ${item.color} ${item.bgcolor}`}>
              {item.icon}
            </div>
            {/* right container */}
            <div>
              <h2 className="text-xl font-bold">{item.value}</h2>
              <p className="text-lg font-semibold text-gray-900">
                {item.label}
              </p>
              <p className="text-xs font-semibold text-gray-800">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* container */}
      <div className="flex flex-col lg:flex-row sm:p-6 gap-6">
        {/* quick access - left container */}
        <div className="bg-white shadow rounded-lg w-full p-4">
          {/* heading */}
          <h2 className="font-bold text-md mb-4 ml-4 mt-4">Quick Access</h2>

          {/* quick access links container */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccess.map((item, idx) => (
              <Link to={item.href}>
                <div
                  key={idx}
                  className="rounded-lg bg-white border h-full w-full border-gray-400 flex items-center gap-4 flex-col p-6 hover:shadow hover:scale-[1.03] duration-200"
                >
                  <span className={`${item.color}`}>{item.icon}</span>
                  <p className="text-[10px] sm:text-[14px] text-gray-800 font-semibold text-center">
                    {item.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* right container */}
        <div className="h-100 w-full bg-white rounded-lg p-4"></div>
      </div>
    </section>
  );
}

export default Herosection;
