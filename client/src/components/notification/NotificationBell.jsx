import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
} from "@services/user/notificationService";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();

        const interval = setInterval(() => {
            fetchNotifications();
            fetchUnreadCount();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await getNotifications();

            if (res.success) {
                setNotifications(res.notifications);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const res = await getUnreadCount();

            if (res.success) {
                setUnreadCount(res.count);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleNotificationClick = async (notification) => {
        if (!notification.isRead) {
            await markAsRead(notification._id);

            setNotifications((prev) =>
                prev.map((item) =>
                    item._id === notification._id
                        ? { ...item, isRead: true }
                        : item
                )
            );

            setUnreadCount((count) => Math.max(0, count - 1));
        }

        navigate(`/messages/${notification._id}`);
    };

    const handleMarkAllRead = async () => {
        try {
            const res = await markAllAsRead();

            if (res.success) {
                setNotifications((prev) =>
                    prev.map((n) => ({
                        ...n,
                        isRead: true,
                    }))
                );

                setUnreadCount(0);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2"
            >
                <Bell size={22} />

                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border">
                    <div className="flex items-center justify-between p-3 border-b">
                        <h3 className="font-semibold">Notifications</h3>

                        {notifications.length > 0 && unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Mark all
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                            No notifications
                        </div>
                    ) : (
                        <>
                            {notifications.slice(0, 5).map((notification) => (
                                <button
                                    key={notification._id}
                                    onClick={() =>
                                        handleNotificationClick(notification)
                                    }
                                    className={`w-full text-left p-3 hover:bg-gray-100 border-b ${!notification.isRead
                                        ? "bg-blue-50"
                                        : ""
                                        }`}
                                >
                                    <div className="font-medium">
                                        {notification.title}
                                    </div>

                                    <div className="text-sm text-gray-600 truncate">
                                        {notification.message}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDistanceToNow(new Date(notification.createdAt), {
                                            addSuffix: true,
                                        })}
                                    </p>
                                </button>
                            ))}

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/messages");
                                }}
                                className="w-full p-3 text-center text-blue-600 hover:bg-gray-100"
                            >
                                View All
                            </button>
                        </>
                    )}
                </div>
            )
            }
        </div >
    );
};

export default NotificationBell;