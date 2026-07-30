import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail, FiMessageSquare, FiFileText, } from "react-icons/fi";

export default function AdminReminderSettings() {
	const [emailReminder, setEmailReminder] = useState(true);
	const [smsReminder, setSmsReminder] = useState(false);
	const [reportReminder, setReportReminder] = useState(true);
	const navigate = useNavigate();

	return (
		<div className="space-y-6">
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
						Reminder Settings
					</h1>

					<p className="text-gray-500 mt-1 dark:text-white">
						Configure reminder preferences for administrators.
					</p>
				</div>
			</div>

			<div className="rounded-xl bg-white shadow p-6 space-y-6">

				<label className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-orange-100 p-3 text-orange-500">
							<FiMail size={22} />
						</div>

						<div>
							<h3 className="font-semibold">Email Notifications</h3>
							<p className="text-gray-500 text-sm">
								Receive reminder emails.
							</p>
						</div>
					</div>

					<input
						type="checkbox"
						checked={emailReminder}
						onChange={() => setEmailReminder(!emailReminder)}
					/>
				</label>

				<label className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-orange-100 p-3 text-orange-500">
							<FiMessageSquare size={22} />
						</div>

						<div>
							<h3 className="font-semibold">SMS Notifications</h3>
							<p className="text-gray-500 text-sm">
								Receive reminder SMS messages.
							</p>
						</div>
					</div>

					<input
						type="checkbox"
						checked={smsReminder}
						onChange={() => setSmsReminder(!smsReminder)}
					/>
				</label>

				<label className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<div className="rounded-lg bg-orange-100 p-3 text-orange-500">
							<FiFileText size={22} />
						</div>

						<div>
							<h3 className="font-semibold">Daily Report Reminder</h3>
							<p className="text-gray-500 text-sm">
								Receive daily report reminders.
							</p>
						</div>
					</div>

					<input
						type="checkbox"
						checked={reportReminder}
						onChange={() => setReportReminder(!reportReminder)}
					/>
				</label>

				<button className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600">
					Save Settings
				</button>

			</div>

		</div>
	);
}
