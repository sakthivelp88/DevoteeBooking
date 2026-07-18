import { formatCurrency } from "@/utils/formatCurrency";

export default function RecentBookingsTable({
  bookings,
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Recent Bookings
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Booking No
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                User
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Temple
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Amount
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {booking.bookingNumber}
                  </td>

                  <td className="px-6 py-4">
                    {booking.user?.name}
                  </td>

                  <td className="px-6 py-4">
                    {booking.temple?.name}
                  </td>

                  <td className="px-6 py-4">
                    {formatCurrency(booking.totalAmount)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${booking.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : booking.paymentStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.paymentStatus === "Failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500"
                >
                  No recent bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}