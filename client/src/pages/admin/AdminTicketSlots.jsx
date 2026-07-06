import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEdit,} from "react-icons/fa";
import { LuLock, LuLockOpen } from "react-icons/lu";

import {
  getTickets,
  updateTicketStatus,
} from "../../services/ticketService";

export default function AdminTickets() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
    sortBy: "date",
    sortOrder: "asc",
  });

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchText.trim(),
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const data = await getTickets(filters);

      setTickets(data.tickets);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load tickets."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (ticket) => {
    const newStatus =
      ticket.status === "Active"
        ? "Closed"
        : "Active";

    if (
      !window.confirm(
        `Are you sure you want to ${newStatus.toLowerCase()} this ticket?`
      )
    ) {
      return;
    }

    try {
      await updateTicketStatus(ticket._id, newStatus);

      toast.success(
        `Ticket ${newStatus.toLowerCase()} successfully!`
      );

      await fetchTickets();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update ticket status."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Ticket Management
        </h1>

        <button
          onClick={() => navigate("/admin/ticket-slots/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create Ticket
        </button>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-80 rounded-lg border border-gray-300 px-4 py-2"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Temple</th>
              <th className="p-3 text-left">Darshan Type</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">SlotStart</th>
              <th className="p-3 text-left">SlotEnd</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Seats</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="p-6 text-center text-gray-500"
                >
                  No tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    {ticket.temple?.name}
                  </td>

                  <td className="p-3">
                    {ticket.darshanType?.name}
                  </td>

                  <td className="p-3">
                    {new Date(ticket.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {ticket.slotStart}
                  </td>
                  <td className="p-3">
                    {ticket.slotEnd}
                  </td>

                  <td className="p-3">
                    ₹{ticket.price}
                  </td>

                  <td className="p-3">
                    {ticket.availableSeats} / {ticket.totalSeats}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${ticket.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="p-3 text-center space-x-3">
                    <div className="flex justify-center gap-4">

                      <button
                        disabled={ticket.status === "Closed"}
                        onClick={() =>
                          navigate(`/admin/ticket-slots/edit/${ticket._id}`)
                        }
                        className={
                          ticket.status === "Closed"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-blue-600 hover:text-blue-800"
                        }
                        title={
                          ticket.status === "Closed"
                            ? "Closed tickets cannot be edited"
                            : "Edit Ticket"
                        }
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => handleStatusToggle(ticket)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-white transition ${ticket.status === "Active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                          }`}
                      >
                        {ticket.status === "Active" ? (
                          <>
                            <LuLock size={16} />
                            {/* <span>Close</span> */}
                          </>
                        ) : (
                          <>
                            <LuLockOpen size={16} />
                            {/* <span>Reopen</span> */}
                          </>
                        )}
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">

        <button
          disabled={!pagination.hasPrev}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pagination.page || 1} of {pagination.totalPages || 1}
        </span>

        <button
          disabled={!pagination.hasNext}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}