import {
  FiBookOpen,
  FiDollarSign,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";

import { formatCurrency } from "@/utils/formatCurrency";

const stats = [
  {
    key: "bookings",
    title: "Today's Bookings",
    icon: <FiBookOpen size={24} />,
    color: "bg-blue-500",
  },
  {
    key: "revenue",
    title: "Today's Revenue",
    icon: <FiDollarSign size={24} />,
    color: "bg-green-500",
  },
  {
    key: "payments",
    title: "Today's Payments",
    icon: <FiCheckCircle size={24} />,
    color: "bg-purple-500",
  },
  {
    key: "users",
    title: "Today's Users",
    icon: <FiUsers size={24} />,
    color: "bg-orange-500",
  },
];

export default function TodayStats({ data }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.key}
          className="group rounded-xl bg-white p-5 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {item.title}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                {item.key === "revenue"
                  ? formatCurrency(data[item.key])
                  : data[item.key]}
              </h2>
            </div>

            <div
              className={`${item.color} flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}