import {
    CreditCard,
    CheckCircle,
    Clock,
    XCircle,
    RotateCcw,
    IndianRupee,
} from "lucide-react";

const PaymentCards = ({ statistics }) => {
    const cards = [
        {
            title: "Total Payments",
            value: statistics.totalPayments,
            icon: CreditCard,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Paid",
            value: statistics.paid,
            icon: CheckCircle,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Pending",
            value: statistics.pending,
            icon: Clock,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
        {
            title: "Failed",
            value: statistics.failed,
            icon: XCircle,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
        },
        {
            title: "Refunded",
            value: statistics.refunded,
            icon: RotateCcw,
            iconBg: "bg-sky-100",
            iconColor: "text-sky-600",
        },
        {
            title: "Total Revenue",
            value: `₹${statistics.totalRevenue.toLocaleString()}`,
            icon: IndianRupee,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                {card.title}
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-gray-800">
                                {card.value}
                            </h2>
                        </div>

                        <div
                            className={`rounded-full p-3 ${card.iconBg}`}
                        >
                            <Icon
                                className={`h-6 w-6 ${card.iconColor}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PaymentCards;