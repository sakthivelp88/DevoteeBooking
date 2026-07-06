import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await fetch(
      "http://localhost:5000/api/bookings/my",
      {
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log("BOOKINGS DATA:", data);
    setBookings(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings found.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-orange-600 mb-4">
                {booking.ticketId?.title}
              </h3>

              <h3 className="text-xl font-bold text-orange-600 mb-4">
                {booking.ticketId?.temple}
              </h3>

              <div className="grid grid-cols-2 gap-y-3">
                <span className="font-semibold">
                  Quantity
                </span>
                <span>{booking.quantity}</span>

                <span className="font-semibold">
                  Amount
                </span>
                <span>₹{booking.amount}</span>

                <span className="font-semibold">
                  Payment Status
                </span>
                <span
                  className={`font-semibold ${
                    booking.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}