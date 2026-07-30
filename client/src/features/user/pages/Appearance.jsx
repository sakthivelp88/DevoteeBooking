import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiMonitor, FiArrowLeft } from "react-icons/fi";

import { useTheme } from "@/context/userThemeContext";

const Appearance = () => {
	const { theme, changeTheme, loading } = useTheme();
	const navigate = useNavigate();

	const currentTheme = theme || "light";

	const themes = [
		{
			id: "light",
			label: "Light",
			icon: <FiSun className="text-yellow-500" size={20} />,
		},
		{
			id: "dark",
			label: "Dark",
			icon: <FiMoon className="text-gray-700 dark:text-gray-300" size={20} />,
		},
		{
			id: "system",
			label: "System",
			icon: <FiMonitor className="text-blue-500" size={20} />,
		},
	];

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="max-w-3xl mx-auto py-10 px-4 text-gray-900 dark:text-gray-100">
			<div className="flex items-start gap-3 mb-8">
				<button
					onClick={() => navigate(-1)}
					className="mt-1 p-2 rounded-lg bg-white/60 text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 transition"
				>
					<FiArrowLeft
						size={22}
					/>
				</button>

				<div>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
						Appearance
					</h1>

					<p className="mt-2 text-gray-600 dark:text-gray-300">
						Select your preferred application theme.
					</p>
				</div>
			</div>

			<div className="divide-y divide-gray-200 dark:divide-gray-700">
				{themes.map((item) => (
					<label
						key={item.id}
						className="flex items-center justify-between p-5 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
					>
						<div className="flex items-center gap-4">
							{item.icon}

							<span className="font-medium text-gray-800 dark:text-gray-100">
								{item.label}
							</span>
						</div>

						<input
							type="radio"
							name="theme"
							value={item.id}
							checked={currentTheme === item.id}
							onChange={() => changeTheme(item.id)}
							className="w-5 h-5 accent-orange-500"
						/>
					</label>
				))}
			</div>
		</div>
	);
};

export default Appearance;
