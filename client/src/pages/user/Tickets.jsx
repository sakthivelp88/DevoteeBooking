import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const { templeId, darshanTypeId } = useParams();

  console.log("Temple ID:", templeId);
  console.log("Darshan Type ID:", darshanTypeId);

  useEffect(() => {
    loadTickets();
  }, [templeId, darshanTypeId]);

  const loadTickets = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/tickets`,
        {
          params: {
            templeId,
            darshanTypeId,
          },
          withCredentials: true,
        }
      );
      console.log("Sending params:", {
        templeId,
        darshanTypeId,
      });
      console.log("Tickets received:", res.data);
      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBooking = async (ticket) => {
    try {
      setLoading(true);

      const quantity = quantities[ticket._id] || 1;

      // STEP 1
      const orderResponse = await axios.post(
        `${API_URL}/payment/create-order`,
        {
          ticketId: ticket._id,
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      const { order } = orderResponse.data;

      console.log(
        "Razorpay Key:",
        import.meta.env.VITE_RAZORPAY_KEY_ID,
      );

      // STEP 2
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Darshan Ticket Booking",
        description: ticket.title,
        order_id: order.id,

        handler: async function (response) {
          try {
            // STEP 3
            const verifyResponse =
              await axios.post(
                `${API_URL}/payment/verify`,
                {
                  ...response,
                  ticketId: ticket._id,
                  quantity,
                },
                {
                  withCredentials: true,
                }
              );

            if (verifyResponse.data.success) {
              alert(
                "Booking Confirmed Successfully"
              );

              loadTickets();
            }
          } catch (error) {
            console.error(error);

            alert(
              "Payment verification failed"
            );
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        theme: {
          color: "#ea580c",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
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
                onClick={() =>
                  handleBooking(ticket)
                }
                disabled={loading}
                className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
              >
                {loading
                  ? "Processing..."
                  : "Book Now"}
              </button>
            </div>
          ))}

        </div>

      </section>
    </div>
  );
}

export default Tickets;