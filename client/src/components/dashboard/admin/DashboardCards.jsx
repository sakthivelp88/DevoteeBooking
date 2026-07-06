import {
    FiUsers,
    FiGrid,
    FiCalendar,
    FiBookOpen,
    FiDollarSign,
    FiCheckCircle,
    FiClock,
} from "react-icons/fi";

import { MdTempleHindu } from "react-icons/md";

import StatCard from "./StatCard";
import { formatCurrency } from "../../../utils/formatCurrency";


export default function DashboardCards({ cards }) {
    const statistics = [
        {
            title: "Users",
            value: cards.totalUsers,
            icon: <FiUsers size={28} />,
            color: "bg-blue-500",
        },
        {
            title: "Temples",
            value: cards.totalTemples,
            icon: <MdTempleHindu size={28} />,
            color: "bg-green-500",
        },
        {
            title: "Darshan Types",
            value: cards.totalDarshanTypes,
            icon: <FiGrid size={28} />,
            color: "bg-purple-500",
        },
        {
            title: "Tickets",
            value: cards.totalTickets,
            icon: <FiCalendar size={28} />,
            color: "bg-indigo-500",
        },
        {
            title: "Bookings",
            value: cards.totalBookings,
            icon: <FiBookOpen size={28} />,
            color: "bg-orange-500",
        },
        {
            title: "Revenue",
            value: formatCurrency(cards.revenue),
            icon: <FiDollarSign size={28} />,
            color: "bg-red-500",
        },
        {
            title: "Paid Bookings",
            value: cards.paidBookings,
            icon: <FiCheckCircle size={28} />,
            color: "bg-emerald-500",
        },
        {
            title: "Pending Payments",
            value: cards.pendingBookings,
            icon: <FiClock size={28} />,
            color: "bg-yellow-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((item) => (
                <StatCard
                    key={item.title}
                    {...item}
                />
            ))}
        </div>
    );
}