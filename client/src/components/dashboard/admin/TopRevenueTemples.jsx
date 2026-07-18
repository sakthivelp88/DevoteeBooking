import { formatCurrency } from "@/utils/formatCurrency";

export default function TopRevenueTemples({
    temples,
}) {
    return (
        <div className="rounded-xl bg-white shadow">

            <div className="border-b p-5">
                <h2 className="text-xl font-semibold">
                    Top Revenue Temples
                </h2>
            </div>

            <div className="divide-y">

                {temples.length > 0 ? (
                    temples.map((temple, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-5"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {temple.temple}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {temple.bookings} Bookings
                                </p>
                            </div>

                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                {formatCurrency(temple.revenue)}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No revenue data available.
                    </div>
                )}

            </div>

        </div>
    );
}