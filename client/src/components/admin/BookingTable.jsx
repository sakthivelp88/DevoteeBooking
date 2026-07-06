import { Eye } from "lucide-react";

import AdminStatusBadge from "./AdminStatusBadge";

export default function BookingTable({
  bookings,
  loading,
  onView,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        Loading bookings...
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>
            <Header>Booking No</Header>
            <Header>User</Header>
            <Header>Temple</Header>
            <Header center>Qty</Header>
            <Header right>Amount</Header>
            <Header center>Payment</Header>
            <Header center>Booking</Header>
            <Header center>Action</Header>
          </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="border-t hover:bg-gray-50"
            >
              <Cell>{booking.bookingNumber}</Cell>

              <Cell>{booking.user?.name}</Cell>

              <Cell>{booking.temple?.name}</Cell>

              <Cell center>{booking.quantity}</Cell>

              <Cell right>
                ₹{booking.totalAmount}
              </Cell>

              <Cell center>
                <AdminStatusBadge
                  status={booking.paymentStatus}
                  type="payment"
                />
              </Cell>

              <Cell center>
                <AdminStatusBadge
                  status={booking.bookingStatus}
                />
              </Cell>

              <Cell center>
                <button
                  onClick={() => onView(booking)}
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg"
                >
                  <Eye size={16} />
                  View
                </button>
              </Cell>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

function Header({
  children,
  center,
  right,
}) {
  return (
    <th
      className={`px-4 py-3
      ${center ? "text-center" : ""}
      ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Cell({
  children,
  center,
  right,
}) {
  return (
    <td
      className={`px-4 py-3
      ${center ? "text-center" : ""}
      ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </td>
  );
}