import { useState } from "react";

const ReportFilters = ({ onApply }) => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    paymentStatus: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-8 rounded-xl bg-white border border-gray-200 shadow-sm p-6">

      <h2 className="mb-6 text-lg font-semibold">
        Filters
      </h2>

      <div className="grid gap-4 md:grid-cols-4">

        <input
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 p-3"
        >
          <option value="">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>

        <div className="flex gap-3">

          <button
            onClick={() => onApply(filters)}
            className="flex-1 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            Apply
          </button>

          <button
            onClick={() => {
              const reset = {
                fromDate: "",
                toDate: "",
                paymentStatus: "",
              };
              setFilters(reset);
              onApply(reset);
            }}
            className="flex-1 rounded-lg border border-gray-300 py-3"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
};

export default ReportFilters;