import { Search, FileSpreadsheet, FileText } from "lucide-react";

const PaymentFilters = ({
    filters,
    setFilters,
    canExport,
    onExportExcel,
    onExportPDF,
}) => {
    const handleSearchChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            search: e.target.value,
        }));
    };

    const handleStatusChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            status: e.target.value,
        }));
    };

    const handleReset = () => {
        setFilters({
            search: "",
            status: "All",
        });
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Search & Status */}
                <div className="flex flex-1 flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={filters.search}
                            onChange={handleSearchChange}
                            placeholder="Search by Booking No, Payment ID or Devotee..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    </div>

                    <select
                        value={filters.status}
                        onChange={handleStatusChange}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                        <option value="All">All Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>

                    <button
                        onClick={handleReset}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Reset
                    </button>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onExportExcel} disabled={!canExport}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                        <FileSpreadsheet size={18} />
                        Excel
                    </button>

                    <button
                        onClick={onExportPDF} disabled={!canExport}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        <FileText size={18} />
                        PDF
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentFilters;