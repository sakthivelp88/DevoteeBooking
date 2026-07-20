import { useState } from "react";
import toast from "react-hot-toast";
import { FiBell, FiSave, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    bookingConfirmation: true,
    bookingReminder: true,
    refundUpdates: true,
    feedbackReplies: true,
    templeAnnouncements: false,
  });

  const handleChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // Backend API later
    toast.success("Notification preferences saved.");
  };

  return (
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FiBell className="text-orange-600" />
            Notification Preferences
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Choose which notifications you'd like to receive.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 dark:border-gray-700">

        {/* Booking */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg mb-4 underline">
            Booking Notifications
          </h2>

          <Toggle
            title="Booking Confirmation"
            desc="Receive confirmation after a successful booking."
            checked={settings.bookingConfirmation}
            onChange={() => handleChange("bookingConfirmation")}
          />

          <Toggle
            title="Booking Reminder"
            desc="Receive reminders before your darshan."
            checked={settings.bookingReminder}
            onChange={() => handleChange("bookingReminder")}
          />
        </div>

        {/* Updates */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white underline">
            Updates
          </h2>

          <Toggle
            title="Refund Updates"
            desc="Get notified when refund status changes."
            checked={settings.refundUpdates}
            onChange={() => handleChange("refundUpdates")}
          />

          <Toggle
            title="Feedback Replies"
            desc="Receive replies from temple administration."
            checked={settings.feedbackReplies}
            onChange={() => handleChange("feedbackReplies")}
          />

          <Toggle
            title="Temple Announcements"
            desc="Festival notices and temple announcements."
            checked={settings.templeAnnouncements}
            onChange={() => handleChange("templeAnnouncements")}
          />
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

function Toggle({ title, desc, checked, onChange }) {
  return (
    <div className="flex justify-between items-center py-4">

      <div>
        <h3 className="font-medium text-gray-800 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />

        <div className="w-11 h-6 rounded-full bg-gray-300 dark:bg-gray-600 peer-checked:bg-orange-600 transition"></div>

        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
      </label>

    </div>
  );
}

export default Notifications;