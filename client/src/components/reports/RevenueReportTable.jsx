import PaymentStatusBadge from "./PaymentStatusBadge";

const columns = [
    { label: "Booking No", key: "bookingNumber" },
    { label: "Devotee", key: "devotee" },
    { label: "Temple", key: "temple" },
    { label: "Darshan", key: "darshanType" },
    { label: "Amount", key: "amount" },
    { label: "Payment Status", key: "paymentStatus" },
    { label: "Payment Date", key: "paymentDate" },
];

const RevenueReportTable = ({
    data = [],
    loading,
    sortBy,
    sortOrder,
    onSort,
}) => {

    if (loading) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                Loading revenue report...
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="rounded-xl bg-white p-10 text-center shadow">
                No revenue records found.
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

                    {data.map((item) => (

                        <tr
                            key={item.id}
                            className="border-t hover:bg-gray-50"
                        >

                            <td className="px-4 py-3">
                                {item.bookingNumber}
                            </td>

                            <td className="px-4 py-3">
                                {item.devotee}
                            </td>

                            <td className="px-4 py-3">
                                {item.temple}
                            </td>

                            <td className="px-4 py-3">
                                {item.darshanType}
                            </td>

                            <td className="px-4 py-3 font-semibold">
                                ₹{Number(item.amount).toLocaleString("en-IN")}
                            </td>

                            <td className="px-4 py-3">
                                <PaymentStatusBadge
                                    status={item.paymentStatus}
                                />
                            </td>

                            <td className="px-4 py-3">
                                {new Date(item.paymentDate).toLocaleDateString("en-IN")}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default RevenueReportTable;