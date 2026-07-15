import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiPlus,
    FiEye,
    FiTrash2,
    FiSearch,
} from "react-icons/fi";

import {
    getAdminNotifications,
    deleteNotification,
} from "../../../../../services/adminNotificationService";

const AdminNotifications = () => {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    useEffect(() => {
        const filtered = notifications.filter(
            (notification) =>
                notification.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                notification.type
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );

        setFilteredNotifications(filtered);
    }, [search, notifications]);

    const loadNotifications = async () => {
        try {
            const res = await getAdminNotifications();

            if (res.success) {
                setNotifications(res.notifications);
                setFilteredNotifications(res.notifications);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this notification?")) return;

        try {
            const res = await deleteNotification(id);

            if (res.success) {
                setNotifications((prev) =>
                    prev.filter((item) => item._id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Notification Management
                    </h1>

                    <p className="text-gray-500">
                        Manage all notifications.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/settings/notifications/create")}
                    className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
                >
                    <FiPlus />
                    Create Notification
                </button>

            </div>

            {/* Search */}

            <div className="relative">

                <FiSearch className="absolute left-4 top-3 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search notifications..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-orange-500 text-white">

                        <tr>
                            <th className="px-5 py-3 text-left">Title</th>
                            <th className="px-5 py-3 text-left">Type</th>
                            <th className="px-5 py-3 text-left">User</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Date</th>
                            <th className="px-5 py-3 text-center">
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-10 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>

                        ) : filteredNotifications.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-10 text-center"
                                >
                                    No notifications found.
                                </td>
                            </tr>

                        ) : (

                            filteredNotifications.map((notification) => (

                                <tr
                                    key={notification._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">
                                        {notification.title}
                                    </td>

                                    <td className="px-5 py-4 capitalize">
                                        {notification.type}
                                    </td>

                                    <td className="px-5 py-4">
                                        {notification.user?.name}
                                    </td>

                                    <td className="px-5 py-4">
                                        {notification.isRead ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                Read
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                Unread
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-4">
                                        {new Date(
                                            notification.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-4">

                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/settings/notifications/${notification._id}`)
                                                }
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        notification._id
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminNotifications;