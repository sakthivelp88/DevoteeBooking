import { createOrder,verifyPayment,} from "../services/paymentService";

export default function TicketCard({
  ticket,
}) {

  const handlePayment = async () => {

    const quantity = 1;

    const data =
      await createOrder(
        ticket._id,
        quantity
      );

    const options = {

      key:
        import.meta.env
          .VITE_RAZORPAY_KEY,

      amount:
        data.order.amount,

      currency:
        data.order.currency,

      name:
        "Temple Booking",

      description:
        ticket.title,

      order_id:
        data.order.id,

      handler:
        async function (
          response
        ) {

          await verifyPayment({
            ...response,
            ticketId:
              ticket._id,
            quantity,
          });

          alert(
            "Booking Confirmed"
          );

          window.location.reload();
        },
    };

    const rzp =
      new window.Razorpay(
        options
      );

    rzp.open();
  };

  return (
    <div className="border p-4 rounded">

      <h2>{ticket.title}</h2>

      <p>
        ₹ {ticket.price * (quantities[ticket._id] || 1)}
      </p>

      <p>{ticket.slot}</p>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>

    </div>
  );
}