import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBell } from "react-icons/fi";

const NotificationSettings = () => {
	const navigate = useNavigate();

	return (
		<div className="space-y-8">

			{/* Header */}
			<div className="flex items-center gap-4">
				<button
					onClick={() => navigate("/admin/settings")}
					className="rounded-lg border p-2 hover:bg-gray-100 dark:text-white dark:bg-black dark:hover:bg-red-900"
				>
					<FiArrowLeft size={20} />
				</button>

				<div>
					<h1 className="text-3xl font-bold text-slate-800 dark:text-white">
						Notification Settings
					</h1>

					<p className="text-gray-500 dark:text-white">
						Configure notification preferences.
					</p>
				</div>
			</div>

			{/* Cards */}
			<div className="grid gap-6">

				{/* Notification Management */}
				<div className="rounded-2xl bg-white p-6 shadow">

					<div className="flex items-center justify-between">

						<div className="flex items-center gap-4">

							<div className="rounded-full bg-orange-100 p-4 text-orange-600">
								<FiBell size={24} />
							</div>

							<div>
								<h2 className="text-xl font-semibold">
									Notification Management
								</h2>

								<p className="text-gray-500">
									Create, manage and send notifications.
								</p>
							</div>

						</div>

						<button
							onClick={() =>
								navigate("/admin/settings/notifications/manage")
							}
							className="rounded-lg bg-orange-500 px-5 py-2 text-white hover:bg-orange-600"
						>
							Open
						</button>

					</div>

				</div>

			</div>

		</div>
	);
};

export default NotificationSettings;
