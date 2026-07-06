const Card = ({ title, value, color }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
    <p className="text-sm text-gray-500">{title}</p>

    <h2 className={`mt-2 text-3xl font-bold ${color}`}>
      {value}
    </h2>
  </div>
);

const ReportCards = ({ summary, loading }) => {
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Total Revenue"
        value={`₹${summary?.totalRevenue?.toLocaleString()}`}
        color="text-green-600"
      />

      <Card
        title="Total Bookings"
        value={summary?.totalBookings}
        color="text-blue-600"
      />

      <Card
        title="Completed Payments"
        value={summary?.completedPayments}
        color="text-indigo-600"
      />

      <Card
        title="Pending Payments"
        value={summary?.pendingPayments}
        color="text-yellow-500"
      />

    </div>
  );
};

export default ReportCards;