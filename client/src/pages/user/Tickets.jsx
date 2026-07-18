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
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-orange-600 text-white p-4 shadow">
        <h1 className="text-3xl font-bold text-center">
          Dharsan Ticket Booking
        </h1>
      </header>

      {/* Hero */}
      <section className="py-10 text-center">
        <h2 className="text-4xl font-bold">
          Book Darshan Tickets Online
        </h2>

        <p className="mt-2 text-gray-600">
          Fast, Secure & Convenient
        </p>
      </section>

      {/* Tickets */}
      <section className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-6">

          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-lg p-5"
            >
              <h3 className="text-xl font-bold">
                {ticket.title}
              </h3>
              <p>
                Temple: {ticket.temple?.name}
              </p>

              <p>
                Darshan Type: {ticket.darshanType?.name}
              </p>

              <p className="mt-2">
                Date:
                {" "}
                {new Date(ticket.date).toLocaleDateString()}
              </p>

              <p>
                Slot:
                {" "}
                {ticket.slot}
              </p>

              <p className="text-green-600 font-bold mt-2">
                Ticket Fee: ₹{ticket.price}
              </p>

              <p>
                Available Seats:
                {" "}
                {ticket.availableSeats}
              </p>
              <div className="mt-3">
                <label className="block mb-1 font-medium">
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
                  className="w-40 border rounded-lg p-2"
                />
              </div>
              <button
                onClick={() => handleBooking(ticket)}
                className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
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