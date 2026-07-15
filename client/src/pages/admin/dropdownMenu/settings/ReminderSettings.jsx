import { useState } from "react";

export default function AdminReminderSettings() {
  const [emailReminder, setEmailReminder] = useState(true);
  const [smsReminder, setSmsReminder] = useState(false);
  const [reportReminder, setReportReminder] = useState(true);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Reminder Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Configure reminder preferences for administrators.
        </p>
      </div>

      <div className="rounded-xl bg-white shadow p-6 space-y-6">

        <label className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">
              Email Notifications
            </h3>
            <p className="text-gray-500 text-sm">
              Receive reminder emails.
            </p>
          </div>

          <input
            type="checkbox"
            checked={emailReminder}
            onChange={() =>
              setEmailReminder(!emailReminder)
            }
          />
        </label>

        <label className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">
              SMS Notifications
            </h3>
            <p className="text-gray-500 text-sm">
              Receive reminder SMS messages.
            </p>
          </div>

          <input
            type="checkbox"
            checked={smsReminder}
            onChange={() =>
              setSmsReminder(!smsReminder)
            }
          />
        </label>

        <label className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">
              Daily Report Reminder
            </h3>
            <p className="text-gray-500 text-sm">
              Receive daily report reminders.
            </p>
          </div>

          <input
            type="checkbox"
            checked={reportReminder}
            onChange={() =>
              setReportReminder(!reportReminder)
            }
          />
        </label>

        <button className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600">
          Save Settings
        </button>

      </div>

    </div>
  );
}