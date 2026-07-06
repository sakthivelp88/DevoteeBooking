import { useNavigate } from "react-router-dom";

import {
    FiPlus,
    FiCalendar,
    FiBookOpen,
    FiCreditCard,
} from "react-icons/fi";

const actions = [
    {
        title: "Add Temple",
        icon: <FiPlus size={22} />,
        path: "/admin/temples",
        color: "bg-blue-500",
    },
    {
        title: "Create Ticket",
        icon: <FiCalendar size={22} />,
        path: "/admin/ticket-slots",
        color: "bg-green-500",
    },
    {
        title: "Bookings",
        icon: <FiBookOpen size={22} />,
        path: "/admin/bookings",
        color: "bg-purple-500",
    },
    {
        title: "Payments",
        icon: <FiCreditCard size={22} />,
        path: "/admin/payments",
        color: "bg-orange-500",
    },
];

export default function QuickActions() {
    const navigate = useNavigate();

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {actions.map((action) => (
                    <button
                        key={action.title}
                        onClick={() => navigate(action.path)}
                        className="group rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:shadow-lg"
                    >
                        <div
                            className={`${action.color} mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110`}
                        >
                            {action.icon}
                        </div>

                        <p className="mt-4 text-sm font-semibold text-gray-700">
                            {action.title}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}