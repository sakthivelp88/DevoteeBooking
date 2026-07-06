export default function AdminStatusBadge({
  status,
  type = "booking",
}) {
  const colors = {
    booking: {
      Pending: "bg-yellow-100 text-yellow-700",
      Confirmed: "bg-green-100 text-green-700",
      Completed: "bg-blue-100 text-blue-700",
      Cancelled: "bg-red-100 text-red-700",
    },

    payment: {
      Pending: "bg-yellow-100 text-yellow-700",
      Paid: "bg-green-100 text-green-700",
      Failed: "bg-red-100 text-red-700",
      Refunded: "bg-purple-100 text-purple-700",
    },
  };

  const badgeClass =
    colors[type]?.[status] ||
    "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
    >
      {status}
    </span>
  );
}