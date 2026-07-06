import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const TopTemplesChart = ({ data = [] }) => {
    if (!data.length) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-800">
                    Top Temples by Revenue
                </h2>

                <div className="flex h-80 items-center justify-center text-gray-500">
                    No temple revenue data available.
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">
                Top Temples by Revenue
            </h2>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ left: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />

                    <YAxis
                        type="category"
                        dataKey="temple"
                        width={150}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `₹${Number(value).toLocaleString()}`,
                            "Revenue",
                        ]}
                    />

                    <Bar
                        dataKey="revenue"
                        fill="#3b82f6"
                        radius={[0, 6, 6, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopTemplesChart;