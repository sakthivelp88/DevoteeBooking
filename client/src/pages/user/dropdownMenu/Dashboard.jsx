import { useEffect, useState } from "react";
import api from "@services/api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/user");
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );

  const { stats, nextBooking, recentBookings } = dashboard;

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 text-slate-900 dark:text-slate-100">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Track your temple bookings and payments.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-5">

        <Card title="Bookings" value={stats.totalBookings} />

        <Card title="Confirmed" value={stats.confirmed} />

        <Card title="Completed" value={stats.completed} />

        <Card
          title="Amount Paid"
          value={`₹${stats.totalAmountPaid}`}
        />

      </div>

      {nextBooking && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">

          <h2 className="mb-4 text-xl font-semibold">
            Upcoming Darshan
          </h2>

          <div className="space-y-2">

            <p>
              <b>Temple:</b>{" "}
              {nextBooking.temple.name}
            </p>

            <p>
              <b>Date:</b>{" "}
              {new Date(
                nextBooking.ticket.date
              ).toLocaleDateString()}
            </p>

            <p>
              <b>Time:</b>{" "}
              {nextBooking.ticket.slotStart} -
              {nextBooking.ticket.slotEnd}
            </p>

            <Link
              to={`/temples/${nextBooking.temple._id}`}
              className="inline-block mt-4 bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              View Temple
            </Link>

          </div>

        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow dark:border-slate-700 dark:bg-slate-800">

        <div className="border-b border-slate-200 p-5 dark:border-slate-700">
          <h2 className="text-xl font-semibold">
            Recent Bookings
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100 dark:bg-slate-700">

            <tr>

              <th className="p-4 text-left">
                Temple
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {recentBookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="p-4">
                  {booking.temple.name}
                </td>

                <td className="p-4">
                  {new Date(
                    booking.ticket.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {booking.bookingStatus}
                </td>

                <td className="p-4">
                  ₹{booking.totalAmount}
                </td>
                <td className="p-4">
                  <Link
                    to={`/temples/${booking.temple._id}`}
                    className="text-orange-600 hover:underline"
                  >
                    View Temple
                  </Link>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">

      <p className="text-gray-500 dark:text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

    </div>
  );
}