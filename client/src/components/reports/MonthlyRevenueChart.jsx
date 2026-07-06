import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MonthlyRevenueChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          Monthly Revenue
        </h2>

        <div className="flex h-80 items-center justify-center text-gray-500">
          No revenue data available.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis tickFormatter={(value) => `₹${value.toLocaleString()}`} />

          <Tooltip
            formatter={(value) => [
              `₹${value.toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;