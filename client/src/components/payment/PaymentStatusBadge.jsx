const STATUS_STYLES = {
    Paid: {
        label: "Paid",
        className:
            "bg-green-100 text-green-700 border border-green-200",
    },
    Pending: {
        label: "Pending",
        className:
            "bg-yellow-100 text-yellow-700 border border-yellow-200",
    },
    Failed: {
        label: "Failed",
        className:
            "bg-red-100 text-red-700 border border-red-200",
    },
    Refunded: {
        label: "Refunded",
        className:
            "bg-blue-100 text-blue-700 border border-blue-200",
    },
};

const PaymentStatusBadge = ({ status }) => {
    const badge =
        STATUS_STYLES[status] || {
            label: status || "Unknown",
            className:
                "bg-gray-100 text-gray-700 border border-gray-200",
        };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
        >
            {badge.label}
        </span>
    );
};

export default PaymentStatusBadge;