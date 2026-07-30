import { useNavigate } from "react-router-dom";
import {
	FiBell,
	FiMonitor,
	FiClock,
	FiInfo,
} from "react-icons/fi";

const AdminSettings = () => {
	const navigate = useNavigate();

	const cards = [
		{
			title: "Notification Settings",
			description: "Manage and send notifications to users.",
			icon: <FiBell size={28} />,
			path: "/admin/settings/notifications",
		},
		{
			title: "Appearance",
			description: "Customize the admin interface appearance.",
			icon: <FiMonitor size={28} />,
			path: "/admin/settings/appearance",
		},
		{
			title: "Reminder Settings",
			description: "Configure reminder preferences.",
			icon: <FiClock size={28} />,
			path: "/admin/settings/reminders",
		},
		{
			title: "About",
			description: "Application information and version details.",
			icon: <FiInfo size={28} />,
			path: "/admin/settings/about",
		},
	];

	return (
		<div className="space-y-8">

			<div>
				<h1 className="text-3xl font-bold text-slate-800 dark:text-white">
					Admin Settings
				</h1>

				<p className="mt-2 text-gray-500 dark:text-white">
					Manage application settings and preferences.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">

				{cards.map((card) => (
					<button
						key={card.title}
						onClick={() => navigate(card.path)}
						className="rounded-2xl bg-white p-6 text-left shadow transition hover:-translate-y-1 hover:shadow-lg"
					>
						<div className="mb-4 text-orange-500">
							{card.icon}
						</div>

						<h2 className="text-xl font-semibold">
							{card.title}
						</h2>

						<p className="mt-2 text-gray-500">
							{card.description}
						</p>
					</button>
				))}

			</div>

		</div>
	);
};

export default AdminSettings;
