import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	FiArrowLeft,
	FiEdit,
	FiTrash2,
	FiXCircle,
} from "react-icons/fi";

import {
	getAdminNotificationById,
	deleteAdminNotification,
	cancelAdminNotification,
} from "@/features/admin/services/adminNotificationService";

const STATUS_CLASS = {
	draft: "bg-gray-100 text-gray-700",
	scheduled: "bg-yellow-100 text-yellow-700",
	sent: "bg-green-100 text-green-700",
	failed: "bg-red-100 text-red-700",
	cancelled: "bg-slate-100 text-slate-700",
};

const NotificationDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadNotification();
	}, [id]);

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

	const handleDelete = async () => {
		if (!window.confirm("Delete this notification?")) return;

		try {
			const res = await deleteAdminNotification(id);

			if (res.success) {
				navigate("/admin/settings/notifications");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancel = async () => {
		if (!window.confirm("Cancel this notification?")) return;

		try {
			const res = await cancelAdminNotification(id);

			if (res.success) {
				loadNotification();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const formatDate = (date) =>
		date ? new Date(date).toLocaleString() : "-";

	if (loading) {
		return (
			<p className="py-10 text-center">
				Loading...
			</p>
		);
	}

	if (!notification) {
		return (
			<p className="py-10 text-center text-red-600">
				Notification not found.
			</p>
		);
	}
    
	const canEdit = !["sent", "cancelled", "failed"].includes(notification.status);

	return (
		<div className="mx-auto max-w-5xl space-y-8">

			{/* Header */}

			<div className="flex items-center gap-4">

				<button
					onClick={() => navigate(-1)}
					className="rounded-lg border p-2 hover:bg-gray-100 dark:text-white dark:bg-black dark:hover:bg-red-900"
				>
					<FiArrowLeft size={20} />
				</button>

				<div>
					<h1 className="text-3xl font-bold dark:text-white">
						Notification Details
					</h1>

					<p className="text-gray-500 dark:text-white">
						View complete notification information.
					</p>
				</div>

			</div>

			{/* Main Card */}

			<div className="space-y-8 rounded-2xl bg-white p-8 shadow">

				{/* Title */}

				<div>

					<h2 className="text-sm text-gray-500">
						Title
					</h2>

					<p className="mt-1 text-2xl font-semibold">
						{notification.title}
					</p>

				</div>

				{/* Message */}

				<div>

					<h2 className="text-sm text-gray-500">
						Message
					</h2>

					<div className="mt-2 rounded-lg border bg-gray-50 p-5 whitespace-pre-wrap">
						{notification.message}
					</div>

				</div>

				{/* General Info */}

				<div className="grid gap-6 md:grid-cols-2">

					<Info label="Audience" value={notification.audience} />
					<Info label="Type" value={notification.type} />
					<Info label="Priority" value={notification.priority} />
					<Info
						label="Delivery Status"
						value={notification.deliveryStatus}
					/>

					<div>

						<p className="text-sm text-gray-500">
							Status
						</p>

						<span
							className={`mt-2 inline-block rounded-full px-3 py-1 text-sm ${STATUS_CLASS[notification.status]
								}`}
						>
							{notification.status}
						</span>

					</div>

					<Info
						label="Delivery Channel"
						value={notification.deliveryChannel.join(", ")}
					/>

				</div>

				{/* User */}

				<div className="grid gap-6 md:grid-cols-2">

					<Info
						label="Recipient"
						value={
							notification.user
								? notification.user.name
								: "All Users"
						}
					/>

					<Info
						label="Recipient Email"
						value={
							notification.user?.email || "-"
						}
					/>

					<Info
						label="Created By"
						value={
							notification.createdBy?.name || "-"
						}
					/>

					<Info
						label="Campaign ID"
						value={
							notification.campaignId || "-"
						}
					/>

				</div>

				{/* Dates */}

				<div className="grid gap-6 md:grid-cols-2">

					<Info
						label="Created At"
						value={formatDate(notification.createdAt)}
					/>

					<Info
						label="Scheduled At"
						value={formatDate(notification.scheduledAt)}
					/>

					<Info
						label="Sent At"
						value={formatDate(notification.sentAt)}
					/>

					<Info
						label="Expires At"
						value={formatDate(notification.expiresAt)}
					/>

					<Info
						label="Read"
						value={notification.isRead ? "Yes" : "No"}
					/>

					<Info
						label="Read At"
						value={formatDate(notification.readAt)}
					/>

				</div>

				{/* Failure */}

				{notification.failureReason && (

					<div>

						<h2 className="text-sm text-red-500">
							Failure Reason
						</h2>

						<div className="mt-2 rounded-lg bg-red-50 p-4 text-red-700">
							{notification.failureReason}
						</div>

					</div>

				)}

				{/* Actions */}

				<div className="flex flex-wrap justify-end gap-3 border-t pt-6">

					<button
						disabled={!canEdit}
						onClick={() =>
							navigate(`/admin/settings/notifications/edit/${notification._id}`)
						}
						className={`flex items-center gap-2 rounded-lg px-5 py-2 text-white ${canEdit
								? "bg-blue-600 hover:bg-blue-700"
								: "cursor-not-allowed bg-gray-400"
							}`}
					>
						<FiEdit />
						Edit
					</button>

					{notification.status === "scheduled" && (

						<button
							onClick={handleCancel}
							className="flex items-center gap-2 rounded-lg bg-yellow-600 px-5 py-2 text-white hover:bg-yellow-700"
						>
							<FiXCircle />
							Cancel
						</button>

					)}

					<button
						onClick={handleDelete}
						className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
					>
						<FiTrash2 />
						Delete
					</button>

				</div>

			</div>

		</div>
	);
};

const Info = ({ label, value }) => (
	<div>
		<p className="text-sm text-gray-500">
			{label}
		</p>

		<p className="mt-1 font-medium capitalize">
			{value || "-"}
		</p>
	</div>
);

export default NotificationDetails;
