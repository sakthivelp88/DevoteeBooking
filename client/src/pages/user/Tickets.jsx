import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import api from "@services/api/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const { templeId, darshanTypeId } = useParams();
  
  useEffect(() => {
    loadTickets();
  }, [templeId, darshanTypeId]);

  const loadTickets = async () => {
    try {
      const res = await api.get(
        `/tickets`,
        {
          params: {
            templeId,
            darshanTypeId,
          },
          withCredentials: true,
        }
      );

      setTickets(res.data.tickets);

    } catch (error) {
      console.error(error);
    }
  };

 
  const handleBooking = (ticket) => {
    const quantity = quantities[ticket._id] || 1;

    navigate("/booking", {
      state: {
        ticket,
        quantity,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 px-4 py-6 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="rounded-[24px] border border-orange-200 bg-orange-600 px-6 py-5 text-white shadow-lg dark:border-orange-900 dark:bg-slate-900">
        <h1 className="text-center text-3xl font-bold">
          Darshan Ticket Booking
        </h1>
      </header>

      <section className="mx-auto max-w-7xl py-10 text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Book Darshan Tickets Online
        </h2>

        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Fast, secure, and convenient
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-2">
        <div className="grid gap-6 md:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {ticket.title}
              </h3>
              <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p><span className="font-semibold text-slate-700 dark:text-slate-200">Temple:</span> {ticket.temple?.name}</p>
                <p><span className="font-semibold text-slate-700 dark:text-slate-200">Darshan Type:</span> {ticket.darshanType?.name}</p>
                <p><span className="font-semibold text-slate-700 dark:text-slate-200">Date:</span> {new Date(ticket.date).toLocaleDateString()}</p>
                <p><span className="font-semibold text-slate-700 dark:text-slate-200">Slot:</span> {ticket.slot}</p>
                <p className="font-semibold text-green-600 dark:text-green-400">Ticket Fee: ₹{ticket.price}</p>
                <p><span className="font-semibold text-slate-700 dark:text-slate-200">Available Seats:</span> {ticket.availableSeats}</p>
              </div>

              <div className="mt-4">
                <label className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
                  Quantity:
                </label>

                <input
                  type="number"
                  min="1"
                  max={ticket.availableSeats}
                  value={quantities[ticket._id] || 1}
                  onChange={(e) =>
                    setQuantities({
                      ...quantities,
                      [ticket._id]: Number(e.target.value),
                    })
                  }
                  className="w-40 rounded-lg border border-slate-300 bg-white p-2 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                />
              </div>
              <button
                onClick={() => handleBooking(ticket)}
                className="mt-4 w-full rounded-lg bg-orange-600 py-2.5 font-semibold text-white transition hover:bg-orange-700"
              >
                Continue
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Tickets;