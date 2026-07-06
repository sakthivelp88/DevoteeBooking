const RevenueFilters = ({ filters, onChange }) => {
    const handleChange = (field, value) => {
        onChange({
            [field]: value,
        });
    };

    const handleReset = () => {
        onChange({
            paymentStatus: "",
            fromDate: "",
            toDate: "",
        });
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Payment Status */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Payment Status
                    </label>

                    <select
                        value={filters.paymentStatus}
                        onChange={(e) =>
                            handleChange("paymentStatus", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </div>

                {/* From Date */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        From Date
                    </label>

                    <input
                        type="date"
                        value={filters.fromDate}
                        onChange={(e) =>
                            handleChange("fromDate", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    />
                </div>

                {/* To Date */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        To Date
                    </label>

                    <input
                        type="date"
                        value={filters.toDate}
                        onChange={(e) =>
                            handleChange("toDate", e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg bg-gray-600 px-5 py-2 text-white transition hover:bg-gray-700"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default RevenueFilters;