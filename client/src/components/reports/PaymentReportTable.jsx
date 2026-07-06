import PaymentStatusBadge from "./PaymentStatusBadge";

const columns = [
    { label: "Booking No", key: "bookingNumber" },
    { label: "Devotee", key: "devotee" },
    { label: "Temple", key: "temple" },
    { label: "Darshan", key: "darshanType" },
    { label: "Amount", key: "amount" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Payment Status", key: "paymentStatus" },
    { label: "Payment Date", key: "paymentDate" },
];

const PaymentReportTable = ({
    payments = [],
    loading,
    sortBy,
    sortOrder,
    onSort,
}) => {
    if (loading) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                Loading payment report...
            </div>
        );
    }

    if (!payments.length) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                No payment records found.
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
                    {payments.map((payment) => (
                        <tr
                            key={payment.id}
                            className="border-t hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">
                                {payment.bookingNumber}
                            </td>

                            <td className="px-4 py-3">
                                {payment.devotee}
                            </td>

                            <td className="px-4 py-3">
                                {payment.temple}
                            </td>

                            <td className="px-4 py-3">
                                {payment.darshanType}
                            </td>

                            <td className="px-4 py-3 font-semibold">
                                ₹{Number(payment.amount).toLocaleString("en-IN")}
                            </td>

                            <td className="px-4 py-3">
                                {payment.paymentMethod}
                            </td>

                            <td className="px-4 py-3">
                                <PaymentStatusBadge
                                    status={payment.paymentStatus}
                                />
                            </td>

                            <td className="px-4 py-3">
                                {new Date(payment.paymentDate).toLocaleDateString("en-IN")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentReportTable;