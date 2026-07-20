import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import BookingTable from "@components/admin/BookingTable";
import { getAdminBookings } from "@services/user/bookingService";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Filters
  const [search, setSearch] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadBookings();
  }, [page, search, bookingStatus, paymentStatus]);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await getAdminBookings({
        page,
        limit,
        search,
        bookingStatus,
        paymentStatus,
      });

      setBookings(response.bookings);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Booking Management
        </h1>

        <p className="text-gray-500 dark:text-white">
          Manage devotee bookings
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Search Booking No, User, Temple..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />

        <select
          value={bookingStatus}
          onChange={(e) => {
            setBookingStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900
             dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="" >All Booking Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={paymentStatus}
          onChange={(e) => {
            setPaymentStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900
             dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          <option value="">All Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>

      </div>

      {/* Summary */}
      <p className="text-sm text-gray-500">
        Total Bookings : {total}
      </p>

      {/* Table */}
      <BookingTable
        bookings={bookings}
        loading={loading}
        onView={(booking) =>
          navigate(`/admin/bookings/${booking._id}`)
        }
      />

      {/* Pagination */}
      <div className="flex items-center justify-between">

        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}