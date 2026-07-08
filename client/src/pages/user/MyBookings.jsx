import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

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

    setBookings(data.bookings || []);
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
        <div className="max-w-5xl mx-auto grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left */}
                <div>
                  <h3 className="text-2xl font-bold text-orange-600">
                    {booking.temple?.name}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {booking.darshanType?.name}
                  </p>

                  <div className="mt-5 space-y-2">
                    <p>
                      <strong>Booking No:</strong>{" "}
                      {booking.bookingNumber}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        booking.ticket?.date
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>Slot:</strong>{" "}
                      {booking.ticket?.slotStart} -
                      {booking.ticket?.slotEnd}
                    </p>

                    <p>
                      <strong>Quantity:</strong>{" "}
                      {booking.quantity}
                    </p>

                    <p>
                      <strong>Total:</strong> ₹
                      {booking.totalAmount}
                    </p>

                    <p>
                      <strong>Booking:</strong>{" "}
                      <span className="text-green-600 font-semibold">
                        {booking.bookingStatus}
                      </span>
                    </p>

                    <p>
                      <strong>Payment:</strong>{" "}
                      <span className="text-green-600 font-semibold">
                        {booking.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-center justify-between">
                  {booking.qrCode ? (
                    <img
                      src={booking.qrCode}
                      alt="QR Code"
                      className="w-40 h-40 border rounded-lg"
                    />
                  ) : (
                    <div className="w-40 h-40 border rounded-lg flex items-center justify-center text-gray-400">
                      No QR
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        navigate(`/booking-success/${booking._id}`)
                      }
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg"
                    >
                      View Ticket
                    </button>

                    <button
                      onClick={() =>
                        window.open(
                          `http://localhost:5000/api/bookings/${booking._id}/pdf`,
                          "_blank"
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}