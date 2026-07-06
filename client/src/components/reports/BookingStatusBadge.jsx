const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Completed: "bg-blue-100 text-blue-800",
};

const BookingStatusBadge = ({ status }) => {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[status] || "bg-gray-100 text-gray-800"
                }`}
        >
            {status}
        </span>
    );
};

export default BookingStatusBadge;