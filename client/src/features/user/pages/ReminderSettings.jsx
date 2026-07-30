import { FiArrowLeft, FiBell, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReminderSettings = () => {
	const navigate = useNavigate();

	return (
		<div className="max-w-3xl mx-auto py-10 px-4 text-gray-900 dark:text-gray-100">
			{/* Header */}
			<div className="flex items-start gap-3 mb-8">
				<button
					onClick={() => navigate(-1)}
					className="mt-1 p-2 rounded-lg bg-white/60 text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 transition"
				>
					<FiArrowLeft size={22} />
				</button>

				<div>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
						Reminder Preferences
					</h1>

					<p className="mt-2 text-gray-600 dark:text-gray-300">
						Choose how you'd like to receive booking reminders.
					</p>
				</div>
			</div>

			{/* Reminder Settings */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">

				<div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center gap-3">
						<FiBell className="text-orange-600" size={20} />
						<div>
							<h3 className="font-medium text-gray-800 dark:text-white">
								Push Notifications
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300">
								Receive reminders on your device.
							</p>
						</div>
					</div>

					<input
						type="checkbox"
						className="w-5 h-5 accent-orange-600"
						defaultChecked
					/>
				</div>

				<div className="flex items-center justify-between p-5">
					<div className="flex items-center gap-3">
						<FiMail className="text-orange-600" size={20} />
						<div>
							<h3 className="font-medium text-gray-800 dark:text-white">
								Email Reminders
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300">
								Receive booking reminders by email.
							</p>
						</div>
					</div>

					<input
						type="checkbox"
						className="w-5 h-5 accent-orange-600"
						defaultChecked
					/>
				</div>
			</div>
		</div>
	);
};

export default ReminderSettings;
