import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  getAdminBookingById,
  updateBookingStatus,
} from "../../services/bookingService";

import AdminStatusBadge from "../../components/admin/AdminStatusBadge";

export default function AdminBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [bookingStatus, setBookingStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      setLoading(true);

      const { booking } = await getAdminBookingById(id);

      setBooking(booking);
      setBookingStatus(booking.bookingStatus);
      setRemarks(booking.remarks || "");
    } catch (error) {
      toast.error("Failed to load booking.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const response = await updateBookingStatus(id, {
        bookingStatus,
        remarks,
      });

      toast.success(response.message);

      loadBooking();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update booking."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (!booking) {
    return <p className="text-center py-10">Booking not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Booking Details
          </h1>

          <p className="text-gray-500">
            View and manage booking
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/bookings")}
          className="border rounded-lg px-4 py-2"
        >
          Back
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Info label="Booking Number" value={booking.bookingNumber} />
          <Info label="User" value={booking.user?.name} />
          <Info label="Email" value={booking.user?.email} />
          <Info label="Temple" value={booking.temple?.name} />
          <Info label="Darshan Type" value={booking.darshanType?.name} />
          <Info label="Quantity" value={booking.quantity} />
          <Info label="Ticket Price" value={`₹${booking.ticketPrice}`} />
          <Info label="Total Amount" value={`₹${booking.totalAmount}`} />

          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <div className="mt-2">
              <AdminStatusBadge
                status={booking.paymentStatus}
                type="payment"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Booking Status</p>
            <div className="mt-2">
              <AdminStatusBadge
                status={booking.bookingStatus}
              />
            </div>
          </div>

          <Info
            label="Payment Reference"
            value={booking.paymentReference}
          />

          <Info
            label="Remarks"
            value={booking.remarks}
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-xl font-semibold mb-6">
          Update Booking Status
        </h2>

        <div className="space-y-5">

          <select
            value={bookingStatus}
            onChange={(e) =>
              setBookingStatus(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            onClick={handleUpdate}
            disabled={updating}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
          >
            {updating ? "Updating..." : "Update Status"}
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value || "-"}
      </p>
    </div>
  );
}