import BookingStatusBadge from "./BookingStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const columns = [
    { label: "Booking No", key: "bookingNumber" },
    { label: "Devotee", key: "devotee" },
    { label: "Temple", key: "temple" },
    { label: "Darshan", key: "darshanType" },
    { label: "Booking Date", key: "bookingDate" },
    { label: "Amount", key: "amount" },
    { label: "Booking Status", key: "bookingStatus" },
    { label: "Payment Status", key: "paymentStatus" },
];

const BookingReportTable = ({
    bookings = [],
    loading,
    sortBy,
    sortOrder,
    onSort,
}) => {
    if (loading) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                Loading booking report...
            </div>
        );
    }

    if (!bookings.length) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                No booking records found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                onClick={() => onSort(column.key)}
                                className="cursor-pointer px-4 py-3 text-left text-sm font-semibold"
                            >
                                {column.label}

                                {sortBy === column.key &&
                                    (sortOrder === "asc" ? " ▲" : " ▼")}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
                        <tr
                            key={booking.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">
                                {booking.bookingNumber}
                            </td>

                            <td className="px-4 py-3">
                                {booking.devotee}
                            </td>

                            <td className="px-4 py-3">
                                {booking.temple}
                            </td>

                            <td className="px-4 py-3">
                                {booking.darshanType}
                            </td>

                            <td className="px-4 py-3">
                                {new Date(booking.bookingDate).toLocaleDateString("en-IN")}
                            </td>

                            <td className="px-4 py-3 font-semibold">
                                ₹{Number(booking.amount).toLocaleString("en-IN")}
                            </td>

                            <td className="px-4 py-3">
                                <BookingStatusBadge
                                    status={booking.bookingStatus}
                                />
                            </td>

                            <td className="px-4 py-3">
                                <PaymentStatusBadge
                                    status={booking.paymentStatus}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingReportTable;