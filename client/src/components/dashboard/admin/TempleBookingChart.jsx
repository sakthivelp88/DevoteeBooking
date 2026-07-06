import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function TempleBookingChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Temple-wise Bookings
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            left: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="temple"
            width={140}
          />

          <Tooltip />

          <Bar
            dataKey="bookings"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}