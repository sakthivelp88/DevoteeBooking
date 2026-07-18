import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBell,
  FiChevronRight,
  FiMessageCircle,
  FiMessageSquare,
  FiRefreshCw,
} from "react-icons/fi";

import * as notificationService from "@services/user/notificationService";

const MessageCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "refund":
        return <FiRefreshCw className="text-green-600" size={22} />;

      case "feedback":
        return <FiMessageSquare className="text-blue-600" size={22} />;

      case "announcement":
        return <FiBell className="text-orange-600" size={22} />;

      default:
        return <FiMessageCircle className="text-purple-600" size={22} />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading notifications...
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          No Notifications
        </h2>

        <p className="text-gray-500 mt-2">
          You're all caught up.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Message Center
        </h1>

        <p className="text-gray-500 mt-2">
          Messages sent by Temple Administration.
        </p>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {notifications.map((notification) => (

          <Link
            key={notification._id}
            to={`/settings/messages/${notification._id}`}
            className="flex items-center justify-between p-5 border-b hover:bg-orange-50 transition"
          >

            <div className="flex gap-4">

              <div className="mt-1">
                {getIcon(notification.type)}
              </div>

              <div>

                <div className="flex items-center gap-2">

                  {!notification.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  )}

                  <h3
                    className={`font-semibold ${
                      notification.isRead
                        ? "text-gray-700"
                        : "text-gray-900"
                    }`}
                  >
                    {notification.title}
                  </h3>

                </div>

                <p className="text-sm text-gray-500 mt-1">

                  {notification.message.length > 80
                    ? notification.message.substring(0, 80) + "..."
                    : notification.message}

                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>

            <FiChevronRight className="text-gray-400" />

          </Link>

        ))}

      </div>

    </div>
  );
};

export default MessageCenter;