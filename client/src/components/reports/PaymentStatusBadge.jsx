const PaymentStatusBadge = ({ status = "" }) => {
    const normalizedStatus = status.trim().toLowerCase();

    const getBadgeClasses = () => {
        switch (normalizedStatus) {
            case "paid":
                return "bg-green-100 text-green-800";

            case "pending":
                return "bg-yellow-100 text-yellow-800";

            case "failed":
                return "bg-red-100 text-red-800";

            case "refunded":
                return "bg-blue-100 text-blue-800";

            case "cancelled":
                return "bg-gray-100 text-gray-800";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses()}`}
        >
            {status}
        </span>
    );
};

export default PaymentStatusBadge;