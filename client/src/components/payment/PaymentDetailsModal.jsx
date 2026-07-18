import PaymentStatusBadge from "./PaymentStatusBadge";

const PaymentDetailsModal = ({ isOpen, payment, onClose, loading }) => {
    if (!isOpen || !payment) return null;

    const fields = [
        {
            label: "Booking Number",
            value: payment.bookingNumber,
        },
        {
            label: "Devotee",
            value: payment.devoteeName,
        },
        {
            label: "Temple",
            value: payment.templeName,
        },
        {
            label: "Darshan Type",
            value: payment.darshanType,
        },
        {
            label: "Ticket",
            value: payment.ticketNumber,
        },
        {
            label: "Amount",
            value: `₹${payment.amount?.toLocaleString()}`,
        },
        {
            label: "Payment Method",
            value: payment.paymentMethod,
        },
        {
            label: "Payment ID",
            value: payment.paymentId,
        },
        {
            label: "Order ID",
            value: payment.orderId,
        },
        {
            label: "Reference",
            value: payment.reference,
        },
        {
            label: "Payment Date",
            value: payment.paymentDate
                ? new Date(payment.paymentDate).toLocaleString()
                : "-",
        },
        {
            label: "Remarks",
            value: payment.remarks || "-",
        },
    ];

    if (loading) {
        return (
            <Modal>
                Loading payment details...
            </Modal>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-3xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">
                        Payment Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    {fields.map((field) => (
                        <div key={field.label}>
                            <p className="mb-1 text-sm text-gray-500">
                                {field.label}
                            </p>

                            <p className="font-medium text-gray-800 break-all">
                                {field.value}
                            </p>
                        </div>
                    ))}

                    <div>
                        <p className="mb-1 text-sm text-gray-500">
                            Status
                        </p>

                        <PaymentStatusBadge
                            status={payment.status}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        onClick={() => onViewReceipt(payment)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                    >
                        View Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsModal;