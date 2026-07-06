import { Eye } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";

const PaymentTable = ({ payments, loading, onView }) => {
    if (loading) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <p className="text-gray-500">Loading payments...</p>
            </div>
        );
    }

    if (!payments.length) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <p className="text-gray-500">No payments found.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <TableHead>Payment ID</TableHead>
                            <TableHead>Booking No</TableHead>
                            <TableHead>Devotee</TableHead>
                            <TableHead>Temple</TableHead>
                            <TableHead align="right">Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment Date</TableHead>
                            <TableHead align="center">Actions</TableHead>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">
                        {payments.map((payment) => (
                            <tr
                                key={payment._id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell>
                                    {payment.paymentId}
                                </TableCell>

                                <TableCell>
                                    {payment.bookingNumber}
                                </TableCell>

                                <TableCell>
                                    {payment.devoteeName}
                                </TableCell>

                                <TableCell>
                                    {payment.templeName}
                                </TableCell>

                                <TableCell align="right">
                                    ₹{payment.amount.toLocaleString()}
                                </TableCell>

                                <TableCell>
                                    <PaymentStatusBadge
                                        status={payment.status}
                                    />
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        payment.paymentDate
                                    ).toLocaleDateString()}
                                </TableCell>

                                <TableCell align="center">
                                    <button
                                        onClick={() => onView(payment._id)}
                                        className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                                        title="View Details"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TableHead = ({ children, align = "left" }) => (
    <th
        className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600 ${align === "right"
                ? "text-right"
                : align === "center"
                    ? "text-center"
                    : "text-left"
            }`}
    >
        {children}
    </th>
);

const TableCell = ({ children, align = "left" }) => (
    <td
        className={`px-6 py-4 text-sm text-gray-700 ${align === "right"
                ? "text-right"
                : align === "center"
                    ? "text-center"
                    : "text-left"
            }`}
    >
        {children}
    </td>
);

export default PaymentTable;