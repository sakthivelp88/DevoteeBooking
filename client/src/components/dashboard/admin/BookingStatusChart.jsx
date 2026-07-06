import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = {
  Pending: "#FACC15",
  Confirmed: "#3B82F6",
  Completed: "#22C55E",
  Cancelled: "#EF4444",
};

export default function BookingStatusChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Booking Status
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