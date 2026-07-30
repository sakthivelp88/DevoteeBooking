import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
	FiArrowLeft,
	FiBell,
	FiMessageCircle,
	FiMessageSquare,
	FiRefreshCw,
} from "react-icons/fi";

import * as notificationService from "@/features/notifications/services/notificationService";

const MessageDetails = () => {
	const { id } = useParams();

	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchNotification();
	}, [id]);

	const fetchNotification = async () => {
		try {
			const data = await notificationService.getNotification(id);

			setNotification(data.notification);

			if (!data.notification.isRead) {
				await notificationService.markAsRead(id);
			}

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getIcon = (type) => {
		switch (type) {
			case "refund":
				return <FiRefreshCw size={30} className="text-green-600" />;

			case "feedback":
				return <FiMessageSquare size={30} className="text-blue-600" />;

			case "announcement":
				return <FiBell size={30} className="text-orange-600" />;

			default:
				return <FiMessageCircle size={30} className="text-purple-600" />;
		}
	};

	if (loading) {
		return (
			<div className="text-center py-20">
				Loading...
			</div>
		);
	}

	if (!notification) {
		return (
			<div className="text-center py-20">
				Notification not found.
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto py-10 px-4">

			<Link
				to="/settings/messages"
				className="inline-flex items-center gap-2 text-orange-600 hover:underline mb-6"
			>
				<FiArrowLeft />
				Back to Message Center
			</Link>

			<div className="bg-white rounded-xl shadow">

				{/* Header */}
				<div className="flex items-center gap-4 p-6 border-b">

					{getIcon(notification.type)}

					<div>

						<h1 className="text-2xl font-bold">
							{notification.title}
						</h1>

						<p className="text-gray-500">
							Temple Administration
						</p>

					</div>

				</div>

				{/* Body */}
				<div className="p-6">

					<p className="leading-8 text-gray-700 whitespace-pre-line">
						{notification.message}
					</p>

				</div>

				{/* Footer */}
				<div className="border-t px-6 py-4 flex justify-between text-sm text-gray-500">

					<span>
						Temple Administration
					</span>

					<span>
						{new Date(notification.createdAt).toLocaleString()}
					</span>

				</div>

			</div>

		</div>
	);
};

export default MessageDetails;
