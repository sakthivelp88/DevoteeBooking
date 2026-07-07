function BookingSummary({ ticket, quantity }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
                Booking Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <span className="font-semibold">
                        Temple:
                    </span>{" "}
                    {ticket.temple?.name}
                </div>

                <div>
                    <span className="font-semibold">
                        Darshan Type:
                    </span>{" "}
                    {ticket.darshanType?.name}
                </div>

                <div>
                    <span className="font-semibold">
                        Date:
                    </span>{" "}
                    {new Date(ticket.date).toLocaleDateString()}
                </div>

                <div>
                    <span className="font-semibold">
                        Slot:
                    </span>{" "}
                    {ticket.slotStart} - {ticket.slotEnd}
                </div>

                <div>
                    <span className="font-semibold">
                        Ticket Price:
                    </span>{" "}
                    ₹{ticket.price}
                </div>

                <div>
                    <span className="font-semibold">
                        Quantity:
                    </span>{" "}
                    {quantity}
                </div>

                <div className="md:col-span-2 text-xl font-bold text-green-600">
                    Total Amount: ₹{ticket.price * quantity}
                </div>

            </div>
        </div>
    );
}

export default BookingSummary;