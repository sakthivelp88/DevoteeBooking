import { useNavigate } from "react-router-dom";
import { FiInfo, FiCode, FiCalendar, FiShield, FiArrowLeft } from "react-icons/fi";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mt-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FiArrowLeft
              size={22}
              className="text-gray-700 dark:text-gray-200"
            />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              About
            </h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Learn more about the Temple Darshan Booking application.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">

        {/* App Information */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <FiInfo className="text-orange-600" size={22} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Application Information
            </h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-7">
            Temple Darshan Booking is an online platform that enables devotees
            to conveniently book temple darshan slots, manage bookings, receive
            notifications, and stay updated with temple announcements.
          </p>
        </div>

        {/* Details */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <FiCode className="text-orange-600" />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Version
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">1.0.0</span>
          </div>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <FiCalendar className="text-orange-600" />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                Release
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              July 2026
            </span>
          </div>

          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <FiShield className="text-orange-600" />
              <span className="font-medium text-gray-700 dark:text-gray-200">
                License
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              Internal Project
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Temple Darshan Booking. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;