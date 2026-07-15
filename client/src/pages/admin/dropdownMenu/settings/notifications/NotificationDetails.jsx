import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { getAdminNotificationById } from "../../../../../services/adminNotificationService";

const NotificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotification();
  }, []);

  const loadNotification = async () => {
    try {
      const res = await getAdminNotificationById(id);

      if (res.success) {
        setNotification(res.notification);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!notification) {
    return (
      <p className="text-center text-red-600">
        Notification not found.
      </p>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Notification Details
          </h1>

          <p className="text-gray-500">
            View notification information.
          </p>
        </div>

      </div>

      {/* Card */}

      <div className="rounded-2xl bg-white p-8 shadow space-y-6">

        <div>
          <h2 className="text-sm text-gray-500">
            Title
          </h2>

          <p className="text-xl font-semibold">
            {notification.title}
          </p>
        </div>

        <div>
          <h2 className="text-sm text-gray-500">
            Recipient
          </h2>

          <p>
            {notification.user?.name}
          </p>
        </div>

        <div>
          <h2 className="text-sm text-gray-500">
            Type
          </h2>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
            {notification.type}
          </span>
        </div>

        <div>
          <h2 className="text-sm text-gray-500">
            Status
          </h2>

          <span
            className={`rounded-full px-3 py-1 ${
              notification.isRead
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {notification.isRead ? "Read" : "Unread"}
          </span>
        </div>

        <div>
          <h2 className="text-sm text-gray-500">
            Message
          </h2>

          <div className="rounded-lg border bg-gray-50 p-5 whitespace-pre-wrap">
            {notification.message}
          </div>
        </div>

        <div>
          <h2 className="text-sm text-gray-500">
            Sent On
          </h2>

          <p>
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>

      </div>

    </div>
  );
};

export default NotificationDetails;