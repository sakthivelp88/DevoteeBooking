import {
    FiBookOpen,
    FiUsers,
} from "react-icons/fi";

const icons = {
    Booking: <FiBookOpen className="text-blue-600" />,
    User: <FiUsers className="text-green-600" />,
};

export default function RecentActivity({
    activities,
}) {
    return (
        <div className="rounded-xl bg-white shadow">

            <div className="border-b p-5">
                <h2 className="text-xl font-semibold">
                    Recent System Activity
                </h2>
            </div>

            <div className="divide-y">

                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-5"
                        >
                            <div className="mt-1 rounded-full bg-gray-100 p-3">
                                {icons[activity.type]}
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">
                                    {activity.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {activity.description}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {new Date(
                                        activity.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No recent activity.
                    </div>
                )}

            </div>

        </div>
    );
}