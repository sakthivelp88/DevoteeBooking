import { useState } from "react";
import { FiBell, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

const Notifications = () => {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiBell className="text-orange-600" />
          Notification Preferences
        </h1>

        <p className="text-gray-500 mt-2">
          Choose which notifications you'd like to receive.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border">

        {/* Booking */}
        <div className="p-6 border-b">
          <h2 className="font-semibold text-lg mb-4">
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
        <div className="p-6 border-b">
          <h2 className="font-semibold text-lg mb-4">
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
        <h3 className="font-medium text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
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

        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-orange-600 transition"></div>

        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
      </label>

    </div>
  );
}

export default Notifications;