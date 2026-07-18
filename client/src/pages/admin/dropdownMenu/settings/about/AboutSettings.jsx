import { FiInfo, FiCode, FiShield, FiMail, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AboutSettings() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/settings")}
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            About System
          </h1>
          <p className="text-gray-500 mt-1">
            Information about the Devotee Booking Admin Panel.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow p-6 space-y-5">
        <div className="flex items-center gap-3">
          <FiInfo className="text-orange-500 text-2xl" />
          <div>
            <h2 className="font-semibold">Application</h2>
            <p className="text-gray-500">
              Devotee Booking Management System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiCode className="text-orange-500 text-2xl" />
          <div>
            <h2 className="font-semibold">Version</h2>
            <p className="text-gray-500">Version 1.0.0</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiShield className="text-orange-500 text-2xl" />
          <div>
            <h2 className="font-semibold">Administrator Access</h2>
            <p className="text-gray-500">
              Full access to manage temples, bookings, tickets,
              users, reports and notifications.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiMail className="text-orange-500 text-2xl" />
          <div>
            <h2 className="font-semibold">Support</h2>
            <p className="text-gray-500">
              support@devoteebooking.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}