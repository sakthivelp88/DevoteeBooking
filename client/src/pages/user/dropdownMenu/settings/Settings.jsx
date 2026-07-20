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
    <div className="mx-auto max-w-5xl px-4 py-10 text-slate-900 dark:text-slate-100">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          Settings
        </h1>
        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Manage your preferences and application settings.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        {settingItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
                {item.icon}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            </div>

            <FiChevronRight
              className="text-gray-400 dark:text-slate-500"
              size={22}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;