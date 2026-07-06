import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function DarshanPopularityChart({
  data,
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-semibold">
        Darshan Type Popularity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="darshanType" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="bookings"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}