import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e", // Paid
  "#f59e0b", // Pending
  "#ef4444", // Failed
  "#3b82f6", // Refunded
];

const PaymentStatusPieChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          Payment Status
        </h2>

        <div className="flex h-80 items-center justify-center text-gray-500">
          No payment data available.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Payment Status
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => [value, "Bookings"]} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentStatusPieChart;