import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiPlus, FiEye, FiTrash2, FiSearch, FiArrowLeft } from "react-icons/fi";

import {
	getAdminNotifications,
	deleteAdminNotification, getAdminNotificationStats,
} from "@/features/admin/services/adminNotificationService";

const TYPE_OPTIONS = [
	"all",
	"general",
	"announcement",
	"booking",
	"refund",
	"feedback",
	"remark",
];

const STATUS_OPTIONS = [
	"all",
	"draft",
	"scheduled",
	"sent",
	"failed",
	"cancelled",
];
const STATUS_CLASS = {
	draft: "bg-gray-100 text-gray-700",
	scheduled: "bg-yellow-100 text-yellow-700",
	sent: "bg-green-100 text-green-700",
	failed: "bg-red-100 text-red-700",
	cancelled: "bg-slate-100 text-slate-700",
};
const StatCard = ({ title, value, color = "" }) => (
	<div className="rounded-xl bg-white p-6 shadow">
		<h3 className="text-gray-500">
			{title}
		</h3>

		<p className={`mt-2 text-3xl font-bold ${color}`}>
			{value}
		</p>
	</div>
);

const AdminNotifications = () => {
	const navigate = useNavigate();

	const [notifications, setNotifications] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [typeFilter, setTypeFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");
	const [stats, setStats] = useState({
		total: 0,
		draft: 0,
		scheduled: 0,
		sent: 0,
		failed: 0,
		cancelled: 0,
	});

	const loadNotifications = async () => {
		try {
			const res = await getAdminNotifications();

			if (res.success) {
				setNotifications(res.notifications);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const loadData = async () => {
		setLoading(true);
		try {
			await Promise.all([
				loadNotifications(),
				loadStats(),
			]);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		loadData();
	}, []);

	const filteredNotifications = notifications.filter(notification => {

		const matchesSearch =
			!search ||
			notification.title
				?.toLowerCase()
				.includes(search.toLowerCase()) ||

			notification.message
				?.toLowerCase()
				.includes(search.toLowerCase()) ||

			notification.type
				?.toLowerCase()
				.includes(search.toLowerCase()) ||

			notification.user?.name
				?.toLowerCase()
				.includes(search.toLowerCase());

		const matchesType =
			typeFilter === "all" ||
			notification.type === typeFilter;

		const matchesStatus =
			statusFilter === "all" ||
			notification.status === statusFilter;


		return (
			matchesSearch &&
			matchesType &&
			matchesStatus
		);

	});

	const handleDelete = async (id) => {
		if (!window.confirm("Delete this notification?")) return;
		try {
			const res = await deleteAdminNotification(id);
			if (res.success) {
				await loadData();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const loadStats = async () => {
		try {
			const res = await getAdminNotificationStats();

			if (res.success) {
				setStats(res.stats);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="space-y-6">

			{/* Header */}
			<div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

				{/* Left Section */}
				<div className="flex items-center gap-4">
					<button
						onClick={() => navigate(-1)}
						className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-100"
					>
						<FiArrowLeft size={20} />
					</button>

					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Notification Management
						</h1>
						<p className="mt-1 text-sm text-gray-500 dark:text-white">
							Manage all notifications.
						</p>
					</div>
				</div>

				{/* Right Section */}
				<button
					onClick={() =>
						navigate("/admin/settings/notifications/create")
					}
					className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-medium text-white shadow transition hover:bg-orange-600"
				>
					<FiPlus size={18} />
					<span>Create Notification</span>
				</button>
			</div>

			{/* Notification stats */}

			<div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">

				<StatCard
					title="Total"
					value={stats.total}
				/>

				<StatCard
					title="Draft"
					value={stats.draft}
					color="text-gray-600"
				/>

				<StatCard
					title="Scheduled"
					value={stats.scheduled}
					color="text-yellow-600"
				/>

				<StatCard
					title="Sent"
					value={stats.sent}
					color="text-green-600"
				/>

				<StatCard
					title="Failed"
					value={stats.failed}
					color="text-red-600"
				/>

				<StatCard
					title="Cancelled"
					value={stats.cancelled}
					color="text-slate-600"
				/>

			</div>

			{/* Search */}

			<div className="relative">

				<FiSearch className="absolute left-4 top-3 text-gray-400 dark:text-white" />

				<input
					type="text"
					placeholder="Search notifications..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full rounded-xl border pl-11 pr-4 py-3 focus:outline-none 
					focus:ring-2 focus:ring-orange-400 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
				/>

			</div>

			<div className="grid gap-4 md:grid-cols-2">

				{/* Type */}

				<select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value)}
					className="rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
				>
					{TYPE_OPTIONS.map(type => (
						<option key={type} value={type}>
							{type === "all"
								? "All Types"
								: type.charAt(0).toUpperCase() + type.slice(1)}
						</option>
					))}
				</select>

				{/* Status */}

				<select
					value={statusFilter}
					onChange={(e) =>
						setStatusFilter(e.target.value)
					}
					className="rounded-xl border p-3 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
				>

					{STATUS_OPTIONS.map(status => (
						<option
							key={status}
							value={status}
						>
							{status === "all"
								? "All Status"
								: status.charAt(0).toUpperCase() +
								status.slice(1)}
						</option>
					))}

				</select>

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
								Status
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
										{notification?.title}
									</td>

									<td className="px-5 py-4 capitalize">
										{notification?.type}
									</td>

									<td className="px-5 py-4">
										{notification?.user?.name}
									</td>

									<td className="px-5 py-4">
										<span
											className={`rounded-full px-3 py-1 text-sm ${STATUS_CLASS[notification.status] ??
												"bg-gray-100 text-gray-700"
												}`}
										>
											{notification.status}
										</span>
									</td>

									<td className="px-5 py-4">
										{new Date(
											notification.createdAt
										).toLocaleString()}
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

		</div >
	);
};

export default AdminNotifications;
