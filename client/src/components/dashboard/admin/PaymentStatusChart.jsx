import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  Paid: "#22C55E",
  Pending: "#FACC15",
  Failed: "#EF4444",
  Refunded: "#6366F1",
};

export default function PaymentStatusChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Payment Status
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            outerRadius={110}
            label
          >
            {data.map(({ status }) => (
              <Cell
                key={status}
                fill={COLORS[status] ?? "#94A3B8"}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}