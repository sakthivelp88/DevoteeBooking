import { Link } from "react-router-dom";
import {
  FiBell,
  FiMail,
  FiMonitor,
  FiClock,
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

const settingItems = [
  {
    title: "Notification Preferences",
    description: "Manage which notifications you receive.",
    icon: <FiBell size={22} />,
    path: "/settings/notifications",
  },
  {
    title: "Message Center",
    description: "View messages from temple administration.",
    icon: <FiMail size={22} />,
    path: "/settings/messages",
  },
  {
    title: "Appearance",
    description: "Customize the application's appearance.",
    icon: <FiMonitor size={22} />,
    path: "/settings/appearance",
  },
  {
    title: "Reminder Preferences",
    description: "Control booking reminder settings.",
    icon: <FiClock size={22} />,
    path: "/settings/reminders",
  },
  {
    title: "About",
    description: "Application information and version.",
    icon: <FiInfo size={22} />,
    path: "/settings/about",
  },
];

const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your preferences and application settings.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        {settingItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center justify-between p-5 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                {item.icon}
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>

            <FiChevronRight
              className="text-gray-400"
              size={22}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;