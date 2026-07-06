const PaymentFilters = ({
  filters,
  onChange,
}) => {
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

        <div>
          <label className="mb-1 block text-sm font-medium">
            Payment Status
          </label>

          <select
            value={filters.paymentStatus}
            onChange={(e) =>
              handleChange(
                "paymentStatus",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            From Date
          </label>

          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              handleChange(
                "fromDate",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            To Date
          </label>

          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              handleChange(
                "toDate",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

      </div>

      <div className="mt-5 flex justify-end">

        <button
          onClick={handleReset}
          className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
};

export default PaymentFilters;